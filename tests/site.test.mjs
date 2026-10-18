import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';

const origin = 'https://manuel.team';
const pages = [
    { lang: 'en', route: '/', file: 'dist/index.html' },
    { lang: 'es', route: '/es/', file: 'dist/es/index.html' },
];
const attributes = (tag) => Object.fromEntries(
    [...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map((match) => [match[1], match[2]]),
);
const tags = (html, name) => [...html.matchAll(new RegExp('<' + name + '\\b[^>]*>', 'g'))]
    .map((match) => attributes(match[0]));

function outputFile(url) {
    const file = path.join('dist', decodeURIComponent(url.pathname));
    return path.extname(file) ? file : path.join(file, 'index.html');
}

for (const page of pages) {
    const html = fs.readFileSync(page.file, 'utf8');
    const metas = Object.fromEntries(tags(html, 'meta').map((tag) => [tag.name || tag.property, tag.content]));
    const links = tags(html, 'link');
    const anchors = tags(html, 'a');

    test(page.lang + ': metadata and language alternates use public URLs', () => {
        const canonical = origin + page.route;
        assert.equal(links.find((tag) => tag.rel === 'canonical')?.href, canonical);
        assert.equal(metas['og:url'], canonical);
        assert.equal(metas['twitter:url'], canonical);
        assert.equal(metas['og:description'], metas.description);
        assert.equal(metas['twitter:description'], metas.description);
        assert.match(metas.description, /Manuel Almaguer/);
        assert.doesNotMatch(metas.description, /iostream|window.onload|,\s*$/);
        assert.equal(metas['og:image'], origin + '/og-image.png');
        const preview = fs.readFileSync(outputFile(new URL(metas['og:image'])));
        assert.equal(preview.readUInt32BE(16), 1200);
        assert.equal(preview.readUInt32BE(20), 630);
        for (const alternate of [...pages, { lang: 'x-default', route: '/' }]) {
            assert.equal(links.find((tag) => tag.hreflang === alternate.lang)?.href, origin + alternate.route);
        }
        assert.doesNotMatch(html.slice(0, html.indexOf('</head>')), /localhost|127\.0\.0\.1/);
    });

    test(page.lang + ': CV, local assets and anchor targets resolve from this route', () => {
        const cv = anchors.find((tag) => tag.href?.endsWith('.pdf'));
        assert.ok(cv, 'CV link is present');
        assert.ok(cv.href.startsWith('/'), 'CV uses a root-relative path');
        assert.equal(fs.readFileSync(outputFile(new URL(cv.href, origin + page.route))).subarray(0, 4).toString(), '%PDF');
        const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]));
        for (const tag of [...anchors, ...links, ...tags(html, 'img')]) {
            const value = tag.href || tag.src;
            if (!value || /^(mailto:|https?:\/\/)/.test(value) && !value.startsWith(origin)) continue;
            assert.notEqual(value, '#', 'No placeholder links');
            const url = new URL(value, origin + page.route);
            assert.ok(fs.existsSync(outputFile(url)), 'Missing local destination: ' + value);
            if (url.hash) assert.ok(ids.has(url.hash.slice(1)), 'Missing anchor: ' + value);
        }
    });

    test(page.lang + ': content is available before hydration with valid hero paragraphs', () => {
        assert.equal(tags(html, 'h1').length, 1);
        assert.match(html, /id="main-content"/);
        for (const id of ['about', 'skills', 'projects', 'experience', 'education', 'research', 'testimonials', 'contact']) {
            assert.match(html, new RegExp('id="' + id + '"'));
        }
        assert.doesNotMatch(html, /style="[^"]*opacity:\s*0(?:[;" ])/);
        for (const island of tags(html, 'astro-island')) {
            assert.match(island['component-url'], /Navbar/, 'Informational content must not require hydration');
        }
        const hero = html.match(/<header\b[^>]*>([\s\S]*?)<\/header>/)?.[1];
        assert.ok(hero);
        let paragraphOpen = false;
        for (const [tag] of hero.matchAll(/<\/?p\b[^>]*>/g)) {
            if (tag.startsWith('</')) paragraphOpen = false;
            else {
                assert.equal(paragraphOpen, false, 'Paragraphs must not be nested');
                paragraphOpen = true;
            }
        }
    });

    test(page.lang + ': disclosures preserve projects and publications without duplicate actions', () => {
        assert.equal(tags(html, 'details').length, 2);
        assert.match(html, /<details[\s\S]*?<summary[\s\S]*?<article/);
        const research = html.match(/<section id="research"[^>]*>([\s\S]*?)<\/section>/)?.[1];
        assert.ok(research);
        for (const [article] of research.matchAll(/<article\b[\s\S]*?<\/article>/g)) {
            const destinations = tags(article, 'a').map((tag) => tag.href);
            assert.equal(new Set(destinations).size, destinations.length, 'Publication actions have distinct destinations');
        }
        assert.ok(!anchors.some((tag) => tag.href?.trim() === '#'), 'Placeholder articles must not be published');
        for (const image of tags(html, 'img')) {
            assert.equal(image.loading, 'lazy');
            assert.ok(Number(image.width) > 0 && Number(image.height) > 0);
        }
    });
}

test('theme styles are generated and no missing font files are requested', () => {
    const css = fs.readdirSync('dist/_astro').filter((file) => file.endsWith('.css'))
        .map((file) => fs.readFileSync('dist/_astro/' + file, 'utf8')).join('');
    const rules = css.match(/[^{}]+\{[^{}]*\}/g) || [];
    const ruleFor = (selector) => rules.find((rule) => rule.slice(0, rule.indexOf('{')).split(',').includes(selector)) || '';
    assert.ok(ruleFor('.text-app-accent').includes('color:var(--app-accent)'), 'Accent color utility is generated');
    assert.ok(ruleFor('.bg-app-surface').includes('background-color:var(--app-surface)'), 'Surface background utility is generated');
    assert.match(css, /prefers-reduced-motion/);
    assert.doesNotMatch(css, /GoogleSansCode|\.ttf/);
});

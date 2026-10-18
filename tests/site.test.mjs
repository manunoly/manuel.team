import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';

const origin = 'https://manuel.team';
const portfolio = JSON.parse(fs.readFileSync('src/data/portfolio.json', 'utf8'));
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

    test(page.lang + ': introduction exposes professional profiles and direct actions before hydration', () => {
        const hero = html.match(/<header\b[^>]*>([\s\S]*?)<\/header>/)?.[1];
        const contact = html.match(/<section id="contact"[^>]*>([\s\S]*?)<\/section>/)?.[1];
        assert.ok(hero && contact);
        const data = portfolio[page.lang];
        const profiles = [data.contact.github, data.contact.linkedin, data.contact.twitter, data.research.profileLink];
        for (const section of [hero, contact]) {
            const social = section.match(/<nav\b[^>]*>([\s\S]*?)<\/nav>/)?.[1];
            assert.ok(social, 'Professional profiles have a named navigation region');
            assert.ok(tags(section, 'nav')[0]['aria-label'], 'Social navigation has an accessible name');
            const socialLinks = tags(social, 'a');
            assert.equal(socialLinks.length, profiles.length);
            for (const destination of profiles) {
                const link = socialLinks.find((tag) => tag.href === destination.replaceAll('&', '&amp;'));
                assert.ok(link, 'Profile is available in the introduction and contact: ' + destination);
                assert.equal(link.target, '_blank');
                assert.match(link.rel, /\bnoopener\b/);
                assert.match(link.rel, /\bnoreferrer\b/);
            }
        }
        const actions = tags(hero, 'a');
        assert.ok(actions.some((tag) => tag.href === 'mailto:' + data.contact.email), 'Email opens directly');
        assert.ok(actions.some((tag) => tag.href === '#projects'), 'Projects are reachable from the introduction');
        assert.ok(actions.some((tag) => tag.href === data.hero.resumeLink), 'The CV remains available');
    });

    test(page.lang + ': all projects are visible with the requested priority and spacing', () => {
        const projects = html.match(/<section id="projects"[^>]*>([\s\S]*?)<\/section>/)?.[1];
        assert.ok(projects);
        assert.equal(tags(projects, 'details').length, 0, 'Projects must not require opening a disclosure');
        const titles = [...projects.matchAll(/<h3\b[^>]*>([\s\S]*?)<\/h3>/g)].map((match) => match[1]);
        assert.equal(titles.length, 23, 'All 23 projects are rendered');
        assert.equal(new Set(titles).size, 23, 'Projects are not duplicated');
        const entourage = titles.indexOf('Entourage Yearbooks');
        assert.ok(entourage >= 0 && entourage < 3, 'Current employment is among the first three projects');
        const picaboo = titles.indexOf('Picaboo Yearbooks');
        const creator = titles.indexOf('Creator Studio Pro');
        const edge = titles.indexOf('Edge Creator Studio');
        assert.ok([picaboo, creator, edge].every((index) => index >= 0));
        for (const columns of [1, 2, 3]) {
            for (const [a, b] of [[creator, edge], [creator, picaboo], [edge, picaboo]]) {
                const distance = Math.abs(Math.floor(a / columns) - Math.floor(b / columns))
                    + Math.abs(a % columns - b % columns);
                assert.ok(distance > 1, 'Studio projects stay separate from each other and Picaboo at ' + columns + ' columns');
            }
        }
    });

    test(page.lang + ': publication disclosures preserve distinct actions and valid assets', () => {
        const research = html.match(/<section id="research"[^>]*>([\s\S]*?)<\/section>/)?.[1];
        assert.ok(research);
        assert.equal(tags(research, 'details').length, 1);
        assert.match(research, /<details[\s\S]*?<summary[\s\S]*?<article/);
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

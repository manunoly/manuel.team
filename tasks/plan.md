# Site polish

Apply the accepted SEO and editorial review on codex/seo-content-polish.
Preserve the existing Firebase cache change and Search Console verification file.

1. Fix public metadata, language alternates, CV paths and social preview.
2. Apply bilingual copy; show six featured projects with the rest available;
   suppress placeholder articles and duplicate publication actions.
3. Render informational content as static HTML, restore theme utilities,
   use system fonts and improve keyboard, mobile and image behavior.
4. Build with pnpm, run output regression checks, inspect EN/ES in the browser
   and review the diff. Commit and publish the PR after the user-authorized final
   checks; do not deploy.

Acceptance: metadata contains only public URLs; both CV links resolve; content
is readable without hydration; no React errors or missing local assets; language
and theme controls work; no horizontal overflow at mobile widths.

Baseline: build passes with two missing-font warnings; 11 React islands per page,
approximately 341 kB emitted JavaScript (uncompressed). Published EN/ES have nested
paragraphs, a broken Spanish CV link and social metadata pointing to localhost.

Completed: production build and 9 regression checks pass. An inverted placeholder
filter was detected in EN/ES and restored. Browser QA covered EN/ES, light/dark,
mobile menu and Escape, native disclosures (23 projects / 19 publications),
zero unnamed links and no overflow at 320, 375 and 768 px or desktop. Browser
console is clear. JavaScript output is 202,258 bytes, down about 41%; one React
island remains. The only build warning is a pre-existing unused import inside
Astro. External project destinations and live Core Web Vitals were not audited.
Verification completed before PR preparation; nothing was deployed.

## Astro migration

User authorized the migration on 2026-10-17. Keep the current branch and all
site edits. Baseline: Astro 5.15.9, React integration 4.4.2, Tailwind 4.1.17,
Node 22.20.0; production build and 9 regression checks pass.

1. Use Node 22.23.3 LTS and declare its minimum supported version.
2. Upgrade only the related Astro/React integration/Tailwind packages to the
   stable versions verified in the registry; retain React 19.
3. Review v6/v7 breaking changes and adapt compiler or Vite configuration only
   when required. Preserve URLs, SEO, content, native disclosures and the UI.
4. Verify a frozen installation, production build, the existing tests and browser
   behavior in EN/ES. Review lockfile changes and record actual results.

Package management: retain pnpm as the documented manager and remove the stale
npm lockfile, which only described Astro and Framer Motion. The full pnpm lock
is authoritative; all installed versions must come from it.

Completed: Astro 7.4.0, React integration 7.1.0 and Tailwind 4.3.3 are installed
with Node 22.23.3 and pnpm 10.32.1. React remains 19.2.0. The v6/v7 upgrade guides
were checked; no source or Vite compatibility workaround was needed.

Two migration issues were reproduced and resolved. A leftover npm copy of
cookie shadowed Astro's new dependency; a clean frozen pnpm installation fixed
resolution. The old Firebase welcome page in public/index.html shadowed the
English Astro route in v7; the unused template was removed. Existing regression
checks caught the incorrect homepage before browser QA.

The dependency audit initially reported four advisories. Compatible transitive
patches (mdast-util-to-hast 13.2.1, picomatch 2.3.2 and source-map-js 1.2.2) resolved
them without overrides or new direct dependencies; pnpm audit --prod now reports
zero known vulnerabilities.

Final frozen installation and pnpm test pass (9/9), with no build warnings.
Visible text in both generated pages matches the pre-migration baseline. Browser
QA passes for EN/ES, light/dark persistence, language navigation, menu/Escape,
23 projects and 19 publications, with no overflow at 320, 375, 768 or 1280 px and
no console errors. The development server also renders successfully. JavaScript
output is 197,428 bytes (62,663 gzip), down from 202,258 bytes before migration.
Pre-existing Firebase cache and Google verification files are byte-identical to
their snapshots. Nothing was deployed. Live hosting and field Core Web Vitals
were not tested.

## Pull request preparation

The user authorized creating the PR on 2026-10-18 if checks passed. The final
frozen installation, production build and 9 regression tests pass on Node
22.23.3 / pnpm 10.32.1; the production dependency audit reports no known
vulnerabilities. The diff review found no blocking issue. The mutation check
and browser QA recorded above remain applicable; application sources are
unchanged since those checks.

Publish codex/seo-content-polish against main. Keep the pre-existing Firebase
cache edit and untracked Google verification file outside the commit. PR
creation does not authorize merging or deployment.

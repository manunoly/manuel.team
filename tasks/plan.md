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

## Content detail correction

The user requested preserving their full professional background when
reorganizing content. Compare against 9b9bda4 before removing named technologies,
responsibilities, training topics or personal history. Keep concise SEO metadata
separate from the complete visible profile.

Audit findings and corrections on codex/restore-skills-detail:
- Restore the original skills inventory in six groups. Make GNU/Linux server
  installation, administration and Bash explicit in the first row.
- Restore the four biography paragraphs, including performance, scalability,
  leadership, knowledge sharing and the Ubuntu 7.04 / Fluxbox / Xfce history.
- Restore the personal AI/code introduction and original brand phrase while
  retaining the professional heading, public metadata and corrected CV link.
- Restore every project's technology list, normalizing product names and removing
  exact duplicates. Five featured projects had lost technical detail; their
  descriptions, links and the complete set of 23 projects were retained.
- Restore the full postgraduate description, including intelligent systems,
  SOA, quality assurance and process modeling, and the invitation to consulting,
  ideas and new opportunities in Contact.
- Exact data comparison confirms the five job descriptions and dates, all
  publication titles/authors/venues/years/links, testimonials and contact URLs
  were preserved. Duplicate publication actions pointed to the same Scholar URL.
- Both blog entries remain in the data; their placeholder '#' links keep them
  out of the published article list. Project/publication disclosures remain.

Production build and 9 regression checks pass. Additional comparison confirms
all original project technologies and education descriptions in EN/ES, preserved
employment/publication data and safely escaped personal code text. Corrections
remain local on this branch pending review and publication.

## Project visibility and order correction

The user requested showing every project without a disclosure and giving their
current employer priority. This replaces the earlier selected-project layout;
the additional-publications disclosure remains unchanged.

- Render all 23 projects in one static grid in EN/ES and remove obsolete featured
  flags. Preserve each project's complete description, technologies and links.
- Start with Picaboo Yearbooks, Entourage Yearbooks and EdoNext Platform.
- Place Creator Studio Pro seventh and Edge Creator Studio fifteenth. Neither
  is adjacent to Picaboo or to the other Studio in one, two or three columns.
- Update documentation and add regression checks for visibility, priority and
  spacing in both languages. The new checks failed against the old output;
  the updated production build and all 11 regression tests pass.

Data comparison against the pre-reorder snapshot confirms only project order
and obsolete featured flags changed in this step. Browser checks confirm all
23 cards are displayed, Entourage is second and the requested separation holds
in one, two and three columns in EN/ES, with no horizontal overflow. Spanish
viewports were checked at 320, 900 and 1280 CSS pixels; console warnings/errors
are empty. The local development preview remains running for user review.
These corrections remain on codex/restore-skills-detail and are not deployed.

## Skills categorization and agent capabilities

The user requested checking every skill's category and expanding AI & tools.
Keep all existing skills and the six-category layout in EN/ES.

- Move Typesense and Firebase databases to Data, API tooling to Backend, JMeter
  to Quality, Git and package tooling to DevOps, and webpack/Vite to Frontend.
- Separate CloudFormation infrastructure as code from CI/CD. Expand the
  Architecture/Quality heading to include methodologies and move Scrum/Jira/XP/RUP
  there. Keep Firebase Authentication in Backend.
- Add agent orchestration, agent workflow development, RAG, reusable agent skill
  creation, and MCP server development/integration to AI & tools in both languages.

Comparison with the pre-edit snapshot confirms all original skill terms remain,
with 52 entries in six categories per language and no other profile data changed.
No component, dependency or client JavaScript changes were needed. Production
build and all 11 existing tests pass. Browser checks at 320, 900 and 1280 CSS
pixels confirm all 52 entries in EN/ES without page or card overflow. These
changes remain local for review on codex/restore-skills-detail.

The user's data engineering experience is now explicit near the start of Data
& business intelligence: design/development of data marts and data warehouses,
integration/processing of large data volumes, and BI/ETL pipeline development
with Pentaho BI and Kettle. Both languages retain every previous skill and all
other profile data; there are now 54 entries overall. The production build and
11 regression checks pass, and the updated EN/ES text renders without overflow.

## Frontend design review and authorized Firebase release

The user requested frontend-design, visible social profiles in the introduction,
additional useful design improvements and deployment of all prepared changes.
Preserve the full profile, all 54 skill entries, all 23 visible projects and
their agreed order. Deploy this reviewed working tree to manuel-almaguer Hosting.

Design pass 1: use the existing professional blue identity with a quieter page.
Light tokens: paper #ffffff, surface #f1f5f9, ink #0f172a, secondary #475569,
accent #0369a1 and divider #e2e8f0. Retain the established dark theme equivalents.
Use the system UI stack deliberately for immediate rendering; give the name a
fluid display scale, keep the role subordinate and limit prose to readable widths.

Layout candidates:
```
A: greeting / name / role / social links / full introduction / contact + CV + projects
   about: portrait | full biography
   skills: open lists in one, two or three columns
B: name + role | large portrait / social links / introduction
```
Design pass 2: choose A. The existing biography already owns the portrait, so B
would duplicate it or force unrelated content restructuring. Avoid decorative
stat cards, extra imagery and new fonts. Keep project cards because they group
distinct products; simplify skill panels and the portrait's decorative effects.

1. Add one static social-links component using the existing GitHub, LinkedIn,
   X/Twitter and Google Scholar URLs. Reuse it in Hero and Contact; pass profile
   data from both routes. Make the primary hero action mailto and add a projects
   shortcut. Verify links in generated HTML in EN/ES before hydration.
2. Tighten the hero, align its gutters, simplify About/Skills styling, allow two
   skill columns on medium screens and give project cards clear hover/focus
   feedback. Verify mobile/desktop, both themes, keyboard and content preservation.
3. Run pnpm test, review the diff, preserve the Google verification asset, deploy
   only Hosting, and verify both public routes and their released assets against
   the local build. Save a production screenshot and report actual outcomes.

Pre-release result: the two new profile/action tests fail on the old HTML and
pass with the implementation; pnpm test now passes 13/13 without build warnings.
The complete portfolio JSON equals its pre-design snapshot. Browser QA of the
production preview covers EN/ES at 320, 375, 900 and 1440 CSS pixels with no
horizontal overflow, 54 skills, 23 visible projects and all four hero profiles.
Social targets are at least 44 px high. Keyboard focus is visible, Escape closes
the menu and returns focus, project shortcuts work, and dark theme persists
between languages. The desktop hero is about 689 px instead of 949 px at the
same natural viewport. Client JavaScript stays at 197,428 bytes (62,664 gzip;
baseline 62,663). No dependencies or new client islands were added. The Google
verification asset matches its pre-edit snapshot and built output byte for byte.
Five-axis source/diff review found no blocking issue; publication is next.

Firebase Hosting release completed successfully on 2026-10-18 for
manuel-almaguer, serving https://manuel.team and the default web.app domain.
All 19 built files on the custom domain plus both language pages on the default
domain return HTTP 200 and match dist byte for byte (21 checks). The verification
report is saved in ignored .astro/frontend-release-verification.json. Live browser
checks confirm both languages, the four hero profiles, 54 skills, 23 projects,
hydrated navigation, the mobile menu/Escape and no horizontal overflow or console
warnings/errors. The public preview is left open for the user. Source changes
remain in codex/restore-skills-detail; no new commit or PR was created.

## Preserve platform breadth and professional scope

User correction: Firebase experience covers the platform, including Storage,
databases, Hosting, authentication and other services. A category must not turn
an example into a limit on their experience. Preserve the meaning and breadth
of the original profile AND subsequent user clarifications; retaining technical
words or entry counts alone is not sufficient evidence of content preservation.

Move Firebase as a platform to Linux/cloud/DevOps with Cloud Storage, Hosting,
Authentication, Firestore, Realtime Database and an explicit non-exhaustive scope
in EN/ES. Keep the database-specific entry under Data. A comparison with the
original skills also prompted restoring the term relational database modeling;
control of versions now names Git and Subversion, the latter already documented
in the user's project history. No other skills or profile fields changed.

Production build and all 13 tests pass. Exact comparison with the pre-correction
snapshot confirms all other skill entries and profile data remain unchanged.

The scope correction is published to the same Firebase Hosting project. All 21
public page/asset checks match the reviewed build, including both languages.
Live browser reload confirms the expanded Firebase platform entry and Git with
Subversion. Local responsive inspection at 320 px shows no horizontal overflow.

## React Context API and SWR naming

The user confirmed the exact, description-free labels React Context API and SWR.
Add them as separate entries under Frontend/mobile in EN/ES, retaining Redux
and Zustand. An exact before/after comparison confirms these are the only two
profile additions per language; all other fields remain unchanged. pnpm test
passes all 13 checks. Graph transport was unavailable, so the affected JSON
categories and plan were inspected directly from current source.

Published successfully to Firebase Hosting. All 21 public page/asset checks
match the reviewed build, including EN/ES with the two exact skill labels.

## Pull request and repeat publication

The user authorized creating the PR and republishing on 2026-10-18. The branch
starts at the current origin/main (c3afba7), with no existing open PR for this
head. Final pnpm test passes 13/13. A direct source audit confirms both complete
project sets, the full Firebase scope and the exact React Context API/SWR labels;
SEO, employment, research, testimonials, contact and blog data are unchanged.
The source/diff review found no blocking issue. Graph transport remains
unavailable, so verification used the actual source and generated output.

Commit the application, tests and documentation on codex/restore-skills-detail,
publish a PR against main, and deploy only Hosting again. Preserve the pre-existing
Firebase cache edit and Google verification file outside the commit. The existing
browser QA and regression evidence above remain applicable to this unchanged UI.

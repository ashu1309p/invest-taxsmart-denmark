# Tax-smart investing in Denmark

A free, no-login, bilingual (EN/DA) educational website that explains Danish retail investment taxation
by letting you play with sliders and see the tax outcome. Static and stateless: no backend, no accounts,
no cookies (only `localStorage` for your language and slider choices). **Educational only, not advice.**

## The pages
- **`index.html` - Home** (light landing): hero poster + "where are you starting from?" path
  chooser (never invested / for my child / know the basics) + four teaser cards + trust strip.
  No simulator, no video: small first paint.
- **`plan.html` - Plan / The Money Router** (moved from index): the router, the "four tax homes"
  primer and the hero video. Deep links `?mode=child` / `?mode=adult` preselect the mode.
- **`check.html` - Check a fund**: the positivliste ISIN checker as its own utility page.
- **`play.html` - Play / The Wrapper Race + Gift Planner**: race chart has end-of-line labels,
  tap-to-isolate, a "show the gap" view and colour-blind dash patterns.
- **`learn.html` - Learn hub**: six guides + the Trap Gallery quiz - `learn-start-here.html`
  (Beginner 101), `learn-choosing-funds.html` (ACC/DIST/hedged + asset map),
  `learn-positivliste.html`, `learn-ask-depot-bo.html`, `learn-lager-vs-realisation.html`,
  `learn-gifts-to-children.html`, `quiz.html`.
- Nav tabs are **Home · Plan · Play · Learn**, single-sourced in `js/shell.js`, with additive
  left/right swipe navigation between the four tab pages on touch screens.

## Shared site shell (header / footer / chrome CSS)
To avoid drift, the chrome is single-sourced:
- **`css/styles.css`** holds the shared shell *styles* (sticky top bar, tabs, language toggle, footer,
  sticky disclaimer, context pill, skip link, focus + reduced-motion). Each page links it **last**, after
  its own inline `<style>`, so the cascade is preserved and the page-specific design tokens (`:root`) and
  component rules still apply. Page-specific rules — and a few intentionally-drifted base rules (`.brand`
  font-size, `.lang-toggle button` padding, `h1` sizes) — stay in each page's inline `<style>`.
- **`js/shell.js`** holds the shared header + footer *markup*. It is loaded synchronously in `<head>`;
  each page declares `<div id="site-header"></div>` / `<div id="site-footer"></div>` placeholders with a
  tiny inline `Shell.header()` / `Shell.footer()` call that injects during parse (so there is no layout
  shift or flash). The active tab comes from `<body data-page="plan|play|learn">`. Every string carries a
  `data-i18n` key, so each page's existing `renderStrings()` pass translates the injected nodes. Shared
  nav strings (`brand`, `tabPlan`, `tabPlay`, `tabLearn`) live in `js/i18n.js` `I18N_BASE`; shell strings
  that differ per page (`bigDisclaimer`, `stickyBar`, aria labels, `skipLink`) stay in each page's
  `PAGE_I18N`. **Edit the header/footer once in `js/shell.js`; edit shared chrome styling once in
  `css/styles.css`.**
- **Cache-busting:** local asset URLs (`<script src="js/*.js?v=N">` and `<link href="css/styles.css?v=N">`)
  carry a shared version token (currently `v=9`). When you change any `js/*.js` **or** `css/styles.css`,
  bump that token everywhere so browsers and Vercel's CDN fetch the new file instead of a stale
  cached copy.

## File layout
```
index.html, play.html, learn.html   the pages
css/styles.css               shared site-shell chrome styles (linked last by every page)
js/shell.js                  shared header + footer markup, injected into placeholders
js/config.js                 TAX_YEAR_CONFIG — the ONE place annual amounts live (shared by all pages)
js/tax.js                    the pure tax engine (rate fns + simulators), shared by both tool pages
js/i18n.js                   shared I18N_BASE + helpers; each page adds its own PAGE_I18N
data/positivliste.json       ISIN snapshot the checker reads (currently a labelled SAMPLE)
scripts/build_positivliste.py  build-time: SKAT .xlsx -> data/positivliste.json (Action only)
scripts/make_og.py           regenerates og-image.png (the social preview card)
.github/workflows/refresh-positivliste.yml   weekly + manual snapshot refresh
og-image.png                 1200x630 OpenGraph/Twitter card
```

## Run locally
The ISIN checker fetches `data/positivliste.json`, so the site **must be served over HTTP** — do not
open `index.html` directly as a `file://` URL (that fetch is blocked and only an inlined sample shows).

```
python -m http.server 8124        # then open http://localhost:8124/index.html
```

The two tool pages run a self-test suite at load and show the result in a small badge; it must read
"✓ N/N self-checks passed · i18n ✓" (not the red failing state). `learn.html` shows a smaller
"✓ i18n complete" badge.

## Deploy
Hosted on Vercel, deployed automatically from `main`: the GitHub repo is connected via Vercel's Git
integration, so every push to `main` publishes. The site serves from the domain root
(`https://taxsmart-invest-denmark.vercel.app/`). The OpenGraph/canonical URLs are absolute — if the
domain changes, update them across every page `<head>`, `sitemap.xml`, and `robots.txt`, and
re-generate `og-image.png`.

## Keeping it correct
Numbers change every January and the positivliste every December. See **[MAINTENANCE.md](MAINTENANCE.md)**
for the exact fields to update, how to refresh the positivliste snapshot, and how to regenerate the
preview image.

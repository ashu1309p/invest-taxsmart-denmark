# Tax-smart investing in Denmark

A free, no-login, bilingual (EN/DA) educational website that explains Danish retail investment taxation
by letting you play with sliders and see the tax outcome. Static and stateless: no backend, no accounts,
no cookies (only `localStorage` for your language and slider choices). **Educational only, not advice.**

## The two pages
- **`index.html` — Plan / The Money Router** (the landing page): set a yearly target and see the
  cheapest-tax order to fill Danish accounts (børneopsparing → off-list fund + frikort → ASK → depot),
  with a "why" for each step, a keep-vs-tax comparison, a year-by-year chart, and a **positivliste ISIN
  checker**.
- **`play.html` — Play / The Wrapper Race + Gift Planner**: race the same savings across the four tax
  wrappers, and plan tax-free gifts to children (per-giver caps, the two-parent doubling, the
  parent-attribution trap, a gavebrev checklist).

## File layout
```
index.html, play.html        the two pages
js/config.js                 TAX_YEAR_CONFIG — the ONE place annual amounts live (shared by both pages)
js/tax.js                    the pure tax engine (rate fns + simulators), shared by both pages
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

Both pages run a self-test suite at load and show the result in a small badge; it must read
"✓ N/N self-checks passed" (not the red failing state).

## Deploy
Hosted on GitHub Pages from the repo root (`main`). Push the files above to root; `index.html` is the
landing page. The OpenGraph/canonical URLs are absolute — if the repo/Pages URL changes, update them in
both HTML `<head>`s and re-generate `og-image.png`.

## Keeping it correct
Numbers change every January and the positivliste every December. See **[MAINTENANCE.md](MAINTENANCE.md)**
for the exact fields to update, how to refresh the positivliste snapshot, and how to regenerate the
preview image.

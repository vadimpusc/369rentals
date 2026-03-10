# San Roku Ku Rentals (Svelte, non Kit)

A fast, multi page Svelte site for a camera rental business.

## What this includes

- Multi page build (each route has its own `index.html`) for strong SEO
- Inventory managed via JSON
  - `src/data/cameras.json`
  - `src/data/lenses.json`
  - `src/data/accessories.json`
- Each rental item has:
  - `kitIncludes` (list)
  - `specs` (key value map)
- Automatic generation of:
  - category pages
  - subcategory pages
  - item detail pages
  - `public/sitemap.xml` and `public/robots.txt`
- Premium dark theme with a light and dark toggle
- Mobile hamburger menu (shown below iPad width)

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The build runs `scripts/generate-pages.mjs` first. It reads the JSON files and writes static pages into:

- `/cameras/`, `/lenses/`, `/accessories/`
- `/lenses/<subcategory>/`, `/accessories/<subcategory>/`
- `/<kind>/<slug>/` for every item

## Configure

Update `src/data/site.json`:

- `baseUrl` for correct canonical URLs and sitemap
- contact details and address

Replace placeholder images in `public/placeholders/` with your own product photography.

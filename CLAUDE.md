# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static multi-page website for **Solara Design** — premium custom curtains, blinds, and motorization in Dubai. Bilingual: Russian (primary) + English (`/en/`). Pure HTML/CSS/JS, no frameworks, no build step, no package manager.

**Languages:** Russian (root, `/shtory/`, `/blekaut/`) + English (`/en/`, `/en/curtains/`, `/en/blinds/`). Language switcher in both headers.

## Running Locally

```bash
cd "/Users/rus/Desktop/FENESTRA/сайт 2 рус дубай"
python3 -m http.server 8889
```

No build, lint, or test commands — raw static files served directly. The component loader (`components.js`) requires HTTP (not file://) to fetch header/footer via `fetch()`.

## Minification

Both `.css` and `.js` have minified counterparts (`.min.css`, `.min.js`). After editing source files, regenerate:

```bash
npx terser assets/js/main.js -o assets/js/main.min.js --compress --mangle
npx terser assets/js/components.js -o assets/js/components.min.js --compress --mangle
npx clean-css-cli assets/css/styles.css -o assets/css/styles.min.css
```

Pages reference `.min` files. Always update both source and minified versions.

## Architecture

### Component Loading System

Header and footer are shared HTML fragments loaded dynamically by `assets/js/components.js` using `fetch()`.

**Components by language:**
- Russian: `components/header.html`, `components/footer.html`
- English: `en/components/header.html`, `en/components/footer.html`

**Critical concept — depth + basepath resolution:**
- Each HTML page sets `data-depth` on the `<html>` element
- `components.js` reads this to calculate the relative path prefix for loading components
- `data-depth="0"` (root `index.html`) → prefix `""` → loads `components/header.html`
- `data-depth="1"` (e.g., `shtory/index.html`) → prefix `"../"` → loads `../components/header.html`
- `data-depth="2"` (e.g., `shtory/blekaut/index.html`) → prefix `"../../"`

**`data-basepath` override:** EN pages use `data-basepath` to point to `/en/` components instead of root. Example: `<html data-depth="3" data-basepath="../../">` on `/en/curtains/blackout/index.html` loads components from `../../components/` (= `/en/components/`). Important: `data-basepath` must not be empty string (`""` is falsy in JS) — use `"./"` for depth-1 EN pages.

**Component injection targets:** `#site-header` and `#site-footer` (not `#header`/`#footer`).

After injection, a `component:loaded` custom event is dispatched so `main.js` can bind menu/scroll listeners.

### CSS Design System (`assets/css/styles.css`)

Single CSS file with custom properties:
- **Accent color:** `--color-accent: #B8924A` (warm gold/bronze)
- **Backgrounds:** `#FFFFFF`, `#F8F8F8` (alt), `#F5F0EB` (warm)
- **Text:** `#2D2D2D` (primary), `#6B6B6B` (secondary)
- **Font:** Montserrat (Google Fonts CDN), weights 300-700
- **Breakpoints:** 960px (tablet), 640px (mobile)

**Critical CSS:** All pages have inline `<style>` block in `<head>` with above-the-fold styles (variables, reset, header, hero, typography, buttons). The main stylesheet loads async via `<link rel="preload" ... onload="this.rel='stylesheet'">` with a `<noscript>` fallback.

### JavaScript (`assets/js/`)

- `components.js` — Component loader (fetch + depth/basepath resolution) + analytics injection (GA4 + Yandex.Metrica)
- `main.js` — Mobile menu, FAQ accordion, lazy loading (IntersectionObserver), header scroll effect, WhatsApp form handler, smooth scroll, lightbox with navigation, GA4 event tracking, Service Worker registration
- `calculator.js` — Price calculator: `area × basePrice × fabricMult × windows + motorization`

All vanilla ES6+.

### Lightbox

Handles both `.portfolio-item` (single image) and `.product-gallery-item` (navigable gallery). Features: prev/next arrows, swipe (touch events), keyboard (ArrowLeft/Right, Escape), counter ("2 / 6"). For portfolio items (single image), arrows and counter are hidden.

Product galleries use `<img>` tags with `srcset` and `alt` text. The lightbox reads URL from `img.src` (or falls back to parsing `background-image` for portfolio items).

### Analytics

GA4 (`G-FWB7K5M1LH`) and Yandex.Metrica (`107004207`) are injected by `components.js`. GA4 event tracking in `main.js` tracks WhatsApp clicks, phone calls, and form submissions.

### Service Worker

`sw.js` with cache `solara-v4`. Strategy: network-first for HTML, cache-first for assets. Bump version when deploying significant changes.

### Images

All images in **WebP** format (`assets/images/`). Subdirectories: `hero/`, `catalog/`, `products/`, `portfolio/`, `blog/`. Convert new images: `cwebp -q 80 input.png -o output.webp`.

**Favicon:** SVG at `assets/images/favicon.svg`.

### Known Gotchas

- **`component:loaded` fires twice** — once after header loads, once after footer. Functions like `initMobileMenu()` use a `mobileMenuInitialized` flag to prevent duplicate handlers.
- **z-index stacking:** header `1100` > mobile-menu `1050` > lightbox `2000`.
- **Burger X icon transforms:** The three `<span>` lines are 2px tall with `margin: 3px 0`. Center-to-center distance = **8px**. So `translateY(8px)` / `translateY(-8px)` moves spans 1 and 3 to overlap span 2.
- **Lazy loading images:** Use `data-src` (and optional `data-srcset`) instead of `src`. The `.loaded` class is added after load.
- **No inline grid overrides on mobile:** Never use inline `style="grid-template-columns: ..."` — it overrides CSS media queries.
- **EN basepath cannot be empty:** `data-basepath=""` is falsy in JS — use `"./"` for EN depth-1 pages.

### Forms → WhatsApp

No backend. Forms with `data-whatsapp-form` attribute collect inputs with `data-label` attributes and open `wa.me/971589408100` with a pre-filled message. Phone: +971 58 940 8100.

## Page Types & URL Structure

```
RUSSIAN (root)                              ENGLISH (/en/)
/                          depth=0          /en/                        depth=1, basepath="./"
/shtory/                   depth=1          /en/curtains/               depth=2, basepath="../"
  /shtory/blekaut/         depth=2            /en/curtains/blackout/    depth=3, basepath="../../"
  /shtory/tyul/            depth=2            /en/curtains/sheer/       depth=3
  /shtory/den-noch/        depth=2            /en/curtains/day-night/   depth=3
  /shtory/rimskie/         depth=2            /en/curtains/roman/       depth=3
  /shtory/shtory-na-zakaz/ depth=2            /en/curtains/custom/      depth=3
  /shtory/plisse/          depth=2            /en/curtains/pleated/     depth=3
  /shtory/yaponskie/       depth=2            /en/curtains/japanese/    depth=3
  /shtory/francuzskie/     depth=2            /en/curtains/french/      depth=3
/zhalyuzi/                 depth=1          /en/blinds/                 depth=2
  /zhalyuzi/rulonnye/      depth=2            /en/blinds/roller/        depth=3
  /zhalyuzi/vertikalnye/   depth=2            /en/blinds/vertical/      depth=3
  /zhalyuzi/gorizontalnye/ depth=2            /en/blinds/horizontal/    depth=3
  /zhalyuzi/derevyannye/   depth=2            /en/blinds/wooden/        depth=3
  /zhalyuzi/bambukovye/    depth=2            /en/blinds/bamboo/        depth=3
/motorizaciya/             depth=1          /en/motorization/           depth=2
/kalkulyator/              depth=1          /en/calculator/             depth=2
/akcii/                    depth=1          /en/promotions/             depth=2
/otzyvy/                   depth=1          /en/reviews/                depth=2
/blog/                     depth=1          /en/blog/                   depth=2
  /blog/{slug}/            depth=2            /en/blog/{slug}/          depth=3
/portfolio/                depth=1          /en/portfolio/              depth=2
/o-nas/                    depth=1          /en/about/                  depth=2
/kontakty/                 depth=1          /en/contacts/               depth=2
```

~70 pages total (35 RU + 35 EN). Every page is `{section}/index.html`. Asset paths use depth-based relative prefixes (`../../assets/css/styles.min.css` for depth=2, `../../../` for depth=3).

## SEO Structure

Every page includes:
- Unique `<title>` and `<meta name="description">`
- Geo-targeting: `geo.region=AE-DU`, `geo.placename=Dubai`, `geo.position`, `ICBM`
- Open Graph tags (`og:title`, `og:description`, `og:type`, `og:locale`)
- Bidirectional `hreflang` tags (RU ↔ EN) on all pages
- Schema.org JSON-LD: **LocalBusiness** (root), **BreadcrumbList** + **FAQPage** + **Product** (product pages), **Article** (blog posts)

Domain: `solaradesign.com` (configured in sitemap.xml, canonical URLs, hreflang, og:url, and robots.txt).

**OG Image:** Universal branded image at `assets/images/og-default.jpg` (1200×630 JPG).

**Important:** All internal links use absolute paths (`/shtory/`, `/zhalyuzi/`). The site must be served from root — never from a subdirectory.

## Deployment

**Live site:** https://kpackk.github.io/ (GitHub Pages)

**Repository:** `https://github.com/kpackk/kpackk.github.io.git` — `username.github.io` naming serves from root.

**Deploy:** Push to `master` branch → GitHub Pages auto-deploys.

```bash
git push origin master
```

## Adding New Pages

1. Create `{section}/{slug}/index.html` with correct `data-depth` on `<html>` (and `data-basepath` for EN pages)
2. Include `<div id="site-header"></div>` and `<div id="site-footer"></div>`
3. Include inline critical CSS `<style>` block + async stylesheet `<link rel="preload">`
4. Reference JS with correct relative prefix (`../` or `../../` or `../../../`)
5. Add bidirectional `hreflang` tags pointing to both RU and EN versions
6. Add Schema.org JSON-LD (BreadcrumbList + relevant type)
7. Add unique meta title, description, keywords, geo tags, OG tags
8. Update `sitemap.xml` with new URL and priority
9. Update header/footer nav if the page should appear in navigation

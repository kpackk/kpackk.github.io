# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static multi-page website for **Solara Design** — premium custom curtains, blinds, and motorization in Dubai. Bilingual: Russian (primary) + English (`/en/`). Pure HTML/CSS/JS, no frameworks, no build step, no package manager.

**Languages:** Russian (root, `/shtory/`, `/zhalyuzi/`) + English (`/en/`, `/en/curtains/`, `/en/blinds/`). Language switcher in both headers.

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
npx terser assets/js/calculator.js -o assets/js/calculator.min.js --compress --mangle
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
- **Text:** `#2D2D2D` (primary), `#6B6B6B` (secondary via `--color-text-light`)
- **Font:** Montserrat (Google Fonts CDN), weights 300-700
- **Breakpoints:** 960px (tablet), 640px (mobile)

**Critical CSS:** All pages have inline `<style>` block in `<head>` with above-the-fold styles (variables, reset, header, hero, typography, buttons, `:focus-visible`, `.skip-link`). The main stylesheet loads async via `<link rel="preload" ... onload="this.rel='stylesheet'">` with a `<noscript>` fallback.

### JavaScript (`assets/js/`)

- `components.js` — Component loader (fetch + depth/basepath resolution) + analytics injection (GA4 + Yandex.Metrica)
- `main.js` — Mobile menu, FAQ accordion, lazy loading (IntersectionObserver), header scroll effect, WhatsApp form handler, smooth scroll, lightbox with navigation, portfolio filters, GA4 event tracking, Service Worker registration
- `calculator.js` — Price calculator with input validation: `area × basePrice × fabricMult × windows + motorization`

All vanilla ES6+.

### Lightbox

Handles both `.portfolio-item` (single image) and `.product-gallery-item` (navigable gallery). Features: prev/next arrows, swipe (touch events), keyboard (ArrowLeft/Right, Escape), counter ("2 / 6"). For portfolio items (single image), arrows and counter are hidden.

Product galleries use `<img>` tags with `srcset` and `alt` text. The lightbox reads URL from `img.src` (or falls back to parsing `background-image` for portfolio items).

### Analytics

GA4 (`G-FWB7K5M1LH`) and Yandex.Metrica (`107004207`) are injected by `components.js`. GA4 event tracking in `main.js` tracks WhatsApp clicks, phone calls, and form submissions.

### Service Worker & PWA

`sw.js` with cache `solara-v6`. Strategy: network-first for HTML, cache-first for assets. Bump version when deploying significant changes.

**PWA manifests:**
- `/manifest.json` — Russian (start_url: `/`, lang: `ru`)
- `/en/manifest.json` — English (start_url: `/en/`, lang: `en`)

RU pages link to `/manifest.json`, EN pages link to `/en/manifest.json`.

### Images

All images in **WebP** format (`assets/images/`). Subdirectories: `hero/`, `catalog/`, `products/`, `portfolio/`, `blog/`. Convert new images: `cwebp -q 80 input.png -o output.webp`.

**Favicon:** SVG at `assets/images/favicon.svg`.
**OG Image:** Universal branded image at `assets/images/og-default.jpg` (1200×630 JPG).

### Known Gotchas

- **`component:loaded` fires twice** — once after header loads, once after footer. Functions like `initMobileMenu()` use a `mobileMenuInitialized` flag to prevent duplicate handlers.
- **z-index stacking:** header `1100` > mobile-menu `1050` > lightbox `2000`.
- **Burger X icon transforms:** The three `<span>` lines are 2px tall with `margin: 3px 0`. Center-to-center distance = **8px**. So `translateY(8px)` / `translateY(-8px)` moves spans 1 and 3 to overlap span 2.
- **Lazy loading images:** Use `data-src` (and optional `data-srcset`) instead of `src`. The `.loaded` class is added after load.
- **No inline grid overrides on mobile:** Never use inline `style="grid-template-columns: ..."` — it overrides CSS media queries.
- **EN basepath cannot be empty:** `data-basepath=""` is falsy in JS — use `"./"` for EN depth-1 pages.
- **CSS variable `--color-text-light`** is the secondary text color (`#6B6B6B`). Do not use `--color-text-secondary` — it doesn't exist.

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

~68 pages total (34 RU + 34 EN, including 10 blog articles each). Every page is `{section}/index.html`. Asset paths use depth-based relative prefixes (`../../assets/css/styles.min.css` for depth=2, `../../../` for depth=3).

## SEO Structure

Every page includes:
- Unique `<title>` and `<meta name="description">` (max 160 chars)
- `og:image:width` (1200) and `og:image:height` (630)
- Geo-targeting: `geo.region=AE-DU`, `geo.placename=Dubai`
- Open Graph tags (`og:title`, `og:description`, `og:type`, `og:locale`)
- Bidirectional `hreflang` tags (RU ↔ EN + `x-default`) on all pages
- `<time datetime="YYYY-MM-DD">` on all blog dates
- Schema.org JSON-LD: **LocalBusiness** (root), **BreadcrumbList** + **FAQPage** + **Product** (product pages), **Article** with `publisher.logo` (blog posts), **ItemList** (hub pages), **Review** + **AggregateRating** (review pages)
- Accessibility: `<main id="main-content">`, skip-link, `:focus-visible` styles, `aria-label` on form inputs

Domain: `solaradesign.com` (configured in sitemap.xml, canonical URLs, hreflang, og:url, and robots.txt).

**Important:** All internal links use absolute paths (`/shtory/`, `/zhalyuzi/`). The site must be served from root.

## Deployment

**GitHub Pages:** `https://github.com/kpackk/kpackk.github.io.git` — push to `master` → auto-deploy.

```bash
git push origin master
```

**VPS (195.226.92.111):** Nginx serves the site on port 80. Deploy via rsync:

```bash
rsync -avz --exclude='.git' --exclude='docs' --exclude='.claude' \
  ./ root@195.226.92.111:/var/www/solaradesign.com/
```

Nginx config: `/etc/nginx/sites-available/solaradesign.com`. After deploying, reload: `ssh root@195.226.92.111 'systemctl reload nginx'`.

**Netlify config** (`netlify.toml`) exists for optional Netlify deployment with 404 redirects and cache headers, but is not currently active.

## Adding New Pages

1. Create `{section}/{slug}/index.html` with correct `data-depth` on `<html>` (and `data-basepath` for EN pages)
2. Include `<a href="#main-content" class="skip-link">` after `<body>`, `<div id="site-header"></div>`, `<main id="main-content">`, `<div id="site-footer"></div>`
3. Include inline critical CSS `<style>` block (with `:focus-visible` and `.skip-link` rules) + async stylesheet `<link rel="preload">`
4. Reference JS with correct relative prefix (`../` or `../../` or `../../../`)
5. Add bidirectional `hreflang` tags pointing to both RU and EN versions + `x-default`
6. Add Schema.org JSON-LD (BreadcrumbList + relevant type)
7. Add unique meta title, description (under 160 chars), keywords, geo tags, OG tags with `og:image:width`/`og:image:height`
8. Add `<time datetime="YYYY-MM-DD">` for any dates
9. Add `aria-label` to form inputs
10. Use `rel="noopener noreferrer"` on all external `target="_blank"` links
11. Reference correct manifest: `/manifest.json` (RU) or `/en/manifest.json` (EN)
12. Update `sitemap.xml` with new URL, priority, and `<lastmod>`

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static multi-page website for **Solara Design** — premium custom curtains, blinds, and motorization in Dubai. Targets Russian-speaking audience in UAE. Pure HTML/CSS/JS, no frameworks, no build step, no package manager.

**Language:** All content and UI in Russian. URLs use Russian transliteration (`/shtory/`, `/blekaut/`, `/kalkulyator/`).

## Running Locally

```bash
# Start local server (any port)
cd "/Users/rus/Desktop/FENESTRA/сайт 2 рус дубай"
python3 -m http.server 8889
```

No build, lint, or test commands — raw static files served directly. The component loader (`components.js`) requires HTTP (not file://) to fetch header/footer via `fetch()`.

## Architecture

### Component Loading System

Header and footer are shared HTML fragments in `components/`. They are loaded dynamically by `assets/js/components.js` using `fetch()`.

**Critical concept — depth-based path resolution:**
- Each HTML page sets `data-depth` on the `<html>` element
- `components.js` reads this to calculate the correct relative path prefix for loading components
- `data-depth="0"` (root `index.html`) → loads from `components/header.html`
- `data-depth="1"` (e.g., `shtory/index.html`) → loads from `../components/header.html`
- `data-depth="2"` (e.g., `shtory/blekaut/index.html`) → loads from `../../components/header.html`

**Component injection targets:** `#site-header` and `#site-footer` (not `#header`/`#footer`).

After injection, a `component:loaded` custom event is dispatched so `main.js` can bind menu/scroll listeners.

### CSS Design System (`assets/css/styles.css`)

Single CSS file with custom properties:
- **Accent color:** `--color-accent: #B8924A` (warm gold/bronze)
- **Backgrounds:** `#FFFFFF`, `#F8F8F8` (alt), `#F5F0EB` (warm)
- **Text:** `#2D2D2D` (primary), `#6B6B6B` (secondary)
- **Font:** Montserrat (Google Fonts CDN), weights 300-700
- **Breakpoints:** 960px (tablet), 640px (mobile)

### JavaScript (`assets/js/`)

- `components.js` — Component loader (fetch + depth resolution)
- `main.js` — Mobile menu, FAQ accordion, lazy loading (IntersectionObserver), header scroll effect, WhatsApp form handler, smooth scroll
- `calculator.js` — Price calculator: `area × basePrice × fabricMult × windows + motorization`

All vanilla ES6+. Total ~354 lines.

### Known Gotchas

- **`component:loaded` fires twice** — once after header loads, once after footer. Any listener on this event runs 2×. Functions like `initMobileMenu()` use a `mobileMenuInitialized` flag to prevent duplicate event handlers.
- **z-index stacking:** header `1100` > mobile-menu `1050`. The burger button lives inside the header so it stays above the open menu.
- **Burger X icon transforms:** The three `<span>` lines are 2px tall with `margin: 3px 0`. In flex-column the center-to-center distance between spans is **8px** (2px height + 3px bottom margin + 3px top margin). So `translateY(8px)` / `translateY(-8px)` moves spans 1 and 3 to overlap span 2's center.
- **Lazy loading images:** Use `data-src` (and optional `data-srcset`) instead of `src` for lazy-loaded images. The `.loaded` class is added after the image loads.

### Forms → WhatsApp

No backend. Forms with `data-whatsapp-form` attribute collect inputs with `data-label` attributes and open `wa.me/971589408100` with a pre-filled message. Phone: +971 58 940 8100.

## Page Types & URL Structure

```
/                          → index.html (depth=0) — Homepage
/shtory/                   → Hub page (depth=1) — All curtains
/shtory/blekaut/           → Product page (depth=2) — Blackout curtains
/zhalyuzi/                 → Hub page (depth=1) — All blinds
/zhalyuzi/rulonnye/        → Product page (depth=2) — Roller blinds
/motorizaciya/             → Landing page (depth=1)
/kalkulyator/              → Calculator (depth=1)
/blog/                     → Blog listing (depth=1)
/blog/kak-vybrat-shtory/   → Article (depth=2)
/portfolio/, /o-nas/, /kontakty/ → Info pages (depth=1)
```

Every page is `{section}/index.html`. Asset references use relative paths based on depth (`../../assets/css/styles.css` for depth=2).

## SEO Structure

Every page includes:
- Unique `<title>` and `<meta name="description">`
- Geo-targeting: `geo.region=AE-DU`, `geo.placename=Dubai`, `geo.position`, `ICBM`
- Open Graph tags (`og:title`, `og:description`, `og:type`, `og:locale=ru_RU`)
- `hreflang="ru"` (prepared for future EN version)
- Schema.org JSON-LD: **LocalBusiness** (root), **BreadcrumbList** + **FAQPage** + **Product** (product pages), **Article** (blog posts)

Domain: `solaradesign.ae` (configured in sitemap.xml and canonical URLs).

## Public Access (Tunneling)

For sharing the local site externally (e.g., with colleagues or for mobile testing):

```bash
# Option 1: Serveo (SSH-based, no install)
ssh -R 80:localhost:8889 serveo.net

# Option 2: Cloudflare Tunnel
cloudflared tunnel --url http://localhost:8889
```

## Responsive Layout

- **Desktop (>960px):** Full multi-column grids, all header elements visible
- **Tablet (≤960px):** Burger menu appears, header nav hidden, 2-column grids
- **Mobile (≤640px):** WhatsApp button hidden from header (available in mobile menu), advantages/catalog/steps use 2-column grids, reduced padding (`--container-padding: 1rem`), catalog last odd card spans full width with 16:9 aspect ratio

## Adding New Pages

1. Create `{section}/{slug}/index.html` with correct `data-depth` on `<html>`
2. Include `<div id="site-header"></div>` and `<div id="site-footer"></div>`
3. Reference CSS/JS with correct relative prefix (`../` or `../../`)
4. Add Schema.org JSON-LD (BreadcrumbList + relevant type)
5. Add unique meta title, description, keywords, geo tags, OG tags
6. Update `sitemap.xml` with new URL and priority

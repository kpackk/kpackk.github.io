# Lightbox + Performance Optimization — Design

**Date:** 2026-02-25
**Status:** Approved

## Goal

Enhance product page galleries with navigable lightbox, switch to `<img>` tags with srcset for responsive images, and add critical CSS for faster rendering.

## 1. Lightbox with Navigation for Product Galleries

Extend existing lightbox in `main.js` (currently works for portfolio only) to also handle `.product-gallery-item` clicks.

**Features:**
- Click product gallery image → full-screen lightbox
- Left/right arrows for navigation between photos in same gallery
- Swipe left/right on mobile (touch events)
- Close: X button, Esc key, click on backdrop
- Keyboard navigation: arrow keys ← →
- Counter: "2 / 6" displayed in corner

**CSS additions:** `.lightbox-prev`, `.lightbox-next` (SVG arrows, 48px+ tap targets), `.lightbox-counter`

**Files:** `assets/js/main.js`, `assets/js/main.min.js`, `assets/css/styles.css`, `assets/css/styles.min.css`

Works identically on RU and EN pages — JS binds to CSS classes, not text.

## 2. Product Galleries: background-image → `<img>` with srcset

**Current:**
```html
<div class="product-gallery-item" style="background: url('...') center/cover no-repeat;"></div>
```

**New:**
```html
<div class="product-gallery-item">
  <img src="path/to/image.webp"
       srcset="path/to/image.webp 800w"
       sizes="(max-width: 640px) 100vw, (max-width: 960px) 50vw, 33vw"
       alt="Descriptive alt text"
       loading="lazy">
</div>
```

**CSS:** `.product-gallery-item img { width: 100%; height: 100%; object-fit: cover; }`

**Benefits:** SEO (alt text), accessibility, native lazy loading, srcset ready for multiple sizes.

**Scope:** 28 pages (14 RU + 14 EN product pages). Only `.product-gallery` sections.

**Lightbox update:** Read URL from `img.src` instead of parsing `background-image`.

## 3. Critical CSS

**Approach:** Extract minimal above-the-fold styles (~3-4 KB) and inline in `<style>` block in `<head>` of every page.

**Critical CSS includes:** CSS variables, font-family, reset basics, header, hero section, container, grid basics.

**External CSS loaded async:**
```html
<style>/* critical CSS here */</style>
<link rel="preload" href="styles.min.css" as="style" onload="this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="styles.min.css"></noscript>
```

**Scope:** All ~70 pages (RU + EN). Same critical CSS block for all pages.

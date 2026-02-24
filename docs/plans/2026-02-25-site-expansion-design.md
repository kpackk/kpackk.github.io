# Solara Design — Site Expansion Design

**Date:** 2026-02-25
**Status:** Approved

## Overview

Expand the Solara Design website with 15 new pages, portfolio filter functionality, and navigation updates. All work follows existing patterns (depth-based component loading, WhatsApp forms, Schema.org markup, WebP images, responsive grids).

## 1. New Product Pages (7 pages, depth=2)

### Curtains (`/shtory/`)

| URL | Title | Price from (AED) |
|-----|-------|-----------------|
| `/shtory/plisse/` | Шторы-плиссе | 180 |
| `/shtory/yaponskie/` | Японские панели | 250 |
| `/shtory/francuzskie/` | Французские шторы | 350 |

### Blinds (`/zhalyuzi/`)

| URL | Title | Price from (AED) |
|-----|-------|-----------------|
| `/zhalyuzi/derevyannye/` | Деревянные жалюзи | 300 |
| `/zhalyuzi/bambukovye/` | Бамбуковые жалюзи | 250 |

### Each product page structure:
1. Breadcrumbs
2. Hero section (background image, min-height 420px)
3. Photo gallery (3 images, 3-col grid)
4. Features section (4-6 items, 2-col grid)
5. SEO text block (max-width 800px)
6. Pricing hint (warm background)
7. FAQ accordion (4-5 questions)
8. Related products (3 cards)
9. CTA WhatsApp form
10. Schema.org: BreadcrumbList + Product + FAQPage

### Updates to existing files:
- `shtory/index.html` — add 3 new catalog cards
- `zhalyuzi/index.html` — add 2 new catalog cards
- `sitemap.xml` — 7 new URLs

## 2. New Blog Articles (5 pages, depth=2)

| URL | Title | Topic |
|-----|-------|-------|
| `/blog/uhod-za-shtorami-v-dubae/` | Уход за шторами в климате Дубая | Cleaning, sun protection, washing frequency |
| `/blog/trendy-shtor-2026/` | Тренды штор и жалюзи 2026 | Minimalism, natural fabrics, smart rails |
| `/blog/sravnenie-tkanej/` | Сравнение тканей: полиэстер vs натуральные | Pros/cons, best for Dubai climate |
| `/blog/zhalyuzi-dlya-ofisa/` | Как выбрать жалюзи для офиса | Types, light control, budget |
| `/blog/umnyj-dom-motorizaciya/` | Умный дом и моторизация: полный гид | Somfy, integrations, scenarios |

### Each article structure:
1. Breadcrumbs
2. Title + publication date (2026-02-25)
3. Article content (800-1200 words, max-width 800px, 17px font, 1.8 line-height)
4. Related articles (2 cards)
5. CTA WhatsApp form
6. Schema.org: BreadcrumbList + Article

### Updates:
- `blog/index.html` — add 5 new article cards
- `sitemap.xml` — 5 new URLs

## 3. Promotions Page (`/akcii/`, depth=1)

### Structure:
1. Breadcrumbs
2. Hero title: "Акции и спецпредложения"
3. Promo cards grid (2 cols desktop, 1 col mobile)

### Promotions (4 cards):

| Promo | Discount | Description |
|-------|----------|-------------|
| Скидка на блэкаут | -15% | All blackout fabrics until end of March |
| Шторы + моторизация | -20% on motorization | Bundle: curtains + Somfy electric rail |
| Бесплатный замер + дизайн | Free | For orders of 3+ windows |
| Жалюзи для офисов | -10% | For orders of 5+ windows, commercial |

### Card format:
- Discount/condition badge (accent color)
- Title + description (2-3 sentences)
- Validity period
- CTA button → scroll to order form

### Footer:
- CTA WhatsApp form
- Schema.org: BreadcrumbList

### Updates:
- `components/header.html` — add "Акции" nav link
- `components/footer.html` — add "Акции" nav link
- `sitemap.xml` — 1 new URL

## 4. Portfolio Filters (existing page update)

### Changes to `portfolio/index.html`:
1. Add `data-category` attribute to each of 12 portfolio items:
   - Items 1,2,6,7,8,10 → `shtory`
   - Items 4,5,11 → `zhalyuzi`
   - Items 3,9,12 → `motorizaciya`

2. Add JS filter logic (inline script):
   - Click filter button → show matching `data-category` items
   - "Все" shows all
   - Smooth show/hide animation (opacity + scale)
   - Active button gets `.active` class

3. No CSS changes needed — `.portfolio-filter-btn` and `.active` styles exist.

## 5. Reviews Page (`/otzyvy/`, depth=1)

### Structure:
1. Breadcrumbs
2. Hero title: "Отзывы наших клиентов"
3. Subtitle: "Реальные проекты и впечатления"
4. Review cards (1-col, full-width)

### Card format (mini case study):
- Desktop: photo left (40%) + text right (60%)
- Mobile: photo top, text bottom
- Photo: project image (aspect 4:3, reuse portfolio/product images)
- Content: client name, 5-star rating, work type, district, quote (2-3 lines)

### Reviews (6 items):

| Name | District | Work type | Summary |
|------|----------|-----------|---------|
| Анна М. | Dubai Marina | Блэкаут шторы | Bedroom, complete darkness |
| Дмитрий К. | Downtown | Моторизация Somfy | Phone-controlled curtains |
| Елена С. | Palm Jumeirah | Тюль + портьеры | Villa, panoramic windows |
| Олег Р. | Business Bay | Рулонные жалюзи | Office, sun protection |
| Марина В. | JBR | Римские шторы | Kitchen and living room |
| Сергей Т. | Emirates Hills | День-ночь | Kids room |

### Footer:
- CTA WhatsApp form: "Хотите такой же результат?"
- Schema.org: BreadcrumbList

### Updates:
- `components/footer.html` — add "Отзывы" nav link
- `sitemap.xml` — 1 new URL

## Summary

| Category | New pages | Updated files |
|----------|-----------|---------------|
| Product pages | 7 | shtory/index.html, zhalyuzi/index.html |
| Blog articles | 5 | blog/index.html |
| Promotions | 1 | header.html, footer.html |
| Reviews | 1 | footer.html |
| Portfolio | 0 (update) | portfolio/index.html |
| Shared | — | sitemap.xml |
| **Total** | **14 new pages** | **7 updated files** |

## Execution Order

1. Product pages (7) + update hub pages
2. Blog articles (5) + update blog listing
3. Promotions page + update navigation
4. Portfolio filters (JS only)
5. Reviews page + update footer
6. Update sitemap.xml

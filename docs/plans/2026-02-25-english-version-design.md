# English Version — Full Parity Design

**Date:** 2026-02-25
**Status:** Approved

## Goal

Complete the English version of solaradesign.ae to full parity with the Russian version (~26 new pages + fixes to 8 existing pages + language switcher).

## Current State

8 EN pages exist and are fully translated:
- `/en/` (homepage), `/en/curtains/`, `/en/blinds/`, `/en/motorization/`
- `/en/about/`, `/en/contacts/`, `/en/portfolio/`
- `/en/components/header.html`, `/en/components/footer.html`

**Issue:** Existing EN pages reference `.min.css`/`.min.js` files that don't exist. Must fix to use non-minified versions.

## URL Structure

```
/en/                                        → Homepage (EXISTS)
/en/curtains/                               → Hub (EXISTS)
  /en/curtains/blackout/                    → Blackout curtains
  /en/curtains/sheer/                       → Sheer/Tulle
  /en/curtains/day-night/                   → Day-Night
  /en/curtains/roman/                       → Roman shades
  /en/curtains/custom/                      → Custom drapes
  /en/curtains/pleated/                     → Pleated
  /en/curtains/japanese/                    → Japanese panels
  /en/curtains/french/                      → French curtains
/en/blinds/                                 → Hub (EXISTS)
  /en/blinds/roller/                        → Roller blinds
  /en/blinds/vertical/                      → Vertical
  /en/blinds/horizontal/                    → Horizontal
  /en/blinds/wooden/                        → Wooden
  /en/blinds/bamboo/                        → Bamboo
/en/motorization/                           → EXISTS
/en/calculator/                             → Price calculator
/en/promotions/                             → Promotions
/en/reviews/                                → Reviews
/en/blog/                                   → Blog listing
  /en/blog/how-to-choose-curtains-dubai/
  /en/blog/blackout-curtains-dubai/
  /en/blog/motorized-curtains-smart-home/
  /en/blog/roller-blinds-vs-shutters/
  /en/blog/bedroom-curtains-guide/
  /en/blog/curtain-care-dubai/
  /en/blog/curtain-trends-2026/
  /en/blog/fabric-comparison/
  /en/blog/office-blinds/
  /en/blog/smart-home-motorization/
/en/portfolio/                              → EXISTS
/en/about/                                  → EXISTS
/en/contacts/                               → EXISTS
```

Two RU blog articles about curtain care merged into one EN article. Total: 10 EN blog articles.

## Technical Decisions

### Asset References
- All EN pages use shared non-minified files: `styles.css`, `components.js`, `main.js`, `calculator.js`
- Paths based on depth: `../assets/` (depth=1), `../../assets/` (depth=2), `../../../assets/` (depth=3)

### data-depth Values
- `/en/index.html` → depth=1
- `/en/curtains/index.html` → depth=2
- `/en/curtains/blackout/index.html` → depth=3
- `/en/blog/index.html` → depth=2
- `/en/blog/how-to-choose-curtains-dubai/index.html` → depth=3

### Components
- Use existing `/en/components/header.html` and `footer.html`
- Update navigation: add Blog, Promotions, Reviews, Calculator links
- Add language switcher (RU | EN)

### Language Switcher
- Placed in header of both RU and EN versions
- Desktop: right side of navigation bar
- Mobile: inside mobile menu
- Links to corresponding page in other language via hreflang alternate
- Pages without a counterpart link to the other version's homepage

### hreflang
Every page (RU and EN) gets:
```html
<link rel="alternate" hreflang="ru" href="https://solaradesign.ae/shtory/blekaut/">
<link rel="alternate" hreflang="en" href="https://solaradesign.ae/en/curtains/blackout/">
```

### Schema.org
- Product pages: BreadcrumbList + Product + FAQPage
- Blog articles: BreadcrumbList + Article
- Reviews: BreadcrumbList + Review aggregate

## Content Strategy

### Product Pages (14)
- 1:1 structure with RU counterpart: hero, description, advantages, gallery, FAQ, CTA form
- SEO meta adapted for English keywords (e.g., "blackout curtains Dubai")

### Blog (hub + 10 articles)
- Adapted for English-speaking audience (not literal translation)
- English SEO keywords for Google.ae English queries
- More direct, less formal writing style
- Meaningful English slugs

### Calculator
- Translate UI labels, buttons, results
- JS logic shared — no separate EN calculator.js needed

### Promotions, Reviews
- Direct translation from RU with localization
- Review names and text in English

### 404 Page
- `/en/404.html` — "Page not found" with link to `/en/`

## Implementation Approach

Sequential creation by groups, with parallel agents within each group:

1. Fix existing 8 EN pages (CSS/JS references)
2. Add language switcher to both RU and EN headers
3. Curtain product pages (9)
4. Blind product pages (5)
5. Calculator, Promotions, Reviews
6. Blog (hub + 10 articles)
7. 404 page
8. Update sitemap.xml, header/footer navigation

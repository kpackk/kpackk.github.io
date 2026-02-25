# English Version Full Parity — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Complete the English version of solaradesign.ae to full parity with the Russian version (~26 new pages + fixes + language switcher).

**Architecture:** Static HTML pages under `/en/` directory. Each page is translated from its RU counterpart, adapting content for English-speaking audience. Shared CSS/JS/images from root `/assets/`. EN components at `/en/components/`. Component loading uses `data-basepath` attribute to resolve paths to `/en/` directory.

**Tech Stack:** HTML5, CSS3, vanilla JS. No build step. Google Fonts (Montserrat). WhatsApp forms.

**Design doc:** `docs/plans/2026-02-25-english-version-design.md`

---

## Reference: EN Page Template

All EN pages follow this structure. `data-basepath` must point to `/en/` directory (the base for EN component loading). CSS/JS paths point to root `/assets/`.

```
Path from root          | data-depth | data-basepath | CSS/JS prefix  | Component loads from
/en/index.html          | 1          | "./"          | ../            | ./components/ → /en/components/
/en/{section}/index.html| 2          | "../"         | ../../         | ../components/ → /en/components/
/en/{s}/{sub}/index.html| 3          | "../../"      | ../../../      | ../../components/ → /en/components/
```

### Head template (for depth=3 product/article page):

```html
<!DOCTYPE html>
<html lang="en" data-depth="3" data-basepath="../../">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" href="/assets/images/favicon.svg" type="image/svg+xml">
  <link rel="canonical" href="https://solaradesign.ae/en/{section}/{slug}/">
  <title>{EN Title} | Solara Design</title>
  <meta name="description" content="{EN description}">
  <meta name="keywords" content="{EN keywords}">
  <meta name="geo.region" content="AE-DU">
  <meta name="geo.placename" content="Dubai">
  <meta name="geo.position" content="25.2048;55.2708">
  <meta name="ICBM" content="25.2048, 55.2708">
  <meta property="og:title" content="{EN Title} | Solara Design">
  <meta property="og:description" content="{EN description}">
  <meta property="og:type" content="product"> <!-- or "article" for blog -->
  <meta property="og:locale" content="en_US">
  <meta property="og:url" content="https://solaradesign.ae/en/{section}/{slug}/">
  <meta property="og:image" content="https://solaradesign.ae/assets/images/{image}">
  <link rel="alternate" hreflang="ru" href="https://solaradesign.ae/{ru-path}/">
  <link rel="alternate" hreflang="en" href="https://solaradesign.ae/en/{en-path}/">
  <link rel="preload" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap" as="style">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../../../assets/css/styles.min.css">
  <!-- Schema.org JSON-LD blocks here -->
</head>
```

### Body template (product page):

```html
<body>
  <div id="site-header"></div>
  <div class="breadcrumbs">
    <div class="container">
      <a href="/en/">Home</a> <span>/</span> <a href="/en/{section}/">{Section}</a> <span>/</span> {Product}
    </div>
  </div>
  <!-- Sections: hero, gallery, features, SEO text, pricing, FAQ, related products, CTA form -->
  <div id="site-footer"></div>
  <a href="https://wa.me/971589408100" class="whatsapp-float" target="_blank" rel="noopener" aria-label="WhatsApp">
    <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
  </a>
  <script src="../../../assets/js/components.min.js"></script>
  <script src="../../../assets/js/main.min.js"></script>
</body>
</html>
```

### CTA form (EN version, used at bottom of every product/hub page):

```html
<section class="section section-warm" id="order">
  <div class="container">
    <div class="form-section" style="background:transparent; padding:0;">
      <div class="form-wrapper">
        <h2 class="section-title">Book a Free Measurement</h2>
        <p class="section-subtitle">Leave a request and we'll contact you within 30 minutes</p>
        <form class="contact-form" data-whatsapp-form>
          <div class="form-group">
            <input type="text" name="name" class="form-input" placeholder="Your name" data-label="Name" required>
          </div>
          <div class="form-group">
            <input type="tel" name="phone" class="form-input" placeholder="+971 XX XXX XXXX" data-label="Phone" required>
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-primary" style="width:100%">Book a Measurement</button>
          </div>
          <p class="text-center" style="font-size: var(--text-sm); color: var(--color-text-light);">Or message us on <a href="https://wa.me/971589408100" target="_blank" rel="noopener" style="color: var(--color-accent); font-weight: var(--font-weight-semibold);">WhatsApp</a></p>
        </form>
      </div>
    </div>
  </div>
</section>
```

---

## Task 1: Fix EN homepage basepath bug

**Files:** Modify: `en/index.html:2`

**Step 1:** Change `data-basepath=""` to `data-basepath="./"` so component loader finds EN components.

```html
<!-- Before -->
<html lang="en" data-depth="1" data-basepath="">
<!-- After -->
<html lang="en" data-depth="1" data-basepath="./">
```

**Step 2:** Verify by starting local server and loading `/en/` — header should show English navigation.

**Step 3:** Commit: `fix: correct EN homepage basepath for component loading`

---

## Task 2: Add language switcher to both headers

**Files:**
- Modify: `components/header.html`
- Modify: `en/components/header.html`

**Step 1:** Add language switcher to RU header (`components/header.html`).

In the desktop nav, add after the last nav link:
```html
<a href="/en/" class="header-lang">EN</a>
```

In the mobile menu nav, add at the end:
```html
<a href="/en/" class="header-lang">EN</a>
```

**Step 2:** Add language switcher to EN header (`en/components/header.html`).

In the desktop nav, add after the last nav link:
```html
<a href="/" class="header-lang">RU</a>
```

In the mobile menu nav, add at the end:
```html
<a href="/" class="header-lang">RU</a>
```

**Step 3:** Add CSS for the lang switcher in `assets/css/styles.css`. Add before the media queries section:

```css
.header-lang {
  font-weight: 600;
  font-size: 13px;
  letter-spacing: 0.05em;
  opacity: 0.7;
  transition: opacity 0.2s;
}
.header-lang:hover { opacity: 1; }
```

**Step 4:** Regenerate `styles.min.css` to include the new CSS (or add the rule there too).

**Step 5:** Commit: `feat: add RU/EN language switcher to headers`

---

## Task 3: Update EN header & footer navigation

**Files:**
- Modify: `en/components/header.html`
- Modify: `en/components/footer.html`

**Step 1:** Update EN header to include all sections (currently missing Blog, Promotions, Reviews, Calculator):

```html
<nav class="header-nav">
  <a href="/en/curtains/">Curtains</a>
  <a href="/en/blinds/">Blinds</a>
  <a href="/en/motorization/">Motorization</a>
  <a href="/en/portfolio/">Portfolio</a>
  <a href="/en/blog/">Blog</a>
  <a href="/en/promotions/">Promotions</a>
  <a href="/en/about/">About</a>
  <a href="/en/contacts/">Contacts</a>
  <a href="/" class="header-lang">RU</a>
</nav>
```

Same for mobile menu nav.

**Step 2:** Update EN footer to include Blog, Reviews, Promotions, Calculator links:

In "Products" section, add:
```html
<a href="/en/calculator/">Calculator</a>
```

In "Company" section, update to:
```html
<a href="/en/portfolio/">Portfolio</a>
<a href="/en/blog/">Blog</a>
<a href="/en/reviews/">Reviews</a>
<a href="/en/promotions/">Promotions</a>
<a href="/en/about/">About Us</a>
<a href="/en/contacts/">Contacts</a>
```

**Step 3:** Commit: `feat: update EN header/footer with all section links`

---

## Task 4: Create 9 curtain product pages

For each page: read the RU source, translate content for English-speaking audience, create EN page at correct path with correct depth/basepath/CSS paths.

**Directory creation:** Create all directories first:
```bash
mkdir -p en/curtains/{blackout,sheer,day-night,roman,custom,pleated,japanese,french}
```

### Page specifications:

| EN slug | RU source | EN Title | Price | hreflang RU |
|---------|-----------|----------|-------|-------------|
| blackout | shtory/blekaut/ | Custom Blackout Curtains in Dubai — Full Light Blocking | from 200 AED/m² | /shtory/blekaut/ |
| sheer | shtory/tyul/ | Custom Sheer Curtains in Dubai — Lightweight Elegance | from 150 AED/m² | /shtory/tyul/ |
| day-night | shtory/den-noch/ | Day-Night Curtains in Dubai — Flexible Light Control | from 180 AED/m² | /shtory/den-noch/ |
| roman | shtory/rimskie/ | Custom Roman Shades in Dubai — Elegant Folds | from 250 AED/m² | /shtory/rimskie/ |
| custom | shtory/shtory-na-zakaz/ | Custom Curtains in Dubai — Bespoke Tailoring | from 150 AED/m² | /shtory/shtory-na-zakaz/ |
| pleated | shtory/plisse/ | Pleated Shades in Dubai — Compact & Stylish | from 180 AED/m² | /shtory/plisse/ |
| japanese | shtory/yaponskie/ | Japanese Panel Curtains in Dubai — Minimalist Design | from 250 AED/m² | /shtory/yaponskie/ |
| french | shtory/francuzskie/ | French Curtains in Dubai — Luxury & Elegance | from 350 AED/m² | /shtory/francuzskie/ |

**For each page, follow these steps:**

**Step 1:** Read the RU source file completely.

**Step 2:** Create `en/curtains/{slug}/index.html` using the depth=3 template:
- `data-depth="3"` and `data-basepath="../../"`
- CSS: `../../../assets/css/styles.min.css`
- JS: `../../../assets/js/components.min.js` and `../../../assets/js/main.min.js`
- `lang="en"`, `og:locale="en_US"`
- Translate ALL text content to English (not literal — adapt for English SEO)
- Breadcrumbs: `Home / Curtains / {Product Name}`
- Breadcrumb links: `/en/` and `/en/curtains/`
- Related products links: `/en/curtains/{other-slug}/`
- Calculator link: `/en/calculator/`
- Schema.org: BreadcrumbList (3 items, EN names, EN URLs) + FAQPage (translated) + Product (EN name/description)
- hreflang: both RU and EN alternates
- Images: same paths as RU version (shared assets)

**Step 3:** After creating all 9 pages, verify each loads correctly at `http://localhost:8889/en/curtains/{slug}/`.

**Step 4:** Commit: `feat: add 9 English curtain product pages`

---

## Task 5: Create 5 blind product pages

**Directory creation:**
```bash
mkdir -p en/blinds/{roller,vertical,horizontal,wooden,bamboo}
```

### Page specifications:

| EN slug | RU source | EN Title | Price | hreflang RU |
|---------|-----------|----------|-------|-------------|
| roller | zhalyuzi/rulonnye/ | Custom Roller Blinds in Dubai — Compact Sun Protection | from 120 AED/m² | /zhalyuzi/rulonnye/ |
| vertical | zhalyuzi/vertikalnye/ | Custom Vertical Blinds in Dubai — For Panoramic Windows | from 100 AED/m² | /zhalyuzi/vertikalnye/ |
| horizontal | zhalyuzi/gorizontalnye/ | Custom Horizontal Blinds in Dubai — Classic Style | from 130 AED/m² | /zhalyuzi/gorizontalnye/ |
| wooden | zhalyuzi/derevyannye/ | Custom Wooden Blinds in Dubai — Natural Premium | from 300 AED/m² | /zhalyuzi/derevyannye/ |
| bamboo | zhalyuzi/bambukovye/ | Custom Bamboo Blinds in Dubai — Eco Style | from 250 AED/m² | /zhalyuzi/bambukovye/ |

**Same steps as Task 4** but with blinds section:
- Breadcrumbs: `Home / Blinds / {Product Name}`
- Breadcrumb links: `/en/` and `/en/blinds/`
- Related products links: `/en/blinds/{other-slug}/`

**Commit:** `feat: add 5 English blind product pages`

---

## Task 6: Create calculator page

**Files:** Create: `en/calculator/index.html`
**RU source:** `kalkulyator/index.html`

```bash
mkdir -p en/calculator
```

**Step 1:** Read `kalkulyator/index.html` completely.

**Step 2:** Create `en/calculator/index.html`:
- `data-depth="2"` and `data-basepath="../"`
- CSS: `../../assets/css/styles.min.css`
- JS: `../../assets/js/components.min.js`, `../../assets/js/main.min.js`, `../../assets/js/calculator.min.js`
- Translate all UI labels, placeholders, select options, result text
- Note: `calculator.js` may have hardcoded Russian text strings — check and handle
- Breadcrumbs: `Home / Calculator`
- hreflang: `/kalkulyator/` (RU) ↔ `/en/calculator/` (EN)
- Schema.org: BreadcrumbList (2 items)

**Important:** Check if `calculator.js` has hardcoded Russian strings. If yes, the EN calculator page will need inline JS to override text, OR the page should set labels via HTML `data-*` attributes that JS reads.

**Step 3:** Verify calculator works at `http://localhost:8889/en/calculator/`.

**Step 4:** Commit: `feat: add English calculator page`

---

## Task 7: Create promotions page

**Files:** Create: `en/promotions/index.html`
**RU source:** `akcii/index.html`

```bash
mkdir -p en/promotions
```

**Step 1:** Read `akcii/index.html` completely.

**Step 2:** Create `en/promotions/index.html`:
- `data-depth="2"` and `data-basepath="../"`
- CSS: `../../assets/css/styles.min.css`
- Translate all promotions, discount text, terms
- Breadcrumbs: `Home / Promotions`
- hreflang: `/akcii/` (RU) ↔ `/en/promotions/` (EN)
- Links to products should use `/en/` paths

**Step 3:** Commit: `feat: add English promotions page`

---

## Task 8: Create reviews page

**Files:** Create: `en/reviews/index.html`
**RU source:** `otzyvy/index.html`

```bash
mkdir -p en/reviews
```

**Step 1:** Read `otzyvy/index.html` completely.

**Step 2:** Create `en/reviews/index.html`:
- `data-depth="2"` and `data-basepath="../"`
- CSS: `../../assets/css/styles.min.css`
- Translate/adapt reviews for English audience
- Breadcrumbs: `Home / Reviews`
- hreflang: `/otzyvy/` (RU) ↔ `/en/reviews/` (EN)

**Step 3:** Commit: `feat: add English reviews page`

---

## Task 9: Create blog hub page

**Files:** Create: `en/blog/index.html`
**RU source:** `blog/index.html`

```bash
mkdir -p en/blog
```

**Step 1:** Read `blog/index.html` completely.

**Step 2:** Create `en/blog/index.html`:
- `data-depth="2"` and `data-basepath="../"`
- CSS: `../../assets/css/styles.min.css`
- Translate blog listing: article cards with EN titles, descriptions, slugs
- All article links point to `/en/blog/{en-slug}/`
- Breadcrumbs: `Home / Blog`
- hreflang: `/blog/` (RU) ↔ `/en/blog/` (EN)

**Step 3:** Commit: `feat: add English blog hub page`

---

## Task 10: Create 10 English blog articles

Two RU articles about curtain care are merged into one EN article. Total: 10 EN articles.

**Directory creation:**
```bash
mkdir -p en/blog/{how-to-choose-curtains-dubai,blackout-curtains-dubai,motorized-curtains-smart-home,roller-blinds-vs-shutters,bedroom-curtains-guide,curtain-care-dubai,curtain-trends-2026,fabric-comparison,office-blinds,smart-home-motorization}
```

### Article specifications:

| EN slug | RU source(s) | EN Title |
|---------|-------------|----------|
| how-to-choose-curtains-dubai | blog/kak-vybrat-shtory-v-dubae/ | How to Choose Curtains in Dubai: Complete Guide 2026 |
| blackout-curtains-dubai | blog/blekaut-shtory-dubay/ | Blackout Curtains in Dubai: Why You Need Them & How to Choose |
| motorized-curtains-smart-home | blog/motorizirovannye-shtory-smart-home/ | Motorized Curtains & Smart Home in Dubai |
| roller-blinds-vs-shutters | blog/rulonnye-shtory-ili-zhalyuzi/ | Roller Blinds vs Traditional Blinds: What's Best for Dubai? |
| bedroom-curtains-guide | blog/shtory-dlya-spalni/ | Best Curtains for Bedrooms in Dubai: Complete Guide |
| curtain-care-dubai | blog/ukhod-za-shtorami-dubay/ + blog/uhod-za-shtorami-v-dubae/ | Curtain Care in Dubai's Climate: Expert Tips |
| curtain-trends-2026 | blog/trendy-shtor-2026/ | Curtain & Blind Trends 2026: What's In Style |
| fabric-comparison | blog/sravnenie-tkanej/ | Curtain Fabrics Compared: Polyester vs Natural Materials |
| office-blinds | blog/zhalyuzi-dlya-ofisa/ | How to Choose Office Blinds in Dubai |
| smart-home-motorization | blog/umnyj-dom-motorizaciya/ | Smart Home Curtain Motorization: Complete Guide |

**For each article:**

**Step 1:** Read the RU source(s) completely.

**Step 2:** Create `en/blog/{slug}/index.html`:
- `data-depth="3"` and `data-basepath="../../"`
- CSS: `../../../assets/css/styles.min.css`
- JS: `../../../assets/js/components.min.js`, `../../../assets/js/main.min.js`
- `og:type="article"`, `og:locale="en_US"`
- Adapt content for English-speaking audience (not literal translation):
  - Use English SEO keywords naturally
  - More direct writing style
  - References to Dubai lifestyle relevant to expats
- Breadcrumbs: `Home / Blog / {Article Title}`
- Breadcrumb links: `/en/` and `/en/blog/`
- Schema.org: BreadcrumbList (3 items) + Article (EN headline, description, dates)
- hreflang: both RU and EN alternates
- For `curtain-care-dubai`: merge content from both RU sources into one comprehensive article
- Internal links within articles should use `/en/` paths

**Step 3:** After all 10 articles, verify each loads correctly.

**Step 4:** Commit: `feat: add 10 English blog articles`

---

## Task 11: Create EN 404 page

**Files:** Create: `en/404.html`
**RU source:** `404.html`

**Step 1:** Read `404.html`.

**Step 2:** Create `en/404.html`:
- `data-depth="1"` and `data-basepath="./"` (so it loads EN components)
- CSS: `../assets/css/styles.min.css`
- `<meta name="robots" content="noindex, nofollow">`
- Content: "Page Not Found" with link to `/en/`
- No Schema.org needed

**Step 3:** Commit: `feat: add English 404 page`

---

## Task 12: Add hreflang tags to all RU pages

Many RU pages are missing hreflang tags or only have the RU alternate. Add both RU and EN alternates to every RU page.

**Files to modify:** All RU pages that now have EN counterparts.

**Mapping (add these hreflang pairs to each RU page's `<head>`):**

| RU page | hreflang RU | hreflang EN |
|---------|-------------|-------------|
| index.html | / | /en/ |
| shtory/index.html | /shtory/ | /en/curtains/ |
| shtory/blekaut/index.html | /shtory/blekaut/ | /en/curtains/blackout/ |
| shtory/tyul/index.html | /shtory/tyul/ | /en/curtains/sheer/ |
| shtory/den-noch/index.html | /shtory/den-noch/ | /en/curtains/day-night/ |
| shtory/rimskie/index.html | /shtory/rimskie/ | /en/curtains/roman/ |
| shtory/shtory-na-zakaz/index.html | /shtory/shtory-na-zakaz/ | /en/curtains/custom/ |
| shtory/plisse/index.html | /shtory/plisse/ | /en/curtains/pleated/ |
| shtory/yaponskie/index.html | /shtory/yaponskie/ | /en/curtains/japanese/ |
| shtory/francuzskie/index.html | /shtory/francuzskie/ | /en/curtains/french/ |
| zhalyuzi/index.html | /zhalyuzi/ | /en/blinds/ |
| zhalyuzi/rulonnye/index.html | /zhalyuzi/rulonnye/ | /en/blinds/roller/ |
| zhalyuzi/vertikalnye/index.html | /zhalyuzi/vertikalnye/ | /en/blinds/vertical/ |
| zhalyuzi/gorizontalnye/index.html | /zhalyuzi/gorizontalnye/ | /en/blinds/horizontal/ |
| zhalyuzi/derevyannye/index.html | /zhalyuzi/derevyannye/ | /en/blinds/wooden/ |
| zhalyuzi/bambukovye/index.html | /zhalyuzi/bambukovye/ | /en/blinds/bamboo/ |
| motorizaciya/index.html | /motorizaciya/ | /en/motorization/ |
| kalkulyator/index.html | /kalkulyator/ | /en/calculator/ |
| akcii/index.html | /akcii/ | /en/promotions/ |
| otzyvy/index.html | /otzyvy/ | /en/reviews/ |
| blog/index.html | /blog/ | /en/blog/ |
| blog/kak-vybrat-shtory-v-dubae/index.html | /blog/kak-vybrat-shtory-v-dubae/ | /en/blog/how-to-choose-curtains-dubai/ |
| blog/blekaut-shtory-dubay/index.html | /blog/blekaut-shtory-dubay/ | /en/blog/blackout-curtains-dubai/ |
| blog/motorizirovannye-shtory-smart-home/index.html | /blog/motorizirovannye-shtory-smart-home/ | /en/blog/motorized-curtains-smart-home/ |
| blog/rulonnye-shtory-ili-zhalyuzi/index.html | /blog/rulonnye-shtory-ili-zhalyuzi/ | /en/blog/roller-blinds-vs-shutters/ |
| blog/shtory-dlya-spalni/index.html | /blog/shtory-dlya-spalni/ | /en/blog/bedroom-curtains-guide/ |
| blog/ukhod-za-shtorami-dubay/index.html | /blog/ukhod-za-shtorami-dubay/ | /en/blog/curtain-care-dubai/ |
| blog/uhod-za-shtorami-v-dubae/index.html | /blog/uhod-za-shtorami-v-dubae/ | /en/blog/curtain-care-dubai/ |
| blog/trendy-shtor-2026/index.html | /blog/trendy-shtor-2026/ | /en/blog/curtain-trends-2026/ |
| blog/sravnenie-tkanej/index.html | /blog/sravnenie-tkanej/ | /en/blog/fabric-comparison/ |
| blog/zhalyuzi-dlya-ofisa/index.html | /blog/zhalyuzi-dlya-ofisa/ | /en/blog/office-blinds/ |
| blog/umnyj-dom-motorizaciya/index.html | /blog/umnyj-dom-motorizaciya/ | /en/blog/smart-home-motorization/ |
| o-nas/index.html | /o-nas/ | /en/about/ |
| kontakty/index.html | /kontakty/ | /en/contacts/ |
| portfolio/index.html | /portfolio/ | /en/portfolio/ |

For each page, add (or update if partially present) inside `<head>`:
```html
<link rel="alternate" hreflang="ru" href="https://solaradesign.ae{ru-path}">
<link rel="alternate" hreflang="en" href="https://solaradesign.ae/en/{en-path}">
```

**Commit:** `feat: add hreflang tags to all RU pages`

---

## Task 13: Update sitemap.xml

**Files:** Modify: `sitemap.xml`

**Step 1:** Read current `sitemap.xml`.

**Step 2:** Add all new EN URLs with appropriate priorities:
- `/en/` — priority 1.0
- `/en/curtains/`, `/en/blinds/` — priority 0.8
- Product pages — priority 0.7
- `/en/blog/` — priority 0.7
- Blog articles — priority 0.6
- Other pages (calculator, promotions, reviews, about, contacts, portfolio) — priority 0.6

**Step 3:** Commit: `chore: add all EN URLs to sitemap.xml`

---

## Task 14: Update EN hub pages with product links

**Files:**
- Modify: `en/curtains/index.html`
- Modify: `en/blinds/index.html`

The existing EN hub pages may reference products that don't exist yet. Now that all product pages are created, verify and update the links:

**Step 1:** In `en/curtains/index.html`, ensure all curtain type cards link to `/en/curtains/{slug}/` (not to RU paths or non-existent pages).

**Step 2:** In `en/blinds/index.html`, ensure all blind type cards link to `/en/blinds/{slug}/` (add wooden and bamboo if missing).

**Step 3:** Commit: `fix: update EN hub pages with correct product links`

---

## Task 15: Final verification

**Step 1:** Start local server: `python3 -m http.server 8889`

**Step 2:** Verify every EN page loads correctly:
- Header and footer render in English
- Navigation links work
- Language switcher appears and links correctly
- Images load
- Forms work (WhatsApp redirect)
- FAQ accordion works
- Breadcrumbs are correct

**Step 3:** Verify RU pages still work:
- Language switcher appears
- hreflang tags present
- No broken links

**Step 4:** Check sitemap.xml includes all URLs.

**Step 5:** Commit any remaining fixes.

---

## Execution Notes

- **Parallel work:** Tasks 4-5 (product pages) can be parallelized by type (curtains vs blinds). Tasks 6-8 (calculator, promotions, reviews) are independent. Task 10 (blog articles) can be split into parallel batches.
- **Dependencies:** Task 1-3 must be done first (fixes + header/footer). Tasks 4-11 can then proceed. Task 12-14 should be done after all pages exist.
- **Images:** All images are shared — no new images needed. Use same paths as RU version.
- **Calculator JS:** Check if `calculator.js` has hardcoded Russian strings that need handling for the EN page.

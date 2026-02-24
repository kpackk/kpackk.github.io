# Site Expansion Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add 14 new pages (7 product, 5 blog, 1 promotions, 1 reviews), enable portfolio filters, and update navigation/sitemap.

**Architecture:** Static HTML pages following existing depth-based component loading system. Each new page copies the template pattern from an existing sibling, adapts content. No build step, no frameworks. CSS/JS referenced as `styles.min.css`, `components.min.js`, `main.min.js` with depth-relative paths.

**Tech Stack:** HTML5, CSS3 (custom properties), vanilla JS, Schema.org JSON-LD

**Important:** Some blog articles referenced in `blog/index.html` and `sitemap.xml` may not have actual files yet (check first). All image paths reuse existing WebP files from `assets/images/`.

---

## Phase 1: Product Pages — Curtains (3 pages)

### Task 1: Create shtory/plisse/index.html

**Files:**
- Create: `shtory/plisse/index.html`
- Template: Copy from `shtory/blekaut/index.html` (depth=2)

**Step 1: Create directory**
```bash
mkdir -p "shtory/plisse"
```

**Step 2: Create page from template**

Copy `shtory/blekaut/index.html` to `shtory/plisse/index.html` and replace ALL content:

- `data-depth="2"` (keep)
- canonical: `https://solaradesign.ae/shtory/plisse/`
- title: `Шторы-плиссе на заказ в Дубае — Компактность и стиль | Solara Design`
- meta description: `Шторы-плиссе на заказ в Дубае. Компактная конструкция, точное управление светом, идеально для нестандартных окон. Бесплатный замер. От 180 AED/м².`
- keywords: `шторы плиссе дубай, плиссе на заказ дубай, плиссированные шторы ОАЭ, шторы для мансардных окон дубай`
- og:title, og:description, og:url — match above
- og:type: `product`
- og:image: `https://kpackk.github.io/assets/images/products/tulle-2.webp`
- CSS: `../../assets/css/styles.min.css`
- JS: `../../assets/js/components.min.js`, `../../assets/js/main.min.js`
- Breadcrumbs: Главная / Шторы / Плиссе
- Schema BreadcrumbList: Home → Шторы → Плиссе
- Schema FAQPage: 3 questions about плиссе (нестандартные окна, уход, разница с римскими)
- Schema Product: name="Шторы-плиссе на заказ в Дубае", price="180", url=canonical
- Hero: h1="Шторы-плиссе на заказ в Дубае", background=`../../assets/images/products/tulle-2.webp`
- Gallery: 6 items reusing existing product/portfolio images
- Features: 3 items (компактная конструкция, нестандартные окна, точное управление светом)
- SEO text: 3-4 paragraphs about плиссе, ~300 words
- Pricing: от 180 AED/м²
- FAQ: 3 accordion items matching Schema
- Related products: Тюль, Римские шторы, День-ночь
- CTA form: standard WhatsApp form
- WhatsApp float button

**Step 3: Verify page loads**
```bash
# Server should be running: python3 -m http.server 8889
# Open http://localhost:8889/shtory/plisse/ and verify:
# - Header/footer load correctly
# - Breadcrumbs show correct path
# - FAQ accordion works
# - WhatsApp form works
# - Mobile responsive (check at 640px)
```

**Step 4: Commit**
```bash
git add shtory/plisse/index.html
git commit -m "feat: add pleated curtains (plisse) product page"
```

---

### Task 2: Create shtory/yaponskie/index.html

**Files:**
- Create: `shtory/yaponskie/index.html`
- Template: Copy from `shtory/plisse/index.html` (just created)

**Step 1: Create directory and page**
```bash
mkdir -p "shtory/yaponskie"
```

**Step 2: Create page — replace all content:**
- canonical: `https://solaradesign.ae/shtory/yaponskie/`
- title: `Японские панели на заказ в Дубае — Минималистичный дизайн | Solara Design`
- meta description: `Японские панели на заказ в Дубае. Элегантные раздвижные панели для панорамных окон и зонирования. Бесплатный замер. От 250 AED/м².`
- keywords: `японские панели дубай, японские шторы дубай, раздвижные панели дубай, панели для панорамных окон`
- Breadcrumbs: Главная / Шторы / Японские панели
- Schema Product: price="250"
- Hero: h1="Японские панели на заказ в Дубае"
- Features: панорамные окна, зонирование пространства, лёгкое управление
- SEO text: about японские панели — раздвижные тканевые полотна
- Pricing: от 250 AED/м²
- FAQ: 3 questions (что такое японские панели, для каких окон подходят, моторизация)
- Related: Шторы на заказ, Тюль, Блэкаут

**Step 3: Verify** (same checklist as Task 1)

**Step 4: Commit**
```bash
git add shtory/yaponskie/index.html
git commit -m "feat: add Japanese panels product page"
```

---

### Task 3: Create shtory/francuzskie/index.html

**Files:**
- Create: `shtory/francuzskie/index.html`

**Step 1:** `mkdir -p "shtory/francuzskie"`

**Step 2: Create page — unique content:**
- canonical: `https://solaradesign.ae/shtory/francuzskie/`
- title: `Французские шторы на заказ в Дубае — Роскошь и элегантность | Solara Design`
- meta description: `Французские шторы на заказ в Дубае. Каскадные драпировки для создания роскошного интерьера. Натуральные ткани. Бесплатный замер. От 350 AED/м².`
- keywords: `французские шторы дубай, маркизы дубай, каскадные шторы дубай, роскошные шторы ОАЭ`
- Breadcrumbs: Главная / Шторы / Французские шторы
- Schema Product: price="350"
- Hero: h1="Французские шторы на заказ в Дубае"
- Features: каскадные складки, натуральные ткани (шёлк, органза), роскошный вид
- Pricing: от 350 AED/м²
- FAQ: 3 questions (что такое французские шторы, какие ткани, уход)
- Related: Шторы на заказ, Тюль, Блэкаут

**Step 3: Verify**

**Step 4: Commit**
```bash
git add shtory/francuzskie/index.html
git commit -m "feat: add French curtains product page"
```

---

### Task 4: Update shtory/index.html — add 3 new catalog cards

**Files:**
- Modify: `shtory/index.html` (lines 141-182, catalog-grid section)

**Step 1: Add 3 new cards after existing card 5 (Шторы на заказ)**

Insert before the closing `</div>` of `.catalog-grid` (after line 181):

```html
        <!-- Card 6: Плиссе -->
        <a href="/shtory/plisse/" class="catalog-card" style="background: url('../assets/images/products/tulle-2.webp') center/cover no-repeat;">
          <div class="catalog-card-overlay">
            <div class="catalog-card-title">Шторы-плиссе</div>
            <p class="catalog-card-desc">Компактные шторы для нестандартных окон</p>
          </div>
          <span class="catalog-card-arrow">&rarr;</span>
        </a>
        <!-- Card 7: Японские панели -->
        <a href="/shtory/yaponskie/" class="catalog-card" style="background: url('../assets/images/portfolio/living-panoramic.webp') center/cover no-repeat;">
          <div class="catalog-card-overlay">
            <div class="catalog-card-title">Японские панели</div>
            <p class="catalog-card-desc">Раздвижные панели для панорамного остекления</p>
          </div>
          <span class="catalog-card-arrow">&rarr;</span>
        </a>
        <!-- Card 8: Французские шторы -->
        <a href="/shtory/francuzskie/" class="catalog-card" style="background: url('../assets/images/portfolio/living-beige-curtains.webp') center/cover no-repeat;">
          <div class="catalog-card-overlay">
            <div class="catalog-card-title">Французские шторы</div>
            <p class="catalog-card-desc">Каскадные драпировки для роскошных интерьеров</p>
          </div>
          <span class="catalog-card-arrow">&rarr;</span>
        </a>
```

**Step 2: Update hub page meta** — add new keywords to `<meta name="keywords">`:
Add: `, шторы плиссе дубай, японские панели дубай, французские шторы дубай`

**Step 3: Update FAQPage schema** — add question about new curtain types

**Step 4: Verify** — check hub page shows 8 cards in grid, responsive at 960px and 640px

**Step 5: Commit**
```bash
git add shtory/index.html
git commit -m "feat: add plisse, japanese, french cards to curtains hub"
```

---

## Phase 2: Product Pages — Blinds (2 pages)

### Task 5: Create zhalyuzi/derevyannye/index.html

**Files:**
- Create: `zhalyuzi/derevyannye/index.html`
- Template: Use `shtory/blekaut/index.html` pattern (depth=2) adapted for blinds

**Step 1:** `mkdir -p "zhalyuzi/derevyannye"`

**Step 2: Create page:**
- canonical: `https://solaradesign.ae/zhalyuzi/derevyannye/`
- title: `Деревянные жалюзи на заказ в Дубае — Натуральное дерево | Solara Design`
- meta description: `Деревянные жалюзи на заказ в Дубае. Натуральная древесина, благородный вид, долговечность. Бесплатный замер и установка. От 300 AED/м².`
- keywords: `деревянные жалюзи дубай, жалюзи из дерева дубай, деревянные жалюзи на заказ, wooden blinds dubai`
- Breadcrumbs: Главная / Жалюзи / Деревянные
- Schema: BreadcrumbList (Home → Жалюзи → Деревянные), FAQPage (3 Q), Product (price=300)
- Hero: h1="Деревянные жалюзи на заказ в Дубае"
- Features: натуральная древесина, термоизоляция, долговечность
- Pricing: от 300 AED/м²
- FAQ: 3 questions (породы дерева, влажность, уход)
- Related: Горизонтальные жалюзи, Бамбуковые жалюзи, Рулонные

**Step 3: Verify**

**Step 4: Commit**
```bash
git add zhalyuzi/derevyannye/index.html
git commit -m "feat: add wooden blinds product page"
```

---

### Task 6: Create zhalyuzi/bambukovye/index.html

**Files:**
- Create: `zhalyuzi/bambukovye/index.html`

**Step 1:** `mkdir -p "zhalyuzi/bambukovye"`

**Step 2: Create page:**
- canonical: `https://solaradesign.ae/zhalyuzi/bambukovye/`
- title: `Бамбуковые жалюзи на заказ в Дубае — Экостиль | Solara Design`
- meta description: `Бамбуковые жалюзи на заказ в Дубае. Натуральный бамбук, экологичность, стильный дизайн. Бесплатный замер. От 250 AED/м².`
- keywords: `бамбуковые жалюзи дубай, жалюзи из бамбука дубай, bamboo blinds dubai, экожалюзи дубай`
- Breadcrumbs: Главная / Жалюзи / Бамбуковые
- Schema Product: price="250"
- Features: экологичный материал, устойчивость к влаге, природная эстетика
- Pricing: от 250 AED/м²
- Related: Деревянные жалюзи, Горизонтальные жалюзи, Рулонные

**Step 3: Verify**

**Step 4: Commit**
```bash
git add zhalyuzi/bambukovye/index.html
git commit -m "feat: add bamboo blinds product page"
```

---

### Task 7: Update zhalyuzi/index.html — add 2 new catalog cards

**Files:**
- Modify: `zhalyuzi/index.html` (catalog-grid section, after line 151)

**Step 1: Add 2 cards after Горизонтальные (card 3):**

```html
        <!-- Card 4: Деревянные -->
        <a href="/zhalyuzi/derevyannye/" class="catalog-card" style="background: url('../assets/images/portfolio/living-spacious-light.webp') center/cover no-repeat;">
          <div class="catalog-card-overlay">
            <div class="catalog-card-title">Деревянные жалюзи</div>
            <p class="catalog-card-desc">Натуральная древесина, от 300 AED/м²</p>
          </div>
          <span class="catalog-card-arrow">&rarr;</span>
        </a>
        <!-- Card 5: Бамбуковые -->
        <a href="/zhalyuzi/bambukovye/" class="catalog-card" style="background: url('../assets/images/portfolio/bedroom-light-curtains.webp') center/cover no-repeat;">
          <div class="catalog-card-overlay">
            <div class="catalog-card-title">Бамбуковые жалюзи</div>
            <p class="catalog-card-desc">Экологичный стиль, от 250 AED/м²</p>
          </div>
          <span class="catalog-card-arrow">&rarr;</span>
        </a>
```

**Step 2: Update keywords meta**

**Step 3: Verify** — 5 cards in grid

**Step 4: Commit**
```bash
git add zhalyuzi/index.html
git commit -m "feat: add wooden and bamboo cards to blinds hub"
```

---

## Phase 3: Blog Articles (5 pages)

**IMPORTANT:** Before creating articles, check which blog URLs already exist as files:
```bash
ls blog/uhod-za-shtorami-v-dubae/index.html 2>/dev/null || echo "NOT FOUND"
ls blog/ukhod-za-shtorami-dubay/index.html 2>/dev/null || echo "NOT FOUND"
ls blog/rulonnye-shtory-ili-zhalyuzi/index.html 2>/dev/null || echo "NOT FOUND"
ls blog/shtory-dlya-spalni/index.html 2>/dev/null || echo "NOT FOUND"
```

The blog listing already has cards linking to `rulonnye-shtory-ili-zhalyuzi`, `shtory-dlya-spalni`, and `ukhod-za-shtorami-dubay`. If pages exist, skip creating them. If not, create them as well.

### Task 8: Create blog/uhod-za-shtorami-v-dubae/index.html

**Files:**
- Create: `blog/uhod-za-shtorami-v-dubae/index.html`
- Template: Copy from `blog/kak-vybrat-shtory-v-dubae/index.html` (depth=2)

**NOTE:** Blog listing already has a card pointing to `/blog/ukhod-za-shtorami-dubay/`. If that page exists, update the card URL to match. If not, create article at the URL from the listing OR at our new URL and update the listing card.

**Step 1:** `mkdir -p "blog/uhod-za-shtorami-v-dubae"`

**Step 2: Create article page:**
- canonical: `https://solaradesign.ae/blog/uhod-za-shtorami-v-dubae/`
- title: `Уход за шторами в климате Дубая | Solara Design`
- meta description: `Как ухаживать за шторами в жарком климате Дубая: чистка, защита от UV, борьба с пылью. Советы экспертов Solara Design.`
- og:type: `article`
- Schema Article: datePublished="2026-02-25", headline matching title
- Breadcrumbs: Главная / Блог / Уход за шторами в Дубае
- Article content (~800-1000 words):
  - Intro: why curtain care matters in Dubai's climate
  - Section: Защита от UV — как предотвратить выгорание
  - Section: Борьба с пылью — как часто чистить
  - Section: Стирка и химчистка — что можно и нельзя
  - Section: Когда менять шторы — признаки износа
  - Conclusion: рекомендации Solara Design
- Related articles: 2 cards (existing articles)
- CTA form

**Step 3: Verify**

**Step 4: Commit**
```bash
git add blog/uhod-za-shtorami-v-dubae/index.html
git commit -m "feat: add blog article — curtain care in Dubai"
```

---

### Task 9: Create blog/trendy-shtor-2026/index.html

**Files:**
- Create: `blog/trendy-shtor-2026/index.html`

**Step 1:** `mkdir -p "blog/trendy-shtor-2026"`

**Step 2: Create article:**
- title: `Тренды штор и жалюзи 2026 | Solara Design`
- Article content (~800-1000 words):
  - Минимализм и чистые линии
  - Натуральные ткани: лён, хлопок, бамбук
  - Умные карнизы и интеграция с умным домом
  - Нейтральные палитры: бежевый, терракотовый, оливковый
  - Двойные системы: тюль + блэкаут
- Related: 2 existing articles

**Step 3: Verify, Step 4: Commit**
```bash
git add blog/trendy-shtor-2026/index.html
git commit -m "feat: add blog article — curtain trends 2026"
```

---

### Task 10: Create blog/sravnenie-tkanej/index.html

**Files:**
- Create: `blog/sravnenie-tkanej/index.html`

**Step 1:** `mkdir -p "blog/sravnenie-tkanej"`

**Step 2: Create article:**
- title: `Сравнение тканей для штор: полиэстер vs натуральные | Solara Design`
- Article content (~800-1000 words):
  - Полиэстер: плюсы (UV-стойкость, цена, уход) и минусы (менее премиальный вид)
  - Натуральные: лён, хлопок, шёлк — плюсы (красота, дыхание) и минусы (выгорание, цена)
  - Смесовые ткани: лучшее из двух миров
  - Что лучше для Дубая: рекомендации по комнатам
- Related: 2 existing articles

**Step 3: Verify, Step 4: Commit**
```bash
git add blog/sravnenie-tkanej/index.html
git commit -m "feat: add blog article — fabric comparison"
```

---

### Task 11: Create blog/zhalyuzi-dlya-ofisa/index.html

**Files:**
- Create: `blog/zhalyuzi-dlya-ofisa/index.html`

**Step 1:** `mkdir -p "blog/zhalyuzi-dlya-ofisa"`

**Step 2: Create article:**
- title: `Как выбрать жалюзи для офиса в Дубае | Solara Design`
- Article content (~800-1000 words):
  - Требования к офисным жалюзи: светозащита, не отвлекают, бюджет
  - Вертикальные жалюзи для панорамных окон
  - Рулонные шторы для переговорных
  - Горизонтальные жалюзи для кабинетов
  - Моторизация: автоматика по расписанию
  - Бюджет: от 100 AED/м²
- Related: 2 existing articles

**Step 3: Verify, Step 4: Commit**
```bash
git add blog/zhalyuzi-dlya-ofisa/index.html
git commit -m "feat: add blog article — office blinds guide"
```

---

### Task 12: Create blog/umnyj-dom-motorizaciya/index.html

**Files:**
- Create: `blog/umnyj-dom-motorizaciya/index.html`

**Step 1:** `mkdir -p "blog/umnyj-dom-motorizaciya"`

**Step 2: Create article:**
- title: `Умный дом и моторизация штор: полный гид | Solara Design`
- Article content (~800-1000 words):
  - Что такое моторизация штор: электрокарнизы Somfy
  - Интеграция: Apple HomeKit, Google Home, Alexa
  - Сценарии: утро, вечер, отъезд
  - Солнечные датчики: автоматическое закрытие
  - Стоимость: от 350 AED за окно
  - Установка и обслуживание
- Related: 2 existing articles

**Step 3: Verify, Step 4: Commit**
```bash
git add blog/umnyj-dom-motorizaciya/index.html
git commit -m "feat: add blog article — smart home motorization guide"
```

---

### Task 13: Update blog/index.html — add 5 new article cards

**Files:**
- Modify: `blog/index.html` (blog-grid section)

**Step 1: Add 5 new cards** to the `.blog-grid` section. Follow existing card pattern:

```html
        <!-- New articles -->
        <article class="blog-card">
          <div class="blog-card-image" style="background:url('../assets/images/blog/choosing-curtains.webp') center/cover no-repeat;height:200px;border-radius:4px 4px 0 0"></div>
          <div class="blog-card-content" style="padding:24px">
            <time style="font-size:13px;color:var(--color-text-light)">25 февраля 2026</time>
            <h3 style="margin:8px 0 12px;font-size:20px"><a href="/blog/uhod-za-shtorami-v-dubae/">Уход за шторами в климате Дубая</a></h3>
            <p style="font-size:14px;color:var(--color-text-light);line-height:1.6">Практические советы по уходу за шторами: защита от UV, чистка, стирка и когда менять шторы.</p>
            <a href="/blog/uhod-za-shtorami-v-dubae/" style="display:inline-block;margin-top:12px;font-size:14px;font-weight:600;color:var(--color-accent)">Читать далее &rarr;</a>
          </div>
        </article>
```

Repeat for: trendy-shtor-2026, sravnenie-tkanej, zhalyuzi-dlya-ofisa, umnyj-dom-motorizaciya.

**NOTE:** If existing cards point to non-existent articles (e.g., `/blog/ukhod-za-shtorami-dubay/`), either create those pages too or update card URLs to match our new article URLs.

**Step 2: Verify** — all cards render, links work

**Step 3: Commit**
```bash
git add blog/index.html
git commit -m "feat: add 5 new article cards to blog listing"
```

---

## Phase 4: Promotions Page

### Task 14: Create akcii/index.html

**Files:**
- Create: `akcii/index.html` (depth=1)

**Step 1:** `mkdir -p "akcii"`

**Step 2: Create page structure:**

```html
<!DOCTYPE html>
<html lang="ru" data-depth="1">
```

- canonical: `https://solaradesign.ae/akcii/`
- title: `Акции и спецпредложения | Solara Design — Скидки на шторы в Дубае`
- meta description: `Актуальные акции Solara Design: скидки на блэкаут шторы, пакет шторы + моторизация, бесплатный замер. Действуют по всему Дубаю.`
- CSS: `../assets/css/styles.min.css`
- JS: `../assets/js/components.min.js`, `../assets/js/main.min.js`
- Schema: BreadcrumbList (Home → Акции)

**Page sections:**
1. Breadcrumbs: Главная / Акции
2. Hero: h1="Акции и спецпредложения", subtitle
3. Promo cards grid (new CSS class `.promo-grid` or reuse `.catalog-grid` with modifications):

**Promo card structure:**
```html
<div class="promo-card">
  <div class="promo-badge">-15%</div>
  <h3>Скидка на блэкаут шторы</h3>
  <p>Скидка 15% на все ткани блэкаут. Идеально для спален и детских.</p>
  <p class="promo-validity">Действует до 31 марта 2026</p>
  <a href="#order" class="btn btn-primary">Заказать со скидкой</a>
</div>
```

4 promo cards:
- -15% блэкаут
- -20% шторы + моторизация
- Бесплатный замер + дизайн (от 3 окон)
- -10% жалюзи для офисов (от 5 окон)

4. CTA WhatsApp form
5. WhatsApp float

**Step 3: Add promo card CSS** to `assets/css/styles.css` (or inline styles matching existing design system):

```css
/* Promo cards */
.promo-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}
.promo-card {
  background: var(--color-bg);
  border-radius: var(--border-radius-lg);
  padding: var(--space-2xl);
  box-shadow: var(--shadow-sm);
  position: relative;
  transition: box-shadow var(--transition-base);
}
.promo-card:hover {
  box-shadow: var(--shadow-md);
}
.promo-badge {
  display: inline-block;
  background: var(--color-accent);
  color: #fff;
  padding: 4px 16px;
  border-radius: 20px;
  font-weight: 600;
  font-size: var(--text-sm);
  margin-bottom: var(--space-md);
}
.promo-validity {
  font-size: var(--text-sm);
  color: var(--color-text-light);
  margin: var(--space-md) 0;
}
@media (max-width: 640px) {
  .promo-grid { grid-template-columns: 1fr; }
}
```

**Step 4: Verify**

**Step 5: Commit**
```bash
git add akcii/index.html assets/css/styles.css
git commit -m "feat: add promotions page with promo cards"
```

**NOTE:** If CSS is minified (styles.min.css), add styles to `styles.css` first, then re-minify. Or use inline styles / a `<style>` block on the page if no build step exists for minification.

---

### Task 15: Update navigation — add "Акции" to header and footer

**Files:**
- Modify: `components/header.html`
- Modify: `components/footer.html`

**Step 1: header.html** — add after "Блог" link (line 9):
```html
      <a href="/akcii/">Акции</a>
```
Also add to mobile menu nav (after line 29).

**Step 2: footer.html** — add to "Компания" links (after Калькулятор, line 27):
```html
          <a href="/akcii/">Акции</a>
```

**Step 3: Verify** — all pages show Акции in nav

**Step 4: Commit**
```bash
git add components/header.html components/footer.html
git commit -m "feat: add Акции link to header and footer navigation"
```

---

## Phase 5: Portfolio Filters

### Task 16: Add data-category attributes and filter JS to portfolio

**Files:**
- Modify: `portfolio/index.html`

**Step 1: Add `data-category` to each portfolio item:**

Replace each `<div class="portfolio-item"` with categorized version:
- Item 1 (bedroom-light-curtains — блэкаут шторы): `data-category="shtory"`
- Item 2 (living-marina-view — тюль и римские): `data-category="shtory"`
- Item 3 (living-modern-curtains — моторизированные): `data-category="motorizaciya"`
- Item 4 (living-spacious-light — рулонные жалюзи): `data-category="zhalyuzi"`
- Item 5 (living-beige-curtains — вертикальные жалюзи): `data-category="zhalyuzi"`
- Item 6 (bedroom-green-curtains — день-ночь): `data-category="shtory"`
- Item 7 (bedroom-evening-curtains — портьеры): `data-category="shtory"`
- Item 8 (living-panoramic — тюль с вышивкой): `data-category="shtory"`
- Item 9 (tulle-1 — умный карниз Somfy): `data-category="motorizaciya"`
- Item 10 (blackout-1 — римские шторы): `data-category="shtory"`
- Item 11 (roman-1 — горизонтальные жалюзи): `data-category="zhalyuzi"`
- Item 12 (roller-1 — блэкаут с моторизацией): `data-category="motorizaciya"`

**Step 2: Add `data-filter` to buttons:**
```html
<button class="portfolio-filter-btn active" data-filter="all">Все</button>
<button class="portfolio-filter-btn" data-filter="shtory">Шторы</button>
<button class="portfolio-filter-btn" data-filter="zhalyuzi">Жалюзи</button>
<button class="portfolio-filter-btn" data-filter="motorizaciya">Моторизация</button>
```

**Step 3: Replace the inline `<script>` at bottom** (lines 268-276) with filter + hover logic:

```html
<script>
  // Portfolio filters
  document.querySelectorAll('.portfolio-filter-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.portfolio-filter-btn').forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var filter = btn.getAttribute('data-filter');
      document.querySelectorAll('.portfolio-item').forEach(function(item) {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = '';
          setTimeout(function() { item.style.opacity = '1'; item.style.transform = 'scale(1)'; }, 10);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(function() { item.style.display = 'none'; }, 300);
        }
      });
    });
  });

  // Portfolio hover text
  document.querySelectorAll('.portfolio-item').forEach(function(item) {
    var hoverText = item.querySelector('.portfolio-hover-text');
    if (hoverText) {
      item.addEventListener('mouseenter', function() { hoverText.style.opacity = '1'; });
      item.addEventListener('mouseleave', function() { hoverText.style.opacity = '0'; });
    }
  });
</script>
```

**Step 4: Add transition to portfolio items** — each item needs:
```
style="... transition: opacity 0.3s ease, transform 0.3s ease;"
```
Add `transition` to the existing inline style of each `.portfolio-item`.

**Step 5: Verify** — click each filter, items show/hide with animation

**Step 6: Commit**
```bash
git add portfolio/index.html
git commit -m "feat: enable portfolio filter buttons with JS"
```

---

## Phase 6: Reviews Page

### Task 17: Create otzyvy/index.html

**Files:**
- Create: `otzyvy/index.html` (depth=1)

**Step 1:** `mkdir -p "otzyvy"`

**Step 2: Create page:**
- canonical: `https://solaradesign.ae/otzyvy/`
- title: `Отзывы клиентов | Solara Design — Реальные проекты в Дубае`
- meta description: `Отзывы клиентов Solara Design: реальные проекты по установке штор и жалюзи в Дубае. Фото работ и впечатления.`
- CSS: `../assets/css/styles.min.css`
- Schema: BreadcrumbList (Home → Отзывы)

**Page sections:**
1. Breadcrumbs: Главная / Отзывы
2. Hero: h1="Отзывы наших клиентов", subtitle="Реальные проекты и впечатления"
3. Reviews list (6 cards)

**Review card structure:**
```html
<div class="review-card">
  <div class="review-card-image" style="background: url('../assets/images/portfolio/bedroom-light-curtains.webp') center/cover no-repeat;"></div>
  <div class="review-card-content">
    <div class="review-stars">★★★★★</div>
    <h3>Анна М.</h3>
    <p class="review-meta">Dubai Marina · Блэкаут шторы</p>
    <blockquote>«Наконец-то в спальне полная темнота! Даже в полдень спим как ночью. Ткань очень плотная и красивая, мастер установил за час. Рекомендуем Solara Design всем знакомым.»</blockquote>
  </div>
</div>
```

Layout CSS (add to styles.css or inline):
```css
.review-card {
  display: grid;
  grid-template-columns: 2fr 3fr;
  gap: var(--space-2xl);
  background: var(--color-bg);
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  margin-bottom: var(--space-2xl);
}
.review-card-image {
  min-height: 280px;
}
.review-card-content {
  padding: var(--space-2xl);
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.review-stars {
  color: var(--color-accent);
  font-size: var(--text-lg);
  margin-bottom: var(--space-sm);
}
.review-meta {
  font-size: var(--text-sm);
  color: var(--color-text-light);
  margin-bottom: var(--space-md);
}
.review-card blockquote {
  font-style: italic;
  line-height: 1.7;
  color: var(--color-text);
  margin: 0;
}
@media (max-width: 640px) {
  .review-card { grid-template-columns: 1fr; }
  .review-card-image { min-height: 200px; }
}
```

**6 reviews:** (all use existing images from portfolio/products)
1. Анна М. — Dubai Marina — Блэкаут шторы — bedroom-light-curtains.webp
2. Дмитрий К. — Downtown — Моторизация Somfy — living-modern-curtains.webp
3. Елена С. — Palm Jumeirah — Тюль + портьеры — living-panoramic.webp
4. Олег Р. — Business Bay — Рулонные жалюзи — living-spacious-light.webp
5. Марина В. — JBR — Римские шторы — living-marina-view.webp
6. Сергей Т. — Emirates Hills — День-ночь — bedroom-green-curtains.webp

4. CTA form: "Хотите такой же результат?"
5. WhatsApp float

**Step 3: Verify**

**Step 4: Commit**
```bash
git add otzyvy/index.html assets/css/styles.css
git commit -m "feat: add customer reviews page with project photos"
```

---

### Task 18: Update footer — add "Отзывы" link

**Files:**
- Modify: `components/footer.html`

**Step 1:** Add to "Компания" links:
```html
          <a href="/otzyvy/">Отзывы</a>
```

**Step 2: Commit**
```bash
git add components/footer.html
git commit -m "feat: add Отзывы link to footer navigation"
```

---

## Phase 7: Sitemap & Final Updates

### Task 19: Update sitemap.xml

**Files:**
- Modify: `sitemap.xml`

**Step 1: Add all new URLs** (insert before English Version section):

```xml
  <!-- Новые шторы -->
  <url>
    <loc>https://solaradesign.ae/shtory/plisse/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://solaradesign.ae/shtory/yaponskie/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://solaradesign.ae/shtory/francuzskie/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Новые жалюзи -->
  <url>
    <loc>https://solaradesign.ae/zhalyuzi/derevyannye/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://solaradesign.ae/zhalyuzi/bambukovye/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Акции -->
  <url>
    <loc>https://solaradesign.ae/akcii/</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>

  <!-- Отзывы -->
  <url>
    <loc>https://solaradesign.ae/otzyvy/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <!-- Новые статьи блога -->
  <url>
    <loc>https://solaradesign.ae/blog/uhod-za-shtorami-v-dubae/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://solaradesign.ae/blog/trendy-shtor-2026/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://solaradesign.ae/blog/sravnenie-tkanej/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://solaradesign.ae/blog/zhalyuzi-dlya-ofisa/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://solaradesign.ae/blog/umnyj-dom-motorizaciya/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
```

**Step 2: Verify XML validity**
```bash
xmllint --noout sitemap.xml 2>&1 || echo "XML syntax error"
```

**Step 3: Commit**
```bash
git add sitemap.xml
git commit -m "chore: add 14 new URLs to sitemap"
```

---

### Task 20: Update CLAUDE.md with new pages

**Files:**
- Modify: `CLAUDE.md`

**Step 1:** Update the Page Types & URL Structure section to include all new pages.

**Step 2: Commit**
```bash
git add CLAUDE.md
git commit -m "docs: update CLAUDE.md with new page structure"
```

---

### Task 21: Final verification

**Step 1:** Start local server if not running:
```bash
python3 -m http.server 8889
```

**Step 2:** Verify every new page loads correctly:
- All 7 product pages: header/footer load, breadcrumbs correct, FAQ works
- All 5 blog articles: content displays, related articles link correctly
- Promotions page: promo cards display, CTA form works
- Reviews page: review cards display correctly, responsive on mobile
- Portfolio filters: all 3 filter buttons work, "Все" resets
- Navigation: "Акции" visible in header/footer, "Отзывы" in footer

**Step 3:** Check mobile responsiveness (640px) for new pages

**Step 4:** Verify sitemap has no broken URLs

**Step 5:** Final commit if any fixes needed

# Solara Design — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Создать многостраничный статический сайт Solara Design для продажи штор на заказ в Дубае, оптимизированный под SEO для русскоязычной аудитории.

**Architecture:** Статический многостраничный сайт на чистом HTML/CSS/JS. Каждая категория продукта — отдельная директория с index.html. Общие компоненты (header, footer) подключаются через JS-include. CSS-переменные для единой палитры. Минимум JS: меню, калькулятор, lazy-load, формы.

**Tech Stack:** HTML5, CSS3 (custom properties, grid, flexbox), Vanilla JS (ES6+), WebP images, woff2 fonts.

**Design doc:** `docs/plans/2026-02-24-solara-design-site-design.md`

---

### Task 1: Project Scaffolding — Файловая структура

**Files:**
- Create: `index.html` (заглушка)
- Create: `assets/css/styles.css` (пустой + переменные)
- Create: `assets/css/fonts.css`
- Create: `assets/js/main.js`
- Create: `assets/js/components.js` (header/footer loader)
- Create: `components/header.html`
- Create: `components/footer.html`
- Create: `robots.txt`
- Create: `sitemap.xml`

**Step 1: Создать директории**

```bash
cd "/Users/rus/Desktop/FENESTRA/сайт 2 рус дубай"
mkdir -p assets/{css,js,fonts,images}
mkdir -p components
mkdir -p shtory/{tyul,blekaut,den-noch,rimskie,shtory-na-zakaz}
mkdir -p zhalyuzi/{rulonnye,vertikalnye,gorizontalnye}
mkdir -p motorizaciya
mkdir -p portfolio
mkdir -p blog
mkdir -p o-nas
mkdir -p kontakty
mkdir -p kalkulyator
```

**Step 2: Создать CSS с переменными палитры**

Файл: `assets/css/styles.css`

```css
/* === SOLARA DESIGN — Styles === */

:root {
  /* Palette — Light Minimalism */
  --color-bg: #FFFFFF;
  --color-bg-alt: #F8F8F8;
  --color-bg-warm: #F5F0EB;
  --color-text: #2D2D2D;
  --color-text-light: #6B6B6B;
  --color-accent: #B8924A;
  --color-accent-hover: #A07D3A;
  --color-border: #E5E5E5;
  --color-white: #FFFFFF;

  /* Typography */
  --font-primary: 'Montserrat', sans-serif;
  --font-size-base: 16px;
  --font-size-sm: 14px;
  --font-size-lg: 18px;
  --font-size-xl: 24px;
  --font-size-2xl: 32px;
  --font-size-3xl: 48px;
  --font-size-hero: 56px;

  /* Spacing */
  --spacing-xs: 8px;
  --spacing-sm: 16px;
  --spacing-md: 24px;
  --spacing-lg: 40px;
  --spacing-xl: 64px;
  --spacing-2xl: 96px;

  /* Layout */
  --container-max: 1200px;
  --container-padding: 20px;
  --border-radius: 4px;

  /* Transitions */
  --transition: 0.3s ease;
}

/* === RESET === */
*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: var(--font-size-base);
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
}

body {
  font-family: var(--font-primary);
  color: var(--color-text);
  background: var(--color-bg);
  line-height: 1.6;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

a {
  color: inherit;
  text-decoration: none;
}

ul, ol {
  list-style: none;
}

/* === CONTAINER === */
.container {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 var(--container-padding);
}

/* === TYPOGRAPHY === */
h1, h2, h3, h4, h5, h6 {
  font-weight: 600;
  line-height: 1.2;
}

h1 { font-size: var(--font-size-hero); }
h2 { font-size: var(--font-size-3xl); }
h3 { font-size: var(--font-size-2xl); }
h4 { font-size: var(--font-size-xl); }

/* === BUTTONS === */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 32px;
  font-family: var(--font-primary);
  font-size: var(--font-size-sm);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  border: 2px solid transparent;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: var(--transition);
}

.btn-primary {
  background: var(--color-accent);
  color: var(--color-white);
  border-color: var(--color-accent);
}

.btn-primary:hover {
  background: var(--color-accent-hover);
  border-color: var(--color-accent-hover);
}

.btn-outline {
  background: transparent;
  color: var(--color-text);
  border-color: var(--color-text);
}

.btn-outline:hover {
  background: var(--color-text);
  color: var(--color-white);
}

/* === SECTION === */
.section {
  padding: var(--spacing-2xl) 0;
}

.section-alt {
  background: var(--color-bg-alt);
}

.section-warm {
  background: var(--color-bg-warm);
}

.section-title {
  font-size: var(--font-size-3xl);
  text-align: center;
  margin-bottom: var(--spacing-lg);
}

.section-subtitle {
  font-size: var(--font-size-lg);
  color: var(--color-text-light);
  text-align: center;
  max-width: 600px;
  margin: 0 auto var(--spacing-xl);
}

/* === GRID === */
.grid {
  display: grid;
  gap: var(--spacing-md);
}

.grid-2 { grid-template-columns: repeat(2, 1fr); }
.grid-3 { grid-template-columns: repeat(3, 1fr); }
.grid-4 { grid-template-columns: repeat(4, 1fr); }

/* === HEADER === */
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: var(--color-white);
  border-bottom: 1px solid var(--color-border);
  transition: var(--transition);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
}

.header-logo {
  font-size: var(--font-size-xl);
  font-weight: 700;
  letter-spacing: 2px;
}

.header-logo span {
  font-weight: 300;
}

.header-nav {
  display: flex;
  gap: var(--spacing-md);
}

.header-nav a {
  font-size: var(--font-size-sm);
  font-weight: 500;
  letter-spacing: 0.5px;
  transition: var(--transition);
}

.header-nav a:hover {
  color: var(--color-accent);
}

.header-contacts {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.header-phone {
  font-weight: 600;
  font-size: var(--font-size-sm);
}

/* Burger menu */
.burger {
  display: none;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
  padding: 5px;
}

.burger span {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--color-text);
  transition: var(--transition);
}

/* === HERO === */
.hero {
  position: relative;
  height: 100vh;
  min-height: 600px;
  display: flex;
  align-items: center;
  overflow: hidden;
  margin-top: 80px;
}

.hero-bg {
  position: absolute;
  inset: 0;
  z-index: -1;
}

.hero-bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
}

.hero-content {
  position: relative;
  z-index: 1;
  color: var(--color-white);
  max-width: 700px;
}

.hero-content h1 {
  margin-bottom: var(--spacing-md);
}

.hero-content p {
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-lg);
  opacity: 0.9;
}

/* === ADVANTAGES === */
.advantages {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-md);
  text-align: center;
}

.advantage-item {
  padding: var(--spacing-lg);
}

.advantage-icon {
  font-size: 48px;
  margin-bottom: var(--spacing-sm);
  color: var(--color-accent);
}

.advantage-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  margin-bottom: var(--spacing-xs);
}

.advantage-text {
  font-size: var(--font-size-sm);
  color: var(--color-text-light);
}

/* === CATALOG CARDS === */
.catalog-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-md);
}

.catalog-card {
  position: relative;
  overflow: hidden;
  border-radius: var(--border-radius);
  aspect-ratio: 4/5;
}

.catalog-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.catalog-card:hover img {
  transform: scale(1.05);
}

.catalog-card-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: var(--spacing-lg);
  background: linear-gradient(transparent, rgba(0,0,0,0.7));
  color: var(--color-white);
}

.catalog-card-title {
  font-size: var(--font-size-xl);
  font-weight: 600;
  margin-bottom: var(--spacing-xs);
}

.catalog-card-link {
  font-size: var(--font-size-sm);
  text-transform: uppercase;
  letter-spacing: 1px;
  opacity: 0.8;
}

/* === PORTFOLIO GRID === */
.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
}

.portfolio-item {
  aspect-ratio: 1;
  overflow: hidden;
}

.portfolio-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.portfolio-item:hover img {
  transform: scale(1.08);
}

/* === STEPS === */
.steps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-lg);
  counter-reset: step;
}

.step {
  text-align: center;
  counter-increment: step;
}

.step::before {
  content: "0" counter(step);
  display: block;
  font-size: var(--font-size-3xl);
  font-weight: 700;
  color: var(--color-accent);
  margin-bottom: var(--spacing-sm);
}

.step-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  margin-bottom: var(--spacing-xs);
}

.step-text {
  font-size: var(--font-size-sm);
  color: var(--color-text-light);
}

/* === FAQ === */
.faq-list {
  max-width: 800px;
  margin: 0 auto;
}

.faq-item {
  border-bottom: 1px solid var(--color-border);
}

.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md) 0;
  cursor: pointer;
  font-size: var(--font-size-lg);
  font-weight: 500;
}

.faq-question::after {
  content: "+";
  font-size: var(--font-size-xl);
  font-weight: 300;
  transition: var(--transition);
}

.faq-item.active .faq-question::after {
  transform: rotate(45deg);
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease;
}

.faq-item.active .faq-answer {
  max-height: 300px;
}

.faq-answer p {
  padding-bottom: var(--spacing-md);
  color: var(--color-text-light);
  line-height: 1.7;
}

/* === FORM === */
.form-section {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

.form-group {
  margin-bottom: var(--spacing-sm);
}

.form-input {
  width: 100%;
  padding: 14px 16px;
  font-family: var(--font-primary);
  font-size: var(--font-size-base);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  background: var(--color-white);
  transition: var(--transition);
}

.form-input:focus {
  outline: none;
  border-color: var(--color-accent);
}

.form-input::placeholder {
  color: #999;
}

/* === FOOTER === */
.footer {
  background: var(--color-text);
  color: var(--color-white);
  padding: var(--spacing-xl) 0 var(--spacing-lg);
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);
}

.footer-logo {
  font-size: var(--font-size-xl);
  font-weight: 700;
  letter-spacing: 2px;
  margin-bottom: var(--spacing-sm);
}

.footer-desc {
  color: rgba(255,255,255,0.6);
  font-size: var(--font-size-sm);
  line-height: 1.7;
}

.footer-title {
  font-size: var(--font-size-sm);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: var(--spacing-md);
}

.footer-links a {
  display: block;
  color: rgba(255,255,255,0.6);
  font-size: var(--font-size-sm);
  padding: 4px 0;
  transition: var(--transition);
}

.footer-links a:hover {
  color: var(--color-white);
}

.footer-bottom {
  border-top: 1px solid rgba(255,255,255,0.1);
  padding-top: var(--spacing-md);
  text-align: center;
  font-size: var(--font-size-sm);
  color: rgba(255,255,255,0.4);
}

/* === BREADCRUMBS === */
.breadcrumbs {
  padding: var(--spacing-sm) 0;
  font-size: var(--font-size-sm);
  color: var(--color-text-light);
}

.breadcrumbs a {
  transition: var(--transition);
}

.breadcrumbs a:hover {
  color: var(--color-accent);
}

.breadcrumbs span {
  margin: 0 8px;
}

/* === RESPONSIVE === */
@media (max-width: 960px) {
  h1 { font-size: var(--font-size-3xl); }
  h2 { font-size: var(--font-size-2xl); }

  .header-nav { display: none; }
  .burger { display: flex; }

  .advantages { grid-template-columns: repeat(2, 1fr); }
  .catalog-cards { grid-template-columns: repeat(2, 1fr); }
  .steps { grid-template-columns: repeat(2, 1fr); }
  .footer-grid { grid-template-columns: repeat(2, 1fr); }
  .portfolio-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  :root {
    --spacing-2xl: 64px;
    --container-padding: 16px;
  }

  h1 { font-size: var(--font-size-2xl); }
  h2 { font-size: var(--font-size-xl); }

  .hero { height: 80vh; min-height: 500px; }
  .advantages { grid-template-columns: 1fr; }
  .catalog-cards { grid-template-columns: 1fr; }
  .steps { grid-template-columns: 1fr; }
  .footer-grid { grid-template-columns: 1fr; }
  .portfolio-grid { grid-template-columns: repeat(2, 1fr); }
  .grid-2, .grid-3, .grid-4 { grid-template-columns: 1fr; }
}

/* === MOBILE MENU === */
.mobile-menu {
  position: fixed;
  inset: 0;
  z-index: 999;
  background: var(--color-white);
  display: flex;
  flex-direction: column;
  padding: 80px var(--container-padding) var(--spacing-lg);
  transform: translateX(100%);
  transition: transform 0.4s ease;
}

.mobile-menu.active {
  transform: translateX(0);
}

.mobile-menu a {
  display: block;
  padding: var(--spacing-sm) 0;
  font-size: var(--font-size-lg);
  font-weight: 500;
  border-bottom: 1px solid var(--color-border);
}

/* === WHATSAPP FLOAT === */
.whatsapp-float {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 900;
  width: 56px;
  height: 56px;
  background: #25D366;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  transition: var(--transition);
}

.whatsapp-float:hover {
  transform: scale(1.1);
}

.whatsapp-float svg {
  width: 28px;
  height: 28px;
  fill: white;
}

/* === PRODUCT PAGE === */
.product-hero {
  padding: var(--spacing-xl) 0;
  margin-top: 80px;
}

.product-gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
  margin: var(--spacing-lg) 0;
}

.product-gallery img {
  width: 100%;
  aspect-ratio: 4/3;
  object-fit: cover;
  border-radius: var(--border-radius);
}

.product-features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-md);
}

.product-feature {
  padding: var(--spacing-md);
  background: var(--color-bg-alt);
  border-radius: var(--border-radius);
}

.product-feature-title {
  font-weight: 600;
  margin-bottom: var(--spacing-xs);
}

.related-products {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-md);
}

@media (max-width: 640px) {
  .product-gallery { grid-template-columns: repeat(2, 1fr); }
  .product-features { grid-template-columns: 1fr; }
  .related-products { grid-template-columns: 1fr; }
}
```

**Step 3: Создать JS для компонентов (header/footer loader)**

Файл: `assets/js/components.js`

```javascript
/* === Solara Design — Component Loader === */

async function loadComponent(id, path) {
  try {
    const response = await fetch(path);
    if (!response.ok) return;
    const html = await response.text();
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  } catch (e) {
    /* silent fail for local development */
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const depth = document.documentElement.getAttribute('data-depth') || '';
  const prefix = depth ? '../'.repeat(Number(depth)) : '';

  loadComponent('header', prefix + 'components/header.html');
  loadComponent('footer', prefix + 'components/footer.html');
});
```

**Step 4: Создать main.js**

Файл: `assets/js/main.js`

```javascript
/* === Solara Design — Main JS === */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Mobile menu toggle --- */
  document.addEventListener('click', (e) => {
    if (e.target.closest('.burger')) {
      document.querySelector('.mobile-menu')?.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    }
    if (e.target.closest('.mobile-menu a')) {
      document.querySelector('.mobile-menu')?.classList.remove('active');
      document.body.classList.remove('menu-open');
    }
  });

  /* --- FAQ accordion --- */
  document.addEventListener('click', (e) => {
    const question = e.target.closest('.faq-question');
    if (!question) return;
    const item = question.closest('.faq-item');
    const answer = item.querySelector('.faq-answer');

    if (item.classList.contains('active')) {
      item.classList.remove('active');
      answer.style.maxHeight = '0';
    } else {
      document.querySelectorAll('.faq-item.active').forEach(i => {
        i.classList.remove('active');
        i.querySelector('.faq-answer').style.maxHeight = '0';
      });
      item.classList.add('active');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });

  /* --- Lazy loading images --- */
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          observer.unobserve(img);
        }
      });
    }, { rootMargin: '200px' });

    document.querySelectorAll('img[data-src]').forEach(img => observer.observe(img));
  }

  /* --- Header scroll effect --- */
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (!header) return;
    const currentScroll = window.scrollY;
    if (currentScroll > 100) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
    lastScroll = currentScroll;
  });

  /* --- Form submission --- */
  document.addEventListener('submit', (e) => {
    const form = e.target.closest('.contact-form');
    if (!form) return;
    e.preventDefault();
    const formData = new FormData(form);
    const phone = formData.get('phone');
    const name = formData.get('name');
    const message = encodeURIComponent(
      `Здравствуйте! Меня зовут ${name}. Хочу заказать бесплатный замер.`
    );
    window.open(`https://wa.me/971589408100?text=${message}`, '_blank');
  });

});
```

**Step 5: Создать robots.txt и sitemap.xml**

Файл: `robots.txt`

```
User-agent: *
Allow: /
Sitemap: https://solaradesign.ae/sitemap.xml
```

Файл: `sitemap.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://solaradesign.ae/</loc><priority>1.0</priority></url>
  <url><loc>https://solaradesign.ae/shtory/</loc><priority>0.9</priority></url>
  <url><loc>https://solaradesign.ae/shtory/tyul/</loc><priority>0.8</priority></url>
  <url><loc>https://solaradesign.ae/shtory/blekaut/</loc><priority>0.8</priority></url>
  <url><loc>https://solaradesign.ae/shtory/den-noch/</loc><priority>0.8</priority></url>
  <url><loc>https://solaradesign.ae/shtory/rimskie/</loc><priority>0.8</priority></url>
  <url><loc>https://solaradesign.ae/shtory/shtory-na-zakaz/</loc><priority>0.8</priority></url>
  <url><loc>https://solaradesign.ae/zhalyuzi/</loc><priority>0.9</priority></url>
  <url><loc>https://solaradesign.ae/zhalyuzi/rulonnye/</loc><priority>0.8</priority></url>
  <url><loc>https://solaradesign.ae/zhalyuzi/vertikalnye/</loc><priority>0.8</priority></url>
  <url><loc>https://solaradesign.ae/zhalyuzi/gorizontalnye/</loc><priority>0.8</priority></url>
  <url><loc>https://solaradesign.ae/motorizaciya/</loc><priority>0.8</priority></url>
  <url><loc>https://solaradesign.ae/portfolio/</loc><priority>0.7</priority></url>
  <url><loc>https://solaradesign.ae/blog/</loc><priority>0.7</priority></url>
  <url><loc>https://solaradesign.ae/o-nas/</loc><priority>0.6</priority></url>
  <url><loc>https://solaradesign.ae/kontakty/</loc><priority>0.6</priority></url>
  <url><loc>https://solaradesign.ae/kalkulyator/</loc><priority>0.7</priority></url>
</urlset>
```

**Step 6: Создать index.html — заглушку**

```bash
# Проверить, что все директории созданы
ls -R "/Users/rus/Desktop/FENESTRA/сайт 2 рус дубай/"
```

---

### Task 2: Header и Footer компоненты

**Files:**
- Create: `components/header.html`
- Create: `components/footer.html`

**Step 1: Создать header.html**

Файл: `components/header.html`

```html
<header class="header">
  <div class="container header-inner">
    <a href="/" class="header-logo">SOLARA <span>Design</span></a>
    <nav class="header-nav">
      <a href="/shtory/">Шторы</a>
      <a href="/zhalyuzi/">Жалюзи</a>
      <a href="/motorizaciya/">Моторизация</a>
      <a href="/portfolio/">Портфолио</a>
      <a href="/blog/">Блог</a>
      <a href="/o-nas/">О нас</a>
      <a href="/kontakty/">Контакты</a>
    </nav>
    <div class="header-contacts">
      <a href="tel:+971589408100" class="header-phone">+971 58 940 8100</a>
      <a href="https://wa.me/971589408100" class="btn btn-primary" target="_blank" rel="noopener">WhatsApp</a>
    </div>
    <div class="burger" aria-label="Меню">
      <span></span><span></span><span></span>
    </div>
  </div>
</header>

<div class="mobile-menu">
  <a href="/shtory/">Шторы</a>
  <a href="/zhalyuzi/">Жалюзи</a>
  <a href="/motorizaciya/">Моторизация</a>
  <a href="/portfolio/">Портфолио</a>
  <a href="/blog/">Блог</a>
  <a href="/o-nas/">О нас</a>
  <a href="/kontakty/">Контакты</a>
  <a href="tel:+971589408100">+971 58 940 8100</a>
</div>
```

**Step 2: Создать footer.html**

Файл: `components/footer.html`

```html
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <div class="footer-logo">SOLARA <span style="font-weight:300">Design</span></div>
        <p class="footer-desc">Шторы на заказ в Дубае. Натуральные ткани, бесплатный замер, установка за 4-5 дней.</p>
      </div>
      <div>
        <div class="footer-title">Продукция</div>
        <div class="footer-links">
          <a href="/shtory/">Шторы</a>
          <a href="/zhalyuzi/">Жалюзи</a>
          <a href="/motorizaciya/">Моторизация</a>
          <a href="/kalkulyator/">Калькулятор</a>
        </div>
      </div>
      <div>
        <div class="footer-title">Компания</div>
        <div class="footer-links">
          <a href="/portfolio/">Портфолио</a>
          <a href="/blog/">Блог</a>
          <a href="/o-nas/">О нас</a>
          <a href="/kontakty/">Контакты</a>
        </div>
      </div>
      <div>
        <div class="footer-title">Контакты</div>
        <div class="footer-links">
          <a href="tel:+971589408100">+971 58 940 8100</a>
          <a href="mailto:hello@solaradesign.ae">hello@solaradesign.ae</a>
          <a href="https://wa.me/971589408100" target="_blank" rel="noopener">WhatsApp</a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      &copy; 2026 Solara Design. Все права защищены.
    </div>
  </div>
</footer>
```

---

### Task 3: Главная страница (index.html)

**Files:**
- Create: `index.html`

**Step 1: Создать полную главную страницу**

Файл: `index.html` — полный HTML с секциями Hero, Преимущества, Каталог, Портфолио, Как мы работаем, FAQ, CTA, WhatsApp-кнопка.

Включает:
- Полный `<head>` с мета-тегами, Schema.org (LocalBusiness + FAQPage), OG-теги, geo-теги
- 10 секций согласно дизайн-документу
- Placeholder-изображения (будут заменены реальными)
- FAQ с 5 вопросами
- Форма бесплатного замера

**Step 2: Проверить в браузере**

```bash
open "/Users/rus/Desktop/FENESTRA/сайт 2 рус дубай/index.html"
```

---

### Task 4: Хаб-страница «Шторы» (/shtory/index.html)

**Files:**
- Create: `shtory/index.html`

Страница-хаб со ссылками на все типы штор (тюль, блэкаут, день-ночь, римские, шторы на заказ). SEO-текст, карточки категорий, breadcrumbs, FAQ.

---

### Task 5: Продуктовые страницы штор

**Files:**
- Create: `shtory/tyul/index.html`
- Create: `shtory/blekaut/index.html`
- Create: `shtory/den-noch/index.html`
- Create: `shtory/rimskie/index.html`
- Create: `shtory/shtory-na-zakaz/index.html`

Каждая страница по шаблону продуктовой страницы из дизайн-документа:
- Breadcrumbs (Schema BreadcrumbList)
- H1 с ключевым запросом + "в Дубае"
- SEO-текст 200-300 слов
- Галерея (placeholder)
- Преимущества типа
- Ткани и цвета
- Цены
- FAQ (Schema FAQPage)
- CTA
- Связанные продукты

---

### Task 6: Хаб «Жалюзи» + подстраницы

**Files:**
- Create: `zhalyuzi/index.html`
- Create: `zhalyuzi/rulonnye/index.html`
- Create: `zhalyuzi/vertikalnye/index.html`
- Create: `zhalyuzi/gorizontalnye/index.html`

Аналогично Task 4-5, но для жалюзи.

---

### Task 7: Страница «Моторизация»

**Files:**
- Create: `motorizaciya/index.html`

Отдельная посадочная: моторизированные шторы, электрокарнизы, smart home интеграция. Уникальный контент про управление через приложение/пульт.

---

### Task 8: Страницы Портфолио, О нас, Контакты

**Files:**
- Create: `portfolio/index.html`
- Create: `o-nas/index.html`
- Create: `kontakty/index.html`

**Портфолио:** Сетка фотографий работ (placeholder). Фильтрация по категориям.
**О нас:** История, команда, преимущества.
**Контакты:** Адрес, телефон, WhatsApp, форма, Google Maps embed.

---

### Task 9: Калькулятор стоимости

**Files:**
- Create: `kalkulyator/index.html`
- Create: `assets/js/calculator.js`

Интерактивный калькулятор:
- Тип штор (select)
- Ширина окна (input, м)
- Высота окна (input, м)
- Тип ткани (select)
- Моторизация (checkbox)
- Расчёт цены в AED
- CTA: "Уточнить стоимость в WhatsApp"

---

### Task 10: Блог — шаблон и первые статьи

**Files:**
- Create: `blog/index.html` (список статей)
- Create: `blog/kak-vybrat-shtory-v-dubae/index.html`
- Create: `blog/blekaut-shtory-dubay/index.html`
- Create: `blog/motorizirovannye-shtory-smart-home/index.html`

Шаблон блога: список карточек статей с заголовком, превью, датой.
3 SEO-статьи с уникальным контентом (300-500 слов каждая).

---

### Task 11: Финализация и SEO-проверка

**Step 1:** Проверить все Schema.org разметки (LocalBusiness, FAQPage, BreadcrumbList, Product)
**Step 2:** Проверить все meta-теги (title, description, keywords, OG, geo)
**Step 3:** Проверить все внутренние ссылки
**Step 4:** Проверить адаптивность на 320px, 640px, 960px, 1200px
**Step 5:** Проверить скорость загрузки (минимум JS, оптимизированные изображения)
**Step 6:** Обновить sitemap.xml с финальными URL

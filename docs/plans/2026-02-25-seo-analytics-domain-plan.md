# SEO, Analytics & Domain Change — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Change domain to solaradesign.com, add analytics (GA4 + Yandex.Metrica), update robots.txt, create OG image, add GSC verification placeholder.

**Architecture:** Global find-and-replace for domain change across all HTML + sitemap + robots. Analytics scripts injected via shared header components. Single universal OG image for all pages.

**Tech Stack:** HTML meta tags, Google Analytics gtag.js, Yandex.Metrica tag.js, static OG image.

---

## Task 1: Replace solaradesign.ae → solaradesign.com in all files

**Files:** All HTML files, sitemap.xml, robots.txt (78 files, ~685 occurrences)

**Step 1:** Replace `solaradesign.ae` with `solaradesign.com` in all HTML, XML, and TXT files (excluding docs/plans/ and CLAUDE.md).

**Step 2:** Replace `kpackk.github.io` with `solaradesign.com` in all HTML files (~37 files, og:image URLs).

**Step 3:** Verify no stale domain references remain.

**Step 4:** Commit: `chore: change domain from solaradesign.ae to solaradesign.com`

---

## Task 2: Create universal OG image

**Files:** Create: `assets/images/og-default.jpg`

**Step 1:** Generate a 1200×630 branded OG image with Solara Design logo/text, gold accent (#B8924A), premium look.

**Step 2:** Update og:image on ALL pages to `https://solaradesign.com/assets/images/og-default.jpg`.

**Step 3:** Commit: `feat: add universal OG image for social sharing`

---

## Task 3: Update robots.txt

**Files:** Modify: `robots.txt`

**Step 1:** Update robots.txt with solaradesign.com sitemap URL and Disallow rules.

**Step 2:** Commit: `chore: update robots.txt`

---

## Task 4: Add analytics to header components

**Files:** Modify: `components/header.html`, `en/components/header.html`

**Step 1:** Add GA4 gtag.js snippet (placeholder G-XXXXXXXXXX) and Yandex.Metrica snippet (placeholder XXXXXXXXX) to both header files.

**Step 2:** Commit: `feat: add GA4 and Yandex.Metrica analytics placeholders`

---

## Task 5: Add GSC verification meta tag

**Files:** Modify: `index.html`, `en/index.html`

**Step 1:** Add `<meta name="google-site-verification" content="PLACEHOLDER">` to both homepages.

**Step 2:** Commit: `feat: add Google Search Console verification placeholder`

---

## Task 6: Update CLAUDE.md

**Files:** Modify: `CLAUDE.md`

**Step 1:** Update domain reference from solaradesign.ae to solaradesign.com.

**Step 2:** Add notes about analytics and OG image.

**Step 3:** Commit: `docs: update CLAUDE.md with new domain and analytics info`

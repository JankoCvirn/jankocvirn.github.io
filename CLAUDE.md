# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Janko Cvirn's personal portfolio site (freelance Android developer), served by GitHub Pages from the `main` branch root as `https://jankocvirn.github.io/`. It's a hand-written static site with no framework, no vendor libraries, no build step and no tests. Files are served as-is, so a push to `main` deploys.

## Running locally

```
python -m http.server 8000
```

Then open http://localhost:8000/. Use a server rather than `file://`, because `404.html` uses root-absolute paths (`/assets/...`).

## Structure

- `index.html` is the whole site: a single page with `#top` (hero), `#about`, a stats strip, `#skills`, `#services` and `#contact`. All content is hard-coded here. Icons are inline SVGs that inherit `currentColor`; there is no icon font.
- `assets/css/style.css` holds all styles. Colours are CSS custom properties on `:root`. Dark mode is defined twice, and both copies must stay in sync:
  - under `@media (prefers-color-scheme: dark)` with `:root:not([data-theme="light"])`
  - under `:root[data-theme="dark"]`
- `assets/js/main.js` is one small IIFE that handles the mobile nav toggle, the theme toggle and active-link highlighting with `IntersectionObserver`. A short inline script in each page's `<head>` applies the saved theme from `localStorage` before first paint.
- `404.html` is served automatically by GitHub Pages and reuses `style.css`.

## SEO: keep these in sync when editing content

- In the `index.html` `<head>`:
  - the `<title>` and meta description
  - the Open Graph tags
  - the JSON-LD `@graph` (a `Person` and a `ProfessionalService`). Its `knowsAbout` and `serviceType` lists should match the visible Skills and Services sections.
- `sitemap.xml`: update `<lastmod>` when the page content changes.
- `robots.txt` points to the sitemap.

## Content rules

- Contact details are intentionally limited to "Zagreb area, Croatia", email and profile links. Don't add back a street address or phone number.
- There's no contact form, because GitHub Pages can't run server-side code.
- An open TODO in `index.html`: the Bing Webmaster Tools verification meta tag. Keep the `google-site-verification` tag, or Search Console loses ownership.

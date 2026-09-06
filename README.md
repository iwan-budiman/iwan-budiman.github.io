# iwan-budiman.github.io

Personal portfolio site for Iwan Budiman:

```text
https://iwan-budiman.github.io
```

## Overview

This repository contains a dependency-light, single-page portfolio for a solutions
architect. It presents representative engagements, a six-phase architecture method,
enterprise expertise, professional credentials, and a LinkedIn contact path.

The site is built with semantic HTML, modern CSS, and a small JavaScript enhancement
layer. It deliberately does not use a framework, build step, or client-side router.
Sections use URL hashes, which keeps direct links and refreshes compatible with
GitHub Pages.

Key experience features include:

- a responsive, accessible mobile navigation
- a custom architecture systems map in the hero
- keyboard-accessible approach tabs
- a complete no-JavaScript fallback for the six-phase approach
- active-section navigation and restrained scroll reveals
- reduced-motion and forced-colour support
- self-hosted fonts and lazy-loaded below-the-fold imagery
- canonical, Open Graph, Twitter, and structured profile metadata
- crawler guidance and XML sitemap discovery

## Page flow

1. Hero and professional positioning
2. Representative engagements
3. Expertise and industry breadth
4. Credentials
5. Signature architecture approach
6. Contact

The primary navigation links to these sections with URL fragments rather than
separate routes.

## Repository structure

```text
.
|-- index.html
|-- README.md
|-- robots.txt
|-- sitemap.xml
`-- assets/
    |-- styles.css
    |-- site.js
    |-- favicon.svg
    |-- og-image.png
    |-- hero-architecture.jpg
    |-- cert-*
    `-- fonts/
        |-- manrope-latin.woff2
        |-- ibm-plex-mono-500-latin.woff2
        |-- ibm-plex-mono-600-latin.woff2
        |-- MANROPE-OFL.txt
        `-- IBM-PLEX-MONO-OFL.txt
```

- `index.html` contains page content, metadata, structured data, and the static
  approach fallback.
- `assets/styles.css` contains the visual system, responsive layouts, motion, and
  accessibility preference styles.
- `assets/site.js` enhances the mobile menu, scroll reveals, active navigation,
  approach tabs, and copyright year.
- `assets/og-image.png` is the 1200 x 630 social sharing image.
- `assets/hero-architecture.jpg` is the lazy-loaded experience image.
- `robots.txt` and `sitemap.xml` provide search-engine discovery information.

## Local preview

Node.js and npm are recommended for the documented validation workflow. No
dependency installation or build command is required.

Start a no-cache static preview:

```powershell
npx --yes http-server . -p 4173 -c-1
```

Then visit:

```text
http://127.0.0.1:4173/
```

Python's built-in static server is also sufficient for a basic preview:

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

## Validation

Run the syntax and document checks from the repository root:

```powershell
node --check assets/site.js
npx --yes html-validate index.html
npx --yes csstree-validator assets/styles.css
git diff --check
```

For a local Lighthouse audit, start the preview server and run:

```powershell
npx --yes lighthouse http://127.0.0.1:4173/ `
  "--only-categories=performance,accessibility,best-practices,seo" `
  --view
```

The latest local mobile audit on 27 July 2026 scored:

- Performance: 99
- Accessibility: 100
- Best Practices: 100
- SEO: 100

The responsive browser checks covered widths from 320px through 1440px, with
no document-level horizontal overflow or browser console errors. Lighthouse
scores can vary slightly by machine and network conditions.

## Content maintenance

When updating the site:

- Keep the interactive approach data in `assets/site.js` synchronized with the
  `.approach-fallback` content in `index.html`.
- Verify credential names, issue dates, expiry dates, and external credential links
  before publishing changes.
- Update the profile metadata and JSON-LD in `index.html` when professional
  positioning changes.
- Replace `assets/og-image.png` after material hero or brand changes. Preserve its
  1200 x 630 dimensions and update the image metadata if the filename changes.
- Update the `<lastmod>` value in `sitemap.xml` after a material published update.
- Keep meaningful images descriptive and decorative credential artwork empty-alt
  when adjacent text already supplies the accessible name.
- Preserve minimum touch targets, visible focus styles, reduced-motion behaviour,
  and the no-JavaScript fallback when changing interactions.

## Fonts and licensing

Manrope and IBM Plex Mono are self-hosted to avoid a render-blocking third-party
font request. Their SIL Open Font Licence texts are stored beside the font files:

- `assets/fonts/MANROPE-OFL.txt`
- `assets/fonts/IBM-PLEX-MONO-OFL.txt`

## Publishing

This repository is intended to be published as the `iwan-budiman.github.io`
GitHub Pages user site. GitHub Pages should serve the repository root directly;
there is no generated output directory.

```powershell
git add .
git commit -m "Update portfolio"
git push
```

After publishing, verify the live page, section hashes, social sharing image,
credential links, `robots.txt`, and `sitemap.xml`.

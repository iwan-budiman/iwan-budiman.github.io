# iwan-budiman.github.io

Personal GitHub Pages site for Iwan Budiman.

Live site:

```text
https://iwan-budiman.github.io
```

## Overview

This is a small static professional profile site built with plain HTML and CSS. It presents a high-level solutions architecture profile, focus areas, enterprise experience, certifications, and LinkedIn contact details.

## Structure

- `index.html` - page content, metadata, navigation, profile sections, and credential links
- `assets/styles.css` - responsive layout, typography, colour theme, and component styling
- `assets/favicon.svg` - site favicon matching the `IB` brand mark
- `assets/hero-architecture.jpg` - hero background image
- `assets/cert-*.png` - local certification badge images from Credly
- `assets/cert-confluent-logo.svg` - Confluent logo mark used for the Confluent credential card

## Site Sections

- About / hero profile
- Focus areas
- Experience
- Certifications and credentials
- Contact

## Local Preview

Open `index.html` directly in a browser, or serve the folder locally with any static file server.

Example:

```powershell
python -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

## Publishing

This repository is intended to be published by GitHub Pages as a user site. The repository name should remain:

```text
iwan-budiman.github.io
```

To publish changes:

```powershell
git add .
git commit -m "Update site"
git push
```

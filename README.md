# Metal Prototype Lab Website

One-page industrial B2B landing page for Metal Prototype Lab, supporting international inquiry and project coordination for YCJG Metal Additive Manufacturing.

## What Is Included

- Premium dark industrial landing page
- Responsive one-page navigation
- Sticky header with active section state
- Mobile menu with section links
- Desktop floating `Send CAD for Review` CTA
- Mobile sticky bottom CTA
- Lightweight animated hero scene inspired by metal AM geometry, powder particles, and laser scan lines
- Clickable case, gallery, capability, material, and application detail modals
- Interactive quotation checklist with a generated email CTA
- SEO metadata for SLM / LPBF metal 3D printing and precision parts inquiry

## Edit Points

Most buyer-facing content is in [app/page.tsx](/Users/billionare/Documents/日常工具/app/page.tsx).

Search for these comments or constants:

- `email`: inquiry email
- `linkedInUrl`: LinkedIn URL
- `capabilities`: capability cards and modal details
- `materials`: material list and details
- `applications`: civilian application list
- `quoteChecklist`: quotation request checklist
- CTA text in `FinalCta`

## Local Preview

Install dependencies:

```bash
npm install
```

Start local preview:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Required Packages

The intended stack includes:

```bash
npm install framer-motion three @react-three/fiber @react-three/drei
```

In this workspace, network access to npm was blocked during setup, so the first version uses a lightweight CSS/React industrial 3D-style hero that works without downloading extra packages. After installing the packages above, the hero can be upgraded to a true React Three Fiber scene without changing the page structure.

## Deploy To GitHub Pages

1. Push this folder to GitHub.
2. In the repository settings, enable GitHub Pages from GitHub Actions.
3. The workflow in `.github/workflows/pages.yml` builds the static site automatically.
4. The published URL will use the repository path, for example:

```text
https://ddwanan1234567.github.io/industrial-sourcing-site/
```

No backend is required for this version.

## Content Safety

This version is positioned for civilian industrial B2B inquiries only. All feasibility, material selection, and quotation details are stated as subject to technical review.

# YCJG Metal Additive Manufacturing Website

One-page industrial B2B landing page for international LPBF / SLM metal additive manufacturing inquiries.

## What Is Included

- Premium dark industrial landing page
- Responsive one-page navigation
- Sticky header with active section state
- Desktop floating `Send Drawing` CTA
- Mobile sticky bottom CTA
- Lightweight animated hero scene inspired by metal AM geometry, powder particles, and laser scan lines
- Capability, material, and application detail modals
- Quotation checklist and contact CTA
- SEO metadata for LPBF / SLM precision parts inquiry

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

## Deploy To Vercel

1. Push this folder to GitHub.
2. Import the repo into Vercel.
3. Use the default Next.js settings.
4. Add any future environment variables only if needed.

No backend is required for this version.

## Content Safety

This version is positioned for civilian industrial B2B inquiries only. All feasibility, material selection, and quotation details are stated as subject to technical review.

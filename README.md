# Your Digital Studio — Website

A production-ready marketing site for a freelance website design and development studio: 13 live
projects, transparent INR pricing, a WhatsApp-first enquiry flow and a fully responsive dark/lime
visual system.

**Stack:** Vite 6 · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · lucide-react

---

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build into dist/
npm run preview  # preview the production build
```

## Change the brand in one place

Everything customer-facing is driven by config, not hardcoded markup.

| What | Where |
| --- | --- |
| Studio name, short name, phone, WhatsApp, email, location, socials, availability | `src/data/site.ts` |
| The 13 portfolio projects (name, category, description, live URL, screenshot) | `src/data/projects.ts` |
| Services and their tags | `src/data/services.ts` |
| Packages, comparison table, pricing rules, FAQs | `src/data/pricing.ts` |
| Design tokens (colours, fonts, easing) | `src/index.css` (`@theme`) |

> The brand name is currently the placeholder **“Your Digital Studio”**. Replace `name` and
> `shortName` in `src/data/site.ts` and the studio name updates in the navbar, footer, page title of
> the legal pages and the WhatsApp messages. No registered company identity is implied.

Social links are hidden automatically while their values are empty strings.

## Enquiry form

By default the form validates the input, formats a structured enquiry and opens WhatsApp with the
message pre-filled — nothing is stored or transmitted by the site itself.

To deliver enquiries to an inbox instead, deploy a form backend (Formspree, Basin, a Worker, an
API route, etc.) and set:

```bash
VITE_ENQUIRY_ENDPOINT=https://your-form-endpoint.example
```

The form then `POST`s JSON (`name`, `business`, `phone`, `email`, `category`, `websiteType`, `plan`,
`message`, `existingUrl`) and shows a real success or failure state. If the request fails it falls
back to the WhatsApp flow so an enquiry is never lost silently.

## SEO

`index.html` carries the title, description, canonical, Open Graph/Twitter cards and JSON-LD
(`ProfessionalService` + `WebSite`). `public/robots.txt`, `public/sitemap.xml`, `public/404.html`
and `public/og-image.jpg` ship with the build.

Before going live, replace the placeholder domain `https://yourdigitalstudio.example` in
`src/data/site.ts`, `index.html` (canonical, OG, JSON-LD), `public/robots.txt` and
`public/sitemap.xml`.

## Portfolio screenshots

`scripts/shots.mjs` captures fresh screenshots of every live project into `public/projects/`:

```bash
node scripts/shots.mjs
```

It uses `playwright-core` with the system Chromium (`/usr/bin/chromium`). Adjust the executable path
at the top of the script if Chromium lives elsewhere.

## Deploy

**GitHub Pages** — `.github/workflows/deploy.yml` builds and publishes on every push to `main`.
Enable *Settings → Pages → Source: GitHub Actions*. The workflow sets `VITE_BASE` to the repository
sub-path automatically; for a custom domain set `VITE_BASE=/` instead.

**Any static host** — build and upload `dist/`. Set `VITE_BASE` if the site is served from a
sub-directory.

## Project structure

```
src/
├── components/   Navbar, Footer, Accordion, Reveal, Logo, SectionHeading, FloatingActions
├── data/         site.ts · projects.ts · services.ts · pricing.ts
├── lib/          utils.ts (asset, INR formatting, smooth scroll) · plan.ts
├── sections/     Hero · TrustMarquee · About · Services · Portfolio · Pricing · Faq
│                 Process · WhyUs · Contact · FinalCta
├── App.tsx
└── index.css     design tokens + component classes
public/           project screenshots, favicon, og-image, robots, sitemap, 404, legal pages
scripts/shots.mjs portfolio screenshot capture
```

## Accessibility & performance notes

- Skip link, keyboard-operable menu, accordion and filters; `aria-expanded` / `aria-pressed` states.
- Form errors are linked with `aria-describedby` and the first invalid field receives focus.
- All motion respects `prefers-reduced-motion`.
- Self-hosted variable fonts (`Inter`, `Inter Tight`, `Instrument Serif`) — no external font requests.
- Portfolio images are real captures of the live client sites, served from the same origin.

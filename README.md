# Your Digital Studio — Website

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/DevaSaiNandiniMandapalli/digital-studio-website&framework=vite&build-command=npm%20run%20build&output-directory=dist)

**Live now (GitHub Pages):** https://devasainandinimandapalli.github.io/digital-studio-website/


A production-ready marketing site for an independent website design and development studio:
12 live project links, transparent INR pricing, a WhatsApp-first enquiry flow and a cinematic
3D design system — an obsidian canvas, bone plates and a single ember accent, Inter Tight display
with Instrument Serif italic counterpoints, layered browser-window compositions in real CSS 3D
perspective, depth-based scrolling and a light "paper" break for the work section.

**Stack:** Vite 6 · React 19 · TypeScript · Tailwind CSS v4 · GSAP + ScrollTrigger · Framer Motion · Three.js + React Three Fiber · lucide-react

**Design system:** tokens (colour, type, spacing, easing) live in `src/index.css` under
`@theme`; `.on-paper` re-declares the same tokens for light bands. Sections are composed from
`src/components` (Navbar, Logo, BrowserFrame, Tilt, LogoMarquee, Sculpture, ScrollProgress,
Accordion, Reveal, SectionHeading, Footer, FloatingActions). The hero runs a GSAP entrance
timeline, pointer parallax and a scrubbed scroll push-through; `LogoMarquee` drives the two-row
client ribbon; `Sculpture` lazily mounts a real Three.js scene (PMREM studio environment, chrome
torus knot) only when the bento grid enters the viewport. Motion is disabled for coarse pointers
and `prefers-reduced-motion`.

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
| The 12 portfolio projects (name, category, description, live URL, screenshot) | `src/data/projects.ts` |
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

**GitHub Pages (current setup)** — the site is published from the `gh-pages` branch of
`DevaSaiNandiniMandapalli/digital-studio-website` to
https://devasainandinimandapalli.github.io/digital-studio-website/

To publish an update:

```bash
VITE_BASE=/digital-studio-website/ npm run build
# copy the contents of dist/ into the gh-pages branch and push it
```

`VITE_BASE` must match the URL sub-path (use `/` for a custom domain). The branch also contains a
`.nojekyll` file so GitHub Pages serves the hashed asset files as-is.

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

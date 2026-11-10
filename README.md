# YOUR DIGITAL STUDIO — THE DIGITAL ATELIER

A cinematic, scroll-driven 3D website for **Your Digital Studio (YDS)** — an independent digital
design and development studio based in Hyderabad, India, working with clients worldwide.

The site is not a landing page with a 3D background. It is a single continuous scene: a dark,
floating **Digital Atelier** in which a sculptural glass portal, metallic structures, translucent
panels and real project screens hover in volumetric blue light. Scrolling moves a virtual camera
through the environment, the portal opens, the floating interfaces drift past, and the story ends
on the studio's closing statement.

> **WE DON'T JUST BUILD WEBSITES. WE BUILD DIGITAL EXPERIENCES.**

---

## Contents

- [Live sites](#live-sites)
- [The experience](#the-experience)
- [Sections](#sections)
- [Feature list](#feature-list)
- [Tech stack](#tech-stack)
- [Design system](#design-system)
- [3D architecture](#3d-architecture)
- [Project structure](#project-structure)
- [Run locally](#run-locally)
- [Editing content](#editing-content)
- [Scripts](#scripts)
- [Deploy](#deploy)
- [Performance and accessibility](#performance-and-accessibility)
- [Browser support](#browser-support)
- [Credits](#credits)

---

## Live sites

| Target | URL |
| --- | --- |
| GitHub Pages | https://devasainandinimandapalli.github.io/digital-studio-website/ |
| Vercel | the existing YDS Vercel project (`vercel.json` is included) |

The build is base-path aware, so the same source serves both a domain root (Vercel) and a
repository sub-path (GitHub Pages, `/digital-studio-website/`).

## The experience

1. **Arrival** — the camera sits outside the atelier looking into a lit glass portal. Three real
   client websites float in the space around it.
2. **Scroll journey** — the hero is pinned for roughly 5.6 viewports. A keyframed camera path
   approaches the portal, the aperture opens between 28% and 70% of the journey, the glass membrane
   dissolves and the chrome sculpture retreats as the camera passes through it.
3. **Content** — the studio's work, services, process and pricing read as clean, quiet editorial
   layout in front of the continuing scene.
4. **Finale** — the closing section hands the scene to a second camera path and the portal closes
   behind the final statement.

Nothing in the environment is decorative noise: every floating panel is a real project the studio
has built, and every section is readable with the 3D layer fully disabled.

## Sections

| Section | Purpose |
| --- | --- |
| `Nav` | Sticky navigation, scroll progress, ambient sound toggle, WhatsApp CTA |
| `Hero` | Pinned 3D journey, headline, primary and secondary CTAs, scroll cue |
| `Marquee` | Continuous typographic ribbon of the studio's disciplines |
| `About` | Positioning, working method, Hyderabad / global footprint |
| `Services` | Website design, development, e-commerce, SEO and content structure |
| `Portfolio` | 12 live projects in a 3-per-row grid (2 tablet, 1 mobile) with live-visit links |
| `Blueprint` | Blueprint-style scanner that reads the page as it enters the viewport |
| `Process` | Discovery → design → build → launch, as a numbered narrative |
| `Pricing` | Transparent INR packages with scope, deliverables and delivery windows |
| `Contact` | Enquiry form that composes a structured WhatsApp message (no backend required) |
| `FinalCTA` | Cinematic close with the brand statement and final CTA |
| `Footer` | Contact details, navigation, service area, credits |

## Feature list

- Scroll-controlled camera journey with damped, keyframed paths and pointer parallax
- Custom GLB sculpture (`public/models/atelier-core.glb`) generated procedurally with
  `GLTFExporter`, loaded through `useGLTF` inside the portal
- Real website previews used as 3D panels, with anisotropy-corrected textures and depth drift
- Glass portal with transmission material (desktop), metallic ring assembly, volumetric core,
  light beam, particles and reflective floor
- Bento-style service and capability grids
- Blueprint scanner section with a live read-out driven by scroll progress
- Interactive portfolio filters (All, Restaurants, Retail, Hospitality, Business, E-commerce)
- WhatsApp-first enquiry flow: the form builds a fully encoded `wa.me` link and shows a success state
- Opt-in procedural ambient audio (WebAudio, no audio files, never autoplays)
- Reduced-motion and low-power fallbacks for the whole experience
- SEO: description, Open Graph, Twitter card and `ProfessionalService` JSON-LD

## Tech stack

- **React 18 + TypeScript + Vite** — application shell and build
- **Three.js / @react-three/fiber / @react-three/drei** — the 3D scene
- **GSAP ScrollTrigger + Lenis** — scroll timeline and smooth scrolling
- **Framer Motion** — section reveals, filters and layout transitions
- **Tailwind CSS** — design tokens and layout
- **WebAudio API** — procedural ambient pad
- **WebP** — 12 optimised project previews

## Design system

| Token | Value |
| --- | --- |
| Background | `#080B12` |
| Secondary background | `#101722` |
| Card background | `#121D2B` |
| Primary text | `#F5F5F2` |
| Secondary text | `#A5ADBA` |
| Accent | `#B7F45A` |
| Secondary accent | `#72C9FF` |
| Metallic highlight | silver / soft chrome |

Lighting direction: cinematic blue key with lime reflections, controlled specular highlights and
soft volumetric falloff. Typography pairs a tight uppercase display face with a neutral text face;
tracking is used deliberately rather than as decoration. Tokens live in `tailwind.config` and
`src/index.css`.

## 3D architecture

```
Canvas (React.lazy, pointer-events: none, sits behind the DOM)
├── CameraRig       keyframed MAIN_PATH / FINAL_PATH sampled from scrollState
├── Portal          ring assembly, glass membrane, light core, beam, GLB sculpture
├── Panels          real project screens floating in the space around the portal
├── Structures      metallic architectural forms and translucent panels
├── Particles       drifting motes (560 desktop / 220 mobile)
├── Floor           reflective plane with controlled roughness
└── Environment     Lightformer-based studio lighting (PMREM, one frame)
```

Scroll state is kept in a single mutable module (`src/lib/scrollState.ts`) so scrolling never
triggers React re-renders. The canvas is switched to `frameloop="never"` whenever its sections are
off screen, and `PerformanceMonitor` reduces device pixel ratio if frame times degrade.

## Project structure

```
src/
  App.tsx                 page composition + scene activation
  data.ts                 projects, services, tiers, process, contact details
  lib/
    asset.ts              base-path aware public asset helper
    scrollState.ts        mutable scroll state read by the 3D scene
    smooth.ts             Lenis + ScrollTrigger wiring, scrollToEl helper
    sound.ts              procedural ambient pad (opt-in)
    hooks.ts              media query / reduced motion / touch helpers
  components/
    Nav.tsx, Footer.tsx, ui.tsx
    scene/                Atelier canvas, cameraPath, Portal, Panels, Atmosphere, textures
    sections/             Hero, Marquee, About, Services, Portfolio, Blueprint,
                          Process, Pricing, Contact, FinalCTA
public/
  shots/                  12 optimised WebP previews of live studio work
  models/atelier-core.glb custom sculpture loaded inside the portal
  favicon.svg
scripts/
  build-model.mjs         regenerates the GLB (npm run build:model)
  capture-shots.mjs       refreshes the preview screenshots (npm run shots)
  deploy-pages.sh         builds with the Pages base path and publishes dist to gh-pages
```

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run typecheck  # tsc -b
npm run build      # typecheck + production build into dist/
npm run preview    # serve the production build
```

## Editing content

Everything the studio may want to change lives in `src/data.ts`:

- `PROJECTS` — name, category, live URL and preview screenshot for each of the 12 builds
- `SERVICES` — service cards and their deliverables
- `TIERS` — pricing packages, scope lines and delivery windows
- `PROCESS` — the four-step working method
- `CONTACT` — phone number, WhatsApp link, location and availability

Preview images live in `public/shots/` (1200px WebP) and are referenced through `asset()`, so a
new screenshot only needs a file plus a `shot` entry.

## Scripts

```bash
npm run dev          # dev server
npm run build        # production build
npm run preview      # preview the build
npm run typecheck    # TypeScript only
npm run build:model  # regenerate public/models/atelier-core.glb
npm run shots        # recapture portfolio preview screenshots
```

## Deploy

### Vercel

`vercel.json` configures the Vite framework preset, `dist` output, SPA rewrites and long-lived
cache headers for `/assets`, `/shots` and `/models`.

```bash
npx vercel link      # link to the existing YDS project
npx vercel --prod
```

### GitHub Pages

Pages serves the repository's `gh-pages` branch. Build with the repository base path, then publish:

```bash
BASE_PATH=/digital-studio-website/ npm run build
# or simply:
bash scripts/deploy-pages.sh
```

Never edit `gh-pages` by hand — it is generated from `dist/`.

## Performance and accessibility

- The 3D canvas is lazy-loaded, `pointer-events: none` and rendered behind the DOM so it never
  blocks text selection, links or form inputs.
- `prefers-reduced-motion` removes the camera journey, shortens the hero and neutralises animation.
- Mobile disables glass transmission, antialiasing and extra panels, cuts particles to 220 and caps
  device pixel ratio.
- Device pixel ratio is capped (1.6 desktop / 1.3 mobile) and lowered automatically if frame times
  degrade.
- Previews are WebP and lazy-loaded below the fold; the canvas stops rendering off screen.
- Semantic landmarks, a "Skip to content" link, labelled form fields, visible focus states and
  ≥44px touch targets on interactive controls.

## Browser support

Chrome, Edge, Firefox and Safari (latest two versions, desktop and mobile). Browsers without WebGL
get a static gradient fallback in place of the scene while the full content remains readable.

## Credits

Design and code for Your Digital Studio. The three reference videos supplied during the brief were
used as creative direction only — no assets, layouts or characters from them are reproduced here.
All floating previews link to real studio work.

© Your Digital Studio — Hyderabad, India. Working globally.

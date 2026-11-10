# YOUR DIGITAL STUDIO — THE DIGITAL ATELIER

Cinematic 3D website for Your Digital Studio (YDS), an independent digital design and development
studio in Hyderabad, India. The site is built around a scroll-driven camera journey through a dark
floating atelier: a sculptural glass portal, metallic structures, translucent panels, real project
previews and luminous particles.

## Stack

- React 18 + TypeScript + Vite
- Three.js via @react-three/fiber and @react-three/drei
- GSAP ScrollTrigger + Lenis smooth scroll
- Framer Motion for section reveals, Tailwind CSS for layout

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build into dist/
npm run preview    # preview the production build
```

## Structure

```
src/
  App.tsx                 page composition + scene activation
  data.ts                 projects, services, tiers, process, contact details
  lib/
    scrollState.ts        single mutable scroll state read by the 3D scene
    smooth.ts             Lenis + ScrollTrigger wiring, scrollToEl helper
    sound.ts              procedural ambient pad (opt-in via the nav toggle)
    hooks.ts              media query / reduced motion / touch helpers
  components/
    Nav.tsx, Footer.tsx, ui.tsx
    scene/                Atelier canvas, camera paths, Portal (GLB sculpture),
                          Panels (real site previews), Atmosphere
    sections/             Hero, Marquee, About, Services, Portfolio,
                          Blueprint, Process, Pricing, Contact, FinalCTA
public/
  shots/                  12 optimised WebP previews of live studio work
  models/atelier-core.glb custom sculpture loaded inside the portal
scripts/
  build-model.mjs         regenerates the GLB (npm run build:model)
  capture-shots.mjs       refreshes the preview screenshots (npm run shots)
```

## The scroll journey

`Hero` (560vh desktop / 620vh mobile, pinned) scrubs `scrollState.main`, which the `CameraRig`
samples into a keyframed camera path. The portal aperture follows the same timeline, opening
between 28% and 70% of the hero so the glass membrane dissolves and the sculpture retreats as the
camera passes through. `FinalCTA` hands the scene over to a second path (`scrollState.final`) for
the closing shot.

The WebGL canvas stops rendering (`frameloop="never"`) whenever its sections are off screen, so
scrolling the content sections costs nothing.

## Accessibility / performance notes

- `prefers-reduced-motion` removes the 3D journey, shortens the hero and neutralises animation.
- Mobile drops the particle count, transmission materials, extra panels and antialiasing, and caps
  device pixel ratio.
- All previews are WebP at ~1200px and screenshots are lazy-loaded below the fold.

## Deploy

The project is a static Vite build. `vercel.json` sets the build/output plus long-lived caching for
`/assets`, `/shots` and `/models`.

```bash
npx vercel --prod        # link to the existing YDS Vercel project, then deploy
```

export interface Key {
  p: number;
  pos: [number, number, number];
  look: [number, number, number];
}

const smooth = (t: number) => t * t * (3 - 2 * t);
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function sample(keys: Key[], p: number, ease: (t: number) => number) {
  if (p <= keys[0].p) return keys[0];
  if (p >= keys[keys.length - 1].p) return keys[keys.length - 1];
  for (let i = 0; i < keys.length - 1; i++) {
    const a = keys[i];
    const b = keys[i + 1];
    if (p >= a.p && p <= b.p) {
      const t = ease((p - a.p) / (b.p - a.p));
      return {
        pos: [
          a.pos[0] + (b.pos[0] - a.pos[0]) * t,
          a.pos[1] + (b.pos[1] - a.pos[1]) * t,
          a.pos[2] + (b.pos[2] - a.pos[2]) * t,
        ] as [number, number, number],
        look: [
          a.look[0] + (b.look[0] - a.look[0]) * t,
          a.look[1] + (b.look[1] - a.look[1]) * t,
          a.look[2] + (b.look[2] - a.look[2]) * t,
        ] as [number, number, number],
      };
    }
  }
  return keys[keys.length - 1];
}

// Establishing → approach → portal reveal → through the aperture → project reveal
export const MAIN_PATH: Key[] = [
  { p: 0.0, pos: [1.1, 1.55, 9.6], look: [0, 0.55, 0] },
  { p: 0.2, pos: [2.0, 1.35, 7.1], look: [0, 0.6, 0] },
  { p: 0.42, pos: [0.9, 1.15, 4.6], look: [0, 0.85, 0] },
  { p: 0.6, pos: [0.15, 1.05, 2.7], look: [0, 1.0, -0.4] },
  { p: 0.78, pos: [0, 1.1, 0.9], look: [0, 1.1, -4] },
  { p: 0.9, pos: [0, 1.3, -2.4], look: [0, 1.1, -8] },
  { p: 1.0, pos: [0, 1.6, -5.4], look: [0, 1.0, -13] },
];

// Final section: camera drifts backward out of the atelier while the portal closes.
export const FINAL_PATH: Key[] = [
  { p: 0.0, pos: [0, 1.6, -4.2], look: [0, 1.1, 0] },
  { p: 0.45, pos: [0.4, 1.7, 2.2], look: [0, 1.1, 0] },
  { p: 1.0, pos: [0.2, 2.6, 10.5], look: [0, 1.15, 0] },
];

export function sampleMain(p: number) {
  return sample(MAIN_PATH, p, easeInOut);
}
export function sampleFinal(p: number) {
  return sample(FINAL_PATH, p, smooth);
}

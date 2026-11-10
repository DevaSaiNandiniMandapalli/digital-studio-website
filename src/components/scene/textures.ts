import * as THREE from 'three';

let glow: THREE.Texture | null = null;

export function glowTexture(): THREE.Texture {
  if (glow) return glow;
  const size = 256;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d')!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, 'rgba(190,245,140,0.95)');
  g.addColorStop(0.28, 'rgba(140,220,150,0.55)');
  g.addColorStop(0.55, 'rgba(80,170,220,0.22)');
  g.addColorStop(1, 'rgba(8,11,18,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  glow = new THREE.CanvasTexture(c);
  glow.colorSpace = THREE.SRGBColorSpace;
  return glow;
}

let soft: THREE.Texture | null = null;

export function softDotTexture(): THREE.Texture {
  if (soft) return soft;
  const size = 64;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d')!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.4, 'rgba(210,240,255,0.55)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  soft = new THREE.CanvasTexture(c);
  return soft;
}

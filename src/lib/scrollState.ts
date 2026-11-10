// Shared, mutable state read by the 3D scene every frame.
// Kept outside React state to avoid re-renders on scroll.
export const scrollState = {
  main: 0, // 0..1 progress through the cinematic hero sequence
  final: 0, // 0..1 progress through the closing cinematic section
  phase: 'main' as 'main' | 'final',
  visible: true, // 3D canvas on screen
  pointer: { x: 0, y: 0 },
  opening: 0, // 0..1 portal aperture
};

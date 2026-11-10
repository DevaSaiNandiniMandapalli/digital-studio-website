import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { scrollState } from '../../lib/scrollState';

interface PanelDef {
  src: string;
  position: [number, number, number];
  rotation: [number, number, number];
  size: number;
  floatSpeed: number;
  phase: number;
}

const DESKTOP_PANELS: PanelDef[] = [
  { src: '/shots/kasoori.webp', position: [-3.2, 1.95, 1.4], rotation: [0.02, 0.55, 0.03], size: 2.05, floatSpeed: 0.55, phase: 0 },
  { src: '/shots/grand-4-seasons.webp', position: [3.25, 1.35, 1.1], rotation: [0.02, -0.55, -0.03], size: 2.0, floatSpeed: 0.48, phase: 1.7 },
  { src: '/shots/joyess-lifestyle.webp', position: [0.8, 0.08, 2.55], rotation: [0.03, -0.08, 0.012], size: 1.55, floatSpeed: 0.6, phase: 3.1 },
];

const MOBILE_PANELS: PanelDef[] = [
  { src: '/shots/kasoori.webp', position: [0.9, 1.9, 2.0], rotation: [0.02, -0.35, 0.02], size: 1.5, floatSpeed: 0.5, phase: 0 },
];

function Panel({ def }: { def: PanelDef }) {
  const tex = useTexture(def.src);
  const group = useRef<THREE.Group>(null!);
  const h = def.size * 0.68;

  const frameMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#1c2734', metalness: 0.9, roughness: 0.35 }),
    [],
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (!group.current) return;
    group.current.position.y = def.position[1] + Math.sin(t * def.floatSpeed + def.phase) * 0.09;
    group.current.rotation.z = def.rotation[2] + Math.sin(t * def.floatSpeed * 0.7 + def.phase) * 0.015;
    // panels drift gently toward the camera lane as the portal opens
    const push = scrollState.main * 0.5;
    group.current.position.z = def.position[2] + push;
  });

  return (
    <group ref={group} position={def.position} rotation={def.rotation}>
      {/* frame */}
      <mesh material={frameMat} position={[0, 0, -0.02]}>
        <boxGeometry args={[def.size + 0.09, h + 0.09, 0.04]} />
      </mesh>
      {/* screen */}
      <mesh>
        <planeGeometry args={[def.size, h]} />
        <meshBasicMaterial map={tex} toneMapped={false} />
      </mesh>
      {/* edge glow */}
      <mesh position={[0, 0, 0.021]}>
        <planeGeometry args={[def.size + 0.02, h + 0.02]} />
        <meshBasicMaterial color="#72c9ff" transparent opacity={0.06} blending={THREE.AdditiveBlending} />
      </mesh>
      {/* little stand/base light */}
      <mesh position={[0, -h / 2 - 0.12, 0]}>
        <boxGeometry args={[def.size * 0.34, 0.012, 0.012]} />
        <meshBasicMaterial color="#b7f45a" transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

export function Panels({ mobile }: { mobile: boolean }) {
  const list = mobile ? MOBILE_PANELS : DESKTOP_PANELS;
  return (
    <group>
      {list.map((def) => (
        <Panel key={def.src} def={def} />
      ))}
    </group>
  );
}

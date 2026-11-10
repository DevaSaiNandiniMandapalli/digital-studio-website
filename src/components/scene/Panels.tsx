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
  drift: number;
}

const DESKTOP_PANELS: PanelDef[] = [
  { src: '/shots/kasoori.webp', position: [-3.2, 1.95, 1.4], rotation: [0.02, 0.55, 0.03], size: 2.05, floatSpeed: 0.55, phase: 0, drift: 0.9 },
  { src: '/shots/grand-4-seasons.webp', position: [3.25, 1.35, 1.1], rotation: [0.02, -0.55, -0.03], size: 2.0, floatSpeed: 0.48, phase: 1.7, drift: 1.15 },
  { src: '/shots/joyess-lifestyle.webp', position: [0.8, 0.08, 2.55], rotation: [0.03, -0.08, 0.012], size: 1.55, floatSpeed: 0.6, phase: 3.1, drift: 0.6 },
];

const MOBILE_PANELS: PanelDef[] = [
  { src: '/shots/kasoori.webp', position: [0.9, 1.9, 2.0], rotation: [0.02, -0.35, 0.02], size: 1.5, floatSpeed: 0.5, phase: 0, drift: 0.8 },
];

function Panel({ def }: { def: PanelDef }) {
  const tex = useTexture(def.src);
  const group = useRef<THREE.Group>(null!);
  const screen = useRef<THREE.MeshBasicMaterial>(null!);
  const h = def.size * 0.66;

  const frameMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#1c2734', metalness: 0.9, roughness: 0.35 }),
    [],
  );

  useMemo(() => {
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.needsUpdate = true;
  }, [tex]);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    const s = scrollState.main;
    const base = def.position;

    group.current.position.x = base[0] + Math.sin(t * 0.18 + def.phase) * 0.035 + s * def.drift * 0.45;
    group.current.position.y = base[1] + Math.sin(t * def.floatSpeed + def.phase) * 0.06 - s * 0.18;
    group.current.position.z = base[2] + s * (0.9 + def.drift * 0.7);

    group.current.rotation.y = def.rotation[1] + Math.sin(t * 0.16 + def.phase) * 0.025 + s * def.drift * 0.12;
    group.current.rotation.x = def.rotation[0] + Math.sin(t * 0.18 + def.phase * 1.4) * 0.02;
    group.current.rotation.z = def.rotation[2] + Math.sin(t * def.floatSpeed * 0.7 + def.phase) * 0.012;

    if (screen.current) {
      screen.current.opacity = Math.max(0, Math.min(1, 1.35 - s * 1.9));
    }
  });

  return (
    <group ref={group} position={def.position} rotation={def.rotation}>
      <mesh material={frameMat} position={[0, 0, -0.05]}>
        <boxGeometry args={[def.size + 0.09, h + 0.09, 0.06]} />
      </mesh>
      <mesh position={[0, 0, 0.002]}>
        <planeGeometry args={[def.size, h]} />
        <meshBasicMaterial ref={screen} map={tex} toneMapped={false} transparent />
      </mesh>
      <mesh position={[0, -h / 2 - 0.09, 0.002]}>
        <planeGeometry args={[def.size * 0.34, 0.01]} />
        <meshBasicMaterial color="#b7f45a" transparent opacity={0.45} />
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

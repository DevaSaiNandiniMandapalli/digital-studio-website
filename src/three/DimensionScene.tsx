import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Environment, Float, Lightformer, RoundedBox, useTexture } from '@react-three/drei';
import * as THREE from 'three';

const SCREEN_SHOTS = [
  '/projects/kasoori.jpg',
  '/projects/joyess-lifestyle.jpg',
  '/projects/fluids-store.jpg',
];

function Screenshot({ url, width, height }: { url: string; width: number; height: number }) {
  const texture = useTexture(url);
  return (
    <mesh>
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
}

function Architecture({ compact = false }: { compact?: boolean }) {
  const panels = useMemo(
    () =>
      Array.from({ length: compact ? 5 : 9 }, (_, i) => {
        const t = compact ? (i - 2) / 2 : (i - 4) / 4;
        return {
          key: i,
          x: t * 3.4,
          y: 0.2 + Math.cos(t * 1.1) * 0.55,
          h: 5.2 + Math.abs(t) * -1.2,
          rot: -t * 0.42,
          z: -2.6 - Math.abs(t) * 0.7,
        };
      }),
    [compact],
  );

  return (
    <group position={[0.2, 0, 0]}>
      {panels.map((p) => (
        <mesh key={p.key} position={[p.x, p.y, p.z]} rotation={[0, p.rot, 0]}>
          <boxGeometry args={[0.82, p.h, 0.09]} />
          <meshPhysicalMaterial
            color="#123055"
            metalness={0.85}
            roughness={0.14}
            transparent
            opacity={0.42}
            envMapIntensity={1.4}
          />
        </mesh>
      ))}
      <mesh position={[0.2, -1.9, -2.2]} rotation={[0, 0, 0]}>
        <boxGeometry args={[7.6, 0.06, 0.06]} />
        <meshStandardMaterial color="#38d5ff" emissive="#38d5ff" emissiveIntensity={1.6} />
      </mesh>
      <mesh position={[0.2, 2.7, -2.6]} rotation={[0, 0, 0]}>
        <boxGeometry args={[7.2, 0.03, 0.03]} />
        <meshStandardMaterial color="#247bff" emissive="#247bff" emissiveIntensity={0.7} />
      </mesh>
    </group>
  );
}

function Laptop() {
  return (
    <group position={[-0.1, -0.35, 0.35]} rotation={[0.02, -0.06, 0]}>
      <RoundedBox args={[3.15, 0.1, 2.02]} radius={0.045} smoothness={3} position={[0, -0.98, 0]}>
        <meshStandardMaterial color="#0e1c2f" metalness={0.75} roughness={0.32} />
      </RoundedBox>
      <mesh position={[0, -1.02, 0]}>
        <boxGeometry args={[2.9, 0.012, 1.6]} />
        <meshStandardMaterial color="#050b16" metalness={0.5} roughness={0.5} />
      </mesh>

      <group position={[0, -0.92, -1.0]} rotation={[-0.24, 0, 0]}>
        <RoundedBox args={[3.15, 2.02, 0.09]} radius={0.05} smoothness={3} position={[0, 1.0, -0.05]}>
          <meshStandardMaterial color="#0b1728" metalness={0.8} roughness={0.28} />
        </RoundedBox>
        <group position={[0, 1.0, 0.06]}>
          <Screenshot url={SCREEN_SHOTS[0]} width={2.92} height={1.82} />
        </group>
      </group>
      <mesh position={[0, -0.94, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.6, 3.2]} />
        <meshBasicMaterial color="#38d5ff" transparent opacity={0.05} />
      </mesh>
    </group>
  );
}

function Phone({ z = 1.5, x = 0.95, y = -0.1, scale = 1 }: { z?: number; x?: number; y?: number; scale?: number }) {
  return (
    <group position={[x, y, z]} rotation={[0.06, -0.3, 0.04]} scale={scale}>
      <RoundedBox args={[0.92, 1.86, 0.075]} radius={0.1} smoothness={4}>
        <meshStandardMaterial color="#0d1a2d" metalness={0.9} roughness={0.2} />
      </RoundedBox>
      <group position={[0, 0, 0.045]}>
        <Screenshot url={SCREEN_SHOTS[1]} width={0.82} height={1.7} />
      </group>
      <mesh position={[0, 0.78, 0.05]}>
        <planeGeometry args={[0.2, 0.03]} />
        <meshBasicMaterial color="#050b16" />
      </mesh>
    </group>
  );
}

function LayeredScreens() {
  const shots = useMemo(
    () => [
      { url: SCREEN_SHOTS[2], x: -1.9, y: 0.42, z: 1.15, w: 1.35, rot: 0.26 },
      { url: SCREEN_SHOTS[1], x: 1.72, y: 0.78, z: -0.15, w: 1.15, rot: -0.3 },
    ],
    [],
  );
  return (
    <>
      {shots.map((s) => (
        <Float key={s.url} speed={1.2} rotationIntensity={0.12} floatIntensity={0.5}>
          <group position={[s.x, s.y, s.z]} rotation={[0.04, s.rot, 0.02]}>
            <RoundedBox args={[s.w + 0.07, s.w * 0.63 + 0.12, 0.045]} radius={0.03} smoothness={3}>
              <meshStandardMaterial color="#0e1d31" metalness={0.7} roughness={0.3} transparent opacity={0.92} />
            </RoundedBox>
            <group position={[0, 0.012, 0.03]}>
              <Screenshot url={s.url} width={s.w} height={s.w * 0.63} />
            </group>
            <mesh position={[0, -(s.w * 0.63) / 2 - 0.045, 0.03]}>
              <planeGeometry args={[s.w, 0.012]} />
              <meshBasicMaterial color="#38d5ff" transparent opacity={0.5} />
            </mesh>
          </group>
        </Float>
      ))}
    </>
  );
}

function Chips() {
  const chips = useMemo(
    () => [
      { x: -1.55, y: -1.15, z: 1.9, w: 1.0, h: 0.3 },
      { x: 1.5, y: -1.35, z: 1.25, w: 1.15, h: 0.32 },
    ],
    [],
  );
  return (
    <>
      {chips.map((c, i) => (
        <Float key={i} speed={1.5 + i * 0.2} rotationIntensity={0.08} floatIntensity={0.45}>
          <mesh position={[c.x, c.y, c.z]}>
            <planeGeometry args={[c.w, c.h]} />
            <meshPhysicalMaterial
              color="#0f243c"
              metalness={0.3}
              roughness={0.2}
              transparent
              opacity={0.55}
              transmission={0.4}
              thickness={0.3}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

function Rig({ reduced, compact }: { reduced: boolean; compact: boolean }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (!group.current || reduced) return;
    const targetY = state.pointer.x * 0.16;
    const targetX = state.pointer.y * -0.1;
    group.current.rotation.y += (targetY - group.current.rotation.y) * Math.min(1, delta * 2.2);
    group.current.rotation.x += (targetX - group.current.rotation.x) * Math.min(1, delta * 2.2);
  });

  return (
    <group ref={group}>
      <Architecture compact={compact} />
      <Laptop />
      <Phone />
      <LayeredScreens />
      <Chips />
      {!compact && (
        <ContactShadows position={[0.2, -1.85, 0]} opacity={0.55} scale={11} blur={2.8} far={4.4} color="#02101f" />
      )}
    </group>
  );
}

export type DimensionSceneProps = { reduced?: boolean; compact?: boolean };

export default function DimensionScene({ reduced = false, compact = false }: DimensionSceneProps) {
  return (
    <Canvas
      dpr={compact ? 1 : [1, 1.6]}
      camera={{ position: [0, 0.15, compact ? 9.4 : 7.9], fov: compact ? 38 : 34 }}
      gl={{ antialias: !compact, alpha: true, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => gl.setClearColor(new THREE.Color('#050b16'), 0)}
      style={{ position: 'absolute', inset: 0 }}
    >
      <fog attach="fog" args={['#050b16', 8, 20]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 5]} intensity={1.5} color="#bfe4ff" />
      <pointLight position={[-5, 2, 4]} intensity={26} color="#247bff" distance={16} />
      <pointLight position={[4.5, -2, 3]} intensity={18} color="#38d5ff" distance={14} />

      <Suspense fallback={null}>
        <Environment resolution={64}>
          <Lightformer intensity={2.4} position={[0, 5, -4]} scale={[8, 4, 1]} color="#7fb2ff" />
          <Lightformer intensity={1.6} position={[-5, 1, 2]} scale={[3, 5, 1]} color="#38d5ff" />
          <Lightformer intensity={1.2} position={[5, 0, 2]} scale={[3, 4, 1]} color="#247bff" />
        </Environment>
        <Rig reduced={reduced} compact={compact} />
      </Suspense>
    </Canvas>
  );
}

import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { MeshReflectorMaterial } from '@react-three/drei';
import { softDotTexture } from './textures';

export function Particles({ count = 520 }: { count?: number }) {
  const points = useRef<THREE.Points>(null!);
  const tex = useMemo(() => softDotTexture(), []);

  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 22;
      positions[i * 3 + 1] = Math.random() * 9 - 1.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 16 - 2;
      speeds[i] = 0.12 + Math.random() * 0.4;
    }
    return { positions, speeds };
  }, [count]);

  useFrame((state, dt) => {
    if (!points.current) return;
    const arr = points.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += speeds[i] * dt * 0.35;
      if (arr[i * 3 + 1] > 8) arr[i * 3 + 1] = -1.5;
    }
    points.current.geometry.attributes.position.needsUpdate = true;
    points.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.04) * 0.1;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.055}
        map={tex}
        transparent
        opacity={0.75}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

export function Floor({ high }: { high: boolean }) {
  if (!high) {
    return (
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.6, 0]}>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color="#0a1018" metalness={0.6} roughness={0.5} />
      </mesh>
    );
  }
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.6, 0]}>
      <planeGeometry args={[60, 60]} />
      <MeshReflectorMaterial
        blur={[320, 90]}
        resolution={1024}
        mixBlur={0.9}
        mixStrength={26}
        roughness={0.9}
        depthScale={1.1}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.2}
        color="#070b11"
        metalness={0.75}
        mirror={0.55}
      />
    </mesh>
  );
}

export function Structures({ high }: { high: boolean }) {
  const group = useRef<THREE.Group>(null!);
  useFrame((state) => {
    if (group.current) group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.05) * 0.05;
  });

  const slabs = useMemo(
    () =>
      Array.from({ length: high ? 10 : 5 }).map((_, i) => {
        const a = (i / (high ? 10 : 5)) * Math.PI * 2;
        const r = 5.2 + (i % 3) * 0.9;
        return {
          key: i,
          pos: [Math.cos(a) * r, 0.4 + (i % 4) * 0.85, Math.sin(a) * r - 1] as [number, number, number],
          rot: [0.1 * (i % 3), -a, 0.05 * (i % 2)] as [number, number, number],
          scale: [1.1 + (i % 3) * 0.4, 0.04, 0.5 + (i % 2) * 0.3] as [number, number, number],
        };
      }),
    [high],
  );

  return (
    <group ref={group}>
      {slabs.map((s) => (
        <mesh key={s.key} position={s.pos} rotation={s.rot}>
          <boxGeometry args={s.scale} />
          <meshStandardMaterial color="#8794a5" metalness={1} roughness={0.28} envMapIntensity={1.2} />
        </mesh>
      ))}
      {/* tall translucent glass fins */}
      {[-4.6, 4.6].map((x, i) => (
        <mesh key={i} position={[x, 1.4, -3.6]} rotation={[0, i === 0 ? 0.4 : -0.4, 0]}>
          <planeGeometry args={[2.4, 5.2]} />
          <meshPhysicalMaterial
            color="#9fd6e6"
            metalness={0}
            roughness={0.12}
            transmission={high ? 0.9 : 0}
            transparent
            opacity={0.16}
            thickness={0.6}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

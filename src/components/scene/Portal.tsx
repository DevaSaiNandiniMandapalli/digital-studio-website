import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { scrollState } from '../../lib/scrollState';
import { glowTexture } from './textures';
import { asset } from '../../lib/asset';

/**
 * Custom GLB sculpture that hovers in the aperture and retreats as it opens.
 */
function Sculpture() {
  const { scene } = useGLTF(asset('/models/atelier-core.glb'));
  const ref = useRef<THREE.Group>(null!);
  const model = useMemo(() => scene.clone(true), [scene]);

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    const open = scrollState.opening;
    if (!ref.current) return;
    ref.current.rotation.y += dt * (0.09 + open * 0.16);
    ref.current.rotation.x = Math.sin(t * 0.16) * 0.07;
    ref.current.position.z = THREE.MathUtils.lerp(0.62, -1.05, open);
    ref.current.scale.setScalar(THREE.MathUtils.lerp(0.5, 0.32, open));
  });

  return (
    <group ref={ref} position={[0, 0, 0.62]} scale={0.5}>
      <primitive object={model} />
    </group>
  );
}
useGLTF.preload(asset('/models/atelier-core.glb'));

/**
 * The sculptural glass portal at the centre of the Digital Atelier.
 * A metallic ring assembly, a dissolving glass membrane and an inner
 * light core that grows as the portal "opens" along the scroll timeline.
 */
export function Portal({ quality }: { quality: 'high' | 'low' }) {
  const group = useRef<THREE.Group>(null!);
  const membrane = useRef<THREE.Mesh>(null!);
  const core = useRef<THREE.Mesh>(null!);
  const beam = useRef<THREE.Mesh>(null!);
  const ringA = useRef<THREE.Mesh>(null!);
  const ringB = useRef<THREE.Mesh>(null!);

  const glowMap = useMemo(() => glowTexture(), []);
  const glassess = quality === 'high';

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    const open = scrollState.opening;

    if (group.current) {
      group.current.position.y = 1.25 + Math.sin(t * 0.28) * 0.022;
      group.current.rotation.z = Math.sin(t * 0.18) * 0.02;
    }
    if (ringA.current) ringA.current.rotation.z += dt * 0.06;
    if (ringB.current) ringB.current.rotation.z -= dt * 0.08;

    if (membrane.current) {
      const m = membrane.current.material as THREE.MeshPhysicalMaterial;
      m.opacity = THREE.MathUtils.lerp(m.opacity, THREE.MathUtils.lerp(0.5, 0.02, open), 0.08);
      m.roughness = 0.08;
    }
    if (core.current) {
      const m = core.current.material as THREE.MeshBasicMaterial;
      const s = THREE.MathUtils.lerp(0.25, 1.18, open);
      core.current.scale.setScalar(s);
      m.opacity = THREE.MathUtils.lerp(0.0, 0.95, Math.min(1, open * 1.4));
    }
    if (beam.current) {
      const m = beam.current.material as THREE.MeshBasicMaterial;
      m.opacity = THREE.MathUtils.lerp(0, 0.16, open);
    }
    // split the outer frame apart slightly as it opens
    const sep = THREE.MathUtils.lerp(0, 0.32, open);
    if (ringA.current) ringA.current.position.x = -sep;
    if (ringB.current) ringB.current.position.x = sep;
  });

  return (
    <group ref={group} position={[0, 1.25, 0]}>
      {/* Outer metallic frame — two halves that separate on open */}
      <mesh ref={ringA} position={[-0.0, 0, 0]}>
        <torusGeometry args={[2.24, 0.075, 20, 140, Math.PI]} />
        <meshStandardMaterial color="#c9d2dc" metalness={1} roughness={0.22} envMapIntensity={1.4} />
      </mesh>
      <mesh ref={ringB} position={[0.0, 0, 0]}>
        <torusGeometry args={[2.24, 0.075, 20, 140, Math.PI]} />
        <meshStandardMaterial color="#c9d2dc" metalness={1} roughness={0.22} envMapIntensity={1.4} />
      </mesh>

      {/* Inner thin accent ring, lime */}
      <mesh>
        <torusGeometry args={[2.02, 0.012, 8, 160]} />
        <meshBasicMaterial color="#b7f45a" transparent opacity={0.85} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[1.72, 0.006, 8, 120]} />
        <meshBasicMaterial color="#72c9ff" transparent opacity={0.5} />
      </mesh>

      {/* Concentric slow rings for depth */}
      <mesh rotation={[0, 0, 0.2]}>
        <torusGeometry args={[2.62, 0.008, 6, 160]} />
        <meshBasicMaterial color="#8fa6ff" transparent opacity={0.22} />
      </mesh>
      <mesh rotation={[0, 0, -0.4]}>
        <torusGeometry args={[2.95, 0.006, 6, 160]} />
        <meshBasicMaterial color="#a5adba" transparent opacity={0.16} />
      </mesh>

      {/* Glass membrane */}
      <mesh ref={membrane}>
        <circleGeometry args={[2.0, 96]} />
        {glassess ? (
          <meshPhysicalMaterial
            color="#cfe6ef"
            metalness={0}
            roughness={0.06}
            transmission={0.92}
            thickness={1.4}
            ior={1.45}
            clearcoat={1}
            clearcoatRoughness={0.08}
            transparent
            opacity={0.5}
            side={THREE.DoubleSide}
            envMapIntensity={1.6}
          />
        ) : (
          <meshStandardMaterial
            color="#9fd8e8"
            metalness={0.2}
            roughness={0.1}
            transparent
            opacity={0.28}
            side={THREE.DoubleSide}
          />
        )}
      </mesh>

      {/* Inner light core */}
      <mesh ref={core} position={[0, 0, -0.02]}>
        <circleGeometry args={[1.55, 64]} />
        <meshBasicMaterial
          map={glowMap}
          transparent
          opacity={0}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {/* Light beam through the aperture */}
      <mesh ref={beam} position={[0, 0, -1.4]} rotation={[0, 0, 0]}>
        <circleGeometry args={[1.35, 48]} />
        <meshBasicMaterial
          color="#b7f45a"
          transparent
          opacity={0}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {/* Small structural spokes */}
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[Math.cos(a) * 2.13, Math.sin(a) * 2.13, 0]}
            rotation={[0, 0, a]}
          >
            <boxGeometry args={[0.16, 0.02, 0.02]} />
            <meshStandardMaterial color="#9aa6b4" metalness={1} roughness={0.3} />
          </mesh>
        );
      })}

      <Sculpture />

      <pointLight color="#b7f45a" intensity={3.2} distance={9} position={[0, 0, 1.2]} />
      <pointLight color="#72c9ff" intensity={2.4} distance={10} position={[0, 0, -1.6]} />
    </group>
  );
}

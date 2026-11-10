import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

type Props = { reduce: boolean; compact: boolean };

function StudioEnvironment() {
  const gl = useThree((state) => state.gl);
  const scene = useThree((state) => state.scene);

  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const environment = pmrem.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = environment.texture;
    return () => {
      environment.dispose();
      pmrem.dispose();
    };
  }, [gl, scene]);

  return null;
}

function Knot({ reduce, compact }: Props) {
  const group = useRef<THREE.Group>(null);
  const shell = useRef<THREE.Mesh>(null);

  useFrame(({ clock, pointer }, delta) => {
    const g = group.current;
    if (!g) return;
    const t = clock.elapsedTime;

    if (!reduce) {
      g.rotation.y += delta * 0.22;
      g.rotation.z += (pointer.x * 0.45 - g.rotation.z) * 0.045;
      g.rotation.x = Math.sin(t * 0.32) * 0.22 + pointer.y * 0.12;
      g.position.y = Math.sin(t * 0.55) * 0.07;
      if (shell.current) shell.current.rotation.y -= delta * 0.12;
    }
  });

  return (
    <group ref={group}>
      <mesh>
        <torusKnotGeometry args={[0.86, compact ? 0.26 : 0.24, compact ? 140 : 260, compact ? 24 : 38, 2, 3]} />
        <meshPhysicalMaterial
          color="#efe7d8"
          metalness={1}
          roughness={0.16}
          clearcoat={1}
          clearcoatRoughness={0.08}
          envMapIntensity={1.35}
        />
      </mesh>

      <mesh ref={shell} rotation={[0.5, 0.2, 0]}>
        <torusGeometry args={[1.62, 0.006, 12, 160]} />
        <meshBasicMaterial color="#d6603a" transparent opacity={0.8} />
      </mesh>

      <pointLight position={[-2.4, 1.6, 2.2]} intensity={16} color="#d6603a" distance={9} decay={2} />
      <pointLight position={[2.6, -1.4, -1.6]} intensity={8} color="#8b9ea6" distance={9} decay={2} />
    </group>
  );
}

export default function SculptureCanvas({ reduce, compact }: Props) {
  return (
    <Canvas
      dpr={[1, compact ? 1.4 : 1.9]}
      camera={{ position: [0, 0, 4.1], fov: 34 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
      frameloop={reduce ? 'demand' : 'always'}
    >
      <StudioEnvironment />
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 4, 5]} intensity={1.1} color="#f2ede3" />
      <Knot reduce={reduce} compact={compact} />
    </Canvas>
  );
}

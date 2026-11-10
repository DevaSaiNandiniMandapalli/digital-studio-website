import { Suspense, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Lightformer, Preload, PerformanceMonitor } from '@react-three/drei';
import { scrollState } from '../../lib/scrollState';
import { sampleMain, sampleFinal } from './cameraPath';
import { Portal } from './Portal';
import { Panels } from './Panels';
import { Particles, Floor, Structures } from './Atmosphere';

function CameraRig({ mobile }: { mobile: boolean }) {
  const { camera } = useThree();
  const smoothPos = useRef(new THREE.Vector3(1.1, 1.55, 9.6));
  const targetPos = useRef(new THREE.Vector3(1.1, 1.55, 9.6));
  const targetLook = useRef(new THREE.Vector3(0, 0.55, 0));
  const smoothLook = useRef(new THREE.Vector3(0, 0.55, 0));

  useFrame((_, dt) => {
    const s = scrollState;
    const k = s.phase === 'main' ? sampleMain(s.main) : sampleFinal(s.final);
    targetPos.current.set(k.pos[0], k.pos[1], k.pos[2]);
    targetLook.current.set(k.look[0], k.look[1], k.look[2]);

    // aperture follows the timeline: opens on approach, closes in the finale
    const open =
      s.phase === 'main'
        ? THREE.MathUtils.smoothstep(s.main, 0.28, 0.7)
        : 1 - THREE.MathUtils.smoothstep(s.final, 0.2, 0.95);
    s.opening = THREE.MathUtils.lerp(s.opening, open, 0.06);

    const damp = 1 - Math.exp(-dt * (mobile ? 4.5 : 3.5));
    smoothPos.current.lerp(targetPos.current, damp);
    smoothLook.current.lerp(targetLook.current, damp * 1.1);

    const par = mobile ? 0 : 0.28;
    camera.position.set(
      smoothPos.current.x + s.pointer.x * par,
      smoothPos.current.y + s.pointer.y * par * 0.45,
      smoothPos.current.z,
    );
    camera.lookAt(smoothLook.current);
  });
  return null;
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.35} color="#8fa6ff" />
      <directionalLight position={[6, 8, 4]} intensity={2.5} color="#dce9ff" />
      <directionalLight position={[-7, 3, -2]} intensity={1.3} color="#b7f45a" />
      <pointLight position={[0, 2, 6]} intensity={2.8} color="#72c9ff" distance={16} />
      <spotLight position={[0, 7, 3]} angle={0.6} penumbra={1} intensity={3.4} color="#ffffff" distance={24} />
    </>
  );
}

function EnvRig() {
  return (
    <Environment resolution={384} frames={1}>
      <Lightformer intensity={2.4} color="#b7f45a" position={[3, 2, 4]} scale={[6, 6, 1]} />
      <Lightformer intensity={2.2} color="#72c9ff" position={[-4, 1, 3]} scale={[6, 6, 1]} />
      <Lightformer intensity={1.6} color="#ffffff" position={[0, 5, -2]} scale={[8, 3, 1]} />
      <Lightformer intensity={1.2} color="#8fa6ff" position={[0, -4, 2]} scale={[8, 4, 1]} />
    </Environment>
  );
}

function useWebGL() {
  const [ok] = useState(() => {
    try {
      const c = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
    } catch {
      return false;
    }
  });
  return ok;
}

export function Atelier({ mobile, active }: { mobile: boolean; active: boolean }) {
  const supported = useWebGL();
  const quality: 'high' | 'low' = mobile ? 'low' : 'high';
  const [dprMax, setDprMax] = useState(mobile ? 1.3 : 1.6);
  const dpr = useMemo<[number, number]>(() => [1, dprMax], [dprMax]);

  if (!supported) {
    return (
      <div className="absolute inset-0 grid place-items-center">
        <div className="h-[52vmin] w-[52vmin] rounded-full bg-[radial-gradient(circle,rgba(183,244,90,0.25),rgba(114,201,255,0.08),transparent_70%)] blur-xl" />
      </div>
    );
  }

  return (
    <Canvas
      dpr={dpr}
      frameloop={active ? 'always' : 'never'}
      gl={{ antialias: !mobile, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [1.1, 1.55, 9.6], fov: mobile ? 58 : 42, near: 0.1, far: 80 }}
      style={{ pointerEvents: 'none' }}
    >
      <color attach="background" args={['#080b12']} />
      <fog attach="fog" args={['#080b12', 10, 34]} />
      <PerformanceMonitor
        onDecline={() => setDprMax((d) => (d > 1 ? 1 : d))}
        flipflops={2}
        onFallback={() => setDprMax(1)}
      />
      <Suspense fallback={null}>
        <Lights />
        <EnvRig />
        <Portal quality={quality} />
        <Panels mobile={mobile} />
        <Structures high={!mobile} />
        <Particles count={mobile ? 220 : 560} />
        <Floor high={!mobile} />
        <Preload all />
      </Suspense>
      <CameraRig mobile={mobile} />
    </Canvas>
  );
}

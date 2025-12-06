/* eslint-disable react/no-unknown-property */
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";

function SpinningBox() {
  return (
    <mesh rotation={[0.3, 0.4, 0]}>
      <boxGeometry args={[1.2, 1.2, 1.2]} />
      <meshStandardMaterial color="#3b82f6" roughness={0.25} metalness={0.4} />
    </mesh>
  );
}

export function ThreeTeaser() {
  return (
    <div className="glass-panel relative overflow-hidden p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 via-emerald-500/5 to-transparent" />
      <div className="relative mb-2 flex items-center justify-between gap-2">
        <h3 className="text-lg font-semibold text-white">R3F listo</h3>
        <span className="rounded-full bg-sky-400/10 px-3 py-1 text-xs font-semibold text-sky-100">
          3D opcional
        </span>
      </div>
      <p className="mb-3 text-xs text-slate-200">
        Canvas encapsulado como island React. Usa <code>client:only=&quot;react&quot;</code> para evitar SSR.
      </p>
      <div className="h-56 overflow-hidden rounded-xl border border-white/10 bg-slate-900">
        <Canvas camera={{ position: [2.5, 2, 2.5], fov: 50 }}>
          <color attach="background" args={["#0b1224"]} />
          <ambientLight intensity={0.6} />
          <directionalLight position={[3, 3, 3]} intensity={0.9} />
          <Suspense fallback={null}>
            <SpinningBox />
          </Suspense>
          <OrbitControls enableDamping />
        </Canvas>
      </div>
    </div>
  );
}

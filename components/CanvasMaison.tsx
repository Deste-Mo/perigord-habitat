'use client';
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Loader } from '@react-three/drei';
import { SceneMaison } from '@/components/scene/SceneMaison';
import * as THREE from 'three';

function Chargement() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#374151" />
    </mesh>
  );
}

export function CanvasMaison() {
  return (
    <div className="w-full h-full">
      <Canvas
        shadows
        // FOV 55° (légèrement plus large que 60°) — donne plus de marge verticale
        // sur les écrans portrait sans déformer la vue desktop.
        // La position initiale et la cible sont recalculées dynamiquement par
        // SceneMaison selon le ratio du canvas via getPositionCameraExterieur().
        camera={{ fov: 55, near: 0.1, far: 200, position: [20, 16, 20] }}
        gl={{
          antialias: false,
          alpha: false,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 0.7,
        }}
        // Sur mobile, limiter à 1× le DPR pour économiser la mémoire GPU
        dpr={[1, typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : 1.5]}
        onCreated={({ gl }) => {
          gl.setClearColor('#000000', 1);
          gl.domElement.addEventListener('webglcontextlost', (e) => {
            e.preventDefault();
          }, false);
        }}
      >
        <Suspense fallback={<Chargement />}>
          <SceneMaison />
        </Suspense>
      </Canvas>
      <Loader />
    </div>
  );
}

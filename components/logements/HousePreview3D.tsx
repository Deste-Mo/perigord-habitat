'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Sky } from '@react-three/drei';
import * as THREE from 'three';
import { FournisseurScene } from '@/hooks/SceneProvider';
import { Sejour } from '@/components/scene/pieces/Sejour';
import { Cuisine } from '@/components/scene/pieces/Cuisine';
import { Chambre } from '@/components/scene/pieces/Chambre';
import { SalleDeBain } from '@/components/scene/pieces/SalleDeBain';
import { Couloir } from '@/components/scene/pieces/Couloir';
import { EclairagePrincipal } from '@/components/scene/eclairage/EclairagePrincipal';
import { StructureMaison } from '@/components/scene/structure/StructureMaison';
import { SolInterieur } from '@/components/scene/structure/SolInterieur';

// Vue intérieure de la maison complète — toutes les pièces visibles, sans toit
function HouseScene() {
  return (
    <>
      <EclairagePrincipal modeJourNuit="jour" />
      <Sky sunPosition={[100, 80, 50]} turbidity={4} rayleigh={0.5} />
      <Environment preset="apartment" />

      <OrbitControls
        target={[0, 1, 0]}
        enablePan={false}
        enableZoom={false}
        enableRotate={false}
        makeDefault
      />

      <SolInterieur />

      {/* Structure sans toit, vue intérieure */}
      <StructureMaison
        filDefer={false}
        masquerToit={true}
        pieceVisible="interieur"
      />

      {/* Toutes les pièces avec lumières */}
      <Sejour      lumiere={true} masquerPlafond={true} />
      <Cuisine     lumiere={true} masquerPlafond={true} />
      <Chambre     lumiere={true} masquerPlafond={true} />
      <SalleDeBain lumiere={true} masquerPlafond={true} />
      <Couloir     lumiere={true} masquerPlafond={true} />
    </>
  );
}

interface Props {
  className?: string;
}

export function HousePreview3D({ className = '' }: Props) {
  return (
    <div className={className}>
      <FournisseurScene>
        <Canvas
          shadows
          // Vue isométrique de dessus légèrement inclinée — coin avant-droit
          camera={{
            fov: 45,
            near: 0.1,
            far: 200,
            position: [18, 14, 18],
          }}
          onCreated={({ camera }) => {
            camera.lookAt(new THREE.Vector3(0, 1, 0));
          }}
          gl={{
            antialias: true,
            alpha: false,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.0,
            powerPreference: 'default',
          }}
          dpr={[1, 1.5]}
        >
          <Suspense fallback={null}>
            <HouseScene />
          </Suspense>
        </Canvas>
      </FournisseurScene>
    </div>
  );
}

'use client';
import React from 'react';
import { FournisseurScene } from '@/hooks/SceneProvider';
import { CanvasMaisonAvecMarkers } from '@/components/CanvasMaisonAvecMarkers';
import { InterfaceMaison } from '@/components/InterfaceMaison';

export default function Page() {
  return (
    <FournisseurScene>
      <div className="relative w-screen h-screen bg-gray-900 overflow-hidden">
        <CanvasMaisonAvecMarkers />
        <InterfaceMaison />
      </div>
    </FournisseurScene>
  );
}

'use client';
import { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { IdPiece } from '@/types/maison';

interface DroneControlsProps {
  enabled: boolean;
  speed?: number;
  rotationSpeed?: number;
  pieceActive: IdPiece | 'exterieur' | 'interieur';
  onChangePiece?: (piece: IdPiece) => void;
}

const LIMITES_PIECES: Record<string, { minX: number; maxX: number; minZ: number; maxZ: number }> = {
  sejour:      { minX: -5.875, maxX: 0.625,  minZ: -4.875, maxZ: 1.375 },
  cuisine:     { minX: 0.875,  maxX: 5.875,  minZ: -4.875, maxZ: 1.375 },
  chambre:     { minX: -5.875, maxX: 0.625,  minZ: 1.625,  maxZ: 4.875 },
  salleDeBain: { minX: 2.625,  maxX: 5.875,  minZ: 1.625,  maxZ: 4.875 },
  couloir:     { minX: 0.875,  maxX: 2.375,  minZ: 1.625,  maxZ: 4.875 },
};

const PORTES: Array<{
  piece1: IdPiece;
  piece2: IdPiece;
  position: { x: number; z: number };
  direction: 'x' | 'z';
  largeur: number;
}> = [
  { piece1: 'sejour', piece2: 'chambre', position: { x: -2.625, z: 1.5 }, direction: 'z', largeur: 0.85 },
  { piece1: 'cuisine', piece2: 'couloir', position: { x: 1.5, z: 1.5 }, direction: 'z', largeur: 0.85 },
  { piece1: 'chambre', piece2: 'couloir', position: { x: 0.75, z: 3.25 }, direction: 'x', largeur: 0.85 },
  { piece1: 'couloir', piece2: 'salleDeBain', position: { x: 2.5, z: 3.2 }, direction: 'x', largeur: 0.8 },
];

export function useDroneControls({
  enabled,
  speed = 0.06,
  rotationSpeed = 0.003,
  pieceActive,
  onChangePiece
}: DroneControlsProps) {
  const { camera, gl } = useThree();
  const moveState = useRef({ forward: false, backward: false, left: false, right: false });
  const velocity = useRef(new THREE.Vector3());
  const pieceActuelle = useRef<IdPiece | 'exterieur' | 'interieur'>(pieceActive);
  const estVerrouille = useRef(false);

  // Yaw (horizontal) and pitch (vertical) tracking — the core of a clean FPS camera
  const yaw = useRef(0);
  const pitch = useRef(0);
  const premiereFrame = useRef(true);

  useEffect(() => {
    pieceActuelle.current = pieceActive;
  }, [pieceActive]);

  // On enable: set Euler order to YXZ (yaw then pitch), flag first frame for init
  useEffect(() => {
    if (enabled) {
      camera.rotation.order = 'YXZ';
      camera.rotation.z = 0;
      premiereFrame.current = true;
    }
  }, [enabled, camera]);

  // Pointer lock
  useEffect(() => {
    if (!enabled) return;

    const canvas = gl.domElement;

    const onPointerLockChange = () => {
      estVerrouille.current = document.pointerLockElement === canvas;
    };

    const onCanvasClick = () => {
      if (document.pointerLockElement !== canvas) {
        canvas.requestPointerLock();
      }
    };

    document.addEventListener('pointerlockchange', onPointerLockChange);
    canvas.addEventListener('click', onCanvasClick);

    return () => {
      document.removeEventListener('pointerlockchange', onPointerLockChange);
      canvas.removeEventListener('click', onCanvasClick);
    };
  }, [enabled, gl]);

  // Keyboard + mouse
  useEffect(() => {
    if (!enabled) return;

    const onKeyDown = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'ArrowUp':    case 'KeyW': moveState.current.forward = true; break;
        case 'ArrowDown':  case 'KeyS': moveState.current.backward = true; break;
        case 'ArrowLeft':  case 'KeyA': moveState.current.left = true; break;
        case 'ArrowRight': case 'KeyD': moveState.current.right = true; break;
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'ArrowUp':    case 'KeyW': moveState.current.forward = false; break;
        case 'ArrowDown':  case 'KeyS': moveState.current.backward = false; break;
        case 'ArrowLeft':  case 'KeyA': moveState.current.left = false; break;
        case 'ArrowRight': case 'KeyD': moveState.current.right = false; break;
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!estVerrouille.current) return;

      yaw.current -= e.movementX * rotationSpeed;
      pitch.current -= e.movementY * rotationSpeed;
      pitch.current = Math.max(-Math.PI / 2 + 0.02, Math.min(Math.PI / 2 - 0.02, pitch.current));
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    document.addEventListener('mousemove', onMouseMove);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, [enabled, rotationSpeed]);

  useFrame(() => {
    if (!enabled) return;

    // First frame after enable: capture the camera's current orientation
    if (premiereFrame.current) {
      yaw.current = camera.rotation.y;
      pitch.current = camera.rotation.x;
      pitch.current = Math.max(-Math.PI / 2 + 0.02, Math.min(Math.PI / 2 - 0.02, pitch.current));
      camera.rotation.order = 'YXZ';
      camera.rotation.z = 0;
      premiereFrame.current = false;
    }

    // Apply yaw/pitch to camera every frame
    camera.rotation.order = 'YXZ';
    camera.rotation.y = yaw.current;
    camera.rotation.x = pitch.current;
    camera.rotation.z = 0;

    const piece = pieceActuelle.current;
    if (piece === 'exterieur' || piece === 'interieur') return;

    const limites = LIMITES_PIECES[piece];
    if (!limites) return;

    const state = moveState.current;

    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);
    direction.y = 0;
    direction.normalize();

    const right = new THREE.Vector3();
    right.crossVectors(direction, camera.up).normalize();

    velocity.current.set(0, 0, 0);

    if (state.forward)  velocity.current.add(direction.clone().multiplyScalar(speed));
    if (state.backward) velocity.current.add(direction.clone().multiplyScalar(-speed));
    if (state.left)     velocity.current.add(right.clone().multiplyScalar(-speed));
    if (state.right)    velocity.current.add(right.clone().multiplyScalar(speed));

    const nouvellePosition = camera.position.clone().add(velocity.current);
    nouvellePosition.y = 1.65;

    let porteTrouvee = false;
    let pieceDestination: IdPiece | null = null;

    for (const porte of PORTES) {
      if (porte.piece1 === piece || porte.piece2 === piece) {
        const distancePorte = Math.sqrt(
          Math.pow(nouvellePosition.x - porte.position.x, 2) +
          Math.pow(nouvellePosition.z - porte.position.z, 2)
        );
        if (distancePorte < 1.2) {
          porteTrouvee = true;
          const destination = porte.piece1 === piece ? porte.piece2 : porte.piece1;
          const limitesDestination = LIMITES_PIECES[destination];
          if (limitesDestination) {
            const dansDestination =
              nouvellePosition.x >= limitesDestination.minX &&
              nouvellePosition.x <= limitesDestination.maxX &&
              nouvellePosition.z >= limitesDestination.minZ &&
              nouvellePosition.z <= limitesDestination.maxZ;
            if (dansDestination) {
              pieceDestination = destination;
              break;
            }
          }
        }
      }
    }

    if (pieceDestination && onChangePiece) {
      onChangePiece(pieceDestination);
      pieceActuelle.current = pieceDestination;
      premiereFrame.current = true;
      camera.position.copy(nouvellePosition);
      return;
    }

    if (!porteTrouvee) {
      const marge = 0.3;
      nouvellePosition.x = Math.max(limites.minX + marge, Math.min(nouvellePosition.x, limites.maxX - marge));
      nouvellePosition.z = Math.max(limites.minZ + marge, Math.min(nouvellePosition.z, limites.maxZ - marge));
    }

    camera.position.copy(nouvellePosition);
  });

  return {
    moveState: moveState.current,
    estVerrouille: estVerrouille.current,
  };
}

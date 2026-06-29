'use client';
import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { OrbitControls, Sky, Stars, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { StructureMaison } from './structure/StructureMaison';
import { Garage } from './structure/Garage';
import { Immeuble } from './structure/Immeuble';
import { SolInterieur } from './structure/SolInterieur';
import { Sejour } from './pieces/Sejour';
import { Cuisine } from './pieces/Cuisine';
import { Chambre } from './pieces/Chambre';
import { SalleDeBain } from './pieces/SalleDeBain';
import { Couloir } from './pieces/Couloir';
import { CouloirEntree } from './pieces/CouloirEntree';
import { Terrain } from './terrain/Terrain';
import { EclairagePrincipal } from './eclairage/EclairagePrincipal';
import { useScene } from '@/hooks/useSceneStore';
import { PREREGLAGES_CAMERA, getClePrereglage, getPositionCameraExterieur, getPositionOrbitePiece, CENTRES_PIECES, getPrereglageVisite } from '@/hooks/useCamera';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { useDroneControls } from '@/hooks/useDroneControls';
import { PostEffets } from './PostEffets';

export function SceneMaison() {
  const { modeCamera, pieceActive, modeJourNuit, lumieres, afficherFilDefer, sensibiliteCamera, setPieceActive } = useScene();
  const { camera, gl, controls, size } = useThree();
  const modeCameraRef = useRef(modeCamera);
  modeCameraRef.current = modeCamera;

  // Activer les contrôles drone uniquement en mode visite ET dans une pièce spécifique
  const estModeVisite = modeCamera === 'visite';
  const pieceSpecifique = pieceActive !== 'exterieur' && pieceActive !== 'interieur';
  const droneActif = estModeVisite && pieceSpecifique;
  
  useDroneControls({ 
    enabled: droneActif, 
    speed: 0.06,
    rotationSpeed: 0.003 * sensibiliteCamera,
    pieceActive,
    onChangePiece: setPieceActive
  });

  // ── Repositionnement caméra responsive ────────────────────────────────────
  // Recalcule la position initiale de la vue extérieure selon le ratio du canvas.
  // Se déclenche au mount ET à chaque rotation d'appareil / resize de fenêtre.
  // N'intervient que si l'utilisateur est en vue extérieure (n'écrase pas les
  // positions de pièce ou une navigation en cours).
  useEffect(() => {
    if (pieceActive !== 'exterieur') return;
    if (modeCameraRef.current === 'visite') return;

    const ratio = size.width / size.height;
    const { pos, cible } = getPositionCameraExterieur(ratio);

    camera.position.copy(pos);
    camera.lookAt(cible);
    camera.updateMatrixWorld();

    // Synchroniser OrbitControls avec la nouvelle cible
    const orbitControls = controls as OrbitControlsImpl | null;
    if (orbitControls) {
      orbitControls.target.copy(cible);
      orbitControls.update();
    }
  // size.width / size.height changent à chaque resize via useThree()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size.width, size.height, pieceActive]);

  // Exposition jour/nuit
  useEffect(() => {
    gl.toneMappingExposure = modeJourNuit === 'jour' ? 1.0 : 0.4;
  }, [gl, modeJourNuit]);

  // Transition caméra fluide avec rotation - synchronisée avec OrbitControls
  useEffect(() => {
    const estVisite = modeCameraRef.current === 'visite';
    const cle = getClePrereglage(pieceActive, modeCameraRef.current);
    const prereglage = PREREGLAGES_CAMERA[cle];
    
    if (!prereglage) {
      console.warn(`Préréglage caméra non trouvé: ${cle}`);
      return;
    }
    
    const posDepart = camera.position.clone();

    // ── Position et cible finales adaptées au ratio pour le mode orbite de pièce ─
    const estPieceSpecifique = pieceActive !== 'exterieur' && pieceActive !== 'interieur';
    const ratio = size.width / size.height;
    const centrePiece = estPieceSpecifique ? CENTRES_PIECES[pieceActive] : null;
    const estMobileOrbite = !estVisite && estPieceSpecifique && ratio < 1.2 && centrePiece;

    // Sur mobile orbite : pointer vers le vrai centre de la pièce (pas la position FPS)
    const cibleFin = estMobileOrbite
      ? centrePiece!.clone()
      : prereglage.cible.clone();

    let posFin: THREE.Vector3;
    if (estMobileOrbite) {
      posFin = getPositionOrbitePiece(centrePiece!, ratio);
    } else {
      posFin = prereglage.pos.clone();
    }    
    // En mode visite (FPS), snap immédiat — pas d'animation
    if (estVisite) {
      // Sur mobile portrait, utiliser la position centrale de la pièce
      // pour éviter d'être collé au mur dès l'entrée en mode visite
      const ratioActuel = size.width / size.height;
      const prereglageVisite = getPrereglageVisite(pieceActive, ratioActuel);
      const posFPS  = prereglageVisite ? prereglageVisite.pos   : posFin;
      const cibleFPS = prereglageVisite ? prereglageVisite.cible : cibleFin;

      camera.position.copy(posFPS);
      camera.rotation.order = 'YXZ';
      camera.lookAt(cibleFPS);
      camera.rotation.z = 0;
      camera.updateMatrixWorld();
      return;
    }

    // Si on est déjà à la bonne position (changement de mode dans la même pièce), ne pas animer
    const distance = posDepart.distanceTo(posFin);
    if (distance < 0.1) {
      // Même si on ne bouge pas, s'assurer que la cible est correcte
      const orbitControls = controls as OrbitControlsImpl | null;
      if (orbitControls) {
        orbitControls.target.copy(cibleFin);
        orbitControls.update();
      }
      return;
    }
    
    // Désactiver OrbitControls pendant l'animation pour éviter les conflits
    const orbitControls = controls as OrbitControlsImpl | null;
    if (orbitControls) {
      orbitControls.enabled = false;
    }
    
    // Calculer la rotation de départ et de fin
    const directionDepart = new THREE.Vector3();
    camera.getWorldDirection(directionDepart);
    
    const directionFin = new THREE.Vector3().subVectors(cibleFin, posFin).normalize();
    
    let t = 0;
    let raf: number;
    let timeoutId: NodeJS.Timeout;
    
    const animer = () => {
      t = Math.min(t + 0.04, 1); // Animation fluide
      const ease = 1 - Math.pow(1 - t, 3); // Easing out cubic
      
      // Animer la position
      camera.position.lerpVectors(posDepart, posFin, ease);
      
      // Animer la direction du regard
      const directionActuelle = new THREE.Vector3().lerpVectors(directionDepart, directionFin, ease);
      const cibleActuelle = new THREE.Vector3().addVectors(camera.position, directionActuelle);
      camera.lookAt(cibleActuelle);
      
      // Synchroniser la cible d'OrbitControls pendant l'animation
      if (orbitControls) {
        orbitControls.target.copy(cibleActuelle);
        orbitControls.update();
      }
      
      if (t < 1) {
        raf = requestAnimationFrame(animer);
      } else {
        // À la fin de l'animation, forcer la position et rotation finales EXACTES
        camera.position.copy(posFin);
        camera.lookAt(cibleFin);
        camera.updateMatrixWorld();
        
        // Réactiver OrbitControls avec un petit délai pour laisser la caméra se stabiliser
        if (orbitControls) {
          orbitControls.target.copy(cibleFin);
          orbitControls.update();
          
          // Petit délai avant de réactiver pour que la position finale soit bien fixée
          timeoutId = setTimeout(() => {
            orbitControls.enabled = true;
          }, 50);
        }
      }
    };
    
    raf = requestAnimationFrame(animer);
    return () => {
      cancelAnimationFrame(raf);
      if (timeoutId) clearTimeout(timeoutId);
      // S'assurer que OrbitControls est réactivé en cas de nettoyage
      if (orbitControls) {
        orbitControls.enabled = true;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pieceActive, camera, controls]);

  const pieceOuverte = pieceActive !== 'exterieur';
  const filDefer     = afficherFilDefer;
  
  // Cible pour OrbitControls - utiliser la cible correspondant au préréglage
  // En vue extérieure, la cible dépend du ratio pour rester centrée sur la scène complète
  const cle = getClePrereglage(pieceActive, modeCamera);
  const prereglage = PREREGLAGES_CAMERA[cle];

  let cibleOrbite: [number, number, number];
  if (pieceActive === 'exterieur') {
    const ratio = size.width / size.height;
    const { cible } = getPositionCameraExterieur(ratio);
    cibleOrbite = [cible.x, cible.y, cible.z];
  } else if (pieceSpecifique && CENTRES_PIECES[pieceActive]) {
    // Pour les pièces, utiliser le centre réel comme cible — pas la position FPS
    const c = CENTRES_PIECES[pieceActive];
    cibleOrbite = [c.x, c.y, c.z];
  } else {
    cibleOrbite = prereglage
      ? [prereglage.cible.x, prereglage.cible.y, prereglage.cible.z]
      : [0, 2, 0];
  }

  // maxDistance adapté : sur mobile (portrait) la caméra est déjà plus loin, on
  // autorise un zoom-out plus généreux pour que l'utilisateur puisse explorer.
  const estMobile = size.width < 768;
  const maxDistanceExterieur = estMobile ? 90 : 50;

  // Limites OrbitControls pour les pièces — adaptées au ratio
  // Desktop : [1.5, 4.5] → vue rapprochée immersive
  // Mobile portrait : [4, 20] → assez de recul pour voir toute la pièce (~5m×5m)
  // Tablette : [3, 12]
  const ratio = size.width / size.height;
  const minDistancePiece = ratio < 0.7 ? 4.0 : ratio < 1.2 ? 3.0 : 1.5;
  const maxDistancePiece = ratio < 0.7 ? 22  : ratio < 1.2 ? 14  : 4.5;

  return (
    <>
      <PostEffets />
      <EclairagePrincipal modeJourNuit={modeJourNuit} />
      {modeJourNuit === 'jour'
        ? <Sky sunPosition={[100, 80, 50]} turbidity={4} rayleigh={0.5} />
        : <Stars radius={80} depth={50} count={3000} factor={4} />
      }
      <Environment preset={modeJourNuit === 'nuit' ? 'night' : 'apartment'} />

      {/* OrbitControls désactivé en mode visite dans une pièce (contrôles drone actifs) */}
      {!droneActif && (
        <OrbitControls
          key={`${pieceActive}-${modeCamera}`}
          target={cibleOrbite}
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={pieceSpecifique ? minDistancePiece : 5}
          maxDistance={pieceSpecifique ? maxDistancePiece : maxDistanceExterieur}
          minPolarAngle={pieceSpecifique ? Math.PI * 0.25 : 0}
          maxPolarAngle={pieceSpecifique ? Math.PI * 0.75 : Math.PI * 0.49}
          rotateSpeed={sensibiliteCamera}
          zoomSpeed={1.0}
          makeDefault
        />
      )}

      {!pieceOuverte && <Terrain />}
      {pieceOuverte && <SolInterieur />}
      <StructureMaison filDefer={filDefer} masquerToit={pieceOuverte} pieceVisible={pieceActive} />

      {/* ── Garage accolé à droite de la maison (visible uniquement en vue extérieure) ── */}
      {!pieceOuverte && (
        <Garage filDefer={filDefer} />
      )}
      
      {/* ── Immeuble à gauche (visible uniquement en vue extérieure) ── */}
      {!pieceOuverte && (
        <Immeuble filDefer={filDefer} />
      )}
      
      {/* Pièces intérieures — uniquement quand on est à l'intérieur ou en mode drone */}
      {(pieceActive === 'interieur' || droneActif || pieceActive === 'sejour') && (
        <Sejour lumiere={lumieres.sejour} filDefer={filDefer} masquerPlafond={pieceOuverte || droneActif} />
      )}
      {(pieceActive === 'interieur' || droneActif || pieceActive === 'cuisine') && (
        <Cuisine lumiere={lumieres.cuisine} filDefer={filDefer} masquerPlafond={pieceOuverte || droneActif} />
      )}
      {(pieceActive === 'interieur' || droneActif || pieceActive === 'chambre') && (
        <Chambre lumiere={lumieres.chambre} filDefer={filDefer} masquerPlafond={pieceOuverte || droneActif} />
      )}
      {(pieceActive === 'interieur' || droneActif || pieceActive === 'salleDeBain') && (
        <SalleDeBain lumiere={lumieres.salleDeBain} filDefer={filDefer} masquerPlafond={pieceOuverte || droneActif} />
      )}
      {(pieceActive === 'interieur' || droneActif || pieceActive === 'couloir') && (
        <Couloir lumiere={lumieres.couloir} filDefer={filDefer} masquerPlafond={pieceOuverte || droneActif} />
      )}
      {/* Couloir d'entrée — entre séjour (X<-1.8) et cuisine (X>0.75) */}
      {(pieceActive === 'interieur' || droneActif || pieceActive === 'sejour' || pieceActive === 'cuisine' || pieceActive === 'couloirEntree') && (
        <CouloirEntree lumiere={lumieres.couloirEntree} filDefer={filDefer} masquerPlafond={pieceOuverte || droneActif} />
      )}
    </>
  );
}

'use client';
import { Suspense, useMemo } from 'react';
import * as THREE from 'three';
import { useTexture } from '@react-three/drei';
import { Interrupteur3D } from '../structure/Interrupteur3D';
import { MarkerCliquable } from '../equipements/MarkerCliquable';
import { ZonePiece } from '../equipements/ZonePiece';
import { useElementSelectionnable } from '@/hooks/useElementSelectionnable';
import { getEquipementNom } from '@/lib/equipements';

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

function PhotoCadre({ estSelectionne }: { estSelectionne: boolean }) {
  const texture = useTexture('/images/house.img/sallon.jpg');
  return (
    <>
      {/* Cadre bois foncé */}
      <mesh castShadow>
        <boxGeometry args={[0.72, 0.54, 0.025]} />
        <meshPhysicalMaterial color={estSelectionne ? '#00e5ff' : '#2c1a10'} roughness={0.7} metalness={0.05} />
      </mesh>
      {/* Passe-partout crème */}
      <mesh position={[0, 0, 0.012]}>
        <boxGeometry args={[0.64, 0.46, 0.01]} />
        <meshStandardMaterial color="#f0ece3" roughness={0.95} />
      </mesh>
      {/* Photo */}
      <mesh position={[0, 0, 0.02]}>
        <planeGeometry args={[0.58, 0.40]} />
        <meshBasicMaterial map={texture} />
      </mesh>
    </>
  );
}

/**
 * COULOIR D'ENTRÉE — entre séjour (X ≤ -1.8) et cuisine (X ≥ 0.75)
 *
 * Cloisons de référence (StructureMaison) :
 *   Cloison gauche : X = -1.8  (Z : -5.0 → 1.5)
 *   Cloison droite : X =  0.75 (Z : -5.0 → 1.5)
 *
 * Limites murs intérieurs (em = 0.125) :
 *   X : -1.675 (face séjour)  →  0.625 (face cuisine)   largeur  = 2.3 m
 *   Z : -4.875 (mur avant)    →  1.375 (cloison chambre) profondeur = 6.25 m
 *
 * Sol : centre (-0.525, -1.75), 2.3 m × 6.25 m
 * Porte d'entrée principale : Z ≈ -4.875, X ≈ -1.05 (P_ENTREE dans StructureMaison)
 *
 * Équipements présents (data/equipements.json) :
 *   entree-1  Porte d'entrée
 *   entree-2  Serrure et verrou de sécurité
 *   entree-3  Boîte aux lettres (fente intérieure)
 *   entree-4  Revêtement de sol
 *   entree-5  Revêtement mural
 *   entree-6  Luminaire (plafonnier + interrupteur)
 *   entree-7  Interphone / visiophone (unité intérieure)
 *   entree-8  Sonnette de porte (buzzer intérieur)
 *   entree-9  Détecteur de fumée DAAF
 *   entree-10 Grille de ventilation
 */

interface Props { lumiere: boolean; filDefer?: boolean; masquerPlafond?: boolean }

export function CouloirEntree({ lumiere, filDefer = false, masquerPlafond = false }: Props) {
  // ── entree-1 · Porte d'entrée ─────────────────────────────────────────────
  const porte       = useElementSelectionnable({ idPiece: 'couloirEntree', idElement: 'porte',       equipementId: 'entree-1', defaut: { couleur: '#8b6f47', rugosite: 0.65, metalique: 0.05 } });
  // ── entree-2 · Serrure et verrou ──────────────────────────────────────────
  const serrure     = useElementSelectionnable({ idPiece: 'couloirEntree', idElement: 'serrure',     equipementId: 'entree-2', defaut: { couleur: '#b0b8c1', rugosite: 0.15, metalique: 0.95 } });
  // ── entree-3 · Boîte aux lettres ──────────────────────────────────────────
  const boite       = useElementSelectionnable({ idPiece: 'couloirEntree', idElement: 'boite',       equipementId: 'entree-3', defaut: { couleur: '#374151', rugosite: 0.4,  metalique: 0.5 } });
  // ── entree-4 · Revêtement de sol ──────────────────────────────────────────
  const sol         = useElementSelectionnable({ idPiece: 'couloirEntree', idElement: 'sol',         equipementId: 'entree-4', defaut: { couleur: '#3d0d1a', rugosite: 0.95, metalique: 0 } });
  // ── entree-5 · Revêtement mural ───────────────────────────────────────────
  const revMural    = useElementSelectionnable({ idPiece: 'couloirEntree', idElement: 'revMural',    equipementId: 'entree-5', defaut: { couleur: '#e8e4dc', rugosite: 0.9,  metalique: 0 } });
  // ── entree-6 · Luminaire ──────────────────────────────────────────────────
  const plafonnier  = useElementSelectionnable({ idPiece: 'couloirEntree', idElement: 'plafonnier',  equipementId: 'entree-6', defaut: { couleur: '#f9fafb', rugosite: 0.3,  metalique: 0 } });
  // ── entree-7 · Interphone / visiophone ────────────────────────────────────
  const interphone  = useElementSelectionnable({ idPiece: 'couloirEntree', idElement: 'interphone',  equipementId: 'entree-7', defaut: { couleur: '#1f2937', rugosite: 0.3,  metalique: 0.4 } });
  // ── entree-8 · Sonnette de porte ──────────────────────────────────────────
  const sonnette    = useElementSelectionnable({ idPiece: 'couloirEntree', idElement: 'sonnette',    equipementId: 'entree-8', defaut: { couleur: '#374151', rugosite: 0.3,  metalique: 0.3 } });
  // ── entree-9 · Détecteur de fumée DAAF ────────────────────────────────────
  const daaf        = useElementSelectionnable({ idPiece: 'couloirEntree', idElement: 'daaf',        equipementId: 'entree-9', defaut: { couleur: '#f3f4f6', rugosite: 0.3,  metalique: 0.1 } });
  // ── entree-10 · Grille de ventilation ─────────────────────────────────────
  const ventilation = useElementSelectionnable({ idPiece: 'couloirEntree', idElement: 'ventilation', equipementId: 'entree-10', defaut: { couleur: '#9ca3af', rugosite: 0.4, metalique: 0.3 } });

  const tapisTexture = useMemo(() => {
    const W = 256, H = 768;
    const rng = seededRandom(137);
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
    const parse = (hex: string) => ({
      r: parseInt(hex.slice(1, 3), 16),
      g: parseInt(hex.slice(3, 5), 16),
      b: parseInt(hex.slice(5, 7), 16),
    });

    const mc = parse(sol.estSelectionne ? '#00e5ff' : sol.materiau.couleur);
    const bc = parse('#2a1205');
    const dc = parse('#b07850');
    const sc = parse('#e8c89a');

    const bW  = Math.floor(W * 0.10);
    const dW  = Math.floor(W * 0.10);
    const sHW = Math.floor(W * 0.025);
    const mid = W / 2;

    const zoneColor = (px: number) => {
      if (px < bW || px >= W - bW) return bc;
      if (px < bW + dW || px >= W - bW - dW) return dc;
      if (Math.abs(px - mid) < sHW) return sc;
      return mc;
    };

    for (let py = 0; py < H; py++) {
      for (let px = 0; px < W; px++) {
        const c = zoneColor(px);
        const n = (rng() - 0.5) * 22;
        ctx.fillStyle = `rgb(${clamp(c.r + n)},${clamp(c.g + n)},${clamp(c.b + n)})`;
        ctx.fillRect(px, py, 1, 1);
      }
    }

    for (let i = 0; i < 20000; i++) {
      const fx  = rng() * W;
      const fy  = rng() * H;
      const len = 1.5 + rng() * 4.5;
      const ang = rng() < 0.72
        ? Math.PI / 2 + (rng() - 0.5) * 0.45
        : rng() * Math.PI * 2;
      const c = zoneColor(fx);
      const b = -22 + rng() * 44;
      ctx.strokeStyle = `rgba(${clamp(c.r + b)},${clamp(c.g + b)},${clamp(c.b + b)},${0.3 + rng() * 0.35})`;
      ctx.lineWidth = 0.3 + rng() * 0.65;
      ctx.beginPath();
      ctx.moveTo(fx, fy);
      ctx.lineTo(fx + Math.cos(ang) * len, fy + Math.sin(ang) * len);
      ctx.stroke();
    }

    for (let i = 0; i < 5000; i++) {
      const side = rng() < 0.5;
      const fx   = side ? rng() * bW : W - rng() * bW;
      const fy   = rng() * H;
      const ang  = (rng() < 0.5 ? 0 : Math.PI / 2) + (rng() - 0.5) * 0.2;
      const len  = 2 + rng() * 5;
      const b    = -28 + rng() * 56;
      ctx.strokeStyle = `rgba(${clamp(bc.r + b)},${clamp(bc.g + b)},${clamp(bc.b + b)},0.55)`;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(fx, fy);
      ctx.lineTo(fx + Math.cos(ang) * len, fy + Math.sin(ang) * len);
      ctx.stroke();
    }

    for (let i = 0; i < 2000; i++) {
      const side = rng() < 0.5;
      const fx = side ? bW + rng() * dW : W - bW - dW + rng() * dW;
      const fy = rng() * H;
      const b  = 20 + rng() * 30;
      ctx.strokeStyle = `rgba(${clamp(dc.r + b)},${clamp(dc.g + b)},${clamp(dc.b + b)},0.25)`;
      ctx.lineWidth = 0.4 + rng() * 0.4;
      ctx.beginPath();
      ctx.moveTo(fx, fy);
      ctx.lineTo(fx + (rng() - 0.5) * 3, fy + (rng() - 0.5) * 3);
      ctx.stroke();
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.ClampToEdgeWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    return tex;
  }, [sol.estSelectionne, sol.materiau.couleur]);

  const solNoirTexture = useMemo(() => {
    const S = 512, TILE = 64, GROUT = 2;
    const canvas = document.createElement('canvas');
    canvas.width = S; canvas.height = S;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    const rng = seededRandom(73);
    const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));

    // Joints entre carreaux
    ctx.fillStyle = '#181820';
    ctx.fillRect(0, 0, S, S);

    const NT = S / TILE; // 8 tuiles par côté
    for (let ty = 0; ty < NT; ty++) {
      for (let tx = 0; tx < NT; tx++) {
        const x = tx * TILE + GROUT;
        const y = ty * TILE + GROUT;
        const w = TILE - GROUT;
        const h = TILE - GROUT;
        // Légère variation par carreau (simule l'hétérogénéité du marbre)
        const v = (rng() - 0.5) * 8;
        ctx.fillStyle = `rgb(${clamp(12 + v)},${clamp(11 + v)},${clamp(17 + v)})`;
        ctx.fillRect(x, y, w, h);
        // Veinage marbre subtil (5 traits par carreau)
        for (let i = 0; i < 5; i++) {
          const vx = x + rng() * w;
          const vy = y + rng() * h;
          const vlen = 8 + rng() * 32;
          const vang = rng() * Math.PI;
          const bright = 10 + rng() * 24;
          ctx.strokeStyle = `rgba(${clamp(bright)},${clamp(bright)},${clamp(bright + 14)},${0.05 + rng() * 0.09})`;
          ctx.lineWidth = 0.3 + rng() * 0.7;
          ctx.beginPath();
          ctx.moveTo(vx, vy);
          ctx.lineTo(vx + Math.cos(vang) * vlen, vy + Math.sin(vang) * vlen);
          ctx.stroke();
        }
        // Reflet ponctuel (simulation lumière rasante)
        if (rng() < 0.28) {
          const hx = x + rng() * w * 0.4;
          const hy = y + rng() * h * 0.4;
          const grad = ctx.createRadialGradient(hx, hy, 0, hx, hy, 14);
          grad.addColorStop(0, `rgba(45,44,65,0.14)`);
          grad.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = grad;
          ctx.fillRect(x, y, w, h);
        }
      }
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    // 3 carreaux sur 2.3 m (≈ 77 cm/carreau) · 8 carreaux sur 6.25 m (≈ 78 cm/carreau)
    tex.repeat.set(3 / NT, 8 / NT);
    return tex;
  }, []);

  const mat = (s: ReturnType<typeof useElementSelectionnable>) => ({
    color:             s.estSelectionne ? '#00e5ff' : s.materiau.couleur,
    roughness:         s.materiau.rugosite,
    metalness:         s.materiau.metalique,
    emissive:          s.emissif,
    emissiveIntensity: s.intensiteEmissif,
  });

  return (
    <group>

      {/* ══════════════════════════════════════════════════════════════════════
          entree-4 · CARRELAGE NOIR POLI — grand format ≈ 78 × 78 cm
          X : -1.675 → 0.625 (2.3 m) · Z : -4.875 → 1.375 (6.25 m)
         ══════════════════════════════════════════════════════════════════════ */}
      {/* Fond opaque — empêche le gazon de transparaître */}
      <mesh position={[-0.525, 0.089, -1.75]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.3, 6.25]} />
        <meshBasicMaterial color="#09090f" side={2} />
      </mesh>
      {/* Carrelage poli — texture marbre noir + joints */}
      <mesh position={[-0.525, 0.1, -1.75]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[2.3, 6.25]} />
        <meshPhysicalMaterial
          map={solNoirTexture ?? undefined}
          color="#0d0d16"
          roughness={0.06}
          metalness={0.02}
          clearcoat={0.92}
          clearcoatRoughness={0.04}
          wireframe={filDefer}
          side={2}
        />
      </mesh>

      {/* ══════════════════════════════════════════════════════════════════════
          entree-4 · TAPIS RUNNER — texture procédurale fibre + motif
          Largeur 1.5 m, longueur 5.7 m, surélevé de 2 cm sur le carrelage
         ══════════════════════════════════════════════════════════════════════ */}
      <group {...sol.propsInteraction}>
        {/* Ombre portée sous le runner */}
        <mesh position={[-0.525, 0.099, -1.75]} receiveShadow>
          <boxGeometry args={[1.64, 0.004, 5.84]} />
          <meshPhysicalMaterial
            color="#120800"
            roughness={0.99} metalness={0}
            transparent opacity={0.6}
          />
        </mesh>
        {/* Corps du tapis — texture fibre procédurale avec motif intégré */}
        <mesh position={[-0.525, 0.113, -1.75]} receiveShadow castShadow>
          <boxGeometry args={[1.5, 0.024, 5.7]} />
          <meshPhysicalMaterial
            map={tapisTexture ?? undefined}
            roughness={0.97}
            metalness={0}
            bumpMap={tapisTexture ?? undefined}
            bumpScale={0.003}
            emissive={sol.emissif}
            emissiveIntensity={sol.intensiteEmissif}
          />
        </mesh>
        {/* Frange avant (côté porte d'entrée) — 20 fils */}
        {Array.from({ length: 20 }).map((_, i) => (
          <mesh key={`fa${i}`} position={[-1.2375 + i * 0.075, 0.103, -4.635]} receiveShadow>
            <boxGeometry args={[0.022, 0.003, 0.075]} />
            <meshPhysicalMaterial color="#c8905a" roughness={0.98} metalness={0} />
          </mesh>
        ))}
        {/* Frange arrière (côté séjour) — 20 fils */}
        {Array.from({ length: 20 }).map((_, i) => (
          <mesh key={`fb${i}`} position={[-1.2375 + i * 0.075, 0.103, 1.135]} receiveShadow>
            <boxGeometry args={[0.022, 0.003, 0.075]} />
            <meshPhysicalMaterial color="#c8905a" roughness={0.98} metalness={0} />
          </mesh>
        ))}
      </group>

      {/* ══════════════════════════════════════════════════════════════════════
          entree-5 · REVÊTEMENT MURAL — cadre photo sur cloison droite (cuisine)
          Position : mur du fond (Z=1.35), centré X=-0.525, H=1.6m, face à la porte
         ══════════════════════════════════════════════════════════════════════ */}
      <group
        {...revMural.propsInteraction}
        position={[-0.525, 1.6, 1.35]}
        rotation={[0, Math.PI, 0]}
      >
        <Suspense fallback={null}>
          <PhotoCadre estSelectionne={revMural.estSelectionne} />
        </Suspense>
      </group>

      {/* ── Plafond ── */}
      {!masquerPlafond && (
        <mesh position={[-0.525, 2.8, -1.75]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[2.3, 6.25]} />
          <meshStandardMaterial color="#6b7280" roughness={0.9} />
        </mesh>
      )}

      {/* ── Éclairage ambiant ── */}
      {lumiere && (
        <rectAreaLight
          position={[-0.525, 2.76, -1.75]} rotation={[-Math.PI / 2, 0, 0]}
          width={1.8} height={5.0} intensity={2.0} color="#ffd580"
        />
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          entree-6 · LUMINAIRE — plafonnier central + interrupteur mural
         ══════════════════════════════════════════════════════════════════════ */}
      <group {...plafonnier.propsInteraction} position={[-0.525, 2.72, -2.5]}>
        {/* Rosace */}
        <mesh>
          <cylinderGeometry args={[0.13, 0.1, 0.05, 16]} />
          <meshStandardMaterial
            color={plafonnier.estSelectionne ? '#00e5ff' : (lumiere ? '#fffde7' : plafonnier.materiau.couleur)}
            emissive={lumiere ? '#ffd580' : '#000000'}
            emissiveIntensity={lumiere ? 1.6 : 0}
            roughness={plafonnier.materiau.rugosite}
            metalness={plafonnier.materiau.metalique}
          />
        </mesh>
        {/* Abat-jour */}
        <mesh position={[0, -0.1, 0]}>
          <cylinderGeometry args={[0.09, 0.06, 0.12, 16]} />
          <meshStandardMaterial
            color={lumiere ? '#fffde7' : '#e5e7eb'}
            emissive={lumiere ? '#ffd580' : '#000000'}
            emissiveIntensity={lumiere ? 0.8 : 0}
            roughness={0.5}
          />
        </mesh>
      </group>

      {/* Interrupteur lumière — mur avant, à droite de la porte */}
      <Interrupteur3D
        position={[-0.2, 1.2, -4.86]}
        rotation={[0, 0, 0]}
        idPiece="couloirEntree"
        lumiere={lumiere}
        equipementId="entree-6"
      />

      {/* ══════════════════════════════════════════════════════════════════════
          entree-1 · PORTE D'ENTRÉE — face intérieure sélectionnable
          (la porte physique est rendue par StructureMaison à [-1.05,0,-4.98])
         ══════════════════════════════════════════════════════════════════════ */}
      <group {...porte.propsInteraction} position={[-1.05, 0, -4.85]}>
        {/* Panneau bois */}
        <mesh position={[0, 1.05, 0]} castShadow>
          <boxGeometry args={[0.88, 2.1, 0.05]} />
          <meshPhysicalMaterial {...mat(porte)} clearcoat={0.3} clearcoatRoughness={0.3} />
        </mesh>
        {/* Moulure haute */}
        <mesh position={[0, 1.82, 0.027]}>
          <boxGeometry args={[0.82, 0.52, 0.01]} />
          <meshPhysicalMaterial {...mat(porte)} />
        </mesh>
        {/* Moulure basse */}
        <mesh position={[0, 0.38, 0.027]}>
          <boxGeometry args={[0.82, 0.62, 0.01]} />
          <meshPhysicalMaterial {...mat(porte)} />
        </mesh>
      </group>

      {/* ══════════════════════════════════════════════════════════════════════
          entree-2 · SERRURE ET VERROU — face intérieure porte
         ══════════════════════════════════════════════════════════════════════ */}
      <group {...serrure.propsInteraction} position={[-0.68, 1.0, -4.82]}>
        {/* Corps serrure */}
        <mesh castShadow>
          <boxGeometry args={[0.045, 0.18, 0.022]} />
          <meshPhysicalMaterial {...mat(serrure)} />
        </mesh>
        {/* Poignée barre */}
        <mesh position={[0, -0.05, 0.025]}>
          <boxGeometry args={[0.016, 0.11, 0.016]} />
          <meshPhysicalMaterial {...mat(serrure)} />
        </mesh>
        {/* Bouton poignée horizontal */}
        <mesh position={[0, -0.09, 0.04]}>
          <boxGeometry args={[0.07, 0.016, 0.016]} />
          <meshPhysicalMaterial {...mat(serrure)} />
        </mesh>
        {/* Cylindre barillet */}
        <mesh position={[0, 0.06, 0.024]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.014, 0.014, 0.02, 10]} />
          <meshPhysicalMaterial color={serrure.estSelectionne ? '#00e5ff' : '#d4af37'} roughness={0.1} metalness={0.9} />
        </mesh>
        {/* Verrou pêne */}
        <mesh position={[-0.04, 0.06, 0.012]}>
          <boxGeometry args={[0.025, 0.04, 0.012]} />
          <meshPhysicalMaterial {...mat(serrure)} />
        </mesh>
      </group>

      {/* ══════════════════════════════════════════════════════════════════════
          entree-3 · BOÎTE AUX LETTRES — fente intérieure sur la porte
         ══════════════════════════════════════════════════════════════════════ */}
      <group {...boite.propsInteraction} position={[-1.0, 1.38, -4.82]}>
        {/* Cadre fente */}
        <mesh castShadow>
          <boxGeometry args={[0.22, 0.06, 0.025]} />
          <meshPhysicalMaterial {...mat(boite)} />
        </mesh>
        {/* Ouverture fente */}
        <mesh position={[0, 0, 0.014]}>
          <boxGeometry args={[0.17, 0.022, 0.005]} />
          <meshPhysicalMaterial color="#111827" roughness={0.9} metalness={0} emissive="#000000" emissiveIntensity={0} />
        </mesh>
        {/* Rabat coupe-froid */}
        <mesh position={[0, -0.01, 0.016]}>
          <boxGeometry args={[0.17, 0.015, 0.002]} />
          <meshPhysicalMaterial color={boite.estSelectionne ? '#00e5ff' : '#1f2937'} roughness={0.4} metalness={0.3} />
        </mesh>
      </group>

      {/* ══════════════════════════════════════════════════════════════════════
          entree-7 · INTERPHONE / VISIOPHONE — unité intérieure
          Cloison séjour (X≈-1.67), face couloir, h=1.4 m
         ══════════════════════════════════════════════════════════════════════ */}
      <group {...interphone.propsInteraction} position={[-1.66, 1.4, -3.8]} rotation={[0, Math.PI / 2, 0]}>
        {/* Boîtier principal */}
        <mesh castShadow>
          <boxGeometry args={[0.18, 0.26, 0.03]} />
          <meshPhysicalMaterial {...mat(interphone)} clearcoat={0.4} clearcoatRoughness={0.2} />
        </mesh>
        {/* Écran */}
        <mesh position={[0, 0.05, 0.017]}>
          <boxGeometry args={[0.14, 0.12, 0.005]} />
          <meshStandardMaterial
            color={interphone.estSelectionne ? '#00e5ff' : (lumiere ? '#1e3a8a' : '#111827')}
            emissive={lumiere ? '#1e3a8a' : '#000000'}
            emissiveIntensity={lumiere ? 0.4 : 0}
            roughness={0.05}
            metalness={0.2}
          />
        </mesh>
        {/* Haut-parleur (grille) */}
        <mesh position={[-0.045, -0.07, 0.017]}>
          <boxGeometry args={[0.055, 0.055, 0.003]} />
          <meshStandardMaterial color="#0d0d0d" roughness={0.9} metalness={0.1} />
        </mesh>
        {/* Bouton décrocher */}
        <mesh position={[0.045, -0.07, 0.018]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.016, 0.016, 0.008, 12]} />
          <meshPhysicalMaterial color="#22c55e" roughness={0.3} metalness={0.4} emissive="#22c55e" emissiveIntensity={lumiere ? 0.5 : 0.1} />
        </mesh>
        {/* Bouton fin d'appel */}
        <mesh position={[0.045, -0.095, 0.018]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.016, 0.016, 0.008, 12]} />
          <meshPhysicalMaterial color="#ef4444" roughness={0.3} metalness={0.4} emissive="#ef4444" emissiveIntensity={0.1} />
        </mesh>
      </group>

      {/* ══════════════════════════════════════════════════════════════════════
          entree-8 · SONNETTE DE PORTE — buzzer intérieur
          Cloison droite (X≈0.62), face couloir, h=1.4 m, près de la porte
         ══════════════════════════════════════════════════════════════════════ */}
      <group {...sonnette.propsInteraction} position={[0.61, 1.4, -4.2]} rotation={[0, -Math.PI / 2, 0]}>
        {/* Boîtier buzzer */}
        <mesh castShadow>
          <boxGeometry args={[0.12, 0.08, 0.025]} />
          <meshPhysicalMaterial {...mat(sonnette)} clearcoat={0.3} clearcoatRoughness={0.3} />
        </mesh>
        {/* Membrane vibrante */}
        <mesh position={[0, 0, 0.015]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.028, 0.028, 0.005, 16]} />
          <meshPhysicalMaterial color={sonnette.estSelectionne ? '#00e5ff' : '#6b7280'} roughness={0.5} metalness={0.3} />
        </mesh>
        {/* Voyant LED */}
        <mesh position={[0.04, 0, 0.016]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.007, 0.007, 0.003, 10]} />
          <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={lumiere ? 0.8 : 0.1} roughness={0.2} />
        </mesh>
      </group>

      {/* ══════════════════════════════════════════════════════════════════════
          entree-9 · DÉTECTEUR DE FUMÉE DAAF — plafond, centre du couloir
         ══════════════════════════════════════════════════════════════════════ */}
      <group {...daaf.propsInteraction} position={[-0.525, 2.77, -1.75]}>
        {/* Corps cylindrique */}
        <mesh castShadow>
          <cylinderGeometry args={[0.065, 0.072, 0.028, 20]} />
          <meshPhysicalMaterial {...mat(daaf)} clearcoat={0.2} clearcoatRoughness={0.3} />
        </mesh>
        {/* Face basse (grille) */}
        <mesh position={[0, -0.015, 0]}>
          <cylinderGeometry args={[0.055, 0.055, 0.006, 20]} />
          <meshPhysicalMaterial color={daaf.estSelectionne ? '#00e5ff' : '#d1d5db'} roughness={0.5} metalness={0.05} />
        </mesh>
        {/* Voyant LED rouge */}
        <mesh position={[0.04, -0.015, 0]}>
          <cylinderGeometry args={[0.005, 0.005, 0.002, 8]} />
          <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.7} roughness={0.15} />
        </mesh>
      </group>

      {/* ══════════════════════════════════════════════════════════════════════
          entree-10 · GRILLE DE VENTILATION — cloison séjour (X≈-1.675), haut
         ══════════════════════════════════════════════════════════════════════ */}
      <mesh {...ventilation.propsInteraction} position={[-1.65, 2.55, -0.5]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[0.28, 0.16, 0.025]} />
        <meshStandardMaterial {...mat(ventilation)} />
      </mesh>
      {Array.from({ length: 9 }).map((_, i) => (
        <mesh key={i} {...ventilation.propsInteraction} position={[-1.64, 2.55 - 0.06 + i * 0.014, -0.5]} rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[0.24, 0.008, 0.006]} />
          <meshStandardMaterial {...mat(ventilation)} />
        </mesh>
      ))}

      {/* ══════════════════════════════════════════════════════════════════════
          ZONE PIÈCE — survol → highlight + tooltip, clic → affiche les markers
         ══════════════════════════════════════════════════════════════════════ */}
      <ZonePiece
        idPiece="couloirEntree"
        nom="Couloir d'entrée"
        x={-0.525} z={-1.75} largeur={2.3} profondeur={6.25}
      />

      {/* ══════════════════════════════════════════════════════════════════════
          MARKERS ORANGE — visibles uniquement si pieceMarkersActive=couloirEntree
         ══════════════════════════════════════════════════════════════════════ */}
      {!porte.estSelectionne && (
        <MarkerCliquable position={[-1.05, 1.8, -4.78]} libelle={getEquipementNom('entree-1')} equipementId="entree-1" idPiece="couloirEntree" />
      )}
      {!serrure.estSelectionne && (
        <MarkerCliquable position={[-0.68, 1.15, -4.77]} libelle={getEquipementNom('entree-2')} equipementId="entree-2" idPiece="couloirEntree" />
      )}
      {!boite.estSelectionne && (
        <MarkerCliquable position={[-1.0, 1.6, -4.77]} libelle={getEquipementNom('entree-3')} equipementId="entree-3" idPiece="couloirEntree" />
      )}
      {!sol.estSelectionne && (
        <MarkerCliquable position={[-0.525, 0.22, -2.8]} libelle={getEquipementNom('entree-4')} equipementId="entree-4" idPiece="couloirEntree" />
      )}
      {!revMural.estSelectionne && (
        <MarkerCliquable position={[-0.525, 1.92, 1.3]} libelle={getEquipementNom('entree-5')} equipementId="entree-5" idPiece="couloirEntree" />
      )}
      {!plafonnier.estSelectionne && (
        <MarkerCliquable position={[-0.525, 2.52, -2.5]} libelle={getEquipementNom('entree-6')} equipementId="entree-6" idPiece="couloirEntree" />
      )}
      {!interphone.estSelectionne && (
        <MarkerCliquable position={[-1.48, 1.6, -3.8]} libelle={getEquipementNom('entree-7')} equipementId="entree-7" idPiece="couloirEntree" />
      )}
      {!sonnette.estSelectionne && (
        <MarkerCliquable position={[0.44, 1.6, -4.2]} libelle={getEquipementNom('entree-8')} equipementId="entree-8" idPiece="couloirEntree" />
      )}
      {!daaf.estSelectionne && (
        <MarkerCliquable position={[-0.525, 2.57, -1.75]} libelle={getEquipementNom('entree-9')} equipementId="entree-9" idPiece="couloirEntree" />
      )}
      {!ventilation.estSelectionne && (
        <MarkerCliquable position={[-1.48, 2.55, -0.5]} libelle={getEquipementNom('entree-10')} equipementId="entree-10" idPiece="couloirEntree" />
      )}

    </group>
  );
}

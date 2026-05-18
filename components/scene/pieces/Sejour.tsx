'use client';
import { Sol } from '../structure/Sol';
import { Interrupteur3D } from '../structure/Interrupteur3D';
import { PriseElectrique } from '../structure/PriseElectrique';
import { RobinetThermostatique } from '../structure/RobinetThermostatique';
import { Fenetre } from '../structure/Fenetre';
import { ZonePiece } from '../equipements/ZonePiece';
import { MarkerCliquable } from '../equipements/MarkerCliquable';
import { useElementSelectionnable } from '@/hooks/useElementSelectionnable';
import { getEquipementNom } from '@/lib/equipements';

/**
 * SÉJOUR — à gauche du couloir d'entrée (X < -1.8)
 *
 * Cloisons de référence (StructureMaison) :
 *   Cloison droite : X = -1.8 (séparation séjour / couloir d'entrée)
 *   Cloison arrière : Z = 1.5  (séparation séjour / chambre)
 *
 * Limites murs intérieurs (em = 0.125) :
 *   X : -5.875 (mur gauche ext.)  →  -1.675 (face séjour de la cloison)  largeur  = 4.2 m
 *   Z : -4.875 (mur avant ext.)   →   1.375 (face séjour de la cloison)  profondeur = 6.25 m
 *
 * Sol : centre (-3.775, -1.75), 4.2 m × 6.25 m
 *
 * Plan d'aménagement :
 *   Mur arrière (z≈-4.87) : meuble TV (x=-3.5) + TV + tableau décoratif + radiateur
 *   Mur gauche  (x≈-5.69) : bibliothèque (z≈-3.8)
 *   Mur gauche  (x≈-5.4)  : fauteuil orienté vers séjour (z≈0.4)
 *   Centre                 : canapé (x=-3.5, z=-1.5) + table basse (z=-2.5) + tapis
 *   Mur gauche h=1.5m      : thermostat + prise
 */

interface Props { lumiere: boolean; filDefer?: boolean; masquerPlafond?: boolean }

// ─── Helpers ──────────────────────────────────────────────────────────────────
type MatProps = {
  color: string; roughness: number; metalness: number; emissive: string; emissiveIntensity: number;
  clearcoat?: number; clearcoatRoughness?: number;
  sheen?: number; sheenRoughness?: number; sheenColor?: string;
};

// ─── TV réaliste ──────────────────────────────────────────────────────────────
function Television({ propsInteraction, mat }: { propsInteraction: Record<string,unknown>; mat: MatProps }) {
  return (
    <group position={[-3.5, 0.82, -4.84]}>
      <mesh {...propsInteraction} castShadow>
        <boxGeometry args={[1.35, 0.76, 0.055]} />
        <meshPhysicalMaterial {...mat} />
      </mesh>
      <mesh position={[0, 0, 0.03]}>
        <boxGeometry args={[1.38, 0.79, 0.01]} />
        <meshPhysicalMaterial {...mat} />
      </mesh>
      <mesh position={[0, 0, 0.032]}>
        <boxGeometry args={[1.28, 0.72, 0.002]} />
        <meshPhysicalMaterial {...mat} />
      </mesh>
      <mesh position={[0, -0.46, 0.02]} castShadow>
        <boxGeometry args={[0.08, 0.16, 0.06]} />
        <meshPhysicalMaterial {...mat} />
      </mesh>
    </group>
  );
}

// ─── Meuble TV ────────────────────────────────────────────────────────────────
function MeubleTV({ propsInteraction, mat }: { propsInteraction: Record<string,unknown>; mat: MatProps }) {
  return (
    <group position={[-3.5, 0.22, -4.66]}>
      <mesh {...propsInteraction} castShadow receiveShadow>
        <boxGeometry args={[1.8, 0.44, 0.42]} />
        <meshPhysicalMaterial {...mat} />
      </mesh>
      {[[-0.8,-0.18],[-0.8,0.18],[0.8,-0.18],[0.8,0.18]].map(([x,z],i) => (
        <mesh key={i} position={[x, -0.26, z]} castShadow>
          <cylinderGeometry args={[0.025, 0.025, 0.12, 8]} />
          <meshPhysicalMaterial {...mat} />
        </mesh>
      ))}
      {[-0.45, 0.45].map((x, i) => (
        <group key={i}>
          <mesh position={[x, 0, 0.22]}>
            <boxGeometry args={[0.82, 0.38, 0.02]} />
            <meshPhysicalMaterial {...mat} />
          </mesh>
          <mesh position={[x, 0, 0.235]}>
            <boxGeometry args={[0.22, 0.025, 0.025]} />
            <meshPhysicalMaterial {...mat} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// ─── Canapé ───────────────────────────────────────────────────────────────────
// Centré dans le séjour (X : -5.875 → -1.675), face à la TV (mur arrière Z≈-4.87)
// rotation PI → dossier vers Z positif (côté couloir), assise vers TV
function Canape({ propsInteraction, mat }: { propsInteraction: Record<string,unknown>; mat: MatProps }) {
  return (
    <group {...propsInteraction} position={[-3.5, 0, -1.5]} rotation={[0, Math.PI, 0]}>
      <mesh position={[0, 0.22, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 0.18, 0.9]} />
        <meshPhysicalMaterial {...mat} />
      </mesh>
      {[-0.72, 0, 0.72].map((x, i) => (
        <mesh key={i} position={[x, 0.34, 0.05]} castShadow>
          <boxGeometry args={[0.68, 0.14, 0.78]} />
          <meshPhysicalMaterial {...mat} />
        </mesh>
      ))}
      <mesh position={[0, 0.58, -0.38]} castShadow>
        <boxGeometry args={[2.2, 0.52, 0.16]} />
        <meshPhysicalMaterial {...mat} />
      </mesh>
      {[-0.72, 0, 0.72].map((x, i) => (
        <mesh key={i} position={[x, 0.58, -0.3]} castShadow>
          <boxGeometry args={[0.68, 0.48, 0.14]} />
          <meshPhysicalMaterial {...mat} />
        </mesh>
      ))}
      {[-1.1, 1.1].map((x, i) => (
        <group key={i}>
          <mesh position={[x, 0.38, 0]} castShadow>
            <boxGeometry args={[0.18, 0.52, 0.9]} />
            <meshPhysicalMaterial {...mat} />
          </mesh>
          <mesh position={[x, 0.65, 0]}>
            <boxGeometry args={[0.2, 0.06, 0.92]} />
            <meshPhysicalMaterial {...mat} />
          </mesh>
        </group>
      ))}
      {[[-1.0,-0.38],[-1.0,0.38],[1.0,-0.38],[1.0,0.38]].map(([lx,lz],i) => (
        <mesh key={i} position={[lx, 0.06, lz]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.12, 8]} />
          <meshPhysicalMaterial {...mat} />
        </mesh>
      ))}
    </group>
  );
}

// ─── Table basse ──────────────────────────────────────────────────────────────
// Entre canapé (z=-1.5) et TV (z≈-4.87) — centre du tapis
function TableBasse({ propsInteraction, mat }: { propsInteraction: Record<string,unknown>; mat: MatProps }) {
  return (
    <group {...propsInteraction} position={[-3.5, 0, -2.5]}>
      <mesh position={[0, 0.38, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.1, 0.04, 0.6]} />
        <meshPhysicalMaterial {...mat} />
      </mesh>
      <mesh position={[0, 0.18, 0]} castShadow>
        <boxGeometry args={[0.95, 0.025, 0.5]} />
        <meshPhysicalMaterial {...mat} />
      </mesh>
      {[[-0.48,-0.24],[-0.48,0.24],[0.48,-0.24],[0.48,0.24]].map(([lx,lz],i) => (
        <mesh key={i} position={[lx, 0.19, lz]} castShadow>
          <boxGeometry args={[0.04, 0.38, 0.04]} />
          <meshPhysicalMaterial {...mat} />
        </mesh>
      ))}
    </group>
  );
}

// ─── Fauteuil ─────────────────────────────────────────────────────────────────
// Contre le mur gauche (x≈-5.875), orienté vers le séjour (+x) et l'entrée (+z)
function Fauteuil({ propsInteraction, mat }: { propsInteraction: Record<string,unknown>; mat: MatProps }) {
  return (
    <group {...propsInteraction} position={[-5.4, 0, 0.4]} rotation={[0, -Math.PI / 2 + 0.4, 0]}>
      <mesh position={[0, 0.24, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.82, 0.2, 0.82]} />
        <meshPhysicalMaterial {...mat} />
      </mesh>
      <mesh position={[0, 0.38, 0.04]} castShadow>
        <boxGeometry args={[0.76, 0.14, 0.72]} />
        <meshPhysicalMaterial {...mat} />
      </mesh>
      <mesh position={[0, 0.62, -0.34]} castShadow>
        <boxGeometry args={[0.82, 0.56, 0.14]} />
        <meshPhysicalMaterial {...mat} />
      </mesh>
      {[-0.41, 0.41].map((x, i) => (
        <mesh key={i} position={[x, 0.42, 0]} castShadow>
          <boxGeometry args={[0.1, 0.36, 0.82]} />
          <meshPhysicalMaterial {...mat} />
        </mesh>
      ))}
      {[[-0.35,-0.35],[-0.35,0.35],[0.35,-0.35],[0.35,0.35]].map(([lx,lz],i) => (
        <mesh key={i} position={[lx, 0.07, lz]} castShadow>
          <cylinderGeometry args={[0.035, 0.035, 0.14, 8]} />
          <meshPhysicalMaterial {...mat} />
        </mesh>
      ))}
    </group>
  );
}

// ─── Bibliothèque moderne ─────────────────────────────────────────────────────
// Mur gauche (x≈-5.875 face intérieure), coin arrière-gauche
function Bibliotheque({ propsInteraction, mat }: { propsInteraction: Record<string,unknown>; mat: MatProps }) {
  return (
    <group {...propsInteraction} position={[-5.69, 0, -3.8]} rotation={[0, Math.PI/2, 0]}>
      <mesh position={[-0.6, 1.2, 0]} castShadow>
        <boxGeometry args={[0.04, 2.4, 0.04]} />
        <meshPhysicalMaterial color="#1a1a1a" roughness={0.2} metalness={0.2} />
      </mesh>
      <mesh position={[0.6, 1.2, 0]} castShadow>
        <boxGeometry args={[0.04, 2.4, 0.04]} />
        <meshPhysicalMaterial color="#1a1a1a" roughness={0.2} metalness={0.2} />
      </mesh>
      {[0.3, 0.75, 1.2, 1.65, 2.1].map((y, i) => (
        <mesh key={i} position={[0, y, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 0.03, 0.3]} />
          <meshPhysicalMaterial {...mat} />
        </mesh>
      ))}
      {[0.42, 0.87, 1.32, 1.77].map((y, row) => {
        const colors = [
          ['#8b4513', '#2c3e50', '#7f1d1d', '#1e3a8a', '#065f46'],
          ['#1e3a8a', '#7f1d1d', '#065f46', '#8b4513', '#2c3e50'],
          ['#2c3e50', '#065f46', '#1e3a8a', '#7f1d1d', '#8b4513'],
          ['#065f46', '#8b4513', '#2c3e50', '#1e3a8a', '#7f1d1d']
        ];
        return [-0.4, -0.2, 0, 0.2, 0.4].map((x, col) => (
          <mesh key={`${row}-${col}`} position={[x, y + 0.15, 0]} castShadow>
            <boxGeometry args={[0.05, 0.28, 0.12]} />
            <meshPhysicalMaterial color={colors[row][col]} roughness={0.7} metalness={0} />
          </mesh>
        ));
      })}
      <mesh position={[-0.35, 2.25, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.04, 0.18, 12]} />
        <meshPhysicalMaterial color="#f5f5f5" roughness={0.1} metalness={0.3} />
      </mesh>
      <mesh position={[0.35, 2.28, 0]} castShadow>
        <boxGeometry args={[0.08, 0.22, 0.08]} />
        <meshPhysicalMaterial color="#c0c0c0" roughness={0.2} metalness={0.8} />
      </mesh>
    </group>
  );
}

// ─── Radiateur ────────────────────────────────────────────────────────────────
function Radiateur({ propsInteraction, mat }: { propsInteraction: Record<string,unknown>; mat: MatProps }) {
  return (
    <group {...propsInteraction} position={[-2.5, 0.38, -4.87]}>
      <mesh castShadow>
        <boxGeometry args={[1.0, 0.52, 0.08]} />
        <meshPhysicalMaterial {...mat} />
      </mesh>
      {Array.from({length: 6}).map((_, i) => (
        <mesh key={i} position={[-0.38 + i*0.15, 0, 0.02]}>
          <boxGeometry args={[0.06, 0.48, 0.04]} />
          <meshPhysicalMaterial {...mat} />
        </mesh>
      ))}
      {[-0.45, 0.45].map((x, i) => (
        <mesh key={i} position={[x, -0.32, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 0.12, 8]} />
          <meshPhysicalMaterial {...mat} />
        </mesh>
      ))}
    </group>
  );
}

// ─── Tableau décoratif ────────────────────────────────────────────────────────
function TableauDecoratif({ propsInteraction, mat }: { propsInteraction: Record<string,unknown>; mat: MatProps }) {
  return (
    <group position={[-3.5, 1.8, -4.87]}>
      <mesh castShadow>
        <boxGeometry args={[0.88, 0.66, 0.04]} />
        <meshPhysicalMaterial {...mat} />
      </mesh>
      <mesh {...propsInteraction} position={[0, 0, 0.025]}>
        <boxGeometry args={[0.78, 0.56, 0.01]} />
        <meshPhysicalMaterial {...mat} />
      </mesh>
    </group>
  );
}

// ─── Composant principal ──────────────────────────────────────────────────────
export function Sejour({ lumiere, filDefer = false, masquerPlafond = false }: Props) {
  const sol        = useElementSelectionnable({ idPiece: 'sejour', idElement: 'sol', equipementId: 'salon-1', defaut: { couleur: '#4b5563', rugosite: 0.7,  metalique: 0 } });
  const tapis      = useElementSelectionnable({ idPiece: 'sejour', idElement: 'tapis',        libelle: 'Tapis de salon',   defaut: { couleur: '#8b7355', rugosite: 0.95, metalique: 0 } });
  const tapisBordure = useElementSelectionnable({ idPiece: 'sejour', idElement: 'tapisBordure', libelle: 'Bordure tapis',  defaut: { couleur: '#6b5a45', rugosite: 0.9, metalique: 0 } });
  const canape     = useElementSelectionnable({ idPiece: 'sejour', idElement: 'canape',       libelle: 'Canapé',           defaut: { couleur: '#e8e8e8', rugosite: 0.6,  metalique: 0.05 } });
  const tableBasse = useElementSelectionnable({ idPiece: 'sejour', idElement: 'tableBasse',   libelle: 'Table basse',      defaut: { couleur: '#f5f5f5', rugosite: 0.2,  metalique: 0.1 } });
  const television = useElementSelectionnable({ idPiece: 'sejour', idElement: 'television',   libelle: 'Télévision',       defaut: { couleur: '#111827', rugosite: 0.1,  metalique: 0.5 } });
  const meubleTV   = useElementSelectionnable({ idPiece: 'sejour', idElement: 'meubleTV',     libelle: 'Meuble TV',        defaut: { couleur: '#1c1c1c', rugosite: 0.4,  metalique: 0.1 } });
  const fauteuil   = useElementSelectionnable({ idPiece: 'sejour', idElement: 'fauteuil',     libelle: 'Fauteuil',         defaut: { couleur: '#e8e8e8', rugosite: 0.6,  metalique: 0.05 } });
  const biblio     = useElementSelectionnable({ idPiece: 'sejour', idElement: 'bibliotheque', libelle: 'Bibliothèque',     defaut: { couleur: '#1a1a1a', rugosite: 0.2,  metalique: 0.15 } });
  const radiateur  = useElementSelectionnable({ idPiece: 'sejour', idElement: 'radiateur', equipementId: 'salon-7', defaut: { couleur: '#f3f4f6', rugosite: 0.3,  metalique: 0.2 } });
  const peintureMurs = useElementSelectionnable({ idPiece: 'sejour', idElement: 'tableauDeco', equipementId: 'salon-2', defaut: { couleur: '#1e3a5f', rugosite: 0.6,  metalique: 0 } });
  const plafonnier = useElementSelectionnable({ idPiece: 'sejour', idElement: 'plafonnier', equipementId: 'salon-10', defaut: { couleur: '#f9fafb', rugosite: 0.3,  metalique: 0 } });
  const ventilation = useElementSelectionnable({ idPiece: 'sejour', idElement: 'ventilation', equipementId: 'salon-9', defaut: { couleur: '#9ca3af', rugosite: 0.4, metalique: 0.3 } });
  const tableauElec = useElementSelectionnable({ idPiece: 'sejour', idElement: 'tableauElectrique', equipementId: 'salon-11', defaut: { couleur: '#f3f4f6', rugosite: 0.3, metalique: 0.1 } });
  const thermostat = useElementSelectionnable({ idPiece: 'sejour', idElement: 'thermostat',   libelle: 'Thermostat',       defaut: { couleur: '#e5e7eb', rugosite: 0.3,  metalique: 0 } });

  const mat = (s: ReturnType<typeof useElementSelectionnable>): MatProps => ({
    color: s.estSelectionne ? '#00e5ff' : s.materiau.couleur,
    roughness: s.materiau.rugosite,
    metalness: s.materiau.metalique,
    emissive: s.emissif,
    emissiveIntensity: s.intensiteEmissif,
  });

  const matTissu = (s: ReturnType<typeof useElementSelectionnable>): MatProps => ({
    ...mat(s),
    sheen: 1,
    sheenRoughness: 0.75,
    sheenColor: s.estSelectionne ? '#00e5ff' : s.materiau.couleur,
  });

  const matBois = (s: ReturnType<typeof useElementSelectionnable>): MatProps => ({
    ...mat(s),
    clearcoat: 0.4,
    clearcoatRoughness: 0.12,
  });

  return (
    <group>
      {/* ── Sol — séjour uniquement (X : -5.875 → -1.675 · Z : -4.875 → 1.375) ── */}
      <Sol x={-3.775} z={-1.75} largeur={4.2} profondeur={6.25}
        couleur={sol.materiau.couleur} rugosite={sol.materiau.rugosite}
        propsInteraction={sol.propsInteraction} emissif={sol.emissif} intensiteEmissif={sol.intensiteEmissif}
        filDefer={filDefer} clearcoat={0.3} clearcoatRoughness={0.15}
        reflectif={false} mirrorForce={0.28} />

      {/* ── Plafond ── */}
      {!masquerPlafond && (
        <>
          <mesh position={[-3.775, 2.8, -1.75]} rotation={[-Math.PI/2, 0, 0]}>
            <planeGeometry args={[4.2, 6.25]} />
            <meshStandardMaterial color="#6b7280" roughness={0.9} />
          </mesh>
          <mesh position={[-3.775, 2.78, -1.75]}>
            <boxGeometry args={[4.2, 0.06, 6.25]} />
            <meshStandardMaterial color="#ede8e0" roughness={0.85} />
          </mesh>
        </>
      )}

      {/* ── Éclairage ── */}
      {lumiere && (
        <rectAreaLight
          position={[-3.775, 2.76, -1.75]} rotation={[-Math.PI / 2, 0, 0]}
          width={3.0} height={4.0} intensity={2.5} color="#ffd580"
        />
      )}

      {/* ── Tapis — canapé x=-3.5, z=-1.5 | table basse z=-2.5 ── */}
      <mesh {...tapisBordure.propsInteraction} position={[-3.5, 0.004, -2.0]} rotation={[-Math.PI/2, 0, 0]}>
        <planeGeometry args={[3.2, 3.0]} />
        <meshPhysicalMaterial {...matTissu(tapisBordure)} />
      </mesh>
      <mesh {...tapis.propsInteraction} position={[-3.5, 0.006, -2.0]} rotation={[-Math.PI/2, 0, 0]} receiveShadow>
        <planeGeometry args={[3.0, 2.8]} />
        <meshPhysicalMaterial {...matTissu(tapis)} />
      </mesh>

      {/* ── Mobilier ── */}
      <Canape       propsInteraction={canape.propsInteraction}     mat={matTissu(canape)} />
      <TableBasse   propsInteraction={tableBasse.propsInteraction} mat={matBois(tableBasse)} />
      <MeubleTV     propsInteraction={meubleTV.propsInteraction}   mat={matBois(meubleTV)} />
      <Television   propsInteraction={television.propsInteraction} mat={mat(television)} />
      <Fauteuil     propsInteraction={fauteuil.propsInteraction}   mat={matTissu(fauteuil)} />
      <Bibliotheque propsInteraction={biblio.propsInteraction}     mat={matBois(biblio)} />
      <Radiateur    propsInteraction={radiateur.propsInteraction}  mat={mat(radiateur)} />

      {/* ── Robinet thermostatique du radiateur ── */}
      <RobinetThermostatique
        position={[-2.05, 0.38, -4.78]}
        rotation={[0, 0, 0]}
        idPiece="sejour"
        idElement="robinetThermoRadiateur"
        equipementId="salon-8"
      />

      <TableauDecoratif propsInteraction={peintureMurs.propsInteraction} mat={mat(peintureMurs)} />

      {/* ── Plafonnier — centre du séjour ── */}
      <group {...plafonnier.propsInteraction} position={[-3.775, 2.72, -1.75]}>
        <mesh>
          <cylinderGeometry args={[0.22, 0.18, 0.06, 20]} />
          <meshStandardMaterial
            color={plafonnier.estSelectionne ? '#00e5ff' : (lumiere ? '#fffde7' : plafonnier.materiau.couleur)}
            emissive={plafonnier.emissif !== '#000000' ? plafonnier.emissif : (lumiere ? '#ffd580' : '#000000')}
            emissiveIntensity={plafonnier.intensiteEmissif > 0 ? plafonnier.intensiteEmissif : (lumiere ? 1.8 : 0)}
            roughness={plafonnier.materiau.rugosite}
            metalness={plafonnier.materiau.metalique}
          />
        </mesh>
      </group>

      {/* ── Prises électriques (séjour uniquement, X < -1.675) ── */}
      {/* Prise 1 — mur arrière, à gauche de la TV */}
      <PriseElectrique
        position={[-4.5, 0.3, -4.86]}
        rotation={[0, 0, 0]}
        idPiece="sejour"
        idElement="prise1"
        equipementId="salon-6"
      />
      {/* Prise 2 — mur gauche, près du fauteuil */}
      <PriseElectrique
        position={[-5.86, 0.3, 0.5]}
        rotation={[0, Math.PI / 2, 0]}
        idPiece="sejour"
        idElement="prise2"
        equipementId="salon-6"
      />

      {/* ── Thermostat — mur gauche, h=1.5 m ── */}
      <group {...thermostat.propsInteraction} position={[-5.86, 1.5, -1.5]}>
        <mesh>
          <boxGeometry args={[0.02, 0.12, 0.1]} />
          <meshStandardMaterial {...mat(thermostat)} />
        </mesh>
        <mesh position={[0.012, 0.02, 0]}>
          <boxGeometry args={[0.005, 0.06, 0.06]} />
          <meshStandardMaterial {...mat(thermostat)} emissive="#22c55e" emissiveIntensity={lumiere ? 0.8 : 0} />
        </mesh>
      </group>

      {/* ── Interrupteur — mur gauche, à hauteur d'entrée ── */}
      <Interrupteur3D
        position={[-5.86, 1.2, -4.0]}
        rotation={[0, Math.PI / 2, 0]}
        idPiece="sejour"
        lumiere={lumiere}
        equipementId="salon-6"
      />

      {/* ── VMC / grille ventilation — plafond côté arrière-droit ── */}
      <group {...ventilation.propsInteraction} position={[-1.5, 2.75, 0.5]}>
        <mesh>
          <boxGeometry args={[0.25, 0.02, 0.25]} />
          <meshStandardMaterial
            color={ventilation.estSelectionne ? '#00e5ff' : ventilation.materiau.couleur}
            roughness={ventilation.materiau.rugosite}
            metalness={ventilation.materiau.metalique}
            emissive={ventilation.emissif}
            emissiveIntensity={ventilation.intensiteEmissif}
          />
        </mesh>
        {[-0.09, -0.03, 0.03, 0.09].map((x, i) => (
          <mesh key={i} position={[x, 0.015, 0]}>
            <boxGeometry args={[0.04, 0.002, 0.2]} />
            <meshStandardMaterial color="#374151" />
          </mesh>
        ))}
      </group>

      {/* ── Tableau électrique — cloison droite du séjour ── */}
      <group {...tableauElec.propsInteraction} position={[-1.78, 1.5, -4.0]}>
        <mesh>
          <boxGeometry args={[0.3, 0.4, 0.05]} />
          <meshStandardMaterial
            color={tableauElec.estSelectionne ? '#00e5ff' : tableauElec.materiau.couleur}
            roughness={tableauElec.materiau.rugosite}
            metalness={tableauElec.materiau.metalique}
            emissive={tableauElec.emissif}
            emissiveIntensity={tableauElec.intensiteEmissif}
          />
        </mesh>
        <mesh position={[0.12, 0.15, 0.03]}>
          <boxGeometry args={[0.04, 0.05, 0.01]} />
          <meshStandardMaterial color="#1f2937" />
        </mesh>
      </group>

      {/* ── Fenêtre — mur gauche (x=-5.875), centrée en z=-1.75 ── */}
      <Fenetre
        position={[-5.875, 1.4, -1.75]}
        rotation={[0, Math.PI / 2, 0]}
        largeur={1.2}
        hauteur={1.0}
        idPiece="sejour"
        idElement="fenetreSejour"
        equipementId="salon-3"
        equipementIdVolet="salon-4"
        equipementIdStore="salon-5"
      />
      {/* ── Markers orange — séjour ── */}
      <MarkerCliquable position={[-3.775, 0.05, -1.75]} equipementId="salon-1"  libelle={getEquipementNom('salon-1')}  idPiece="sejour" />
      <MarkerCliquable position={[-3.5,   2.05, -4.78]} equipementId="salon-2"  libelle={getEquipementNom('salon-2')}  idPiece="sejour" />
      <MarkerCliquable position={[-5.7,   1.6,  -1.75]} equipementId="salon-3"  libelle={getEquipementNom('salon-3')}  idPiece="sejour" />
      <MarkerCliquable position={[-5.7,   2.0,  -1.75]} equipementId="salon-4"  libelle={getEquipementNom('salon-4')}  idPiece="sejour" />
      <MarkerCliquable position={[-5.7,   2.2,  -1.75]} equipementId="salon-5"  libelle={getEquipementNom('salon-5')}  idPiece="sejour" />
      <MarkerCliquable position={[-4.5,   0.5,  -4.82]} equipementId="salon-6"  libelle={getEquipementNom('salon-6')}  idPiece="sejour" />
      <MarkerCliquable position={[-2.5,   0.55, -4.83]} equipementId="salon-7"  libelle={getEquipementNom('salon-7')}  idPiece="sejour" />
      <MarkerCliquable position={[-2.05,  0.55, -4.75]} equipementId="salon-8"  libelle={getEquipementNom('salon-8')}  idPiece="sejour" />
      <MarkerCliquable position={[-1.5,   2.75,  0.5]}  equipementId="salon-9"  libelle={getEquipementNom('salon-9')}  idPiece="sejour" />
      <MarkerCliquable position={[-3.775, 2.55, -1.75]} equipementId="salon-10" libelle={getEquipementNom('salon-10')} idPiece="sejour" />
      <MarkerCliquable position={[-1.78,  1.55, -4.0]}  equipementId="salon-11" libelle={getEquipementNom('salon-11')} idPiece="sejour" />

      <ZonePiece idPiece="sejour" nom="Séjour" x={-3.775} z={-1.75} largeur={4.2} profondeur={6.25} />
    </group>
  );
}

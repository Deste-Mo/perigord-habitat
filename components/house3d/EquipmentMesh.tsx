'use client'

import { useState } from 'react'
import { Edges } from '@react-three/drei'
import { PALETTE } from './houseData'
import type { Equipment } from './houseData'

interface EquipmentMeshProps {
  equipment: Equipment
  roomPosition: [number, number, number]
  onSelect: (eq: Equipment) => void
  isSelected: boolean
}

export function EquipmentMesh({ equipment, roomPosition, onSelect, isSelected }: EquipmentMeshProps) {
  const [hovered, setHovered] = useState(false)

  const relPos: [number, number, number] = [
    equipment.position[0] - roomPosition[0],
    equipment.position[1],
    equipment.position[2] - roomPosition[2],
  ]

  const over = (e: any) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer' }
  const out = () => { setHovered(false); document.body.style.cursor = 'auto' }
  const click = (e: any) => { e.stopPropagation(); onSelect(equipment) }

  const { size, color, type } = equipment
  const outlineColor = isSelected ? '#1e3a5f' : hovered ? '#3a6a8e' : PALETTE.outline
  const meshColor = isSelected ? '#b0c8dc' : hovered ? '#c5daea' : color

  const OBox = ({ s, c, p = [0, 0, 0] as [number, number, number] }: { s: [number, number, number]; c: string; p?: [number, number, number] }) => (
    <mesh position={p}>
      <boxGeometry args={s} />
      <meshLambertMaterial color={c} />
      <Edges threshold={15} color={outlineColor} linewidth={1} />
    </mesh>
  )

  // === SOFA ===
  if (type === 'sofa') {
    return (
      <group position={relPos} onClick={click} onPointerOver={over} onPointerOut={out}>
        <OBox s={[size[0], size[1] * 0.5, size[2]]} c={meshColor} p={[0, size[1] * 0.25, 0]} />
        <OBox s={[size[0], size[1] * 0.5, 0.12]} c={meshColor} p={[0, size[1] * 0.55, -size[2] / 2 + 0.06]} />
        <OBox s={[size[0] * 0.45, 0.1, size[2] * 0.65]} c={PALETTE.furnitureLight} p={[-size[0] * 0.25, size[1] * 0.55, 0.04]} />
        <OBox s={[size[0] * 0.45, 0.1, size[2] * 0.65]} c={PALETTE.furnitureLight} p={[size[0] * 0.25, size[1] * 0.55, 0.04]} />
        <OBox s={[0.1, size[1] * 0.35, size[2]]} c={meshColor} p={[-size[0] / 2 + 0.05, size[1] * 0.32, 0]} />
        <OBox s={[0.1, size[1] * 0.35, size[2]]} c={meshColor} p={[size[0] / 2 - 0.05, size[1] * 0.32, 0]} />
      </group>
    )
  }

  // === BED ===
  if (type === 'bed') {
    return (
      <group position={relPos} onClick={click} onPointerOver={over} onPointerOut={out}>
        <OBox s={[size[0], size[1] * 0.35, size[2]]} c={PALETTE.wood} p={[0, size[1] * 0.18, 0]} />
        <OBox s={[size[0] - 0.08, size[1] * 0.22, size[2] - 0.08]} c={meshColor} p={[0, size[1] * 0.47, 0]} />
        <OBox s={[size[0] * 0.4, 0.08, 0.45]} c={PALETTE.white} p={[-size[0] * 0.25, size[1] * 0.62, -size[2] / 2 + 0.3]} />
        <OBox s={[size[0] * 0.4, 0.08, 0.45]} c={PALETTE.white} p={[size[0] * 0.25, size[1] * 0.62, -size[2] / 2 + 0.3]} />
        <OBox s={[size[0] - 0.12, 0.05, size[2] * 0.45]} c={'#a7c3d9'} p={[0, size[1] * 0.6, size[2] * 0.12]} />
        <OBox s={[size[0], size[1] * 0.65, 0.08]} c={PALETTE.woodDark} p={[0, size[1] * 0.5, -size[2] / 2 + 0.04]} />
      </group>
    )
  }

  // === TABLE ===
  if (type === 'table') {
    return (
      <group position={relPos} onClick={click} onPointerOver={over} onPointerOut={out}>
        <OBox s={[size[0], 0.05, size[2]]} c={meshColor} p={[0, size[1], 0]} />
        {[
          [-size[0] / 2 + 0.05, size[1] / 2, -size[2] / 2 + 0.05],
          [size[0] / 2 - 0.05, size[1] / 2, -size[2] / 2 + 0.05],
          [-size[0] / 2 + 0.05, size[1] / 2, size[2] / 2 - 0.05],
          [size[0] / 2 - 0.05, size[1] / 2, size[2] / 2 - 0.05],
        ].map((p, i) => (
          <OBox key={i} s={[0.05, size[1], 0.05]} c={meshColor} p={p as [number, number, number]} />
        ))}
      </group>
    )
  }

  // === CHAIR ===
  if (type === 'chair') {
    return (
      <group position={relPos} onClick={click} onPointerOver={over} onPointerOut={out}>
        {/* Seat */}
        <OBox s={[size[0], 0.05, size[2]]} c={meshColor} p={[0, size[1] * 0.5, 0]} />
        {/* Legs */}
        {[
          [-size[0] / 2 + 0.04, size[1] * 0.25, -size[2] / 2 + 0.04],
          [size[0] / 2 - 0.04, size[1] * 0.25, -size[2] / 2 + 0.04],
          [-size[0] / 2 + 0.04, size[1] * 0.25, size[2] / 2 - 0.04],
          [size[0] / 2 - 0.04, size[1] * 0.25, size[2] / 2 - 0.04],
        ].map((p, i) => (
          <OBox key={i} s={[0.04, size[1] * 0.5, 0.04]} c={meshColor} p={p as [number, number, number]} />
        ))}
        {/* Back */}
        <OBox s={[size[0], size[1] * 0.4, 0.04]} c={meshColor} p={[0, size[1] * 0.72, -size[2] / 2 + 0.02]} />
      </group>
    )
  }

  // === TV ===
  if (type === 'tv') {
    return (
      <group position={relPos} onClick={click} onPointerOver={over} onPointerOut={out}>
        <OBox s={[size[0] + 0.3, 0.35, 0.4]} c={PALETTE.furniture} p={[0, 0.18, 0]} />
        <OBox s={[size[0], size[1], size[2]]} c={meshColor} p={[0, 0.35 + size[1] / 2, 0]} />
        <OBox s={[size[0] - 0.08, size[1] - 0.06, 0.01]} c="#2b4560" p={[0, 0.35 + size[1] / 2, size[2] / 2 + 0.01]} />
      </group>
    )
  }

  // === LAMP ===
  if (type === 'lamp') {
    return (
      <group position={relPos} onClick={click} onPointerOver={over} onPointerOut={out}>
        <mesh position={[0, 0.02, 0]}>
          <cylinderGeometry args={[0.12, 0.15, 0.04, 8]} />
          <meshLambertMaterial color={meshColor} />
          <Edges threshold={15} color={outlineColor} linewidth={1} />
        </mesh>
        <mesh position={[0, size[1] / 2, 0]}>
          <cylinderGeometry args={[0.025, 0.025, size[1], 6]} />
          <meshLambertMaterial color={PALETTE.furnitureDark} />
        </mesh>
        <mesh position={[0, size[1], 0]}>
          <cylinderGeometry args={[0.1, 0.2, 0.2, 8]} />
          <meshLambertMaterial color={meshColor} />
          <Edges threshold={15} color={outlineColor} linewidth={1} />
        </mesh>
      </group>
    )
  }

  // === FRIDGE ===
  if (type === 'fridge') {
    return (
      <group position={relPos} onClick={click} onPointerOver={over} onPointerOut={out}>
        <OBox s={[size[0], size[1], size[2]]} c={meshColor} p={[0, size[1] / 2, 0]} />
        <OBox s={[size[0] - 0.04, 0.01, 0.01]} c={outlineColor} p={[0, size[1] * 0.6, size[2] / 2 + 0.01]} />
        <OBox s={[0.03, 0.2, 0.03]} c={PALETTE.furnitureDark} p={[size[0] / 2 - 0.1, size[1] * 0.75, size[2] / 2 + 0.02]} />
        <OBox s={[0.03, 0.15, 0.03]} c={PALETTE.furnitureDark} p={[size[0] / 2 - 0.1, size[1] * 0.4, size[2] / 2 + 0.02]} />
      </group>
    )
  }

  // === SINK ===
  if (type === 'sink') {
    return (
      <group position={relPos} onClick={click} onPointerOver={over} onPointerOut={out}>
        <OBox s={size} c={meshColor} p={[0, size[1] / 2, 0]} />
        <OBox s={[size[0] * 0.55, 0.06, size[2] * 0.55]} c={PALETTE.white} p={[0, size[1], 0]} />
        <mesh position={[0, size[1] + 0.18, -size[2] / 2 + 0.06]}>
          <cylinderGeometry args={[0.02, 0.02, 0.22, 6]} />
          <meshBasicMaterial color={PALETTE.metal} />
        </mesh>
      </group>
    )
  }

  // === STOVE ===
  if (type === 'stove') {
    return (
      <group position={relPos} onClick={click} onPointerOver={over} onPointerOut={out}>
        <OBox s={size} c={meshColor} p={[0, size[1] / 2, 0]} />
        {[[-0.12, 0, -0.08], [0.12, 0, -0.08], [-0.12, 0, 0.08], [0.12, 0, 0.08]].map((p, i) => (
          <mesh key={i} position={[p[0], size[1] + 0.01, p[2]]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.04, 0.07, 8]} />
            <meshBasicMaterial color={PALETTE.outline} />
          </mesh>
        ))}
      </group>
    )
  }

  // === SHOWER ===
  if (type === 'shower') {
    return (
      <group position={relPos} onClick={click} onPointerOver={over} onPointerOut={out}>
        <OBox s={[size[0], 0.06, size[2]]} c={PALETTE.white} p={[0, 0.03, 0]} />
        <mesh position={[size[0] / 2, size[1] / 2, 0]}>
          <boxGeometry args={[0.03, size[1], size[2]]} />
          <meshBasicMaterial color={PALETTE.glass} transparent opacity={0.35} />
          <Edges threshold={15} color={outlineColor} linewidth={1} />
        </mesh>
        <mesh position={[0, size[1] / 2, size[2] / 2]}>
          <boxGeometry args={[size[0], size[1], 0.03]} />
          <meshBasicMaterial color={PALETTE.glass} transparent opacity={0.35} />
          <Edges threshold={15} color={outlineColor} linewidth={1} />
        </mesh>
        <mesh position={[-size[0] / 2 + 0.12, size[1] * 0.88, -size[2] / 2 + 0.12]}>
          <cylinderGeometry args={[0.07, 0.05, 0.04, 6]} />
          <meshLambertMaterial color={PALETTE.metal} />
        </mesh>
        {/* Shower bar */}
        <mesh position={[-size[0] / 2 + 0.12, size[1] * 0.5, -size[2] / 2 + 0.06]}>
          <cylinderGeometry args={[0.015, 0.015, size[1] * 0.7, 6]} />
          <meshBasicMaterial color={PALETTE.metal} />
        </mesh>
      </group>
    )
  }

  // === WASHER (machine à laver réaliste) ===
  if (type === 'washer') {
    const w = size[0]
    const h = size[1]
    const d = size[2]

    return (
      <group position={relPos} onClick={click} onPointerOver={over} onPointerOut={out}>
        {/* Corps principal */}
        <OBox s={[w, h, d]} c={meshColor} p={[0, h / 2, 0]} />

        {/* Panneau de contrôle (haut, face avant) */}
        <OBox s={[w - 0.04, h * 0.15, 0.02]} c={PALETTE.furniture} p={[0, h * 0.88, d / 2 + 0.01]} />

        {/* Bouton programme (molette) */}
        <mesh position={[-w * 0.25, h * 0.88, d / 2 + 0.025]}>
          <cylinderGeometry args={[0.04, 0.04, 0.02, 10]} />
          <meshLambertMaterial color={PALETTE.furnitureDark} />
          <Edges threshold={15} color={outlineColor} linewidth={1} />
        </mesh>
        {/* Indicateur sur molette */}
        <OBox s={[0.015, 0.005, 0.01]} c={PALETTE.white} p={[-w * 0.25, h * 0.88 + 0.03, d / 2 + 0.03]} />

        {/* Bouton marche/arrêt */}
        <mesh position={[w * 0.25, h * 0.88, d / 2 + 0.025]}>
          <cylinderGeometry args={[0.025, 0.025, 0.015, 8]} />
          <meshLambertMaterial color={PALETTE.red} />
        </mesh>

        {/* Petit écran digital */}
        <OBox s={[w * 0.25, h * 0.06, 0.01]} c={'#1a2a3a'} p={[0, h * 0.88, d / 2 + 0.02]} />

        {/* Hublot (anneau + vitre) */}
        <mesh position={[0, h * 0.45, d / 2 + 0.015]}>
          <torusGeometry args={[w * 0.22, 0.03, 8, 16]} />
          <meshLambertMaterial color={PALETTE.furnitureDark} />
        </mesh>
        {/* Vitre du hublot */}
        <mesh position={[0, h * 0.45, d / 2 + 0.015]} rotation={[0, 0, 0]}>
          <circleGeometry args={[w * 0.2, 12]} />
          <meshBasicMaterial color={PALETTE.glass} transparent opacity={0.4} />
        </mesh>
        {/* Reflet sur le hublot */}
        <mesh position={[-w * 0.06, h * 0.5, d / 2 + 0.02]}>
          <circleGeometry args={[0.04, 6]} />
          <meshBasicMaterial color={PALETTE.white} transparent opacity={0.3} />
        </mesh>

        {/* Tiroir à lessive */}
        <OBox s={[w * 0.3, h * 0.06, 0.04]} c={PALETTE.furniture} p={[w * 0.05, h * 0.75, d / 2 + 0.02]} />
        {/* Poignée tiroir */}
        <OBox s={[w * 0.15, 0.015, 0.02]} c={outlineColor} p={[w * 0.05, h * 0.75, d / 2 + 0.045]} />

        {/* Pieds (4 coins) */}
        {[[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([xDir, zDir], i) => (
          <mesh key={`foot-${i}`} position={[xDir * (w / 2 - 0.04), 0.015, zDir * (d / 2 - 0.04)]}>
            <cylinderGeometry args={[0.03, 0.025, 0.03, 6]} />
            <meshLambertMaterial color={PALETTE.furnitureDark} />
          </mesh>
        ))}

        {/* Tuyau d'arrivée d'eau (arrière, dépasse légèrement) */}
        <mesh position={[w * 0.2, h * 0.7, -d / 2 - 0.06]}>
          <cylinderGeometry args={[0.015, 0.015, 0.12, 5]} />
          <meshLambertMaterial color={PALETTE.metal} />
        </mesh>
        {/* Tuyau d'évacuation */}
        <mesh position={[-w * 0.2, h * 0.6, -d / 2 - 0.06]}>
          <cylinderGeometry args={[0.02, 0.02, 0.12, 5]} />
          <meshLambertMaterial color={PALETTE.furnitureDark} />
        </mesh>
      </group>
    )
  }

  // === BASKET (panier à linge) ===
  if (type === 'basket') {
    const w = size[0]
    const h = size[1]
    const d = size[2]

    return (
      <group position={relPos} onClick={click} onPointerOver={over} onPointerOut={out}>
        {/* Corps du panier (tronc de cône / osier) */}
        <mesh position={[0, h / 2, 0]}>
          <cylinderGeometry args={[w * 0.45, w * 0.38, h, 8]} />
          <meshLambertMaterial color={meshColor} />
          <Edges threshold={15} color={outlineColor} linewidth={1} />
        </mesh>

        {/* Lignes horizontales d'osier tressé */}
        {Array.from({ length: 5 }).map((_, i) => {
          const y = h * 0.15 + i * (h * 0.16)
          const r = w * 0.38 + (w * 0.07 * (i + 1) / 5)
          return (
            <mesh key={`weave-${i}`} position={[0, y, 0]}>
              <torusGeometry args={[r, 0.008, 4, 8]} />
              <meshLambertMaterial color={PALETTE.woodDark} />
            </mesh>
          )
        })}

        {/* Couvercle (légèrement soulevé / ouvert) */}
        <mesh position={[0, h + 0.02, 0]}>
          <cylinderGeometry args={[w * 0.47, w * 0.47, 0.04, 8]} />
          <meshLambertMaterial color={meshColor} />
          <Edges threshold={15} color={outlineColor} linewidth={1} />
        </mesh>

        {/* Poignée du couvercle */}
        <OBox s={[w * 0.2, 0.06, 0.03]} c={PALETTE.wood} p={[0, h + 0.06, 0]} />

        {/* Linge qui dépasse (tissu coloré) */}
        <OBox s={[w * 0.2, 0.08, 0.1]} c={PALETTE.accent} p={[w * 0.15, h + 0.02, d * 0.1]} />
        <OBox s={[0.1, 0.06, w * 0.15]} c={PALETTE.furnitureLight} p={[-w * 0.1, h + 0.01, -d * 0.08]} />
      </group>
    )
  }

  // === CABINET / SHELF ===
  if (type === 'cabinet' || type === 'shelf') {
    return (
      <group position={relPos} onClick={click} onPointerOver={over} onPointerOut={out}>
        <OBox s={size} c={meshColor} p={[0, size[1] / 2, 0]} />
        <OBox s={[0.01, size[1] * 0.8, 0.01]} c={outlineColor} p={[0, size[1] / 2, size[2] / 2 + 0.01]} />
        {/* Handles */}
        <OBox s={[0.03, 0.08, 0.03]} c={PALETTE.furnitureDark} p={[-0.08, size[1] / 2, size[2] / 2 + 0.02]} />
        <OBox s={[0.03, 0.08, 0.03]} c={PALETTE.furnitureDark} p={[0.08, size[1] / 2, size[2] / 2 + 0.02]} />
      </group>
    )
  }

  // === DESK ===
  if (type === 'desk') {
    return (
      <group position={relPos} onClick={click} onPointerOver={over} onPointerOut={out}>
        <OBox s={[size[0], 0.04, size[2]]} c={meshColor} p={[0, size[1], 0]} />
        <OBox s={[0.04, size[1], size[2]]} c={meshColor} p={[-size[0] / 2 + 0.02, size[1] / 2, 0]} />
        <OBox s={[0.04, size[1], size[2]]} c={meshColor} p={[size[0] / 2 - 0.02, size[1] / 2, 0]} />
        {/* Drawer */}
        <OBox s={[size[0] * 0.4, size[1] * 0.3, size[2] - 0.04]} c={PALETTE.furniture} p={[size[0] * 0.25, size[1] * 0.82, 0]} />
      </group>
    )
  }

  // === PLANT ===
  if (type === 'plant') {
    return (
      <group position={relPos} onClick={click} onPointerOver={over} onPointerOut={out}>
        <mesh position={[0, size[1] * 0.15, 0]}>
          <cylinderGeometry args={[size[0] * 0.38, size[0] * 0.3, size[1] * 0.3, 6]} />
          <meshLambertMaterial color={PALETTE.furniture} />
          <Edges threshold={15} color={outlineColor} linewidth={1} />
        </mesh>
        <mesh position={[0, size[1] * 0.55, 0]}>
          <sphereGeometry args={[size[0] * 0.6, 8, 6]} />
          <meshLambertMaterial color={color} />
          <Edges threshold={15} color={outlineColor} linewidth={1} />
        </mesh>
        {/* Small leaves */}
        <mesh position={[size[0] * 0.3, size[1] * 0.75, 0]}>
          <sphereGeometry args={[size[0] * 0.25, 6, 6]} />
          <meshLambertMaterial color={color} />
        </mesh>
      </group>
    )
  }

  // === RUG ===
  if (type === 'rug') {
    return (
      <group position={relPos} onClick={click} onPointerOver={over} onPointerOut={out}>
        <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[size[0], size[2]]} />
          <meshBasicMaterial color={meshColor} />
          <Edges threshold={15} color={outlineColor} linewidth={1} />
        </mesh>
      </group>
    )
  }

  // === RADIATOR ===
  if (type === 'radiator') {
    const slats = Math.floor(size[2] / 0.12) || Math.floor(size[0] / 0.12) || 4
    return (
      <group position={relPos} onClick={click} onPointerOver={over} onPointerOut={out}>
        <OBox s={size} c={meshColor} p={[0, size[1] / 2, 0]} />
        {/* Horizontal slat lines */}
        {Array.from({ length: slats }).map((_, i) => {
          const offset = -size[2] / 2 + (i + 0.5) * (size[2] / slats)
          return (
            <OBox key={i} s={[size[0] + 0.01, 0.01, 0.01]} c={outlineColor} p={[0, size[1] / 2, offset]} />
          )
        })}
      </group>
    )
  }

  // === MIRROR ===
  if (type === 'mirror') {
    return (
      <group position={relPos} onClick={click} onPointerOver={over} onPointerOut={out}>
        {/* Frame */}
        <OBox s={[size[0] + 0.06, size[1] + 0.06, size[2]]} c={PALETTE.wood} p={[0, 0, 0]} />
        {/* Glass */}
        <OBox s={[size[0], size[1], 0.01]} c={meshColor} p={[0, 0, size[2] / 2]} />
      </group>
    )
  }

  // === SHUTTER (volet battant à persiennes) ===
  if (type === 'shutter') {
    const w = size[0]
    const h = size[1]
    const d = size[2]
    const panelW = w * 0.42
    const panelH = h * 0.85
    const frameT = 0.03
    const slatCount = Math.floor(panelH / 0.07)
    const slatH = (panelH - frameT * 2) / slatCount
    const slatDepth = d * 1.2
    const shutterColor = '#8B2E3B'
    const activeColor = isSelected ? '#b0c8dc' : hovered ? '#c5daea' : shutterColor
    const hingeColor = '#2a2a2a'
    const openAngle = Math.PI / 6

    return (
      <group position={relPos} onClick={click} onPointerOver={over} onPointerOut={out}>
        {/* === FENÊTRE CENTRALE === */}
        {/* Cadre de fenêtre extérieur */}
        <OBox s={[w * 0.58, panelH + 0.08, 0.04]} c={'#f0ede8'} p={[0, 0, 0]} />
        {/* Appui de fenêtre (rebord) */}
        <OBox s={[w * 0.66, 0.04, 0.1]} c={'#e8e4de'} p={[0, -panelH / 2 - 0.02, 0.03]} />
        {/* Vitre gauche */}
        <mesh position={[-w * 0.075, 0, 0.01]}>
          <boxGeometry args={[w * 0.24, panelH - 0.06, 0.01]} />
          <meshBasicMaterial color={'#8ab4d6'} transparent opacity={0.45} />
          <Edges threshold={15} color={'#d0d0d0'} linewidth={1} />
        </mesh>
        {/* Vitre droite */}
        <mesh position={[w * 0.075, 0, 0.01]}>
          <boxGeometry args={[w * 0.24, panelH - 0.06, 0.01]} />
          <meshBasicMaterial color={'#8ab4d6'} transparent opacity={0.45} />
          <Edges threshold={15} color={'#d0d0d0'} linewidth={1} />
        </mesh>
        {/* Montant central fenêtre */}
        <OBox s={[0.025, panelH - 0.04, 0.03]} c={'#f0ede8'} p={[0, 0, 0.015]} />
        {/* Petit-bois horizontal (croisillon) */}
        <OBox s={[w * 0.52, 0.02, 0.03]} c={'#f0ede8'} p={[0, panelH * 0.15, 0.015]} />

        {/* === VOLET GAUCHE (ouvert) === */}
        <group position={[-w * 0.3, 0, 0]} rotation={[0, openAngle, 0]}>
          {/* Cadre du panneau */}
          <OBox s={[panelW, panelH, frameT]} c={activeColor} p={[-panelW / 2, 0, 0]} />
          {/* Montant gauche */}
          <OBox s={[frameT, panelH, frameT + 0.01]} c={activeColor} p={[-panelW + frameT / 2, 0, 0]} />
          {/* Montant droit */}
          <OBox s={[frameT, panelH, frameT + 0.01]} c={activeColor} p={[-frameT / 2, 0, 0]} />
          {/* Traverse haute */}
          <OBox s={[panelW, frameT, frameT + 0.01]} c={activeColor} p={[-panelW / 2, panelH / 2 - frameT / 2, 0]} />
          {/* Traverse basse */}
          <OBox s={[panelW, frameT, frameT + 0.01]} c={activeColor} p={[-panelW / 2, -panelH / 2 + frameT / 2, 0]} />
          {/* Traverse médiane */}
          <OBox s={[panelW - frameT * 2, frameT * 0.7, frameT + 0.005]} c={activeColor} p={[-panelW / 2, 0, 0]} />

          {/* Lames persiennes (partie haute) */}
          {Array.from({ length: Math.floor(slatCount / 2) }).map((_, i) => {
            const y = panelH / 2 - frameT - slatH * 0.5 - i * slatH
            if (y < frameT * 0.5) return null
            return (
              <mesh key={`ls-h-${i}`} position={[-panelW / 2, y, 0]} rotation={[Math.PI * 0.12, 0, 0]}>
                <boxGeometry args={[panelW - frameT * 2.5, slatH * 0.55, slatDepth]} />
                <meshLambertMaterial color={activeColor} />
                <Edges threshold={15} color={outlineColor} linewidth={1} />
              </mesh>
            )
          })}
          {/* Lames persiennes (partie basse) */}
          {Array.from({ length: Math.floor(slatCount / 2) }).map((_, i) => {
            const y = -frameT * 0.5 - slatH * 0.5 - i * slatH
            if (y < -panelH / 2 + frameT) return null
            return (
              <mesh key={`ls-b-${i}`} position={[-panelW / 2, y, 0]} rotation={[Math.PI * 0.12, 0, 0]}>
                <boxGeometry args={[panelW - frameT * 2.5, slatH * 0.55, slatDepth]} />
                <meshLambertMaterial color={activeColor} />
                <Edges threshold={15} color={outlineColor} linewidth={1} />
              </mesh>
            )
          })}

          {/* Charnières gauches */}
          {[-panelH * 0.32, 0, panelH * 0.32].map((yPos, i) => (
            <group key={`hinge-l-${i}`}>
              <mesh position={[0, yPos, 0]}>
                <boxGeometry args={[0.025, 0.06, 0.04]} />
                <meshLambertMaterial color={hingeColor} />
              </mesh>
              <mesh position={[0.015, yPos, 0]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.012, 0.012, 0.03, 6]} />
                <meshLambertMaterial color={hingeColor} />
              </mesh>
            </group>
          ))}

          {/* Crochet d'arrêt (espagnolette) */}
          <mesh position={[-panelW + 0.04, -panelH * 0.15, frameT / 2 + 0.01]}>
            <cylinderGeometry args={[0.008, 0.008, 0.1, 6]} />
            <meshLambertMaterial color={hingeColor} />
          </mesh>
          <mesh position={[-panelW + 0.04, -panelH * 0.2, frameT / 2 + 0.015]}>
            <boxGeometry args={[0.02, 0.02, 0.025]} />
            <meshLambertMaterial color={hingeColor} />
          </mesh>
        </group>

        {/* === VOLET DROIT (ouvert) === */}
        <group position={[w * 0.3, 0, 0]} rotation={[0, -openAngle, 0]}>
          {/* Cadre du panneau */}
          <OBox s={[panelW, panelH, frameT]} c={activeColor} p={[panelW / 2, 0, 0]} />
          {/* Montant gauche */}
          <OBox s={[frameT, panelH, frameT + 0.01]} c={activeColor} p={[frameT / 2, 0, 0]} />
          {/* Montant droit */}
          <OBox s={[panelW, panelH, frameT + 0.01]} c={activeColor} p={[panelW - frameT / 2, 0, 0]} />
          {/* Traverse haute */}
          <OBox s={[panelW, frameT, frameT + 0.01]} c={activeColor} p={[panelW / 2, panelH / 2 - frameT / 2, 0]} />
          {/* Traverse basse */}
          <OBox s={[panelW, frameT, frameT + 0.01]} c={activeColor} p={[panelW / 2, -panelH / 2 + frameT / 2, 0]} />
          {/* Traverse médiane */}
          <OBox s={[panelW - frameT * 2, frameT * 0.7, frameT + 0.005]} c={activeColor} p={[panelW / 2, 0, 0]} />

          {/* Lames persiennes (partie haute) */}
          {Array.from({ length: Math.floor(slatCount / 2) }).map((_, i) => {
            const y = panelH / 2 - frameT - slatH * 0.5 - i * slatH
            if (y < frameT * 0.5) return null
            return (
              <mesh key={`rs-h-${i}`} position={[panelW / 2, y, 0]} rotation={[Math.PI * 0.12, 0, 0]}>
                <boxGeometry args={[panelW - frameT * 2.5, slatH * 0.55, slatDepth]} />
                <meshLambertMaterial color={activeColor} />
                <Edges threshold={15} color={outlineColor} linewidth={1} />
              </mesh>
            )
          })}
          {/* Lames persiennes (partie basse) */}
          {Array.from({ length: Math.floor(slatCount / 2) }).map((_, i) => {
            const y = -frameT * 0.5 - slatH * 0.5 - i * slatH
            if (y < -panelH / 2 + frameT) return null
            return (
              <mesh key={`rs-b-${i}`} position={[panelW / 2, y, 0]} rotation={[Math.PI * 0.12, 0, 0]}>
                <boxGeometry args={[panelW - frameT * 2.5, slatH * 0.55, slatDepth]} />
                <meshLambertMaterial color={activeColor} />
                <Edges threshold={15} color={outlineColor} linewidth={1} />
              </mesh>
            )
          })}

          {/* Charnières droites */}
          {[-panelH * 0.32, 0, panelH * 0.32].map((yPos, i) => (
            <group key={`hinge-r-${i}`}>
              <mesh position={[0, yPos, 0]}>
                <boxGeometry args={[0.025, 0.06, 0.04]} />
                <meshLambertMaterial color={hingeColor} />
              </mesh>
              <mesh position={[-0.015, yPos, 0]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.012, 0.012, 0.03, 6]} />
                <meshLambertMaterial color={hingeColor} />
              </mesh>
            </group>
          ))}

          {/* Crochet d'arrêt */}
          <mesh position={[panelW - 0.04, -panelH * 0.15, frameT / 2 + 0.01]}>
            <cylinderGeometry args={[0.008, 0.008, 0.1, 6]} />
            <meshLambertMaterial color={hingeColor} />
          </mesh>
          <mesh position={[panelW - 0.04, -panelH * 0.2, frameT / 2 + 0.015]}>
            <boxGeometry args={[0.02, 0.02, 0.025]} />
            <meshLambertMaterial color={hingeColor} />
          </mesh>
        </group>

        {/* Arrêts de volet au mur (pentures basses) */}
        {[-1, 1].map((side, i) => (
          <mesh key={`stop-${i}`} position={[side * (w * 0.55), -panelH / 2 - 0.02, 0.04]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.015, 0.01, 0.06, 6]} />
            <meshLambertMaterial color={hingeColor} />
          </mesh>
        ))}
      </group>
    )
  }

  // === CURTAIN ===
  if (type === 'curtain') {
    return (
      <group position={relPos} onClick={click} onPointerOver={over} onPointerOut={out}>
        {/* Rod */}
        <mesh position={[0, size[1] / 2 + 0.05, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.02, 0.02, size[0] + 0.3, 6]} />
          <meshBasicMaterial color={PALETTE.metal} />
        </mesh>
        {/* Left curtain panel */}
        <OBox s={[size[0] * 0.35, size[1], size[2]]} c={meshColor} p={[-size[0] * 0.33, 0, 0]} />
        {/* Right curtain panel */}
        <OBox s={[size[0] * 0.35, size[1], size[2]]} c={meshColor} p={[size[0] * 0.33, 0, 0]} />
      </group>
    )
  }

  // === DOOR (porte intérieure battante) ===
  if (type === 'door') {
    const w = size[0]
    const h = size[1]
    const d = size[2]
    const frameT = 0.04
    const doorColor = isSelected ? '#b0c8dc' : hovered ? '#c5daea' : '#e8e0d4'
    const frameColor = '#f0ede8'
    const hingeColor = '#2a2a2a'
    return (
      <group position={relPos} onClick={click} onPointerOver={over} onPointerOut={out}>
        {/* === CADRE DE PORTE (dormant) === */}
        {/* Montant gauche */}
        <OBox s={[frameT, h + frameT, d + 0.02]} c={frameColor} p={[-w / 2 - frameT / 2, h / 2, 0]} />
        {/* Montant droit */}
        <OBox s={[frameT, h + frameT, d + 0.02]} c={frameColor} p={[w / 2 + frameT / 2, h / 2, 0]} />
        {/* Traverse haute (linteau) */}
        <OBox s={[w + frameT * 2, frameT, d + 0.02]} c={frameColor} p={[0, h + frameT / 2, 0]} />
        {/* Seuil */}
        <OBox s={[w + frameT * 2, 0.02, d + 0.04]} c={PALETTE.woodDark} p={[0, 0.01, 0]} />

        {/* === BATTANT (porte fermée) === */}
        <group position={[0, 0, 0]}>
          {/* Panneau principal */}
          <OBox s={[w, h, d]} c={doorColor} p={[0, h / 2, 0]} />

          {/* Moulures décoratives (2 panneaux en relief) */}
          <OBox s={[w * 0.65, h * 0.32, 0.01]} c={meshColor} p={[0, h * 0.72, d / 2 + 0.005]} />
          <OBox s={[w * 0.65, h * 0.32, 0.01]} c={meshColor} p={[0, h * 0.28, d / 2 + 0.005]} />
          {/* Moulures côté intérieur */}
          <OBox s={[w * 0.65, h * 0.32, 0.01]} c={meshColor} p={[0, h * 0.72, -d / 2 - 0.005]} />
          <OBox s={[w * 0.65, h * 0.32, 0.01]} c={meshColor} p={[0, h * 0.28, -d / 2 - 0.005]} />

          {/* Poignée (côté extérieur) */}
          <OBox s={[0.02, 0.12, 0.04]} c={PALETTE.metal} p={[w / 2 - 0.08, h * 0.48, d / 2 + 0.03]} />
          {/* Rosace de poignée */}
          <mesh position={[w / 2 - 0.08, h * 0.48, d / 2 + 0.01]}>
            <cylinderGeometry args={[0.025, 0.025, 0.01, 8]} />
            <meshLambertMaterial color={PALETTE.metal} />
          </mesh>
          {/* Poignée (côté intérieur) */}
          <OBox s={[0.02, 0.12, 0.04]} c={PALETTE.metal} p={[w / 2 - 0.08, h * 0.48, -d / 2 - 0.03]} />

          {/* Serrure (trou) */}
          <mesh position={[w / 2 - 0.08, h * 0.42, d / 2 + 0.01]}>
            <cylinderGeometry args={[0.008, 0.008, 0.02, 6]} />
            <meshLambertMaterial color={hingeColor} />
          </mesh>

          {/* Charnières (3) */}
          {[h * 0.15, h * 0.5, h * 0.85].map((yPos, i) => (
            <group key={`hinge-${i}`}>
              <mesh position={[-w / 2 + 0.01, yPos, 0]}>
                <boxGeometry args={[0.03, 0.07, d + 0.01]} />
                <meshLambertMaterial color={hingeColor} />
              </mesh>
              <mesh position={[-w / 2, yPos, 0]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.012, 0.012, 0.04, 6]} />
                <meshLambertMaterial color={hingeColor} />
              </mesh>
            </group>
          ))}
        </group>
      </group>
    )
  }

  // === PICTURE / FRAME ===
  if (type === 'picture') {
    return (
      <group position={relPos} onClick={click} onPointerOver={over} onPointerOut={out}>
        <OBox s={[size[0] + 0.04, size[1] + 0.04, size[2]]} c={PALETTE.woodDark} p={[0, 0, 0]} />
        <OBox s={[size[0], size[1], 0.01]} c={meshColor} p={[0, 0, size[2] / 2]} />
      </group>
    )
  }

  // === TOILET (WC réaliste) ===
  if (type === 'toilet') {
    const w = size[0]
    const h = size[1]
    const d = size[2]

    return (
      <group position={relPos} onClick={click} onPointerOver={over} onPointerOut={out}>
        {/* Réservoir (citerne arrière) */}
        <OBox s={[w * 0.7, h * 0.7, d * 0.25]} c={meshColor} p={[0, h * 0.45, -d / 2 + d * 0.13]} />

        {/* Couvercle du réservoir */}
        <OBox s={[w * 0.72, 0.025, d * 0.27]} c={PALETTE.white} p={[0, h * 0.82, -d / 2 + d * 0.13]} />

        {/* Bouton de chasse (double poussoir) */}
        <mesh position={[0, h * 0.85, -d / 2 + d * 0.13]}>
          <cylinderGeometry args={[0.03, 0.03, 0.02, 8]} />
          <meshLambertMaterial color={PALETTE.metal} />
        </mesh>

        {/* Cuvette (base arrondie) */}
        <mesh position={[0, h * 0.22, d * 0.08]}>
          <cylinderGeometry args={[w * 0.42, w * 0.38, h * 0.44, 8]} />
          <meshLambertMaterial color={meshColor} />
          <Edges threshold={15} color={outlineColor} linewidth={1} />
        </mesh>

        {/* Intérieur de la cuvette (creux sombre) */}
        <mesh position={[0, h * 0.46, d * 0.08]}>
          <cylinderGeometry args={[w * 0.32, w * 0.28, 0.06, 8]} />
          <meshLambertMaterial color={PALETTE.furniture} />
        </mesh>

        {/* Lunette / siège (anneau) */}
        <mesh position={[0, h * 0.48, d * 0.08]} rotation={[0, 0, 0]}>
          <torusGeometry args={[w * 0.3, 0.03, 6, 12]} />
          <meshLambertMaterial color={PALETTE.white} />
        </mesh>

        {/* Abattant (couvercle relevé, contre le réservoir) */}
        <OBox s={[w * 0.6, h * 0.45, 0.025]} c={PALETTE.white} p={[0, h * 0.6, -d * 0.15]} />

        {/* Pied / socle */}
        <OBox s={[w * 0.5, h * 0.08, d * 0.4]} c={meshColor} p={[0, h * 0.04, d * 0.05]} />

        {/* Tuyau d'arrivée d'eau (à gauche du réservoir) */}
        <mesh position={[-w * 0.4, h * 0.25, -d / 2 + d * 0.1]}>
          <cylinderGeometry args={[0.015, 0.015, h * 0.35, 5]} />
          <meshLambertMaterial color={PALETTE.metal} />
        </mesh>
        {/* Robinet d'arrêt */}
        <mesh position={[-w * 0.4, h * 0.1, -d / 2 + d * 0.1]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.02, 0.02, 0.06, 5]} />
          <meshLambertMaterial color={PALETTE.metal} />
        </mesh>

        {/* Fixation murale (vis décoratives) */}
        {[-0.08, 0.08].map((xOff, i) => (
          <mesh key={`fix-${i}`} position={[xOff, h * 0.55, -d / 2 + 0.02]}>
            <cylinderGeometry args={[0.012, 0.012, 0.02, 6]} />
            <meshLambertMaterial color={PALETTE.metal} />
          </mesh>
        ))}
      </group>
    )
  }

  // === STAIRCASE (escalier en bois de cave) ===
  if (type === 'staircase') {
    const w = size[0]   // largeur
    const h = size[1]   // hauteur totale
    const d = size[2]   // profondeur horizontale
    const stepCount = 12
    const diagLen = Math.sqrt(h * h + d * d)
    const angle = Math.atan2(h, d) // angle de l'escalier

    return (
      <group position={relPos} onClick={click} onPointerOver={over} onPointerOut={out}>
        {/* ── Limon gauche (diagonal en bois) ── */}
        <mesh
          position={[-w / 2 + 0.03, h / 2, 0]}
          rotation={[angle - Math.PI / 2, 0, 0]}
        >
          <boxGeometry args={[0.06, diagLen, 0.18]} />
          <meshLambertMaterial color={meshColor} />
          <Edges threshold={15} color={outlineColor} linewidth={1} />
        </mesh>

        {/* ── Limon droit (diagonal en bois) ── */}
        <mesh
          position={[w / 2 - 0.03, h / 2, 0]}
          rotation={[angle - Math.PI / 2, 0, 0]}
        >
          <boxGeometry args={[0.06, diagLen, 0.18]} />
          <meshLambertMaterial color={meshColor} />
          <Edges threshold={15} color={outlineColor} linewidth={1} />
        </mesh>

        {/* ── Marches en bois (ouvertes, pas de contremarche) ── */}
        {Array.from({ length: stepCount }).map((_, i) => {
          const progress = (i + 1) / (stepCount + 1)
          const y = progress * h
          const z = d / 2 - progress * d
          return (
            <OBox
              key={`step-${i}`}
              s={[w, 0.035, 0.14]}
              c={i % 2 === 0 ? meshColor : PALETTE.woodDark}
              p={[0, y, z]}
            />
          )
        })}

        {/* ── Main courante gauche (bois) ── */}
        <mesh
          position={[-w / 2 + 0.01, h / 2 + 0.45, 0]}
          rotation={[angle - Math.PI / 2, 0, 0]}
        >
          <boxGeometry args={[0.04, diagLen * 0.95, 0.04]} />
          <meshLambertMaterial color={PALETTE.woodDark} />
        </mesh>

        {/* ── Poteaux de rampe (verticaux, tous les 3 marches) ── */}
        {[0, 3, 6, 9].map((i) => {
          const progress = (i + 1) / (stepCount + 1)
          const y = progress * h
          const z = d / 2 - progress * d
          return (
            <OBox
              key={`post-${i}`}
              s={[0.04, 0.5, 0.04]}
              c={PALETTE.woodDark}
              p={[-w / 2 + 0.01, y + 0.25, z]}
            />
          )
        })}

        {/* ── Ouverture plafond (cadre au sommet de l'escalier) ── */}
        <OBox s={[w + 0.15, 0.04, d * 0.35]} c={PALETTE.outline} p={[0, h + 0.02, d / 2 - d * 0.15]} />
      </group>
    )
  }

  // === BOILER (chaudière murale) ===
  if (type === 'boiler') {
    const w = size[0]
    const h = size[1]
    const d = size[2]

    return (
      <group position={relPos} onClick={click} onPointerOver={over} onPointerOut={out}>
        {/* Corps principal (caisson blanc) */}
        <OBox s={[w, h, d]} c={meshColor} p={[0, h / 2, 0]} />

        {/* Panneau frontal légèrement en relief */}
        <OBox s={[w - 0.06, h - 0.08, 0.02]} c={PALETTE.furnitureLight} p={[0, h / 2, d / 2 + 0.01]} />

        {/* Écran / afficheur digital */}
        <OBox s={[w * 0.35, h * 0.12, 0.02]} c={'#1a2a3a'} p={[0, h * 0.72, d / 2 + 0.02]} />
        {/* Cadre écran */}
        <OBox s={[w * 0.38, 0.02, 0.02]} c={outlineColor} p={[0, h * 0.72 + h * 0.06, d / 2 + 0.025]} />
        <OBox s={[w * 0.38, 0.02, 0.02]} c={outlineColor} p={[0, h * 0.72 - h * 0.06, d / 2 + 0.025]} />

        {/* Boutons de réglage (3 ronds) */}
        {[-0.08, 0, 0.08].map((xOff, i) => (
          <mesh key={`btn-${i}`} position={[xOff, h * 0.55, d / 2 + 0.025]} rotation={[0, 0, 0]}>
            <cylinderGeometry args={[0.025, 0.025, 0.02, 8]} />
            <meshLambertMaterial color={i === 1 ? PALETTE.red : PALETTE.furnitureDark} />
          </mesh>
        ))}

        {/* Grille de ventilation (bas du panneau) */}
        {Array.from({ length: 5 }).map((_, i) => (
          <OBox
            key={`vent-${i}`}
            s={[w * 0.5, 0.008, 0.01]}
            c={PALETTE.furnitureDark}
            p={[0, h * 0.15 + i * 0.03, d / 2 + 0.02]}
          />
        ))}

        {/* Tuyaux sortant par le bas (eau chaude / retour / gaz) */}
        {[-w * 0.25, 0, w * 0.25].map((xOff, i) => (
          <mesh key={`pipe-${i}`} position={[xOff, -0.15, 0]}>
            <cylinderGeometry args={[0.025, 0.025, 0.3, 6]} />
            <meshLambertMaterial color={i === 2 ? '#c4a44a' : PALETTE.metal} />
            <Edges threshold={15} color={outlineColor} linewidth={1} />
          </mesh>
        ))}

        {/* Conduit d'évacuation (sortie haut) */}
        <mesh position={[0, h + 0.15, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.3, 8]} />
          <meshLambertMaterial color={PALETTE.metal} />
          <Edges threshold={15} color={outlineColor} linewidth={1} />
        </mesh>

        {/* Logo / marque (petit rectangle) */}
        <OBox s={[w * 0.2, 0.03, 0.01]} c={PALETTE.accent} p={[0, h * 0.88, d / 2 + 0.025]} />
      </group>
    )
  }

  // === VMC (ventilation mécanique contrôlée) ===
  if (type === 'vmc') {
    const w = size[0]
    const h = size[1]
    const d = size[2]

    return (
      <group position={relPos} onClick={click} onPointerOver={over} onPointerOut={out}>
        {/* Caisson principal (boîtier rectangulaire) */}
        <OBox s={[w, h, d]} c={meshColor} p={[0, h / 2, 0]} />

        {/* Moteur / turbine cylindrique (visible sur le dessus) */}
        <mesh position={[0, h + 0.06, 0]}>
          <cylinderGeometry args={[w * 0.35, w * 0.35, 0.12, 12]} />
          <meshLambertMaterial color={PALETTE.furnitureDark} />
          <Edges threshold={15} color={outlineColor} linewidth={1} />
        </mesh>

        {/* Grille circulaire sur le moteur */}
        <mesh position={[0, h + 0.13, 0]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[w * 0.28, w * 0.28, 0.02, 12]} />
          <meshLambertMaterial color={PALETTE.metal} />
        </mesh>
        {/* Pales de ventilateur (croix sur le dessus) */}
        <OBox s={[w * 0.5, 0.015, 0.02]} c={outlineColor} p={[0, h + 0.14, 0]} />
        <OBox s={[0.02, 0.015, d * 0.45]} c={outlineColor} p={[0, h + 0.14, 0]} />

        {/* Gaine de sortie (conduit cylindrique latéral droit) */}
        <mesh position={[w / 2 + 0.12, h * 0.65, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.06, 0.06, 0.25, 8]} />
          <meshLambertMaterial color={PALETTE.metal} />
          <Edges threshold={15} color={outlineColor} linewidth={1} />
        </mesh>

        {/* Gaine d'entrée (conduit cylindrique latéral gauche) */}
        <mesh position={[-w / 2 - 0.12, h * 0.65, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.05, 0.05, 0.25, 8]} />
          <meshLambertMaterial color={PALETTE.metal} />
          <Edges threshold={15} color={outlineColor} linewidth={1} />
        </mesh>

        {/* Grille de ventilation frontale */}
        {Array.from({ length: 4 }).map((_, i) => (
          <OBox
            key={`grill-${i}`}
            s={[w * 0.6, 0.01, 0.01]}
            c={outlineColor}
            p={[0, h * 0.25 + i * (h * 0.12), d / 2 + 0.01]}
          />
        ))}

        {/* Voyant LED (petit point vert) */}
        <mesh position={[w * 0.3, h * 0.85, d / 2 + 0.015]}>
          <sphereGeometry args={[0.02, 6, 6]} />
          <meshBasicMaterial color={'#4ade80'} />
        </mesh>

        {/* Étiquette / plaque signalétique */}
        <OBox s={[w * 0.4, h * 0.08, 0.01]} c={PALETTE.furnitureLight} p={[0, h * 0.15, d / 2 + 0.01]} />
      </group>
    )
  }

  // === WATERHEATER (cumulus / chauffe-eau) ===
  if (type === 'waterheater') {
    const w = size[0]
    const h = size[1]
    const d = size[2]
    const r = Math.min(w, d) * 0.42

    return (
      <group position={relPos} onClick={click} onPointerOver={over} onPointerOut={out}>
        {/* Ballon cylindrique principal */}
        <mesh position={[0, h / 2, 0]}>
          <cylinderGeometry args={[r, r, h, 12]} />
          <meshLambertMaterial color={meshColor} />
          <Edges threshold={15} color={outlineColor} linewidth={1} />
        </mesh>

        {/* Calotte supérieure (dôme) */}
        <mesh position={[0, h + 0.01, 0]}>
          <cylinderGeometry args={[r * 0.3, r, 0.06, 12]} />
          <meshLambertMaterial color={meshColor} />
          <Edges threshold={15} color={outlineColor} linewidth={1} />
        </mesh>

        {/* Calotte inférieure */}
        <mesh position={[0, -0.01, 0]}>
          <cylinderGeometry args={[r, r * 0.3, 0.06, 12]} />
          <meshLambertMaterial color={meshColor} />
          <Edges threshold={15} color={outlineColor} linewidth={1} />
        </mesh>

        {/* Tuyau eau froide (entrée, bleu — en bas) */}
        <mesh position={[-r * 0.4, -0.15, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.3, 6]} />
          <meshLambertMaterial color={'#4a80b0'} />
          <Edges threshold={15} color={outlineColor} linewidth={1} />
        </mesh>

        {/* Tuyau eau chaude (sortie, rouge — en haut) */}
        <mesh position={[r * 0.4, h + 0.15, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.3, 6]} />
          <meshLambertMaterial color={PALETTE.red} />
          <Edges threshold={15} color={outlineColor} linewidth={1} />
        </mesh>

        {/* Groupe de sécurité (petit bloc sur tuyau froid) */}
        <OBox s={[0.06, 0.08, 0.04]} c={PALETTE.metal} p={[-r * 0.4, 0.08, 0]} />

        {/* Thermostat / boîtier de réglage (face avant, en bas) */}
        <OBox s={[w * 0.3, h * 0.08, 0.03]} c={PALETTE.furnitureDark} p={[0, h * 0.12, r + 0.015]} />
        {/* Molette thermostat */}
        <mesh position={[0, h * 0.12, r + 0.04]}>
          <cylinderGeometry args={[0.025, 0.025, 0.02, 8]} />
          <meshLambertMaterial color={PALETTE.red} />
        </mesh>

        {/* Voyant (LED) */}
        <mesh position={[w * 0.1, h * 0.12, r + 0.035]}>
          <sphereGeometry args={[0.012, 6, 6]} />
          <meshBasicMaterial color={'#4ade80'} />
        </mesh>

        {/* Plaque signalétique */}
        <OBox s={[w * 0.25, h * 0.06, 0.01]} c={PALETTE.furniture} p={[0, h * 0.5, r + 0.01]} />

        {/* Fixations murales (2 brides) */}
        {[h * 0.25, h * 0.75].map((y, i) => (
          <OBox key={`bride-${i}`} s={[w * 0.6, 0.04, 0.06]} c={PALETTE.metal} p={[0, y, -r - 0.03]} />
        ))}
      </group>
    )
  }

  // === TREE (arbre réaliste) ===
  if (type === 'tree') {
    const w = size[0]
    const h = size[1]

    return (
      <group position={relPos} onClick={click} onPointerOver={over} onPointerOut={out}>
        {/* Tronc principal */}
        <mesh position={[0, h * 0.25, 0]}>
          <cylinderGeometry args={[w * 0.12, w * 0.18, h * 0.5, 8]} />
          <meshLambertMaterial color={PALETTE.woodDark} />
          <Edges threshold={15} color={outlineColor} linewidth={1} />
        </mesh>

        {/* Branche gauche */}
        <mesh position={[-w * 0.2, h * 0.4, 0]} rotation={[0, 0, 0.4]}>
          <cylinderGeometry args={[w * 0.04, w * 0.06, h * 0.2, 5]} />
          <meshLambertMaterial color={PALETTE.woodDark} />
        </mesh>

        {/* Branche droite */}
        <mesh position={[w * 0.2, h * 0.38, w * 0.05]} rotation={[0, 0, -0.35]}>
          <cylinderGeometry args={[w * 0.04, w * 0.06, h * 0.18, 5]} />
          <meshLambertMaterial color={PALETTE.woodDark} />
        </mesh>

        {/* Feuillage principal (grande sphère) */}
        <mesh position={[0, h * 0.65, 0]}>
          <sphereGeometry args={[w * 0.9, 8, 7]} />
          <meshLambertMaterial color={color} />
          <Edges threshold={15} color={outlineColor} linewidth={1} />
        </mesh>

        {/* Feuillage secondaire (sphère haute) */}
        <mesh position={[0, h * 0.85, 0]}>
          <sphereGeometry args={[w * 0.55, 7, 6]} />
          <meshLambertMaterial color={PALETTE.grassDark} />
          <Edges threshold={15} color={outlineColor} linewidth={1} />
        </mesh>

        {/* Feuillage latéral gauche */}
        <mesh position={[-w * 0.4, h * 0.58, 0]}>
          <sphereGeometry args={[w * 0.45, 6, 6]} />
          <meshLambertMaterial color={color} />
          <Edges threshold={15} color={outlineColor} linewidth={1} />
        </mesh>

        {/* Feuillage latéral droit */}
        <mesh position={[w * 0.35, h * 0.6, w * 0.1]}>
          <sphereGeometry args={[w * 0.5, 6, 6]} />
          <meshLambertMaterial color={PALETTE.grassDark} />
          <Edges threshold={15} color={outlineColor} linewidth={1} />
        </mesh>

        {/* Ombre au sol */}
        <mesh position={[0, 0.015, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[w * 0.8, 10]} />
          <meshBasicMaterial color={PALETTE.grassDark} transparent opacity={0.3} />
        </mesh>
      </group>
    )
  }

  // === LAWN (entretien pelouse / haies) ===
  if (type === 'lawn') {
    const w = size[0]
    const h = size[1]
    const d = size[2]

    const halfW = w / 2
    const halfD = d / 2
    const bushH = h * 0.8
    const bushThick = 0.35
    const bushColors = ['#2e7d1e', '#3a8a2a', '#257018', '#4a9c3f', '#1f6314']

    // Génère une haie rectangulaire continue le long d'un axe
    const hedgeRow = (
      axis: 'x' | 'z',
      fixedPos: number,
      range: number,
      key: string
    ) => {
      const gapW = 1.8
      const segCount = Math.max(4, Math.floor(range / 0.8))
      const segLen = range / segCount
      return Array.from({ length: segCount }).map((_, i) => {
        const t = -range / 2 + segLen * (i + 0.5)
        // Laisser un trou au centre pour l'entrée
        if (axis === 'x' && Math.abs(t) < gapW / 2) return null
        const px = axis === 'x' ? t : fixedPos
        const pz = axis === 'z' ? t : fixedPos
        const c = bushColors[i % bushColors.length]
        const hVar = bushH * (0.92 + (i % 3) * 0.06)
        const thickVar = bushThick * (0.9 + (i % 2) * 0.15)
        const bw = axis === 'x' ? segLen * 1.05 : thickVar
        const bd = axis === 'z' ? segLen * 1.05 : thickVar
        return (
          <group key={`${key}-${i}`}>
            {/* Bloc principal rectangulaire */}
            <mesh position={[px, hVar / 2, pz]}>
              <boxGeometry args={[bw, hVar, bd]} />
              <meshLambertMaterial color={c} />
            </mesh>
            {/* Couche supérieure légèrement plus large (feuillage dessus) */}
            <mesh position={[px, hVar * 0.85, pz]}>
              <boxGeometry args={[bw * 1.08, hVar * 0.25, bd * 1.08]} />
              <meshLambertMaterial color={bushColors[(i + 2) % bushColors.length]} />
            </mesh>
            {/* Petites variations de feuillage sur les faces */}
            <mesh position={[px, hVar * 0.5, pz + (axis === 'x' ? thickVar * 0.45 : 0)]}>
              <boxGeometry args={[bw * 0.6, hVar * 0.4, 0.08]} />
              <meshLambertMaterial color={bushColors[(i + 3) % bushColors.length]} />
            </mesh>
            <mesh position={[px + (axis === 'z' ? thickVar * 0.45 : 0), hVar * 0.4, pz]}>
              <boxGeometry args={[0.08, hVar * 0.35, bd * 0.6]} />
              <meshLambertMaterial color={bushColors[(i + 1) % bushColors.length]} />
            </mesh>
          </group>
        )
      })
    }

    return (
      <group position={relPos} onClick={click} onPointerOver={over} onPointerOut={out}>
        {/* Haie avant (côté opposé à la maison, +z) */}
        {hedgeRow('x', halfD, w, 'front')}

        {/* Tondeuse posée sur le gazon */}
        <OBox s={[0.25, 0.12, 0.18]} c={PALETTE.red} p={[w * 0.3, 0.06, d * 0.2]} />
        <mesh position={[w * 0.3, 0.22, d * 0.2 + 0.12]} rotation={[0.5, 0, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 0.25, 4]} />
          <meshLambertMaterial color={PALETTE.furnitureDark} />
        </mesh>
        {[[-0.1, -0.07], [-0.1, 0.07], [0.1, -0.07], [0.1, 0.07]].map(([xOff, zOff], i) => (
          <mesh key={`wheel-${i}`} position={[w * 0.3 + xOff, 0.03, d * 0.2 + zOff]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 0.02, 6]} />
            <meshLambertMaterial color={PALETTE.outline} />
          </mesh>
        ))}
      </group>
    )
  }

  // === SEPTIC (fosse septique enterrée) ===
  if (type === 'septic') {
    const w = size[0]
    const h = size[1]
    const d = size[2]

    return (
      <group position={relPos} onClick={click} onPointerOver={over} onPointerOut={out}>
        {/* Cuve principale (cylindrique, semi-enterrée) */}
        <mesh position={[0, h / 2 - 0.02, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[d * 0.4, d * 0.4, w, 12]} />
          <meshLambertMaterial color={meshColor} />
          <Edges threshold={15} color={outlineColor} linewidth={1} />
        </mesh>

        {/* Couvercle / regard circulaire (tampon) */}
        <mesh position={[0, h / 2 + d * 0.38, 0]}>
          <cylinderGeometry args={[d * 0.22, d * 0.22, 0.04, 10]} />
          <meshLambertMaterial color={PALETTE.concrete} />
          <Edges threshold={15} color={outlineColor} linewidth={1} />
        </mesh>

        {/* Poignée du tampon */}
        <OBox s={[0.12, 0.03, 0.03]} c={PALETTE.metal} p={[0, h / 2 + d * 0.42, 0]} />

        {/* Deuxième regard (plus petit, côté droit) */}
        <mesh position={[w * 0.3, h / 2 + d * 0.38, 0]}>
          <cylinderGeometry args={[d * 0.12, d * 0.12, 0.04, 8]} />
          <meshLambertMaterial color={PALETTE.concrete} />
          <Edges threshold={15} color={outlineColor} linewidth={1} />
        </mesh>

        {/* Tuyau d'entrée (côté gauche) */}
        <mesh position={[-w / 2 - 0.1, h / 2 + 0.05, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.04, 0.04, 0.25, 6]} />
          <meshLambertMaterial color={PALETTE.furnitureDark} />
          <Edges threshold={15} color={outlineColor} linewidth={1} />
        </mesh>

        {/* Tuyau de sortie (côté droit) */}
        <mesh position={[w / 2 + 0.1, h / 2 - 0.02, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.035, 0.035, 0.25, 6]} />
          <meshLambertMaterial color={PALETTE.furnitureDark} />
          <Edges threshold={15} color={outlineColor} linewidth={1} />
        </mesh>

        {/* Terre autour (base rectangulaire simulant le sol) */}
        <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[w + 0.3, d + 0.3]} />
          <meshBasicMaterial color={PALETTE.grassDark} />
          <Edges threshold={15} color={outlineColor} linewidth={1} />
        </mesh>

        {/* Ventilation (petit tuyau vertical) */}
        <mesh position={[-w * 0.25, h / 2 + d * 0.4 + 0.15, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.3, 6]} />
          <meshLambertMaterial color={PALETTE.furnitureDark} />
        </mesh>
        {/* Chapeau de ventilation */}
        <mesh position={[-w * 0.25, h / 2 + d * 0.4 + 0.32, 0]}>
          <cylinderGeometry args={[0.01, 0.04, 0.04, 6]} />
          <meshLambertMaterial color={PALETTE.furnitureDark} />
        </mesh>
      </group>
    )
  }

  // === MAILBOX (boîte aux lettres sur pied) ===
  if (type === 'mailbox') {
    const w = size[0]
    const h = size[1]
    const d = size[2]
    const boxH = h * 0.3
    const postH = h * 0.65

    return (
      <group position={relPos} onClick={click} onPointerOver={over} onPointerOut={out}>
        {/* Poteau */}
        <OBox s={[0.06, postH, 0.06]} c={PALETTE.furnitureDark} p={[0, postH / 2, 0]} />

        {/* Boîte principale */}
        <OBox s={[w, boxH, d]} c={meshColor} p={[0, postH + boxH / 2, 0]} />

        {/* Toit incliné (légèrement plus large) */}
        <OBox s={[w + 0.04, 0.03, d + 0.04]} c={PALETTE.furnitureDark} p={[0, postH + boxH + 0.015, 0]} />

        {/* Fente pour le courrier (face avant) */}
        <OBox s={[w * 0.6, 0.02, 0.02]} c={outlineColor} p={[0, postH + boxH * 0.7, d / 2 + 0.01]} />

        {/* Porte / clapet (face avant) */}
        <OBox s={[w - 0.04, boxH * 0.55, 0.015]} c={PALETTE.furniture} p={[0, postH + boxH * 0.35, d / 2 + 0.01]} />

        {/* Serrure */}
        <mesh position={[0, postH + boxH * 0.35, d / 2 + 0.025]}>
          <cylinderGeometry args={[0.015, 0.015, 0.02, 6]} />
          <meshLambertMaterial color={PALETTE.metal} />
        </mesh>

        {/* Numéro de maison */}
        <OBox s={[0.06, 0.08, 0.01]} c={PALETTE.white} p={[0, postH + boxH * 0.8, d / 2 + 0.02]} />

        {/* Petit drapeau indicateur (côté droit) */}
        <OBox s={[0.02, 0.08, 0.02]} c={PALETTE.red} p={[w / 2 + 0.02, postH + boxH * 0.6, 0]} />
        <OBox s={[0.06, 0.04, 0.015]} c={PALETTE.red} p={[w / 2 + 0.05, postH + boxH * 0.65, 0]} />
      </group>
    )
  }

  // === CAVE (simple bloc béton avec porte) ===
  if (type === 'cave') {
    const w = size[0]
    const h = size[1]
    const d = size[2]
    const doorW = w * 0.4
    const doorH = h * 0.75

    return (
      <group position={relPos} onClick={click} onPointerOver={over} onPointerOut={out}>
        {/* Bloc de béton principal */}
        <OBox s={[w, h, d]} c={meshColor} p={[0, h / 2, 0]} />

        {/* Porte (face avant) */}
        <OBox s={[doorW, doorH, 0.06]} c={PALETTE.woodDark} p={[0, doorH / 2, d / 2 + 0.01]} />
        {/* Cadre de porte */}
        <OBox s={[0.04, doorH, 0.04]} c={outlineColor} p={[-doorW / 2 - 0.02, doorH / 2, d / 2 + 0.02]} />
        <OBox s={[0.04, doorH, 0.04]} c={outlineColor} p={[doorW / 2 + 0.02, doorH / 2, d / 2 + 0.02]} />
        <OBox s={[doorW + 0.08, 0.04, 0.04]} c={outlineColor} p={[0, doorH, d / 2 + 0.02]} />
        {/* Poignée */}
        <OBox s={[0.04, 0.1, 0.04]} c={PALETTE.metal} p={[doorW / 2 - 0.08, doorH * 0.5, d / 2 + 0.05]} />
      </group>
    )
  }

  // === GARAGE ===
  if (type === 'garage') {
    const w = size[0] // largeur
    const h = size[1] // hauteur
    const d = size[2] // profondeur
    const wallT = 0.1 // épaisseur murs
    const roofT = 0.1
    const doorH = h * 0.85
    const doorW = w - wallT * 2
    const panelCount = 5 // nombre de panneaux de la porte sectionnelle

    return (
      <group position={relPos} onClick={click} onPointerOver={over} onPointerOut={out}>
        {/* Sol du garage */}
        <OBox s={[w, 0.05, d]} c={PALETTE.furnitureDark} p={[0, 0.025, 0]} />

        {/* Mur arrière */}
        <OBox s={[w, h, wallT]} c={meshColor} p={[0, h / 2, -d / 2 + wallT / 2]} />

        {/* Mur gauche */}
        <OBox s={[wallT, h, d]} c={meshColor} p={[-w / 2 + wallT / 2, h / 2, 0]} />

        {/* Mur droit */}
        <OBox s={[wallT, h, d]} c={meshColor} p={[w / 2 - wallT / 2, h / 2, 0]} />

        {/* Toit */}
        <OBox s={[w + 0.15, roofT, d + 0.15]} c={PALETTE.furnitureDark} p={[0, h + roofT / 2, 0]} />
        {/* Débord de toit avant */}
        <OBox s={[w + 0.15, roofT * 0.6, 0.2]} c={PALETTE.furnitureDark} p={[0, h + roofT * 0.3, d / 2 + 0.1]} />

        {/* Porte sectionnelle (face avant) — panneaux horizontaux */}
        {Array.from({ length: panelCount }).map((_, i) => {
          const panelH = doorH / panelCount
          const y = panelH * (i + 0.5)
          return (
            <OBox
              key={`panel-${i}`}
              s={[doorW, panelH - 0.03, 0.04]}
              c={i % 2 === 0 ? PALETTE.furnitureLight : PALETTE.furniture}
              p={[0, y, d / 2 - 0.02]}
            />
          )
        })}

        {/* Cadre de la porte */}
        {/* Montant gauche */}
        <OBox s={[0.06, doorH, 0.06]} c={outlineColor} p={[-doorW / 2, doorH / 2, d / 2]} />
        {/* Montant droit */}
        <OBox s={[0.06, doorH, 0.06]} c={outlineColor} p={[doorW / 2, doorH / 2, d / 2]} />
        {/* Linteau */}
        <OBox s={[doorW + 0.12, 0.06, 0.06]} c={outlineColor} p={[0, doorH, d / 2]} />

        {/* Poignée */}
        <OBox s={[0.15, 0.04, 0.06]} c={PALETTE.metal} p={[0, doorH * 0.15, d / 2 + 0.04]} />
      </group>
    )
  }

  // === BALCONY (balcon d'évacuation avec garde-corps et escalier) ===
  if (type === 'balcony') {
    const w = size[0]
    const h = size[1]
    const d = size[2]
    const dalleH = 0.12
    const railH = 1.0
    const railThick = 0.04
    const barDiam = 0.025
    const metalColor = isSelected ? '#8fafc8' : hovered ? '#7a9ab5' : '#4a4a4a'
    const dalleColor = isSelected ? '#b0c8dc' : hovered ? '#c5daea' : '#b0a89a'
    const grillColor = '#6a6a6a'

    return (
      <group position={relPos} onClick={click} onPointerOver={over} onPointerOut={out}>
        {/* Dalle du balcon */}
        <mesh position={[0, dalleH / 2, 0]}>
          <boxGeometry args={[w, dalleH, d]} />
          <meshLambertMaterial color={dalleColor} />
          <Edges threshold={15} color={outlineColor} linewidth={1} />
        </mesh>

        {/* Grille d'évacuation au centre */}
        <mesh position={[0, dalleH + 0.005, 0]}>
          <boxGeometry args={[0.4, 0.01, 0.4]} />
          <meshLambertMaterial color={grillColor} />
        </mesh>
        {/* Barres de la grille */}
        {Array.from({ length: 5 }).map((_, i) => (
          <mesh key={`grille-${i}`} position={[-0.16 + i * 0.08, dalleH + 0.01, 0]}>
            <boxGeometry args={[0.015, 0.008, 0.38]} />
            <meshLambertMaterial color={'#555'} />
          </mesh>
        ))}

        {/* Garde-corps avant (+z) */}
        {/* Main courante */}
        <mesh position={[0, dalleH + railH, d / 2]}>
          <boxGeometry args={[w, railThick, railThick]} />
          <meshLambertMaterial color={metalColor} />
          <Edges threshold={15} color={outlineColor} linewidth={1} />
        </mesh>
        {/* Barre basse */}
        <mesh position={[0, dalleH + 0.15, d / 2]}>
          <boxGeometry args={[w, railThick * 0.7, railThick * 0.7]} />
          <meshLambertMaterial color={metalColor} />
        </mesh>
        {/* Barreaux verticaux avant */}
        {Array.from({ length: Math.max(3, Math.floor(w / 0.15)) }).map((_, i) => {
          const count = Math.max(3, Math.floor(w / 0.15))
          const x = -w / 2 + (w / (count + 1)) * (i + 1)
          return (
            <mesh key={`bar-front-${i}`} position={[x, dalleH + railH / 2 + 0.07, d / 2]}>
              <cylinderGeometry args={[barDiam / 2, barDiam / 2, railH - 0.15, 6]} />
              <meshLambertMaterial color={metalColor} />
            </mesh>
          )
        })}

        {/* Garde-corps gauche (-x) */}
        <mesh position={[-w / 2, dalleH + railH, 0]}>
          <boxGeometry args={[railThick, railThick, d]} />
          <meshLambertMaterial color={metalColor} />
          <Edges threshold={15} color={outlineColor} linewidth={1} />
        </mesh>
        {Array.from({ length: Math.max(2, Math.floor(d / 0.15)) }).map((_, i) => {
          const count = Math.max(2, Math.floor(d / 0.15))
          const z = -d / 2 + (d / (count + 1)) * (i + 1)
          return (
            <mesh key={`bar-left-${i}`} position={[-w / 2, dalleH + railH / 2 + 0.07, z]}>
              <cylinderGeometry args={[barDiam / 2, barDiam / 2, railH - 0.15, 6]} />
              <meshLambertMaterial color={metalColor} />
            </mesh>
          )
        })}

        {/* Garde-corps droit (+x) */}
        <mesh position={[w / 2, dalleH + railH, 0]}>
          <boxGeometry args={[railThick, railThick, d]} />
          <meshLambertMaterial color={metalColor} />
          <Edges threshold={15} color={outlineColor} linewidth={1} />
        </mesh>
        {Array.from({ length: Math.max(2, Math.floor(d / 0.15)) }).map((_, i) => {
          const count = Math.max(2, Math.floor(d / 0.15))
          const z = -d / 2 + (d / (count + 1)) * (i + 1)
          return (
            <mesh key={`bar-right-${i}`} position={[w / 2, dalleH + railH / 2 + 0.07, z]}>
              <cylinderGeometry args={[barDiam / 2, barDiam / 2, railH - 0.15, 6]} />
              <meshLambertMaterial color={metalColor} />
            </mesh>
          )
        })}

        {/* Poteaux d'angle */}
        {[[-w / 2, d / 2], [w / 2, d / 2], [-w / 2, -d / 2], [w / 2, -d / 2]].map(([px, pz], i) => (
          <mesh key={`post-${i}`} position={[px, dalleH + railH / 2 + 0.07, pz]}>
            <cylinderGeometry args={[0.03, 0.03, railH + 0.05, 6]} />
            <meshLambertMaterial color={metalColor} />
          </mesh>
        ))}

        {/* Escalier d'évacuation (côté arrière, -z) */}
        {Array.from({ length: 4 }).map((_, i) => (
          <group key={`step-${i}`}>
            <mesh position={[0, dalleH - (i + 1) * (dalleH / 4) - i * 0.06, -d / 2 - 0.25 - i * 0.3]}>
              <boxGeometry args={[w * 0.6, 0.04, 0.28]} />
              <meshLambertMaterial color={metalColor} />
              <Edges threshold={15} color={outlineColor} linewidth={1} />
            </mesh>
          </group>
        ))}
      </group>
    )
  }

  // === DEFAULT BOX ===
  return (
    <group position={relPos} onClick={click} onPointerOver={over} onPointerOut={out}>
      <OBox s={size} c={meshColor} p={[0, size[1] / 2, 0]} />
    </group>
  )
}

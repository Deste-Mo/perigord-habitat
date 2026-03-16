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

  // === WASHER ===
  if (type === 'washer') {
    return (
      <group position={relPos} onClick={click} onPointerOver={over} onPointerOut={out}>
        <OBox s={size} c={meshColor} p={[0, size[1] / 2, 0]} />
        <mesh position={[0, size[1] * 0.45, size[2] / 2 + 0.01]}>
          <ringGeometry args={[0.1, 0.16, 12]} />
          <meshBasicMaterial color={PALETTE.outline} />
        </mesh>
        {/* Control panel line */}
        <OBox s={[size[0] * 0.8, 0.04, 0.01]} c={PALETTE.furnitureDark} p={[0, size[1] * 0.85, size[2] / 2 + 0.01]} />
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

  // === PICTURE / FRAME ===
  if (type === 'picture') {
    return (
      <group position={relPos} onClick={click} onPointerOver={over} onPointerOut={out}>
        <OBox s={[size[0] + 0.04, size[1] + 0.04, size[2]]} c={PALETTE.woodDark} p={[0, 0, 0]} />
        <OBox s={[size[0], size[1], 0.01]} c={meshColor} p={[0, 0, size[2] / 2]} />
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

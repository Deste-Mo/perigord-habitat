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
  const outlineColor = isSelected ? '#2563eb' : hovered ? '#4a90d9' : PALETTE.outline
  const meshColor = isSelected ? '#bfdbfe' : hovered ? '#dbeafe' : color

  // Outlined box helper
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
      <group position={[relPos[0], relPos[1], relPos[2]]} onClick={click} onPointerOver={over} onPointerOut={out}>
        {/* Base */}
        <OBox s={[size[0], size[1] * 0.5, size[2]]} c={meshColor} p={[0, size[1] * 0.25, 0]} />
        {/* Back */}
        <OBox s={[size[0], size[1] * 0.5, 0.15]} c={meshColor} p={[0, size[1] * 0.55, -size[2] / 2 + 0.08]} />
        {/* Cushions */}
        <OBox s={[size[0] * 0.45, 0.12, size[2] * 0.7]} c={PALETTE.furnitureLight} p={[-size[0] * 0.25, size[1] * 0.56, 0.05]} />
        <OBox s={[size[0] * 0.45, 0.12, size[2] * 0.7]} c={PALETTE.furnitureLight} p={[size[0] * 0.25, size[1] * 0.56, 0.05]} />
        {/* Arms */}
        <OBox s={[0.12, size[1] * 0.4, size[2]]} c={meshColor} p={[-size[0] / 2 + 0.06, size[1] * 0.35, 0]} />
        <OBox s={[0.12, size[1] * 0.4, size[2]]} c={meshColor} p={[size[0] / 2 - 0.06, size[1] * 0.35, 0]} />
      </group>
    )
  }

  // === BED ===
  if (type === 'bed') {
    return (
      <group position={relPos} onClick={click} onPointerOver={over} onPointerOut={out}>
        {/* Frame */}
        <OBox s={[size[0], size[1] * 0.4, size[2]]} c={PALETTE.wood} p={[0, size[1] * 0.2, 0]} />
        {/* Mattress */}
        <OBox s={[size[0] - 0.1, size[1] * 0.25, size[2] - 0.1]} c={meshColor} p={[0, size[1] * 0.52, 0]} />
        {/* Pillow */}
        <OBox s={[size[0] * 0.4, 0.1, 0.5]} c={PALETTE.white} p={[-size[0] * 0.25, size[1] * 0.7, -size[2] / 2 + 0.35]} />
        <OBox s={[size[0] * 0.4, 0.1, 0.5]} c={PALETTE.white} p={[size[0] * 0.25, size[1] * 0.7, -size[2] / 2 + 0.35]} />
        {/* Blanket */}
        <OBox s={[size[0] - 0.15, 0.06, size[2] * 0.5]} c={BLUE_LIGHT} p={[0, size[1] * 0.68, size[2] * 0.15]} />
        {/* Headboard */}
        <OBox s={[size[0], size[1] * 0.7, 0.08]} c={PALETTE.wood} p={[0, size[1] * 0.55, -size[2] / 2 + 0.04]} />
      </group>
    )
  }

  // === TABLE ===
  if (type === 'table') {
    return (
      <group position={relPos} onClick={click} onPointerOver={over} onPointerOut={out}>
        {/* Top */}
        <OBox s={[size[0], 0.06, size[2]]} c={meshColor} p={[0, size[1], 0]} />
        {/* Legs */}
        {[
          [-size[0] / 2 + 0.06, size[1] / 2, -size[2] / 2 + 0.06],
          [size[0] / 2 - 0.06, size[1] / 2, -size[2] / 2 + 0.06],
          [-size[0] / 2 + 0.06, size[1] / 2, size[2] / 2 - 0.06],
          [size[0] / 2 - 0.06, size[1] / 2, size[2] / 2 - 0.06],
        ].map((p, i) => (
          <OBox key={i} s={[0.06, size[1], 0.06]} c={meshColor} p={p as [number, number, number]} />
        ))}
      </group>
    )
  }

  // === TV ===
  if (type === 'tv') {
    return (
      <group position={relPos} onClick={click} onPointerOver={over} onPointerOut={out}>
        {/* TV stand */}
        <OBox s={[size[0] + 0.3, 0.4, 0.4]} c={PALETTE.furniture} p={[0, 0.2, 0]} />
        {/* Screen */}
        <OBox s={[size[0], size[1], size[2]]} c={meshColor} p={[0, 0.4 + size[1] / 2, 0]} />
        {/* Screen face */}
        <OBox s={[size[0] - 0.1, size[1] - 0.08, 0.01]} c="#1a2a3a" p={[0, 0.4 + size[1] / 2, size[2] / 2 + 0.01]} />
      </group>
    )
  }

  // === LAMP ===
  if (type === 'lamp') {
    return (
      <group position={relPos} onClick={click} onPointerOver={over} onPointerOut={out}>
        {/* Base */}
        <mesh position={[0, 0.02, 0]}>
          <cylinderGeometry args={[0.15, 0.18, 0.04, 8]} />
          <meshLambertMaterial color={meshColor} />
          <Edges threshold={15} color={outlineColor} linewidth={1} />
        </mesh>
        {/* Pole */}
        <mesh position={[0, size[1] / 2, 0]}>
          <cylinderGeometry args={[0.03, 0.03, size[1], 6]} />
          <meshLambertMaterial color={PALETTE.furnitureDark} />
        </mesh>
        {/* Shade */}
        <mesh position={[0, size[1], 0]}>
          <cylinderGeometry args={[0.15, 0.25, 0.25, 8]} />
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
        {/* Door line */}
        <OBox s={[size[0] - 0.04, 0.01, 0.01]} c={outlineColor} p={[0, size[1] * 0.6, size[2] / 2 + 0.01]} />
        {/* Handle */}
        <OBox s={[0.04, 0.3, 0.04]} c={PALETTE.furnitureDark} p={[size[0] / 2 - 0.12, size[1] * 0.75, size[2] / 2 + 0.03]} />
      </group>
    )
  }

  // === SINK ===
  if (type === 'sink') {
    return (
      <group position={relPos} onClick={click} onPointerOver={over} onPointerOut={out}>
        <OBox s={size} c={meshColor} p={[0, size[1] / 2, 0]} />
        {/* Basin */}
        <OBox s={[size[0] * 0.6, 0.08, size[2] * 0.6]} c={PALETTE.white} p={[0, size[1], 0]} />
        {/* Faucet */}
        <mesh position={[0, size[1] + 0.2, -size[2] / 2 + 0.08]}>
          <cylinderGeometry args={[0.02, 0.02, 0.25, 6]} />
          <meshBasicMaterial color={PALETTE.furnitureDark} />
        </mesh>
      </group>
    )
  }

  // === STOVE ===
  if (type === 'stove') {
    return (
      <group position={relPos} onClick={click} onPointerOver={over} onPointerOut={out}>
        <OBox s={size} c={meshColor} p={[0, size[1] / 2, 0]} />
        {/* Burners */}
        {[[-0.15, 0, -0.1], [0.15, 0, -0.1], [-0.15, 0, 0.1], [0.15, 0, 0.1]].map((p, i) => (
          <mesh key={i} position={[p[0], size[1] + 0.01, p[2]]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.06, 0.09, 8]} />
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
        {/* Base tray */}
        <OBox s={[size[0], 0.08, size[2]]} c={PALETTE.white} p={[0, 0.04, 0]} />
        {/* Glass panels */}
        <mesh position={[size[0] / 2, size[1] / 2, 0]}>
          <boxGeometry args={[0.03, size[1], size[2]]} />
          <meshBasicMaterial color="#d6e4f0" transparent opacity={0.4} />
          <Edges threshold={15} color={outlineColor} linewidth={1} />
        </mesh>
        <mesh position={[0, size[1] / 2, size[2] / 2]}>
          <boxGeometry args={[size[0], size[1], 0.03]} />
          <meshBasicMaterial color="#d6e4f0" transparent opacity={0.4} />
          <Edges threshold={15} color={outlineColor} linewidth={1} />
        </mesh>
        {/* Shower head */}
        <mesh position={[-size[0] / 2 + 0.15, size[1] * 0.85, -size[2] / 2 + 0.15]}>
          <cylinderGeometry args={[0.08, 0.06, 0.04, 6]} />
          <meshLambertMaterial color={PALETTE.furnitureDark} />
        </mesh>
      </group>
    )
  }

  // === WASHER ===
  if (type === 'washer') {
    return (
      <group position={relPos} onClick={click} onPointerOver={over} onPointerOut={out}>
        <OBox s={size} c={meshColor} p={[0, size[1] / 2, 0]} />
        {/* Door circle */}
        <mesh position={[0, size[1] * 0.45, size[2] / 2 + 0.01]} rotation={[0, 0, 0]}>
          <ringGeometry args={[0.12, 0.18, 12]} />
          <meshBasicMaterial color={PALETTE.outline} />
        </mesh>
      </group>
    )
  }

  // === CABINET / SHELF ===
  if (type === 'cabinet' || type === 'shelf') {
    return (
      <group position={relPos} onClick={click} onPointerOver={over} onPointerOut={out}>
        <OBox s={size} c={meshColor} p={[0, size[1] / 2, 0]} />
        {/* Door lines */}
        <OBox s={[0.01, size[1] * 0.85, 0.01]} c={outlineColor} p={[0, size[1] / 2, size[2] / 2 + 0.01]} />
      </group>
    )
  }

  // === DESK ===
  if (type === 'desk') {
    return (
      <group position={relPos} onClick={click} onPointerOver={over} onPointerOut={out}>
        {/* Top */}
        <OBox s={[size[0], 0.05, size[2]]} c={meshColor} p={[0, size[1], 0]} />
        {/* Legs */}
        <OBox s={[0.05, size[1], size[2]]} c={meshColor} p={[-size[0] / 2 + 0.03, size[1] / 2, 0]} />
        <OBox s={[0.05, size[1], size[2]]} c={meshColor} p={[size[0] / 2 - 0.03, size[1] / 2, 0]} />
      </group>
    )
  }

  // === PLANT ===
  if (type === 'plant') {
    return (
      <group position={relPos} onClick={click} onPointerOver={over} onPointerOut={out}>
        {/* Pot */}
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.18, 0.15, 0.4, 6]} />
          <meshLambertMaterial color={PALETTE.furniture} />
          <Edges threshold={15} color={outlineColor} linewidth={1} />
        </mesh>
        {/* Foliage */}
        <mesh position={[0, 0.7, 0]}>
          <sphereGeometry args={[0.3, 6, 6]} />
          <meshLambertMaterial color={color} />
          <Edges threshold={15} color={outlineColor} linewidth={1} />
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

  // === DEFAULT BOX ===
  return (
    <group position={relPos} onClick={click} onPointerOver={over} onPointerOut={out}>
      <OBox s={size} c={meshColor} p={[0, size[1] / 2, 0]} />
    </group>
  )
}

const BLUE_LIGHT = '#d6e4f0'

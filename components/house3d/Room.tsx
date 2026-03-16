'use client'

import { PALETTE } from './houseData'
import type { Room as RoomType } from './houseData'
import { EquipmentMesh } from './EquipmentMesh'
import type { Equipment } from './houseData'
import { Edges } from '@react-three/drei'

interface RoomProps {
  room: RoomType
  onSelectEquipment: (eq: Equipment) => void
  selectedEquipment: Equipment | null
}

export function Room({ room, onSelectEquipment, selectedEquipment }: RoomProps) {
  const wallHeight = room.size[1]
  const wallThickness = 0.08
  const isEntree = room.id === 'entree'

  return (
    <group position={room.position}>
      {/* Floor */}
      <mesh position={[room.size[0] / 2, 0.01, -room.size[2] / 2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[room.size[0], room.size[2]]} />
        <meshBasicMaterial color={room.floorColor} />
        <Edges threshold={15} color={PALETTE.outline} linewidth={1} />
      </mesh>

      {/* Back wall (far from camera) */}
      <mesh position={[room.size[0] / 2, wallHeight / 2, -room.size[2]]}>
        <boxGeometry args={[room.size[0], wallHeight, wallThickness]} />
        <meshLambertMaterial color={PALETTE.wall} />
        <Edges threshold={15} color={PALETTE.outline} linewidth={1} />
      </mesh>

      {/* Left wall (far from camera) */}
      <mesh position={[0, wallHeight / 2, -room.size[2] / 2]}>
        <boxGeometry args={[wallThickness, wallHeight, room.size[2]]} />
        <meshLambertMaterial color={PALETTE.wallInner} />
        <Edges threshold={15} color={PALETTE.outline} linewidth={1} />
      </mesh>

      {/* Right wall - only half height for visibility, or skip for some rooms */}
      {!isEntree && (
        <mesh position={[room.size[0], wallHeight / 2, -room.size[2] / 2]}>
          <boxGeometry args={[wallThickness, wallHeight, room.size[2]]} />
          <meshLambertMaterial color={PALETTE.wallInner} />
          <Edges threshold={15} color={PALETTE.outline} linewidth={1} />
        </mesh>
      )}

      {/* Equipment */}
      {room.equipment.map((eq) => (
        <EquipmentMesh
          key={eq.id}
          equipment={eq}
          roomPosition={room.position}
          onSelect={onSelectEquipment}
          isSelected={selectedEquipment?.id === eq.id}
        />
      ))}
    </group>
  )
}

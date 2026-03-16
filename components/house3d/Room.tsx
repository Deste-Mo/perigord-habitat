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
  const isExterior = room.id === 'exterieur'

  return (
    <group position={room.position}>
      {/* Floor */}
      <mesh position={[room.size[0] / 2, 0.01, -room.size[2] / 2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[room.size[0], room.size[2]]} />
        <meshBasicMaterial color={room.floorColor} />
        <Edges threshold={15} color={isExterior ? PALETTE.grassDark : PALETTE.outline} linewidth={1} />
      </mesh>

      {/* Walls — only for interior rooms */}
      {!isExterior && (
        <>
          {/* Back wall (far from camera) */}
          <mesh position={[room.size[0] / 2, wallHeight / 2, -room.size[2]]}>
            <boxGeometry args={[room.size[0], wallHeight, wallThickness]} />
            <meshBasicMaterial color={PALETTE.wall} />
            <Edges threshold={15} color={PALETTE.outline} linewidth={1} />
          </mesh>

          {/* Left wall (far from camera) */}
          <mesh position={[0, wallHeight / 2, -room.size[2] / 2]}>
            <boxGeometry args={[wallThickness, wallHeight, room.size[2]]} />
            <meshBasicMaterial color={PALETTE.wallInner} />
            <Edges threshold={15} color={PALETTE.outline} linewidth={1} />
          </mesh>

          {/* Right wall */}
          <mesh position={[room.size[0], wallHeight / 2, -room.size[2] / 2]}>
            <boxGeometry args={[wallThickness, wallHeight, room.size[2]]} />
            <meshBasicMaterial color={PALETTE.wallInner} />
            <Edges threshold={15} color={PALETTE.outline} linewidth={1} />
          </mesh>

          {/* ── Interior corner edges (on inner wall surfaces) ── */}
          {(() => {
            const wt = wallThickness / 2
            const t = 0.06
            return (
              <>
                {/* Back-left interior corner (vertical) */}
                <mesh position={[wt, wallHeight / 2, -(room.size[2] - wt)]}>
                  <boxGeometry args={[t, wallHeight + 0.01, t]} />
                  <meshBasicMaterial color={PALETTE.outline} />
                </mesh>

                {/* Back-right interior corner (vertical) */}
                <mesh position={[room.size[0] - wt, wallHeight / 2, -(room.size[2] - wt)]}>
                  <boxGeometry args={[t, wallHeight + 0.01, t]} />
                  <meshBasicMaterial color={PALETTE.outline} />
                </mesh>

                {/* Front-left corner (vertical — partition edge) */}
                <mesh position={[wt, wallHeight / 2, 0]}>
                  <boxGeometry args={[t, wallHeight + 0.01, t]} />
                  <meshBasicMaterial color={PALETTE.outline} />
                </mesh>

                {/* Front-right corner (vertical — partition edge) */}
                <mesh position={[room.size[0] - wt, wallHeight / 2, 0]}>
                  <boxGeometry args={[t, wallHeight + 0.01, t]} />
                  <meshBasicMaterial color={PALETTE.outline} />
                </mesh>

                {/* Back wall bottom (horizontal — inner face) */}
                <mesh position={[room.size[0] / 2, 0.02, -(room.size[2] - wt)]}>
                  <boxGeometry args={[room.size[0], 0.03, 0.03]} />
                  <meshBasicMaterial color={PALETTE.outline} />
                </mesh>

                {/* Left wall bottom */}
                <mesh position={[wt, 0.02, -room.size[2] / 2]}>
                  <boxGeometry args={[0.03, 0.03, room.size[2]]} />
                  <meshBasicMaterial color={PALETTE.outline} />
                </mesh>

                {/* Right wall bottom */}
                <mesh position={[room.size[0] - wt, 0.02, -room.size[2] / 2]}>
                  <boxGeometry args={[0.03, 0.03, room.size[2]]} />
                  <meshBasicMaterial color={PALETTE.outline} />
                </mesh>

                {/* Left wall top */}
                <mesh position={[wt, wallHeight, -room.size[2] / 2]}>
                  <boxGeometry args={[0.03, 0.03, room.size[2]]} />
                  <meshBasicMaterial color={PALETTE.outline} />
                </mesh>

                {/* Back wall top */}
                <mesh position={[room.size[0] / 2, wallHeight, -(room.size[2] - wt)]}>
                  <boxGeometry args={[room.size[0], 0.03, 0.03]} />
                  <meshBasicMaterial color={PALETTE.outline} />
                </mesh>

                {/* Right wall top */}
                <mesh position={[room.size[0] - wt, wallHeight, -room.size[2] / 2]}>
                  <boxGeometry args={[0.03, 0.03, room.size[2]]} />
                  <meshBasicMaterial color={PALETTE.outline} />
                </mesh>
              </>
            )
          })()}
        </>
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

'use client'

import { useState, useCallback, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { rooms, PALETTE } from './houseData'
import { Room } from './Room'
import { InfoPanel } from './InfoPanel'
import { RoomSelector } from './RoomSelector'
import type { Equipment } from './houseData'

function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[5, -0.02, -5]}>
      <planeGeometry args={[30, 25]} />
      <meshBasicMaterial color={PALETTE.background} />
    </mesh>
  )
}

function Scene({ onSelectEquipment, selectedEquipment }: {
  onSelectEquipment: (eq: Equipment) => void
  selectedEquipment: Equipment | null
}) {
  return (
    <>
      {/* Soft lighting for isometric style */}
      <ambientLight intensity={0.85} />
      <directionalLight position={[10, 15, 8]} intensity={0.4} />
      <directionalLight position={[-5, 10, -5]} intensity={0.15} />

      {/* Background matching illustration */}
      <color attach="background" args={[PALETTE.background]} />

      <Ground />

      {/* ── Interior partition vertical lines (plafond → sol) ── */}
      {/* Central cross point — where all 4 main rooms meet */}
      <mesh position={[6.1, 1.4, -5.1]}>
        <boxGeometry args={[0.04, 2.8, 0.04]} />
        <meshBasicMaterial color={PALETTE.outline} />
      </mesh>
      {/* Salon/Chambre partition — front edge */}
      <mesh position={[6.1, 1.4, 0]}>
        <boxGeometry args={[0.04, 2.8, 0.04]} />
        <meshBasicMaterial color={PALETTE.outline} />
      </mesh>
      {/* Cuisine/SDB partition — back edge (before entrée) */}
      <mesh position={[6.1, 1.4, -10.2]}>
        <boxGeometry args={[0.04, 2.8, 0.04]} />
        <meshBasicMaterial color={PALETTE.outline} />
      </mesh>
      {/* Salon/Cuisine partition — left exterior edge */}
      <mesh position={[0, 1.4, -5.1]}>
        <boxGeometry args={[0.04, 2.8, 0.04]} />
        <meshBasicMaterial color={PALETTE.outline} />
      </mesh>
      {/* Chambre/SDB partition — right exterior edge */}
      <mesh position={[11.2, 1.4, -5.1]}>
        <boxGeometry args={[0.04, 2.8, 0.04]} />
        <meshBasicMaterial color={PALETTE.outline} />
      </mesh>
      {/* Entrée left corner — where entrée meets cuisine */}
      <mesh position={[0, 1.4, -10.4]}>
        <boxGeometry args={[0.04, 2.8, 0.04]} />
        <meshBasicMaterial color={PALETTE.outline} />
      </mesh>
      {/* Entrée right corner — where entrée meets SDB */}
      <mesh position={[11.2, 1.4, -10.4]}>
        <boxGeometry args={[0.04, 2.8, 0.04]} />
        <meshBasicMaterial color={PALETTE.outline} />
      </mesh>

      {/* Rooms */}
      {rooms.map((room) => (
        <Room
          key={room.id}
          room={room}
          onSelectEquipment={onSelectEquipment}
          selectedEquipment={selectedEquipment}
        />
      ))}
    </>
  )
}

export default function HouseScene() {
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null)
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null)
  const controlsRef = useRef<any>(null)

  const handleSelectEquipment = useCallback((eq: Equipment) => {
    setSelectedEquipment(eq)
  }, [])

  const handleClosePanel = useCallback(() => {
    setSelectedEquipment(null)
  }, [])

  const handleSelectRoom = useCallback((roomId: string) => {
    setSelectedRoom(roomId)
    const room = rooms.find(r => r.id === roomId)
    if (room && controlsRef.current) {
      const target = new THREE.Vector3(
        room.position[0] + room.size[0] / 2,
        1,
        room.position[2] - room.size[2] / 2
      )
      controlsRef.current.target.copy(target)
      controlsRef.current.update()
    }
  }, [])

  // Isometric camera angle
  const d = 12
  const camPos: [number, number, number] = [d + 5, d, d + 2]

  return (
    <div className="relative w-full h-full">
      <RoomSelector
        rooms={rooms}
        selectedRoom={selectedRoom}
        onSelectRoom={handleSelectRoom}
      />

      <Canvas
        orthographic
        camera={{
          position: camPos,
          zoom: 45,
          near: 0.1,
          far: 100,
        }}
        gl={{
          antialias: true,
          powerPreference: 'low-power',
          toneMapping: THREE.NoToneMapping,
        }}
        className="!touch-none"
      >
        <Scene
          onSelectEquipment={handleSelectEquipment}
          selectedEquipment={selectedEquipment}
        />
        <OrbitControls
          ref={controlsRef}
          makeDefault
          enableDamping
          dampingFactor={0.05}
          enableRotate={false}
          minZoom={20}
          maxZoom={100}
          target={[5, 0, -4]}
        />
      </Canvas>

      <InfoPanel equipment={selectedEquipment} onClose={handleClosePanel} />

      {!selectedEquipment && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg px-4 py-2 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
          <span>Molette : zoomer</span>
          <span className="w-px h-3 bg-gray-300 dark:bg-gray-600" />
          <span>Clic + glisser : déplacer</span>
          <span className="w-px h-3 bg-gray-300 dark:bg-gray-600" />
          <span>Clic sur objet : details</span>
        </div>
      )}
    </div>
  )
}

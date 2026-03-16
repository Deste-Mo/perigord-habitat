'use client'

import { Home, UtensilsCrossed, Bed, Bath, DoorOpen } from 'lucide-react'
import type { Room } from './houseData'

const roomIcons: Record<string, React.ReactNode> = {
  salon: <Home size={18} />,
  cuisine: <UtensilsCrossed size={18} />,
  chambre: <Bed size={18} />,
  'salle-de-bain': <Bath size={18} />,
  entree: <DoorOpen size={18} />,
}

interface RoomSelectorProps {
  rooms: Room[]
  selectedRoom: string | null
  onSelectRoom: (roomId: string) => void
}

export function RoomSelector({ rooms, selectedRoom, onSelectRoom }: RoomSelectorProps) {
  return (
    <div className="absolute left-4 top-4 z-20 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-2 space-y-1 max-h-[calc(100vh-8rem)] overflow-y-auto">
      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 px-3 py-1.5 uppercase tracking-wider">
        Pièces
      </p>
      {rooms.map((room) => (
        <button
          key={room.id}
          onClick={() => onSelectRoom(room.id)}
          className={`flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-sm font-medium transition-all ${
            selectedRoom === room.id
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          <span className={selectedRoom === room.id ? 'text-white' : 'text-blue-500'}>
            {roomIcons[room.id] || <Home size={18} />}
          </span>
          <span className="hidden sm:inline">{room.name}</span>
          <span className="text-xs ml-auto opacity-60">{room.equipment.length}</span>
        </button>
      ))}
    </div>
  )
}

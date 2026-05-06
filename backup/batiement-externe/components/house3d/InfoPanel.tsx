'use client'

import { X, Zap, Lightbulb, Info } from 'lucide-react'
import type { Equipment } from './houseData'

interface InfoPanelProps {
  equipment: Equipment | null
  onClose: () => void
}

export function InfoPanel({ equipment, onClose }: InfoPanelProps) {
  if (!equipment) return null

  return (
    <div className="absolute right-4 top-4 bottom-4 w-80 max-w-[calc(100vw-2rem)] bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-20 flex flex-col animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-5">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-white font-bold text-lg leading-tight">{equipment.name}</h3>
            <p className="text-blue-100 text-xs mt-1">Cliquez ailleurs pour fermer</p>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white hover:bg-white/20 rounded-lg p-1.5 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5">
        {/* Description */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <Info size={16} className="text-blue-500 shrink-0" />
            <span className="font-semibold text-sm">Description</span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed pl-6">
            {equipment.description}
          </p>
        </div>

        {/* Energy consumption */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <Zap size={16} className="text-amber-500 shrink-0" />
            <span className="font-semibold text-sm">Consommation énergétique</span>
          </div>
          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-3 ml-6">
            <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
              {equipment.consumption}
            </p>
          </div>
        </div>

        {/* Energy saving tips */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <Lightbulb size={16} className="text-green-500 shrink-0" />
            <span className="font-semibold text-sm">Conseils d&apos;économie</span>
          </div>
          <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-xl p-3 ml-6">
            <p className="text-sm text-green-800 dark:text-green-300 leading-relaxed">
              {equipment.tips}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

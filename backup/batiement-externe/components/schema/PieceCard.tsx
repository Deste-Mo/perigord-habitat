'use client'

import { ChevronDown, ChevronUp } from 'lucide-react'
import { LucideIcon } from 'lucide-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

interface Probleme {
  nom: string
  responsable: string
  quiPaie: string
  faIcon: IconDefinition
  reference: string
  diagnostic: string[]
  solution: string
}

interface Piece {
  id: string
  nom: string
  icon?: LucideIcon
  color: string
  faIcon: IconDefinition
  problemes: Probleme[]
}

interface PieceCardProps {
  piece: Piece
  isSelected: boolean
  onSelect: () => void
  onProblemeClick: (probleme: Probleme) => void
  getResponsableColor: (responsable: string) => string
}

export default function PieceCard({ piece, isSelected, onSelect, onProblemeClick, getResponsableColor }: PieceCardProps) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 border-2 ${
        isSelected ? 'border-indigo-500 shadow-2xl' : 'border-gray-100 hover:border-gray-200'
      }`}
    >
      {/* Header */}
      <div
        className={`${piece.color} p-6 text-white cursor-pointer`}
        onClick={onSelect}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <FontAwesomeIcon icon={piece.faIcon} className="text-4xl" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">{piece.nom}</h3>
              <p className="text-white/90 text-sm mt-1">
                {piece.problemes.length} problèmes courants
              </p>
            </div>
          </div>
          {isSelected ? (
            <ChevronUp className="w-6 h-6" />
          ) : (
            <ChevronDown className="w-6 h-6" />
          )}
        </div>
      </div>

      {/* Problemes List */}
      <div
        className={`transition-all duration-300 ${
          isSelected ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}
      >
        <div className="p-6 space-y-3">
          {piece.problemes.map((probleme, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-4 rounded-xl border-2 ${getResponsableColor(
                probleme.responsable
              )} hover:scale-[1.02] transition-all cursor-pointer group`}
              onClick={(e) => {
                e.stopPropagation()
                onProblemeClick(probleme)
              }}
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="w-12 h-12 flex items-center justify-center">
                  <FontAwesomeIcon icon={probleme.faIcon} className="text-3xl text-gray-700" />
                </div>
                <div className="flex-1">
                  <span className="font-semibold text-gray-900 block">{probleme.nom}</span>
                  <span className="text-xs text-gray-600 mt-1 block">
                    Cliquez pour voir le détail
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase px-3 py-1 rounded-full bg-white/50 flex items-center gap-1">
                  {probleme.responsable === 'locataire' && <FontAwesomeIcon icon={probleme.faIcon} className="text-orange-600" />}
                  {probleme.responsable === 'bailleur' && <FontAwesomeIcon icon={probleme.faIcon} className="text-red-600" />}
                  {probleme.responsable === 'contrat' && <FontAwesomeIcon icon={probleme.faIcon} className="text-blue-600" />}
                  {probleme.responsable === 'a_verifier' && <FontAwesomeIcon icon={probleme.faIcon} className="text-gray-600" />}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer when collapsed */}
      {!isSelected && (
        <div className="px-6 pb-6">
          <div className="flex flex-wrap gap-2">
            {piece.problemes.slice(0, 3).map((probleme, index) => (
              <span
                key={index}
                className="text-xs px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 font-medium flex items-center gap-2"
              >
                <FontAwesomeIcon icon={probleme.faIcon} className="text-sm" />
                {probleme.nom.split(' ').slice(0, 2).join(' ')}
              </span>
            ))}
            {piece.problemes.length > 3 && (
              <span className="text-xs px-3 py-1.5 rounded-full bg-indigo-100 text-indigo-700 font-semibold">
                +{piece.problemes.length - 3} autres
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

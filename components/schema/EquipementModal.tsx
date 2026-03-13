'use client'

import { X, AlertCircle, Wrench, LucideIcon } from 'lucide-react'

interface Equipement {
  nom: string
  responsable: string
  icon: string
}

interface Piece {
  id: string
  nom: string
  icon: LucideIcon
  color: string
  equipements: Equipement[]
}

interface EquipementModalProps {
  piece: Piece
  onClose: () => void
  getResponsableColor: (responsable: string) => string
}

export default function EquipementModal({ piece, onClose, getResponsableColor }: EquipementModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className={`${piece.color} p-6 text-white relative`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-3">
            <piece.icon className="w-10 h-10" />
            <div>
              <h2 className="text-3xl font-bold">{piece.nom}</h2>
              <p className="text-white/90 mt-1">Sélectionnez un équipement</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-4">
            {piece.equipements.map((equipement, index) => (
              <div
                key={index}
                className={`p-5 rounded-2xl border-2 ${getResponsableColor(
                  equipement.responsable
                )} hover:scale-105 transition-all cursor-pointer group`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{equipement.icon}</span>
                    <div>
                      <h3 className="font-bold text-lg">{equipement.nom}</h3>
                      <div className="flex items-center gap-2 mt-2">
                        {equipement.responsable === 'locataire' && (
                          <>
                            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-orange-500 text-white flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" /> LOCATAIRE
                            </span>
                            <span className="text-xs text-gray-600">Vous devez intervenir</span>
                          </>
                        )}
                        {equipement.responsable === 'bailleur' && (
                          <>
                            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-red-500 text-white flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" /> BAILLEUR
                            </span>
                            <span className="text-xs text-gray-600">Le bailleur doit intervenir</span>
                          </>
                        )}
                        {equipement.responsable === 'contrat' && (
                          <>
                            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-500 text-white flex items-center gap-1">
                              <Wrench className="w-3 h-3" /> CONTRAT
                            </span>
                            <span className="text-xs text-gray-600">Sous contrat d'entretien</span>
                          </>
                        )}
                        {equipement.responsable === 'a_verifier' && (
                          <>
                            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-400 text-white flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" /> À VÉRIFIER
                            </span>
                            <span className="text-xs text-gray-600">Contactez votre agence</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <Wrench className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-colors" />
                </div>

                {/* Quick actions */}
                <div className="mt-4 flex gap-2">
                  <button className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium">
                    Voir les solutions
                  </button>
                  <button className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-indigo-600 hover:text-indigo-600 transition-colors text-sm font-medium">
                    Créer un ticket
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Info box */}
          <div className="mt-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-900">
                <p className="font-semibold mb-1">Besoin d'aide ?</p>
                <p>Cliquez sur un équipement pour voir le diagnostic détaillé, les étapes de dépannage et créer un ticket si nécessaire.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

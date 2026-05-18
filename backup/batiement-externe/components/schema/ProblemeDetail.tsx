'use client'

import { X, AlertCircle, CheckCircle2, FileText, Wrench, Euro, Scale } from 'lucide-react'
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

interface ProblemeDetailProps {
  probleme: Probleme
  onClose: () => void
  getResponsableBadge: (responsable: string) => { text: string; color: string; icon: IconDefinition }
  getQuiPaieText: (quiPaie: string) => string
}

export default function ProblemeDetail({ probleme, onClose, getResponsableBadge, getQuiPaieText }: ProblemeDetailProps) {
  const badge = getResponsableBadge(probleme.responsable)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className={`${badge.color} p-8 text-white relative`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center">
              <FontAwesomeIcon icon={probleme.faIcon} className="text-5xl" />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-2">{probleme.nom}</h2>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-sm font-bold">
                <FontAwesomeIcon icon={badge.icon} />
                {badge.text}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Qui doit intervenir */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-3 ${badge.color} rounded-xl`}>
                <Wrench className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Qui doit intervenir ?</h3>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6 border-2 border-gray-200">
              <p className="text-gray-700 text-lg font-semibold flex items-center gap-2">
                {probleme.responsable === 'locataire' && (
                  <>
                    <FontAwesomeIcon icon={badge.icon} className="text-orange-600" />
                    Vous devez intervenir (Locataire)
                  </>
                )}
                {probleme.responsable === 'bailleur' && (
                  <>
                    <FontAwesomeIcon icon={badge.icon} className="text-red-600" />
                    Le bailleur doit intervenir
                  </>
                )}
                {probleme.responsable === 'contrat' && (
                  <>
                    <FontAwesomeIcon icon={badge.icon} className="text-blue-600" />
                    Prestataire sous contrat d'entretien
                  </>
                )}
                {probleme.responsable === 'a_verifier' && (
                  <>
                    <FontAwesomeIcon icon={badge.icon} className="text-gray-600" />
                    À vérifier avec votre agence
                  </>
                )}
              </p>
            </div>
          </div>

          {/* Qui paie */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-green-500 rounded-xl">
                <Euro className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Qui paie ?</h3>
            </div>
            <div className="bg-green-50 rounded-2xl p-6 border-2 border-green-200">
              <p className="text-gray-700 text-lg font-semibold flex items-center gap-2">
                <Euro className="w-5 h-5 text-green-600" />
                {getQuiPaieText(probleme.quiPaie)}
              </p>
            </div>
          </div>

          {/* Pourquoi */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-purple-500 rounded-xl">
                <Scale className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Pourquoi ?</h3>
            </div>
            <div className="bg-purple-50 rounded-2xl p-6 border-2 border-purple-200">
              <p className="text-gray-700 text-sm flex items-center gap-2">
                <FileText className="w-4 h-4 text-purple-600" />
                {probleme.reference}
              </p>
            </div>
          </div>

          {/* Comment diagnostiquer */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-blue-500 rounded-xl">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Comment diagnostiquer ?</h3>
            </div>
            <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-200">
              <ul className="space-y-3">
                {probleme.diagnostic.map((etape, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{etape}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Solution */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-indigo-500 rounded-xl">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Solution</h3>
            </div>
            <div className="bg-indigo-50 rounded-2xl p-6 border-2 border-indigo-200">
              <p className="text-gray-700 leading-relaxed">
                {probleme.solution}
              </p>
            </div>
          </div>

          {/* Info box */}
          <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6">
            <div className="flex gap-4">
              <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
              <div className="text-sm text-amber-900">
                <p className="font-bold mb-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Besoin d'aide ?
                </p>
                <p className="mb-3">
                  Si le problème persiste ou si vous n'êtes pas sûr de pouvoir le résoudre vous-même, 
                  vous pouvez créer un ticket pour signaler le problème à votre bailleur.
                </p>
                <button className="px-6 py-3 bg-amber-600 text-white rounded-xl font-semibold hover:bg-amber-700 transition-colors">
                  Créer un ticket
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

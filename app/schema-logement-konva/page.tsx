'use client'

import dynamic from 'next/dynamic'
import { Wrench, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const HouseScene = dynamic(() => import('@/components/house3d/HouseScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400 font-medium">Chargement de la maison 3D...</p>
        <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">Préparation de la scène interactive</p>
      </div>
    </div>
  ),
})

export default function SchemaLogement3D() {
  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 shadow-sm z-40 shrink-0">
        <div className="max-w-full mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <Wrench className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                  Maison 3D Interactive
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
                  Explorez les pièces et équipements
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/schema-logement"
                className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-colors text-sm text-gray-700 dark:text-gray-300"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Version liste</span>
              </Link>
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors text-sm text-white"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* 3D Scene */}
      <div className="flex-1 relative">
        <HouseScene />
      </div>
    </div>
  )
}

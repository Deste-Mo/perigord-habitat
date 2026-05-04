"use client";

import Link from "next/link";
import { HeaderApp } from "@/components/layout/HeaderApp";
import { Wrench, Receipt, Calendar, AlertCircle, ChevronRight } from "lucide-react";

const SECTIONS = [
  {
    id: "reparations",
    title: "Réparations locatives",
    description: "Découvrez ce qui est à la charge du locataire et du propriétaire en matière de réparations.",
    icon: Wrench,
    color: "bg-blue-50 text-blue-600",
    href: "/client/qui-fait-quoi/reparations",
  },
  {
    id: "charges",
    title: "Charges récupérables",
    description: "Liste des charges que le propriétaire peut récupérer auprès du locataire.",
    icon: Receipt,
    color: "bg-green-50 text-green-600",
    href: "/client/qui-fait-quoi/charges",
  },
  {
    id: "vetuste",
    title: "Grille de vétusté",
    description: "Comprendre comment la vétusté est calculée pour l'état des lieux de sortie.",
    icon: Calendar,
    color: "bg-orange-50 text-orange-600",
    href: "/client/qui-fait-quoi/vetuste",
  },
  {
    id: "cas-particuliers",
    title: "Cas particuliers",
    description: "Situations spécifiques et exceptions aux règles générales.",
    icon: AlertCircle,
    color: "bg-purple-50 text-purple-600",
    href: "/client/qui-fait-quoi/cas-particuliers",
  },
];

export default function QuiFaitQuoiPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <HeaderApp />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
        <div className="flex flex-col gap-6">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Qui fait quoi ?</h1>
            <p className="text-muted-foreground text-sm mt-2">
              Simplifiez les règles juridiques entre locataire et propriétaire
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {SECTIONS.map((section) => {
              const Icon = section.icon;
              return (
                <Link
                  key={section.id}
                  href={section.href}
                  className="bg-card rounded-xl border border-border shadow-sm hover:shadow-md transition-all p-6 flex flex-col gap-4 group"
                >
                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${section.color}`}>
                      <Icon size={24} />
                    </div>
                    <ChevronRight size={20} className="text-muted-foreground group-hover:text-foreground transition-colors" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className="font-semibold text-foreground text-lg">{section.title}</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">{section.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="bg-accent border border-primary/20 rounded-xl p-4 mt-4">
            <p className="text-sm text-foreground">
              <span className="font-semibold">💡 Bon à savoir :</span> Ces informations sont basées sur la législation française en vigueur.
              En cas de doute, n'hésitez pas à consulter votre bailleur ou un professionnel du droit.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

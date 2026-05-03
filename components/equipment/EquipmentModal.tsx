"use client";

import { Wrench, X } from "lucide-react";
import type { Equipment } from "@/types/equipment";
import { typeRemarqueConfig } from "./equipmentTypeConfig";

interface EquipmentModalProps {
  equipment: Equipment;
  onClose: () => void;
}

export function EquipmentModal({ equipment, onClose }: EquipmentModalProps) {
  const config = typeRemarqueConfig[equipment.typeRemarque];
  const Icon = config.icon;

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-card rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-card border-b border-border p-6 flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-black text-foreground mb-1">{equipment.nom}</h2>
            <p className="text-muted-foreground text-sm">{equipment.piece}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted rounded-xl p-4">
              <p className="text-xs text-muted-foreground mb-1 font-medium uppercase tracking-wide">Responsable</p>
              <p className="font-bold text-foreground">{equipment.responsable}</p>
            </div>
            <div className="bg-muted rounded-xl p-4">
              <p className="text-xs text-muted-foreground mb-1 font-medium uppercase tracking-wide">Charge locative</p>
              <p className={`font-bold text-lg ${equipment.chargeLocative ? "text-primary" : "text-orange-600"}`}>
                {equipment.chargeLocative ? "OUI" : "NON"}
              </p>
            </div>
          </div>
          <div className={`flex items-center gap-3 p-4 rounded-xl border-2 ${config.color}`}>
            <Icon size={22} />
            <span className="font-bold">{config.label}</span>
          </div>
          {equipment.contratMaintenance && (
            <div className="bg-accent border-2 border-primary/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Wrench className="text-primary" size={18} />
                <h3 className="font-bold text-foreground">Contrat de maintenance</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Cet équipement peut être couvert par un contrat de maintenance collectif.
              </p>
            </div>
          )}
          <div className="bg-accent border-2 border-primary/20 rounded-xl p-4">
            <h3 className="font-bold text-foreground mb-2">Référence légale</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{equipment.referenceLegale}</p>
          </div>
          <div className={`border-2 rounded-xl p-4 ${config.remarkBg} ${config.remarkBorder}`}>
            <h3 className={`font-bold mb-2 ${config.remarkTitle}`}>Remarque pratique</h3>
            <p className={`text-sm leading-relaxed ${config.remarkText}`}>{equipment.remarque}</p>
          </div>
        </div>
        <div className="sticky bottom-0 bg-card border-t border-border p-6">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-foreground hover:bg-foreground/90 text-background font-semibold transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}

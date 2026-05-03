"use client";

import { Package, Wrench, Info, Pencil } from "lucide-react";
import type { Equipment } from "@/types/equipment";
import { typeRemarqueConfig } from "./equipmentTypeConfig";

interface EquipmentCardProps {
  equipment: Equipment;
  onDetails: (equipment: Equipment) => void;
  onEdit: (equipment: Equipment) => void;
}

export function EquipmentCard({ equipment, onDetails, onEdit }: EquipmentCardProps) {
  const config = typeRemarqueConfig[equipment.typeRemarque];
  const Icon = config.icon;

  return (
    <div className="bg-card rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center shrink-0">
            <Package className="text-primary" size={26} />
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 flex items-center gap-1 ${config.color}`}>
            <Icon size={14} />
            {config.label}
          </span>
        </div>
        <h3 className="text-xl font-black text-foreground mb-4 leading-tight">{equipment.nom}</h3>
        <div className="space-y-2 flex-1">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Pièce</span>
            <span className="font-semibold text-foreground">{equipment.piece}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Responsable</span>
            <span className="font-semibold text-foreground">{equipment.responsable}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Charge locative</span>
            <span className={`font-bold ${equipment.chargeLocative ? "text-primary" : "text-orange-600"}`}>
              {equipment.chargeLocative ? "OUI" : "NON"}
            </span>
          </div>
          {equipment.contratMaintenance && (
            <div className="flex items-center gap-2 text-xs bg-accent text-primary px-3 py-2 rounded-lg mt-1">
              <Wrench size={13} />
              <span className="font-medium">Contrat maintenance</span>
            </div>
          )}
        </div>
      </div>
      <div className="px-6 pb-6 pt-0 grid grid-cols-2 gap-3">
        <button
          onClick={() => onDetails(equipment)}
          className="flex items-center justify-center gap-2 py-2.5 rounded-xl
            bg-muted hover:bg-muted/80 active:bg-muted/60
            text-foreground font-semibold text-sm
            transition-all duration-150 hover:scale-[1.02] active:scale-95"
        >
          <Info size={15} />
          Détails
        </button>
        <button
          onClick={() => onEdit(equipment)}
          className="flex items-center justify-center gap-2 py-2.5 rounded-xl
            bg-primary hover:bg-primary/90 active:bg-primary/80
            text-primary-foreground font-semibold text-sm
            transition-all duration-150 hover:scale-[1.02] active:scale-95"
        >
          <Pencil size={15} />
          Modifier
        </button>
      </div>
    </div>
  );
}

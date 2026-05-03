
"use client";

import { useState } from "react";
import { AlertCircle, LogOut, Trash2, X } from "lucide-react";
import { Section } from "./Section";
import { Row } from "./Row";

interface DangerSectionProps {
  onLogout: () => void;
}

export function DangerSection({ onLogout }: DangerSectionProps) {
  const [showDelete, setShowDelete] = useState(false);
  const [confirm, setConfirm] = useState("");

  const handleCancel = () => {
    setShowDelete(false);
    setConfirm("");
  };

  return (
    <Section title="Zone de danger" icon={AlertCircle}>
      <Row label="Se déconnecter" danger onClick={onLogout}>
        <LogOut size={15} className="text-red-500" />
      </Row>

      {showDelete ? (
        <div className="px-5 py-4 space-y-3">
          <p className="text-sm text-gray-600 leading-relaxed">
            Cette action est <strong>irréversible</strong>. Tapez{" "}
            <strong>SUPPRIMER</strong> pour confirmer.
          </p>
          <input
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-red-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
            placeholder="Tapez SUPPRIMER"
          />
          <div className="flex gap-2">
            <button
              disabled={confirm !== "SUPPRIMER"}
              className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-colors disabled:opacity-40"
            >
              <Trash2 size={14} className="inline mr-1.5" />
              Supprimer définitivement
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      ) : (
        <Row label="Supprimer mon compte" danger onClick={() => setShowDelete(true)}>
          <Trash2 size={15} className="text-red-400" />
        </Row>
      )}
    </Section>
  );
}

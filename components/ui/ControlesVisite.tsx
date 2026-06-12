'use client';
import React from 'react';

export function ControlesVisite() {
  return (
    <div className="absolute top-20 left-1/2 -translate-x-1/2 pointer-events-none">
      <div className="bg-black/60 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/10">
        <div className="flex items-center gap-4 text-white/70 text-sm">
          <div className="flex items-center gap-1.5">
            <kbd className="px-2 py-1 bg-white/10 rounded text-xs font-mono">↑ ↓ ← →</kbd>
            <span>Se déplacer</span>
          </div>
          <div className="flex items-center gap-1.5">
            <kbd className="px-2 py-1 bg-white/10 rounded text-xs font-mono">Clic + glisser</kbd>
            <span>Regarder</span>
          </div>
        </div>
      </div>
    </div>
  );
}

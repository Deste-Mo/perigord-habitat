import { create } from 'zustand';

interface MarkersState {
  markersVisibles: boolean;
  setMarkersVisibles: (visible: boolean) => void;
  toggleMarkers: () => void;
  hoveredEquipementId: string | null;
  setHoveredEquipementId: (id: string | null) => void;
  pieceMarkersActive: string | null;
  setPieceMarkersActive: (piece: string | null) => void;
}

export const useMarkersVisibles = create<MarkersState>((set) => ({
  markersVisibles: false,
  setMarkersVisibles: (visible) => set({ markersVisibles: visible }),
  toggleMarkers: () => set((state) => ({ markersVisibles: !state.markersVisibles })),
  hoveredEquipementId: null,
  setHoveredEquipementId: (id) => set({ hoveredEquipementId: id }),
  pieceMarkersActive: null,
  setPieceMarkersActive: (piece) => set({
    pieceMarkersActive: piece,
    markersVisibles: piece !== null,
  }),
}));

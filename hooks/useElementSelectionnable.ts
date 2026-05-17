'use client';
import { useCallback, useState } from 'react';
import { useScene } from './useSceneStore';
import { useMarkersVisibles } from './useMarkersVisibles';
import { getEquipementNom } from '@/lib/equipements';
import type { IdPiece, Materiau } from '@/types/maison';

interface Options {
  idPiece:   IdPiece | 'exterieur';
  idElement: string;
  equipementId?: string;
  libelle?:   string;
  defaut:    Materiau;
}

export function useElementSelectionnable(opts: Options) {
  const { selectionnerObjet, getMateriau, objetSelectionne, setTooltip, setEquipementModalId } = useScene();
  const { pieceMarkersActive, hoveredEquipementId } = useMarkersVisibles();
  const [survole, setSurvole] = useState(false);

  const pieceActive = opts.idPiece === 'exterieur' || pieceMarkersActive === opts.idPiece;
  const estSelectionnable = !!opts.equipementId && pieceActive;
  const libelle = opts.equipementId ? getEquipementNom(opts.equipementId) : (opts.libelle || 'Élément');
  const materiau = getMateriau(opts.idPiece, opts.idElement, opts.defaut);
  const estSelectionne =
    objetSelectionne?.idPiece === opts.idPiece &&
    objetSelectionne?.idElement === opts.idElement;

  const survolMarqueur = estSelectionnable && !!opts.equipementId && hoveredEquipementId === opts.equipementId;

  const onClick = useCallback((e: { stopPropagation: () => void }) => {
    if (!estSelectionnable) return;
    e.stopPropagation();
    selectionnerObjet({ idPiece: opts.idPiece, idElement: opts.idElement, libelle, materiau });
    if (opts.equipementId) {
      setEquipementModalId(opts.equipementId);
    }
  }, [estSelectionnable, opts.idPiece, opts.idElement, opts.equipementId, libelle, materiau, selectionnerObjet, setEquipementModalId]);

  const onPointerOver = useCallback((e: { stopPropagation: () => void }) => {
    if (!estSelectionnable) return;
    e.stopPropagation(); 
    setSurvole(true); 
    setTooltip(libelle);
    document.body.style.cursor = 'pointer';
  }, [estSelectionnable, libelle, setTooltip]);

  const onPointerOut = useCallback(() => {
    if (!estSelectionnable) return;
    setSurvole(false); 
    setTooltip(null);
    document.body.style.cursor = 'auto';
  }, [estSelectionnable, setTooltip]);

  let emissif = '#000000';
  let intensiteEmissif = 0;
  if (estSelectionnable && estSelectionne) {
    emissif = '#00e5ff';
    intensiteEmissif = 0.55;
  } else if (estSelectionnable && survolMarqueur) {
    emissif = '#0066ff';
    intensiteEmissif = 0.4;
  } else if (estSelectionnable && survole) {
    emissif = '#aaddff';
    intensiteEmissif = 0.12;
  }

  return {
    materiau,
    estSelectionne: estSelectionnable && estSelectionne,
    survole: estSelectionnable && survole,
    survolMarqueur,
    propsInteraction: estSelectionnable ? { onClick, onPointerOver, onPointerOut } : {},
    emissif,
    intensiteEmissif,
  };
}

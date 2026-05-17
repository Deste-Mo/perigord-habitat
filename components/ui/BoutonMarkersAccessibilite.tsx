'use client';
import React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useMarkersVisibles } from '@/hooks/useMarkersVisibles';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

/**
 * Bouton pour activer/désactiver les markers orange d'accessibilité
 * Aide les personnes ayant des difficultés visuelles à repérer les éléments cliquables
 */
export function BoutonMarkersAccessibilite() {
  const { markersVisibles, toggleMarkers } = useMarkersVisibles();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={markersVisibles ? 'default' : 'outline'}
            size="icon"
            onClick={toggleMarkers}
            className="relative"
            aria-label={markersVisibles ? 'Masquer les indicateurs' : 'Afficher les indicateurs'}
          >
            {markersVisibles ? (
              <Eye className="h-5 w-5" />
            ) : (
              <EyeOff className="h-5 w-5" />
            )}
            
            {/* Indicateur visuel orange quand activé */}
            {markersVisibles && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full animate-pulse" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p className="font-medium">
            {markersVisibles ? 'Masquer' : 'Afficher'} les indicateurs orange
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Points orange qui indiquent les éléments cliquables
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

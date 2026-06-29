'use client';
import React, { useCallback } from 'react';
import { setNavMobile, type DirectionDeplacement } from '@/hooks/droneNavBus';

/**
 * Pad de navigation directionnel tactile pour le mode visite sur mobile.
 *
 * Écrit directement dans l'objet partagé `etatNavMobile` (singleton de module).
 * useDroneControls lit cet objet dans useFrame à chaque tick Three.js —
 * exactement comme moveState.current est lu pour les touches clavier.
 */

interface BoutonDirectionProps {
  direction: DirectionDeplacement;
  children: React.ReactNode;
  className?: string;
}

function BoutonDirection({ direction, children, className = '' }: BoutonDirectionProps) {
  const handlePressStart = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    setNavMobile(direction, true);
  }, [direction]);

  const handlePressEnd = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    setNavMobile(direction, false);
  }, [direction]);

  return (
    <button
      onPointerDown={handlePressStart}
      onPointerUp={handlePressEnd}
      onPointerLeave={handlePressEnd}
      onPointerCancel={handlePressEnd}
      onContextMenu={(e) => e.preventDefault()}
      className={`
        flex items-center justify-center
        w-12 h-12 rounded-xl
        bg-gray-950/70 backdrop-blur-md
        border border-white/15
        text-white/70
        active:bg-white/20 active:text-white active:border-white/30
        transition-colors duration-75
        touch-none select-none
        ${className}
      `}
      aria-label={direction}
    >
      {children}
    </button>
  );
}

const ArrowUp    = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>;
const ArrowDown  = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>;
const ArrowLeft  = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>;
const ArrowRight = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 19l7-7-7-7"/></svg>;

export function MobileNavPad() {
  return (
    <div
      className="pointer-events-auto"
      onTouchMove={(e) => e.preventDefault()}
    >
      <div className="grid grid-cols-3 gap-1.5" style={{ width: '11rem' }}>
        {/* Ligne 1 */}
        <div />
        <BoutonDirection direction="forward"><ArrowUp /></BoutonDirection>
        <div />

        {/* Ligne 2 */}
        <BoutonDirection direction="left"><ArrowLeft /></BoutonDirection>
        <div className="flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
        </div>
        <BoutonDirection direction="right"><ArrowRight /></BoutonDirection>

        {/* Ligne 3 */}
        <div />
        <BoutonDirection direction="backward"><ArrowDown /></BoutonDirection>
        <div />
      </div>
    </div>
  );
}

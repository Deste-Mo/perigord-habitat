'use client';
import React from 'react';

export function ElementsToit() {
  return (
    <group>
      {/* Antenne TV */}
      <AntenneTv position={[-3, 7.5, 2]} />
      
      {/* Parabole satellite */}
      <ParaboleSatellite position={[2, 7.2, 3]} />
      
      {/* Cheminée */}
      <Cheminee position={[4, 6.5, -2]} />
    </group>
  );
}

// ── Antenne TV ────────────────────────────────────────────────────────────────
function AntenneTv({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Mât principal */}
      <mesh position={[0, 0.8, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.03, 1.6, 8]} />
        <meshStandardMaterial color="#c0c0c0" roughness={0.4} metalness={0.8} />
      </mesh>

      {/* Éléments horizontaux (dipôles) */}
      {[0.3, 0.6, 0.9, 1.2].map((y, i) => {
        const longueur = 0.8 - i * 0.15;
        return (
          <group key={i}>
            <mesh position={[0, y, 0]} rotation={[0, 0, Math.PI/2]} castShadow>
              <cylinderGeometry args={[0.01, 0.01, longueur, 6]} />
              <meshStandardMaterial color="#a0a0a0" roughness={0.5} metalness={0.7} />
            </mesh>
          </group>
        );
      })}

      {/* Éléments verticaux */}
      {[-0.3, -0.15, 0, 0.15, 0.3].map((x, i) => (
        <mesh key={i} position={[x, 0.6, 0]} castShadow>
          <cylinderGeometry args={[0.008, 0.008, 0.6, 6]} />
          <meshStandardMaterial color="#a0a0a0" roughness={0.5} metalness={0.7} />
        </mesh>
      ))}

      {/* Base de fixation */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[0.15, 0.08, 0.15]} />
        <meshStandardMaterial color="#808080" roughness={0.6} metalness={0.5} />
      </mesh>
    </group>
  );
}

// ── Parabole satellite ────────────────────────────────────────────────────────
function ParaboleSatellite({ position }: { position: [number, number, number] }) {
  return (
    <group position={position} rotation={[Math.PI/6, Math.PI/4, 0]}>
      {/* Parabole (disque) */}
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.5, 0.5, 0.08, 24]} />
        <meshStandardMaterial color="#e0e0e0" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Intérieur de la parabole (concave) */}
      <mesh position={[0, 0.04, 0]} castShadow>
        <sphereGeometry args={[0.48, 16, 16, 0, Math.PI * 2, 0, Math.PI / 3]} />
        <meshStandardMaterial color="#f0f0f0" roughness={0.2} metalness={0.9} side={2} />
      </mesh>

      {/* Bras de support */}
      <mesh position={[0, -0.3, 0]} rotation={[Math.PI/2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.6, 8]} />
        <meshStandardMaterial color="#808080" roughness={0.5} metalness={0.7} />
      </mesh>

      {/* Tête de réception (LNB) */}
      <mesh position={[0, -0.25, 0.3]} castShadow>
        <boxGeometry args={[0.08, 0.08, 0.15]} />
        <meshStandardMaterial color="#2c3e50" roughness={0.6} metalness={0.5} />
      </mesh>

      {/* Support de fixation */}
      <mesh position={[0, -0.6, 0]} castShadow>
        <boxGeometry args={[0.12, 0.12, 0.12]} />
        <meshStandardMaterial color="#606060" roughness={0.6} metalness={0.6} />
      </mesh>

      {/* Mât de fixation au toit */}
      <mesh position={[0, -0.9, 0]} rotation={[-Math.PI/6, -Math.PI/4, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.6, 8]} />
        <meshStandardMaterial color="#808080" roughness={0.5} metalness={0.7} />
      </mesh>
    </group>
  );
}

// ── Cheminée ──────────────────────────────────────────────────────────────────
function Cheminee({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Corps de la cheminée */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <boxGeometry args={[0.6, 1.2, 0.6]} />
        <meshStandardMaterial color="#8b4513" roughness={0.9} />
      </mesh>

      {/* Couronnement */}
      <mesh position={[0, 1.25, 0]} castShadow>
        <boxGeometry args={[0.7, 0.1, 0.7]} />
        <meshStandardMaterial color="#6b3410" roughness={0.85} />
      </mesh>

      {/* Chapeau de cheminée */}
      <mesh position={[0, 1.45, 0]} castShadow>
        <boxGeometry args={[0.75, 0.08, 0.75]} />
        <meshStandardMaterial color="#4a4a4a" roughness={0.6} metalness={0.5} />
      </mesh>

      {/* Conduit intérieur */}
      <mesh position={[0, 1.35, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.2, 8]} />
        <meshStandardMaterial color="#2c2c2c" roughness={0.8} />
      </mesh>

      {/* Grille de protection */}
      <mesh position={[0, 1.38, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.18, 0.15, 8]} />
        <meshStandardMaterial 
          color="#606060" 
          roughness={0.7} 
          metalness={0.6}
          wireframe={true}
        />
      </mesh>
    </group>
  );
}

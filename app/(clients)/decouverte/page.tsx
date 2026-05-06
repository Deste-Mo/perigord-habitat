"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  ArrowLeft,
  Search,
  ChevronDown,
  ChevronUp,
  User,
  Building2,
  Wrench,
  X,
  Scale,
} from "lucide-react";
import equipementsData from "@/data/equipements.json";
import type { Equipment } from "@/types/equipment";
import { getEquipmentImage } from "@/utils/equipmentImages";

// ── Chargement dynamique (SSR désactivé pour WebGL) ──────────────────────────
const RoomPreview3D = dynamic(
  () => import("@/components/logements/RoomPreview3D").then((m) => m.RoomPreview3D),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-accent animate-pulse rounded-2xl" />
    ),
  }
);

const HousePreview3D = dynamic(
  () => import("@/components/logements/HousePreview3D").then((m) => m.HousePreview3D),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full rounded-2xl bg-primary/20 animate-pulse" />
    ),
  }
);

// ── Données ───────────────────────────────────────────────────────────────────
const ALL_EQ = equipementsData.equipements as Equipment[];

// 15 équipements aléatoires — calculés une fois au chargement du module (hors composant)
const RANDOM_SUGGESTIONS: Equipment[] = (() => {
  const arr = [...ALL_EQ];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, 15);
})();

type PieceId3D = "sejour" | "cuisine" | "chambre" | "salleDeBain" | "couloir" | null;

const PIECES: {
  id: string;
  label: string;
  piece3D: PieceId3D;
  ids: string[];
}[] = [
  { id: "general",                label: "Général",       piece3D: null,           ids: [] },
  { id: "Salon / Séjour",         label: "Pièce à vivre", piece3D: "sejour",        ids: ["Salon / Séjour"] },
  { id: "Cuisine",                label: "Cuisine",       piece3D: "cuisine",       ids: ["Cuisine"] },
  { id: "Salle de bain / Douche", label: "Salle de bain", piece3D: "salleDeBain",   ids: ["Salle de bain / Douche", "WC / Toilettes"] },
  { id: "Chambre",                label: "Chambre",       piece3D: "chambre",       ids: ["Chambre"] },
];

// ── Conseils par pièce ────────────────────────────────────────────────────────
const CONSEILS: Record<string, string[]> = {
  general: [
    "Aérez votre logement au moins 10 minutes par jour.",
    "N'obstruez pas les bouches d'aération et veillez à les nettoyer régulièrement.",
    "Signalez rapidement toute anomalie à votre bailleur.",
    "Vérifiez régulièrement l'état des joints et des serrures.",
    "Nettoyez régulièrement les peintures de votre logement.",
  ],
  "Salon / Séjour": [
    "Nettoyez régulièrement les peintures de votre logement.",
    "Ne lavez pas vos sols à grande eau et utilisez des produits adaptés à leur nature.",
    "Décollez le papier-peint existant avant d'en changer.",
    "Ne chargez pas les prises multiples.",
    "Ne purgez pas vos radiateurs vous-même.",
    "Ne démontez jamais vos radiateurs ou convecteurs, ne posez pas de linge ou tablette dessus.",
  ],
  Cuisine: [
    "Le crépi, les dalles de liège ou de polystyrène sont interdits car dangereux en cas d'incendie.",
    "Ne percez surtout pas les coffres à volet roulant et les encadrements de fenêtres.",
    "Nettoyez régulièrement les filtres de votre hotte aspirante.",
    "Ne versez pas de produit corrosif dans les canalisations.",
    "Vérifiez régulièrement les joints de votre robinetterie.",
  ],
  "Salle de bain / Douche": [
    "Vérifiez et remplacez régulièrement les joints silicone autour de la douche et du lavabo.",
    "Nettoyez les grilles de ventilation pour éviter l'humidité.",
    "Détartrez régulièrement vos robinets et pommeaux de douche.",
    "Aérez la pièce après chaque douche pour éviter les moisissures.",
    "Détartrez régulièrement la cuvette.",
    "Ne jetez rien d'autre que du papier toilette dans les WC.",
  ],
  Chambre: [
    "Aérez votre chambre chaque matin au moins 10 minutes.",
    "Nettoyez régulièrement les grilles de ventilation.",
    "Entretenez les charnières et poignées de portes et fenêtres.",
    "Vérifiez l'état des volets et signalez tout dysfonctionnement.",
  ],
};

// ── FAQ ───────────────────────────────────────────────────────────────────────
const FAQ = [
  {
    q: "J'ai un dégât des eaux, que dois-je faire ?",
    a: "Prévenez votre assureur dans les 5 jours en lui adressant une lettre recommandée avec accusé de réception décrivant précisément les dommages, la cause apparente du sinistre et sa date. Si l'inondation a causé des dégâts chez votre voisin, établissez un constat amiable.",
  },
  {
    q: "Mon chauffage ne chauffe pas beaucoup, comment faire ?",
    a: "Vérifiez d'abord que le thermostat est correctement réglé. Contactez votre gardien qui établira un premier diagnostic et fera intervenir une entreprise si nécessaire.",
  },
  {
    q: "Mes charges ont augmenté sans que j'en sois averti, que faire ?",
    a: "Contactez votre agence directement afin d'avoir le détail des charges de votre logement.",
  },
  {
    q: "Mes toilettes sont bouchées, qui dois-je contacter en urgence ?",
    a: "Contactez votre gardien le plus rapidement possible pour qu'il puisse faire intervenir une entreprise.",
  },
  {
    q: "Je n'ai plus d'eau chaude, comment faire ?",
    a: "Vérifiez d'abord que votre chauffe-eau est bien fonctionnel. Si le problème persiste, contactez votre gardien qui établira un premier diagnostic.",
  },
];

// ── Config responsable ────────────────────────────────────────────────────────
const RESP_CFG = {
  locataire: {
    label: "Locataire",
    dot: "bg-yellow-400",
    badge: "bg-yellow-500/10 text-yellow-500 border-yellow-500/30",
    icon: User,
    text: "text-yellow-500",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/30",
  },
  bailleur: {
    label: "Bailleur",
    dot: "bg-blue-500",
    badge: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    icon: Building2,
    text: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
  },
  contrat: {
    label: "Contrat",
    dot: "bg-purple-500",
    badge: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    icon: Wrench,
    text: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/30",
  },
} as const;

// Note: La fonction getImageUrl a été remplacée par getEquipmentImage() 
// importée depuis @/utils/equipmentImages
// Cette nouvelle fonction utilise des images locales avec fallback vers Unsplash

// ── EqCard ────────────────────────────────────────────────────────────────────
function EqCard({
  eq,
  onClick,
  highlighted = false,
}: {
  eq: Equipment;
  onClick: (e: Equipment) => void;
  highlighted?: boolean;
}) {
  const cfg = RESP_CFG[eq.typeRemarque];
  const Icon = cfg.icon;

  return (
    <button
      id={`eq-card-${eq.id}`}
      onClick={() => onClick(eq)}
      className={`group rounded-xl border transition-all overflow-hidden text-left flex flex-col ${
        highlighted
          ? "ring-2 ring-primary scale-105 border-primary bg-primary/5 shadow-lg"
          : "bg-card border-border hover:border-primary/50 hover:shadow-md"
      }`}
    >
      {/* Image */}
      <div className="h-28 relative overflow-hidden bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={getEquipmentImage(eq.nom)}
          alt={eq.nom}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Badge responsable en overlay */}
        <div
          className={`absolute top-1.5 right-1.5 inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold border backdrop-blur-sm ${cfg.badge}`}
        >
          <Icon size={9} />
          {cfg.label}
        </div>
      </div>
      {/* Nom */}
      <div className="p-2.5 flex-1 flex items-start">
        <p className="text-xs font-semibold text-foreground leading-tight line-clamp-2">
          {eq.nom}
        </p>
      </div>
    </button>
  );
}

// ── Modal détail équipement ───────────────────────────────────────────────────
function EquipementModal({
  eq,
  onClose,
}: {
  eq: Equipment;
  onClose: () => void;
}) {
  const cfg = RESP_CFG[eq.typeRemarque];
  const Icon = cfg.icon;

  return (
    <div
      className="fixed inset-0 bg-black/70 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        className="bg-card w-full sm:max-w-lg sm:rounded-2xl rounded-t-3xl shadow-2xl flex flex-col max-h-[90vh] border border-border"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle mobile */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 rounded-full bg-border" />
        </div>
        {/* Header */}
        <div className="px-6 py-5 border-b border-border flex items-start gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={getEquipmentImage(eq.nom)}
            alt={eq.nom}
            className="w-14 h-14 rounded-xl object-cover shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-black text-foreground leading-tight">
              {eq.nom}
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">{eq.piece}</p>
            <div
              className={`inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 rounded-full text-xs font-bold border ${cfg.badge}`}
            >
              <Icon size={11} />
              {cfg.label}
              {eq.contratMaintenance && (
                <span className="ml-1 opacity-70">· Contrat</span>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted-foreground hover:bg-accent transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        {/* Body */}
        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-4">
          <div className={`rounded-xl p-4 border ${cfg.bg} ${cfg.border}`}>
            <p className={`text-sm leading-relaxed font-medium ${cfg.text}`}>
              {eq.remarque}
            </p>
          </div>
          <div className="rounded-xl p-4 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Scale size={13} className="text-muted-foreground" />
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Référence légale
              </p>
            </div>
            <p className="text-sm text-foreground leading-relaxed">
              {eq.referenceLegale}
            </p>
          </div>
        </div>
        {/* Footer */}
        <div className="px-6 py-4 border-t border-border">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Page principale ───────────────────────────────────────────────────────────
export default function LogementsPage() {
  const [activePiece, setActivePiece] = useState(PIECES[0]);
  const [search, setSearch] = useState("");           // valeur de l'input (live)
  const [confirmedSearch, setConfirmedSearch] = useState(""); // filtre actif (après sélection)
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedEq, setSelectedEq] = useState<Equipment | null>(null);
  const [highlightedEqId, setHighlightedEqId] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [conseilPiece, setConseilPiece] = useState("general");

  const searchRef = useRef<HTMLDivElement>(null);

  // Fermer suggestions au clic extérieur
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Suggestions autocomplete — basées sur l'input live
  const suggestions = useMemo(() => {
    if (!search.trim() || search.length < 2) return [];
    const q = search.toLowerCase();
    return ALL_EQ.filter(
      (e) => e.nom.toLowerCase().includes(q) || e.piece.toLowerCase().includes(q)
    ).slice(0, 8);
  }, [search]);

  // Équipements affichés selon la pièce active
  const eqDePiece = useMemo(() => {
    if (activePiece.id === "general") return RANDOM_SUGGESTIONS;
    return ALL_EQ.filter((e) => activePiece.ids.includes(e.piece));
  }, [activePiece]);

  // Résultats de recherche — basés sur confirmedSearch (après sélection)
  const searchResults = useMemo(() => {
    if (!confirmedSearch.trim()) return [];
    const q = confirmedSearch.toLowerCase();
    return ALL_EQ.filter(
      (e) => e.nom.toLowerCase().includes(q) || e.piece.toLowerCase().includes(q)
    );
  }, [confirmedSearch]);

  const isSearching = confirmedSearch.trim().length > 0;

  // Clic sur un point bleu 3D → scroll + highlight
  const handleEquipementClick = useCallback((equipementId: string) => {
    setHighlightedEqId(equipementId);
    setTimeout(() => {
      const el = document.getElementById(`eq-card-${equipementId}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 150);
    setTimeout(() => setHighlightedEqId(null), 2500);
  }, []);

  // Sélection d'une suggestion → confirme le filtre
  const handleSuggestionClick = (eq: Equipment) => {
    setSearch(eq.nom);
    setConfirmedSearch(eq.nom);
    setShowSuggestions(false);
  };

  const clearSearch = () => {
    setSearch("");
    setConfirmedSearch("");
    setShowSuggestions(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <div className="mx-auto px-4 sm:px-6 pt-6 pb-4">
        {/* Bouton retour */}
        <Link
          href="/client/compte"
          className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground text-sm mb-5 transition-colors"
        >
          <ArrowLeft size={14} />
          Retour
        </Link>

        {/* Titre + HousePreview3D */}
        <div className="flex items-start gap-6">
        {/* Titre */}
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-black text-foreground leading-tight mb-2">
            Prendre soin et entretenir son logement, c&apos;est s&apos;assurer
            d&apos;un confort maximal.
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Découvrez qui doit réparer et entretenir les équipements dans
            votre logement.
          </p>
        </div>
        </div>
      </div>

      <div className="mx-auto px-4 sm:px-6">
        {/* ── ONGLETS PIÈCES ─────────────────────────────────────────────── */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          {PIECES.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                setActivePiece(p);
                setConseilPiece(p.id === "general" ? "general" : p.id);
              }}
              className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all shrink-0 ${
                activePiece.id === p.id
                  ? "bg-primary text-primary-foreground shadow"
                  : "bg-card text-foreground border border-border hover:bg-muted"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* ── VUE 3D — Général = HousePreview3D, autres pièces = RoomPreview3D ── */}
        <div className="rounded-2xl overflow-hidden mb-6" style={{ height: 600 }}>
          {activePiece.piece3D ? (
            <RoomPreview3D
              piece={activePiece.piece3D}
              onEquipementClick={handleEquipementClick}
              className="w-full h-full"
            />
          ) : (
            <HousePreview3D className="w-full h-full" />
          )}
        </div>

        {/* ── CHAMP DE RECHERCHE (toujours visible) ──────────────────────── */}
        <div ref={searchRef} className="relative mb-6">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={18}
            />
            <input
              type="text"
              placeholder="Rechercher un équipement..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              className="w-full pl-11 pr-10 py-3 rounded-xl bg-card border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-muted-foreground transition-all"
            />
            {search && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Suggestions autocomplete */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-xl z-30 overflow-hidden">
              {suggestions.map((eq) => {
                const cfg = RESP_CFG[eq.typeRemarque];
                return (
                  <button
                    key={eq.id}
                    onMouseDown={() => handleSuggestionClick(eq)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-muted transition-colors text-left"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={getEquipmentImage(eq.nom)}
                      alt=""
                      className="w-8 h-8 rounded-lg object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">
                        {eq.nom}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {eq.piece}
                      </p>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${cfg.badge} shrink-0`}
                    >
                      {cfg.label}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* ── GRILLE ÉQUIPEMENTS ─────────────────────────────────────────── */}
        {isSearching ? (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-semibold text-foreground">
                {searchResults.length} résultat
                {searchResults.length !== 1 ? "s" : ""} pour &quot;{search}&quot;
              </p>
              <button
                onClick={clearSearch}
                className="text-xs text-primary hover:underline"
              >
                Effacer
              </button>
            </div>
            {searchResults.length === 0 ? (
              <p className="text-muted-foreground text-sm text-center py-12">
                Aucun équipement ne correspond à votre recherche.
              </p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {searchResults.map((eq) => (
                  <EqCard key={eq.id} eq={eq} onClick={setSelectedEq} />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="mb-8">
            {/* Légende */}
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="text-xs font-semibold text-muted-foreground mr-1">
                Responsable :
              </span>
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-500 text-xs font-semibold border border-yellow-500/30">
                <span className="w-2 h-2 rounded-full bg-yellow-400 inline-block" />
                Locataire
              </span>
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold border border-blue-500/30">
                <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
                Bailleur
              </span>
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 text-xs font-semibold border border-purple-500/30">
                <span className="w-2 h-2 rounded-full bg-purple-500 inline-block" />
                Contrat
              </span>
            </div>

            {eqDePiece.length === 0 ? (
              <p className="text-muted-foreground text-sm text-center py-8">
                Aucun équipement pour cette pièce.
              </p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {eqDePiece.map((eq) => (
                  <EqCard
                    key={eq.id}
                    eq={eq}
                    onClick={setSelectedEq}
                    highlighted={highlightedEqId === eq.id}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── SECTION CONSEILS ───────────────────────────────────────────── */}
        <section className="bg-primary/10 border border-primary/20 rounded-2xl p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-black mb-5 text-foreground">
            Quelques informations pour vous faciliter la vie !
          </h2>
          {/* Onglets pièces conseils */}
          <div className="flex gap-2 flex-wrap mb-5">
            {PIECES.map((p) => (
              <button
                key={p.id}
                onClick={() => setConseilPiece(p.id === "general" ? "general" : p.id)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                  conseilPiece === (p.id === "general" ? "general" : p.id)
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-card text-foreground hover:bg-accent border border-border"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
          {/* Liste de conseils */}
          <ul className="space-y-2">
            {(CONSEILS[conseilPiece] ?? CONSEILS["general"]).map((c, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                {c}
              </li>
            ))}
          </ul>
        </section>

        {/* ── FAQ ────────────────────────────────────────────────────────── */}
        <section className="pb-12">
          <h2 className="text-xl font-black text-foreground mb-6 text-center">
            Questions fréquentes sur les travaux et entretiens
          </h2>
          <div className="space-y-2">
            {FAQ.map((item, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-4 py-3.5 text-left text-sm font-semibold text-foreground hover:bg-accent transition-colors"
                >
                  <span>{item.q}</span>
                  {openFaq === i ? (
                    <ChevronUp size={16} className="text-muted-foreground shrink-0" />
                  ) : (
                    <ChevronDown size={16} className="text-muted-foreground shrink-0" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed border-t border-border pt-3">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ── MODAL ──────────────────────────────────────────────────────────── */}
      {selectedEq && (
        <EquipementModal eq={selectedEq} onClose={() => setSelectedEq(null)} />
      )}
    </div>
  );
}

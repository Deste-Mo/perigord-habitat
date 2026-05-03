"use client";

import { useState, useMemo, useCallback } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowLeft, Search, ChevronDown, ChevronUp, User, Building2, Wrench, X, Scale } from "lucide-react";
import { HeaderApp } from "@/components/layout/HeaderApp";
import equipementsData from "@/data/equipements.json";
import type { Equipment } from "@/types/equipment";

// Chargement dynamique pour éviter le SSR du Canvas WebGL
const RoomPreview3D = dynamic(
  () => import("@/components/logements/RoomPreview3D").then(m => m.RoomPreview3D),
  { ssr: false, loading: () => <div className="w-full h-full bg-[#e8f0fe] animate-pulse rounded-2xl" /> }
);

const HousePreview3D = dynamic(
  () => import("@/components/logements/HousePreview3D").then(m => m.HousePreview3D),
  { ssr: false, loading: () => <div className="w-full h-full rounded-2xl bg-blue-500/30 animate-pulse" /> }
);

// ── Données ────────────────────────────────────────────────────────────────────
const ALL_EQ = equipementsData.equipements as Equipment[];

type PieceId3D = 'sejour' | 'cuisine' | 'chambre' | 'salleDeBain' | 'couloir' | null;

// Pièces avec leur ID 3D correspondant
const PIECES: {
  id: string;
  label: string;
  piece3D: PieceId3D;
}[] = [
  { id: "Entrée / Couloir",       label: "Entrée",           piece3D: "couloir"     },
  { id: "Salon / Séjour",         label: "Pièce à vivre",    piece3D: "sejour"      },
  { id: "Cuisine",                label: "Cuisine",          piece3D: "cuisine"     },
  { id: "Salle de bain / Douche", label: "Salle d'eau / WC", piece3D: "salleDeBain" },
  { id: "Chambre",                label: "Chambre",          piece3D: "chambre"     },
  { id: "WC / Toilettes",         label: "WC",               piece3D: "salleDeBain" },
];

// Conseils par pièce
const CONSEILS: Record<string, string[]> = {
  "Entrée / Couloir": [
    "Nettoyez régulièrement les peintures de votre logement.",
    "Ne lavez pas vos sols à grande eau et utilisez des produits adaptés à leur nature.",
    "Veillez à ouvrir les fenêtres au moins une fois par jour.",
    "N'obstruez pas les bouches d'aération et veillez à les nettoyer régulièrement.",
    "Lubrifiez régulièrement les serrures et charnières de portes.",
  ],
  "Salon / Séjour": [
    "Nettoyez régulièrement les peintures de votre logement.",
    "Ne lavez pas vos sols à grande eau et utilisez des produits adaptés à leur nature.",
    "Décollez le papier-peint existant avant d'en changer.",
    "Ne chargez pas les prises multiples.",
    "Ne purgez pas vos radiateurs vous-même.",
    "Ne démontez jamais vos radiateurs ou convecteurs, ne posez pas de linge ou tablette dessus.",
  ],
  "Cuisine": [
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
  ],
  "WC / Toilettes": [
    "Détartrez régulièrement la cuvette.",
    "Ne jetez rien d'autre que du papier toilette dans les WC.",
    "Vérifiez le bon fonctionnement de la chasse d'eau.",
    "Signalez rapidement toute fuite au niveau du robinet d'arrêt.",
  ],
  "Chambre": [
    "Aérez votre chambre chaque matin au moins 10 minutes.",
    "Nettoyez régulièrement les grilles de ventilation.",
    "Entretenez les charnières et poignées de portes et fenêtres.",
    "Vérifiez l'état des volets et signalez tout dysfonctionnement.",
  ],
};

// FAQ
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

// Config responsable
const RESP_CFG = {
  locataire: { label: "Locataire", color: "#f59e0b", dot: "bg-yellow-400", badge: "bg-yellow-50 text-yellow-700 border-yellow-200", icon: User, text: "text-yellow-700", bg: "bg-yellow-50", border: "border-yellow-200" },
  bailleur:  { label: "Bailleur",  color: "#3b82f6", dot: "bg-blue-500",   badge: "bg-blue-50 text-blue-700 border-blue-200",     icon: Building2, text: "text-blue-700",   bg: "bg-blue-50",   border: "border-blue-200"   },
  contrat:   { label: "Contrat",   color: "#8b5cf6", dot: "bg-purple-500", badge: "bg-purple-50 text-purple-700 border-purple-300", icon: Wrench,    text: "text-purple-700", bg: "bg-purple-50", border: "border-purple-200" },
} as const;

// Emoji par équipement
function emoji(nom: string): string {
  const n = nom.toLowerCase();
  if (n.includes("porte") || n.includes("serrure") || n.includes("verrou")) return "🚪";
  if (n.includes("fenêtre") || n.includes("vitre")) return "🪟";
  if (n.includes("volet")) return "🪟";
  if (n.includes("radiateur") || n.includes("thermostat")) return "🌡️";
  if (n.includes("robinet") || n.includes("mitigeur")) return "🚰";
  if (n.includes("évier")) return "🪣";
  if (n.includes("lavabo") || n.includes("vasque")) return "🪣";
  if (n.includes("wc") || n.includes("toilette") || n.includes("chasse")) return "🚽";
  if (n.includes("douche")) return "🚿";
  if (n.includes("baignoire")) return "🛁";
  if (n.includes("prise") || n.includes("interrupteur")) return "🔌";
  if (n.includes("luminaire") || n.includes("ampoule") || n.includes("douille")) return "💡";
  if (n.includes("vmc") || n.includes("ventilation") || n.includes("grille")) return "💨";
  if (n.includes("détecteur") || n.includes("fumée") || n.includes("daaf")) return "🔔";
  if (n.includes("chauffe-eau") || n.includes("cumulus") || n.includes("ballon")) return "🔥";
  if (n.includes("réfrigérateur") || n.includes("congélateur")) return "❄️";
  if (n.includes("four") || n.includes("plaque") || n.includes("cuisson")) return "🍳";
  if (n.includes("hotte")) return "💨";
  if (n.includes("lave-vaisselle")) return "🍽️";
  if (n.includes("lave-linge") || n.includes("machine à laver")) return "👕";
  if (n.includes("sol") || n.includes("parquet") || n.includes("carrelage")) return "🏠";
  if (n.includes("mur") || n.includes("peinture") || n.includes("revêtement")) return "🖌️";
  if (n.includes("interphone") || n.includes("sonnette")) return "🔔";
  if (n.includes("boîte aux lettres")) return "📬";
  if (n.includes("siphon") || n.includes("bonde") || n.includes("évacuation")) return "🔧";
  if (n.includes("joint")) return "🔩";
  if (n.includes("placard") || n.includes("meuble")) return "🗄️";
  if (n.includes("clé") || n.includes("badge")) return "🔑";
  return "🔧";
}

// ── Modal détail ───────────────────────────────────────────────────────────────
function EquipementModal({ eq, onClose }: { eq: Equipment; onClose: () => void }) {
  const cfg = RESP_CFG[eq.typeRemarque];
  const Icon = cfg.icon;
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={onClose}>
      <div className="bg-white w-full sm:max-w-lg sm:rounded-2xl rounded-t-3xl shadow-2xl flex flex-col max-h-[90vh]" onClick={e => e.stopPropagation()}>
        <div className="flex justify-center pt-3 pb-1 sm:hidden"><div className="w-10 h-1 rounded-full bg-gray-200" /></div>
        <div className={`px-6 py-5 ${cfg.bg} border-b ${cfg.border} flex items-start gap-4`}>
          <div className="text-4xl">{emoji(eq.nom)}</div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-black text-gray-900 leading-tight">{eq.nom}</h2>
            <p className="text-sm text-gray-500 mt-0.5">{eq.piece}</p>
            <div className={`inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 rounded-full text-xs font-bold border ${cfg.badge}`}>
              <Icon size={11} />{cfg.label}{eq.contratMaintenance && <span className="ml-1 opacity-70">· Contrat</span>}
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-gray-400 hover:bg-white/60"><X size={18} /></button>
        </div>
        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-4">
          <div className={`rounded-xl p-4 border ${cfg.bg} ${cfg.border}`}>
            <p className={`text-sm leading-relaxed font-medium ${cfg.text}`}>{eq.remarque}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-2 mb-2"><Scale size={13} className="text-gray-400" /><p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Référence légale</p></div>
            <p className="text-sm text-gray-700 leading-relaxed">{eq.referenceLegale}</p>
          </div>
        </div>
        <div className="px-6 py-4 border-t border-gray-100">
          <button onClick={onClose} className="w-full py-3 rounded-xl bg-gray-900 hover:bg-gray-800 text-white font-semibold text-sm transition-colors">Fermer</button>
        </div>
      </div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function LogementsPage() {
  const [activePiece, setActivePiece] = useState(PIECES[0]);
  const [search, setSearch] = useState("");
  const [selectedEq, setSelectedEq] = useState<Equipment | null>(null);
  const [highlightedEqId, setHighlightedEqId] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [conseilPiece, setConseilPiece] = useState(PIECES[0].id);

  // Clic sur un point rouge → scroll vers la card + highlight
  const handleEquipementClick = useCallback((equipementId: string) => {
    setHighlightedEqId(equipementId);
    // Scroll vers la card
    setTimeout(() => {
      const el = document.getElementById(`eq-card-${equipementId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 50);
    // Retirer le highlight après 2.5s
    setTimeout(() => setHighlightedEqId(null), 2500);
  }, []);

  const eqDePiece = useMemo(() => ALL_EQ.filter(e => e.piece === activePiece.id), [activePiece]);

  const searchResults = useMemo(() => {
    if (!search.trim()) return [];
    const q = search.toLowerCase();
    return ALL_EQ.filter(e => e.nom.toLowerCase().includes(q) || e.piece.toLowerCase().includes(q));
  }, [search]);

  const isSearching = search.trim().length > 0;

  return (
    <div className="min-h-screen bg-white">
      <HeaderApp />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="bg-[#2563eb] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 flex items-center justify-between gap-6">
          <div className="flex-1">
            <Link href="/client/compte" className="inline-flex items-center gap-1.5 text-blue-200 hover:text-white text-sm mb-4 transition-colors">
              <ArrowLeft size={14} /> Retour
            </Link>
            <h1 className="text-2xl sm:text-3xl font-black leading-tight mb-3">
              Prendre soin et entretenir son logement, c&apos;est s&apos;assurer d&apos;un confort maximal.
            </h1>
            <p className="text-blue-100 text-sm leading-relaxed mb-6">
              Découvrez d&apos;un coup d&apos;œil, qui doit réparer et entretenir les équipements dans votre logement, ainsi que de nombreux conseils !
            </p>
            {/* Barre de recherche */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Trouver l'équipement de votre logement"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-11 pr-10 py-3.5 rounded-xl bg-white text-gray-900 text-sm focus:outline-none shadow-lg placeholder:text-gray-400"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
          {/* Vue 3D maison complète à droite */}
          <div className="hidden md:block shrink-0 w-52 h-52 rounded-2xl overflow-hidden border-2 border-blue-400/30 shadow-2xl">
            <HousePreview3D className="w-full h-full" />
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* ── RÉSULTATS RECHERCHE ── */}
        {isSearching ? (
          <div className="py-8">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-semibold text-gray-700">
                Recherche pour l&apos;équipement &quot;{search}&quot; — {searchResults.length} résultat{searchResults.length !== 1 ? "s" : ""}
              </p>
              <button onClick={() => setSearch("")} className="text-xs text-blue-600 hover:underline">Effacer</button>
            </div>
            {searchResults.length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-12">Aucun équipement ne correspond à votre recherche.</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {searchResults.map(eq => <EqCard key={eq.id} eq={eq} onClick={setSelectedEq} />)}
              </div>
            )}
          </div>
        ) : (
          <>
            {/* ── ONGLETS PIÈCES ── */}
            <div className="py-8">
              <h2 className="text-center text-base font-bold text-gray-800 mb-4">Choisissez la pièce concernée</h2>
              <div className="flex gap-2 justify-center flex-wrap">
                {PIECES.map(p => (
                  <button
                    key={p.id}
                    onClick={() => setActivePiece(p)}
                    className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all ${
                      activePiece.id === p.id
                        ? "bg-[#2563eb] text-white border-[#2563eb] shadow"
                        : "bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:text-blue-600"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* ── ILLUSTRATION 3D ── */}
            {/* Le Canvas reste monté en permanence pour éviter la perte de contexte WebGL.
                On le cache visuellement quand la pièce n'a pas de vue 3D. */}
            <div className="relative bg-[#e8f0fe] rounded-2xl overflow-hidden mb-4" style={{ height: 500 }}>
              <div className={`w-full h-full ${activePiece.piece3D ? 'block' : 'hidden'}`}>
                <RoomPreview3D
                  piece={activePiece.piece3D ?? 'sejour'}
                  onEquipementClick={handleEquipementClick}
                  className="w-full h-full"
                />
              </div>
              {!activePiece.piece3D && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <span className="text-8xl opacity-30">🏠</span>
                  <p className="text-gray-400 text-sm font-medium">{activePiece.label}</p>
                </div>
              )}
            </div>

            {/* Légende responsable */}
            <div className="flex items-center gap-1 mb-2 text-xs text-gray-600">
              <span className="font-semibold mr-1">Responsable de l&apos;entretien</span>
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 font-semibold border border-yellow-200">
                <span className="w-2 h-2 rounded-full bg-yellow-400 inline-block" /> Locataire
              </span>
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-semibold border border-blue-200">
                <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" /> Bailleur
              </span>
            </div>

            {/* ── SECTION ÉQUIPEMENTS ── */}
            <div className="py-6">
              <h2 className="text-xl font-black text-gray-900 mb-1">Équipements</h2>
              <p className="text-xs text-gray-500 mb-5 italic">
                *Les équipements qui ont subi une dégradation sont à la charge des locataires.
              </p>
              {eqDePiece.length === 0 ? (
                <p className="text-gray-400 text-sm text-center py-8">Aucun équipement pour cette pièce.</p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {eqDePiece.map(eq => (
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

            {/* ── SECTION CONSEILS ── */}
            <section className="bg-[#2563eb] rounded-2xl p-6 sm:p-8 mb-8 text-white">
              <h2 className="text-xl font-black mb-5">Quelques informations pour vous faciliter la vie !</h2>
              {/* Onglets pièces conseils */}
              <div className="flex gap-2 flex-wrap mb-5">
                {PIECES.map(p => (
                  <button
                    key={p.id}
                    onClick={() => setConseilPiece(p.id)}
                    className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                      conseilPiece === p.id
                        ? "bg-white text-blue-700"
                        : "bg-white/20 text-white hover:bg-white/30"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
              {/* Liste de conseils */}
              <ul className="space-y-2">
                {(CONSEILS[conseilPiece] ?? []).map((c, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-blue-100">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-300 shrink-0" />
                    {c}
                  </li>
                ))}
              </ul>
            </section>

            {/* ── FAQ ── */}
            <section className="pb-12">
              <h2 className="text-xl font-black text-gray-900 mb-6 text-center">Questions fréquentes sur les travaux et entretiens</h2>
              <div className="grid md:grid-cols-2 gap-8 items-start">
                {/* Photo */}
                <div className="hidden md:flex items-center justify-center bg-gray-100 rounded-2xl h-64 text-6xl">
                  🏘️
                </div>
                {/* Accordéon */}
                <div className="space-y-2">
                  {FAQ.map((item, i) => (
                    <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full flex items-center justify-between px-4 py-3.5 text-left text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
                      >
                        <span>{item.q}</span>
                        {openFaq === i ? <ChevronUp size={16} className="text-gray-400 shrink-0" /> : <ChevronDown size={16} className="text-gray-400 shrink-0" />}
                      </button>
                      {openFaq === i && (
                        <div className="px-4 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                          {item.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}
      </div>

      {selectedEq && <EquipementModal eq={selectedEq} onClose={() => setSelectedEq(null)} />}
    </div>
  );
}

// ── Card équipement ────────────────────────────────────────────────────────────
function EqCard({ eq, onClick, highlighted = false }: {
  eq: Equipment;
  onClick: (e: Equipment) => void;
  highlighted?: boolean;
}) {
  const cfg = RESP_CFG[eq.typeRemarque];
  return (
    <button
      id={`eq-card-${eq.id}`}
      onClick={() => onClick(eq)}
      className={`group rounded-xl border hover:shadow-md transition-all overflow-hidden text-left flex flex-col ${
        highlighted
          ? 'border-red-400 shadow-lg shadow-red-100 bg-red-50 scale-105'
          : 'bg-white border-gray-200 hover:border-blue-300'
      }`}
    >
      {/* Illustration */}
      <div className={`h-24 flex items-center justify-center transition-colors ${
        highlighted ? 'bg-red-100' : 'bg-gray-50 group-hover:bg-blue-50'
      }`}>
        <span className="text-5xl group-hover:scale-110 transition-transform duration-200">{emoji(eq.nom)}</span>
      </div>
      {/* Nom + badge */}
      <div className="p-2.5 flex flex-col flex-1">
        <p className="text-xs font-bold text-gray-900 leading-tight line-clamp-2 mb-auto">{eq.nom}</p>
        <div className={`mt-2 inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold border self-start ${cfg.badge}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
          {cfg.label}
        </div>
      </div>
    </button>
  );
}


import { Building2, ChevronRight, Info } from "lucide-react";
import { Section } from "./Section";
import { Row } from "./Row";

const BAILLEUR_LINKS = [
  { label: "Tableau de bord",    href: "/dashboard" },
  { label: "Gérer les logements", href: "/dashboard" },
  { label: "Gérer les locataires", href: "/dashboard" },
  { label: "Incidents en cours",  href: "/dashboard" },
] as const;

interface OrganisationSectionProps {
  onNavigate: (href: string) => void;
}

export function OrganisationSection({ onNavigate }: OrganisationSectionProps) {
  return (
    <Section title="Gestion de l'organisation" icon={Building2}>
      {BAILLEUR_LINKS.map(({ label, href }) => (
        <Row key={label} label={label} onClick={() => onNavigate(href)}>
          <div className="flex items-center gap-1.5 text-blue-600 text-sm font-medium">
            Accéder <ChevronRight size={14} />
          </div>
        </Row>
      ))}
      <div className="px-5 py-3.5">
        <div className="flex items-start gap-2 p-3 rounded-xl bg-blue-50 border border-blue-100">
          <Info size={14} className="text-blue-500 mt-0.5 shrink-0" />
          <p className="text-xs text-blue-700 leading-relaxed">
            En tant que bailleur, vous avez accès à la gestion complète des logements,
            locataires et interventions depuis le tableau de bord.
          </p>
        </div>
      </div>
    </Section>
  );
}

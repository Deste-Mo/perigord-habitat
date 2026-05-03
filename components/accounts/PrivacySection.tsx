
import { Shield, ExternalLink, Download, ChevronRight } from "lucide-react";
import { Section } from "./Section";
import { Row } from "./Row";

export function PrivacySection() {
  return (
    <Section title="Confidentialité & Données" icon={Shield}>
      <Row label="Politique de confidentialité">
        <ExternalLink size={14} className="text-gray-400" />
      </Row>
      <Row label="Conditions d'utilisation">
        <ExternalLink size={14} className="text-gray-400" />
      </Row>
      <Row label="Télécharger mes données">
        <Download size={14} className="text-gray-400" />
      </Row>
      <Row label="Gestion des cookies">
        <ChevronRight size={15} className="text-gray-300" />
      </Row>
    </Section>
  );
}

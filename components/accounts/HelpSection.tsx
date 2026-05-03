
import { HelpCircle, ExternalLink, Mail, ChevronRight } from "lucide-react";
import { Section } from "./Section";
import { Row } from "./Row";

export function HelpSection() {
  return (
    <Section title="Aide & Assistance" icon={HelpCircle}>
      <Row label="Centre d'aide">
        <ExternalLink size={14} className="text-gray-400" />
      </Row>
      <Row label="Contacter le support">
        <div className="flex items-center gap-1.5">
          <Mail size={13} className="text-gray-400" />
          <span className="text-xs text-gray-400">support@quifaitquoi.fr</span>
        </div>
      </Row>
      <Row label="Signaler un problème">
        <ChevronRight size={15} className="text-gray-300" />
      </Row>
      <Row label="Version de l'application">
        <span className="text-xs text-gray-400 font-mono">v1.0.0</span>
      </Row>
    </Section>
  );
}

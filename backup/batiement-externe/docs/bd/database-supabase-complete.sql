-- ============================================
-- PLATEFORME "QUI FAIT QUOI" - SCHEMA COMPLET SUPABASE
-- ============================================

-- Table des bailleurs (multi-tenant)
CREATE TABLE bailleurs (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    logo_url VARCHAR(500),
    couleur_primaire VARCHAR(7),
    couleur_secondaire VARCHAR(7),
    domaine_personnalise VARCHAR(255),
    api_key VARCHAR(255) UNIQUE,
    actif BOOLEAN DEFAULT TRUE,
    date_creation TIMESTAMPTZ DEFAULT NOW(),
    date_modification TIMESTAMPTZ DEFAULT NOW()
);

-- Table des agences par bailleur
CREATE TABLE agences (
    id SERIAL PRIMARY KEY,
    bailleur_id INTEGER NOT NULL REFERENCES bailleurs(id) ON DELETE CASCADE,
    nom VARCHAR(255) NOT NULL,
    adresse TEXT,
    telephone VARCHAR(20),
    email VARCHAR(255),
    horaires TEXT,
    actif BOOLEAN DEFAULT TRUE
);

-- Table des codes d'accès pour les locataires
CREATE TABLE codes_acces (
    id SERIAL PRIMARY KEY,
    bailleur_id INTEGER NOT NULL REFERENCES bailleurs(id) ON DELETE CASCADE,
    code VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    actif BOOLEAN DEFAULT TRUE,
    date_creation TIMESTAMPTZ DEFAULT NOW(),
    date_expiration TIMESTAMPTZ
);

-- Table des logements
CREATE TABLE logements (
    id SERIAL PRIMARY KEY,
    bailleur_id INTEGER NOT NULL REFERENCES bailleurs(id) ON DELETE CASCADE,
    agence_id INTEGER REFERENCES agences(id) ON DELETE SET NULL,
    reference VARCHAR(100) NOT NULL,
    adresse TEXT,
    type_logement VARCHAR(20) CHECK (type_logement IN ('T1', 'T2', 'T3', 'T4', 'T5', 'autre')),
    date_creation TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (bailleur_id, reference)
);

-- Table des locataires
CREATE TABLE locataires (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    bailleur_id INTEGER NOT NULL REFERENCES bailleurs(id) ON DELETE CASCADE,
    logement_id INTEGER REFERENCES logements(id) ON DELETE SET NULL,
    code_acces_id INTEGER REFERENCES codes_acces(id) ON DELETE SET NULL,
    nom VARCHAR(255) NOT NULL,
    prenom VARCHAR(255) NOT NULL,
    telephone VARCHAR(20),
    actif BOOLEAN DEFAULT TRUE,
    date_creation TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id)
);

-- Table des pièces
CREATE TABLE pieces (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    description TEXT,
    icone_url VARCHAR(500)
);

-- Table des équipements
CREATE TABLE equipements (
    id SERIAL PRIMARY KEY,
    piece_id INTEGER NOT NULL REFERENCES pieces(id) ON DELETE CASCADE,
    nom VARCHAR(255) NOT NULL,
    description TEXT,
    sous_contrat BOOLEAN DEFAULT FALSE,
    icone_url VARCHAR(500)
);

-- Table des cas particuliers (bandeau "Ça dépend")
CREATE TABLE cas_particuliers (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    titre VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    consigne TEXT NOT NULL,
    icone VARCHAR(50)
);

-- Table des pannes (base de connaissances)
CREATE TABLE pannes (
    id SERIAL PRIMARY KEY,
    equipement_id INTEGER NOT NULL REFERENCES equipements(id) ON DELETE CASCADE,
    titre VARCHAR(255) NOT NULL,
    description TEXT,
    categorie VARCHAR(50) CHECK (categorie IN ('chauffage', 'plomberie', 'electricite', 'fenetres', 'serrurerie', 'ventilation', 'humidite', 'autre')),
    responsable VARCHAR(20) CHECK (responsable IN ('locataire', 'bailleur', 'contrat', 'a_verifier')) NOT NULL,
    qui_paie VARCHAR(30) CHECK (qui_paie IN ('locataire', 'bailleur', 'bailleur_recuperable')) NOT NULL,
    reference_juridique TEXT,
    diagnostic_checklist JSONB,
    auto_depannage_etapes JSONB,
    video_url VARCHAR(500),
    mots_cles TEXT
);

-- Lien panne <-> cas particulier
CREATE TABLE pannes_cas_particuliers (
    panne_id INTEGER REFERENCES pannes(id) ON DELETE CASCADE,
    cas_particulier_id INTEGER REFERENCES cas_particuliers(id) ON DELETE CASCADE,
    PRIMARY KEY (panne_id, cas_particulier_id)
);

-- Table des tutoriels vidéo
CREATE TABLE tutoriels (
    id SERIAL PRIMARY KEY,
    panne_id INTEGER REFERENCES pannes(id) ON DELETE CASCADE,
    titre VARCHAR(255) NOT NULL,
    description TEXT,
    video_url VARCHAR(500),
    duree_secondes INTEGER,
    vues INTEGER DEFAULT 0,
    date_creation TIMESTAMPTZ DEFAULT NOW()
);

-- Table des incidents (tickets)
CREATE TABLE incidents (
    id SERIAL PRIMARY KEY,
    bailleur_id INTEGER NOT NULL REFERENCES bailleurs(id) ON DELETE CASCADE,
    locataire_id INTEGER NOT NULL REFERENCES locataires(id) ON DELETE CASCADE,
    logement_id INTEGER NOT NULL REFERENCES logements(id) ON DELETE CASCADE,
    panne_id INTEGER REFERENCES pannes(id) ON DELETE SET NULL,
    titre VARCHAR(255) NOT NULL,
    description TEXT,
    statut VARCHAR(20) CHECK (statut IN ('nouveau', 'en_diagnostic', 'en_cours', 'resolu', 'ferme')) DEFAULT 'nouveau',
    priorite VARCHAR(20) CHECK (priorite IN ('basse', 'normale', 'haute', 'urgente')) DEFAULT 'normale',
    responsable_identifie VARCHAR(20) CHECK (responsable_identifie IN ('locataire', 'bailleur', 'contrat', 'a_verifier')),
    diagnostic_ia JSONB,
    date_creation TIMESTAMPTZ DEFAULT NOW(),
    date_modification TIMESTAMPTZ DEFAULT NOW(),
    date_resolution TIMESTAMPTZ
);

-- Table des médias (photos, vidéos, audio)
CREATE TABLE medias (
    id SERIAL PRIMARY KEY,
    incident_id INTEGER NOT NULL REFERENCES incidents(id) ON DELETE CASCADE,
    type_media VARCHAR(10) CHECK (type_media IN ('photo', 'video', 'audio')) NOT NULL,
    url VARCHAR(500) NOT NULL,
    taille_octets INTEGER,
    analyse_ia JSONB,
    date_upload TIMESTAMPTZ DEFAULT NOW()
);

-- Table des prestataires
CREATE TABLE prestataires (
    id SERIAL PRIMARY KEY,
    bailleur_id INTEGER NOT NULL REFERENCES bailleurs(id) ON DELETE CASCADE,
    nom VARCHAR(255) NOT NULL,
    type_service VARCHAR(100),
    telephone VARCHAR(20),
    email VARCHAR(255),
    actif BOOLEAN DEFAULT TRUE
);

-- Table des contrats d'entretien
CREATE TABLE contrats_entretien (
    id SERIAL PRIMARY KEY,
    bailleur_id INTEGER NOT NULL REFERENCES bailleurs(id) ON DELETE CASCADE,
    prestataire_id INTEGER NOT NULL REFERENCES prestataires(id) ON DELETE CASCADE,
    equipement_id INTEGER NOT NULL REFERENCES equipements(id) ON DELETE CASCADE,
    logement_id INTEGER REFERENCES logements(id) ON DELETE SET NULL,
    date_debut DATE NOT NULL,
    date_fin DATE,
    reference_contrat VARCHAR(100),
    actif BOOLEAN DEFAULT TRUE
);

-- Table des notifications
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    locataire_id INTEGER NOT NULL REFERENCES locataires(id) ON DELETE CASCADE,
    incident_id INTEGER REFERENCES incidents(id) ON DELETE CASCADE,
    type_notification VARCHAR(10) CHECK (type_notification IN ('email', 'sms', 'app')) NOT NULL,
    contenu TEXT NOT NULL,
    envoyee BOOLEAN DEFAULT FALSE,
    date_envoi TIMESTAMPTZ,
    date_creation TIMESTAMPTZ DEFAULT NOW()
);

-- Table des règles personnalisées par bailleur
CREATE TABLE regles_bailleur (
    id SERIAL PRIMARY KEY,
    bailleur_id INTEGER NOT NULL REFERENCES bailleurs(id) ON DELETE CASCADE,
    panne_id INTEGER NOT NULL REFERENCES pannes(id) ON DELETE CASCADE,
    responsable_override VARCHAR(20) CHECK (responsable_override IN ('locataire', 'bailleur', 'contrat', 'a_verifier')),
    qui_paie_override VARCHAR(30) CHECK (qui_paie_override IN ('locataire', 'bailleur', 'bailleur_recuperable')),
    instructions_specifiques TEXT,
    UNIQUE (bailleur_id, panne_id)
);

-- Table des administrateurs bailleur
CREATE TABLE admins_bailleur (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    bailleur_id INTEGER NOT NULL REFERENCES bailleurs(id) ON DELETE CASCADE,
    nom VARCHAR(255) NOT NULL,
    prenom VARCHAR(255) NOT NULL,
    mfa_secret VARCHAR(255),
    role VARCHAR(20) CHECK (role IN ('admin', 'gestionnaire', 'lecteur')) DEFAULT 'gestionnaire',
    actif BOOLEAN DEFAULT TRUE,
    date_creation TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id)
);

-- Table historique recherches IA (pour améliorer le diagnostic)
CREATE TABLE historique_recherches (
    id SERIAL PRIMARY KEY,
    locataire_id INTEGER REFERENCES locataires(id) ON DELETE CASCADE,
    requete_texte TEXT,
    requete_vocale_url VARCHAR(500),
    resultats_ia JSONB,
    panne_identifiee_id INTEGER REFERENCES pannes(id) ON DELETE SET NULL,
    pertinence INTEGER CHECK (pertinence BETWEEN 1 AND 5),
    date_recherche TIMESTAMPTZ DEFAULT NOW()
);

-- Table des logs d'activité (RGPD)
CREATE TABLE logs_activite (
    id SERIAL PRIMARY KEY,
    utilisateur_type VARCHAR(20) CHECK (utilisateur_type IN ('locataire', 'admin')) NOT NULL,
    utilisateur_id INTEGER NOT NULL,
    action VARCHAR(255) NOT NULL,
    details JSONB,
    ip_address INET,
    date_action TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_logs_utilisateur ON logs_activite(utilisateur_type, utilisateur_id);
CREATE INDEX idx_logs_date ON logs_activite(date_action);

-- Table des statistiques
CREATE TABLE statistiques (
    id SERIAL PRIMARY KEY,
    bailleur_id INTEGER NOT NULL REFERENCES bailleurs(id) ON DELETE CASCADE,
    periode DATE NOT NULL,
    total_incidents INTEGER DEFAULT 0,
    incidents_resolus_sans_technicien INTEGER DEFAULT 0,
    temps_moyen_resolution_minutes INTEGER,
    taux_satisfaction NUMERIC(3,2),
    UNIQUE (bailleur_id, periode)
);

-- Table FAQ pour SEO
CREATE TABLE faq (
    id SERIAL PRIMARY KEY,
    bailleur_id INTEGER REFERENCES bailleurs(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    reponse TEXT NOT NULL,
    categorie VARCHAR(100),
    ordre INTEGER DEFAULT 0,
    actif BOOLEAN DEFAULT TRUE,
    date_creation TIMESTAMPTZ DEFAULT NOW()
);

-- Table articles blog pour SEO
CREATE TABLE articles_blog (
    id SERIAL PRIMARY KEY,
    bailleur_id INTEGER REFERENCES bailleurs(id) ON DELETE CASCADE,
    titre VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    contenu TEXT NOT NULL,
    image_url VARCHAR(500),
    auteur VARCHAR(255),
    publie BOOLEAN DEFAULT FALSE,
    date_publication TIMESTAMPTZ,
    date_creation TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TRIGGERS
-- ============================================

-- Trigger pour mettre à jour date_modification automatiquement
CREATE OR REPLACE FUNCTION update_date_modification()
RETURNS TRIGGER AS $$
BEGIN
    NEW.date_modification = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_bailleurs_date_modification
    BEFORE UPDATE ON bailleurs
    FOR EACH ROW
    EXECUTE FUNCTION update_date_modification();

CREATE TRIGGER update_incidents_date_modification
    BEFORE UPDATE ON incidents
    FOR EACH ROW
    EXECUTE FUNCTION update_date_modification();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE bailleurs ENABLE ROW LEVEL SECURITY;
ALTER TABLE agences ENABLE ROW LEVEL SECURITY;
ALTER TABLE codes_acces ENABLE ROW LEVEL SECURITY;
ALTER TABLE logements ENABLE ROW LEVEL SECURITY;
ALTER TABLE locataires ENABLE ROW LEVEL SECURITY;
ALTER TABLE incidents ENABLE ROW LEVEL SECURITY;
ALTER TABLE medias ENABLE ROW LEVEL SECURITY;
ALTER TABLE prestataires ENABLE ROW LEVEL SECURITY;
ALTER TABLE contrats_entretien ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE regles_bailleur ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins_bailleur ENABLE ROW LEVEL SECURITY;
ALTER TABLE historique_recherches ENABLE ROW LEVEL SECURITY;
ALTER TABLE logs_activite ENABLE ROW LEVEL SECURITY;
ALTER TABLE statistiques ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles_blog ENABLE ROW LEVEL SECURITY;
ALTER TABLE tutoriels ENABLE ROW LEVEL SECURITY;
ALTER TABLE cas_particuliers ENABLE ROW LEVEL SECURITY;

-- ============================================
-- DONNÉES INITIALES - CAS PARTICULIERS
-- ============================================

INSERT INTO cas_particuliers (code, titre, description, consigne, icone) VALUES
('vetuste', 'Vétusté', 'Usure normale due au temps', 'La vétusté peut être à la charge du bailleur. Contactez votre agence.', 'clock'),
('sinistre', 'Sinistre', 'Dégât des eaux, incendie, catastrophe naturelle', 'Contactez votre assurance habitation et signalez au bailleur.', 'alert-triangle'),
('vandalisme', 'Effraction / Vandalisme', 'Dégradation volontaire ou effraction', 'Déposez plainte puis contactez bailleur + assurance.', 'shield-alert'),
('degradation', 'Mauvaise utilisation / Dégradation', 'Dommage causé par le locataire', 'En cas de dégradation, le locataire paie le remplacement au prix du neuf.', 'user-x'),
('parties_communes', 'Parties communes', 'Problème dans les espaces communs', 'Contactez le gardien ou le bailleur.', 'users'),
('amiante', 'Logement avant 1999 (amiante)', 'Risque amiante dans ancien logement', 'Précautions particulières. Ne pas percer/poncer/gratter. Contactez le bailleur.', 'alert-circle');

-- ============================================
-- COMMENTAIRES SUR LES TABLES
-- ============================================

COMMENT ON TABLE bailleurs IS 'Bailleurs sociaux abonnés à la plateforme (multi-tenant)';
COMMENT ON TABLE agences IS 'Agences locales de chaque bailleur';
COMMENT ON TABLE codes_acces IS 'Codes d''accès fournis aux locataires pour s''inscrire';
COMMENT ON TABLE logements IS 'Logements gérés par les bailleurs';
COMMENT ON TABLE locataires IS 'Profil locataire lié à auth.users (Supabase Auth)';
COMMENT ON TABLE pieces IS 'Pièces du logement (cuisine, séjour, salle de bain, etc.)';
COMMENT ON TABLE equipements IS 'Équipements dans chaque pièce';
COMMENT ON TABLE pannes IS 'Base de connaissances des pannes (minimum 250)';
COMMENT ON TABLE cas_particuliers IS 'Cas particuliers affichant un bandeau "Ça dépend"';
COMMENT ON TABLE tutoriels IS 'Vidéos et tutoriels d''auto-dépannage';
COMMENT ON TABLE incidents IS 'Tickets/incidents déclarés par les locataires';
COMMENT ON TABLE medias IS 'Photos, vidéos, audio envoyés par les locataires';
COMMENT ON TABLE prestataires IS 'Entreprises partenaires des bailleurs';
COMMENT ON TABLE contrats_entretien IS 'Contrats d''entretien pour équipements spécifiques';
COMMENT ON TABLE notifications IS 'Notifications email/SMS/app envoyées aux locataires';
COMMENT ON TABLE regles_bailleur IS 'Règles personnalisées par bailleur (override des règles générales)';
COMMENT ON TABLE admins_bailleur IS 'Profil admin bailleur lié à auth.users (Supabase Auth)';
COMMENT ON TABLE historique_recherches IS 'Historique des recherches IA pour améliorer le diagnostic';
COMMENT ON TABLE logs_activite IS 'Logs d''activité pour conformité RGPD';
COMMENT ON TABLE statistiques IS 'Statistiques par bailleur pour le dashboard';
COMMENT ON TABLE faq IS 'Questions fréquentes pour SEO';
COMMENT ON TABLE articles_blog IS 'Articles de blog pour SEO';

-- ============================================
-- NOTE IMPORTANTE SUR L'AUTHENTIFICATION
-- ============================================
-- L'authentification est gérée par Supabase Auth (table auth.users)
-- Les tables 'locataires' et 'admins_bailleur' contiennent les profils métier liés via user_id
-- Email et mot de passe sont dans auth.users, pas dans les tables de profil

-- ============================================
-- PLATEFORME "QUI FAIT QUOI" - VERSION MINIMALISTE (MVP)
-- ============================================

-- Table des bailleurs (multi-tenant)
CREATE TABLE bailleurs (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    logo_url VARCHAR(500),
    couleur_primaire VARCHAR(7),
    api_key VARCHAR(255) UNIQUE,
    actif BOOLEAN DEFAULT TRUE,
    date_creation TIMESTAMPTZ DEFAULT NOW()
);

-- Table des locataires
CREATE TABLE locataires (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    bailleur_id INTEGER NOT NULL REFERENCES bailleurs(id) ON DELETE CASCADE,
    nom VARCHAR(255) NOT NULL,
    prenom VARCHAR(255) NOT NULL,
    telephone VARCHAR(20),
    date_creation TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id)
);

-- Table des logements
CREATE TABLE logements (
    id SERIAL PRIMARY KEY,
    bailleur_id INTEGER NOT NULL REFERENCES bailleurs(id) ON DELETE CASCADE,
    reference VARCHAR(100) NOT NULL,
    adresse TEXT,
    UNIQUE (bailleur_id, reference)
);

-- Table des pièces
CREATE TABLE pieces (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    icone_url VARCHAR(500)
);

-- Table des équipements
CREATE TABLE equipements (
    id SERIAL PRIMARY KEY,
    piece_id INTEGER NOT NULL REFERENCES pieces(id) ON DELETE CASCADE,
    nom VARCHAR(255) NOT NULL,
    sous_contrat BOOLEAN DEFAULT FALSE
);

-- Table des pannes (base de connaissances)
CREATE TABLE pannes (
    id SERIAL PRIMARY KEY,
    equipement_id INTEGER NOT NULL REFERENCES equipements(id) ON DELETE CASCADE,
    titre VARCHAR(255) NOT NULL,
    description TEXT,
    responsable VARCHAR(20) CHECK (responsable IN ('locataire', 'bailleur', 'contrat', 'a_verifier')) NOT NULL,
    qui_paie VARCHAR(30) CHECK (qui_paie IN ('locataire', 'bailleur', 'bailleur_recuperable')) NOT NULL,
    reference_juridique TEXT,
    auto_depannage_etapes JSONB
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
    statut VARCHAR(20) CHECK (statut IN ('nouveau', 'en_cours', 'resolu', 'ferme')) DEFAULT 'nouveau',
    responsable_identifie VARCHAR(20) CHECK (responsable_identifie IN ('locataire', 'bailleur', 'contrat', 'a_verifier')),
    diagnostic_ia JSONB,
    date_creation TIMESTAMPTZ DEFAULT NOW()
);

-- Table des médias (photos, vidéos, audio)
CREATE TABLE medias (
    id SERIAL PRIMARY KEY,
    incident_id INTEGER NOT NULL REFERENCES incidents(id) ON DELETE CASCADE,
    type_media VARCHAR(10) CHECK (type_media IN ('photo', 'video', 'audio')) NOT NULL,
    url VARCHAR(500) NOT NULL,
    analyse_ia JSONB,
    date_upload TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE bailleurs ENABLE ROW LEVEL SECURITY;
ALTER TABLE locataires ENABLE ROW LEVEL SECURITY;
ALTER TABLE logements ENABLE ROW LEVEL SECURITY;
ALTER TABLE incidents ENABLE ROW LEVEL SECURITY;
ALTER TABLE medias ENABLE ROW LEVEL SECURITY;

-- ============================================
-- DONNÉES INITIALES - PIÈCES DE BASE
-- ============================================

INSERT INTO pieces (nom, icone_url) VALUES
('Séjour', '/icons/living-room.svg'),
('Cuisine', '/icons/kitchen.svg'),
('Salle de bain', '/icons/bathroom.svg'),
('Extérieur', '/icons/outdoor.svg');

-- ============================================
-- POLITIQUES RLS DE BASE
-- ============================================

-- Les locataires peuvent voir leurs propres données
CREATE POLICY "Locataires peuvent voir leur profil"
    ON locataires FOR SELECT
    USING (auth.uid() = user_id);

-- Les locataires peuvent voir leurs propres incidents
CREATE POLICY "Locataires peuvent voir leurs incidents"
    ON incidents FOR SELECT
    USING (locataire_id IN (SELECT id FROM locataires WHERE user_id = auth.uid()));

-- Les locataires peuvent créer des incidents
CREATE POLICY "Locataires peuvent créer des incidents"
    ON incidents FOR INSERT
    WITH CHECK (locataire_id IN (SELECT id FROM locataires WHERE user_id = auth.uid()));

-- ============================================
-- COMMENTAIRES
-- ============================================

COMMENT ON TABLE bailleurs IS 'Bailleurs sociaux (multi-tenant)';
COMMENT ON TABLE locataires IS 'Profil locataire lié à auth.users (Supabase Auth)';
COMMENT ON TABLE logements IS 'Logements gérés par les bailleurs';
COMMENT ON TABLE pieces IS 'Pièces du logement (séjour, cuisine, salle de bain, extérieur)';
COMMENT ON TABLE equipements IS 'Équipements dans chaque pièce';
COMMENT ON TABLE pannes IS 'Base de connaissances des pannes';
COMMENT ON TABLE incidents IS 'Tickets déclarés par les locataires';
COMMENT ON TABLE medias IS 'Photos, vidéos, audio des incidents';

-- ============================================
-- NOTE IMPORTANTE
-- ============================================
-- L'authentification est gérée par Supabase Auth (table auth.users)
-- La table 'locataires' contient le profil métier lié via user_id
-- Email et mot de passe sont dans auth.users, pas dans locataires

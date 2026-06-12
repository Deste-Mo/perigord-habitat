-- Extensions
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ENUMS
CREATE TYPE incident_status AS ENUM (
    'nouveau',
    'en_cours',
    'resolu',
    'ferme'
);

CREATE TYPE responsable_type AS ENUM (
    'locataire',
    'bailleur',
    'contrat',
    'a_verifier'
);

CREATE TYPE qui_paie_type AS ENUM (
    'locataire',
    'bailleur',
    'bailleur_recuperable'
);

CREATE TYPE media_type AS ENUM (
    'photo',
    'video',
    'audio'
);

CREATE TYPE message_media_type AS ENUM (
    'image',
    'video',
    'file'
);

CREATE TYPE priorite_type AS ENUM (
    'faible',
    'moyenne',
    'haute',
    'urgente'
);

CREATE TYPE role_bailleur_type AS ENUM (
    'admin',
    'gestionnaire',
    'technicien'
);

-- =========================================================
-- BAILLEURS
-- =========================================================

CREATE TABLE public.bailleurs (
    id SERIAL PRIMARY KEY,
    nom VARCHAR NOT NULL,
    logo_url VARCHAR,
    couleur_primaire VARCHAR,
    api_key VARCHAR UNIQUE,
    actif BOOLEAN DEFAULT true,
    date_creation TIMESTAMPTZ DEFAULT now()
);

-- =========================================================
-- LOGEMENTS
-- =========================================================

CREATE TABLE public.logements (
    id SERIAL PRIMARY KEY,
    bailleur_id INTEGER NOT NULL REFERENCES public.bailleurs(id),
    reference VARCHAR NOT NULL,
    adresse TEXT,
    latitude NUMERIC(10,7),
    longitude NUMERIC(10,7)
);

-- =========================================================
-- LOCATAIRES
-- =========================================================

CREATE TABLE public.locataires (
    id SERIAL PRIMARY KEY,
    user_id UUID UNIQUE REFERENCES auth.users(id),
    bailleur_id INTEGER NOT NULL REFERENCES public.bailleurs(id),
    nom VARCHAR NOT NULL,
    prenom VARCHAR NOT NULL,
    telephone VARCHAR,
    date_creation TIMESTAMPTZ DEFAULT now()
);

-- =========================================================
-- UTILISATEURS BAILLEUR
-- =========================================================

CREATE TABLE public.utilisateurs_bailleur (
    id SERIAL PRIMARY KEY,
    user_id UUID UNIQUE NOT NULL REFERENCES auth.users(id),
    bailleur_id INTEGER NOT NULL REFERENCES public.bailleurs(id),
    role role_bailleur_type NOT NULL,
    date_creation TIMESTAMPTZ DEFAULT now()
);

-- =========================================================
-- HISTORIQUE DES OCCUPATIONS
-- =========================================================

CREATE TABLE public.locataire_logement (
    id SERIAL PRIMARY KEY,
    locataire_id INTEGER NOT NULL REFERENCES public.locataires(id),
    logement_id INTEGER NOT NULL REFERENCES public.logements(id),
    date_entree DATE,
    date_sortie DATE
);

-- =========================================================
-- PIECES
-- =========================================================

CREATE TABLE public.pieces (
    id SERIAL PRIMARY KEY,
    nom VARCHAR NOT NULL,
    icone_url VARCHAR
);

-- =========================================================
-- EQUIPEMENTS
-- =========================================================

CREATE TABLE public.equipements (
    id SERIAL PRIMARY KEY,
    piece_id INTEGER NOT NULL REFERENCES public.pieces(id),
    nom VARCHAR NOT NULL,
    sous_contrat BOOLEAN DEFAULT false
);

-- =========================================================
-- PANNES
-- =========================================================

CREATE TABLE public.pannes (
    id SERIAL PRIMARY KEY,
    equipement_id INTEGER NOT NULL REFERENCES public.equipements(id),
    titre VARCHAR NOT NULL,
    description TEXT,
    responsable responsable_type NOT NULL,
    qui_paie qui_paie_type NOT NULL,
    reference_juridique TEXT,
    auto_depannage_etapes JSONB
);

-- =========================================================
-- INCIDENTS
-- =========================================================

CREATE TABLE public.incidents (
    id SERIAL PRIMARY KEY,

    bailleur_id INTEGER NOT NULL
        REFERENCES public.bailleurs(id),

    locataire_id INTEGER NOT NULL
        REFERENCES public.locataires(id),

    logement_id INTEGER NOT NULL
        REFERENCES public.logements(id),

    panne_id INTEGER
        REFERENCES public.pannes(id),

    titre VARCHAR NOT NULL,
    description TEXT,

    statut incident_status DEFAULT 'nouveau',

    priorite priorite_type DEFAULT 'moyenne',

    responsable_identifie responsable_type,

    diagnostic_ia JSONB,

    cout_estime NUMERIC(12,2),

    cout_final NUMERIC(12,2),

    date_creation TIMESTAMPTZ DEFAULT now()
);

-- =========================================================
-- MEDIAS INCIDENTS
-- =========================================================

CREATE TABLE public.medias (
    id SERIAL PRIMARY KEY,

    incident_id INTEGER NOT NULL
        REFERENCES public.incidents(id)
        ON DELETE CASCADE,

    type_media media_type NOT NULL,

    url VARCHAR NOT NULL,

    analyse_ia JSONB,

    date_upload TIMESTAMPTZ DEFAULT now()
);

-- =========================================================
-- HISTORIQUE DES INCIDENTS
-- =========================================================

CREATE TABLE public.incident_histories (
    id SERIAL PRIMARY KEY,

    incident_id INTEGER NOT NULL
        REFERENCES public.incidents(id)
        ON DELETE CASCADE,

    action TEXT NOT NULL,

    auteur TEXT,

    created_at TIMESTAMPTZ DEFAULT now()
);

-- =========================================================
-- CONVERSATIONS
-- =========================================================

CREATE TABLE public.conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL
        REFERENCES auth.users(id)
        ON DELETE CASCADE,

    title TEXT NOT NULL DEFAULT 'Nouvelle discussion',

    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =========================================================
-- MESSAGES
-- =========================================================

CREATE TABLE public.messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    conversation_id UUID NOT NULL
        REFERENCES public.conversations(id)
        ON DELETE CASCADE,

    role TEXT NOT NULL
        CHECK (role IN ('user','assistant')),

    content TEXT NOT NULL DEFAULT '',

    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =========================================================
-- MEDIAS DES MESSAGES
-- =========================================================

CREATE TABLE public.message_medias (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    message_id UUID NOT NULL
        REFERENCES public.messages(id)
        ON DELETE CASCADE,

    name TEXT NOT NULL,

    media_type message_media_type NOT NULL,

    storage_path TEXT,

    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =========================================================
-- REPONSES IA
-- =========================================================

CREATE TABLE public.ai_responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    category TEXT NOT NULL,

    piece TEXT,

    problem TEXT NOT NULL,

    keywords TEXT[] NOT NULL,

    responsable TEXT,

    response TEXT NOT NULL,

    legal_ref TEXT,

    priority INTEGER NOT NULL DEFAULT 0,

    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =========================================================
-- INDEX
-- =========================================================

CREATE INDEX idx_locataires_user_id
ON public.locataires(user_id);

CREATE INDEX idx_incidents_locataire
ON public.incidents(locataire_id);

CREATE INDEX idx_incidents_logement
ON public.incidents(logement_id);

CREATE INDEX idx_incidents_panne
ON public.incidents(panne_id);

CREATE INDEX idx_medias_incident
ON public.medias(incident_id);

CREATE INDEX idx_messages_conversation
ON public.messages(conversation_id);

CREATE INDEX idx_message_medias_message
ON public.message_medias(message_id);

CREATE INDEX idx_ai_responses_category
ON public.ai_responses(category);

CREATE INDEX idx_ai_responses_problem
ON public.ai_responses(problem);

CREATE INDEX idx_conversations_user
ON public.conversations(user_id);
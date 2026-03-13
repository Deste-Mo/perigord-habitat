# Schéma de base de données - Qui fait quoi

## Tables et attributs

### 1. bailleurs (Bailleurs sociaux - multi-tenant)
```typescript
interface Bailleur {
  id: number;                    // SERIAL PRIMARY KEY
  nom: string;                   // VARCHAR(255) NOT NULL
  logo_url: string | null;       // VARCHAR(500)
  couleur_primaire: string | null; // VARCHAR(7)
  api_key: string;               // VARCHAR(255) UNIQUE
  actif: boolean;                // BOOLEAN DEFAULT TRUE
  date_creation: string;         // TIMESTAMPTZ DEFAULT NOW()
}
```

### 2. locataires (Profils locataires)
```typescript
interface Locataire {
  id: number;                    // SERIAL PRIMARY KEY
  user_id: string;               // UUID REFERENCES auth.users(id)
  bailleur_id: number;           // INTEGER REFERENCES bailleurs(id)
  nom: string;                   // VARCHAR(255) NOT NULL
  prenom: string;                // VARCHAR(255) NOT NULL
  telephone: string | null;      // VARCHAR(20)
  date_creation: string;         // TIMESTAMPTZ DEFAULT NOW()
}
```
**Note**: Email et mot de passe sont dans `auth.users`, pas dans `locataires`

### 3. logements (Logements gérés)
```typescript
interface Logement {
  id: number;                    // SERIAL PRIMARY KEY
  bailleur_id: number;           // INTEGER REFERENCES bailleurs(id)
  reference: string;             // VARCHAR(100) NOT NULL
  adresse: string | null;        // TEXT
}
```
**Contrainte**: UNIQUE (bailleur_id, reference)

### 4. pieces (Pièces du logement)
```typescript
interface Piece {
  id: number;                    // SERIAL PRIMARY KEY
  nom: string;                   // VARCHAR(100) NOT NULL
  icone_url: string | null;      // VARCHAR(500)
}
```
**Données initiales**: Séjour, Cuisine, Salle de bain, Extérieur

### 5. equipements (Équipements par pièce)
```typescript
interface Equipement {
  id: number;                    // SERIAL PRIMARY KEY
  piece_id: number;              // INTEGER REFERENCES pieces(id)
  nom: string;                   // VARCHAR(255) NOT NULL
  sous_contrat: boolean;         // BOOLEAN DEFAULT FALSE
}
```

### 6. pannes (Base de connaissances)
```typescript
interface Panne {
  id: number;                    // SERIAL PRIMARY KEY
  equipement_id: number;         // INTEGER REFERENCES equipements(id)
  titre: string;                 // VARCHAR(255) NOT NULL
  description: string | null;    // TEXT
  responsable: 'locataire' | 'bailleur' | 'contrat' | 'a_verifier'; // VARCHAR(20)
  qui_paie: 'locataire' | 'bailleur' | 'bailleur_recuperable';      // VARCHAR(30)
  reference_juridique: string | null; // TEXT
  auto_depannage_etapes: any | null;  // JSONB
}
```

### 7. incidents (Tickets déclarés)
```typescript
interface Incident {
  id: number;                    // SERIAL PRIMARY KEY
  bailleur_id: number;           // INTEGER REFERENCES bailleurs(id)
  locataire_id: number;          // INTEGER REFERENCES locataires(id)
  logement_id: number;           // INTEGER REFERENCES logements(id)
  panne_id: number | null;       // INTEGER REFERENCES pannes(id)
  titre: string;                 // VARCHAR(255) NOT NULL
  description: string | null;    // TEXT
  statut: 'nouveau' | 'en_cours' | 'resolu' | 'ferme'; // VARCHAR(20) DEFAULT 'nouveau'
  responsable_identifie: 'locataire' | 'bailleur' | 'contrat' | 'a_verifier' | null; // VARCHAR(20)
  diagnostic_ia: any | null;     // JSONB
  date_creation: string;         // TIMESTAMPTZ DEFAULT NOW()
}
```

### 8. medias (Photos, vidéos, audio)
```typescript
interface Media {
  id: number;                    // SERIAL PRIMARY KEY
  incident_id: number;           // INTEGER REFERENCES incidents(id)
  type_media: 'photo' | 'video' | 'audio'; // VARCHAR(10)
  url: string;                   // VARCHAR(500) NOT NULL
  analyse_ia: any | null;        // JSONB
  date_upload: string;           // TIMESTAMPTZ DEFAULT NOW()
}
```

## Relations

```
bailleurs (1) ──→ (N) logements
bailleurs (1) ──→ (N) locataires
bailleurs (1) ──→ (N) incidents

locataires (1) ──→ (N) incidents
logements (1) ──→ (N) incidents

pieces (1) ──→ (N) equipements
equipements (1) ──→ (N) pannes

pannes (1) ──→ (N) incidents (optionnel)
incidents (1) ──→ (N) medias

auth.users (1) ──→ (1) locataires
```

## Valeurs ENUM

### incidents.statut
- `nouveau` (défaut)
- `en_cours`
- `resolu`
- `ferme`

### incidents.responsable_identifie
- `locataire`
- `bailleur`
- `contrat`
- `a_verifier`

### pannes.responsable
- `locataire`
- `bailleur`
- `contrat`
- `a_verifier`

### pannes.qui_paie
- `locataire`
- `bailleur`
- `bailleur_recuperable`

### medias.type_media
- `photo`
- `video`
- `audio`

## Champs JSONB

### incidents.diagnostic_ia
Structure suggérée :
```json
{
  "confidence": 0.85,
  "panne_suggeree_id": 123,
  "tags": ["fuite", "eau", "urgent"],
  "analyse": "Fuite d'eau détectée..."
}
```

### medias.analyse_ia
Structure suggérée :
```json
{
  "description": "Fuite d'eau sous l'évier",
  "tags": ["eau", "fuite", "cuisine"],
  "confidence": 0.92,
  "objets_detectes": ["robinet", "tuyau", "eau"]
}
```

### pannes.auto_depannage_etapes
Structure suggérée :
```json
[
  {
    "ordre": 1,
    "titre": "Couper l'arrivée d'eau",
    "description": "Fermez le robinet d'arrêt...",
    "image_url": "/guides/etape1.jpg"
  },
  {
    "ordre": 2,
    "titre": "Vérifier le joint",
    "description": "Inspectez le joint...",
    "image_url": "/guides/etape2.jpg"
  }
]
```

## Row Level Security (RLS)

Tables avec RLS activé :
- ✅ bailleurs
- ✅ locataires
- ✅ logements
- ✅ incidents
- ✅ medias

Politiques de base :
- Locataires peuvent voir leur profil
- Locataires peuvent voir leurs incidents
- Locataires peuvent créer des incidents

## Notes importantes

1. **Authentification** : Gérée par Supabase Auth (`auth.users`)
2. **Multi-tenant** : Isolation par `bailleur_id`
3. **Cascade** : Suppression en cascade pour la plupart des relations
4. **Contraintes** : UNIQUE sur (bailleur_id, reference) pour logements
5. **Valeurs par défaut** : 
   - `actif = TRUE` pour bailleurs
   - `statut = 'nouveau'` pour incidents
   - `sous_contrat = FALSE` pour equipements
   - Timestamps automatiques avec `NOW()`

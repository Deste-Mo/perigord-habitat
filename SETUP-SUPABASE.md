# Configuration Supabase - Guide Complet

## 1. Créer un projet Supabase

1. Allez sur [supabase.com](https://supabase.com)
2. Créez un compte ou connectez-vous
3. Cliquez sur "New Project"
4. Remplissez les informations :
   - **Name**: qui-fait-quoi
   - **Database Password**: Choisissez un mot de passe fort (notez-le !)
   - **Region**: Europe West (Paris) pour la France
   - **Pricing Plan**: Free (pour commencer)

## 2. Récupérer les clés API

Une fois le projet créé :

1. Allez dans **Settings** (icône engrenage) > **API**
2. Copiez les informations suivantes :

```
Project URL: https://xxxxxxxxxxxxx.supabase.co
anon public key: eyJhbGc...
service_role key: eyJhbGc... (⚠️ PRIVÉ - Ne jamais exposer)
```

## 3. Configurer le fichier .env.local

Ouvrez `.env.local` et remplacez :

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...votre-anon-key
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...votre-service-role-key
DATABASE_URL=postgresql://postgres:VOTRE-MOT-DE-PASSE@db.xxxxxxxxxxxxx.supabase.co:5432/postgres
```

## 4. Créer la base de données

### Option A : Via l'interface Supabase (recommandé pour débuter)

1. Allez dans **SQL Editor** dans le menu Supabase
2. Cliquez sur **New Query**
3. Copiez le contenu de `database-supabase-minimal.sql` (ou `database-supabase-complete.sql`)
4. Cliquez sur **Run** (ou Ctrl+Enter)

### Option B : Via la ligne de commande

```bash
# Installer Supabase CLI
npm install -g supabase

# Se connecter
supabase login

# Lier le projet
supabase link --project-ref xxxxxxxxxxxxx

# Exécuter le script SQL
supabase db push
```

## 5. Configurer le Storage (pour les photos/vidéos)

1. Allez dans **Storage** dans le menu Supabase
2. Cliquez sur **Create a new bucket**
3. Configurez :
   - **Name**: `incidents-media`
   - **Public bucket**: ✅ Coché (pour accès public aux images)
   - **File size limit**: 10 MB
   - **Allowed MIME types**: `image/*,video/*,audio/*`

4. Créez les politiques de sécurité (Storage Policies) :

```sql
-- Permettre aux utilisateurs authentifiés d'uploader
CREATE POLICY "Utilisateurs authentifiés peuvent uploader"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'incidents-media');

-- Permettre à tous de lire (images publiques)
CREATE POLICY "Tout le monde peut lire"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'incidents-media');

-- Permettre aux utilisateurs de supprimer leurs propres fichiers
CREATE POLICY "Utilisateurs peuvent supprimer leurs fichiers"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'incidents-media' AND auth.uid()::text = (storage.foldername(name))[1]);
```

## 6. Configurer l'authentification

1. Allez dans **Authentication** > **Providers**
2. Activez **Email** (activé par défaut)
3. Configurez les options :
   - **Enable email confirmations**: ✅ (recommandé)
   - **Enable email change confirmations**: ✅
   - **Secure password change**: ✅

4. (Optionnel) Personnalisez les templates d'email :
   - Allez dans **Authentication** > **Email Templates**
   - Personnalisez les emails de confirmation, reset password, etc.

## 7. Configurer les politiques RLS (Row Level Security)

Les politiques RLS sont déjà activées dans le script SQL, mais voici des exemples supplémentaires :

```sql
-- Politique pour les locataires (voir leurs propres données)
CREATE POLICY "Locataires voient leur profil"
ON locataires FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- Politique pour les incidents (créer uniquement leurs incidents)
CREATE POLICY "Locataires créent leurs incidents"
ON incidents FOR INSERT
TO authenticated
WITH CHECK (
  locataire_id IN (
    SELECT id FROM locataires WHERE user_id = auth.uid()
  )
);

-- Politique pour les admins bailleur (voir tous les incidents de leur bailleur)
CREATE POLICY "Admins voient incidents de leur bailleur"
ON incidents FOR SELECT
TO authenticated
USING (
  bailleur_id IN (
    SELECT bailleur_id FROM admins_bailleur WHERE user_id = auth.uid()
  )
);
```

## 8. Tester la connexion

Créez un fichier de test `test-supabase.js` :

```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

// Test de connexion
async function testConnection() {
  const { data, error } = await supabase.from('bailleurs').select('*').limit(1)
  
  if (error) {
    console.error('❌ Erreur de connexion:', error)
  } else {
    console.log('✅ Connexion réussie!')
    console.log('Données:', data)
  }
}

testConnection()
```

Exécutez :
```bash
node test-supabase.js
```

## 9. Installer les dépendances Next.js

```bash
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
```

## 10. Créer le client Supabase dans Next.js

Créez `lib/supabase.ts` :

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

## 11. Données de test (optionnel)

Insérez des données de test via SQL Editor :

```sql
-- Insérer un bailleur de test
INSERT INTO bailleurs (nom, couleur_primaire, actif) 
VALUES ('Bailleur Test', '#FF6B35', true);

-- Insérer des équipements de test
INSERT INTO equipements (piece_id, nom, sous_contrat) VALUES
(1, 'Volets', false),
(1, 'Prises électriques', false),
(2, 'Évier', false),
(2, 'Robinet', false),
(3, 'Chasse d''eau', false),
(3, 'Joints', false);

-- Insérer des pannes de test
INSERT INTO pannes (equipement_id, titre, responsable, qui_paie, reference_juridique) VALUES
(1, 'Volet ne ferme plus', 'locataire', 'locataire', 'Décret n°87-712 du 26 août 1987'),
(3, 'Évier bouché', 'locataire', 'locataire', 'Décret n°87-712 du 26 août 1987'),
(5, 'Chasse d''eau qui coule', 'locataire', 'locataire', 'Décret n°87-712 du 26 août 1987');
```

## 12. Checklist finale

- [ ] Projet Supabase créé
- [ ] Clés API copiées dans `.env.local`
- [ ] Base de données créée (SQL exécuté)
- [ ] Storage bucket `incidents-media` créé
- [ ] Politiques RLS configurées
- [ ] Authentification email activée
- [ ] Dépendances npm installées
- [ ] Test de connexion réussi
- [ ] Données de test insérées (optionnel)

## 13. Ressources utiles

- [Documentation Supabase](https://supabase.com/docs)
- [Supabase + Next.js Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Storage Guide](https://supabase.com/docs/guides/storage)

## 14. Problèmes courants

### Erreur "relation does not exist"
→ Vérifiez que le script SQL a bien été exécuté

### Erreur "JWT expired"
→ Reconnectez-vous à Supabase

### Erreur "permission denied for table"
→ Vérifiez les politiques RLS

### Images ne s'affichent pas
→ Vérifiez que le bucket est public et que les politiques Storage sont configurées

---

🎉 Votre Supabase est maintenant configuré !

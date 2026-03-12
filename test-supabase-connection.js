// Test de connexion Supabase
require('dotenv').config({ path: '.env' })
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

console.log('🔍 Configuration Supabase:')
console.log('URL:', supabaseUrl)
console.log('Key:', supabaseKey ? `${supabaseKey.substring(0, 20)}...` : '❌ MANQUANTE')
console.log('')

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Erreur: Variables d\'environnement manquantes')
  console.log('Vérifiez que .env contient:')
  console.log('- NEXT_PUBLIC_SUPABASE_URL')
  console.log('- NEXT_PUBLIC_SUPABASE_ANON_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function testConnection() {
  console.log('🔄 Test de connexion à Supabase...\n')

  try {
    // Test 1: Vérifier la connexion
    console.log('Test 1: Connexion de base')
    const { data: healthCheck, error: healthError } = await supabase
      .from('bailleurs')
      .select('count')
      .limit(1)

    if (healthError) {
      if (healthError.message.includes('relation "bailleurs" does not exist')) {
        console.log('⚠️  La table "bailleurs" n\'existe pas encore')
        console.log('→ Exécutez le script SQL dans Supabase Dashboard > SQL Editor')
        console.log('→ Utilisez: database-supabase-minimal.sql ou database-supabase-complete.sql\n')
      } else {
        console.error('❌ Erreur:', healthError.message)
      }
    } else {
      console.log('✅ Connexion réussie!\n')
    }

    // Test 2: Vérifier l'authentification
    console.log('Test 2: Vérification de l\'authentification')
    const { data: { user } } = await supabase.auth.getUser()
    
    if (user) {
      console.log('✅ Utilisateur connecté:', user.email)
    } else {
      console.log('ℹ️  Aucun utilisateur connecté (normal pour l\'instant)\n')
    }

    // Test 3: Vérifier les pièces (données de base)
    console.log('Test 3: Vérification des données de base')
    const { data: pieces, error: piecesError } = await supabase
      .from('pieces')
      .select('*')

    if (piecesError) {
      console.log('⚠️  Table "pieces" non accessible:', piecesError.message)
    } else if (pieces && pieces.length > 0) {
      console.log('✅ Pièces trouvées:', pieces.length)
      pieces.forEach(p => console.log(`   - ${p.nom}`))
    } else {
      console.log('⚠️  Aucune pièce trouvée (table vide)')
      console.log('→ Insérez les données de base depuis le script SQL\n')
    }

    console.log('\n' + '='.repeat(50))
    console.log('✅ Tests terminés!')
    console.log('='.repeat(50))
    console.log('\n📋 Prochaines étapes:')
    console.log('1. Si les tables n\'existent pas: Exécutez le script SQL')
    console.log('2. Si tout fonctionne: Commencez le développement!')
    console.log('3. Consultez SETUP-SUPABASE.md pour plus d\'infos')

  } catch (error) {
    console.error('\n❌ Erreur inattendue:', error.message)
    console.error('Stack:', error.stack)
  }
}

testConnection()

# Guide de Migration - Club Créole

## 📊 Données Exportées

**Date d'export**: 26 Octobre 2025  
**Source**: Supabase Cloud (`psryoyugyimibjhwhvlh.supabase.co`)  
**Total**: 96 enregistrements dans 9 tables (22MB)

### Tables avec données
- **partners**: 12 enregistrements (19 colonnes)
- **accommodations**: 15 enregistrements (18 colonnes) 
- **restaurants**: 43 enregistrements (16 colonnes)
- **leisure_activities**: 1 enregistrement (13 colonnes)
- **activities**: 11 enregistrements (7 colonnes)
- **restaurant_reservations**: 12 enregistrements (11 colonnes)
- **travel_reservations**: 2 enregistrements (16 colonnes)

### Tables vides mais avec structure
- **profiles**: 0 enregistrements
- **subscriptions**: 0 enregistrements

## 🔧 Options d'Import

### Option 1: Script Automatique (Recommandé)
```bash
# Si vous avez la clé service_role du serveur distant
export SERVICE_SUPABASE_SERVICE_KEY="votre_service_key"
npx tsx ../scripts/import-to-remote-server.ts .
```

### Option 2: Interface Supabase Dashboard
1. Connectez-vous à `https://supabase.guadajobservices.fr`
2. Allez dans Table Editor
3. Pour chaque table, utilisez "Import data"
4. Uploadez le fichier JSON correspondant

### Option 3: SQL Direct (si accès PostgreSQL)
```bash
# Utilisez le fichier import.sql généré
psql -h [HOST] -U [USER] -d [DB] -f import.sql
```

### Option 4: API REST Manuelle
```bash
# Exemple pour la table restaurants
curl -X POST "https://supabase.guadajobservices.fr/rest/v1/restaurants" \
  -H "apikey: [VOTRE_CLÉ]" \
  -H "Content-Type: application/json" \
  -d @restaurants.json
```

## 📁 Contenu du Dossier

### Données
- `*.json` - Données de chaque table
- `*.structure.json` - Structure des colonnes

### Scripts
- `import.sql` - Script SQL d'import
- `export-summary.json` - Résumé de l'export

### Documentation
- `README-MIGRATION.md` - Ce guide

## ⚠️ Important

### Ordre d'import recommandé
1. `profiles` (vide mais structure)
2. `partners` 
3. `accommodations`
4. `restaurants`
5. `leisure_activities`
6. `activities`
7. `subscriptions` (vide)
8. `restaurant_reservations`
9. `travel_reservations`

### Vérifications post-import
```sql
-- Vérifier les comptages
SELECT 'partners' as table_name, COUNT(*) as count FROM partners
UNION ALL
SELECT 'accommodations', COUNT(*) FROM accommodations
UNION ALL
SELECT 'restaurants', COUNT(*) FROM restaurants
UNION ALL
SELECT 'activities', COUNT(*) FROM activities
UNION ALL
SELECT 'restaurant_reservations', COUNT(*) FROM restaurant_reservations
UNION ALL
SELECT 'travel_reservations', COUNT(*) FROM travel_reservations;
```

**Résultats attendus**:
- partners: 12
- accommodations: 15  
- restaurants: 43
- activities: 11
- restaurant_reservations: 12
- travel_reservations: 2

## 🚀 Finalisation

### 1. Après import réussi
Mettez à jour le fichier `.env` de l'application :
```env
VITE_SUPABASE_URL=https://supabase.guadajobservices.fr/
VITE_SUPABASE_PUBLISHABLE_KEY=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...
```

### 2. Test de l'application
```bash
npm run dev
# Vérifiez que les données s'affichent correctement
```

### 3. Validation complète
```bash
# Depuis le dossier du projet
npx tsx scripts/validate-supabase-migration.ts
```

## 📞 Support

En cas de problème :
1. Vérifiez les permissions sur le serveur cible
2. Consultez les logs d'erreur détaillés
3. Testez l'import table par table si nécessaire

## 📊 Métriques

- **Taille totale**: 22MB
- **Durée d'export**: ~30 secondes
- **Durée d'import estimée**: 2-5 minutes
- **Complexité**: Faible (aucune dépendance complexe)

---

**Note**: Toutes les données sont sécurisées et peuvent être réimportées autant de fois que nécessaire.
# État de la Migration des Données - Club Créole

## 📊 Résumé Exécutif

**Date**: 26 Octobre 2025
**État**: ✅ **Sauvegarde réussie** | ⚠️ **Import en attente**

### Ce qui a été accompli

1. **✅ Analyse de l'infrastructure**
   - Supabase Cloud (source) : Opérationnel
   - Supabase Local Docker : En cours d'exécution mais problème de configuration JWT

2. **✅ Estimation de la migration**
   - 96 enregistrements au total
   - 6 tables avec données : restaurants (43), accommodations (15), partners (12), activities (11), etc.
   - Temps estimé : 5 minutes
   - Complexité : Faible

3. **✅ Sauvegarde des données**
   - Fichier créé : `migration-backups/backup-api-2025-10-26T09-28-45-771Z.json`
   - Taille : 22 MB
   - Tables sauvegardées : partners, accommodations, restaurants, leisure_activities, activities, restaurant_reservations, travel_reservations

## 🔧 Problème Actuel

### Incompatibilité JWT Secret

Le JWT secret configuré dans Docker Compose ne correspond pas aux clés générées.
**Solution requise** : Régénérer les clés JWT avec le bon secret ou aligner le secret dans Docker Compose.

## 📁 Fichiers Créés

### Scripts de Migration
1. **`migrate-data-simple.ts`** - Migration via client Supabase JS
2. **`migrate-data-postgres.sh`** - Migration directe PostgreSQL (nécessite config)
3. **`migrate-via-api.ts`** - Migration via API REST (utilisé pour la sauvegarde)
4. **`import-backup-data.ts`** - Import depuis fichier JSON sauvegardé

### Fichiers de Configuration
- **`scripts/.env.migration`** - Variables d'environnement pour la migration
- **`scripts/MIGRATION-STATUS.md`** - Ce document

### Données Sauvegardées
- **`migration-backups/backup-api-2025-10-26T09-28-45-771Z.json`** - Données complètes

## 🚀 Prochaines Étapes

### Option 1 : Corriger la Configuration JWT (Recommandé)

```bash
# 1. Arrêter les containers
docker compose -f docker-compose.supabase.yml down

# 2. Mettre à jour le JWT_SECRET dans docker-compose.supabase.yml
# Utiliser : your-super-secret-jwt-secret-with-at-least-32-characters

# 3. Régénérer les clés JWT avec ce secret
# Outil : https://supabase.com/docs/guides/self-hosting#api-keys

# 4. Redémarrer les containers
docker compose -f docker-compose.supabase.yml up -d

# 5. Importer les données
npx tsx scripts/import-backup-data.ts
```

### Option 2 : Import Direct PostgreSQL

```bash
# Si vous avez accès direct à PostgreSQL
PGPASSWORD=$DB_PASSWORD psql -h localhost -U postgres -d postgres < backup.sql
```

### Option 3 : Utiliser Supabase CLI

```bash
# Installer Supabase CLI
npm install -g supabase

# Initialiser et migrer
supabase init
supabase db push
```

## 📝 Notes Importantes

1. **Données Sécurisées** : Toutes les données sont sauvegardées localement
2. **Pas de Perte** : Aucune donnée n'a été perdue ou modifiée sur la source
3. **Réversible** : Le processus peut être repris à tout moment
4. **Tables Manquantes** : Certaines tables n'existent pas encore (car_rentals, accommodation_rooms, etc.)

## 🔄 Commandes Utiles

```bash
# Vérifier l'état des containers
docker compose -f docker-compose.supabase.yml ps

# Voir les logs
docker compose -f docker-compose.supabase.yml logs supabase-kong

# Tester la connexion
curl http://localhost:8000/rest/v1/ -H "apikey: [VOTRE_CLÉ]"

# Réimporter les données
npx tsx scripts/import-backup-data.ts

# Basculer l'application vers local (après import réussi)
# Modifier .env :
# VITE_SUPABASE_URL=http://localhost:8000
# VITE_SUPABASE_PUBLISHABLE_KEY=[NOUVELLE_CLÉ_ANON]
```

## ✅ Validation Post-Migration

Une fois la migration réussie, valider avec :

```bash
# Vérifier les comptages
npx tsx scripts/validate-supabase-migration.ts

# Tester l'application
npm run dev
# Naviguer vers http://localhost:5173
```

## 📞 Support

En cas de problème :
1. Vérifier les logs Docker : `docker compose -f docker-compose.supabase.yml logs`
2. Consulter la documentation : `scripts/README-MIGRATION.md`
3. Utiliser le script de diagnostic : `npx tsx scripts/diagnostic-migration.ts`

---

**Statut Final** : Migration préparée avec succès. En attente de la correction de la configuration JWT pour finaliser l'import.
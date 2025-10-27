# Instructions d'Import Manuel - GuadaJobServices

## 🚨 Problème Identifié
L'import automatique échoue car nous n'avons pas la clé `service_role` nécessaire pour écrire dans la base de données distant.

**Erreur rencontrée** : `permission denied for schema public`

## 📋 Solutions Disponibles

### Solution 1: Obtenir la Clé Service Role
**Le plus simple** - Demandez à l'administrateur du serveur `supabase.guadajobservices.fr` de vous fournir la clé `service_role`.

Cette clé ressemble à :
```
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc2MTA2OTQ4MCwiZXhwIjo0OTE2NzQzMDgwLCJyb2xlIjoic2VydmljZV9yb2xlIn0...
```

Puis modifiez le script :
```bash
export SERVICE_SUPABASE_SERVICE_KEY="votre_service_key_ici"
npx tsx import-direct-guadajob.ts
```

### Solution 2: Import via Interface Supabase
**Interface graphique** - Connectez-vous à l'interface admin de Supabase :

1. Allez sur : `https://supabase.guadajobservices.fr`
2. Connectez-vous en tant qu'administrateur
3. Allez dans "Table Editor"
4. Pour chaque table :
   - Cliquez sur "Import data"
   - Uploadez le fichier JSON correspondant depuis `export-2025-10-26T10-34-45-320Z/`

**Ordre d'import recommandé** :
1. `profiles.json` (vide mais structure)
2. `partners.json` (12 enregistrements)
3. `accommodations.json` (15 enregistrements)
4. `restaurants.json` (43 enregistrements)
5. `leisure_activities.json` (1 enregistrement)
6. `activities.json` (11 enregistrements)
7. `subscriptions.json` (vide)
8. `restaurant_reservations.json` (12 enregistrements)
9. `travel_reservations.json` (2 enregistrements)

### Solution 3: SQL Direct via Interface Admin
**Copy-paste SQL** - Si vous avez accès à l'onglet SQL dans l'interface Supabase :

1. Ouvrez le fichier `export-2025-10-26T10-34-45-320Z/dump.sql`
2. Copiez tout le contenu
3. Collez dans l'éditeur SQL de Supabase
4. Exécutez

### Solution 4: Configuration des Permissions RLS
**Pour l'administrateur** - Si vous êtes administrateur, modifiez les politiques RLS :

```sql
-- Désactiver temporairement RLS pour l'import
ALTER TABLE partners DISABLE ROW LEVEL SECURITY;
ALTER TABLE accommodations DISABLE ROW LEVEL SECURITY;
ALTER TABLE restaurants DISABLE ROW LEVEL SECURITY;
-- ... pour toutes les tables

-- Puis réactiver après import
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
-- ... etc
```

## 📊 Données à Importer

**Total** : 96 enregistrements dans 9 tables (22MB)

| Table | Enregistrements | Fichier |
|-------|----------------|---------|
| partners | 12 | partners.json |
| accommodations | 15 | accommodations.json |
| restaurants | 43 | restaurants.json |
| leisure_activities | 1 | leisure_activities.json |
| activities | 11 | activities.json |
| restaurant_reservations | 12 | restaurant_reservations.json |
| travel_reservations | 2 | travel_reservations.json |
| profiles | 0 | (structure seulement) |
| subscriptions | 0 | (structure seulement) |

## 🔧 Informations Techniques

**Serveur cible** : `supabase.guadajobservices.fr`  
**API REST** : `https://supabase.guadajobservices.fr/rest/v1/`  
**Clé anon** : `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc2MTA2OTQ4MCwiZXhwIjo0OTE2NzQzMDgwLCJyb2xlIjoiYW5vbiJ9.XPLr03kTqHVfR3teQNHMmapCyz0ho7xNEfOG-TFS_bw`

## ✅ Vérification Post-Import

Après l'import, vérifiez avec cette requête SQL :

```sql
SELECT 'partners' as table_name, COUNT(*) as count FROM partners
UNION ALL
SELECT 'accommodations', COUNT(*) FROM accommodations
UNION ALL
SELECT 'restaurants', COUNT(*) FROM restaurants
UNION ALL
SELECT 'leisure_activities', COUNT(*) FROM leisure_activities
UNION ALL
SELECT 'activities', COUNT(*) FROM activities
UNION ALL
SELECT 'restaurant_reservations', COUNT(*) FROM restaurant_reservations
UNION ALL
SELECT 'travel_reservations', COUNT(*) FROM travel_reservations;
```

**Résultats attendus** :
- partners: 12
- accommodations: 15
- restaurants: 43
- leisure_activities: 1
- activities: 11
- restaurant_reservations: 12
- travel_reservations: 2

## 🎯 Finalisation

Une fois l'import terminé, mettez à jour votre application :

```env
# Dans votre fichier .env
VITE_SUPABASE_URL=https://supabase.guadajobservices.fr/
VITE_SUPABASE_PUBLISHABLE_KEY=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc2MTA2OTQ4MCwiZXhwIjo0OTE2NzQzMDgwLCJyb2xlIjoiYW5vbiJ9.XPLr03kTqHVfR3teQNHMmapCyz0ho7xNEfOG-TFS_bw
```

Puis redémarrez l'application :
```bash
npm run dev
```

---

**📁 Tous les fichiers sont prêts dans :** `export-2025-10-26T10-34-45-320Z/`
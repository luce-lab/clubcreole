# Guide de Migration Supabase

Ce guide détaille l'utilisation des scripts de migration pour transférer les données du Supabase cloud vers l'instance auto-hébergée.

## Configuration Automatique

Les scripts détectent automatiquement la configuration depuis le fichier `.env` existant.

### Variables Détectées Automatiquement

**Source (Cloud Supabase actuel)** :
- `VITE_SUPABASE_URL` → URL de l'instance cloud
- `VITE_SUPABASE_PUBLISHABLE_KEY` → Clé API anonyme cloud

**Cible (Instance auto-hébergée)** :
- `SERVICE_SUPABASE_ANON_KEY` → Clé API anonyme auto-hébergée
- `SERVICE_SUPABASESERVICE_KEY` → Clé service auto-hébergée
- URL auto-détectée : `https://services-supabase.clubcreole.fr`

## Scripts Disponibles

### 1. Test de Configuration
```bash
npx vite-node scripts/test-env-migration.ts
```

**Fonction** : Valide la configuration d'environnement avant migration

**Vérifications** :
- ✅ Détection des variables d'environnement
- ✅ Auto-détection de l'URL cible
- ✅ Correspondance avec les URLs commentées dans `client.ts`
- ✅ Validation de la complétude de la configuration

### 2. Validation de Migration
```bash
npx vite-node scripts/validate-supabase-migration.ts
```

**Fonction** : Valide l'intégrité d'une migration Supabase

**Tests effectués** :
- Connectivité API source et cible
- Comptage d'enregistrements par table
- Intégrité des données critiques
- Test des politiques RLS
- Performance basique de l'API

### 3. Mise à jour de Configuration
```bash
npx vite-node scripts/update-config.ts
```

**Fonction** : Met à jour la configuration de l'application pour pointer vers la nouvelle instance

**Actions** :
- Sauvegarde automatique de la configuration actuelle
- Génération de nouvelle configuration depuis les variables d'environnement
- Mise à jour de `src/integrations/supabase/client.ts`
- Validation de la nouvelle configuration
- Mise à jour du `.env.example`

### 4. Migration PostgreSQL Native
```bash
# Configuration requise (mots de passe PostgreSQL)
export SUPABASE_SOURCE_PASSWORD="your_source_pg_password"
export SUPABASE_TARGET_PASSWORD="your_target_pg_password"

# Exécution de la migration
./scripts/migrate-supabase.sh
```

**Fonction** : Migration complète via pg_dump/pg_restore

**Processus** :
1. Dump de la base source avec pg_dump
2. Restauration sur la base cible avec pg_restore
3. Validation de l'intégrité
4. Logs détaillés de l'opération

### 5. Rollback d'Urgence
```bash
./scripts/rollback-supabase.sh
```

**Fonction** : Restauration vers la configuration cloud en cas de problème

## Workflow de Migration Recommandé

### Phase 1 : Test de Configuration
```bash
# 1. Valider la configuration
npx vite-node scripts/test-env-migration.ts

# 2. Vérifier que toutes les variables sont présentes
# Si la configuration n'est pas complète, voir section "Dépannage"
```

### Phase 2 : Test de Connectivité
```bash
# 3. Tester la connectivité aux deux instances
npx vite-node scripts/validate-supabase-migration.ts
```

### Phase 3 : Migration des Données
```bash
# 4. Configurer les mots de passe PostgreSQL
export SUPABASE_SOURCE_PASSWORD="your_source_pg_password"
export SUPABASE_TARGET_PASSWORD="your_target_pg_password"

# 5. Exécuter la migration complète
./scripts/migrate-supabase.sh
```

### Phase 4 : Mise à jour de l'Application
```bash
# 6. Mettre à jour la configuration de l'application
npx vite-node scripts/update-config.ts

# 7. Valider la nouvelle configuration
npx vite-node scripts/validate-supabase-migration.ts

# 8. Tester l'application
npm run dev
```

## Dépannage

### Configuration Incomplète

Si le test de configuration échoue :

```bash
# Vérifier le contenu du .env
cat .env | grep -E "(VITE_SUPABASE|SERVICE_SUPABASE)"

# Vérifier les URLs commentées dans client.ts
grep -n "const SUPABASE_URL" src/integrations/supabase/client.ts
```

**Variables requises** :
- `VITE_SUPABASE_URL` (source)
- `VITE_SUPABASE_PUBLISHABLE_KEY` (source)
- `SERVICE_SUPABASE_ANON_KEY` (cible)
- `SERVICE_SUPABASESERVICE_KEY` (cible)

### Erreurs de Connectivité

Si la validation échoue :

1. **Vérifier les URLs** : S'assurer que l'instance auto-hébergée est accessible
2. **Vérifier les clés API** : Valider que les clés SERVICE_* sont correctes
3. **Tester manuellement** :
   ```bash
   curl -H "apikey: $SERVICE_SUPABASE_ANON_KEY" \
        "https://services-supabase.clubcreole.fr/rest/v1/profiles?select=count"
   ```

### Erreurs de Migration PostgreSQL

Si la migration échoue :

1. **Vérifier les mots de passe PostgreSQL**
2. **Vérifier la connectivité réseau** vers les instances
3. **Consulter les logs** dans `./migration-backups/logs/`

### Rollback

En cas de problème après migration :

```bash
# Rollback automatique vers cloud
./scripts/rollback-supabase.sh

# Ou rollback manuel
npx vite-node scripts/update-config.ts
# → utiliser les variables VITE_* comme cible
```

## Sécurité

- ✅ **Sauvegardes automatiques** : Toutes les configurations sont sauvegardées avant modification
- ✅ **Validation complète** : Tests d'intégrité avant et après migration
- ✅ **Logs détaillés** : Traçabilité complète des opérations
- ✅ **Rollback rapide** : Retour possible vers la configuration cloud
- ✅ **Pas de secrets exposés** : Les clés ne sont jamais affichées en entier dans les logs

## Fichiers de Sortie

- `./migration-backups/config-backups/` : Sauvegardes de configuration
- `./migration-backups/logs/` : Logs de migration PostgreSQL
- `./migration-backups/validation_*.json` : Rapports de validation
- `./migration-backups/config_update_*.json` : Rapports de mise à jour

## Support

En cas de problème, consulter :
1. Les logs dans `./migration-backups/`
2. La documentation OpenSpec dans `openspec/changes/transferer-donnees-supabase/`
3. Le fichier `CLAUDE.md` pour les commandes de développement
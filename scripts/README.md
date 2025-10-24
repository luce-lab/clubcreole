# Scripts de dump de base de données

Ce dossier contient des scripts pour créer des dumps de la base de données ClubCreole (Supabase/PostgreSQL).

## Scripts disponibles

### 1. `create-schema-dump.sh` - Dump du schéma
Consolide toutes les migrations SQL en un seul fichier de schéma.

**Utilisation :**
```bash
./scripts/create-schema-dump.sh
```

**Sortie :** `database-schema-dump.sql` (60 KB, 24 migrations)

### 2. `export-data.ts` - Export des données
Exporte toutes les données des tables principales au format SQL INSERT.

**Utilisation :**
```bash
vite-node scripts/export-data.ts
```

**Sortie :** `database-data-dump.sql`

## Guide complet

Pour un guide détaillé sur toutes les méthodes de dump disponibles, consultez :
👉 **[DATABASE_DUMP_GUIDE.md](./DATABASE_DUMP_GUIDE.md)**

## Fichiers créés

Les fichiers de dump suivants sont automatiquement ignorés par Git :
- `*_dump.sql`
- `database-*-dump.sql`
- `clubcreole_*.sql`

## Démarrage rapide

Pour créer un dump complet de développement :

```bash
# 1. Dump du schéma (structure)
./scripts/create-schema-dump.sh

# 2. Dump des données
vite-node scripts/export-data.ts

# 3. Vous aurez deux fichiers :
#    - database-schema-dump.sql (structure)
#    - database-data-dump.sql (données)
```

Pour un dump de production complet, utilisez `pg_dump` (voir le guide détaillé).

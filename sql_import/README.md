# 📂 sql_import/ - Données Club Créole

Ce dossier contient les fichiers SQL d'importation générés à partir de `backup_insert.sql`.

## 📊 Contenu

- **42 fichiers SQL** organisés par table
- **~450 Ko** de données d'insertion
- **Scripts d'importation** automatisés
- **Documentation** complète

## 🚀 Démarrage Rapide

### 1. Importation vers Supabase (Recommandé)

```bash
# Configuration
export SUPABASE_URL="db.psryoyugyimibjhwhvlh.supabase.co"
export SUPABASE_PASSWORD="votre_mot_de_passe"

# Lancer l'importation
./sql_import/import_supabase.sh --full
```

### 2. Test d'abord (quelques fichiers)

```bash
./sql_import/import_supabase.sh --test-only
```

### 3. Voir les commandes sans exécuter

```bash
./sql_import/import_supabase.sh --dry-run
```

## 📁 Fichiers Principaux

| Fichier | Description | Enregistrements |
|---------|-------------|-----------------|
| `accommodations.sql` | Hébergements | 15 |
| `activities.sql` | Activités | 11 |
| `restaurants.sql` | Restaurants | 43 |
| `car_models.sql` | Véhicules | 12 |
| `partners.sql` | Partenaires | - |
| `users.sql` | Utilisateurs | - |
| `profiles.sql` | Profils | - |
| ... et 35 autres fichiers | | |

## 📖 Documentation

- **GUIDE_IMPORT.md** - Guide complet d'importation en français
- **EXEMPLES_COMMANDES.sh** - Exemples de commandes à copier/coller
- **README.md** - Ce fichier

## 🔧 Scripts Disponibles

| Script | Usage |
|--------|-------|
| `import_supabase.sh` | Importation vers Supabase Cloud |
| `import_all.sh` | Importation vers base PostgreSQL générique |

## ⚡ Commandes Utiles

### Importer un fichier spécifique

```bash
PGPASSWORD=$SUPABASE_PASSWORD psql -h $SUPABASE_URL -U postgres \
    -d postgres -f sql_import/accommodations.sql
```

### Vérifier l'importation

```bash
PGPASSWORD=$SUPABASE_PASSWORD psql -h $SUPABASE_URL -U postgres \
    -d postgres -c "SELECT COUNT(*) FROM public.accommodations;"
```

### Lister les tables

```bash
PGPASSWORD=$SUPABASE_PASSWORD psql -h $SUPABASE_URL -U postgres \
    -d postgres -c "\dt public.*"
```

## 📋 Ordre d'Importation

Les scripts respectent l'ordre suivant :

1. **Tables de référence** (categories, subscription_plans, etc.)
2. **Données principales** (accommodations, activities, restaurants)
3. **Tables avec dépendances** (activity_images, car_rental_features)
4. **Utilisateurs** (users, profiles, subscriptions)

## ⚠️ Notes

- Les données peuvent écraser des enregistrements existants avec le même ID
- Certaines tables `auth.*` sont gérées automatiquement par Supabase
- Vérifiez les politiques RLS avant l'importation

## 🛠️ Dépannage

**Erreur de connexion ?**
```bash
# Testez la connexion
PGPASSWORD=$SUPABASE_PASSWORD psql -h $SUPABASE_URL -U postgres -d postgres -c "SELECT version();"
```

**Table existe déjà ?**
```bash
# Videz la table d'abord
PGPASSWORD=$SUPABASE_PASSWORD psql -h $SUPABASE_URL -U postgres \
    -d postgres -c "TRUNCATE TABLE public.accommodations CASCADE;"
```

**Voir les erreurs détaillées ?**
```bash
./import_supabase.sh --dry-run 2>&1 | tee import_log.txt
```

## 📞 Support

Pour plus d'informations, voir :
- `GUIDE_IMPORT.md` - Documentation complète
- `EXEMPLES_COMMANDES.sh` - Exemples de commandes

---

**Généré le :** 2025-12-25
**Source :** backup_insert.sql (643 Ko)
**Script :** split_backup_insert.py

# Guide d'Importation Manuelle Supabase vers Serveur Distant

## 🎯 Objectif
Importer les données Supabase exportées vers l'instance PostgreSQL auto-hébergée.

## 📋 Prérequis
- Accès SSH au serveur distant (configure via environment variables)
- Droits sudo pour l'installation de PostgreSQL
- Le dump SQL encodé en base64 (préparé localement)

## Configuration Requise
Définir les variables d'environnement suivantes:
- `TARGET_SERVER_HOST`: IP du serveur distant
- `TARGET_SERVER_USER`: Nom d'utilisateur SSH
- `TARGET_SERVER_PASSWORD`: Mot de passe SSH (ou utiliser des clés SSH)

## 🚀 Instructions Détaillées

### 1. Connexion au serveur distant
```bash
ssh $TARGET_SERVER_USER@$TARGET_SERVER_HOST
```

### 2. Installation PostgreSQL (si nécessaire)
```bash
sudo apt update
sudo DEBIAN_FRONTEND=noninteractive apt install -y postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### 3. Création de la base de données
```bash
# Création du répertoire de travail
mkdir -p /home/ubuntu/dumps
cd /home/ubuntu/dumps

# Création de la base de données
sudo -u postgres dropdb clubcreole_db 2>/dev/null || true
sudo -u postgres createdb -O postgres clubcreole_db
```

### 4. Transfert du dump SQL

#### Option A: Via Copier-Coller (Recommandée)
1. Sur votre machine locale, ouvrez le fichier `base64_import_remote.sh`
2. Copiez le contenu base64 (entre `BASE64_EOF` et `BASE64_EOF`)
3. Sur le serveur distant, créez le fichier:
```bash
cat > supabase_dump_20251028_164145.sql.b64
# Collez le contenu base64 ici
# Ctrl+D pour terminer
```

#### Option B: Via wget si serveur HTTP disponible
```bash
wget http://VOTRE_IP:8888/supabase_dump_20251028_164145.sql
```

### 5. Décodage et importation
```bash
# Décodage du fichier base64
base64 -d supabase_dump_20251028_164145.sql.b64 > supabase_dump_20251028_164145.sql

# Vérification du fichier décodé
ls -lh supabase_dump_20251028_164145.sql
head -5 supabase_dump_20251028_164145.sql

# Importation des données (peut prendre plusieurs minutes)
echo "Début de l'importation..."
sudo -u postgres psql -d clubcreole_db -f supabase_dump_20251028_164145.sql

# Or with password (set via environment variable):
PGPASSWORD=$DB_PASSWORD psql -h $TARGET_SERVER_HOST -U postgres -d postgres -f supabase_dump_20251028_164145.sql

# Vérification du succès
if [ $? -eq 0 ]; then
    echo "✅ Importation réussie !"
else
    echo "❌ Erreur lors de l'importation"
fi
```

### 6. Vérification post-importation
```bash
# Transférez et exécutez le script de vérification
# Ou utilisez ces commandes manuelles:

# Lister les tables
sudo -u postgres psql -d clubcreole_db -c "\dt"

# Compter les enregistrements par table
sudo -u postgres psql -d clubcreole_db -c "
SELECT
    schemaname,
    tablename,
    n_tup_ins as enregistrements
FROM pg_stat_user_tables
WHERE n_tup_ins > 0
ORDER BY n_tup_ins DESC;"

# Vérifier les utilisateurs
sudo -u postgres psql -d clubcreole_db -c "SELECT COUNT(*) as total_users FROM auth.users;"

# Vérifier les tables métier
sudo -u postgres psql -d clubcreole_db -c "
SELECT 'accommodations' as table, COUNT(*) as count FROM public.accommodations
UNION ALL
SELECT 'restaurants', COUNT(*) FROM public.restaurants
UNION ALL
SELECT 'activities', COUNT(*) FROM public.activities;"
```

## 🔍 Validation des Données

### Vérifications critiques à effectuer:
1. **Tables créées**: Toutes les tables `auth.*` et `public.*` doivent exister
2. **Utilisateurs auth**: Vérifier que les comptes utilisateurs sont présents
3. **Données métier**: Accommodations, restaurants, activités
4. **Contraintes**: Clés étrangères et index maintenus

### Commandes de validation avancées:
```bash
# Test de connexion à la base
sudo -u postgres psql -d clubcreole_db -c "SELECT version();"

# Vérification de l'intégrité
sudo -u postgres psql -d clubcreole_db -c "
SELECT
    'Total tables' as metric,
    COUNT(*) as value
FROM information_schema.tables
WHERE table_schema IN ('public', 'auth');"
```

## 📊 Informations de Connexion

Une fois l'importation terminée:

- **Hôte**: localhost ou `$TARGET_SERVER_HOST`
- **Base**: clubcreole_db
- **Utilisateur**: postgres
- **Port**: 5432
- **Mot de passe**: Stored in `$DB_PASSWORD` environment variable

## 🔧 Étapes Suivantes

1. **Mettre à jour la configuration Supabase** dans l'application React
2. **Tester les connexions** depuis l'application
3. **Valider les fonctionnalités critiques**
4. **Monitorer les performances** post-migration

## 🆘 Dépannage

### Erreurs communes:
- **Permission denied**: `sudo chown postgres:postgres /home/ubuntu/dumps/*`
- **Connection refused**: `sudo systemctl status postgresql`
- **Base exists déjà**: `sudo -u postgres dropdb clubcreole_db`

### Logs utiles:
```bash
# Logs PostgreSQL
sudo tail -f /var/log/postgresql/postgresql-*.log

# Status du service
sudo systemctl status postgresql
```

## ✅ Checklist Finale

- [ ] PostgreSQL installé et démarré
- [ ] Base `clubcreole_db` créée
- [ ] Dump SQL transféré et décodé
- [ ] Importation exécutée sans erreur
- [ ] Tables créées avec données
- [ ] Utilisateurs auth migrés
- [ ] Fonctionnalités de base testées

---

**En cas de problème**, le dump SQL original est disponible localement pour réessayer l'importation.
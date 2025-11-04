# Guide Complet de Migration Supabase vers Instance Auto-hébergée

## 🎯 Objectif
Migrer les données de l'instance Supabase cloud vers une instance auto-hébergée sur le serveur `37.59.121.40` avec `clubcreole_db`.

## 📋 Vue d'ensemble

### Infrastructure Source
- **Instance**: Supabase Cloud
- **Project Ref**: `psryoyugyimibjhwhvlh`
- **Dump disponible**: `supabase_dump_20251028_164145.sql` (12KB)

### Infrastructure Cible
- **Serveur**: `37.59.121.40`
- **Base de données**: `clubcreole_db`
- **PostgreSQL**: Port 5432
- **Utilisateur**: `postgres`
- **Mot de passe**: `Catilo`

## 🚀 Processus de Migration

### Étape 1: Préparation (Terminée)
- [x] Extraction des données via `pg_dump`
- [x] Encodage du dump en base64
- [x] Création de la branche `feature/supabase-transfer-finalization`
- [x] Validation de la proposition OpenSpec

### Étape 2: Importation sur Serveur Distant

#### Méthode A: Importation Manuelle (Recommandée)
1. **Connexion au serveur**:
   ```bash
   ssh ubuntu@37.59.121.40
   # Mot de passe: Catilo
   ```

2. **Installation PostgreSQL**:
   ```bash
   sudo apt update
   sudo DEBIAN_FRONTEND=noninteractive apt install -y postgresql postgresql-contrib
   sudo systemctl start postgresql
   sudo systemctl enable postgresql
   ```

3. **Préparation de la base**:
   ```bash
   mkdir -p /home/ubuntu/dumps
   cd /home/ubuntu/dumps
   sudo -u postgres dropdb clubcreole_db 2>/dev/null || true
   sudo -u postgres createdb -O postgres clubcreole_db
   ```

4. **Création du fichier dump**:
   ```bash
   cat > supabase_dump_20251028_164145.sql.b64
   # Coller le contenu base64 depuis base64_import_remote.sh
   # Ctrl+D pour terminer
   ```

5. **Décodage et importation**:
   ```bash
   base64 -d supabase_dump_20251028_164145.sql.b64 > supabase_dump_20251028_164145.sql
   sudo -u postgres psql -d clubcreole_db -f supabase_dump_20251028_164145.sql
   ```

### Étape 3: Validation Post-Importation

#### Script de vérification automatique
```bash
# Transférer le script sur le serveur
./verify_database_import.sh

# Ou vérification manuelle
sudo -u postgres psql -d clubcreole_db -c "\dt"
sudo -u postgres psql -d clubcreole_db -c "SELECT COUNT(*) FROM auth.users;"
```

#### Tests de connexion depuis l'application
```bash
# Tester la nouvelle configuration
npm run test:new-connection
node test_new_database_connection.ts
```

### Étape 4: Mise à Jour Configuration

#### Variables d'environnement à modifier
```bash
# Remplacer dans .env
VITE_SUPABASE_URL=http://37.59.121.40:8000
VITE_SUPABASE_PUBLISHABLE_KEY=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc2MTA2OTQ4MCwiZXhwIjo0OTE2NzQzMDgwLCJyb2xlIjoiYW5vbiJ9.XPLr03kTqHVfR3teQNHMmapCyz0ho7xNEfOG-TFS_bw
```

#### Configuration complète (fichier `.env.production.new`)
- URL Supabase: `http://37.59.121.40:8000`
- Base PostgreSQL: `postgresql://postgres:Catilo@37.59.121.40:5432/clubcreole_db`

## 🔍 Validation de la Migration

### Tests critiques à effectuer
1. **Connexion Supabase API**
   - Authentification utilisateur
   - Accès aux tables publiques
   - Politiques RLS fonctionnelles

2. **Données métier**
   - Accommodations: `SELECT COUNT(*) FROM public.accommodations`
   - Restaurants: `SELECT COUNT(*) FROM public.restaurants`
   - Activities: `SELECT COUNT(*) FROM public.activities`
   - Users: `SELECT COUNT(*) FROM auth.users`

3. **Fonctionnalités applicatives**
   - Login/logout
   - Réservations
   - Recherches
   - Dashboard admin

### Script de test complet
```typescript
// test_new_database_connection.ts
node test_new_database_connection.ts
```

## 📊 Structure des Données Migrées

### Schéma `auth`
- `users` - Comptes utilisateurs
- `sessions` - Sessions actives
- `refresh_tokens` - Tokens de rafraîchissement
- `identities` - Identités externes
- Tables MFA et SSO

### Schéma `public`
- `accommodations` - Hébergements
- `restaurants` - Restaurants
- `activities` - Activités
- `users` - Profils utilisateurs
- Tables de réservation et booking

### Schéma `storage`
- `buckets` - Conteneurs de fichiers
- `objects` - Fichiers stockés

## ⚠️ Points d'Attention

### Sécurité
- **Mot de passe PostgreSQL**: `Catilo` (à changer en production)
- **Clés Supabase**: Utiliser les clés générées lors de l'installation
- **Accès réseau**: Configurer le firewall pour autoriser les connexions

### Performance
- **Index**: Vérifier que tous les index ont été migrés
- **Contraintes**: Valider les clés étrangères
- **Taille**: Surveiller l'espace disque post-migration

### Compatibilité
- **Extensions PostgreSQL**: Vérifier les extensions requises
- **Version PostgreSQL**: Compatibilité des types de données
- **Fonctions Supabase**: API REST et GraphQL générées automatiquement

## 🔄 Rollback Plan

En cas de problème avec la nouvelle instance:

1. **Restauration de l'ancienne configuration**:
   ```bash
   # Restaurer le fichier .env original
   cp .env.backup .env
   ```

2. **Redémarrage avec l'ancienne instance**:
   ```bash
   npm run dev
   ```

3. **Sauvegarde de la nouvelle base**:
   ```bash
   # Sur le serveur distant
   sudo -u postgres pg_dump clubcreole_db > rollback_backup.sql
   ```

## 📈 Monitoring Post-Migration

### Indicateurs à surveiller
- **Performance des requêtes**
- **Taux d'erreur API**
- **Utilisation mémoire/ CPU**
- **Espace disque**

### Outils de monitoring
```bash
# Logs PostgreSQL
sudo tail -f /var/log/postgresql/postgresql-*.log

# Statistiques de connexion
sudo -u postgres psql -d clubcreole_db -c "SELECT * FROM pg_stat_activity;"

# Taille des tables
sudo -u postgres psql -d clubcreole_db -c "
  SELECT schemaname, tablename,
         pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size
  FROM pg_tables
  WHERE schemaname IN ('public', 'auth')
  ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;"
```

## ✅ Checklist Finale

### Avant de basculer
- [ ] Importation réussie sans erreur
- [ ] Toutes les tables présentes avec données
- [ ] Connexion API Supabase fonctionnelle
- [ ] Authentification testée
- [ ] Fonctionnalités critiques validées

### Après basculement
- [ ] Application connectée à la nouvelle instance
- [ ] Tests fumée passés
- [ ] Monitoring configuré
- [ ] Backup initial créé
- [ ] Documentation mise à jour

## 🆘 Support et Dépannage

### Erreurs communes
- **Connection refused**: Vérifier que PostgreSQL tourne sur le port 5432
- **Permission denied**: Vérifier les droits de l'utilisateur postgres
- **Table not found**: Exécuter `SELECT * FROM pg_tables;` pour diagnostiquer

### Commandes utiles
```bash
# Redémarrer PostgreSQL
sudo systemctl restart postgresql

# Vérifier les ports ouverts
sudo netstat -tlnp | grep 5432

# Connexion directe à la base
sudo -u postgres psql -d clubcreole_db
```

---

**Migration préparée avec succès!** Suivez ce guide pour une transition en douceur vers votre instance Supabase auto-hébergée.
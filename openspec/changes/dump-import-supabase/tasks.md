# Tâches: Dump et Import Base de Données Supabase

## Phase 1: Préparation

- [ ] 1.1 Vérifier les prérequis (pg_dump, psql installés)
- [ ] 1.2 Récupérer le mot de passe de la base source Supabase cloud
- [ ] 1.3 Tester la connectivité à l'instance source
- [ ] 1.4 Tester la connectivité à l'instance cible ($TARGET_SERVER_HOST)
- [ ] 1.5 Estimer la taille du dump (`pg_database_size`)

## Phase 2: Dump de la base source

- [ ] 2.1 Créer le répertoire de backup local
- [ ] 2.2 Exécuter pg_dump avec les options appropriées:
  ```bash
  PGPASSWORD="<password>" pg_dump \
    -h db.psryoyugyimibjhwhvlh.supabase.co \
    -p 6543 \
    -U postgres.psryoyugyimibjhwhvlh \
    -d postgres \
    --verbose --clean --if-exists \
    --no-owner --no-privileges \
    -f migration-backups/supabase_dump_$(date +%Y%m%d).sql
  ```
- [ ] 2.3 Valider le fichier dump (taille > 0, contenu SQL valide)

## Phase 3: Import vers instance cible

- [ ] 3.1 Se connecter au serveur cible ($TARGET_SERVER_USER@$TARGET_SERVER_HOST)
- [ ] 3.2 Transférer le fichier dump vers le serveur
- [ ] 3.3 Préparer l'instance Supabase cible (vérifier qu'elle est vierge ou nettoyer)
- [ ] 3.4 Exécuter l'import:
  ```bash
  psql -h localhost -U postgres -d postgres -f supabase_dump.sql
  ```
- [ ] 3.5 Vérifier les logs d'import pour les erreurs

## Phase 4: Validation

- [ ] 4.1 Comparer le nombre de tables source vs cible
- [ ] 4.2 Comparer le nombre d'enregistrements par table critique:
  - `accommodations`
  - `restaurants`
  - `activities`
  - `users`
  - `reservations`
- [ ] 4.3 Tester l'API Supabase de l'instance cible
- [ ] 4.4 Vérifier les politiques RLS

## Phase 5: Basculement application (optionnel)

- [ ] 5.1 Mettre l'application en maintenance
- [ ] 5.2 Mettre à jour `.env` avec les nouvelles URLs Supabase
- [ ] 5.3 Reconstruire et déployer l'application
- [ ] 5.4 Tester les fonctionnalités critiques
- [ ] 5.5 Retirer le mode maintenance

## Rollback (si nécessaire)

- [ ] R.1 Restaurer les anciennes variables d'environnement
- [ ] R.2 Redéployer avec la configuration cloud originale

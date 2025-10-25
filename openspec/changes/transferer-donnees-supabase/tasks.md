# Tâches de Migration Supabase Cloud vers Auto-hébergé

## 1. Configuration Infrastructure Auto-hébergée
- [ ] 1.1 Installer et configurer l'instance Supabase auto-hébergée
- [ ] 1.2 Configurer PostgreSQL avec les extensions requises par Supabase
- [ ] 1.3 Tester la connectivité et l'API Supabase auto-générée
- [ ] 1.4 Configurer les accès réseau pour la migration
- [x] 1.5 Estimer la taille actuelle des données (via pg_database_size)
- [ ] 1.6 Vérifier les ressources serveur nécessaires

## 2. Développement des Scripts de Migration PostgreSQL
- [x] 2.1 Créer le script bash `migrate-supabase.sh` (pg_dump/pg_restore)
- [x] 2.2 Développer `validate-supabase-migration.ts` pour validation API
- [x] 2.3 Créer le script de rollback `rollback-supabase.sh`
- [x] 2.4 Développer `update-config.ts` pour mise à jour des URLs
- [x] 2.5 Ajouter la gestion des logs et monitoring de migration
- [x] 2.6 Tester les scripts sur environnement de développement

## 3. Test Migration Complète
- [ ] 3.1 Effectuer pg_dump complet de l'instance cloud de développement
- [ ] 3.2 Tester pg_restore vers instance auto-hébergée de test
- [ ] 3.3 Valider que l'API Supabase fonctionne correctement
- [ ] 3.4 Tester les politiques RLS et l'authentification
- [ ] 3.5 Mesurer les temps de migration et performances

## 4. Validation et Tests Application
- [ ] 4.1 Tester l'application React avec la nouvelle instance Supabase
- [ ] 4.2 Valider toutes les fonctionnalités métier (accommodations, restaurants, etc.)
- [ ] 4.3 Tester l'authentification et les politiques RLS
- [ ] 4.4 Vérifier les performances des requêtes
- [ ] 4.5 Tester les Edge Functions si utilisées
- [ ] 4.6 Valider l'intégrité des relations entre tables
- [ ] 4.7 Effectuer un test de rollback complet

## 5. Préparation Migration Production
- [ ] 5.1 Planifier la fenêtre de maintenance (1-2 heures)
- [ ] 5.2 Préparer la communication utilisateurs
- [ ] 5.3 Finaliser la configuration de l'instance production auto-hébergée
- [ ] 5.4 Créer une sauvegarde de sécurité de l'instance cible
- [ ] 5.5 Préparer le monitoring et alertes post-migration
- [ ] 5.6 Documenter la procédure d'urgence et rollback

## 6. Exécution Migration Production
- [ ] 6.1 Mettre l'application en mode maintenance
- [ ] 6.2 Effectuer pg_dump de l'instance Supabase cloud production
- [ ] 6.3 Exécuter pg_restore vers l'instance auto-hébergée
- [ ] 6.4 Valider l'intégrité des données (checksums, comptages)
- [ ] 6.5 Tester l'API Supabase et l'authentification
- [ ] 6.6 Mettre à jour la configuration application (SUPABASE_URL)
- [ ] 6.7 Effectuer des tests fumée sur les fonctionnalités critiques
- [ ] 6.8 Remettre l'application en service

## 7. Post-Migration et Monitoring
- [ ] 7.1 Surveiller les performances de l'instance auto-hébergée
- [ ] 7.2 Monitorer les erreurs d'application et logs
- [ ] 7.3 Valider le bon fonctionnement des réservations et bookings
- [ ] 7.4 Contrôler l'intégrité des données sur quelques jours
- [ ] 7.5 Optimiser la configuration PostgreSQL si nécessaire
- [ ] 7.6 Documenter les performances et leçons apprises

## 8. Finalisation et Documentation
- [ ] 8.1 Nettoyer les fichiers temporaires de migration
- [ ] 8.2 Archiver les dumps et sauvegardes de sécurité
- [ ] 8.3 Mettre à jour la documentation technique (URLs, configuration)
- [ ] 8.4 Documenter la procédure de backup de l'instance auto-hébergée
- [ ] 8.5 Former l'équipe sur l'administration de l'instance Supabase
- [ ] 8.6 Planifier la stratégie de maintenance et mises à jour
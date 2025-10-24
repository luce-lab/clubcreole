# Script de Scraping TripAdvisor

Ce document explique comment utiliser le script de scraping TripAdvisor pour remplir la base de données de restaurants.

## Prérequis

- Node.js et pnpm installés
- Accès à la base de données Supabase configuré dans `.env`
- Variables d'environnement Supabase configurées:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`

## Installation

Les dépendances sont déjà installées si vous avez exécuté `pnpm install`. Le script utilise Puppeteer pour le scraping.

Si Puppeteer a besoin de télécharger Chrome, exécutez:
```bash
pnpm approve-builds
# Puis sélectionnez "puppeteer" avec la barre d'espace et validez avec Entrée
```

## Utilisation

### Commande de base

```bash
npm run scrape-tripadvisor
```

Cela va:
1. Scraper la page par défaut (Le Gosier, Guadeloupe)
2. Extraire jusqu'à 20 restaurants
3. Les insérer automatiquement dans la base de données Supabase

### Avec URL personnalisée

```bash
npm run scrape-tripadvisor "https://www.tripadvisor.com/Restaurants-g644387-Le_Gosier_Grande_Terre_Island_Guadeloupe.html"
```

### Avec limite personnalisée

```bash
npm run scrape-tripadvisor "https://www.tripadvisor.com/Restaurants-g644387-Le_Gosier_Grande_Terre_Island_Guadeloupe.html" 50
```

Cela va extraire jusqu'à 50 restaurants.

## Données extraites

Le script extrait les informations suivantes pour chaque restaurant:

- **Nom** du restaurant
- **Note** (rating sur 5)
- **Type de cuisine** (Type)
- **Fourchette de prix** (€, €€, €€€, etc.)
- **Localisation**
- **Description** (si disponible)
- **Image** principale
- **URL** du restaurant sur TripAdvisor

## Mapping vers la base de données

Les données sont automatiquement mappées vers le schéma de la table `restaurants`:

| TripAdvisor | Base de données | Notes |
|-------------|-----------------|-------|
| Nom | `name` | Unique dans la BD |
| Note | `rating` | Converti en échelle 0-5 |
| Type de cuisine | `type` | Ex: "Française", "Créole" |
| Prix | `price_range` | Ex: "€€", "€€€" |
| Localisation | `location` | Ville/région |
| Description | `description` | Description du restaurant |
| Image | `image` | URL de l'image |
| - | `icon` | Par défaut: "utensils" |
| - | `gallery_images` | Par défaut: [] |
| - | `opening_hours` | Par défaut: null pour tous les jours |
| - | `specialties` | Par défaut: [] |
| - | `offer` | Par défaut: null |
| - | `poids` | Par défaut: 0 (pour le tri) |

## Gestion des erreurs

Le script gère automatiquement:

- **Restaurants en double**: Si un restaurant avec le même nom existe déjà, il est ignoré avec un avertissement
- **Erreurs d'extraction**: Les restaurants mal formatés sont ignorés
- **Erreurs d'insertion**: Chaque erreur est loggée avec le nom du restaurant concerné

## Sortie du script

Le script affiche:

1. Progression du scraping
2. Liste des restaurants trouvés
3. Progression de l'insertion dans la BD
4. Résumé final avec:
   - Nombre de restaurants insérés avec succès
   - Nombre d'erreurs
   - Liste des erreurs (sauf doublons)

Exemple de sortie:
```
🍽️  Scraping des restaurants TripAdvisor
==========================================

🚀 Démarrage du scraping de TripAdvisor...
📍 URL: https://www.tripadvisor.com/Restaurants-g644387...
📄 Chargement de la page...
🔍 Extraction des données des restaurants...
✅ 20 restaurants extraits

📋 Aperçu des restaurants trouvés:
1. Le Grand Bleu - 4.5/5 - €€€
2. La Table Créole - 4.8/5 - €€
...

💾 Insertion des restaurants dans la base de données...
✅ Le Grand Bleu inséré avec succès
✅ La Table Créole inséré avec succès
...

📊 Résumé:
✅ 18 restaurants insérés
❌ 2 erreurs

✅ Scraping terminé avec succès!
```

## Limitations connues

1. **Rate limiting**: TripAdvisor peut bloquer les requêtes trop fréquentes. Attendez quelques minutes entre les exécutions.

2. **Structure HTML**: TripAdvisor peut changer la structure de leur site. Le script utilise plusieurs sélecteurs pour être robuste, mais il peut nécessiter des mises à jour.

3. **Images**: Certaines images peuvent ne pas être disponibles ou nécessiter un chargement lazy.

4. **Descriptions**: Les descriptions complètes ne sont souvent disponibles que sur les pages individuelles des restaurants.

## Améliorations futures possibles

- [ ] Scraping des pages individuelles pour plus de détails (horaires, galerie d'images, spécialités)
- [ ] Support de la pagination pour scraper tous les restaurants d'une ville
- [ ] Mise à jour des restaurants existants au lieu de les ignorer
- [ ] Export des données en JSON avant insertion
- [ ] Mode "dry-run" pour voir les données sans les insérer

## Troubleshooting

### Erreur: "Sélecteur non trouvé"
TripAdvisor a peut-être changé sa structure HTML. Vérifiez que la page s'affiche correctement dans un navigateur.

### Erreur: "Failed to launch browser"
Puppeteer n'a pas pu lancer Chrome. Exécutez `pnpm approve-builds` et sélectionnez puppeteer.

### Erreur de connexion Supabase
Vérifiez que vos variables d'environnement sont correctement configurées dans `.env`.

### Les restaurants sont tous en erreur "unique"
Les restaurants existent déjà dans la base de données. C'est normal si vous réexécutez le script.

## Support

Pour toute question ou problème, consultez la documentation Supabase ou contactez l'équipe de développement.

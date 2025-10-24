# Guide de Scraping

## État actuel

### TripAdvisor
Le script `scrapeTripAdvisor.ts` est prêt et fonctionnel techniquement, mais **TripAdvisor bloque actuellement l'accès** depuis cet environnement.

#### Problème rencontré
- **Type de blocage**: Blocage au niveau réseau/IP (probablement Cloudflare)
- **Message**: "Access denied"
- **Cause**: TripAdvisor détecte que les requêtes proviennent d'un data center et non d'un réseau résidentiel

#### Améliorations apportées au script
1. ✅ Installation de Chrome headless
2. ✅ Configuration avancée anti-détection:
   - Arguments Chrome optimisés (`--disable-blink-features=AutomationControlled`, etc.)
   - Headers HTTP réalistes
   - Viewport standard (1920x1080)
3. ✅ Intégration de `puppeteer-extra` avec `stealth-plugin`
4. ✅ Client Supabase compatible Node.js (`node-client.ts`)
5. ✅ Gestion d'erreurs et logs détaillés
6. ✅ Captures d'écran pour debugging

## Solutions alternatives

### Option 1: Proxy résidentiel (Recommandé)
Utiliser un service de proxy résidentiel comme:
- **Bright Data** (ex-Luminati)
- **Oxylabs**
- **Smartproxy**

```bash
# Exemple d'utilisation avec proxy
npm run scrape-tripadvisor -- --proxy="http://username:password@proxy-host:port"
```

### Option 2: Exécution depuis un réseau résidentiel
Exécuter le script depuis une connexion Internet résidentielle normale (pas un data center):

```bash
# Depuis votre machine locale
git clone <repo>
cd clubcreole
pnpm install
npm run scrape-tripadvisor
```

### Option 3: API TripAdvisor (Si disponible)
Vérifier si TripAdvisor propose une API officielle pour accéder aux données légalement:
- [TripAdvisor Content API](https://www.tripadvisor.com/developers)

### Option 4: Sources alternatives
Scraper d'autres sources moins protégées:
- Google Maps / Google Places API
- Yelp API
- Pages Facebook des restaurants
- Sites locaux de tourisme

### Option 5: Saisie manuelle
Pour un nombre limité de restaurants, la saisie manuelle via l'interface admin peut être plus rapide.

## Utilisation du script

### Commande de base
```bash
npm run scrape-tripadvisor
```

### Avec paramètres personnalisés
```bash
# Scraper une autre URL
npm run scrape-tripadvisor -- "https://www.tripadvisor.com/Restaurants-g147313-Guadeloupe.html"

# Limiter le nombre de restaurants
npm run scrape-tripadvisor -- "https://..." 50
```

### Variables d'environnement
Le script utilise automatiquement les credentials Supabase du fichier `.env`:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

## Architecture

### Fichiers créés/modifiés
1. **`src/scripts/scrapeTripAdvisor.ts`**: Script principal de scraping
2. **`src/integrations/supabase/node-client.ts`**: Client Supabase pour Node.js (sans localStorage)
3. **`package.json`**: Ajout du script `scrape-tripadvisor`

### Dépendances ajoutées
- `puppeteer`: Automatisation du navigateur
- `puppeteer-extra`: Extension de Puppeteer
- `puppeteer-extra-plugin-stealth`: Plugin anti-détection
- `dotenv`: Gestion des variables d'environnement

## Troubleshooting

### Chrome n'est pas installé
```bash
# Le script devrait détecter automatiquement, mais si nécessaire:
npx puppeteer browsers install chrome
```

### Erreur "localStorage is not defined"
✅ Résolu via `node-client.ts` qui n'utilise pas localStorage

### "Access denied" de TripAdvisor
C'est le problème actuel - voir les solutions alternatives ci-dessus.

## Notes légales

⚠️ **Important**: Le scraping de sites web peut violer les conditions d'utilisation. Toujours:
1. Consulter les Terms of Service du site
2. Respecter le fichier `robots.txt`
3. Ne pas surcharger les serveurs (rate limiting)
4. Privilégier les APIs officielles quand disponibles

TripAdvisor a des ToS stricts concernant le scraping. L'utilisation d'une API officielle est recommandée pour un usage commercial.

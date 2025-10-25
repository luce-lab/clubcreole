# Données d'import pour ClubCreole

Ce répertoire contient les fichiers JSON de données à importer dans Supabase.

## Structure

```
data/
├── accommodations/     # Hébergements (hôtels, bungalows, etc.)
│   └── la-colline-verte.json
├── restaurants/        # Restaurants (à venir)
└── activities/         # Activités et loisirs (à venir)
```

## Utilisation

### Option 1 : Import via script Node.js

1. Assurez-vous que votre `.env` contient la clé service_role :
   ```
   VITE_SUPABASE_SERVICE_ROLE_KEY="votre-clé-service-role"
   ```

2. Exécutez le script d'import :
   ```bash
   npm run import-accommodations
   ```

### Option 2 : Import manuel via Supabase Dashboard

1. Ouvrez le fichier JSON (par exemple `accommodations/la-colline-verte.json`)
2. Copiez tout le contenu
3. Allez sur https://supabase.com/dashboard
4. Sélectionnez votre projet
5. Allez dans **Table Editor** > **accommodations**
6. Cliquez sur **Insert** > **Insert row**
7. Pour les champs JSONB (gallery_images, features, amenities, rules), collez directement les arrays JSON
8. Cliquez sur **Save**

### Option 3 : Import via curl (ligne de commande)

```bash
# Avec votre clé service_role
curl -X POST "https://psryoyugyimibjhwhvlh.supabase.co/rest/v1/accommodations" \
  -H "apikey: VOTRE_SERVICE_ROLE_KEY" \
  -H "Authorization: Bearer VOTRE_SERVICE_ROLE_KEY" \
  -H "Content-Type: application/json" \
  -H "Prefer: return=representation" \
  -d @data/accommodations/la-colline-verte.json
```

## Fichiers disponibles

- **la-colline-verte.json** : Bungalow créole situé entre Saint-Rose et Deshaies

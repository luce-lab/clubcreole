# Guide d'importation des données

Ce guide explique comment importer des données dans la base de données Supabase.

## 📁 Fichiers de données disponibles

Les fichiers JSON sont dans le répertoire `data/` :

```
data/
├── accommodations/
│   └── la-colline-verte.json  ← Bungalow créole en Guadeloupe
└── README.md                   ← Documentation détaillée
```

## 🚀 Méthodes d'importation

### Méthode 1 : Via script Node.js (Recommandée)

**Prérequis :** Avoir la clé `service_role` de Supabase

#### Étape 1 : Configuration

Ajoutez cette ligne dans votre fichier `.env` :

```bash
VITE_SUPABASE_SERVICE_ROLE_KEY="votre-clé-service-role-ici"
```

> 📍 **Où trouver cette clé ?**
> 1. Allez sur https://supabase.com/dashboard
> 2. Sélectionnez votre projet
> 3. **Settings** → **API** → Section **Project API keys**
> 4. Copiez la clé **service_role** (⚠️ Ne la partagez JAMAIS publiquement !)

#### Étape 2 : Mise à jour du client serveur

Modifiez `src/integrations/supabase/serverClient.ts` :

```typescript
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types.ts';

export const SUPABASE_URL = "https://psryoyugyimibjhwhvlh.supabase.co";
// Utilisez la clé service_role depuis .env
export const SUPABASE_SERVICE_KEY = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || "";

export const supabaseServer = createClient<Database>(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  }
});
```

#### Étape 3 : Import

```bash
# Importer tous les hébergements
npm run import-accommodations

# Ou importer un fichier spécifique
npm run import-data accommodations data/accommodations/la-colline-verte.json
```

---

### Méthode 2 : Via interface Supabase (La plus simple)

#### Étape 1 : Ouvrir le fichier JSON

Ouvrez `data/accommodations/la-colline-verte.json` dans un éditeur de texte.

#### Étape 2 : Aller sur Supabase Dashboard

1. Connectez-vous sur https://supabase.com/dashboard
2. Sélectionnez votre projet
3. **Table Editor** → Table **accommodations**
4. Cliquez sur **Insert** → **Insert row**

#### Étape 3 : Remplir les champs

Pour chaque champ, copiez les valeurs depuis le JSON :

- **name** : `La Colline Verte`
- **type** : `Bungalow`
- **location** : `Entre Saint-Rose et Deshaies, Guadeloupe`
- **price** : `150`
- **rating** : `4.5`
- **image** : L'URL de l'image
- **gallery_images** : Coller le tableau JSON complet
- **features** : Coller le tableau JSON complet
- **description** : Le texte de description
- **rooms** : `1`
- **bathrooms** : `1`
- **max_guests** : `8`
- **amenities** : Coller le tableau JSON complet
- **rules** : Coller le tableau JSON complet
- **weight** : `1`

5. Cliquez sur **Save**

---

### Méthode 3 : Via curl (ligne de commande)

**Prérequis :** Avoir la clé `service_role`

```bash
curl -X POST "https://psryoyugyimibjhwhvlh.supabase.co/rest/v1/accommodations" \
  -H "apikey: VOTRE_SERVICE_ROLE_KEY_ICI" \
  -H "Authorization: Bearer VOTRE_SERVICE_ROLE_KEY_ICI" \
  -H "Content-Type: application/json" \
  -H "Prefer: return=representation" \
  -d @data/accommodations/la-colline-verte.json
```

---

## 🔍 Vérification

Après l'import, vérifiez que les données sont bien insérées :

### Via Supabase Dashboard
1. **Table Editor** → **accommodations**
2. Cherchez "La Colline Verte"

### Via l'application
1. Lancez l'application : `npm run dev`
2. Allez sur la page hébergements
3. Vérifiez que "La Colline Verte" apparaît

---

## ❓ Résolution de problèmes

### Erreur : "Access denied"
→ Vous utilisez probablement la clé `anon` au lieu de `service_role`

### Erreur : "fetch failed" ou problème DNS
→ Dans cet environnement, utilisez curl ou l'interface Supabase

### Erreur : "duplicate key value violates unique constraint"
→ Les données existent déjà dans la base

### Les données ne s'affichent pas dans l'app
→ Vérifiez les policies RLS de la table `accommodations`

---

## 📝 Ajouter de nouvelles données

Pour ajouter de nouveaux hébergements :

1. Créez un nouveau fichier JSON dans `data/accommodations/`
2. Suivez la même structure que `la-colline-verte.json`
3. Importez avec la méthode de votre choix

---

## 🔐 Sécurité

⚠️ **IMPORTANT** :
- Ne commitez JAMAIS la clé `service_role` dans Git
- Le fichier `.env` est déjà dans `.gitignore`
- Utilisez des variables d'environnement pour la production

# Configuration Coolify - Guide Complet

## 🚨 Problème : Coolify détecte Deno au lieu de Docker

Si vous voyez cette erreur :
```
#11 [7/8] RUN deno cache src/components/auth/index.ts
#11 0.084 error: Module not found "file:///app/src/components/auth/LoginForm"
```

C'est que Coolify utilise la **détection automatique** et choisit Deno au lieu de notre Dockerfile.

## ✅ Solution étape par étape :

### 1. Dans l'interface Coolify :

1. **Allez dans votre projet**
2. **Settings → Build Settings**
3. **❌ Désactivez "Auto-detect build method"**
4. **✅ Sélectionnez manuellement "Docker"**
5. **Dockerfile path :** `Dockerfile`
6. **Docker context :** `.` (racine)

### 2. Variables d'environnement requises :

```env
# Instance Supabase auto-hébergée (mybase.clubcreole.fr)
VITE_SUPABASE_URL=https://mybase.clubcreole.fr
VITE_SUPABASE_ANON_KEY=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc2NTQ1NTg0MCwiZXhwIjo0OTIxMTI5NDQwLCJyb2xlIjoiYW5vbiJ9.9EV9qQ5zUttYzhN6hZwi4rlZvKoq02RzE-OJVI_pIbE
NODE_ENV=production
```

### 3. Build Arguments (si supporté) :

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### 4. Configuration du service :

- **Port :** `80`
- **Health check :** `/` (optionnel)
- **Restart policy :** `unless-stopped`

## 🔄 Alternative : Utiliser docker-compose.yml

Si Coolify supporte docker-compose, il utilisera automatiquement notre `docker-compose.yml` :

```yaml
version: '3.8'
services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "80:80"
```

## 🧪 Test local pour vérifier :

```bash
# 1. Build
docker build -t club-app .

# 2. Test
docker run -p 8080:80 club-app

# 3. Vérifier que l'application fonctionne sur http://localhost:8080
```

## 📝 Notes importantes :

- ❌ **NE PAS** créer de `deno.json` - cela activerait Deno
- ❌ **NE PAS** avoir de fichiers `mod.ts` dans la racine
- ✅ **UTILISER** le fichier `.coolify` qui contient `dockerfile`
- ✅ **FORCER** la méthode Docker dans l'interface Coolify

## 🆘 Si ça ne marche toujours pas :

1. Supprimez l'application dans Coolify
2. Recréez-la en spécifiant **manuellement** Docker dès le départ
3. N'utilisez pas la détection automatique 
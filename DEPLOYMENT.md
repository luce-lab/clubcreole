# Instructions de Déploiement pour Coolify

## 📋 Configuration Coolify

### Variables d'environnement requises

Dans Coolify, configurez les variables d'environnement suivantes :

```env
VITE_SUPABASE_URL=https://psryoyugyimibjhwhvlh.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzcnlveXVneWltaWJqaHdodmxoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM4NTM2NDMsImV4cCI6MjA0OTQyOTY0M30.HqVFT7alWrZtjf1cHxeAeqpsWMjVEnnXfVtwesYga-0
NODE_ENV=production
```

### Configuration de build

1. **Dockerfile** : Le projet utilise le `Dockerfile` multi-stage qui :
   - Build l'application React avec Node.js 18
   - Sert l'application avec Nginx

2. **Port exposé** : `80`

3. **Build arguments** : Les variables d'environnement Supabase sont passées comme arguments de build

## 🔧 Résolution des problèmes

### Erreur "Deno cache"
Si Coolify essaie d'utiliser Deno au lieu de Node.js :

1. Vérifiez que le `Dockerfile` est utilisé (pas de détection automatique)
2. Configurez Coolify pour utiliser Docker build au lieu d'un buildpack
3. Assurez-vous que les variables d'environnement sont définies

### Build local pour test
```bash
# Test du build Docker
docker build -t club-app-test .

# Test du run
docker run -p 8080:80 club-app-test

# L'application sera accessible sur http://localhost:8080
```

## 📁 Fichiers importants

- `Dockerfile` : Configuration multi-stage pour le build et le déploiement
- `nginx.conf` : Configuration Nginx pour servir l'application React
- `.dockerignore` : Optimisation du contexte Docker
- `.coolify.yml` : Configuration spécifique pour Coolify

## 🚀 Étapes de déploiement

1. Configurer les variables d'environnement dans Coolify
2. Connecter le repository GitHub
3. Sélectionner le `Dockerfile` comme méthode de build
4. Configurer le port 80
5. Déployer

## ⚠️ Notes importantes

- Les données de location de voitures sont maintenant stockées dans Supabase
- Les migrations doivent être appliquées avant le premier déploiement
- L'application nécessite les variables d'environnement Supabase pour fonctionner 
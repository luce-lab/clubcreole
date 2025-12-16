# Étape de build
FROM node:18-alpine AS builder

WORKDIR /app

# Arguments de build pour les variables d'environnement Vite
# IMPORTANT: Ces URLs DOIVENT utiliser HTTPS pour éviter les erreurs Mixed Content
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY

# Définir les variables d'environnement pour le build
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY

# Copier les fichiers de configuration
COPY package*.json ./

# Installer TOUTES les dépendances (y compris devDependencies pour le build)
RUN npm ci

# Copier le code source
COPY . .

# Construire l'application
RUN npm run build

# Étape de production
FROM nginx:alpine

# Supprimer les fichiers par défaut de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copier les fichiers buildés depuis l'étape précédente
COPY --from=builder /app/dist/ /usr/share/nginx/html/

# Copier la configuration Nginx personnalisée
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
# Étape de build
FROM node:18-alpine AS builder

WORKDIR /app

# Copier les fichiers de configuration
COPY package*.json ./
RUN npm ci --only=production

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

# Copier une configuration Nginx personnalisée (optionnel)
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
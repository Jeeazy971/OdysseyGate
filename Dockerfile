# Étape de base : Installation des dépendances
FROM node:22.15.0-alpine3.20 AS base

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installation les dépendances de base
RUN npm install

COPY . .

# Étape de développement
FROM base AS development

# Installation les dépendances de développement
RUN npm install --only=dev

# Exposer le port pour le développement
EXPOSE 3000

# Commande pour démarrer en mode développement
CMD ["npm", "run", "start:dev"]

# Étape de production
FROM base AS production

# Construire l'application
RUN npm run build

# Installer uniquement les dépendances nécessaires pour la production
RUN npm ci --only=production

# Exposer le port pour la production
EXPOSE 3000

# Commande pour démarrer en mode production
CMD ["npm", "run", "start:prod"]

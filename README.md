# Documentation du Backend Odyssey Gate

## Introduction
Le backend d'**Odyssey Gate** est une application basée sur **NestJS** qui fournit des services pour la recherche et la réservation de vols, d'hôtels, et d'activités. Il inclut des fonctionnalités avancées comme l’authentification JWT, les paiements via Stripe, et l’intégration avec des APIs tierces comme Amadeus ou Skyscanner.

---

## Prérequis

Avant de commencer, assurez-vous d'avoir les outils suivants installés sur votre machine :

- **Node.js** : Version 16 ou supérieure.
- **npm** : Livré avec Node.js.
- **MySQL** : Version 8 ou supérieure.
- **Docker** (optionnel) : Pour exécuter le projet conteneurisé.

---

## Installation

### 1. Clôner le projet
```bash
git clone https://github.com/your-repo/odyssey-gate-backend.git
cd odyssey-gate-backend
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Configurer les variables d'environnement
- Copiez le fichier d'exemple `.env.example` vers `.env` :
  ```bash
  cp .env.example .env
  ```
- Remplissez les champs nécessaires dans `.env` :
  ```
  # Configuration de la base de données
  DATABASE_HOST=localhost
  DATABASE_PORT=3306
  DATABASE_USER=root
  DATABASE_PASSWORD=password
  DATABASE_NAME=odyssey_gate

  # JWT
  JWT_SECRET=your_secret

  # Stripe
  STRIPE_SECRET_KEY=your_stripe_secret_key

  # Autres configurations
  NODE_ENV=development
  PORT=3000
  ```

### 4. Lancer la base de données (Docker)
```bash
docker-compose up -d db
```

### 5. Démarrer le projet sans Docker
- En mode développement :
  ```bash
  npm run start:dev
  ```
- En mode production (après build) :
  ```bash
  npm run build
  npm run start:prod
  ```

---

## Exécution avec Docker

### 1. Configurer Docker et Docker Compose
Assurez-vous que les fichiers suivants sont présents :

#### **Dockerfile**
```dockerfile
# Utiliser une image Node.js de base
FROM node:16

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code
COPY . .

# Construire l'application
RUN npm run build

# Exposer le port
EXPOSE 3000

# Démarrer l'application
CMD ["npm", "run", "start:prod"]
```

#### **docker-compose.yml**
```yaml
version: '3.8'

services:
  backend:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: odyssey-gate-backend
    restart: always
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: production
      DATABASE_HOST: db
      DATABASE_PORT: 3306
      DATABASE_USER: root
      DATABASE_PASSWORD: example
      DATABASE_NAME: odyssey_gate
      JWT_SECRET: your_secret
      STRIPE_SECRET_KEY: your_stripe_secret_key
    depends_on:
      - db

  db:
    image: mysql:8
    container_name: odyssey-gate-db
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: example
      MYSQL_DATABASE: odyssey_gate
    ports:
      - "3306:3306"
    volumes:
      - db_data:/var/lib/mysql

volumes:
  db_data:
```

### 2. Démarrer les services avec Docker Compose
```bash
docker-compose up --build
```

### 3. Arrêter les services
```bash
docker-compose down
```

---

## lancer les commandes avec docker : 
# Mode développement
```bash
docker-compose --env-file .env.dev up --build
```

# Mode production
```bash
docker-compose --env-file .env.prod up --build
```

## Commandes disponibles

| Commande                | Description                                           |
|-------------------------|-------------------------------------------------------|
| `npm run start`         | Démarre l'application en mode production.             |
| `npm run start:dev`     | Démarre l'application en mode développement.          |
| `npm run build`         | Compile l'application TypeScript vers JavaScript.     |
| `npm run lint`          | Analyse le code pour détecter les erreurs de lint.    |
| `npm run test`          | Exécute tous les tests unitaires.                     |
| `npm run test:watch`    | Exécute les tests unitaires en mode watch.            |
| `npm run test:e2e`      | Exécute les tests end-to-end.                         |

---

## Architecture du projet

L’architecture suit une structure modulaire pour faciliter la gestion et la maintenance du code.

```
src/
├── auth/               # Gestion de l'authentification (JWT)
├── users/              # Gestion des utilisateurs et profils
├── flights/            # Recherche et réservation de vols
├── hotels/             # Recherche et réservation d'hôtels
├── rentals/            # Locations type Airbnb
├── payments/           # Paiement avec Stripe
├── reservations/       # Gestion des réservations
├── notifications/      # Système de notifications
├── common/             # Modules partagés et utilitaires
├── main.ts             # Point d'entrée de l'application
```

---

## Documentation des endpoints API

La documentation complète des endpoints est disponible via Swagger.

### Accès Swagger
- Démarrer l’application et accéder à : [http://localhost:3000/api](http://localhost:3000/api)

### Exemple : Recherche de vols

**GET /api/flights/search**

- **Description** : Recherche de vols selon des critères.
- **Params** :
  - `origin` : Code IATA de la ville de départ.
  - `destination` : Code IATA de la ville d'arrivée.
  - `departureDate` : Date de départ.
- **Response** :
  ```json
  {
    "data": [
      {
        "flightNumber": "AF123",
        "airline": "Air France",
        "price": 200
      }
    ]
  }
  ```

---

## Tests

### Exécuter les tests unitaires
```bash
npm run test
```

### Exécuter les tests end-to-end
```bash
npm run test:e2e
```

---

## Déploiement

### Avec Docker
Pour déployer l’application en production avec Docker :
```bash
docker-compose -f docker-compose.yml up --build
```

### Sur un serveur cloud
1. Construisez l’image Docker :
   ```bash
   docker build -t odyssey-gate-backend .
   ```
2. Poussez l’image sur un registre Docker (Docker Hub, AWS ECR, etc.).
3. Déployez l’image sur votre plateforme cloud (AWS, GCP, Azure, etc.).

---

## Licence
Ce projet est sous licence **UNLICENSED**.


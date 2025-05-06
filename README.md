# GamesOnWeb

## Description
Plateforme de jeux web interactive construite avec React, comprenant un système d'authentification et une collection de jeux accessibles.
- Repos:
   * Site Web: [GitHub](https://github.com/Mofountir/GamesOnWeb), [Site](https://games-on-web-plum.vercel.app/)
   * Jeux Goomba (DOM): [GitHub](https://github.com/walgrim-dev/goomba-challenge), [Site](https://walgrim-dev.github.io/goomba-challenge/)
   * Jeux Mario collision (Canvas): [GitHub](https://github.com/walgrim-dev/obstacle-game-js), [Site](https://walgrim-dev.github.io/obstacle-game-js/)
   * Jeux Mario Land 3D (Babylone): [GitHub](https://github.com/GracMatteo/BabylonGame), [Site](https://babylon-game-umber.vercel.app/)
 
## Membre de l'équipe:
- Matteo Grac
- Mannocci Michaël
- Fountir Mohamed

## Prérequis
- Node.js
- npm 

## Installation

1. Clonez le dépôt :
```bash
git clone https://github.com/Mofountir/GamesOnWeb.git
cd GamesOnWeb
```

2. Installez les dépendances :
```bash
npm install
```

## Lancement du site

### Développement
Pour lancer le serveur de développement :
```bash
npm run dev
```
Le site sera accessible à l'adresse : https://games-on-web-plum.vercel.app/

### Production
Pour construire le site pour la production :
```bash
npm run build
```

Pour prévisualiser la version de production :
```bash
npm run preview
```

## Navigation dans le site

1. **Page de connexion** (`/`)
   - Entrez vos identifiants pour accéder au hub de jeux
   - Options pour créer un compte ou réinitialiser votre mot de passe

2. **Hub de jeux** (`/hub`)
   - Accès à tous les jeux disponibles
   - Filtrage et recherche de jeux
   - Accès à votre profil et paramètres

3. **Page de jeu** (`/game/:id`)
   - Interface de jeu individuel
   - Instructions et commandes de jeu:
        * Touche: P: Pause, I: Rules, H: Revenir au hub, M: Menu déroulant.

## Fonctionnalités principales
- Authentification utilisateur
- Multilangue (i18n)
- Thème sombre/clair
- Interface réactive adaptée à tous les appareils

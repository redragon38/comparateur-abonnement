# CombienÇaCoûte - Comparateur d'Abonnements

Comparateur gratuit pour connaître le vrai prix de vos abonnements (Netflix, Spotify, Disney+, etc.) sur 1, 3, 5 ou 10 ans.

## 🚀 Déploiement sur Vercel

### Option 1 : Déploiement automatique (recommandé)

1. **Poussez le code sur GitHub** (si ce n'est pas déjà fait)

2. **Connectez-vous à Vercel** : https://vercel.com

3. **Importez le projet** :
   - Cliquez sur "Add New..." → "Project"
   - Sélectionnez votre repository GitHub
   - Vercel détectera automatiquement Vite

4. **Configuration** :
   - **Root Directory** : `frontend`
   - **Build Command** : `yarn build`
   - **Output Directory** : `build`
   - **Install Command** : `yarn install`

5. **Cliquez sur "Deploy"** 🎉

### Option 2 : Vercel CLI

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer depuis le dossier frontend
cd frontend
vercel
```

## 📁 Structure du projet

```
/
├── frontend/           # Application React (Vite)
│   ├── src/
│   │   ├── components/ # Composants React
│   │   ├── contexts/   # Context (langue, etc.)
│   │   ├── data/       # Données des abonnements
│   │   ├── hooks/      # Hooks personnalisés
│   │   └── lib/        # Utilitaires
│   ├── vercel.json     # Config Vercel
│   └── vite.config.ts  # Config Vite
├── backend/            # API FastAPI (optionnel)
└── vercel.json         # Config Vercel racine
```

## 🌐 Fonctionnalités

- ✅ Comparaison de 50+ abonnements
- ✅ Calcul sur 1, 3, 5 ou 10 ans
- ✅ Filtres par catégorie
- ✅ Recherche
- ✅ Favoris (stockage local)
- ✅ Mode grille/graphique
- ✅ **Bilingue FR/EN** 🇫🇷🇬🇧
- ✅ Avis utilisateurs (stockage local)
- ✅ Export CSV
- ✅ Responsive design

## 🔧 Développement local

```bash
cd frontend
yarn install
yarn dev
```

Le site sera accessible sur http://localhost:3000

## 📝 Notes

- Le site fonctionne **100% côté client** (pas de backend requis)
- Les avis et favoris sont stockés en **localStorage**
- Les données des abonnements sont intégrées au build

# PRD - CombienÇaCoûte (Comparateur d'Abonnements)

## Problème Original
- Le site affichait une page blanche au lancement
- Cause: Projet Vite/TypeScript dans un environnement Create React App

## Architecture
- **Frontend**: React + Vite + TypeScript + Tailwind CSS + Shadcn/ui
- **Backend**: FastAPI + MongoDB (optionnel - le site fonctionne en standalone)
- **Déploiement**: Vercel ready

## Ce qui a été fait (10 Feb 2026)

### Phase 1 - Correction du bug
- Migration de Vite vers l'environnement actuel
- Configuration vite.config.ts avec les hosts autorisés
- Installation des dépendances manquantes

### Phase 2 - Traduction FR/EN
- Système de traduction avec LanguageContext
- Sélecteur de langue 🌐 EN/FR dans la navbar
- Tous les textes traduits (Hero, FAQ, Tips, Comparateur, Détails)

### Phase 3 - Codes Promo
- Fichier `/data/promoCodes.ts` avec codes prédéfinis
- Composant PromoCodes intégré sur chaque page de détail
- 28 services avec codes promo actifs
- Bouton copier avec feedback visuel

### Phase 4 - SEO & Engagement (NOUVEAU)
- **robots.txt** et **sitemap.xml** pour le SEO
- **manifest.json** pour PWA
- **LiveStats** - Statistiques en temps réel animées
- **SavingsCalculator** - Calculateur interactif d'économies
- **Testimonials** - Section témoignages avec preuves sociales
- **PopularArticles** - Articles/guides populaires pour le SEO
- **Newsletter** - Capture d'emails avec alertes prix
- **RecentlyViewed** - Historique de navigation

## Fonctionnalités implémentées
- ✅ Comparaison de 50+ abonnements
- ✅ Calcul sur 1, 3, 5, 10 ans
- ✅ Filtres par catégorie & recherche
- ✅ Favoris (localStorage)
- ✅ **Bilingue FR/EN** 🇫🇷🇬🇧
- ✅ **Codes promo prédéfinis**
- ✅ **Stats en temps réel**
- ✅ **Calculateur d'économies interactif**
- ✅ **Témoignages**
- ✅ **Articles populaires**
- ✅ **Newsletter**
- ✅ **SEO optimisé**
- ✅ Avis utilisateurs
- ✅ Export CSV
- ✅ Responsive design
- ✅ **Vercel ready**

## Déploiement Vercel
```bash
cd frontend
vercel
```

Configuration:
- Root Directory: `frontend`
- Build Command: `yarn build`
- Output Directory: `build`

## Prochaines améliorations potentielles
- P1: Articles de blog complets pour le SEO
- P1: Intégration Analytics (GA4)
- P2: Push notifications pour alertes prix
- P2: Comparateur side-by-side
- P3: API publique

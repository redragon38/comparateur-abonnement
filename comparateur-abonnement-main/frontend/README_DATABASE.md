# 🌟 Application d'Avis avec Base de Données

## Tous les utilisateurs voient les mêmes avis ! 

Cette application utilise **JSONBin** (base de données JSON gratuite) pour stocker les avis.

---

## 🚀 Démarrage Rapide

### 1. Configurer JSONBin (3 minutes)

📖 **Suivre le guide**: `CONFIGURATION_JSONBIN.md`

Résumé ultra-rapide:
1. Aller sur https://jsonbin.io (gratuit)
2. Créer un compte
3. Créer un "Bin" vide: `{}`
4. Copier API Key + Bin ID
5. Les mettre dans `.env.local`

### 2. Installer et Lancer

```bash
# Installer
npm install

# Lancer
npm run dev
```

Ouvrir http://localhost:5173

---

## ✅ Test

1. Laisser un avis dans votre navigateur
2. Ouvrir l'app sur votre téléphone
3. ✨ L'avis apparaît pour tous !

---

## 📁 Fichiers Importants

```
comp/
├── .env.local              ← VOS CLÉS JSONBIN ICI
├── src/
│   ├── components/
│   │   └── AppReviews.tsx  ← Composant d'avis
│   └── lib/
│       └── reviewsDb.ts    ← Connexion DB
└── README_DATABASE.md      ← Ce fichier
```

---

## 🎯 Fonctionnalités

- ✅ **Base de données partagée** - Tous voient les mêmes avis
- ✅ **Gratuit** - 10,000 requêtes/mois
- ✅ **Simple** - Juste 2 clés à configurer
- ✅ **Pas de serveur** - Tout géré par JSONBin

---

## 🆘 Aide Rapide

### Les avis ne s'affichent pas ?

Vérifier `.env.local`:
```env
VITE_JSONBIN_API_KEY=$2a$10$VotreCleAPI...
VITE_JSONBIN_BIN_ID=VotreIDBin...
```

Redémarrer: `npm run dev`

---

## 📚 Documentation

- **CONFIGURATION_JSONBIN.md** - Guide complet

---

## 🎉 C'est Tout !

**La solution LA PLUS SIMPLE : juste 2 clés à copier ! 🚀**

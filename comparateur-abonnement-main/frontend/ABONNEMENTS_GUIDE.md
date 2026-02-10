# Guide de gestion des abonnements

## Structure du fichier JSON

Tous les abonnements sont désormais gérés dans le fichier `src/data/subscriptions.json`.

### Format d'un abonnement

```json
{
  "id": "identifiant-unique",
  "name": "Nom du service",
  "logo": "🎬",
  "color": "hsl(0, 75%, 50%)",
  "category": "Catégorie",
  "plans": [
    { "name": "Nom du plan", "monthlyPrice": 9.99 }
  ]
}
```

### Champs expliqués

- **id** : Identifiant unique (en minuscules, avec tirets)
- **name** : Nom affiché du service
- **logo** : Emoji représentant le service
- **color** : Couleur au format HSL pour l'affichage
- **category** : Catégorie du service (ex: "Streaming vidéo", "Musique", "Jeux vidéo")
- **plans** : Liste des formules d'abonnement disponibles
  - **name** : Nom de la formule
  - **monthlyPrice** : Prix mensuel en euros

## Ajouter un nouvel abonnement

1. Ouvrir `src/data/subscriptions.json`
2. Ajouter un nouvel objet dans le tableau `subscriptions`
3. Respecter le format ci-dessus
4. Sauvegarder le fichier

### Exemple d'ajout

```json
{
  "id": "paramount-plus",
  "name": "Paramount+",
  "logo": "⛰️",
  "color": "hsl(220, 90%, 50%)",
  "category": "Streaming vidéo",
  "plans": [
    { "name": "Essentiel", "monthlyPrice": 7.99 },
    { "name": "Premium", "monthlyPrice": 11.99 }
  ]
}
```

## Catégories disponibles

- Streaming vidéo
- Musique
- Jeux vidéo
- Multi-services

N'hésitez pas à créer de nouvelles catégories si nécessaire.

## Modifier les durées proposées

Les options de durée sont également dans le JSON, dans le tableau `durationOptions` :

```json
{
  "label": "1 an",
  "months": 12,
  "value": "1"
}
```

## Avantages de cette approche

✅ **Facilité de mise à jour** : Plus besoin de modifier le code TypeScript  
✅ **Séparation des données** : Le code et les données sont séparés  
✅ **Facilité de maintenance** : Simple à éditer avec n'importe quel éditeur  
✅ **Collaboration** : Plusieurs personnes peuvent facilement ajouter des services

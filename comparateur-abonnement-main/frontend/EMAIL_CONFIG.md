# Configuration de l'Email de Proposition 📧

## Adresse email actuelle

Par défaut, l'email de contact est configuré à : **l.bonin2011@gmail.com**

## Comment changer l'adresse email

### Méthode 1 : Modification manuelle

1. Ouvre le fichier `/src/components/ProposeSubscriptionModal.tsx`
2. Va à la ligne 25 (dans la fonction `handleSubmit`)
3. Remplace l'adresse email :

```typescript
// Ligne actuelle
window.location.href = `mailto:l.bonin2011@gmail.com?subject=${subject}&body=${body}`;

// Remplace par ton email
window.location.href = `mailto:l.bonin2011@gmail.com?subject=${subject}&body=${body}`;
```

### Méthode 2 : Variable d'environnement (recommandé)

1. Crée un fichier `.env` à la racine du projet :

```env
VITE_CONTACT_EMAIL=l.bonin2011@gmail.com
```

2. Modifie la ligne 25 dans `ProposeSubscriptionModal.tsx` :

```typescript
const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || 'contact@subscription-saver.com';
window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
```

3. Redémarre le serveur de développement

## Format de l'email envoyé

L'email contient automatiquement les informations suivantes :

**Sujet :** Proposition d'abonnement : [Nom du service]

**Corps :**
```
Service proposé : [Nom du service]
Catégorie : [Catégorie sélectionnée]
Prix mensuel : [Prix]€
Nom du plan : [Nom du plan]
Email de contact : [Email de l'utilisateur]

Message :
[Message optionnel de l'utilisateur]
```

## Alternative : Intégration avec un service d'emailing

Si tu veux éviter le `mailto:` et envoyer directement l'email via un service :

### Option A : EmailJS (gratuit jusqu'à 200 emails/mois)

1. Crée un compte sur [EmailJS](https://www.emailjs.com/)
2. Configure un template d'email
3. Installe le package :
```bash
npm install @emailjs/browser
```

4. Remplace le code dans `handleSubmit` :

```typescript
import emailjs from '@emailjs/browser';

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  try {
    await emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      {
        service_name: formData.serviceName,
        category: formData.category,
        monthly_price: formData.monthlyPrice,
        plan_name: formData.planName,
        user_email: formData.email,
        message: formData.message,
      },
      'YOUR_PUBLIC_KEY'
    );
    
    setIsSubmitted(true);
    // ...
  } catch (error) {
    console.error('Erreur envoi email:', error);
  }
};
```

### Option B : SendGrid, Mailgun, ou autre service backend

Si tu as un backend, crée une route API et appelle-la depuis le formulaire.

## Validation et sécurité

Le formulaire inclut déjà :
- ✅ Validation HTML5 (champs requis)
- ✅ Type email validé
- ✅ Prix avec 2 décimales max
- ✅ Catégories pré-définies (pas de texte libre)

Pour plus de sécurité avec un backend :
- Ajoute un captcha (Google reCAPTCHA)
- Rate limiting (limite le nombre de soumissions)
- Validation serveur des données

## Notifications

Pour être notifié des nouvelles propositions :
1. Configure des filtres dans Gmail/Outlook avec le sujet "Proposition d'abonnement"
2. Active les notifications push pour ces emails
3. Ou utilise un service comme Zapier pour automatiser le traitement

## Support

Si tu as des questions sur la configuration, consulte :
- Documentation EmailJS : https://www.emailjs.com/docs/
- Documentation SendGrid : https://docs.sendgrid.com/
- Ou ouvre une issue sur GitHub

## 1. Pré-remplissage du formulaire

- [x] 1.1 Modifier `useSubscriptionForm.ts` pour récupérer les données du profil utilisateur (first_name, last_name, phone) via le contexte Auth
- [x] 1.2 Mettre à jour les `defaultValues` du formulaire avec les valeurs du profil
- [x] 1.3 Ajouter un `useEffect` pour réinitialiser le formulaire quand les données utilisateur changent

## 2. Authentification requise

- [x] 2.1 Modifier `Hero.tsx` pour vérifier l'état d'authentification avant d'ouvrir le dialog
- [x] 2.2 Si non connecté, rediriger vers `/login`
- [ ] 2.3 Stocker l'intention de s'abonner pour rediriger après connexion (optionnel - non implémenté)

## 3. Tests et validation

- [x] 3.1 Compilation TypeScript réussie
- [ ] 3.2 Tester le pré-remplissage avec un utilisateur ayant un profil complet
- [ ] 3.3 Tester avec un utilisateur ayant un profil partiel (seulement email)
- [ ] 3.4 Tester le flux non-connecté → connexion → retour au formulaire
- [ ] 3.5 Vérifier la cohérence avec le comportement dans `Pricing.tsx`

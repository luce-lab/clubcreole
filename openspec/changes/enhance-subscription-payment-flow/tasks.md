## 1. Frontend - Redirection avec paramètre

- [x] 1.1 Modifier `src/components/Pricing.tsx` pour passer `redirect=/?scrollTo=pricing` lors de la redirection vers login
- [x] 1.2 Modifier `src/pages/Index.tsx` pour gérer le paramètre `scrollTo` et scroller vers la section

## 2. Backend - Configuration Stripe annuelle

- [x] 2.1 Modifier `supabase/functions/create-checkout/index.ts` pour configurer les abonnements en annuel
- [x] 2.2 Mettre à jour les prix : Passionné 1500 cents/an, Expert 9000 cents/an

## 3. Validation

- [x] 3.1 Build de vérification réussi
- [ ] 3.2 Tester le flux complet : clic sur abonnement → login → retour section pricing
- [ ] 3.3 Vérifier que Stripe crée bien des abonnements annuels

## Fichiers modifiés

| Fichier | Modification |
|---------|--------------|
| `src/components/Pricing.tsx` | Ajout du paramètre `redirect` avec `scrollTo=pricing` |
| `src/pages/Index.tsx` | Ajout useEffect pour gérer le scroll au chargement |
| `supabase/functions/create-checkout/index.ts` | Configuration annuelle (interval: "year", prix corrigés) |

## Notes

- Le paramètre `redirect` est déjà supporté par Login.tsx
- La page Login redirige vers l'URL spécifiée après connexion
- L'URL est nettoyée après le scroll (`window.history.replaceState`)

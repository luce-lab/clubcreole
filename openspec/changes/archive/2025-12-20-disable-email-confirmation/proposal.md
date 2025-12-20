## Why
La connexion des utilisateurs échoue lorsque l'email n'a pas été confirmé, mais Supabase Cloud ne transmet jamais les emails de confirmation aux destinataires. Cela bloque complètement l'inscription de nouveaux utilisateurs.

## What Changes
- Désactiver la vérification obligatoire de l'email dans la configuration Supabase Authentication
- Mettre à jour le message de succès d'inscription côté frontend (supprimer la mention de confirmation par email)
- Les utilisateurs pourront se connecter immédiatement après leur inscription

## Impact
- Affected specs: auth (nouvelle spec)
- Affected code:
  - Configuration Supabase Dashboard (Auth > Email Templates > Confirm signup = désactivé)
  - `src/components/auth/RegisterForm.tsx` (message de succès)
- Breaking changes: Aucun (amélioration de l'UX)
- Sécurité: Les comptes seront actifs sans vérification d'email. Acceptable pour une phase MVP/test.

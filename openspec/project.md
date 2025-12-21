# Project Context

## Purpose
Club Créole est une plateforme de réservation d'activités nautiques et de loisirs en Guadeloupe, proposant des hébergements, restaurants, locations de voitures et des expériences variées avec un système d'abonnement par paliers.

## Tech Stack
- **Frontend**: React 18.3.1 + TypeScript + Vite
- **Backend**: Supabase (PostgreSQL + Auth + Edge Functions)
- **Styling**: Tailwind CSS + shadcn/ui components
- **Payment**: Stripe (partiellement implémenté)
- **State Management**: React Query + React Context
- **Authentication**: Supabase Auth with JWT tokens

## Project Conventions

### Code Style
- TypeScript strict mode enabled
- Tailwind CSS for styling with custom theme colors
- Feature-based component organization
- Path aliases configured (@/ maps to src/)
- ESLint for code quality

### Architecture Patterns
- Feature-based organization (accommodation, restaurant, car-rental, loisirs)
- Service layer abstraction for API calls
- Custom hooks for data fetching and business logic
- Compound component pattern for complex UI
- Supabase Row Level Security (RLS) for data access control

### Testing Strategy
- Vitest with jsdom for component testing
- ESLint configured for code quality
- Manual testing through development server

### Git Workflow
- Main branch for production deployments
- Feature branches for new development
- Conventional commit messages
- Docker-based deployment with Coolify

## Domain Context
Plateforme de tourisme et de loisirs en Guadeloupe avec :
- Multi-services: hébergements, restaurants, locations de voitures, activités nautiques
- Système d'abonnements par paliers (Gratuit, Passionné, Expert)
- Gestion des partenaires avec validation et approbation
- Tableaux de bord admin et client
- Réservations en temps réel avec disponibilité

## Important Constraints
- Conformité RGPD pour les données européennes
- Support multilingue (français principal)
- Paiements sécurisés via Stripe
- Performances pour le mobile-first
- Déploiement via Coolify (PaaS self-hosted)

## External Dependencies
- **Stripe**: Traitement des paiements par abonnement
- **Supabase**: Base de données, authentification, edge functions
- **Docker**: Conteneurisation pour le déploiement
- **Coolify**: Plateforme de déploiement
- **Vercel/Netlify**: CDN optionnel pour le frontend

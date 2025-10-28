<!-- OPENSPEC:START -->
# OpenSpec Instructions

These instructions are for AI assistants working in this project.

Always open `@/openspec/AGENTS.md` when the request:
- Mentions planning or proposals (words like proposal, spec, change, plan)
- Introduces new capabilities, breaking changes, architecture shifts, or big performance/security work
- Sounds ambiguous and you need the authoritative spec before coding

Use `@/openspec/AGENTS.md` to learn:
- How to create and apply change proposals
- Spec format and conventions
- Project structure and guidelines

Keep this managed block so 'openspec update' can refresh the instructions.

<!-- OPENSPEC:END -->

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
```bash
npm run dev          # Start development server (Vite)
npm run build        # Production build
npm run build:dev    # Development build
npm run preview      # Preview production build
npm run test         # Run tests with Vitest
npm run lint         # ESLint code checking
npm run insert-data  # Run database seeding scripts
```

### Testing
```bash
npm run test         # Run all tests
npm run test:ui      # Run tests with UI (if available)
npm run test:coverage # Run tests with coverage
```

### Docker Deployment
```bash
docker compose build        # Build the Docker image
docker compose up -d       # Run containers in detached mode
docker compose down        # Stop and remove containers
```

## Architecture Overview

### Technology Stack
- **Frontend**: React 18.3.1 + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **Backend**: Supabase (PostgreSQL + Auth + Edge Functions)
- **State Management**: React Query + React Context
- **Routing**: React Router DOM 6.26.2

### Project Structure
```
src/
├── components/          # Feature-based component organization
│   ├── ui/             # shadcn/ui base components
│   ├── auth/           # Authentication components
│   ├── accommodation/  # Hotel/lodging booking
│   ├── restaurant/     # Restaurant reservations
│   ├── car-rental/     # Vehicle rental system
│   ├── loisirs/        # Leisure activities
│   └── dashboard/      # Admin/user dashboards
├── pages/              # Route components
├── contexts/           # React Context providers
├── hooks/              # Custom React hooks
├── services/           # API service layer
├── integrations/       # Third-party integrations (Supabase)
└── lib/                # Utility functions
```

### Key Features
- Authentication with role-based access (admin, client, partner)
- Accommodation booking system
- Restaurant reservation system
- Car rental with fleet management
- Leisure activities booking
- Travel packages
- Partner management system
- Admin dashboard with analytics
- Subscription management

### Database
- PostgreSQL via Supabase with 20+ migration files
- Row Level Security (RLS) for data access control
- Key tables: accommodations, activities, restaurants, car_rentals, users, subscriptions
- Real-time subscriptions for live updates

### Component Patterns
- Feature-based organization (each business domain has its own folder)
- Compound component pattern for complex UI
- Custom hooks for data fetching and business logic
- Service layer abstraction for API calls
- Infinite scroll implementation for data pagination

### Authentication
- Supabase Auth with JWT tokens
- Role-based route protection
- Authentication context provider in `src/contexts/AuthContext.tsx`

### Development Notes
- Path aliases configured in `vite.config.ts` (@/ maps to src/)
- Tailwind config includes custom theme colors and fonts
- Docker setup available for production deployment
- ESLint configured for code quality
- Vitest with jsdom for component testing

### Environment
- Local development uses Vite dev server
- Production builds containerized with Docker
- Deployment configured for Coolify (self-hosted PaaS)
- Environment variables managed through Supabase and deployment platform

## Task Master AI Instructions
**Import Task Master's development workflow commands and guidelines, treat as if import is in the main CLAUDE.md file.**
@./.taskmaster/CLAUDE.md

## Supabase Database Dump & Transfer Plan

### Dump Successfully Created
- **Fichier**: `supabase_dump_20251028_164145.sql` (10,310 octets)
- **Méthode**: pg_dump via conteneurs Docker Supabase locaux
- **Contenu**: Données complètes de la base PostgreSQL 15.1

### Scripts de Transfert Disponibles
1. **HTTP Transfer Method** (recommandée):
   - Serveur HTTP local: `http://172.28.114.141:8888`
   - Exécuter: `./transfert_instructions_complet.sh`
   - Fichiers dans: `transfer_files/`

2. **Base64 Manual Transfer**:
   - Fichier encodé: `supabase_dump_encoded.txt`
   - Instructions: `./manual_transfer_instructions.sh`

3. **Alternative Scripts**:
   - `scp_transfer.sh`, `sftp_transfer.py`, `simple_transfer.py`

### Serveur Cible Configuration
- **Adresse**: 37.59.121.40
- **Utilisateur**: ubuntu
- **Mot de passe**: Catilo
- **Destination**: `/home/ubuntu/dumps/`

### MCP Supabase Configuration
- **Project Ref**: psryoyugyimibjhwhvlh
- **Config File**: `.mcp-supabase.json`
- **WebSocket URL**: `wss://mcp.supabase.com/mcp?project_ref=psryoyugyimibjhwhvlh`

### Commandes Rapides
```bash
# Démarrer le transfert HTTP
python3 -m http.server 8888 --directory transfer_files

# Sur le serveur distant
mkdir -p /home/ubuntu/dumps
cd /home/ubuntu/dumps
wget http://172.28.114.141:8888/supabase_dump_20251028_164145.sql
```

### Notes
- Le dump inclut les schémas auth, public, storage
- Connexion SSH validée vers le serveur distant
- Plusieurs méthodes de transfert disponibles si HTTP échoue
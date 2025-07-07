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
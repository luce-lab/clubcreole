# Gemini Workspace Configuration

This file helps customize and configure the Gemini agent for this workspace.

## Project Overview

This is a web application for "Club Creole", which seems to be a club offering various services like car rentals, activities, accommodations, etc. The frontend is built with React/Vite (TypeScript) and the backend uses Supabase.

## Technical Details

*   **Frameworks**: React, Vite, TypeScript, Supabase
*   **Styling**: Tailwind CSS
*   **Package Manager**: pnpm
*   **Testing**: Vitest
*   **Linting**: ESLint

## Commands

*   `pnpm install`: Install dependencies
*   `pnpm dev`: Start the development server
*   `pnpm test`: Run tests
*   `pnpm lint`: Run linter
*   `pnpm build`: Build for production

## Instructions for Gemini

*   When adding new components, follow the existing structure in `src/components`.
*   Use `pnpm` for all package management tasks.
*   Ensure new code is formatted and linted according to the project's ESLint configuration.
*   When creating new Supabase migrations, follow the existing naming convention in `supabase/migrations`.
*   Always use absolute imports for modules within the `src` directory.
*   Commit messages should follow the conventional commit format.

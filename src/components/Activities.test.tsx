
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Activities from './Activities';

// Mock useNavigate
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

describe('Activities Component', () => {
    it('renders correctly', () => {
        const { container } = render(
          <MemoryRouter>
            <Activities />
          </MemoryRouter>
        );
        expect(container).toBeInTheDocument();
    });

    it('displays the correct title', () => {
        render(
          <MemoryRouter>
            <Activities />
          </MemoryRouter>
        );
        expect(screen.getByText('Nos Activités')).toBeInTheDocument();
    });

    it('displays all six activities', () => {
        render(
          <MemoryRouter>
            <Activities />
          </MemoryRouter>
        );
        expect(screen.getByText('Loisirs')).toBeInTheDocument();
        expect(screen.getByText('Restauration')).toBeInTheDocument();
        expect(screen.getByText('Hébergements')).toBeInTheDocument();
        expect(screen.getByText('Concerts')).toBeInTheDocument();
        expect(screen.getByText('Soirée')).toBeInTheDocument();
        expect(screen.getByText('Location de Voitures')).toBeInTheDocument();
    });
});

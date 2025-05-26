import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { LoginForm } from '../LoginForm';
import { BrowserRouter } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';

// Mock the auth context
vi.mock('@/contexts/auth', () => ({
  useAuth: vi.fn(),
}));

describe('LoginForm', () => {
  const mockSignIn = vi.fn();
  const mockOnSuccess = vi.fn();
  
  beforeEach(() => {
    vi.clearAllMocks();
    (useAuth as any).mockReturnValue({
      signIn: mockSignIn,
    });
  });

  it('renders login form with all fields', () => {
    render(
      <BrowserRouter>
        <LoginForm onSuccess={mockOnSuccess} />
      </BrowserRouter>
    );
    
    // Check if form elements are rendered
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mot de passe/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /se connecter/i })).toBeInTheDocument();
    expect(screen.getByText(/retour à l'accueil/i)).toBeInTheDocument();
  });

  it('handles form submission', async () => {
    mockSignIn.mockResolvedValueOnce({ success: true });
    
    render(
      <BrowserRouter>
        <LoginForm onSuccess={mockOnSuccess} />
      </BrowserRouter>
    );
    
    // Fill out the form
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    
    fireEvent.change(screen.getByLabelText(/mot de passe/i), {
      target: { value: 'password123' },
    });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /se connecter/i }));
    
    // Assert that signIn was called with correct values
    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith('test@example.com', 'password123');
    });
    
    // When successful, onSuccess callback should be called
    await waitFor(() => {
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });

  it('shows loading state during form submission', async () => {
    mockSignIn.mockImplementation(() => new Promise(resolve => setTimeout(() => resolve({ success: true }), 100)));
    
    render(
      <BrowserRouter>
        <LoginForm onSuccess={mockOnSuccess} />
      </BrowserRouter>
    );
    
    // Fill out and submit the form
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    
    fireEvent.change(screen.getByLabelText(/mot de passe/i), {
      target: { value: 'password123' },
    });
    
    fireEvent.click(screen.getByRole('button', { name: /se connecter/i }));
    
    // Check for loading state
    expect(screen.getByText(/connexion en cours/i)).toBeInTheDocument();
    
    // Wait for the operation to complete
    await waitFor(() => {
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });

  it('handles unsuccessful login', async () => {
    mockSignIn.mockResolvedValueOnce({ success: false });
    
    render(
      <BrowserRouter>
        <LoginForm onSuccess={mockOnSuccess} />
      </BrowserRouter>
    );
    
    // Fill out and submit the form
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    
    fireEvent.change(screen.getByLabelText(/mot de passe/i), {
      target: { value: 'wrong-password' },
    });
    
    fireEvent.click(screen.getByRole('button', { name: /se connecter/i }));
    
    // Assert that signIn was called
    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith('test@example.com', 'wrong-password');
    });
    
    // onSuccess should not be called for failed login
    await waitFor(() => {
      expect(mockOnSuccess).not.toHaveBeenCalled();
    });
  });
});

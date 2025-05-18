
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { RegisterForm } from '../RegisterForm';
import { BrowserRouter } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';
import { useToast } from '@/components/ui/use-toast';

// Mock the auth context and toast
jest.mock('@/contexts/auth', () => ({
  useAuth: jest.fn(),
}));

jest.mock('@/components/ui/use-toast', () => ({
  useToast: jest.fn(),
}));

describe('RegisterForm', () => {
  const mockSignUp = jest.fn();
  const mockOnSuccess = jest.fn();
  const mockToast = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({
      signUp: mockSignUp,
    });
    (useToast as jest.Mock).mockReturnValue({
      toast: mockToast,
    });
  });

  it('renders register form with all fields', () => {
    render(
      <BrowserRouter>
        <RegisterForm onSuccess={mockOnSuccess} />
      </BrowserRouter>
    );
    
    // Check if form elements are rendered
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mot de passe/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirmer le mot de passe/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /s'inscrire/i })).toBeInTheDocument();
    expect(screen.getByText(/retour à l'accueil/i)).toBeInTheDocument();
  });

  it('handles form submission when passwords match', async () => {
    mockSignUp.mockResolvedValueOnce({ success: true, message: 'Inscription réussie' });
    
    render(
      <BrowserRouter>
        <RegisterForm onSuccess={mockOnSuccess} />
      </BrowserRouter>
    );
    
    // Fill out the form
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    
    fireEvent.change(screen.getByLabelText(/mot de passe/i), {
      target: { value: 'password123' },
    });
    
    fireEvent.change(screen.getByLabelText(/confirmer le mot de passe/i), {
      target: { value: 'password123' },
    });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /s'inscrire/i }));
    
    // Assert that signUp was called with correct values
    await waitFor(() => {
      expect(mockSignUp).toHaveBeenCalledWith('test@example.com', 'password123');
    });
    
    // When successful, onSuccess callback should be called with email
    await waitFor(() => {
      expect(mockOnSuccess).toHaveBeenCalledWith('test@example.com');
    });
  });

  it('validates that passwords match', async () => {
    render(
      <BrowserRouter>
        <RegisterForm onSuccess={mockOnSuccess} />
      </BrowserRouter>
    );
    
    // Fill out the form with mismatching passwords
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    
    fireEvent.change(screen.getByLabelText(/mot de passe/i), {
      target: { value: 'password123' },
    });
    
    fireEvent.change(screen.getByLabelText(/confirmer le mot de passe/i), {
      target: { value: 'different-password' },
    });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /s'inscrire/i }));
    
    // Assert that toast was called with error message
    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith(expect.objectContaining({
        title: 'Erreur',
        description: 'Les mots de passe ne correspondent pas',
        variant: 'destructive',
      }));
    });
    
    // signUp should not be called if passwords don't match
    expect(mockSignUp).not.toHaveBeenCalled();
  });

  it('shows loading state during form submission', async () => {
    mockSignUp.mockImplementation(() => new Promise(resolve => setTimeout(() => resolve({ success: true, message: 'Inscription réussie' }), 100)));
    
    render(
      <BrowserRouter>
        <RegisterForm onSuccess={mockOnSuccess} />
      </BrowserRouter>
    );
    
    // Fill out the form
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    
    fireEvent.change(screen.getByLabelText(/mot de passe/i), {
      target: { value: 'password123' },
    });
    
    fireEvent.change(screen.getByLabelText(/confirmer le mot de passe/i), {
      target: { value: 'password123' },
    });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /s'inscrire/i }));
    
    // Check for loading state
    expect(screen.getByText(/inscription en cours/i)).toBeInTheDocument();
    
    // Wait for the operation to complete
    await waitFor(() => {
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });

  it('handles unsuccessful registration', async () => {
    mockSignUp.mockResolvedValueOnce({ success: false, message: 'Email already exists' });
    
    render(
      <BrowserRouter>
        <RegisterForm onSuccess={mockOnSuccess} />
      </BrowserRouter>
    );
    
    // Fill out the form
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    
    fireEvent.change(screen.getByLabelText(/mot de passe/i), {
      target: { value: 'password123' },
    });
    
    fireEvent.change(screen.getByLabelText(/confirmer le mot de passe/i), {
      target: { value: 'password123' },
    });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /s'inscrire/i }));
    
    // Assert that signUp was called
    await waitFor(() => {
      expect(mockSignUp).toHaveBeenCalledWith('test@example.com', 'password123');
    });
    
    // Assert that toast was called with error message
    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith(expect.objectContaining({
        title: 'Erreur d\'inscription',
        description: 'Email already exists',
        variant: 'destructive',
      }));
    });
    
    // onSuccess should not be called for failed registration
    expect(mockOnSuccess).not.toHaveBeenCalled();
  });
});

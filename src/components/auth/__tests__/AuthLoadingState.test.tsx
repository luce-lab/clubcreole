
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { describe, it, expect } from 'vitest';
import { AuthLoadingState } from '../AuthLoadingState';

describe('AuthLoadingState', () => {
  it('renders loading spinner with message', () => {
    const testMessage = 'Test loading message';
    render(<AuthLoadingState message={testMessage} />);
    
    // Check if the loading spinner is rendered
    expect(screen.getByRole('status')).toBeInTheDocument();
    
    // Check if the message is displayed
    expect(screen.getByText(testMessage)).toBeInTheDocument();
  });
});

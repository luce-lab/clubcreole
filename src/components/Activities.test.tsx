import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Activities from './Activities';

describe('Activities Component', () => {
    it('renders correctly', () => {
        const { container } = render(<Activities />);
        expect(container).toBeInTheDocument();
    });

    it('displays the correct title', () => {
        const { getByText } = render(<Activities />);
        expect(getByText('Activities')).toBeInTheDocument();
    });
});
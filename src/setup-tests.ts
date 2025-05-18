
import '@testing-library/jest-dom';
import 'vitest-dom/extend-expect';

// Mock ResizeObserver which is not available in test environment
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock IntersectionObserver which is not available in test environment
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Add ARIA role for Loader component in tests
HTMLElement.prototype.scrollIntoView = jest.fn();

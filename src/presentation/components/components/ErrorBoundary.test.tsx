/**
 * Copyright (c) 2025 Bivex
 *
 * Author: Bivex
 * Available for contact via email: support@b-b.top
 * For up-to-date contact information:
 * https://github.com/bivex
 *
 * Created: 2025-12-23T08:00:00
 * Last Updated: 2025-12-23T08:00:00
 *
 * Licensed under the MIT License.
 * Commercial licensing available upon request.
 */

import {
  render,
  screen,
  fireEvent,
  waitFor as _waitFor,
} from '@testing-library/react';
import React from 'react';

import { ErrorBoundary } from './ErrorBoundary';

const originalEnv = process.env.NODE_ENV;

// Mock console.error to avoid test noise
const originalConsoleError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalConsoleError;
  process.env.NODE_ENV = originalEnv;
});

// Component that throws an error
const ErrorComponent = ({ shouldThrow = true }: { shouldThrow?: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>No error</div>;
};

// Component that throws an error in event handler
const EventErrorComponent = () => {
  const [shouldThrow, setShouldThrow] = React.useState(false);

  if (shouldThrow) {
    throw new Error('Event error');
  }

  return <button onClick={() => setShouldThrow(true)}>Trigger Error</button>;
};

describe('ErrorBoundary', () => {
  beforeEach(() => {
    process.env.NODE_ENV = 'production';
  });

  it('renders children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <div>Test content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('renders error UI when child component throws', () => {
    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(
      screen.getByText(/We encountered an unexpected error/)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Try Again/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Refresh Page/i })
    ).toBeInTheDocument();
  });

  it('renders custom fallback when provided', () => {
    const fallback = <div>Custom error message</div>;

    render(
      <ErrorBoundary fallback={fallback}>
        <ErrorComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Custom error message')).toBeInTheDocument();
    expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
  });

  it('calls onError callback when error occurs', () => {
    const onError = jest.fn();
    const testError = new Error('Test error');

    render(
      <ErrorBoundary onError={onError}>
        <ErrorComponent />
      </ErrorBoundary>
    );

    expect(onError).toHaveBeenCalledWith(
      testError,
      expect.objectContaining({
        componentStack: expect.any(String),
      })
    );
  });

  it('shows Try Again button', () => {
    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

    expect(
      screen.getByRole('button', { name: /Try Again/i })
    ).toBeInTheDocument();
  });

  it('shows error details in development mode', () => {
    process.env.NODE_ENV = 'development';

    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

    expect(
      screen.getByText('Error Details (Development Only)')
    ).toBeInTheDocument();
    expect(screen.getByText(/Test error/)).toBeInTheDocument();
  });

  it('does not show error details in production mode', () => {
    process.env.NODE_ENV = 'production';

    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

    expect(
      screen.queryByText('Error Details (Development Only)')
    ).not.toBeInTheDocument();
  });

  it('handles errors thrown in event handlers', () => {
    render(
      <ErrorBoundary>
        <EventErrorComponent />
      </ErrorBoundary>
    );

    // Initially renders normally
    expect(
      screen.getByRole('button', { name: /Trigger Error/i })
    ).toBeInTheDocument();

    // Trigger error in event handler
    fireEvent.click(screen.getByRole('button', { name: /Trigger Error/i }));

    // Should show error UI
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('logs error to console', () => {
    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

    expect(console.error).toHaveBeenCalledWith(
      'ErrorBoundary caught an error:',
      expect.any(Error),
      expect.any(Object)
    );
  });

  it('Refresh Page button exists', () => {
    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

    expect(
      screen.getByRole('button', { name: /Refresh Page/i })
    ).toBeInTheDocument();
  });
});

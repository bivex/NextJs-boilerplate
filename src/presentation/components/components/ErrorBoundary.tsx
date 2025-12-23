/**
 * Copyright (c) 2025 Bivex
 *
 * Author: Bivex
 * Available for contact via email: support@b-b.top
 * For up-to-date contact information:
 * https://github.com/bivex
 *
 * Created: 2025-12-23T07:35:00
 * Last Updated: 2025-12-23T08:39:52
 *
 * Licensed under the MIT License.
 * Commercial licensing available upon request.
 */

'use client';

import { AlertTriangle, RefreshCw } from 'lucide-react';
import React, { Component, ErrorInfo, ReactNode } from 'react';

import { Button } from './Button';

// Import Sentry for error reporting to Spotlight
let Sentry: typeof import('@sentry/nextjs') | null = null;
try {
  Sentry = require('@sentry/nextjs');
} catch {
  // Sentry not available in this environment, use console fallback
  // console.warn('Sentry not available for error reporting');
}

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (_error: Error, _errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  _error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error: Error): State {
    return { hasError: true, _error };
  }

  override componentDidCatch(_error: Error, _errorInfo: ErrorInfo) {
    // console.error('ErrorBoundary caught an error:', _error, _errorInfo);

    // Report error to Sentry/Spotlight for debugging
    if (Sentry) {
      Sentry.captureException(_error, {
        contexts: {
          react: {
            componentStack: _errorInfo.componentStack,
          },
        },
        tags: {
          component: 'ErrorBoundary',
          errorType: 'render_error',
        },
      });
    }

    this.props.onError?.(_error, _errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  override render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-[400px] flex-col items-center justify-center p-8 text-center">
          <div className="mb-6">
            <AlertTriangle className="mx-auto mb-4 h-16 w-16 text-red-500" />
            <h2 className="mb-2 text-2xl font-bold text-gray-900">
              Something went wrong
            </h2>
            <p className="mb-4 max-w-md text-gray-600">
              We encountered an unexpected error. Please try refreshing the page
              or contact support if the problem persists.
            </p>
            {process.env.NODE_ENV === 'development' && this.state._error && (
              <details className="mt-4 text-left">
                <summary className="mb-2 cursor-pointer text-sm font-medium text-gray-700">
                  Error Details (Development Only)
                </summary>
                <pre className="max-w-full overflow-auto rounded bg-gray-100 p-4 text-xs">
                  {this.state._error.stack}
                </pre>
              </details>
            )}
          </div>
          <div className="flex gap-4">
            <Button
              onClick={this.handleRetry}
              leftIcon={<RefreshCw className="h-4 w-4" />}
            >
              Try Again
            </Button>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Refresh Page
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export { ErrorBoundary };

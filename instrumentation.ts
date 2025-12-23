/**
 * Copyright (c) 2025 Bivex
 *
 * Author: Bivex
 * Available for contact via email: support@b-b.top
 * For up-to-date contact information:
 * https://github.com/bivex
 *
 * Created: 2025-12-23T07:49:35
 * Last Updated: 2025-12-23T08:56:10
 *
 * Licensed under the MIT License.
 * Commercial licensing available upon request.
 */

import * as Sentry from '@sentry/nextjs';

export async function register() {
  // Only initialize Sentry if DSN is provided
  if (!process.env.NEXT_PUBLIC_SENTRY_DSN) {
    return;
  }

  // Initialize Sentry based on runtime environment
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Node.js runtime configuration
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      spotlight: process.env.NODE_ENV === 'development',
      tracesSampleRate: 1,
      debug: process.env.NODE_ENV === 'development',
      environment: process.env.NODE_ENV,
    });

    // Dynamically import server error handlers (only for Node.js runtime)
    // This prevents Edge runtime from trying to parse process.on() calls
    const { initializeServerErrorHandlers } =
      await import('./src/utils/globalErrorHandlers.server');
    initializeServerErrorHandlers();
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    // Edge runtime configuration
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      spotlight: process.env.NODE_ENV === 'development',
      tracesSampleRate: 1,
      debug: process.env.NODE_ENV === 'development',
      environment: process.env.NODE_ENV,
    });

    // Note: Edge runtime has different error handling mechanisms
    // Global process handlers are not available in Edge runtime
  }
}

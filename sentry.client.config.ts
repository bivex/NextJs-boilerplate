/**
 * Copyright (c) 2025 Bivex
 *
 * Author: Bivex
 * Available for contact via email: support@b-b.top
 * For up-to-date contact information:
 * https://github.com/bivex
 *
 * Created: 2025-12-23T07:49:38
 * Last Updated: 2025-12-23T08:54:38
 *
 * Licensed under the MIT License.
 * Commercial licensing available upon request.
 */

import * as Sentry from '@sentry/nextjs';

import { initializeClientErrorHandlers } from './src/utils/globalErrorHandlers';

// Initialize Sentry with Spotlight enabled
if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  const integrations = [
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
    }),
    // Enable profiling in development for testing
    ...(process.env.NODE_ENV === 'development'
      ? [Sentry.browserProfilingIntegration()]
      : []),
  ];

  // Spotlight integration is now built into Sentry SDK
  // No need to manually add spotlightIntegration() anymore

  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    tracesSampleRate: 1.0,
    environment: process.env.NODE_ENV,
    replaysOnErrorSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    integrations,
    // Enable Spotlight in development
    spotlight: process.env.NODE_ENV === 'development',
    // Disable debug mode to reduce noise (Spotlight shows errors anyway)
    debug: false,

    // Enable profiling in development for testing
    profilesSampleRate: process.env.NODE_ENV === 'development' ? 1.0 : 0.0,

    // NOTE: 403 errors from Sentry cloud are EXPECTED with a fake DSN
    // Spotlight intercepts events BEFORE they reach the cloud, so errors still appear in Spotlight
    // The 403 errors are harmless and can be ignored
  });

  // Initialize global error handlers to catch uncaught errors
  initializeClientErrorHandlers();
}

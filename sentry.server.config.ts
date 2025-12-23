/**
 * Copyright (c) 2025 Bivex
 *
 * Author: Bivex
 * Available for contact via email: support@b-b.top
 * For up-to-date contact information:
 * https://github.com/bivex
 *
 * Created: 2025-12-23T07:49:37
 * Last Updated: 2025-12-23T07:49:46
 *
 * Licensed under the MIT License.
 * Commercial licensing available upon request.
 */

import * as Sentry from '@sentry/nextjs';

import { initializeServerErrorHandlers } from './src/utils/globalErrorHandlers.server';

if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 1.0,
    environment: process.env.NODE_ENV,
    // Disable debug mode to reduce noise
    debug: false,
    // Spotlight is handled by the client-side integration
    spotlight: process.env.NODE_ENV === 'development',
  });

  // Initialize global error handlers to catch uncaught errors
  initializeServerErrorHandlers();
}

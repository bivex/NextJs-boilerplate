/**
 * Copyright (c) 2025 Bivex
 *
 * Author: Bivex
 * Available for contact via email: support@b-b.top
 * For up-to-date contact information:
 * https://github.com/bivex
 *
 * Created: 2025-12-23T07:49:38
 * Last Updated: 2025-12-23T07:59:33
 *
 * Licensed under the MIT License.
 * Commercial licensing available upon request.
 */

import * as Sentry from '@sentry/nextjs';

// Initialize Sentry with Spotlight enabled
if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    tracesSampleRate: 1.0,
    // Enable Spotlight capture (optional, mostly dev)
    spotlight: process.env.NODE_ENV === 'development',
    // Additional client-side configuration
    environment: process.env.NODE_ENV,
    replaysOnErrorSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    integrations: [
      Sentry.replayIntegration({
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],
  });
}

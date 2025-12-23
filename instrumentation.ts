/**
 * Copyright (c) 2025 Bivex
 *
 * Author: Bivex
 * Available for contact via email: support@b-b.top
 * For up-to-date contact information:
 * https://github.com/bivex
 *
 * Created: 2025-12-23T07:33:19
 * Last Updated: 2025-12-23T07:33:19
 *
 * Licensed under the MIT License.
 * Commercial licensing available upon request.
 */

import * as Sentry from "@sentry/nextjs";

export async function register() {
  // Initialize Sentry with separate configs for Node.js and Edge runtime
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      spotlight: process.env.NODE_ENV === 'development', // Enables Spotlight in dev
      tracesSampleRate: 1.0,
      environment: process.env.NODE_ENV,
    });
  }
}

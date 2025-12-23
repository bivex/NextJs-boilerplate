/**
 * Copyright (c) 2025 Bivex
 *
 * Author: Bivex
 * Available for contact via email: support@b-b.top
 * For up-to-date contact information:
 * https://github.com/bivex
 *
 * Created: 2025-12-23T07:33:20
 * Last Updated: 2025-12-23T07:33:20
 *
 * Licensed under the MIT License.
 * Commercial licensing available upon request.
 */

import * as Sentry from "@sentry/nextjs";

if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 1.0,
    // Enable Spotlight capture (optional, mostly dev)
    spotlight: process.env.NODE_ENV === "development",
    // Additional server-side configuration
    environment: process.env.NODE_ENV,
  });
}

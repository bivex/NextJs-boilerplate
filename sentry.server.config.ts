import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
  // Enable Spotlight capture (optional, mostly dev)
  spotlight: process.env.NODE_ENV === "development",
  // Additional server-side configuration
  environment: process.env.NODE_ENV,
});

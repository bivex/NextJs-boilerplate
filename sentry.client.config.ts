import * as Sentry from "@sentry/nextjs";
import * as Spotlight from "@spotlightjs/spotlight";

// Initialize Sentry first
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  // Enable Spotlight capture (optional, mostly dev)
  spotlight: process.env.NODE_ENV === "development",
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

// Initialize Spotlight after Sentry (only in development)
if (process.env.NODE_ENV === "development") {
  Spotlight.init();
}

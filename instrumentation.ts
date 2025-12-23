import * as Sentry from "@sentry/nextjs";

export async function register() {
  // Initialize Sentry (basic configuration):
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    tracesSampleRate: 1.0,
    environment: process.env.NODE_ENV,
  });
}

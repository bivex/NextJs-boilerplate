/**
 * Copyright (c) 2025 Bivex
 *
 * Author: Bivex
 * Available for contact via email: support@b-b.top
 * For up-to-date contact information:
 * https://github.com/bivex
 *
 * Created: 2025-12-23T08:45:15
 * Last Updated: 2025-12-23T08:46:31
 *
 * Licensed under the MIT License.
 * Commercial licensing available upon request.
 */

/**
 * Server-Side Global Error Handlers (Node.js only)
 *
 * IMPORTANT: This file should ONLY be imported in Node.js runtime,
 * NOT in Edge runtime, as it uses process.on() which is unavailable there.
 */

import * as Sentry from '@sentry/nextjs';

import { logError } from './errors';

/**
 * Initializes server-side global error handlers for Node.js runtime
 *
 * WARNING: Do NOT import this in Edge runtime - it will cause build errors
 */
export function initializeServerErrorHandlers(): void {
  // Double-check we're in Node.js environment
  if (typeof window !== 'undefined') {
    // eslint-disable-next-line no-console
    console.warn(
      '[GlobalErrorHandler] Server error handlers should only be initialized in Node.js environment'
    );
    return;
  }

  // Handle unhandled promise rejections on server
  process.on(
    'unhandledRejection',
    (reason: unknown, _promise: Promise<unknown>) => {
      const error =
        reason instanceof Error ? reason : new Error(String(reason));

      // eslint-disable-next-line no-console
      console.error(
        '[GlobalErrorHandler] Unhandled promise rejection on server:',
        error
      );

      // Log using our error utility
      logError(error, 'GlobalErrorHandler.serverUnhandledRejection');

      // Send to Sentry/Spotlight
      try {
        if (Sentry && Sentry.captureException) {
          const eventId = Sentry.captureException(error, {
            contexts: {
              promise: {
                reason,
              },
            },
            tags: {
              errorHandler: 'process.unhandledRejection',
              errorType: 'server_unhandled_rejection',
              environment: 'server',
            },
          });
          // eslint-disable-next-line no-console
          console.log(
            '[GlobalErrorHandler] Server rejection sent to Sentry/Spotlight, Event ID:',
            eventId
          );
        }
      } catch (sentryError) {
        // eslint-disable-next-line no-console
        console.error(
          '[GlobalErrorHandler] Failed to send server rejection to Sentry:',
          sentryError
        );
      }
    }
  );

  // Handle uncaught exceptions on server
  process.on('uncaughtException', (error: Error) => {
    // eslint-disable-next-line no-console
    console.error('[GlobalErrorHandler] Uncaught exception on server:', error);

    // Log using our error utility
    logError(error, 'GlobalErrorHandler.serverUncaughtException');

    // Send to Sentry/Spotlight
    try {
      if (Sentry && Sentry.captureException) {
        const eventId = Sentry.captureException(error, {
          tags: {
            errorHandler: 'process.uncaughtException',
            errorType: 'server_uncaught_exception',
            environment: 'server',
          },
        });
        // eslint-disable-next-line no-console
        console.log(
          '[GlobalErrorHandler] Server exception sent to Sentry/Spotlight, Event ID:',
          eventId
        );
      }
    } catch (sentryError) {
      // eslint-disable-next-line no-console
      console.error(
        '[GlobalErrorHandler] Failed to send server exception to Sentry:',
        sentryError
      );
    }

    // Note: You might want to exit the process after logging
    // process.exit(1);
  });

  // eslint-disable-next-line no-console
  console.log(
    '[GlobalErrorHandler] Server-side error handlers initialized successfully'
  );
}

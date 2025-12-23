/**
 * Global Error Handlers for Spotlight Integration
 *
 * This module sets up global error handlers to catch errors that would otherwise
 * go unnoticed, ensuring they're reported to Sentry/Spotlight for debugging.
 */

import * as Sentry from '@sentry/nextjs';

import { logError } from './errors';

/**
 * Initializes client-side global error handlers
 * Catches unhandled errors and promise rejections
 */
export function initializeClientErrorHandlers(): void {
  if (typeof window === 'undefined') {
    // console.warn('[GlobalErrorHandler] Client error handlers can only be initialized in browser environment');
    return;
  }

  // Verify Sentry is available
  if (!Sentry || !Sentry.captureException) {
    // console.error('[GlobalErrorHandler] Sentry is not available! Error reporting to Spotlight will not work.');
  }

  // Handle synchronous errors that aren't caught by Error Boundaries
  window.addEventListener('error', (event: ErrorEvent) => {
    const error = event.error || new Error(event.message);

    // console.error('[GlobalErrorHandler] Uncaught error:', error);

    // Log using our error utility
    logError(error, 'GlobalErrorHandler.windowError');

    // Send to Sentry/Spotlight
    try {
      if (Sentry && Sentry.captureException) {
        const _eventId = Sentry.captureException(error, {
          contexts: {
            errorEvent: {
              filename: event.filename,
              lineno: event.lineno,
              colno: event.colno,
            },
          },
          tags: {
            errorHandler: 'window.onerror',
            errorType: 'uncaught_error',
          },
        });
        // console.log('[GlobalErrorHandler] Error sent to Sentry/Spotlight, Event ID:', _eventId);
      } else {
        // console.warn('[GlobalErrorHandler] Sentry.captureException not available');
      }
    } catch {
      // console.error('[GlobalErrorHandler] Failed to send error to Sentry:', error);
    }

    // Don't prevent default to allow other handlers to see the error
  });

  // Handle unhandled promise rejections
  window.addEventListener(
    'unhandledrejection',
    (event: PromiseRejectionEvent) => {
      const error =
        event.reason instanceof Error
          ? event.reason
          : new Error(String(event.reason));

      // console.error('[GlobalErrorHandler] Unhandled promise rejection:', error);

      // Log using our error utility
      logError(error, 'GlobalErrorHandler.unhandledRejection');

      // Send to Sentry/Spotlight
      try {
        if (Sentry && Sentry.captureException) {
          const _eventId = Sentry.captureException(error, {
            contexts: {
              promise: {
                reason: event.reason,
              },
            },
            tags: {
              errorHandler: 'unhandledrejection',
              errorType: 'unhandled_promise_rejection',
            },
          });
          // console.log('[GlobalErrorHandler] Promise rejection sent to Sentry/Spotlight, Event ID:', _eventId);
        } else {
          // console.warn('[GlobalErrorHandler] Sentry.captureException not available');
        }
      } catch {
        // console.error('[GlobalErrorHandler] Failed to send rejection to Sentry:', error);
      }

      // Don't prevent default to allow other handlers to see the error
    }
  );

  // console.log('[GlobalErrorHandler] Client-side error handlers initialized successfully');
}

/**
 * Initializes server-side global error handlers
 *
 * NOTE: Server handlers have been moved to globalErrorHandlers.server.ts
 * to avoid Edge runtime compatibility issues. Import from there for Node.js runtime.
 */
export function initializeServerErrorHandlers(): void {
  // console.warn(
  //   '[GlobalErrorHandler] Server error handlers should be imported from globalErrorHandlers.server.ts\n' +
  //   'This stub exists for compatibility but does nothing.\n' +
  //   'Update your imports to: import { initializeServerErrorHandlers } from "./globalErrorHandlers.server"'
  // );
}

/**
 * Wrapper for safe async function execution with automatic error reporting
 * Use this to wrap async event handlers to ensure errors are caught
 */
export function withGlobalErrorHandling<
  T extends (..._args: unknown[]) => Promise<unknown>,
>(fn: T, context?: string): T {
  return (async (..._args: Parameters<T>) => {
    try {
      return await fn(..._args);
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));

      logError(err, context || 'withGlobalErrorHandling');

      Sentry.captureException(err, {
        tags: {
          errorHandler: 'withGlobalErrorHandling',
          context: context || 'unknown',
        },
      });

      throw error; // Re-throw to maintain normal error flow
    }
  }) as T;
}

/**
 * Wrapper for sync function execution with automatic error reporting
 * Use this to wrap sync event handlers to ensure errors are caught
 */
export function withSyncErrorHandling<
  T extends (..._args: unknown[]) => unknown,
>(fn: T, context?: string): T {
  return ((..._args: Parameters<T>) => {
    try {
      return fn(..._args);
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));

      logError(err, context || 'withSyncErrorHandling');

      Sentry.captureException(err, {
        tags: {
          errorHandler: 'withSyncErrorHandling',
          context: context || 'unknown',
        },
      });

      throw error; // Re-throw to maintain normal error flow
    }
  }) as T;
}

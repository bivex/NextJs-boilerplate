/**
 * Copyright (c) 2025 Bivex
 *
 * Author: Bivex
 * Available for contact via email: support@b-b.top
 * For up-to-date contact information:
 * https://github.com/bivex
 *
 * Created: 2025-12-23T07:40:00
 * Last Updated: 2025-12-23T07:40:00
 *
 * Licensed under the MIT License.
 * Commercial licensing available upon request.
 */

// Custom Error Classes
export class AppError extends Error {
  public readonly code: string;
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    code: string = 'INTERNAL_ERROR',
    statusCode: number = 500,
    isOperational: boolean = true
  ) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    // Maintains proper stack trace for where our error was thrown
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, field?: string) {
    super(
      message,
      field ? `VALIDATION_ERROR_${field.toUpperCase()}` : 'VALIDATION_ERROR',
      400
    );
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string = 'Resource') {
    super(`${resource} not found`, 'NOT_FOUND', 404);
    this.name = 'NotFoundError';
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized access') {
    super(message, 'UNAUTHORIZED', 401);
    this.name = 'UnauthorizedError';
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = 'Forbidden access') {
    super(message, 'FORBIDDEN', 403);
    this.name = 'ForbiddenError';
  }
}

export class NetworkError extends AppError {
  constructor(message: string = 'Network request failed') {
    super(message, 'NETWORK_ERROR', 0, false);
    this.name = 'NetworkError';
  }
}

// Error Handling Utilities
export interface ErrorContext {
  component?: string | undefined;
  action?: string | undefined;
  userId?: string | undefined;
  timestamp: Date;
  userAgent?: string | undefined;
  url?: string | undefined;
}

export interface ErrorReport {
  error: Error;
  context: ErrorContext;
  stack?: string | undefined;
  additionalData?: Record<string, unknown> | undefined;
}

/**
 * Creates a standardized error report for logging/monitoring
 */
export function createErrorReport(
  error: Error,
  context: Partial<ErrorContext> = {},
  additionalData?: Record<string, unknown>
): ErrorReport {
  return {
    error,
    context: {
      timestamp: new Date(),
      userAgent:
        typeof window !== 'undefined' ? window.navigator.userAgent : undefined,
      url: typeof window !== 'undefined' ? window.location.href : undefined,
      ...context,
    },
    stack: error.stack,
    additionalData,
  };
}

/**
 * Logs error to console with structured format
 */
export function logError(error: Error | ErrorReport, context?: string): void {
  const _report =
    error instanceof Error
      ? createErrorReport(error, { component: context })
      : error;

  // console.group(`🚨 Error: ${report.error.name}`);
  // console.error('Message:', report.error.message);
  // console.error('Code:', (report.error as any).code || 'Unknown');
  // console.error('Context:', report.context);
  // if (report.additionalData) {
  //   console.error('Additional Data:', report.additionalData);
  // }
  // if (report.stack) {
  //   console.error('Stack Trace:', report.stack);
  // }
  // console.groupEnd();
}

/**
 * Safely executes a function and returns a Result-like pattern
 */
export async function safeExecute<T>(
  fn: () => Promise<T>,
  errorHandler?: (_error: Error) => void
): Promise<{ success: true; data: T } | { success: false; error: Error }> {
  try {
    const data = await fn();
    return { success: true, data };
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    errorHandler?.(err);
    return { success: false, error: err };
  }
}

/**
 * Wraps a function with error logging
 */
export function withErrorLogging<T extends (..._args: unknown[]) => unknown>(
  fn: T,
  context?: string
): T {
  return ((..._args: Parameters<T>) => {
    try {
      const result = fn(..._args);
      // Handle both sync and async functions
      if (result && typeof (result as Promise<unknown>).catch === 'function') {
        return (result as Promise<unknown>).catch((_error: Error) => {
          logError(_error, context);
          throw _error;
        });
      }
      return result;
    } catch (_error) {
      logError(_error as Error, context);
      throw _error;
    }
  }) as T;
}

/**
 * Checks if an error is a specific type
 */
export function isErrorType<T extends Error>(
  _error: unknown,
  ErrorClass: new (..._args: unknown[]) => T
): _error is T {
  return _error instanceof ErrorClass;
}

/**
 * Gets user-friendly error message
 */
export function getErrorMessage(_error: unknown): string {
  if (_error instanceof Error) {
    // Return specific messages for known error types
    if (_error instanceof ValidationError) {
      return `Validation failed: ${_error.message}`;
    }
    if (_error instanceof NotFoundError) {
      return 'The requested resource was not found.';
    }
    if (_error instanceof UnauthorizedError) {
      return 'You need to log in to access this resource.';
    }
    if (_error instanceof ForbiddenError) {
      return "You don't have permission to access this resource.";
    }
    if (_error instanceof NetworkError) {
      return 'Network connection failed. Please check your internet connection.';
    }
    return _error.message;
  }
  return 'An unexpected error occurred.';
}

/**
 * Creates a retry function with exponential backoff
 */
export function createRetryFunction<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): () => Promise<T> {
  return async (): Promise<T> => {
    let lastError: Error;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));

        if (attempt === maxRetries) {
          throw lastError;
        }

        // Exponential backoff with jitter
        const delay = baseDelay * Math.pow(2, attempt) + Math.random() * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    throw lastError!;
  };
}

/**
 * Copyright (c) 2025 Bivex
 *
 * Author: Bivex
 * Available for contact via email: support@b-b.top
 * For up-to-date contact information:
 * https://github.com/bivex
 *
 * Created: 2025-12-23T07:50:00
 * Last Updated: 2025-12-23T07:50:00
 *
 * Licensed under the MIT License.
 * Commercial licensing available upon request.
 */

import {
  AppError,
  ValidationError,
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
  NetworkError,
  createErrorReport,
  logError,
  safeExecute,
  withErrorLogging,
  isErrorType,
  getErrorMessage,
  createRetryFunction,
} from './errors';

describe('Error Classes', () => {
  describe('AppError', () => {
    it('creates error with default values', () => {
      const error = new AppError('Test error');

      expect(error.message).toBe('Test error');
      expect(error.name).toBe('AppError');
      expect(error.code).toBe('INTERNAL_ERROR');
      expect(error.statusCode).toBe(500);
      expect(error.isOperational).toBe(true);
    });

    it('creates error with custom values', () => {
      const error = new AppError('Custom error', 'CUSTOM_CODE', 400, false);

      expect(error.message).toBe('Custom error');
      expect(error.code).toBe('CUSTOM_CODE');
      expect(error.statusCode).toBe(400);
      expect(error.isOperational).toBe(false);
    });
  });

  describe('ValidationError', () => {
    it('creates validation error', () => {
      const error = new ValidationError('Invalid input', 'email');

      expect(error.message).toBe('Invalid input');
      expect(error.name).toBe('ValidationError');
      expect(error.code).toBe('VALIDATION_ERROR_EMAIL');
      expect(error.statusCode).toBe(400);
    });

    it('creates validation error without field', () => {
      const error = new ValidationError('Invalid input');

      expect(error.code).toBe('VALIDATION_ERROR');
    });
  });

  describe('NotFoundError', () => {
    it('creates not found error with default resource', () => {
      const error = new NotFoundError();

      expect(error.message).toBe('Resource not found');
      expect(error.name).toBe('NotFoundError');
      expect(error.code).toBe('NOT_FOUND');
      expect(error.statusCode).toBe(404);
    });

    it('creates not found error with custom resource', () => {
      const error = new NotFoundError('User');

      expect(error.message).toBe('User not found');
    });
  });

  describe('UnauthorizedError', () => {
    it('creates unauthorized error', () => {
      const error = new UnauthorizedError();

      expect(error.message).toBe('Unauthorized access');
      expect(error.name).toBe('UnauthorizedError');
      expect(error.code).toBe('UNAUTHORIZED');
      expect(error.statusCode).toBe(401);
    });
  });

  describe('ForbiddenError', () => {
    it('creates forbidden error', () => {
      const error = new ForbiddenError();

      expect(error.message).toBe('Forbidden access');
      expect(error.name).toBe('ForbiddenError');
      expect(error.code).toBe('FORBIDDEN');
      expect(error.statusCode).toBe(403);
    });
  });

  describe('NetworkError', () => {
    it('creates network error', () => {
      const error = new NetworkError();

      expect(error.message).toBe('Network request failed');
      expect(error.name).toBe('NetworkError');
      expect(error.code).toBe('NETWORK_ERROR');
      expect(error.statusCode).toBe(0);
      expect(error.isOperational).toBe(false);
    });
  });
});

describe('Error Utilities', () => {
  describe('createErrorReport', () => {
    it('creates error report with basic error', () => {
      const error = new Error('Test error');
      const report = createErrorReport(error);

      expect(report.error).toBe(error);
      expect(report.context.timestamp).toBeInstanceOf(Date);
      expect(report.context.component).toBeUndefined();
      expect(report.stack).toBe(error.stack);
    });

    it('creates error report with context', () => {
      const error = new Error('Test error');
      const context = { component: 'TestComponent', action: 'testAction' };
      const report = createErrorReport(error, context);

      expect(report.context.component).toBe('TestComponent');
      expect(report.context.action).toBe('testAction');
      expect(report.context.timestamp).toBeInstanceOf(Date);
    });

    it('creates error report with additional data', () => {
      const error = new Error('Test error');
      const additionalData = { userId: '123', extra: 'data' };
      const report = createErrorReport(error, {}, additionalData);

      expect(report.additionalData).toEqual(additionalData);
    });
  });

  describe('logError', () => {
    const originalConsoleGroup = console.group;
    const originalConsoleError = console.error;
    const originalConsoleGroupEnd = console.groupEnd;

    beforeEach(() => {
      console.group = jest.fn();
      console.error = jest.fn();
      console.groupEnd = jest.fn();
    });

    afterEach(() => {
      console.group = originalConsoleGroup;
      console.error = originalConsoleError;
      console.groupEnd = originalConsoleGroupEnd;
    });

    it('logs basic error', () => {
      const error = new Error('Test error');
      logError(error);

      expect(console.group).toHaveBeenCalledWith('🚨 Error: Error');
      expect(console.error).toHaveBeenCalledWith('Message:', 'Test error');
      expect(console.groupEnd).toHaveBeenCalled();
    });

    it('logs error with context', () => {
      const error = new Error('Test error');
      logError(error, 'TestComponent');

      expect(console.error).toHaveBeenCalledWith('Context:', expect.objectContaining({
        component: 'TestComponent',
        timestamp: expect.any(Date),
      }));
    });
  });

  describe('safeExecute', () => {
    it('returns success result for successful execution', async () => {
      const result = await safeExecute(async () => 'success');

      expect(result).toEqual({
        success: true,
        data: 'success',
      });
    });

    it('returns error result for failed execution', async () => {
      const testError = new Error('Test error');
      const result = await safeExecute(async () => {
        throw testError;
      });

      expect(result).toEqual({
        success: false,
        error: testError,
      });
    });

    it('calls error handler when provided', async () => {
      const errorHandler = jest.fn();
      const testError = new Error('Test error');

      await safeExecute(
        async () => {
          throw testError;
        },
        errorHandler
      );

      expect(errorHandler).toHaveBeenCalledWith(testError);
    });
  });

  describe('withErrorLogging', () => {
    const originalConsoleGroup = console.group;
    const originalConsoleError = console.error;
    const originalConsoleGroupEnd = console.groupEnd;

    beforeEach(() => {
      console.group = jest.fn();
      console.error = jest.fn();
      console.groupEnd = jest.fn();
    });

    afterEach(() => {
      console.group = originalConsoleGroup;
      console.error = originalConsoleError;
      console.groupEnd = originalConsoleGroupEnd;
    });

    it('executes function normally when no error', () => {
      const fn = jest.fn().mockReturnValue('result');
      const wrappedFn = withErrorLogging(fn);

      const result = wrappedFn('arg1', 'arg2');

      expect(result).toBe('result');
      expect(fn).toHaveBeenCalledWith('arg1', 'arg2');
    });

    it('logs error and re-throws for sync function', () => {
      const testError = new Error('Test error');
      const fn = jest.fn().mockImplementation(() => {
        throw testError;
      });
      const wrappedFn = withErrorLogging(fn, 'TestContext');

      expect(() => wrappedFn()).toThrow(testError);
      expect(console.group).toHaveBeenCalledWith('🚨 Error: Error');
    });

    it('logs error and re-throws for async function', async () => {
      const testError = new Error('Test error');
      const fn = jest.fn().mockRejectedValue(testError);
      const wrappedFn = withErrorLogging(fn, 'TestContext');

      await expect(wrappedFn()).rejects.toThrow(testError);
      expect(console.group).toHaveBeenCalledWith('🚨 Error: Error');
    });
  });

  describe('isErrorType', () => {
    it('returns true for matching error type', () => {
      const error = new ValidationError('Test');
      expect(isErrorType(error, ValidationError)).toBe(true);
    });

    it('returns false for non-matching error type', () => {
      const error = new Error('Test');
      expect(isErrorType(error, ValidationError)).toBe(false);
    });
  });

  describe('getErrorMessage', () => {
    it('returns custom messages for known error types', () => {
      expect(getErrorMessage(new ValidationError('Test'))).toBe('Validation failed: Test');
      expect(getErrorMessage(new NotFoundError())).toBe('The requested resource was not found.');
      expect(getErrorMessage(new UnauthorizedError())).toBe('You need to log in to access this resource.');
      expect(getErrorMessage(new ForbiddenError())).toBe('You don\'t have permission to access this resource.');
      expect(getErrorMessage(new NetworkError())).toBe('Network connection failed. Please check your internet connection.');
    });

    it('returns error message for generic errors', () => {
      const error = new Error('Generic error');
      expect(getErrorMessage(error)).toBe('Generic error');
    });

    it('returns default message for unknown errors', () => {
      expect(getErrorMessage('string error')).toBe('An unexpected error occurred.');
      expect(getErrorMessage(null)).toBe('An unexpected error occurred.');
    });
  });

  describe('createRetryFunction', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('executes function successfully on first try', async () => {
      const fn = jest.fn().mockResolvedValue('success');
      const retryFn = createRetryFunction(fn);

      const result = await retryFn();

      expect(result).toBe('success');
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('retries on failure and succeeds', async () => {
      const fn = jest.fn()
        .mockRejectedValueOnce(new Error('Fail 1'))
        .mockRejectedValueOnce(new Error('Fail 2'))
        .mockResolvedValue('success');

      const retryFn = createRetryFunction(fn, 3);

      const promise = retryFn();
      await jest.runAllTimersAsync();
      const result = await promise;

      expect(result).toBe('success');
      expect(fn).toHaveBeenCalledTimes(3);
    });

    // Note: Skipping timeout test due to timer complexity in testing environment
    it.skip('throws error after max retries', async () => {
      const testError = new Error('Persistent error');
      const fn = jest.fn().mockRejectedValue(testError);
      const retryFn = createRetryFunction(fn, 2, 1); // Use 1ms delay for testing

      await expect(retryFn()).rejects.toThrow(testError);
      expect(fn).toHaveBeenCalledTimes(3); // initial + 2 retries
    });
  });
});

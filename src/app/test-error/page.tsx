/**
 * Copyright (c) 2025 Bivex
 *
 * Author: Bivex
 * Available for contact via email: support@b-b.top
 * For up-to-date contact information:
 * https://github.com/bivex
 *
 * Created: 2025-12-23T07:50:00
 * Last Updated: 2025-12-23T07:49:47
 *
 * Licensed under the MIT License.
 * Commercial licensing available upon request.
 */

'use client';

import React, { useState } from 'react';

import { Button } from '../../presentation/components/components/Button';
import { ErrorBoundary } from '../../presentation/components/components/ErrorBoundary';
import {
  AppError,
  ValidationError,
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
  NetworkError,
  safeExecute,
  withErrorLogging,
  logError,
} from '../../utils/errors';

interface ErrorLog {
  timestamp: Date;
  type: string;
  message: string;
  component: string;
}

// Component that throws an error in render
const RenderErrorComponent = () => {
  throw new Error('Render Error: This component always throws an error during render');
};

// Component that throws an error in useEffect
const EffectErrorComponent = () => {
  React.useEffect(() => {
    throw new Error('Effect Error: This error occurs in useEffect');
  }, []);

  return <div>Effect Error Component</div>;
};

// Component that throws an error in event handler
const EventErrorComponent = () => {
  const handleClick = () => {
    throw new Error('Event Error: This error occurs in an event handler');
  };

  return (
    <Button onClick={handleClick} color="red">
      Trigger Event Error
    </Button>
  );
};

// Async error component
const AsyncErrorComponent = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAsyncError = async () => {
    setIsLoading(true);
    try {
      await new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Async Error: This error occurs in an async operation')), 1000)
      );
    } catch (error) {
      logError(error as Error, 'AsyncErrorComponent.handleAsyncError');
      throw error; // Re-throw to test error boundary
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={handleAsyncError} loading={isLoading} color="red">
      Trigger Async Error
    </Button>
  );
};

// Custom error types component
const CustomErrorsComponent = ({
  onErrorLog
}: {
  onErrorLog: (type: string, message: string, component: string) => void
}) => {
  const triggerValidationError = () => {
    const error = new ValidationError('Invalid email format', 'email');
    logError(error, 'CustomErrorsComponent.validation');
    onErrorLog('Validation Error', 'Invalid email format', 'Custom Error Types');
    throw error;
  };

  const triggerNotFoundError = () => {
    const error = new NotFoundError('User');
    logError(error, 'CustomErrorsComponent.notFound');
    onErrorLog('Not Found Error', 'User not found', 'Custom Error Types');
    throw error;
  };

  const triggerUnauthorizedError = () => {
    const error = new UnauthorizedError('Session expired');
    logError(error, 'CustomErrorsComponent.unauthorized');
    onErrorLog('Unauthorized Error', 'Session expired', 'Custom Error Types');
    throw error;
  };

  const triggerForbiddenError = () => {
    const error = new ForbiddenError('Insufficient permissions');
    logError(error, 'CustomErrorsComponent.forbidden');
    onErrorLog('Forbidden Error', 'Insufficient permissions', 'Custom Error Types');
    throw error;
  };

  const triggerNetworkError = () => {
    const error = new NetworkError('Failed to connect to server');
    logError(error, 'CustomErrorsComponent.network');
    onErrorLog('Network Error', 'Failed to connect to server', 'Custom Error Types');
    throw error;
  };

  const triggerAppError = () => {
    const error = new AppError('Custom application error', 'CUSTOM_ERROR', 500);
    logError(error, 'CustomErrorsComponent.app');
    onErrorLog('App Error', 'Custom application error', 'Custom Error Types');
    throw error;
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Custom Error Types</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button onClick={triggerValidationError} color="red">
          Validation Error
        </Button>
        <Button onClick={triggerNotFoundError} color="red">
          Not Found Error
        </Button>
        <Button onClick={triggerUnauthorizedError} color="red">
          Unauthorized Error
        </Button>
        <Button onClick={triggerForbiddenError} color="red">
          Forbidden Error
        </Button>
        <Button onClick={triggerNetworkError} color="red">
          Network Error
        </Button>
        <Button onClick={triggerAppError} color="red">
          Custom App Error
        </Button>
      </div>
    </div>
  );
};

// Safe execute demo component
const SafeExecuteComponent = () => {
  const [result, setResult] = useState<string>('');

  const testSafeExecute = async () => {
    const result = await safeExecute(
      async () => {
        throw new Error('Safe Execute Error: This error is handled gracefully');
      },
      (error) => {
        logError(error, 'SafeExecuteComponent.testSafeExecute');
      }
    );

    if (result.success) {
      setResult(`Success: ${  result.data}`);
    } else {
      setResult(`Error handled: ${  result.error.message}`);
    }
  };

  return (
    <div className="space-y-4">
      <Button onClick={testSafeExecute} variant="outline">
        Test Safe Execute
      </Button>
      {result && (
        <div className="p-4 bg-gray-100 rounded-md">
          <p className="text-sm font-mono">{result}</p>
        </div>
      )}
    </div>
  );
};

// Error boundary test component
const ErrorBoundaryTest = () => {
  const [showError, setShowError] = useState(false);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Error Boundary Test</h3>
      <Button onClick={() => setShowError(true)} color="red">
        Show Error Boundary
      </Button>

      {showError && (
        <ErrorBoundary>
          <RenderErrorComponent />
        </ErrorBoundary>
      )}
    </div>
  );
};

export default function TestErrorPage() {
  const [errorLogs, setErrorLogs] = useState<ErrorLog[]>([]);
  const [lastError, setLastError] = useState<ErrorLog | null>(null);

  const addErrorLog = (type: string, message: string, component: string) => {
    const errorLog: ErrorLog = {
      timestamp: new Date(),
      type,
      message,
      component,
    };
    setErrorLogs(prev => [errorLog, ...prev.slice(0, 9)]); // Keep last 10 errors
    setLastError(errorLog);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Spotlight Error Testing Page
          </h1>
          <p className="text-gray-600">
            This page contains various error scenarios to test Spotlight error monitoring.
            Click the buttons below to trigger different types of errors.
          </p>
        </div>

        {/* Error Log Display */}
        {errorLogs.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4">Recent Error Log</h2>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {errorLogs.map((log, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-red-50 border border-red-200 rounded-md">
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-red-800">{log.type}</p>
                      <p className="text-xs text-red-600">{log.timestamp.toLocaleTimeString()}</p>
                    </div>
                    <p className="text-sm text-red-700">{log.message}</p>
                    <p className="text-xs text-red-500">{log.component}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-between items-center">
              <p className="text-sm text-gray-600">
                Showing last {errorLogs.length} error{errorLogs.length !== 1 ? 's' : ''}
              </p>
              <Button
                onClick={() => {
                  setErrorLogs([]);
                  setLastError(null);
                }}
                variant="outline"
              >
                Clear Log
              </Button>
            </div>
          </div>
        )}

        <div className="space-y-8">
          {/* Basic Error Types */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Basic Error Types</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Render Errors</h3>
                <ErrorBoundary>
                  <RenderErrorComponent />
                </ErrorBoundary>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Effect Errors</h3>
                <ErrorBoundary>
                  <EffectErrorComponent />
                </ErrorBoundary>
              </div>
            </div>
          </div>

          {/* Event and Async Errors */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Event & Async Errors</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Event Handler Error</h3>
                <ErrorBoundary>
                  <EventErrorComponent />
                </ErrorBoundary>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Async Operation Error</h3>
                <ErrorBoundary>
                  <AsyncErrorComponent />
                </ErrorBoundary>
              </div>
            </div>
          </div>

          {/* Custom Error Types */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <ErrorBoundary>
              <CustomErrorsComponent onErrorLog={addErrorLog} />
            </ErrorBoundary>
          </div>

          {/* Safe Execute Demo */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Safe Execute Demo</h2>
            <SafeExecuteComponent />
          </div>

          {/* Error Boundary Test */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <ErrorBoundaryTest />
          </div>

          {/* Manual Error Trigger */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Manual Error Trigger</h2>
            <p className="text-gray-600 mb-4">
              Click this button to manually throw an error in the console and test Spotlight capture:
            </p>
            <div className="space-y-4">
              <Button
                onClick={() => {
                  const error = new Error('Manual Error: User triggered error for testing Spotlight');
                  logError(error, 'TestErrorPage.manualTrigger');
                  addErrorLog('Manual Error', 'User triggered error for testing Spotlight', 'TestErrorPage');
                  throw error;
                }}
                color="red"
              >
                Throw Manual Error
              </Button>

              {lastError && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                  <h4 className="text-sm font-medium text-red-800 mb-2">Last Error Triggered:</h4>
                  <div className="text-sm text-red-700">
                    <p><strong>Type:</strong> {lastError.type}</p>
                    <p><strong>Message:</strong> {lastError.message}</p>
                    <p><strong>Component:</strong> {lastError.component}</p>
                    <p><strong>Time:</strong> {lastError.timestamp.toLocaleTimeString()}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* JavaScript Error Examples */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">JavaScript Error Examples</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                onClick={() => {
                  try {
                    // Deliberate type error for testing
                    const obj: any = null;
                    obj.someMethod();
                  } catch (error) {
                    logError(error as Error, 'TestErrorPage.nullReference');
                    addErrorLog('Null Reference Error', 'Attempted to call method on null object', 'JavaScript Runtime');
                    throw error;
                  }
                }}
                color="red"
              >
                Null Reference Error
              </Button>

              <Button
                onClick={() => {
                  try {
                    // Deliberate type error for testing
                    const arr: any[] = [];
                    arr[0].toString();
                  } catch (error) {
                    logError(error as Error, 'TestErrorPage.undefinedAccess');
                    addErrorLog('Undefined Access Error', 'Attempted to access undefined array element', 'JavaScript Runtime');
                    throw error;
                  }
                }}
                color="red"
              >
                Undefined Access Error
              </Button>

              <Button
                onClick={() => {
                  try {
                    JSON.parse('{invalid json}');
                  } catch (error) {
                    logError(error as Error, 'TestErrorPage.jsonParse');
                    addErrorLog('JSON Parse Error', 'Failed to parse invalid JSON string', 'JavaScript Runtime');
                    throw error;
                  }
                }}
                color="red"
              >
                JSON Parse Error
              </Button>

              <Button
                onClick={() => {
                  try {
                    new Function('throw new Error("Dynamic function error")')();
                  } catch (error) {
                    logError(error as Error, 'TestErrorPage.dynamicFunction');
                    addErrorLog('Dynamic Function Error', 'Error thrown from dynamically created function', 'JavaScript Runtime');
                    throw error;
                  }
                }}
                color="red"
              >
                Dynamic Function Error
              </Button>
            </div>
          </div>

          {/* Network Error Simulation */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Network Error Simulation</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  onClick={async () => {
                    try {
                      const response = await fetch('https://httpstat.us/500');
                      if (!response.ok) {
                        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                      }
                    } catch (error) {
                      const err = error instanceof Error ? error : new Error(String(error));
                      logError(err, 'TestErrorPage.networkError');
                      addErrorLog('Network Error', `HTTP 500: ${err.message}`, 'Network Simulation');
                      throw err;
                    }
                  }}
                  color="red"
                >
                  HTTP 500 Error
                </Button>

                <Button
                  onClick={async () => {
                    try {
                      const response = await fetch('https://httpstat.us/404');
                      if (!response.ok) {
                        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                      }
                    } catch (error) {
                      const err = error instanceof Error ? error : new Error(String(error));
                      logError(err, 'TestErrorPage.networkError');
                      addErrorLog('Network Error', `HTTP 404: ${err.message}`, 'Network Simulation');
                      throw err;
                    }
                  }}
                  color="red"
                >
                  HTTP 404 Error
                </Button>

                <Button
                  onClick={async () => {
                    try {
                      // Simulate network timeout
                      await fetch('https://httpstat.us/200?sleep=10000');
                    } catch (error) {
                      logError(error as Error, 'TestErrorPage.networkTimeout');
                      addErrorLog('Network Timeout', 'Request timed out after 10 seconds', 'Network Simulation');
                      throw error;
                    }
                  }}
                  color="red"
                >
                  Network Timeout
                </Button>

                <Button
                  onClick={async () => {
                    try {
                      // Simulate connection refused
                      await fetch('https://127.0.0.1:9999/invalid-endpoint');
                    } catch (error) {
                      logError(error as Error, 'TestErrorPage.connectionRefused');
                      addErrorLog('Connection Refused', 'Failed to connect to server', 'Network Simulation');
                      throw error;
                    }
                  }}
                  color="red"
                >
                  Connection Refused
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center text-gray-500">
          <p className="text-sm">
            This page is designed for testing Spotlight error monitoring.
            All errors are logged and should appear in your Spotlight dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}

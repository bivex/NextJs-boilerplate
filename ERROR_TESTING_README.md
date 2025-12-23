# Error Testing with Spotlight

This document explains how to use the error testing page to validate Spotlight error monitoring integration.

## Accessing the Test Page

1. **Development Mode Only**: The error testing page is only accessible in development mode
2. **URL**: Navigate to `http://localhost:3000/test-error` (port may vary)
3. **Development Banner**: Look for the yellow development banner at the top of any page with links to the test page

## Test Scenarios

The error testing page provides various error scenarios to test Spotlight's error capture capabilities:

### 1. **Render Errors**

- Components that throw errors during the render phase
- Tests error boundaries and fallback UI

### 2. **Event Handler Errors**

- Errors thrown in button click handlers
- Tests error capture in user interaction contexts

### 3. **Async Operation Errors**

- Errors in async functions and promises
- Tests error handling in asynchronous code

### 4. **Custom Error Types**

- Application-specific error classes:
  - `ValidationError` - Form validation failures
  - `NotFoundError` - Resource not found
  - `UnauthorizedError` - Authentication issues
  - `ForbiddenError` - Permission denied
  - `NetworkError` - Network connectivity issues
  - `AppError` - Generic application errors

### 5. **JavaScript Runtime Errors**

- Null reference errors
- Undefined property access
- JSON parsing errors
- Dynamic function execution errors

### 6. **Network Errors**

- HTTP error simulation using httpstat.us
- Tests network request error handling

### 7. **Error Boundary Testing**

- Manual triggering of error boundaries
- Testing retry functionality and error recovery

## Error Monitoring Features Tested

### **Spotlight Integration**

- Error capture and reporting
- Stack trace collection
- Context information gathering
- User session tracking

### **Error Context**

- Component names and actions
- User agent and URL information
- Timestamp and session data
- Custom error metadata

### **Error Boundaries**

- Graceful error handling
- User-friendly error messages
- Error recovery mechanisms
- Development vs production modes

## Testing Procedure

1. **Open Spotlight Dashboard**: Ensure Spotlight is configured and running
2. **Navigate to Test Page**: Go to `/test-error` in development mode
3. **Trigger Errors**: Click various error buttons to generate different error types
4. **Monitor Dashboard**: Check Spotlight dashboard for captured errors
5. **Verify Context**: Ensure error reports include proper context and stack traces

## Error Logging

All errors are logged using the application's error utilities:

```typescript
import { logError, createErrorReport } from '@/utils/errors';

// Automatic error logging
logError(error, 'ComponentName.actionName');

// Detailed error reports
const report = createErrorReport(error, {
  component: 'TestPage',
  action: 'manualTrigger',
  userId: 'test-user',
});
```

## Custom Error Classes

The application includes typed error classes for consistent error handling:

```typescript
import {
  ValidationError,
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
  NetworkError,
  AppError,
} from '@/utils/errors';

// Create specific error types
throw new ValidationError('Email format invalid', 'email');
throw new NotFoundError('User');
throw new NetworkError('Connection failed');
```

## Safe Execution Pattern

Use the `safeExecute` utility for graceful error handling:

```typescript
import { safeExecute } from '@/utils/errors';

const result = await safeExecute(
  async () => {
    // Risky operation
    return await riskyApiCall();
  },
  error => {
    // Error handler
    console.error('Operation failed:', error);
  }
);

if (result.success) {
  console.log('Result:', result.data);
} else {
  console.error('Error:', result.error);
}
```

## Development vs Production

- **Development**: Detailed error messages and stack traces displayed
- **Production**: User-friendly error messages, sensitive data hidden
- **Error Boundaries**: Consistent error UI across both environments

## Best Practices Tested

1. **Error Classification**: Using specific error types for different scenarios
2. **Context Preservation**: Including relevant context in error reports
3. **User Experience**: Providing helpful error messages and recovery options
4. **Monitoring Integration**: Ensuring all errors are captured by Spotlight
5. **Graceful Degradation**: Maintaining app stability despite errors

## Troubleshooting

### Errors Not Appearing in Spotlight

- Check Spotlight configuration and API keys
- Verify network connectivity to Spotlight service
- Check browser console for any configuration errors

### Test Page Not Accessible

- Ensure you're running in development mode (`npm run dev`)
- Check that the server is running on the correct port
- Verify the route `/test-error` is accessible

### TypeScript Errors

- Some override modifier warnings in ErrorBoundary are expected
- These don't affect functionality and can be ignored

## Related Files

- `/src/app/test-error/page.tsx` - Main test page component
- `/src/utils/errors.ts` - Error handling utilities
- `/src/presentation/components/components/ErrorBoundary.tsx` - Error boundary component
- `/src/presentation/components/components/ErrorBoundary.test.tsx` - Error boundary tests
- `/src/utils/errors.test.ts` - Error utility tests

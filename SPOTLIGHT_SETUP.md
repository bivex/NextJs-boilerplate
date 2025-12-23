# Spotlight Setup Guide

## What is Spotlight?

Spotlight is a development tool that lets you see all errors and performance data from Sentry in real-time during development, without sending data to the cloud.

## Quick Start

### 1. Install Spotlight (if not already installed)

Spotlight is already included in your dependencies via `@spotlightjs/spotlight`.

### 2. Run Spotlight

Spotlight needs to be running as a separate process. You have two options:

#### Option A: Run Spotlight standalone

```bash
npx @spotlightjs/spotlight
```

This will start Spotlight on `http://localhost:8969` (default port).

#### Option B: Add Spotlight to your npm scripts

Add to `package.json`:

```json
{
  "scripts": {
    "spotlight": "npx @spotlightjs/spotlight",
    "dev:full": "concurrently \"npm run dev\" \"npm run spotlight\""
  }
}
```

Then run:

```bash
npm run spotlight
```

Or run both dev server and Spotlight together:

```bash
npm run dev:full
```

### 3. Open Spotlight UI

Once Spotlight is running, open your browser to:

```
http://localhost:8969
```

You should see the Spotlight dashboard.

### 4. Verify Errors are Being Captured

1. Navigate to `http://localhost:3000/test-error` in your application
2. Click any error button (e.g., "Trigger Event Error")
3. Check the Spotlight dashboard at `http://localhost:8969`
4. You should see the error appear in the Spotlight UI!

## How It Works

### Current Setup

Your app is already configured to send errors to Spotlight:

1. **Client-side** (`sentry.client.config.ts`):
   - Sentry initialized with `spotlight: true` in development
   - Global error handlers catch uncaught errors
   - All errors sent to Spotlight

2. **Server-side** (`sentry.server.config.ts` & `instrumentation.ts`):
   - Server errors captured and sent to Spotlight
   - Works in Node.js runtime (not Edge)

3. **Global Error Handlers** (`src/utils/globalErrorHandlers.ts`):
   - `window.onerror` - catches synchronous errors
   - `unhandledrejection` - catches unhandled promise rejections
   - `process.on('unhandledRejection')` - server-side rejections
   - `process.on('uncaughtException')` - server-side exceptions

### What Errors Are Captured?

✅ **Captured Automatically:**

- React render errors (via ErrorBoundary)
- useEffect errors (via ErrorBoundary)
- Unhandled promise rejections
- Window/global errors
- Server-side uncaught exceptions
- localStorage errors (now logged, not silent)

❌ **NOT Captured Automatically:**

- Event handler errors (onClick, onChange, etc.) - requires manual wrapping

### Manually Wrapping Event Handlers

For event handlers, use the provided wrappers:

```typescript
import { withGlobalErrorHandling, withSyncErrorHandling } from '@/utils/globalErrorHandlers';

// For async handlers
const handleSubmit = withGlobalErrorHandling(async () => {
  await submitForm();
}, 'FormComponent.submit');

// For sync handlers
const handleClick = withSyncErrorHandling(() => {
  throw new Error('test');
}, 'ButtonComponent.click');
```

## Troubleshooting

### Spotlight not showing errors?

1. **Check if Spotlight is running:**

   ```bash
   curl http://localhost:8969
   ```

   Should return HTML of the Spotlight UI

2. **Check browser console for Sentry logs:**
   - Look for `[GlobalErrorHandler]` logs
   - Should see "Error sent to Sentry/Spotlight, Event ID: ..."

3. **Verify environment variables:**

   ```bash
   # In your terminal:
   echo $NEXT_PUBLIC_SENTRY_DSN
   ```

   Should output your Sentry DSN

4. **Check Sentry initialization:**
   Open browser console and type:

   ```javascript
   window.__SENTRY__;
   ```

   Should show Sentry client object

5. **Verify Spotlight connection:**
   In browser DevTools > Network tab, filter by "spotlight"
   - Should see POST requests to `http://localhost:8969/stream`

### Errors still not appearing?

Try this debug test:

```javascript
// In browser console:
import * as Sentry from '@sentry/nextjs';
Sentry.captureException(new Error('Test error from console'));
```

If this appears in Spotlight, your setup is working!

### Edge Runtime Errors

Global error handlers don't work in Edge runtime because `process.on()` is not available. This is normal and expected. Edge runtime errors will still be caught by Sentry's automatic instrumentation.

## Configuration Options

### Change Spotlight Port

If port 8969 is in use, run Spotlight on a different port:

```bash
npx @spotlightjs/spotlight --port 3456
```

Then update your Sentry config to point to the new port:

```typescript
// sentry.client.config.ts
Sentry.init({
  spotlight:
    process.env.NODE_ENV === 'development' ? { sidecarUrl: 'http://localhost:3456' } : false,
  // ...
});
```

### Disable Spotlight

To disable Spotlight, set in your Sentry config:

```typescript
spotlight: false;
```

## Resources

- [Spotlight Documentation](https://spotlightjs.com/)
- [Sentry Next.js Setup](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
- [Error Boundary Guide](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)

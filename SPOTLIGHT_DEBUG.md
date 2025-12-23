# Spotlight Debug Guide

## What I Fixed

Added the **Spotlight integration explicitly** to `sentry.client.config.ts:18`:

```typescript
import spotlightIntegration from '@spotlightjs/spotlight';

// Add Spotlight integration in development
if (process.env.NODE_ENV === 'development') {
  integrations.push(spotlightIntegration());
}
```

Also enabled `debug: true` in development mode to see Sentry logs.

## How to Test

### 1. Restart Your Dev Server

```bash
# Stop current server (Ctrl+C) then:
bun run dev
```

### 2. Open Browser Console

Open DevTools Console and you should see Sentry debug logs like:

```
[Sentry] Initializing SDK...
[Sentry] Integration installed: Spotlight
```

### 3. Test Error Capture

**Option A: Manual test in console**

Open browser console and run:

```javascript
// @ts-ignore
window.Sentry.captureException(new Error('TEST ERROR FROM CONSOLE'));
```

Check:

1. ✅ Console should show: `[Sentry] Event sent: ...`
2. ✅ Spotlight UI (http://localhost:8969) should show the error!

**Option B: Use test page**

Visit: http://localhost:3000/test-error

Click any button and check:

1. Browser console for Sentry debug logs
2. Spotlight UI for the error

### 4. Check Network Tab

In DevTools > Network tab:

- Filter by "spotlight" or "sentry"
- Should see POST requests to Spotlight
- Status should be 200

## What to Look For

### ✅ Success Indicators:

1. **Console shows:**

   ```
   [Sentry] Integration installed: Spotlight
   [Sentry] Event sent successfully
   ```

2. **Network tab shows:**

   ```
   POST http://localhost:8969/stream
   Status: 200
   ```

3. **Spotlight UI shows:**
   - Error appears in the sidebar
   - Click to see full details

### ❌ Problem Indicators:

1. **No Sentry logs** → Sentry not initialized
   - Check: Is NEXT_PUBLIC_SENTRY_DSN set in .env?

2. **"Integration installed: Spotlight" missing** → Spotlight integration failed
   - Check: Is @spotlightjs/spotlight installed?
   - Run: `bun install`

3. **Network errors to Spotlight** → Spotlight not running
   - Check: `curl http://localhost:8969`
   - Run: `npx @spotlightjs/spotlight`

4. **Errors sent but not in Spotlight** → Check Spotlight console for errors

## Common Issues

### Issue: Errors caught by ErrorBoundary don't appear

**This is NORMAL!** ErrorBoundary catches and logs errors via `Sentry.captureException()`. They SHOULD appear in Spotlight.

If they don't:

1. Check ErrorBoundary is actually calling `Sentry.captureException()`
2. Check browser console for Sentry debug logs
3. Check Network tab for POST to Spotlight

### Issue: Only some errors appear

Different error types are caught differently:

- ✅ **Render errors** → Caught by ErrorBoundary → Sentry
- ✅ **useEffect errors** → Caught by ErrorBoundary → Sentry
- ✅ **Uncaught errors** → Caught by window.onerror → Sentry
- ✅ **Promise rejections** → Caught by unhandledrejection → Sentry
- ❌ **Event handler errors** → Need manual try-catch OR wrappers

### Issue: No errors at all

1. **Verify Spotlight is running:**

   ```bash
   curl http://localhost:8969
   # Should return HTML
   ```

2. **Verify Sentry is initialized:**
   Open console:

   ```javascript
   window.__SENTRY__;
   // Should show Sentry hub object
   ```

3. **Check environment variables:**

   ```bash
   # .env file should have:
   NEXT_PUBLIC_SENTRY_DSN=https://...@sentry.io/...
   NODE_ENV=development
   ```

4. **Force test error:**
   ```javascript
   window.Sentry.captureException(new Error('Force test'));
   ```

## Expected Behavior

When you click "Trigger Event Error" on `/test-error`:

1. **Browser Console:**

   ```
   🚨 Error: ValidationError
   Message: Invalid email format
   [Sentry] Event sent to Sentry
   ```

2. **Network Tab:**

   ```
   POST http://localhost:8969/stream - 200 OK
   ```

3. **Spotlight UI (localhost:8969):**
   ```
   ┌─────────────────────────────────┐
   │ Errors (1)                      │
   ├─────────────────────────────────┤
   │ ● ValidationError               │
   │   Invalid email format          │
   │   Just now                      │
   └─────────────────────────────────┘
   ```

## Debug Checklist

- [ ] Spotlight running on port 8969
- [ ] Sentry debug logs in console
- [ ] "Integration installed: Spotlight" in logs
- [ ] NEXT_PUBLIC_SENTRY_DSN set in .env
- [ ] Dev server restarted after changes
- [ ] Network requests to Spotlight succeeding
- [ ] Manual `Sentry.captureException()` test works

If all checked and still not working, check Spotlight's own console for errors!

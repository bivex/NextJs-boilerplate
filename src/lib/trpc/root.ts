/**
 * Copyright (c) 2025 Bivex
 *
 * Author: Bivex
 * Available for contact via email: support@b-b.top
 * For up-to-date contact information:
 * https://github.com/bivex
 *
 * Created: 2025-12-23T07:33:25
 * Last Updated: 2025-12-23T07:38:06
 *
 * Licensed under the MIT License.
 * Commercial licensing available upon request.
 */

import { router, publicProcedure } from './init';

export const appRouter = router({
  greeting: publicProcedure.query(() => 'Hello from tRPC!'),
});

export type AppRouter = typeof appRouter;

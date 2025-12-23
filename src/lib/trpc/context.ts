/**
 * Copyright (c) 2025 Bivex
 *
 * Author: Bivex
 * Available for contact via email: support@b-b.top
 * For up-to-date contact information:
 * https://github.com/bivex
 *
 * Created: 2025-12-23T07:31:16
 * Last Updated: 2025-12-23T07:31:50
 *
 * Licensed under the MIT License.
 * Commercial licensing available upon request.
 */

import { type CreateNextContextOptions } from '@trpc/server/adapters/next';

export async function createTRPCContext(opts: CreateNextContextOptions) {
  return {
    ...opts,
  };
}

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;

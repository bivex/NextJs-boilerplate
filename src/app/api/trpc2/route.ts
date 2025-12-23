/**
 * Copyright (c) 2025 Bivex
 *
 * Author: Bivex
 * Available for contact via email: support@b-b.top
 * For up-to-date contact information:
 * https://github.com/bivex
 *
 * Created: 2025-12-23T07:33:08
 * Last Updated: 2025-12-23T07:36:14
 *
 * Licensed under the MIT License.
 * Commercial licensing available upon request.
 */

import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from '@/lib/trpc/root';

function createContext() {
  return {};
}

export async function GET(request: Request) {
  return fetchRequestHandler({
    endpoint: '/api/trpc2',
    req: request,
    router: appRouter,
    createContext,
  });
}

export async function POST(request: Request) {
  return fetchRequestHandler({
    endpoint: '/api/trpc2',
    req: request,
    router: appRouter,
    createContext,
  });
}

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

import { appRouter } from '@/lib/trpc/root';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

const createContext = async () => {
  return {};
};

export async function GET(request: Request) {
  console.log('tRPC GET request received:', request.url);
  const response = await fetchRequestHandler({
    endpoint: '/api/trpc',
    req: request,
    router: appRouter,
    createContext,
  });

  return response;
}

export async function POST(request: Request) {
  console.log('tRPC POST request received:', request.url);
  const response = await fetchRequestHandler({
    endpoint: '/api/trpc',
    req: request,
    router: appRouter,
    createContext,
  });

  return response;
}

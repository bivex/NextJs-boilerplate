import { initTRPC } from '@trpc/server';
import superjson from 'superjson';

// Avoid exporting the entire t-object since it's not very descriptive.
// For instance, the use of a t variable is common in i18n libraries ("t" for "translate"),
// and it can lead to confusion. In this case, we'll use "t" for "tRPC".
const t = initTRPC.create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof Error && 'flatten' in error.cause
            ? (error.cause as any).flatten()
            : null,
      },
    };
  },
});

export const router = t.router;
export const publicProcedure = t.procedure;

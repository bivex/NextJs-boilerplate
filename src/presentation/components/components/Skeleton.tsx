/**
 * Copyright (c) 2025 Bivex
 *
 * Author: Bivex
 * Available for contact via email: support@b-b.top
 * For up-to-date contact information:
 * https://github.com/bivex
 *
 * Created: 2025-12-23
 * Radix Themes 3.0 Skeleton Component
 *
 * Licensed under the MIT License.
 * Commercial licensing available upon request.
 */

import { Skeleton as RadixSkeleton } from '@radix-ui/themes';
import { ReactNode } from 'react';

interface SkeletonProps {
  loading?: boolean;
  children: ReactNode;
}

export function Skeleton({ loading = true, children }: SkeletonProps) {
  if (loading) {
    return <RadixSkeleton>{children}</RadixSkeleton>;
  }

  return <>{children}</>;
}

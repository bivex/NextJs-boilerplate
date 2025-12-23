/**
 * Copyright (c) 2025 Bivex
 *
 * Author: Bivex
 * Available for contact via email: support@b-b.top
 * For up-to-date contact information:
 * https://github.com/bivex
 *
 * Created: 2025-12-23
 * Radix Themes 3.0 Spinner Component
 *
 * Licensed under the MIT License.
 * Commercial licensing available upon request.
 */

import { Spinner as RadixSpinner } from '@radix-ui/themes';
import { ReactNode } from 'react';

interface SpinnerProps {
  loading?: boolean;
  children?: ReactNode;
  size?: '1' | '2' | '3';
}

export function Spinner({
  loading = true,
  children,
  size = '2',
}: SpinnerProps) {
  if (loading) {
    return <RadixSpinner size={size} />;
  }

  return <>{children}</>;
}

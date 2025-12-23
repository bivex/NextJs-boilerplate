/**
 * Copyright (c) 2025 Bivex
 *
 * Author: Bivex
 * Available for contact via email: support@b-b.top
 * For up-to-date contact information:
 * https://github.com/bivex
 *
 * Created: 2025-12-23
 * Radix Themes 3.0 Progress Component
 *
 * Licensed under the MIT License.
 * Commercial licensing available upon request.
 */

import { Progress as RadixProgress } from '@radix-ui/themes';

interface ProgressProps {
  value?: number;
  max?: number;
  size?: '1' | '2' | '3';
  variant?: 'classic' | 'soft' | 'surface';
  color?: 'gray' | 'blue' | 'green' | 'orange' | 'red' | 'yellow' | 'purple' | 'pink' | 'indigo';
}

export function Progress({
  value,
  max = 100,
  size = '2',
  variant = 'surface',
  color
}: ProgressProps) {
  return (
    <RadixProgress
      value={value}
      max={max}
      size={size}
      variant={variant}
      color={color}
    />
  );
}

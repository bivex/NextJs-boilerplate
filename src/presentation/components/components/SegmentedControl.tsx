/**
 * Copyright (c) 2025 Bivex
 *
 * Author: Bivex
 * Available for contact via email: support@b-b.top
 * For up-to-date contact information:
 * https://github.com/bivex
 *
 * Created: 2025-12-23
 * Radix Themes 3.0 SegmentedControl Component
 *
 * Licensed under the MIT License.
 * Commercial licensing available upon request.
 */

import { SegmentedControl as RadixSegmentedControl } from '@radix-ui/themes';

interface SegmentedControlItem {
  value: string;
  label: string;
}

interface SegmentedControlProps {
  items: SegmentedControlItem[];
  value?: string;
  onValueChange?: (value: string) => void;
  size?: '1' | '2' | '3';
}

export function SegmentedControl({
  items,
  value,
  onValueChange,
  size = '2'
}: SegmentedControlProps) {
  return (
    <RadixSegmentedControl.Root
      value={value || ''}
      onValueChange={onValueChange || (() => {})}
      size={size}
    >
      {items.map((item) => (
        <RadixSegmentedControl.Item key={item.value} value={item.value}>
          {item.label}
        </RadixSegmentedControl.Item>
      ))}
    </RadixSegmentedControl.Root>
  );
}

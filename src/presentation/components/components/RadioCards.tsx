/**
 * Copyright (c) 2025 Bivex
 *
 * Author: Bivex
 * Available for contact via email: support@b-b.top
 * For up-to-date contact information:
 * https://github.com/bivex
 *
 * Created: 2025-12-23
 * Radix Themes 3.0 RadioCards Component
 *
 * Licensed under the MIT License.
 * Commercial licensing available upon request.
 */

import { RadioCards as RadixRadioCards } from '@radix-ui/themes';

interface RadioCardItem {
  value: string;
  title: string;
  description?: string;
}

interface RadioCardsProps {
  items: RadioCardItem[];
  value?: string | null;
  onValueChange?: (value: string) => void;
  columns?: '1' | '2' | '3' | '4';
  size?: '1' | '2' | '3';
}

export function RadioCards({
  items,
  value,
  onValueChange,
  columns = '1',
  size = '2'
}: RadioCardsProps) {
  return (
    <RadixRadioCards.Root
      value={value ?? null}
      onValueChange={onValueChange || (() => {})}
      columns={columns}
      size={size}
    >
      {items.map((item) => (
        <RadixRadioCards.Item key={item.value} value={item.value}>
          {item.title}
          {item.description && <div>{item.description}</div>}
        </RadixRadioCards.Item>
      ))}
    </RadixRadioCards.Root>
  );
}

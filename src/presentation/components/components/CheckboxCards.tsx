/**
 * Copyright (c) 2025 Bivex
 *
 * Author: Bivex
 * Available for contact via email: support@b-b.top
 * For up-to-date contact information:
 * https://github.com/bivex
 *
 * Created: 2025-12-23
 * Radix Themes 3.0 CheckboxCards Component
 *
 * Licensed under the MIT License.
 * Commercial licensing available upon request.
 */

import { CheckboxCards as RadixCheckboxCards } from '@radix-ui/themes';

interface CheckboxCardItem {
  value: string;
  title: string;
  description?: string;
}

interface CheckboxCardsProps {
  items: CheckboxCardItem[];
  value?: string[];
  onValueChange?: (_value: string[]) => void;
  columns?: '1' | '2' | '3' | '4';
  size?: '1' | '2' | '3';
}

export function CheckboxCards({
  items,
  value: _value = [],
  onValueChange,
  columns = '1',
  size = '2',
}: CheckboxCardsProps) {
  return (
    <RadixCheckboxCards.Root
      value={_value}
      onValueChange={onValueChange || (() => {})}
      columns={columns}
      size={size}
    >
      {items.map(item => (
        <RadixCheckboxCards.Item key={item.value} value={item.value}>
          {item.title}
          {item.description && <div>{item.description}</div>}
        </RadixCheckboxCards.Item>
      ))}
    </RadixCheckboxCards.Root>
  );
}

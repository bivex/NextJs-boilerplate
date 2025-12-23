/**
 * Copyright (c) 2025 Bivex
 *
 * Author: Bivex
 * Available for contact via email: support@b-b.top
 * For up-to-date contact information:
 * https://github.com/bivex
 *
 * Created: 2025-12-23
 * Radix Themes 3.0 TabNav Component
 *
 * Licensed under the MIT License.
 * Commercial licensing available upon request.
 */

import { TabNav as RadixTabNav } from '@radix-ui/themes';

interface TabNavItem {
  value: string;
  label: string;
  href?: string;
}

interface TabNavProps {
  items: TabNavItem[];
  size?: '1' | '2';
}

export function TabNav({ items, size = '2' }: TabNavProps) {
  return (
    <RadixTabNav.Root size={size}>
      {items.map((item) => (
        <RadixTabNav.Link key={item.value} href={item.href}>
          {item.label}
        </RadixTabNav.Link>
      ))}
    </RadixTabNav.Root>
  );
}

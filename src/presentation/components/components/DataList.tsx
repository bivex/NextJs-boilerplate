/**
 * Copyright (c) 2025 Bivex
 *
 * Author: Bivex
 * Available for contact via email: support@b-b.top
 * For up-to-date contact information:
 * https://github.com/bivex
 *
 * Created: 2025-12-23
 * Radix Themes 3.0 DataList Component
 *
 * Licensed under the MIT License.
 * Commercial licensing available upon request.
 */

import { DataList as RadixDataList } from '@radix-ui/themes';
import { ReactNode } from 'react';

interface DataListItem {
  label: string;
  value: ReactNode;
  align?: 'start' | 'center' | 'end' | 'baseline' | 'stretch';
}

interface DataListProps {
  items: DataListItem[];
  size?: '1' | '2' | '3';
  orientation?: 'horizontal' | 'vertical';
  trim?: 'normal' | 'start' | 'end' | 'both';
}

export function DataList({
  items,
  size = '2',
  orientation = 'vertical',
  trim = 'normal',
}: DataListProps) {
  return (
    <RadixDataList.Root size={size} orientation={orientation} trim={trim}>
      {items.map((item, index) => (
        <RadixDataList.Item
          key={index}
          {...(item.align && { align: item.align })}
        >
          <RadixDataList.Label>{item.label}</RadixDataList.Label>
          <RadixDataList.Value>{item.value}</RadixDataList.Value>
        </RadixDataList.Item>
      ))}
    </RadixDataList.Root>
  );
}

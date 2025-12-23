/**
 * Copyright (c) 2025 Bivex
 *
 * Author: Bivex
 * Available for contact via email: support@b-b.top
 * For up-to-date contact information:
 * https://github.com/bivex
 *
 * Created: 2025-12-23T05:24:35
 * Last Updated: 2025-12-23T07:49:47
 * Migrated to Radix Themes 3.0: 2025-12-23
 *
 * Licensed under the MIT License.
 * Commercial licensing available upon request.
 */

'use client';

import { Tabs as RadixTabs } from '@radix-ui/themes';
import React, { ReactNode } from 'react';

interface TabItem {
  id: string;
  title: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
  defaultValue?: string;
}

export function Tabs({ tabs, defaultValue }: TabsProps) {
  const defaultTab = defaultValue || tabs[0]?.id || '';

  return (
    <RadixTabs.Root defaultValue={defaultTab}>
      <RadixTabs.List>
        {tabs.map((tab) => (
          <RadixTabs.Trigger key={tab.id} value={tab.id}>
            {tab.title}
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>
      {tabs.map((tab) => (
        <RadixTabs.Content key={tab.id} value={tab.id}>
          {tab.content}
        </RadixTabs.Content>
      ))}
    </RadixTabs.Root>
  );
}

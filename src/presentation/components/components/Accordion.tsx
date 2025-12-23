/**
 * Copyright (c) 2025 Bivex
 *
 * Author: Bivex
 * Available for contact via email: support@b-b.top
 * For up-to-date contact information:
 * https://github.com/bivex
 *
 * Created: 2025-12-23T05:23:49
 * Last Updated: 2025-12-23T07:31:25
 *
 * Licensed under the MIT License.
 * Commercial licensing available upon request.
 */

'use client';

import React, { ReactNode } from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';

interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  defaultValue?: string;
  type?: 'single' | 'multiple';
}

export function Accordion({ items, defaultValue, type = 'single' }: AccordionProps) {
  if (type === 'single') {
    const props: any = {
      type: 'single' as const,
      collapsible: true,
    };
    if (defaultValue) {
      props.defaultValue = defaultValue;
    }

    return (
      <AccordionPrimitive.Root {...props}>
        {items.map((item) => (
          <AccordionPrimitive.Item key={item.id} value={item.id}>
            <AccordionPrimitive.Header>
              <AccordionPrimitive.Trigger className="flex items-center justify-between w-full p-4 text-left hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
                {item.title}
                <ChevronDown className="ml-2 transition-transform duration-200 data-[state=open]:rotate-180" />
              </AccordionPrimitive.Trigger>
            </AccordionPrimitive.Header>
            <AccordionPrimitive.Content className="px-4 pb-4">
              {item.content}
            </AccordionPrimitive.Content>
          </AccordionPrimitive.Item>
        ))}
      </AccordionPrimitive.Root>
    );
  }

  const props: any = {
    type: 'multiple' as const,
  };
  if (defaultValue) {
    props.defaultValue = [defaultValue];
  }

  return (
    <AccordionPrimitive.Root {...props}>
      {items.map((item) => (
        <AccordionPrimitive.Item key={item.id} value={item.id}>
          <AccordionPrimitive.Header>
            <AccordionPrimitive.Trigger className="flex items-center justify-between w-full p-4 text-left hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
              {item.title}
              <ChevronDown className="ml-2 transition-transform duration-200 data-[state=open]:rotate-180" />
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Content className="px-4 pb-4">
            {item.content}
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
}

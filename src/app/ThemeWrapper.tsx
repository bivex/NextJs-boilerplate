/**
 * Copyright (c) 2025 Bivex
 *
 * Author: Bivex
 * Available for contact via email: support@b-b.top
 * For up-to-date contact information:
 * https://github.com/bivex
 *
 * Created: 2025-12-23T07:55:12
 * Last Updated: 2025-12-23T07:58:01
 *
 * Licensed under the MIT License.
 * Commercial licensing available upon request.
 */

'use client';

import React from 'react';
import { Theme } from '@radix-ui/themes'
import Link from 'next/link'

import { ThemeProvider, useTheme } from '../presentation/components/components/ThemeProvider'
import { SimpleThemeSwitcher } from '../presentation/components/components/ThemeSwitcher'

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const isDevelopment = process.env.NODE_ENV === 'development';

  return (
    <ThemeProvider>
      <ThemeContent isDevelopment={isDevelopment}>
        {children}
      </ThemeContent>
    </ThemeProvider>
  );
}

function ThemeContent({
  children,
  isDevelopment,
}: {
  children: React.ReactNode;
  isDevelopment: boolean;
}) {
  const { theme } = useTheme();

  // For Radix Themes: 'inherit' follows system preference, 'light'/'dark' sets explicitly
  const appearance = theme === 'system' ? 'inherit' : theme;

  return (
    <Theme
      appearance={appearance}
      accentColor="blue"
      grayColor="gray"
      panelBackground="solid"
      scaling="100%"
    >
      {isDevelopment && (
        <div className="bg-yellow-400 text-black px-4 py-2 text-sm font-medium">
          <div className="flex justify-between items-center max-w-7xl mx-auto">
            <span>🚧 Development Mode</span>
            <div className="flex gap-4 items-center">
              <SimpleThemeSwitcher />
              <Link
                href="/test-error"
                className="text-white no-underline hover:underline px-2 py-1 min-h-[44px] flex items-center"
              >
                Test Errors (Spotlight)
              </Link>
              <Link
                href="/"
                className="text-white no-underline hover:underline px-2 py-1 min-h-[44px] flex items-center"
              >
                Home
              </Link>
            </div>
          </div>
        </div>
      )}
      {children}
    </Theme>
  );
}

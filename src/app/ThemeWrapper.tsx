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

import { Theme } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';

import {
  ThemeProvider,
  useTheme,
} from '../presentation/components/components/ThemeProvider';
import { SimpleThemeSwitcher } from '../presentation/components/components/ThemeSwitcher';

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const isDevelopment = process.env.NODE_ENV === 'development';

  return (
    <ThemeProvider>
      <ThemeContent isDevelopment={isDevelopment}>{children}</ThemeContent>
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
        <div className="bg-yellow-400 px-4 py-2 text-sm font-medium text-black">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <span>🚧 Development Mode</span>
            <div className="flex items-center gap-4">
              <SimpleThemeSwitcher />
              <Link
                href="/test-error"
                className="flex min-h-[44px] items-center px-2 py-1 text-white no-underline hover:underline"
              >
                Test Errors (Spotlight)
              </Link>
              <Link
                href="/"
                className="flex min-h-[44px] items-center px-2 py-1 text-white no-underline hover:underline"
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

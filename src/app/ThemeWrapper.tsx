'use client';

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
                className="text-white no-underline hover:underline"
              >
                Test Errors (Spotlight)
              </Link>
              <Link
                href="/"
                className="text-white no-underline hover:underline"
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

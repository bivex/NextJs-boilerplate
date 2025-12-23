/**
 * Copyright (c) 2025 Bivex
 *
 * Author: Bivex
 * Available for contact via email: support@b-b.top
 * For up-to-date contact information:
 * https://github.com/bivex
 *
 * Created: 2025-12-23T06:45:00
 * Last Updated: 2025-12-23T08:06:25
 *
 * Licensed under the MIT License.
 * Commercial licensing available upon request.
 */

'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

import { logError } from '@/utils/errors';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;

  setTheme: (_newTheme: Theme) => void;
  resolvedTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'theme',
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [isClient, setIsClient] = useState(false);
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  // Set isClient to true on mount
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);
  }, []);

  // Load theme from localStorage on client side
  useEffect(() => {
    if (!isClient) return;

    try {
      const stored = localStorage.getItem(storageKey);
      if (stored && ['light', 'dark', 'system'].includes(stored)) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTheme(stored as Theme);
      }
    } catch (error) {
      // Handle localStorage errors (e.g., disabled in incognito mode)
      logError(
        error instanceof Error
          ? error
          : new Error('Failed to read theme from localStorage'),
        'ThemeProvider.loadTheme'
      );
    }
  }, [isClient, storageKey]);

  useEffect(() => {
    const updateResolvedTheme = () => {
      let resolved: 'light' | 'dark';

      if (theme === 'system') {
        resolved = window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light';
      } else {
        resolved = theme;
      }

      setResolvedTheme(resolved);
    };

    updateResolvedTheme();

    // Listen for system theme changes when theme is 'system'
    let cleanup: (() => void) | undefined;

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => updateResolvedTheme();

      mediaQuery.addEventListener('change', handleChange);
      cleanup = () => mediaQuery.removeEventListener('change', handleChange);
    }

    return cleanup;
  }, [theme]);

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      setTheme(newTheme);
      if (isClient) {
        try {
          localStorage.setItem(storageKey, newTheme);
        } catch (error) {
          // Handle localStorage errors (e.g., disabled in incognito mode)
          logError(
            error instanceof Error
              ? error
              : new Error('Failed to save theme to localStorage'),
            'ThemeProvider.setTheme'
          );
        }
      }
    },
    resolvedTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

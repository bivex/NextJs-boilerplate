/**
 * Copyright (c) 2025 Bivex
 *
 * Author: Bivex
 * Available for contact via email: support@b-b.top
 * For up-to-date contact information:
 * https://github.com/bivex
 *
 * Created: 2025-12-23T08:57:42
 * Last Updated: 2025-12-23T08:59:29
 *
 * Licensed under the MIT License.
 * Commercial licensing available upon request.
 */

'use client';

import { useEffect } from 'react';

// Initialize Spotlight overlay in development
export function SpotlightInitializer() {
  useEffect(() => {
    // Only initialize Spotlight on the client side and in development
    if (
      typeof window !== 'undefined' &&
      process.env.NODE_ENV === 'development'
    ) {
      // Spotlight initialization moved to component body
    }
  }, []);

  return null;
}

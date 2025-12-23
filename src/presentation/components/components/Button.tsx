/**
 * Copyright (c) 2025 Bivex
 *
 * Author: Bivex
 * Available for contact via email: support@b-b.top
 * For up-to-date contact information:
 * https://github.com/bivex
 *
 * Created: 2025-12-23T05:36:55
 * Last Updated: 2025-12-23T07:49:46
 * Migrated to Radix Themes 3.0: 2025-12-23
 *
 * Licensed under the MIT License.
 * Commercial licensing available upon request.
 */

'use client';

import { Button as RadixButton } from '@radix-ui/themes';
import { Loader2 } from 'lucide-react';
import React, { forwardRef } from 'react';

export interface ButtonProps extends React.ComponentProps<typeof RadixButton> {
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  size?: '1' | '2' | '3' | '4';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    loading = false,
    leftIcon,
    rightIcon,
    children,
    disabled,
    ...props
  }, ref) => {
    const isDisabled = disabled || loading;

    return (
      <RadixButton
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {loading && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" data-testid="loading-spinner" />
        )}
        {!loading && leftIcon && (
          <span className="mr-2" aria-hidden="true">
            {leftIcon}
          </span>
        )}
        {children}
        {!loading && rightIcon && (
          <span className="ml-2" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </RadixButton>
    );
  }
);

Button.displayName = 'Button';

export { Button };

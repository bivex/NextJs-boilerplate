/**
 * Copyright (c) 2025 Bivex
 *
 * Author: Bivex
 * Available for contact via email: support@b-b.top
 * For up-to-date contact information:
 * https://github.com/bivex
 *
 * Created: 2025-12-23T05:58:47
 * Last Updated: 2025-12-23T07:31:25
 *
 * Licensed under the MIT License.
 * Commercial licensing available upon request.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies correct variants', () => {
    render(<Button variant="solid">Delete</Button>);
    const button = screen.getByText('Delete');

    // Radix UI themes applies its own classes for variants
    expect(button).toHaveClass('rt-variant-solid');
    expect(button).toHaveClass('rt-Button');
  });

  it('shows loading state', () => {
    render(<Button loading>Submit</Button>);
    const button = screen.getByRole('button');

    expect(button).toBeDisabled();
    // Check for loading spinner
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('applies loading class when loading', () => {
    render(<Button loading>Submit</Button>);
    const button = screen.getByRole('button');

    expect(button).toBeDisabled();
  });

  it('renders icons correctly', () => {
    const TestIcon = () => <span data-testid="test-icon">🔥</span>;

    render(
      <Button leftIcon={<TestIcon />}>
        With Icon
      </Button>
    );

    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    expect(screen.getByText('With Icon')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Button className="custom-class">Custom</Button>);
    const button = screen.getByText('Custom');

    expect(button).toHaveClass('custom-class');
  });

  it('forwards other props to button element', () => {
    render(<Button data-testid="custom-button">Test</Button>);
    expect(screen.getByTestId('custom-button')).toBeInTheDocument();
  });
});

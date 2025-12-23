# NextBoilerplate

[![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)](https://www.typescriptlang.org/)
[![Radix UI](https://img.shields.io/badge/Radix_UI-3.2.1-purple)](https://www.radix-ui.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.18-38B2AC)](https://tailwindcss.com/)
[![Radix UI](https://img.shields.io/badge/Radix_UI-Accessible-black)](https://www.radix-ui.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern, production-ready Next.js boilerplate featuring TypeScript, Emotion, Radix UI, and comprehensive development tooling. Built for scalability, accessibility, and developer experience.

## ✨ Features

- 🚀 **Next.js 16.1.1** with App Router and Turbopack
- ⚛️ **React 19.2.3** with concurrent features and improved performance
- 💎 **TypeScript 5.9.3** with strict configuration and path mapping
- 🎨 **Modern Styling**: Radix UI Themes + Tailwind CSS for maximum flexibility
- ♿ **Accessible UI**: Radix UI primitives with ARIA compliance and 30+ color scales
- 🧪 **Testing Suite**: Jest + Testing Library with comprehensive coverage
- 🔧 **Developer Experience**: ESLint, Prettier, Husky, and lint-staged
- 📱 **Mobile-First**: Responsive design with Radix Themes layout engine
- 🎯 **Performance**: Optimized builds, server components, and code splitting
- 📦 **Modern Tooling**: Bun runtime, hot reloading, and bundle analysis
- 🐛 **Error Debugging**: Sentry integration for production error tracking

## 🏗️ Project Structure

```
├── 📁 src/
│   ├── 📁 app/                    # Next.js App Router
│   │   ├── 📄 layout.tsx         # Root layout with Theme Provider
│   │   ├── 📄 page.tsx           # Homepage with demos
│   │   ├── 📄 globals.css        # Global styles
│   │   └── 📁 fonts/             # Custom fonts
│   ├── 📁 domain/                # Business logic (Clean Architecture)
│   │   ├── 📁 entities/          # Domain entities
│   │   ├── 📁 events/           # Domain events
│   │   ├── 📁 services/         # Domain services
│   │   └── 📁 value-objects/    # Value objects
│   ├── 📁 application/           # Application layer
│   │   ├── 📁 dtos/            # Data transfer objects
│   │   ├── 📁 ports/           # Interface definitions
│   │   └── 📁 use-cases/       # Application use cases
│   ├── 📁 infrastructure/        # External integrations
│   │   ├── 📁 adapters/        # Repository implementations
│   │   ├── 📁 config/          # Dependency injection
│   │   └── 📁 external/         # External service integrations
│   ├── 📁 presentation/          # UI layer
│   │   ├── 📁 components/      # Reusable UI components
│   │   ├── 📁 hooks/           # Custom React hooks
│   │   ├── 📁 pages/           # Page components
│   │   └── 📁 styles/          # Component styles
│   ├── 📁 lib/                   # Shared utilities
│   └── 📁 utils/                # Helper functions
├── 📁 .storybook/                # Storybook configuration
├── 📁 scripts/                   # Build and utility scripts
├── 📄 next.config.mjs           # Next.js configuration
├── 📄 tailwind.config.ts        # Tailwind CSS config
├── 📄 tsconfig.json             # TypeScript configuration
├── 📄 jest.config.js            # Jest testing config
├── 📄 eslint.config.js          # ESLint configuration
└── 📄 prettier.config.js        # Prettier formatting config
```

## 🚀 Quick Start

### Prerequisites

- **Node.js 18.17.0+** or **Bun 1.0.0+**
- **npm 9.0.0+** (comes with Node.js)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/bivex/next-boilerplate.git
   cd next-boilerplate
   ```

2. **Install dependencies**

   ```bash
   # Using Bun (recommended for speed)
   bun install

   # Or using npm
   npm install

   # Or using yarn
   yarn install
   ```

3. **Start development server**

   ```bash
   # Using Bun
   bun dev

   # Or using npm
   npm run dev
   ```

4. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to see the boilerplate in action!

## 📖 Usage Guide

### 🎨 Styling System

This boilerplate uses a **modern styling approach** combining Radix UI Themes with Tailwind CSS:

#### Radix UI Themes for Components

```tsx
<Flex align="center" justify="between" p="4" className="rounded-lg bg-white shadow-md">
  <Heading size="4">Title</Heading>
  <Button variant="solid">Action</Button>
</Flex>
```

#### Tailwind CSS for Custom Styling

```tsx
<div className="flex items-center justify-between rounded-lg bg-white p-4 shadow-md">
  <h2 className="text-xl font-semibold text-gray-900">Title</h2>
  <Button className="bg-blue-600 hover:bg-blue-700">Action</Button>
</div>
```

### 🧩 Component Library

#### Radix UI Themes Components

```tsx
import { Button, Dialog, TextField, Select, Checkbox, RadioGroup } from '@radix-ui/themes';

// Buttons with variants and sizes
<Button size="3" variant="solid" color="blue">Solid Button</Button>
<Button size="2" variant="soft" color="gray">Soft Button</Button>
<Button size="1" variant="outline">Outline Button</Button>

// Form components
<TextField.Root placeholder="Enter your name">
  <TextField.Slot>👤</TextField.Slot>
</TextField.Root>

<Select.Root>
  <Select.Trigger placeholder="Choose an option" />
  <Select.Content>
    <Select.Item value="1">Option 1</Select.Item>
    <Select.Item value="2">Option 2</Select.Item>
  </Select.Content>
</Select.Root>

// Layout components
<Flex gap="4" align="center">
  <Box>Item 1</Box>
  <Box>Item 2</Box>
</Flex>
```

#### Available Components

- **Form Controls**: Button, TextField, TextArea, Select, Checkbox, RadioGroup
- **Layout**: Box, Flex, Grid, Container, Section
- **Navigation**: Tabs, DropdownMenu, ContextMenu
- **Feedback**: Dialog, AlertDialog, Toast, Tooltip
- **Data Display**: Table, DataList, Badge, Avatar
- **Progress**: Progress, Skeleton, Spinner

#### Dialog Component

```tsx
import { Dialog, Button, Flex, Text } from '@radix-ui/themes';
import { useState } from 'react';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Dialog</Button>

      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Content>
          <Dialog.Title>Confirm Action</Dialog.Title>
          <Dialog.Description>Are you sure you want to proceed?</Dialog.Description>

          <Flex direction="column" gap="4" mt="4">
            <Text>This action cannot be undone.</Text>
            <Flex gap="3" justify="end">
              <Dialog.Close>
                <Button variant="soft" color="gray">
                  Cancel
                </Button>
              </Dialog.Close>
              <Dialog.Close>
                <Button variant="solid">Confirm</Button>
              </Dialog.Close>
            </Flex>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
}
```

### 🎭 Theme System

The theme system uses **Radix UI Themes 3.0** with comprehensive design tokens:

#### Theme Provider Setup

```tsx
// app/layout.tsx
import { Theme } from '@radix-ui/themes';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Theme appearance="light" accentColor="blue" radius="medium">
          {children}
        </Theme>
      </body>
    </html>
  );
}
```

#### Available Theme Features

- **30+ Accessible Color Scales** - From gray to vibrant colors
- **Responsive Object Syntax** - Mobile-first responsive design
- **CSS Custom Properties** - Runtime theme switching
- **Dark Mode Support** - Built-in light/dark theme switching
- **Component Variants** - Buttons, inputs, and layouts
- **Layout Engine** - Flex, Grid, and responsive utilities

#### Using Theme Colors

```tsx
// Automatic theme colors
<Button color="blue" variant="solid">Primary Action</Button>
<Button color="gray" variant="soft">Secondary Action</Button>

// Custom styling with theme integration
<Box p="4" style={{ backgroundColor: 'var(--color-background)' }}>
  <Text color="gray">Themed content</Text>
</Box>
```

## 🧪 Testing

This boilerplate includes a comprehensive testing setup:

### Unit Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run tests in CI mode
npm run test:ci
```

### Component Testing with Testing Library

```tsx
// Component testing with Radix UI Themes
import { render, screen } from '@testing-library/react';
import { Theme } from '@radix-ui/themes';
import { Button } from '@radix-ui/themes';

const renderWithTheme = component => render(<Theme>{component}</Theme>);

describe('Button', () => {
  it('renders with theme correctly', () => {
    renderWithTheme(<Button>Test Button</Button>);
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });
});
```

### Example Test

```tsx
// src/components/Button.test.tsx
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
    render(<Button variant="primary">Primary</Button>);
    const button = screen.getByText('Primary');

    expect(button).toHaveClass('bg-blue-600');
  });
});
```

## 📜 Available Scripts

| Command                 | Description                             |
| ----------------------- | --------------------------------------- |
| `npm run dev`           | Start development server with Turbopack |
| `npm run build`         | Build for production                    |
| `npm run build:analyze` | Build with bundle analyzer              |
| `npm run start`         | Start production server                 |
| `npm run lint`          | Run ESLint                              |
| `npm run lint:fix`      | Fix ESLint issues automatically         |
| `npm run lint:strict`   | Run ESLint with zero warnings           |
| `npm run type-check`    | Run TypeScript type checking            |
| `npm run test`          | Run Jest tests                          |
| `npm run test:coverage` | Run tests with coverage report          |
| `npm run format`        | Format code with Prettier               |
| `npm run clean`         | Clean build artifacts and caches        |

### Bun Commands

For even faster development, use Bun commands:

```bash
bun dev        # Development server
bun build      # Production build
bun test       # Run tests
bun run lint   # Run linting
```

## 🔧 Configuration

### Next.js Configuration

The `next.config.mjs` includes optimizations for:

- **Image optimization** with next/image
- **Bundle analysis** with webpack-bundle-analyzer
- **Compression** and caching headers
- **Security headers** and CSP
- **PWA support** ready

### TypeScript Configuration

Strict TypeScript setup with:

- **Path mapping** (`@/components`, `@/lib`, etc.)
- **Strict mode** enabled
- **ESNext modules** support
- **React 18** types

### ESLint Configuration

Comprehensive linting with:

- **Next.js rules**
- **TypeScript rules**
- **React hooks rules**
- **Accessibility rules**
- **Import sorting**
- **Prettier integration**

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository** to Vercel
2. **Configure build settings**:
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`
3. **Add environment variables** if needed
4. **Deploy automatically** on every push

### Other Platforms

#### Netlify

```bash
# Build command
npm run build

# Publish directory
.next
```

#### Railway / Render

```bash
# Build command
npm run build

# Start command
npm start
```

#### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🔗 End-to-End Type-Safe APIs (tRPC)

This boilerplate features **tRPC** for end-to-end type-safe API communication between client and server, ensuring complete type safety across your entire application stack.

### tRPC Overview

- **Type Safety**: Full TypeScript types shared between client and server
- **Zero-Code Generation**: No need to generate types or schemas
- **Framework Agnostic**: Works with any framework, integrated with React Query
- **Lightweight**: Minimal overhead, fast performance
- **Developer Experience**: Auto-completion, type checking, and instant feedback

### API Structure

The API is organized into routers by domain:

#### Visitor Router (`trpc.visitor.*`)
```typescript
// Display landing page with product and visitor data
const { data } = trpc.visitor.displayLandingPage.useQuery({
  sessionId: "session_123",
  pageUrl: window.location.href
});

// Track user engagement events
await trpc.visitor.trackEngagement.mutate({
  sessionId: "session_123",
  type: "button_click",
  elementId: "cta-button",
  pageUrl: window.location.href
});

// Convert visitor to customer
const result = await trpc.visitor.convert.mutate({
  sessionId: "session_123",
  name: "John Doe",
  email: "john@example.com",
  source: "contact_form"
});
```

#### Product Router (`trpc.product.*`)
```typescript
// Get product information
const { data: product } = trpc.product.getProduct.useQuery();

// Get all product features
const { data: features } = trpc.product.getAllFeatures.useQuery();
```

### Usage in Components

```typescript
'use client';

import { trpc } from '@/lib/trpc/client';

function LandingPage() {
  // Type-safe queries
  const { data, isLoading } = trpc.visitor.displayLandingPage.useQuery({
    sessionId: getSessionId(),
    pageUrl: window.location.href
  });

  // Type-safe mutations
  const convertMutation = trpc.visitor.convert.useMutation({
    onSuccess: () => {
      // Type-safe success handling
      console.log('Conversion successful!');
    }
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>{data?.product.name}</h1>
      <p>Visitor status: {data?.visitor.status}</p>
    </div>
  );
}
```

### Architecture Integration

tRPC integrates seamlessly with the existing Clean Architecture:

- **Presentation Layer**: React components use tRPC client
- **Application Layer**: Use cases are called by tRPC procedures
- **Domain Layer**: Business logic remains unchanged
- **Infrastructure Layer**: Repositories and services work through DI container

### Development Benefits

- **IntelliSense**: Full autocomplete for API calls
- **Type Checking**: Catch API mismatches at compile time
- **Refactoring Safe**: Rename fields safely across client/server
- **Documentation**: Types serve as living API documentation
- **Validation**: Input validation with Zod schemas

## 🐛 Error Monitoring & Debugging

This boilerplate includes **Sentry integration** with **Spotlight** for comprehensive error tracking and local debugging.

### Sentry + Spotlight Setup

1. **Get your Sentry DSN**
   - Create a project at [sentry.io](https://sentry.io)
   - Copy your DSN from Project Settings > Client Keys

2. **Configure Environment Variables**

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local`:

   ```env
   SENTRY_DSN=https://your-dsn@sentry.io/project-id
   NEXT_PUBLIC_SENTRY_DSN=https://your-dsn@sentry.io/project-id
   ```

3. **Run with Spotlight (Development)**

   ```bash
   npm run dev:spotlight
   ```

   This starts both your Next.js app and Spotlight's debugging overlay.

4. **Features**
   - **Production Error Tracking**: Automatic error reporting to Sentry
   - **Local Debugging**: Spotlight overlay shows errors in real-time during development
   - **Performance Monitoring**: Request tracing and performance metrics
   - **Session Replays**: User interaction recordings for debugging

### Development vs Production

- **Development**: Spotlight overlay appears for real-time debugging
- **Production**: Errors are sent to Sentry dashboard only

For detailed setup instructions, see the [Sentry Next.js docs](https://docs.sentry.io/platforms/javascript/guides/nextjs/) and [Spotlight docs](https://spotlightjs.com/).

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** and ensure tests pass
4. **Run the full test suite**: `npm run test:ci`
5. **Commit with conventional commits**: `git commit -m "feat: add amazing feature"`
6. **Push to your branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**

### Code Standards

- **ESLint**: All code must pass linting
- **TypeScript**: Strict type checking enabled
- **Prettier**: Consistent code formatting
- **Testing**: Minimum 80% coverage required
- **Accessibility**: WCAG 2.1 AA compliance

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Radix UI](https://www.radix-ui.com/) - Accessible component primitives and themes
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Jest](https://jestjs.io/) - Testing framework
- [Sentry](https://sentry.io/) - Error tracking and monitoring

## 📞 Support

- 📧 **Email**: support@b-b.top
- 🐛 **Issues**: [GitHub Issues](https://github.com/bivex/next-boilerplate/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/bivex/next-boilerplate/discussions)

---

**Built with ❤️ using modern web technologies**

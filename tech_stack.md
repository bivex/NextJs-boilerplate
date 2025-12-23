# Technology Stack

This document outlines the comprehensive technology stack used in this Next.js boilerplate project, featuring clean architecture, modern React patterns, and production-ready tooling.

## 🏗️ Architecture

### Clean Architecture Pattern

The project follows **Clean Architecture** principles with clear separation of concerns:

- **Domain Layer** (`src/domain/`): Business logic, entities, value objects, and domain services
- **Application Layer** (`src/application/`): Use cases, DTOs, and application ports
- **Infrastructure Layer** (`src/infrastructure/`): External adapters, repositories, and configurations
- **Presentation Layer** (`src/presentation/`): UI components, hooks, and pages

## 🎯 Core Technologies

### Frontend Framework

- **Next.js 16.1.1** - React framework with App Router, server components, and optimized performance
- **React 19.2.3** - Latest React with concurrent features and improved performance
- **TypeScript 5.9.3** - Type-safe JavaScript with advanced type features

### UI & Components

- **Radix UI Themes 3.2.1** - Modern component library with:
  - 30+ accessible color scales with custom palette generator
  - Powerful layout engine with responsive object syntax
  - Built-in components: Button, Dialog, Select, Checkbox, etc.
  - CSS custom properties for runtime theme switching
- **Tailwind CSS 4.1.18** - Utility-first CSS framework with latest features

### Styling & UI

- **Radix UI Themes 3.0** - Modern component library with:
  - 30+ accessible color scales
  - Custom color palette generator
  - Powerful layout engine with responsive object syntax
  - Built-in components: Button, Dialog, Select, Checkbox, etc.
- **Tailwind CSS 4.1.18** - Utility-first CSS framework

### Component Library Features

- **New Radix Themes 3.0 Components**:
  - Spinner & Skeleton (loading states)
  - SegmentedControl (toggle buttons)
  - DataList (key-value displays)
  - RadioCards & CheckboxCards (enhanced forms)
  - Progress indicators
  - TabNav (navigation)
  - Reset (browser style normalization)

## 🧪 Testing & Quality

### Testing Framework

- **Jest 30.2.0** - JavaScript testing framework
- **Testing Library** - React component testing utilities
- **Jest DOM** - Custom Jest matchers for DOM testing

### Code Quality

- **ESLint 9.39.2** - JavaScript/TypeScript linting
- **Prettier 3.7.4** - Code formatting
- **TypeScript Compiler** - Type checking
- **Husky** - Git hooks for pre-commit quality checks
- **lint-staged** - Run linters on staged files

## 🛠️ Development Tools

### Build & Development

- **Turbopack** - Fast bundler for development
- **Next.js Dev Server** - Hot reload development server
- **Bundle Analyzer** - Webpack bundle analysis

### Package Management

- **npm** - Primary package manager
- **Bun 1.0.0** - Alternative fast package manager
- **Node.js 18.17.0+** - JavaScript runtime

### Version Management

- **Custom Versioning Script** - Automated semantic versioning
- **Release Scripts** - Automated build, test, and publish

## 📦 Key Dependencies

### UI & Components

```json
{
  "@radix-ui/themes": "^3.0.0",
  "@radix-ui/react-*": "Various primitives",
  "lucide-react": "^0.562.0",
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "tailwind-merge": "^3.4.0"
}
```

### Development & Build

```json
{
  "@types/node": "^25.0.3",
  "@types/react": "^19.2.7",
  "@types/react-dom": "^19.2.3",
  "@typescript-eslint/*": "^8.50.1",
  "postcss": "^8.5.6",
  "tailwindcss": "^4.1.18",
  "webpack-bundle-analyzer": "^5.1.0"
}
```

## 🎨 Styling Approach

### Design System

- **Radix Colors** - Accessible color system
- **CSS Custom Properties** - Theme variables
- **Responsive Design** - Mobile-first approach
- **Dark Mode Support** - Built-in theme switching

### Layout Engine

```tsx
// Responsive object syntax
<Flex width={{ initial: '100%', sm: '300px', md: '500px' }}>
  <Box p="4">Content</Box>
</Flex>
```

## 🚀 Performance & Optimization

### Next.js Optimizations

- **App Router** - Modern routing with layouts
- **Server Components** - Optimized server-side rendering
- **Image Optimization** - Automatic image optimization
- **Code Splitting** - Automatic route-based splitting

### Build Optimizations

- **Tree Shaking** - Remove unused code
- **Bundle Analysis** - Identify bundle bloat
- **CSS Optimization** - Minimize and optimize styles
- **Font Optimization** - Self-hosted Google Fonts

## 🔧 Configuration Files

### Core Configs

- `next.config.mjs` - Next.js configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `jest.config.js` - Testing configuration
- `eslint.config.js` - ESLint configuration
- `prettier.config.js` - Prettier configuration

### Development Scripts

```json
{
  "dev": "next dev --turbo",
  "build": "next build",
  "build:analyze": "ANALYZE=true next build",
  "test": "jest",
  "lint": "next lint",
  "type-check": "tsc --noEmit"
}
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with Theme Provider
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles
├── domain/               # Business logic
│   ├── entities/         # Domain entities
│   ├── events/          # Domain events
│   └── services/        # Domain services
├── application/          # Application layer
│   ├── dtos/           # Data transfer objects
│   ├── ports/          # Interface definitions
│   └── use-cases/      # Application use cases
├── infrastructure/       # External integrations
│   ├── adapters/       # Repository implementations
│   ├── config/         # Dependency injection
│   └── external/       # External service integrations
├── presentation/         # UI layer
│   ├── components/     # Reusable UI components
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Page components
│   └── styles/         # Component styles
├── lib/                 # Shared utilities
├── utils/              # Helper functions
└── __mocks__/          # Test mocks
```

## 🌟 Key Features

### Modern React Patterns

- **Server Components** - Optimized performance
- **Suspense** - Loading states
- **Error Boundaries** - Error handling
- **Custom Hooks** - Reusable logic

### Developer Experience

- **Hot Reload** - Instant feedback
- **Type Safety** - Full TypeScript coverage
- **Code Generation** - Automated boilerplate
- **IntelliSense** - Enhanced IDE support

### Production Ready

- **SEO Optimized** - Meta tags and structured data
- **Performance Monitoring** - Bundle analysis
- **Error Tracking** - Comprehensive error handling
- **Accessibility** - WCAG compliant components

## 🔄 Migration Notes

### Recent Updates

- **Radix Themes 3.0 Migration** - Complete upgrade from Radix UI primitives
- **React 19** - Latest React features
- **TypeScript 5.9** - Advanced type features
- **Tailwind CSS 4** - Latest utility framework

### Breaking Changes

- Component APIs updated for Radix Themes 3.0
- Layout engine changed to use Radix Themes components
- Styling approach shifted from Tailwind utilities to Radix Themes

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Radix Themes Documentation](https://www.radix-ui.com/themes/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

---

_This tech stack provides a solid foundation for building scalable, maintainable, and performant React applications with modern tooling and best practices._

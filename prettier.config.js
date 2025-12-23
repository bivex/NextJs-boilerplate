/**
 * Copyright (c) 2025 Bivex
 *
 * Author: Bivex
 * Available for contact via email: support@b-b.top
 * For up-to-date contact information:
 * https://github.com/bivex
 *
 * Created: 2025-12-23T05:36:45
 * Last Updated: 2025-12-23T07:31:24
 *
 * Licensed under the MIT License.
 * Commercial licensing available upon request.
 */

/** @type {import('prettier').Config} */
export default {
  // Basic formatting
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  quoteProps: 'as-needed',
  trailingComma: 'es5',
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'avoid',

  // Language-specific overrides
  overrides: [
    // JSON files
    {
      files: '*.json',
      options: {
        printWidth: 200,
      },
    },

    // Markdown files
    {
      files: '*.md',
      options: {
        printWidth: 100,
        proseWrap: 'preserve',
      },
    },

    // YAML files
    {
      files: ['*.yml', '*.yaml'],
      options: {
        tabWidth: 2,
        singleQuote: false,
      },
    },

    // Package.json
    {
      files: 'package.json',
      options: {
        printWidth: 1000,
      },
    },
  ],

  // Plugin configurations
  plugins: ['prettier-plugin-tailwindcss'],

  // Tailwind CSS plugin options
  tailwindConfig: './tailwind.config.ts',
  tailwindFunctions: ['clsx', 'cn'],
};

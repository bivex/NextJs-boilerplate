/**
 * Copyright (c) 2025 Bivex
 *
 * Author: Bivex
 * Available for contact via email: support@b-b.top
 * For up-to-date contact information:
 * https://github.com/bivex
 *
 * Created: 2025-12-23T06:13:08
 * Last Updated: 2025-12-23T07:31:24
 *
 * Licensed under the MIT License.
 * Commercial licensing available upon request.
 */

/**
 * Infrastructure Adapter: InMemoryProductRepository
 *
 * In-memory implementation of ProductRepositoryPort for development and testing.
 * In production, this would be replaced with a database or CMS implementation.
 */

import { ProductRepositoryPort } from '../../application/ports/ProductRepositoryPort';
import { Product } from '../../domain/entities/Product';
import { Feature, FeatureCategory } from '../../domain/value-objects/Feature';

export class InMemoryProductRepository implements ProductRepositoryPort {
  private product: Product;

  constructor() {
    // Initialize with NextBoilerplate product data
    this.product = this.createInitialProduct();
  }

  async getProduct(): Promise<Product> {
    return this.product;
  }

  async getById(id: string): Promise<Product | null> {
    return this.product.id === id ? this.product : null;
  }

  async getAllFeatures(): Promise<Feature[]> {
    return [...this.product.features];
  }

  async getFeaturesByCategory(category: FeatureCategory): Promise<Feature[]> {
    return this.product.getFeaturesByCategory(category);
  }

  async getFeaturedFeatures(): Promise<Feature[]> {
    // Return high-priority features (priority >= 8)
    return this.product.features.filter(feature => feature.isHighPriority());
  }

  async updateProduct(product: Product): Promise<void> {
    this.product = product;
  }

  private createInitialProduct(): Product {
    const productId = 'next-boilerplate-product';
    const product = new Product(
      productId,
      'NextBoilerplate',
      'A modern Next.js starter template with TypeScript, Emotion, Radix UI, and production-ready tooling',
      '1.0.0'
    );

    // Add features
    const features = [
      // Modern Stack Features
      new Feature(
        'nextjs-16',
        'Next.js 16',
        'Latest version of Next.js with App Router for modern React development',
        FeatureCategory.MODERN_STACK,
        '⚛️',
        10
      ),
      new Feature(
        'react-19',
        'React 19',
        'Latest React with concurrent features, server components, and improved performance',
        FeatureCategory.MODERN_STACK,
        '⚛️',
        9
      ),
      new Feature(
        'typescript',
        'TypeScript 5.9',
        'Full TypeScript support with strict type checking and excellent developer experience',
        FeatureCategory.TYPE_SAFETY,
        '🔷',
        9
      ),
      new Feature(
        'emotion',
        'Emotion CSS-in-JS',
        'Modern styling with Emotion for component-scoped CSS with theme support',
        FeatureCategory.MODERN_STACK,
        '🎨',
        8
      ),
      new Feature(
        'radix-ui',
        'Radix UI Primitives',
        'Accessible, customizable component primitives built on Radix UI',
        FeatureCategory.ACCESSIBLE_UI,
        '🎛️',
        9
      ),
      new Feature(
        'tailwind',
        'Tailwind CSS v4',
        'Latest Tailwind CSS v4 with enhanced performance and modern CSS features',
        FeatureCategory.MODERN_STACK,
        '🎨',
        7
      ),

      // Production-Ready Features
      new Feature(
        'production-ready',
        'Production Ready',
        'Everything you need to build modern web applications with best practices',
        FeatureCategory.PRODUCTION_READY,
        '🚀',
        10
      ),
      new Feature(
        'seo-optimized',
        'SEO Optimized',
        'Built-in SEO optimizations and meta tag management',
        FeatureCategory.PRODUCTION_READY,
        '🔍',
        8
      ),
      new Feature(
        'performance',
        'High Performance',
        'Optimized for performance with modern web technologies',
        FeatureCategory.PRODUCTION_READY,
        '⚡',
        9
      ),

      // Developer Experience Features
      new Feature(
        'storybook',
        'Storybook Integration',
        'Component development and testing with Storybook',
        FeatureCategory.DEVELOPER_EXPERIENCE,
        '📚',
        7
      ),
      new Feature(
        'jest-testing',
        'Jest Testing',
        'Unit and integration testing setup with Jest and React Testing Library',
        FeatureCategory.DEVELOPER_EXPERIENCE,
        '🧪',
        8
      ),
      new Feature(
        'eslint-prettier',
        'Code Quality',
        'ESLint and Prettier configuration for consistent code quality',
        FeatureCategory.DEVELOPER_EXPERIENCE,
        '✨',
        7
      )
    ];

    // Add all features to the product
    features.forEach(feature => product.addFeature(feature));

    return product;
  }
}

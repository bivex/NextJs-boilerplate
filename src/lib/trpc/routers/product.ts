/**
 * Copyright (c) 2025 Bivex
 *
 * Author: Bivex
 * Available for contact via email: support@b-b.top
 * For up-to-date contact information:
 * https://github.com/bivex
 *
 * Created: 2025-12-23T07:35:00
 * Last Updated: 2025-12-23T07:36:13
 *
 * Licensed under the MIT License.
 * Commercial licensing available upon request.
 */

import { router, publicProcedure } from '@/lib/trpc/init';
import { DependencyInjection } from '@/infrastructure/config/DependencyInjection';

export const productRouter = router({
  // Get product information
  getProduct: publicProcedure
    .query(async () => {
      const productRepository = DependencyInjection.getProductRepository();

      const product = await productRepository.getProduct();
      const featuredFeatures = await productRepository.getFeaturedFeatures();

      return {
        id: product.id,
        name: product.name,
        description: product.description,
        version: product.version,
        featureCount: product.features.length,
        featuredFeatures: featuredFeatures.map((feature: any) => ({
          id: feature.id,
          name: feature.name,
          description: feature.description,
          category: feature.category,
          icon: feature.icon,
          priority: feature.priority,
        })),
      };
    }),

  // Get all features
  getAllFeatures: publicProcedure
    .query(async () => {
      const productRepository = DependencyInjection.getProductRepository();

      const product = await productRepository.getProduct();
      return product.features.map((feature: any) => ({
        id: feature.id,
        name: feature.name,
        description: feature.description,
        category: feature.category,
        icon: feature.icon,
        priority: feature.priority,
      }));
    }),
});

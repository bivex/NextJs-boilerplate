/**
 * Copyright (c) 2025 Bivex
 *
 * Author: Bivex
 * Available for contact via email: support@b-b.top
 * For up-to-date contact information:
 * https://github.com/bivex
 *
 * Created: 2025-12-23T06:13:25
 * Last Updated: 2025-12-23T06:13:25
 *
 * Licensed under the MIT License.
 * Commercial licensing available upon request.
 */

/**
 * Application Port: ProductRepositoryPort
 *
 * Defines the interface for product data access.
 * This port allows the application to retrieve product information
 * without depending on specific data sources.
 */

import { Product } from '../../domain/entities/Product';
import { Feature, FeatureCategory } from '../../domain/value-objects/Feature';

export interface ProductRepositoryPort {
  /**
   * Gets the main product being showcased
   * @returns The product entity
   */
  getProduct(): Promise<Product>;

  /**
   * Gets a product by its ID
   * @param id The product ID
   * @returns The product if found, null otherwise
   */
  getById(id: string): Promise<Product | null>;

  /**
   * Gets all features of the product
   * @returns Array of all features
   */
  getAllFeatures(): Promise<Feature[]>;

  /**
   * Gets features filtered by category
   * @param category The feature category
   * @returns Array of features in the category
   */
  getFeaturesByCategory(category: FeatureCategory): Promise<Feature[]>;

  /**
   * Gets featured/highlighted features for display
   * @returns Array of featured features
   */
  getFeaturedFeatures(): Promise<Feature[]>;

  /**
   * Updates product information
   * @param product The updated product
   */
  updateProduct(product: Product): Promise<void>;
}

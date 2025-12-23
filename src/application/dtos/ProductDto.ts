/**
 * Copyright (c) 2025 Bivex
 *
 * Author: Bivex
 * Available for contact via email: support@b-b.top
 * For up-to-date contact information:
 * https://github.com/bivex
 *
 * Created: 2025-12-23T06:13:27
 * Last Updated: 2025-12-23T07:55:33
 *
 * Licensed under the MIT License.
 * Commercial licensing available upon request.
 */

/**
 * Application DTO: ProductDto
 *
 * Data Transfer Object for product information.
 * Used to transfer product data between application and presentation layers.
 */

import { FeatureCategory } from '../../domain/value-objects/Feature';

export interface ProductDto {
  id: string;
  name: string;
  description: string;
  version: string;
  features: FeatureDto[];
  createdAt: Date;
}

export interface FeatureDto {
  id: string;
  name: string;
  description: string;
  category: FeatureCategory;
  icon: string | undefined;
  priority: number;
}

export interface ProductSummaryDto {
  id: string;
  name: string;
  description: string;
  version: string;
  featureCount: number;
  featuredFeatures: FeatureDto[];
}

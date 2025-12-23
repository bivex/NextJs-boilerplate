/**
 * Copyright (c) 2025 Bivex
 *
 * Author: Bivex
 * Available for contact via email: support@b-b.top
 * For up-to-date contact information:
 * https://github.com/bivex
 *
 * Created: 2025-12-23T05:51:03
 * Last Updated: 2025-12-23T07:31:24
 *
 * Licensed under the MIT License.
 * Commercial licensing available upon request.
 */

/**
 * Use Case: DisplayLandingPageUseCase
 *
 * Handles the display of the landing page with product information and visitor tracking.
 * This is the main use case for the landing page functionality.
 */

import { ProductRepositoryPort } from '../ports/ProductRepositoryPort';
import { VisitorRepositoryPort } from '../ports/VisitorRepositoryPort';
import { AnalyticsPort } from '../ports/AnalyticsPort';
import { ProductDto, ProductSummaryDto } from '../dtos/ProductDto';
import { VisitorDto } from '../dtos/VisitorDto';

export class DisplayLandingPageUseCase {
  constructor(
    private readonly productRepository: ProductRepositoryPort,
    private readonly visitorRepository: VisitorRepositoryPort,
    private readonly analytics: AnalyticsPort
  ) {}

  /**
   * Executes the use case to display the landing page
   * @param sessionId The visitor's session ID
   * @param pageUrl The current page URL
   * @returns Landing page data for display
   */
  async execute(sessionId: string, pageUrl: string): Promise<{
    product: ProductSummaryDto;
    visitor: VisitorDto;
  }> {
    // Get or create visitor
    let visitor = await this.visitorRepository.findBySessionId(sessionId);
    if (!visitor) {
      visitor = await this.visitorRepository.create(sessionId);
    }

    // Track page view
    await this.analytics.trackPageView(pageUrl, visitor.id);

    // Get product information
    const product = await this.productRepository.getProduct();

    // Convert to DTOs
    const featuredFeatures = await this.productRepository.getFeaturedFeatures();
    const featuredFeaturesDto = featuredFeatures.map(feature => ({
      id: feature.id,
      name: feature.name,
      description: feature.description,
      category: feature.category,
      icon: feature.icon,
      priority: feature.priority
    }));

    const productDto: ProductSummaryDto = {
      id: product.id,
      name: product.name,
      description: product.description,
      version: product.version,
      featureCount: product.features.length,
      featuredFeatures: featuredFeaturesDto
    };

    const visitorDto: VisitorDto = {
      id: visitor.id,
      sessionId: visitor.sessionId,
      status: visitor.status,
      firstVisitAt: visitor.firstVisitAt,
      lastActivityAt: visitor.lastActivityAt,
      convertedAt: visitor.convertedAt,
      engagementScore: visitor.getEngagementScore(),
      engagementEventsCount: visitor.engagementEvents.length
    };

    return {
      product: productDto,
      visitor: visitorDto
    };
  }
}

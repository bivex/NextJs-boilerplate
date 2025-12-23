/**
 * Copyright (c) 2025 Bivex
 *
 * Author: Bivex
 * Available for contact via email: support@b-b.top
 * For up-to-date contact information:
 * https://github.com/bivex
 *
 * Created: 2025-12-23T06:13:07
 * Last Updated: 2025-12-23T06:13:07
 *
 * Licensed under the MIT License.
 * Commercial licensing available upon request.
 */

/**
 * Infrastructure Configuration: DependencyInjection
 *
 * Configures dependency injection for the application.
 * This is where all the ports are wired to their adapter implementations.
 */

import { DisplayLandingPageUseCase } from '../../application/use-cases/DisplayLandingPageUseCase';
import { ConvertVisitorUseCase } from '../../application/use-cases/ConvertVisitorUseCase';
import { TrackEngagementUseCase } from '../../application/use-cases/TrackEngagementUseCase';

// Ports
import { VisitorRepositoryPort } from '../../application/ports/VisitorRepositoryPort';
import { ProductRepositoryPort } from '../../application/ports/ProductRepositoryPort';
import { AnalyticsPort } from '../../application/ports/AnalyticsPort';
import { EmailServicePort } from '../../application/ports/EmailServicePort';
import { DomainEventPublisherPort } from '../../application/ports/DomainEventPublisherPort';

// Adapters
import { InMemoryVisitorRepository } from '../adapters/InMemoryVisitorRepository';
import { InMemoryProductRepository } from '../adapters/InMemoryProductRepository';
import { ConsoleAnalyticsAdapter } from '../adapters/ConsoleAnalyticsAdapter';
import { ConsoleEmailServiceAdapter } from '../adapters/ConsoleEmailServiceAdapter';
import { InMemoryDomainEventPublisher } from '../adapters/InMemoryDomainEventPublisher';

/**
 * Dependency Injection Container
 * Manages the creation and wiring of all dependencies
 * Uses lazy initialization singleton pattern
 */
export class DependencyInjection {
  private static initialized = false;

  // Repositories
  private static visitorRepository: VisitorRepositoryPort;
  private static productRepository: ProductRepositoryPort;

  // External Services
  private static analyticsAdapter: AnalyticsPort;
  private static emailServiceAdapter: EmailServicePort;
  private static eventPublisher: DomainEventPublisherPort;

  // Use Cases
  private static displayLandingPageUseCase: DisplayLandingPageUseCase;
  private static convertVisitorUseCase: ConvertVisitorUseCase;
  private static trackEngagementUseCase: TrackEngagementUseCase;

  /**
   * Ensure all dependencies are initialized
   * Uses lazy initialization - only initializes once
   */
  private static ensureInitialized(): void {
    if (this.initialized) return;

    // Initialize adapters
    this.visitorRepository = new InMemoryVisitorRepository();
    this.productRepository = new InMemoryProductRepository();
    this.analyticsAdapter = new ConsoleAnalyticsAdapter();
    this.emailServiceAdapter = new ConsoleEmailServiceAdapter();
    this.eventPublisher = new InMemoryDomainEventPublisher();

    // Setup domain event handlers
    this.setupDomainEventHandlers();

    // Initialize use cases
    this.displayLandingPageUseCase = new DisplayLandingPageUseCase(
      this.productRepository,
      this.visitorRepository,
      this.analyticsAdapter
    );

    this.convertVisitorUseCase = new ConvertVisitorUseCase(
      this.visitorRepository,
      this.emailServiceAdapter,
      this.analyticsAdapter,
      this.eventPublisher,
      this.productRepository
    );

    this.trackEngagementUseCase = new TrackEngagementUseCase(
      this.visitorRepository,
      this.analyticsAdapter,
      this.eventPublisher
    );

    this.initialized = true;
  }

  /**
   * Initialize all dependencies (legacy method for backward compatibility)
   * @deprecated Use ensureInitialized() internally or just call getters directly
   */
  static initialize(): void {
    this.ensureInitialized();
  }

  /**
   * Setup domain event handlers
   */
  private static setupDomainEventHandlers(): void {
    const publisher = this.eventPublisher as InMemoryDomainEventPublisher;

    // Handle visitor converted events
    publisher.subscribe('visitor.converted', async (event) => {
      console.log('🎉 Visitor converted! Sending notifications...');
      // In production, this might trigger CRM updates, slack notifications, etc.
    });

    // Handle engagement milestones
    publisher.subscribe('visitor.engagement_milestone', async (event) => {
      console.log('🏆 Engagement milestone reached!');
      // Could trigger personalized follow-ups, special offers, etc.
    });
  }

  // Getters for use cases (entry points for the application)
  static getDisplayLandingPageUseCase(): DisplayLandingPageUseCase {
    this.ensureInitialized();
    return this.displayLandingPageUseCase;
  }

  static getConvertVisitorUseCase(): ConvertVisitorUseCase {
    this.ensureInitialized();
    return this.convertVisitorUseCase;
  }

  static getTrackEngagementUseCase(): TrackEngagementUseCase {
    this.ensureInitialized();
    return this.trackEngagementUseCase;
  }

  // Getters for infrastructure (useful for testing or direct access)
  static getVisitorRepository(): VisitorRepositoryPort {
    this.ensureInitialized();
    return this.visitorRepository;
  }

  static getProductRepository(): ProductRepositoryPort {
    this.ensureInitialized();
    return this.productRepository;
  }

  static getAnalyticsAdapter(): AnalyticsPort {
    this.ensureInitialized();
    return this.analyticsAdapter;
  }

  static getEmailServiceAdapter(): EmailServicePort {
    this.ensureInitialized();
    return this.emailServiceAdapter;
  }

  static getEventPublisher(): DomainEventPublisherPort {
    this.ensureInitialized();
    return this.eventPublisher;
  }
}

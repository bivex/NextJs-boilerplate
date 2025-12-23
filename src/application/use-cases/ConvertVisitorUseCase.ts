/**
 * Copyright (c) 2025 Bivex
 *
 * Author: Bivex
 * Available for contact via email: support@b-b.top
 * For up-to-date contact information:
 * https://github.com/bivex
 *
 * Created: 2025-12-23T05:51:11
 * Last Updated: 2025-12-23T07:31:24
 *
 * Licensed under the MIT License.
 * Commercial licensing available upon request.
 */

/**
 * Use Case: ConvertVisitorUseCase
 *
 * Handles the conversion of visitors into customers.
 * This use case orchestrates the conversion process including validation,
 * domain logic, persistence, and side effects.
 */

import { VisitorRepositoryPort } from '../ports/VisitorRepositoryPort';
import { EmailServicePort } from '../ports/EmailServicePort';
import { AnalyticsPort } from '../ports/AnalyticsPort';
import { DomainEventPublisherPort } from '../ports/DomainEventPublisherPort';
import { ProductRepositoryPort } from '../ports/ProductRepositoryPort';
import { ContactFormDto, ConversionResultDto } from '../dtos/VisitorDto';
import { ContactInfo } from '../../domain/value-objects/ContactInfo';
import { ConversionService } from '../../domain/services/ConversionService';
import { VisitorConvertedEvent } from '../../domain/events/DomainEvents';

export class ConvertVisitorUseCase {
  constructor(
    private readonly visitorRepository: VisitorRepositoryPort,
    private readonly emailService: EmailServicePort,
    private readonly analytics: AnalyticsPort,
    private readonly eventPublisher: DomainEventPublisherPort,
    private readonly productRepository: ProductRepositoryPort
  ) {}

  /**
   * Executes the visitor conversion use case
   * @param sessionId The visitor's session ID
   * @param contactData The contact form data
   * @returns Conversion result
   */
  async execute(sessionId: string, contactData: ContactFormDto): Promise<ConversionResultDto> {
    try {
      // Find the visitor
      const visitor = await this.visitorRepository.findBySessionId(sessionId);
      if (!visitor) {
        throw new Error('Visitor not found');
      }

      // Validate eligibility for conversion
      if (!ConversionService.isEligibleForConversion(visitor)) {
        throw new Error('Visitor is not eligible for conversion');
      }

      // Create contact info value object
      const contactInfo = new ContactInfo(
        contactData.email,
        contactData.name,
        contactData.message,
        contactData.company
      );

      // Apply domain logic for conversion
      ConversionService.convertVisitor(visitor, contactInfo, contactData.source);

      // Persist the converted visitor
      await this.visitorRepository.save(visitor);

      // Track conversion analytics
      await this.analytics.trackConversion({
        visitorId: visitor.id,
        source: contactData.source,
        value: 100, // Conversion value
        metadata: {
          email: contactInfo.email,
          hasName: contactInfo.hasName(),
          hasMessage: contactInfo.hasMessage(),
          hasCompany: contactInfo.hasCompany()
        }
      });

      // Publish domain event
      const conversionEvent = new VisitorConvertedEvent(
        visitor,
        contactInfo,
        contactData.source
      );
      await this.eventPublisher.publish(conversionEvent);

      // Send welcome email
      const product = await this.productRepository.getProduct();
      await this.emailService.sendWelcomeEmail(contactInfo, product.name);

      return {
        success: true,
        visitorId: visitor.id,
        message: 'Conversion successful! Welcome email sent.',
        nextSteps: [
          'Check your email for next steps',
          'Join our community',
          'Start building with NextBoilerplate'
        ]
      };

    } catch (error) {
      // Log error and return failure result
      console.error('Conversion failed:', error);

      return {
        success: false,
        visitorId: '',
        message: error instanceof Error ? error.message : 'Conversion failed',
        nextSteps: [
          'Please check your information and try again',
          'Contact support if the problem persists'
        ]
      };
    }
  }
}

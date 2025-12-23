/**
 * Copyright (c) 2025 Bivex
 *
 * Author: Bivex
 * Available for contact via email: support@b-b.top
 * For up-to-date contact information:
 * https://github.com/bivex
 *
 * Created: 2025-12-23T06:00:46
 * Last Updated: 2025-12-23T07:49:46
 *
 * Licensed under the MIT License.
 * Commercial licensing available upon request.
 */

/**
 * Domain Service: ConversionService
 *
 * Handles the business logic for converting visitors into customers.
 * Domain services contain business logic that doesn't naturally belong to entities.
 */

import { Visitor } from '../entities/Visitor';
import {
  AnalyticsEvent,
  AnalyticsEventType,
} from '../value-objects/AnalyticsEvent';
import { ContactInfo } from '../value-objects/ContactInfo';

export class ConversionService {
  /**
   * Converts an anonymous visitor to a converted customer
   * @param visitor The visitor to convert
   * @param contactInfo The contact information provided
   * @param conversionSource Where the conversion happened (e.g., 'contact_form', 'cta_button')
   */
  static convertVisitor(
    visitor: Visitor,
    contactInfo: ContactInfo,
    conversionSource: string
  ): void {
    // Business rule: Only anonymous or engaged visitors can be converted
    if (visitor.isConverted()) {
      throw new Error('Visitor is already converted');
    }

    // Business rule: Contact info must include at least an email
    if (!contactInfo.email) {
      throw new Error('Contact information must include an email address');
    }

    // Business rule: Conversion source must be valid
    if (!conversionSource || conversionSource.trim().length === 0) {
      throw new Error('Conversion source is required');
    }

    // Convert the visitor
    visitor.convert(contactInfo);

    // Add conversion analytics event
    const conversionEvent = new AnalyticsEvent(
      AnalyticsEventType.CONVERSION,
      window.location.href,
      undefined,
      conversionSource,
      {
        source: conversionSource,
        email: contactInfo.email,
        hasName: contactInfo.hasName(),
        hasMessage: contactInfo.hasMessage(),
        hasCompany: contactInfo.hasCompany(),
      }
    );

    visitor.addEngagementEvent(conversionEvent);
  }

  /**
   * Validates if a visitor is eligible for conversion
   * @param visitor The visitor to check
   * @returns true if the visitor can be converted
   */
  static isEligibleForConversion(visitor: Visitor): boolean {
    return (
      !visitor.isConverted() &&
      (visitor.status === 'anonymous' || visitor.status === 'engaged')
    );
  }

  /**
   * Calculates conversion probability based on visitor engagement
   * @param visitor The visitor to analyze
   * @returns probability score between 0 and 1
   */
  static calculateConversionProbability(visitor: Visitor): number {
    if (visitor.isConverted()) {
      return 1.0;
    }

    const engagementScore = visitor.getEngagementScore();
    const recentActivity = visitor.hasRecentActivity();

    // Base probability from engagement score
    let probability = engagementScore / 100;

    // Boost for recent activity
    if (recentActivity) {
      probability *= 1.2;
    }

    // Cap at 0.95 (never 100% until actually converted)
    return Math.min(probability, 0.95);
  }

  /**
   * Gets conversion insights for analytics
   * @param visitor The visitor to analyze
   * @returns insights object with conversion metrics
   */
  static getConversionInsights(visitor: Visitor): {
    isConverted: boolean;
    engagementScore: number;
    conversionProbability: number;
    timeToConvert: number | undefined;
    conversionSource: string | undefined;
  } {
    const lastConversionEvent = visitor.engagementEvents
      .filter(event => event.type === AnalyticsEventType.CONVERSION)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())[0];

    return {
      isConverted: visitor.isConverted(),
      engagementScore: visitor.getEngagementScore(),
      conversionProbability: this.calculateConversionProbability(visitor),
      timeToConvert: visitor.convertedAt
        ? visitor.convertedAt.getTime() - visitor.firstVisitAt.getTime()
        : undefined,
      conversionSource: lastConversionEvent?.elementName,
    };
  }
}

/**
 * Copyright (c) 2025 Bivex
 *
 * Author: Bivex
 * Available for contact via email: support@b-b.top
 * For up-to-date contact information:
 * https://github.com/bivex
 *
 * Created: 2025-12-23T06:13:16
 * Last Updated: 2025-12-23T07:49:46
 *
 * Licensed under the MIT License.
 * Commercial licensing available upon request.
 */

/**
 * Domain Events
 *
 * Domain events represent important business occurrences that other parts
 * of the system might want to react to.
 */

import { Visitor } from '../entities/Visitor';
import { ContactInfo } from '../value-objects/ContactInfo';

// Base domain event interface
export interface DomainEvent {
  eventId: string;
  eventType: string;
  occurredAt: Date;
  aggregateId: string;
}

// Visitor converted to customer
export class VisitorConvertedEvent implements DomainEvent {
  readonly eventId: string;
  readonly eventType = 'visitor.converted';
  readonly occurredAt: Date;
  readonly aggregateId: string;
  readonly contactInfo: ContactInfo;
  readonly conversionSource: string;

  constructor(
    public readonly visitor: Visitor,

    _contactInfo: ContactInfo,

    _conversionSource: string
  ) {
    this.eventId = `visitor-converted-${visitor.id}-${Date.now()}`;
    this.occurredAt = new Date();
    this.aggregateId = visitor.id;
    this.contactInfo = _contactInfo;
    this.conversionSource = _conversionSource;
  }
}

// Visitor engagement milestone reached
export class VisitorEngagementMilestoneEvent implements DomainEvent {
  readonly eventId: string;
  readonly eventType = 'visitor.engagement_milestone';
  readonly occurredAt: Date;
  readonly aggregateId: string;
  readonly engagementScore: number;

  constructor(
    public readonly visitor: Visitor,
    public readonly milestone: string, // e.g., 'first_click', 'form_view', 'high_engagement'

    _engagementScore: number
  ) {
    this.eventId = `engagement-milestone-${visitor.id}-${milestone}-${Date.now()}`;
    this.occurredAt = new Date();
    this.aggregateId = visitor.id;
    this.engagementScore = _engagementScore;
  }
}

// Product feature highlighted
export class ProductFeatureViewedEvent implements DomainEvent {
  readonly eventId: string;
  readonly eventType = 'product.feature_viewed';
  readonly occurredAt: Date;
  readonly aggregateId: string;
  readonly featureName: string;

  constructor(
    public readonly visitorId: string,
    public readonly productId: string,
    public readonly featureId: string,

    _featureName: string
  ) {
    this.eventId = `feature-viewed-${visitorId}-${featureId}-${Date.now()}`;
    this.occurredAt = new Date();
    this.aggregateId = productId;
    this.featureName = _featureName;
  }
}

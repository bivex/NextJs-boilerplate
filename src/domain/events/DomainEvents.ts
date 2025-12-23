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

  constructor(
    public readonly visitor: Visitor,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public readonly contactInfo: ContactInfo,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public readonly conversionSource: string
  ) {
    this.eventId = `visitor-converted-${visitor.id}-${Date.now()}`;
    this.occurredAt = new Date();
    this.aggregateId = visitor.id;
  }
}

// Visitor engagement milestone reached
export class VisitorEngagementMilestoneEvent implements DomainEvent {
  readonly eventId: string;
  readonly eventType = 'visitor.engagement_milestone';
  readonly occurredAt: Date;
  readonly aggregateId: string;

  constructor(
    public readonly visitor: Visitor,
    public readonly milestone: string, // e.g., 'first_click', 'form_view', 'high_engagement'
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public readonly engagementScore: number
  ) {
    this.eventId = `engagement-milestone-${visitor.id}-${milestone}-${Date.now()}`;
    this.occurredAt = new Date();
    this.aggregateId = visitor.id;
  }
}

// Product feature highlighted
export class ProductFeatureViewedEvent implements DomainEvent {
  readonly eventId: string;
  readonly eventType = 'product.feature_viewed';
  readonly occurredAt: Date;
  readonly aggregateId: string;

  constructor(
    public readonly visitorId: string,
    public readonly productId: string,
    public readonly featureId: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public readonly featureName: string
  ) {
    this.eventId = `feature-viewed-${visitorId}-${featureId}-${Date.now()}`;
    this.occurredAt = new Date();
    this.aggregateId = productId;
  }
}

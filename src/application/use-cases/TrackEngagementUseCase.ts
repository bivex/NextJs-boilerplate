/**
 * Copyright (c) 2025 Bivex
 *
 * Author: Bivex
 * Available for contact via email: support@b-b.top
 * For up-to-date contact information:
 * https://github.com/bivex
 *
 * Created: 2025-12-23T06:13:21
 * Last Updated: 2025-12-23T08:23:58
 *
 * Licensed under the MIT License.
 * Commercial licensing available upon request.
 */

/**
 * Use Case: TrackEngagementUseCase
 *
 * Handles tracking of visitor engagement events.
 * This use case processes user interactions and updates visitor engagement state.
 */

import { Visitor } from '../../domain/entities/Visitor';
import { VisitorEngagementMilestoneEvent } from '../../domain/events/DomainEvents';
import {
  AnalyticsEvent,
  AnalyticsEventType,
} from '../../domain/value-objects/AnalyticsEvent';
import { AnalyticsPort } from '../ports/AnalyticsPort';
import { DomainEventPublisherPort } from '../ports/DomainEventPublisherPort';
import { VisitorRepositoryPort } from '../ports/VisitorRepositoryPort';

export interface EngagementEventDto {
  type: AnalyticsEventType;
  elementId?: string;
  elementName?: string;
  pageUrl: string;
  metadata?: Record<string, unknown>;
}

export class TrackEngagementUseCase {
  private visitorRepository: VisitorRepositoryPort;
  private analytics: AnalyticsPort;
  private eventPublisher: DomainEventPublisherPort;

  constructor(
    visitorRepository: VisitorRepositoryPort,
    analytics: AnalyticsPort,
    eventPublisher: DomainEventPublisherPort
  ) {
    this.visitorRepository = visitorRepository;
    this.analytics = analytics;
    this.eventPublisher = eventPublisher;
  }

  /**
   * Executes the engagement tracking use case
   * @param sessionId The visitor's session ID
   * @param eventData The engagement event data
   */
  async execute(
    sessionId: string,
    eventData: EngagementEventDto
  ): Promise<void> {
    try {
      // Find the visitor
      const visitor = await this.visitorRepository.findBySessionId(sessionId);
      if (!visitor) {
        // Create anonymous visitor if not found
        const newVisitor = await this.visitorRepository.create(sessionId);
        await this.visitorRepository.save(newVisitor);
        return; // Don't track events for newly created visitors
      }

      // Create analytics event
      const analyticsEvent = new AnalyticsEvent(
        eventData.type,
        eventData.pageUrl,
        eventData.elementId,
        eventData.elementName,
        eventData.metadata
      );

      // Add event to visitor
      visitor.addEngagementEvent(analyticsEvent);

      // Save visitor with updated engagement
      await this.visitorRepository.save(visitor);

      // Track in analytics system
      await this.analytics.trackEvent(analyticsEvent);

      // Check for engagement milestones
      await this.checkEngagementMilestones(visitor);
    } catch {
      // Log error but don't throw - engagement tracking shouldn't break the UI
      // console.error('Engagement tracking failed:', error);
    }
  }

  /**
   * Checks for engagement milestones and publishes events
   * @param visitor The visitor to check
   */
  private async checkEngagementMilestones(visitor: Visitor): Promise<void> {
    const engagementScore = visitor.getEngagementScore();
    const eventCount = visitor.engagementEvents.length;

    // Define milestones
    const milestones = [
      { name: 'first_interaction', threshold: 1, score: 10 },
      { name: 'engaged_visitor', threshold: 3, score: 30 },
      { name: 'high_engagement', threshold: 5, score: 50 },
      { name: 'very_high_engagement', threshold: 8, score: 80 },
    ];

    for (const milestone of milestones) {
      if (
        eventCount >= milestone.threshold &&
        engagementScore >= milestone.score
      ) {
        const milestoneEvent = new VisitorEngagementMilestoneEvent(
          visitor,
          milestone.name,
          engagementScore
        );
        await this.eventPublisher.publish(milestoneEvent);
      }
    }
  }
}

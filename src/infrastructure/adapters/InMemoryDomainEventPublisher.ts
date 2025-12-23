/**
 * Copyright (c) 2025 Bivex
 *
 * Author: Bivex
 * Available for contact via email: support@b-b.top
 * For up-to-date contact information:
 * https://github.com/bivex
 *
 * Created: 2025-12-23T06:13:08
 * Last Updated: 2025-12-23T07:49:46
 *
 * Licensed under the MIT License.
 * Commercial licensing available upon request.
 */

/**
 * Infrastructure Adapter: InMemoryDomainEventPublisher
 *
 * In-memory implementation of DomainEventPublisherPort for development.
 * Publishes events to registered subscribers. In production, this would
 * integrate with message queues like RabbitMQ, Kafka, or cloud services.
 */

import { DomainEventPublisherPort } from '../../application/ports/DomainEventPublisherPort';
import { DomainEvent } from '../../domain/events/DomainEvents';

type EventHandler = (event: DomainEvent) => Promise<void>;

export class InMemoryDomainEventPublisher implements DomainEventPublisherPort {
  private handlers = new Map<string, EventHandler[]>();

  /**
   * Subscribe to domain events
   * @param eventType The type of event to subscribe to
   * @param handler The handler function
   */
  subscribe(eventType: string, handler: EventHandler): void {
    if (!this.handlers.has(eventType)) {
      this.handlers.set(eventType, []);
    }
    this.handlers.get(eventType)!.push(handler);
  }

  /**
   * Unsubscribe from domain events
   * @param eventType The type of event to unsubscribe from
   * @param handler The handler function to remove
   */
  unsubscribe(eventType: string, handler: EventHandler): void {
    const handlers = this.handlers.get(eventType);
    if (handlers) {
      const index = handlers.indexOf(handler);
      if (index > -1) {
        handlers.splice(index, 1);
      }
    }
  }

  async publish(event: DomainEvent): Promise<void> {
    console.log('📢 Publishing Domain Event:', {
      eventId: event.eventId,
      eventType: event.eventType,
      aggregateId: event.aggregateId,
      occurredAt: event.occurredAt.toISOString()
    });

    const handlers = this.handlers.get(event.eventType);
    if (handlers) {
      // Publish to all handlers asynchronously
      const promises = handlers.map(handler =>
        handler(event).catch(error => {
          console.error(`Error in event handler for ${event.eventType}:`, error);
        })
      );
      await Promise.all(promises);
    }
  }

  async publishAll(events: DomainEvent[]): Promise<void> {
    const promises = events.map(event => this.publish(event));
    await Promise.all(promises);
  }
}

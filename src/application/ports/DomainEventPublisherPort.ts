/**
 * Copyright (c) 2025 Bivex
 *
 * Author: Bivex
 * Available for contact via email: support@b-b.top
 * For up-to-date contact information:
 * https://github.com/bivex
 *
 * Created: 2025-12-23T06:13:24
 * Last Updated: 2025-12-23T07:49:46
 *
 * Licensed under the MIT License.
 * Commercial licensing available upon request.
 */

/**
 * Application Port: DomainEventPublisherPort
 *
 * Defines the interface for publishing domain events.
 * This port allows the application to publish domain events
 * to interested subscribers without tight coupling.
 */

import { DomainEvent } from '../../domain/events/DomainEvents';

export interface DomainEventPublisherPort {
  /**
   * Publishes a domain event
   * @param _event The domain event to publish
   */
  publish(_event: DomainEvent): Promise<void>;

  /**
   * Publishes multiple domain events
   * @param _events Array of domain events to publish
   */
  publishAll(_events: DomainEvent[]): Promise<void>;
}

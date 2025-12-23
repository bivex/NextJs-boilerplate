/**
 * Copyright (c) 2025 Bivex
 *
 * Author: Bivex
 * Available for contact via email: support@b-b.top
 * For up-to-date contact information:
 * https://github.com/bivex
 *
 * Created: 2025-12-23T06:13:25
 * Last Updated: 2025-12-23T07:49:46
 *
 * Licensed under the MIT License.
 * Commercial licensing available upon request.
 */

/**
 * Application Port: VisitorRepositoryPort
 *
 * Defines the interface for visitor data persistence.
 * This port allows the application to store and retrieve visitor data
 * without depending on specific storage implementations.
 */

import { Visitor } from '../../domain/entities/Visitor';
import { ContactInfo } from '../../domain/value-objects/ContactInfo';

export interface VisitorRepositoryPort {
  /**
   * Saves a visitor to persistent storage
   * @param _visitor The visitor to save
   */
  save(_visitor: Visitor): Promise<void>;

  /**
   * Finds a visitor by their ID
   * @param _id The visitor ID
   * @returns The visitor if found, null otherwise
   */
  findById(_id: string): Promise<Visitor | null>;

  /**
   * Finds a visitor by their session ID
   * @param _sessionId The session ID
   * @returns The visitor if found, null otherwise
   */
  findBySessionId(_sessionId: string): Promise<Visitor | null>;

  /**
   * Creates a new visitor with the given session ID
   * @param _sessionId The session ID for the new visitor
   * @returns The newly created visitor
   */
  create(_sessionId: string): Promise<Visitor>;

  /**
   * Updates visitor contact information upon conversion
   * @param _visitorId The visitor ID
   * @param _contactInfo The contact information
   */
  updateContactInfo(
    _visitorId: string,
    _contactInfo: ContactInfo
  ): Promise<void>;

  /**
   * Gets all converted visitors within a date range
   * @param _dateRange Date range for the query
   * @returns Array of converted visitors
   */
  getConvertedVisitors(_dateRange: {
    start: Date;
    end: Date;
  }): Promise<Visitor[]>;

  /**
   * Gets visitor statistics
   * @param _dateRange Date range for the statistics
   * @returns Visitor statistics
   */
  getVisitorStatistics(_dateRange: { start: Date; end: Date }): Promise<{
    totalVisitors: number;
    convertedVisitors: number;
    conversionRate: number;
    averageEngagementScore: number;
  }>;
}

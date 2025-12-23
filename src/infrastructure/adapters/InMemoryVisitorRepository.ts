/**
 * Copyright (c) 2025 Bivex
 *
 * Author: Bivex
 * Available for contact via email: support@b-b.top
 * For up-to-date contact information:
 * https://github.com/bivex
 *
 * Created: 2025-12-23T06:13:07
 * Last Updated: 2025-12-23T07:31:24
 *
 * Licensed under the MIT License.
 * Commercial licensing available upon request.
 */

/**
 * Infrastructure Adapter: InMemoryVisitorRepository
 *
 * In-memory implementation of VisitorRepositoryPort for development and testing.
 * In production, this would be replaced with a database implementation.
 */

import { VisitorRepositoryPort } from '../../application/ports/VisitorRepositoryPort';
import { Visitor, VisitorStatus } from '../../domain/entities/Visitor';
import { ContactInfo } from '../../domain/value-objects/ContactInfo';

export class InMemoryVisitorRepository implements VisitorRepositoryPort {
  private visitors = new Map<string, Visitor>();
  private sessionToVisitorId = new Map<string, string>();

  async save(visitor: Visitor): Promise<void> {
    this.visitors.set(visitor.id, visitor);
    this.sessionToVisitorId.set(visitor.sessionId, visitor.id);
  }

  async findById(id: string): Promise<Visitor | null> {
    return this.visitors.get(id) || null;
  }

  async findBySessionId(sessionId: string): Promise<Visitor | null> {
    const visitorId = this.sessionToVisitorId.get(sessionId);
    if (!visitorId) return null;

    return this.visitors.get(visitorId) || null;
  }

  async create(sessionId: string): Promise<Visitor> {
    const visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const visitor = new Visitor(visitorId, sessionId);

    this.visitors.set(visitorId, visitor);
    this.sessionToVisitorId.set(sessionId, visitorId);

    return visitor;
  }

  async updateContactInfo(visitorId: string, contactInfo: ContactInfo): Promise<void> {
    const visitor = this.visitors.get(visitorId);
    if (!visitor) {
      throw new Error('Visitor not found');
    }

    // In a real implementation, this would update the visitor's contact info
    // For now, we'll just ensure the visitor exists
  }

  async getConvertedVisitors(dateRange: { start: Date; end: Date }): Promise<Visitor[]> {
    return Array.from(this.visitors.values())
      .filter(visitor =>
        visitor.isConverted() &&
        visitor.convertedAt &&
        visitor.convertedAt >= dateRange.start &&
        visitor.convertedAt <= dateRange.end
      );
  }

  async getVisitorStatistics(dateRange: { start: Date; end: Date }): Promise<{
    totalVisitors: number;
    convertedVisitors: number;
    conversionRate: number;
    averageEngagementScore: number;
  }> {
    const visitorsInRange = Array.from(this.visitors.values())
      .filter(visitor => visitor.firstVisitAt >= dateRange.start && visitor.firstVisitAt <= dateRange.end);

    const totalVisitors = visitorsInRange.length;
    const convertedVisitors = visitorsInRange.filter(v => v.isConverted()).length;
    const conversionRate = totalVisitors > 0 ? convertedVisitors / totalVisitors : 0;
    const averageEngagementScore = totalVisitors > 0
      ? visitorsInRange.reduce((sum, v) => sum + v.getEngagementScore(), 0) / totalVisitors
      : 0;

    return {
      totalVisitors,
      convertedVisitors,
      conversionRate,
      averageEngagementScore
    };
  }
}

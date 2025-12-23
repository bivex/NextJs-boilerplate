/**
 * Copyright (c) 2025 Bivex
 *
 * Author: Bivex
 * Available for contact via email: support@b-b.top
 * For up-to-date contact information:
 * https://github.com/bivex
 *
 * Created: 2025-12-23T06:13:17
 * Last Updated: 2025-12-23T07:49:46
 *
 * Licensed under the MIT License.
 * Commercial licensing available upon request.
 */

/**
 * Domain Entity: Visitor
 *
 * Represents a person visiting the landing page.
 * Tracks engagement and potential conversion.
 */

import { AnalyticsEvent } from '../value-objects/AnalyticsEvent';
import { ContactInfo } from '../value-objects/ContactInfo';

export enum VisitorStatus {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ANONYMOUS = 'anonymous',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ENGAGED = 'engaged',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  CONVERTED = 'converted',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  BOUNCED = 'bounced'
}

export class Visitor {
  private readonly _id: string;
  private readonly _sessionId: string;
  private _status: VisitorStatus;
  private _contactInfo?: ContactInfo;
  private _engagementEvents: AnalyticsEvent[];
  private readonly _firstVisitAt: Date;
  private _lastActivityAt: Date;
  private _convertedAt?: Date;

  constructor(
    id: string,
    sessionId: string,
    status: VisitorStatus = VisitorStatus.ANONYMOUS
  ) {
    this.validateVisitorData(id, sessionId);

    this._id = id;
    this._sessionId = sessionId;
    this._status = status;
    this._engagementEvents = [];
    this._firstVisitAt = new Date();
    this._lastActivityAt = new Date();
  }

  // Getters
  get id(): string {
    return this._id;
  }

  get sessionId(): string {
    return this._sessionId;
  }

  get status(): VisitorStatus {
    return this._status;
  }

  get contactInfo(): ContactInfo | undefined {
    return this._contactInfo;
  }

  get engagementEvents(): readonly AnalyticsEvent[] {
    return [...this._engagementEvents];
  }

  get firstVisitAt(): Date {
    return this._firstVisitAt;
  }

  get lastActivityAt(): Date {
    return this._lastActivityAt;
  }

  get convertedAt(): Date | undefined {
    return this._convertedAt;
  }

  // Business methods
  updateActivity(): void {
    this._lastActivityAt = new Date();
  }

  addEngagementEvent(event: AnalyticsEvent): void {
    this._engagementEvents.push(event);
    this.updateActivity();

    // Update status based on engagement
    if (event.type === 'button_click' || event.type === 'form_submit') {
      this._status = VisitorStatus.ENGAGED;
    }
  }

  convert(contactInfo: ContactInfo): void {
    if (this._status === VisitorStatus.CONVERTED) {
      throw new Error('Visitor is already converted');
    }

    this._contactInfo = contactInfo;
    this._status = VisitorStatus.CONVERTED;
    this._convertedAt = new Date();
    this.updateActivity();
  }

  markAsBounced(): void {
    if (this._status !== VisitorStatus.ANONYMOUS) {
      throw new Error('Only anonymous visitors can be marked as bounced');
    }

    this._status = VisitorStatus.BOUNCED;
  }

  // Business rules
  isEngaged(): boolean {
    return this._status === VisitorStatus.ENGAGED;
  }

  isConverted(): boolean {
    return this._status === VisitorStatus.CONVERTED;
  }

  hasRecentActivity(minutesThreshold: number = 30): boolean {
    const thresholdMs = minutesThreshold * 60 * 1000;
    return (Date.now() - this._lastActivityAt.getTime()) < thresholdMs;
  }

  getEngagementScore(): number {
    let score = 0;

    // Base score based on status
    switch (this._status) {
      case VisitorStatus.CONVERTED:
        score += 100;
        break;
      case VisitorStatus.ENGAGED:
        score += 50;
        break;
      case VisitorStatus.ANONYMOUS:
        score += 10;
        break;
    }

    // Add points for each engagement event
    score += this._engagementEvents.length * 5;

    // Bonus for recent activity
    if (this.hasRecentActivity()) {
      score += 20;
    }

    return Math.min(score, 100); // Cap at 100
  }

  // Validation
  private validateVisitorData(id: string, sessionId: string): void {
    if (!id || id.trim().length === 0) {
      throw new Error('Visitor id cannot be empty');
    }

    if (!sessionId || sessionId.trim().length === 0) {
      throw new Error('Visitor sessionId cannot be empty');
    }
  }
}

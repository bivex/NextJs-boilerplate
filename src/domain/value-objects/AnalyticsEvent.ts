/**
 * Copyright (c) 2025 Bivex
 *
 * Author: Bivex
 * Available for contact via email: support@b-b.top
 * For up-to-date contact information:
 * https://github.com/bivex
 *
 * Created: 2025-12-23T06:00:49
 * Last Updated: 2025-12-23T07:31:24
 *
 * Licensed under the MIT License.
 * Commercial licensing available upon request.
 */

/**
 * Value Object: AnalyticsEvent
 *
 * Represents an analytics event for tracking visitor engagement.
 * Immutable value object that captures user interactions.
 */

export enum AnalyticsEventType {
  PAGE_VIEW = 'page_view',
  BUTTON_CLICK = 'button_click',
  FORM_SUBMIT = 'form_submit',
  SCROLL = 'scroll',
  TIME_SPENT = 'time_spent',
  CONVERSION = 'conversion'
}

export const AnalyticsEventTypeValues = Object.values(AnalyticsEventType);

export class AnalyticsEvent {
  private readonly _type: AnalyticsEventType;
  private readonly _timestamp: Date;
  private readonly _elementId: string | undefined;
  private readonly _elementName: string | undefined;
  private readonly _pageUrl: string;
  private readonly _metadata: Record<string, any> | undefined;

  constructor(
    type: AnalyticsEventType,
    pageUrl: string,
    elementId?: string,
    elementName?: string,
    metadata?: Record<string, any>
  ) {
    this.validateEventData(type, pageUrl);

    this._type = type;
    this._timestamp = new Date();
    this._pageUrl = pageUrl;
    this._elementId = elementId;
    this._elementName = elementName;
    this._metadata = metadata ? { ...metadata } : undefined;
  }

  // Getters
  get type(): AnalyticsEventType {
    return this._type;
  }

  get timestamp(): Date {
    return this._timestamp;
  }

  get elementId(): string | undefined {
    return this._elementId;
  }

  get elementName(): string | undefined {
    return this._elementName;
  }

  get pageUrl(): string {
    return this._pageUrl;
  }

  get metadata(): Record<string, any> | undefined {
    return this._metadata ? { ...this._metadata } : undefined;
  }

  // Value object equality (based on key properties)
  equals(other: AnalyticsEvent): boolean {
    return (
      this._type === other._type &&
      this._timestamp.getTime() === other._timestamp.getTime() &&
      this._elementId === other._elementId &&
      this._elementName === other._elementName &&
      this._pageUrl === other._pageUrl &&
      JSON.stringify(this._metadata) === JSON.stringify(other._metadata)
    );
  }

  // Business methods
  isEngagementEvent(): boolean {
    return [
      AnalyticsEventType.BUTTON_CLICK,
      AnalyticsEventType.FORM_SUBMIT,
      AnalyticsEventType.SCROLL
    ].includes(this._type);
  }

  isConversionEvent(): boolean {
    return this._type === AnalyticsEventType.CONVERSION;
  }

  getEventValue(): number {
    switch (this._type) {
      case AnalyticsEventType.CONVERSION:
        return 100;
      case AnalyticsEventType.FORM_SUBMIT:
        return 50;
      case AnalyticsEventType.BUTTON_CLICK:
        return 20;
      case AnalyticsEventType.SCROLL:
        return 10;
      case AnalyticsEventType.PAGE_VIEW:
        return 5;
      case AnalyticsEventType.TIME_SPENT:
        return Math.min((this._metadata?.duration || 0) / 10, 30); // Max 30 points for time spent
      default:
        return 0;
    }
  }

  // Validation
  private validateEventData(type: AnalyticsEventType, pageUrl: string): void {
    if (!Object.values(AnalyticsEventType).includes(type)) {
      throw new Error('Invalid analytics event type');
    }

    if (!pageUrl || pageUrl.trim().length === 0) {
      throw new Error('Page URL is required');
    }

    // Basic URL validation
    try {
      new URL(pageUrl);
    } catch {
      throw new Error('Invalid page URL format');
    }
  }
}

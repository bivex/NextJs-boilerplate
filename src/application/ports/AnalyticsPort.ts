/**
 * Copyright (c) 2025 Bivex
 *
 * Author: Bivex
 * Available for contact via email: support@b-b.top
 * For up-to-date contact information:
 * https://github.com/bivex
 *
 * Created: 2025-12-23T05:50:43
 * Last Updated: 2025-12-23T07:31:24
 *
 * Licensed under the MIT License.
 * Commercial licensing available upon request.
 */

/**
 * Application Port: AnalyticsPort
 *
 * Defines the interface for analytics tracking.
 * This port allows the application to track visitor engagement
 * without depending on specific analytics implementations.
 */

import { AnalyticsEvent } from '../../domain/value-objects/AnalyticsEvent';

export interface AnalyticsPort {
  /**
   * Tracks an analytics event
   * @param event The analytics event to track
   */
  trackEvent(event: AnalyticsEvent): Promise<void>;

  /**
   * Tracks a page view
   * @param pageUrl The URL of the page being viewed
   * @param visitorId Optional visitor identifier
   */
  trackPageView(pageUrl: string, visitorId?: string): Promise<void>;

  /**
   * Tracks a conversion event
   * @param conversionData Data about the conversion
   */
  trackConversion(conversionData: {
    visitorId: string;
    source: string;
    value?: number;
    metadata?: Record<string, any>;
  }): Promise<void>;

  /**
   * Gets analytics data for reporting
   * @param dateRange Date range for the analytics data
   * @returns Analytics summary data
   */
  getAnalyticsSummary(dateRange: { start: Date; end: Date }): Promise<{
    totalVisitors: number;
    totalConversions: number;
    conversionRate: number;
    topPages: Array<{ url: string; views: number }>;
    engagementMetrics: Record<string, number>;
  }>;
}

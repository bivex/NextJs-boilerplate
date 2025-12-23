/**
 * Copyright (c) 2025 Bivex
 *
 * Author: Bivex
 * Available for contact via email: support@b-b.top
 * For up-to-date contact information:
 * https://github.com/bivex
 *
 * Created: 2025-12-23T06:12:51
 * Last Updated: 2025-12-23T07:33:23
 *
 * Licensed under the MIT License.
 * Commercial licensing available upon request.
 */

/**
 * Presentation Hook: useLandingPage
 *
 * React hook that provides landing page functionality to components.
 * This hook uses tRPC for type-safe API communication with the backend.
 */

'use client';

import { useMemo } from 'react';
import { trpc } from '@/lib/trpc/client';
import { ProductSummaryDto } from '../../application/dtos/ProductDto';
import { ContactFormDto, ConversionResultDto } from '../../application/dtos/VisitorDto';
import { AnalyticsEventType } from '../../domain/value-objects/AnalyticsEvent';

interface UseLandingPageReturn {
  // Data
  product: ProductSummaryDto | null;
  visitor: any | null;
  isLoading: boolean;
  error: any;

  // Actions
  trackEngagement: (event: {
    type: AnalyticsEventType;
    elementId?: string;
    elementName?: string;
    metadata?: Record<string, any>;
  }) => Promise<void>;
  convertVisitor: (contactData: ContactFormDto) => Promise<ConversionResultDto>;
  refreshData: () => void;
}

export function useLandingPage(): UseLandingPageReturn {
  // Memoized session ID to avoid repeated sessionStorage access
  const sessionId = useMemo(() => {
    if (typeof window === 'undefined') return 'server-session';

    let storedSessionId = sessionStorage.getItem('landing_page_session');
    if (!storedSessionId) {
      storedSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('landing_page_session', storedSessionId);
    }
    return storedSessionId;
  }, []);

  // Get landing page data
  const pageUrl = typeof window !== 'undefined' ? window.location.href : '/';
  const {
    data: landingPageData,
    isLoading,
    error,
    refetch: refreshData
  } = trpc.visitor.displayLandingPage.useQuery({
    sessionId,
    pageUrl
  });

  // Track engagement mutation
  const trackEngagementMutation = trpc.visitor.trackEngagement.useMutation();

  // Convert visitor mutation
  const convertVisitorMutation = trpc.visitor.convert.useMutation({
    onSuccess: () => {
      // Refresh data after successful conversion
      refreshData();
    },
  });

  // Track engagement events
  const trackEngagement = async (event: {
    type: AnalyticsEventType;
    elementId?: string;
    elementName?: string;
    metadata?: Record<string, any>;
  }) => {
    try {
      const pageUrl = typeof window !== 'undefined' ? window.location.href : '/';

      await trackEngagementMutation.mutateAsync({
        sessionId,
        type: event.type,
        elementId: event.elementId,
        elementName: event.elementName,
        pageUrl,
        metadata: event.metadata,
      });
    } catch (err) {
      console.error('Failed to track engagement:', err);
      // Don't set error state for tracking failures
    }
  };

  // Convert visitor
  const convertVisitor = async (contactData: ContactFormDto): Promise<ConversionResultDto> => {
    try {
      const result = await convertVisitorMutation.mutateAsync({
        sessionId,
        name: contactData.name,
        email: contactData.email,
        message: contactData.message,
        company: contactData.company,
        source: contactData.source,
      });

      return result;
    } catch (err: any) {
      console.error('Failed to convert visitor:', err);
      return {
        success: false,
        visitorId: '',
        message: err?.message || 'Conversion failed',
        nextSteps: []
      };
    }
  };

  return {
    product: landingPageData?.product ?? null,
    visitor: landingPageData?.visitor ?? null,
    isLoading,
    error,
    trackEngagement,
    convertVisitor,
    refreshData: () => refreshData()
  };
}

/**
 * Copyright (c) 2025 Bivex
 *
 * Author: Bivex
 * Available for contact via email: support@b-b.top
 * For up-to-date contact information:
 * https://github.com/bivex
 *
 * Created: 2025-12-23T06:12:51
 * Last Updated: 2025-12-23T07:49:46
 *
 * Licensed under the MIT License.
 * Commercial licensing available upon request.
 */

/**
 * Presentation Hook: useLandingPage
 *
 * React hook that provides landing page functionality to components.
 * This hook acts as the interface between the presentation layer and application layer.
 */

'use client';

import { useState, useEffect, useCallback } from 'react';

import { ProductSummaryDto } from '../../application/dtos/ProductDto';
import {
  VisitorDto,
  ContactFormDto,
  ConversionResultDto,
} from '../../application/dtos/VisitorDto';
import { EngagementEventDto } from '../../application/use-cases/TrackEngagementUseCase';
import { DependencyInjection } from '../../infrastructure/config/DependencyInjection';

interface UseLandingPageReturn {
  // Data
  product: ProductSummaryDto | null;
  visitor: VisitorDto | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  trackEngagement: (
    _event: Omit<EngagementEventDto, 'pageUrl'>
  ) => Promise<void>;
  convertVisitor: (
    _contactData: ContactFormDto
  ) => Promise<ConversionResultDto>;
  refreshData: () => Promise<void>;
}

export function useLandingPage(): UseLandingPageReturn {
  const [product, setProduct] = useState<ProductSummaryDto | null>(null);
  const [visitor, setVisitor] = useState<VisitorDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get use cases directly (DI handles lazy initialization)
  const displayUseCase = DependencyInjection.getDisplayLandingPageUseCase();
  const convertUseCase = DependencyInjection.getConvertVisitorUseCase();
  const trackUseCase = DependencyInjection.getTrackEngagementUseCase();

  // Initialize session ID
  const getSessionId = (): string => {
    if (typeof window === 'undefined') return 'server-session';

    let storedSessionId = sessionStorage.getItem('landing_page_session');
    if (!storedSessionId) {
      storedSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('landing_page_session', storedSessionId);
    }
    return storedSessionId;
  };

  const [sessionId] = useState<string>(getSessionId);

  // Load data on mount
  useEffect(() => {
    const loadLandingPageData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const pageUrl =
          typeof window !== 'undefined' ? window.location.href : '/';

        const result = await displayUseCase.execute(sessionId, pageUrl);

        // Batch state updates to minimize re-renders
        setProduct(result.product);
        setVisitor(result.visitor);
        setIsLoading(false);
      } catch (err) {
        // console.error('Failed to load landing page data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load data');
        setIsLoading(false);
      }
    };

    loadLandingPageData();
  }, [displayUseCase, sessionId]);

  // Refresh landing page data
  const refreshData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const pageUrl =
        typeof window !== 'undefined' ? window.location.href : '/';

      const result = await displayUseCase.execute(sessionId, pageUrl);

      // Batch state updates to minimize re-renders
      setProduct(result.product);
      setVisitor(result.visitor);
      setIsLoading(false);
    } catch (err) {
      // console.error('Failed to refresh landing page data:', err);
      setError(err instanceof Error ? err.message : 'Failed to refresh data');
      setIsLoading(false);
    }
  }, [displayUseCase, sessionId]);

  // Safety timeout to prevent infinite loading
  useEffect(() => {
    if (isLoading) {
      const timeout = setTimeout(() => {
        // console.warn('Loading timeout reached, setting loading to false');
        setIsLoading(false);
        setError('Loading timeout - please refresh the page');
      }, 10000); // 10 second timeout

      return () => clearTimeout(timeout);
    }
    // No cleanup needed when not loading
    return () => {};
  }, [isLoading]);

  // Track engagement events
  const trackEngagement = useCallback(
    async (_event: Omit<EngagementEventDto, 'pageUrl'>) => {
      try {
        const pageUrl =
          typeof window !== 'undefined' ? window.location.href : '/';

        await trackUseCase.execute(sessionId, {
          ..._event,
          pageUrl,
        });
      } catch {
        // console.error('Failed to track engagement:', error);
        // Don't set error state for tracking failures
      }
    },
    [trackUseCase, sessionId]
  );

  // Convert visitor
  const convertVisitor = useCallback(
    async (_contactData: ContactFormDto): Promise<ConversionResultDto> => {
      try {
        const result = await convertUseCase.execute(sessionId, _contactData);

        // Refresh visitor data after conversion
        if (result.success) {
          await refreshData();
        }

        return result;
      } catch (err) {
        // console.error('Failed to convert visitor:', err);
        return {
          success: false,
          visitorId: '',
          message: err instanceof Error ? err.message : 'Conversion failed',
          nextSteps: [],
        };
      }
    },
    [convertUseCase, sessionId, refreshData]
  );

  return {
    product,
    visitor,
    isLoading,
    error,
    trackEngagement,
    convertVisitor,
    refreshData,
  };
}

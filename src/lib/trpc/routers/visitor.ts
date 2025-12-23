/**
 * Copyright (c) 2025 Bivex
 *
 * Author: Bivex
 * Available for contact via email: support@b-b.top
 * For up-to-date contact information:
 * https://github.com/bivex
 *
 * Created: 2025-12-23T07:33:01
 * Last Updated: 2025-12-23T07:34:59
 *
 * Licensed under the MIT License.
 * Commercial licensing available upon request.
 */

import { router, publicProcedure } from '@/lib/trpc/init';
import { z } from 'zod';
import { DependencyInjection } from '@/infrastructure/config/DependencyInjection';
import { AnalyticsEventType } from '@/domain/value-objects/AnalyticsEvent';

// Input validation schemas
const displayLandingPageSchema = z.object({
  sessionId: z.string().min(1),
  pageUrl: z.string().min(1),
});

const trackEngagementSchema = z.object({
  sessionId: z.string().min(1),
  type: z.union([
    z.literal('page_view'),
    z.literal('button_click'),
    z.literal('form_submit'),
    z.literal('scroll'),
    z.literal('time_spent'),
    z.literal('conversion'),
  ]),
  elementId: z.string().optional(),
  elementName: z.string().optional(),
  pageUrl: z.string().min(1),
  metadata: z.any().optional(),
});

const convertVisitorSchema = z.object({
  sessionId: z.string().min(1),
  name: z.string().optional(),
  email: z.string().email(),
  message: z.string().optional(),
  company: z.string().optional(),
  source: z.string().min(1),
});

export const visitorRouter = router({
  // Display landing page - combines product and visitor data
  displayLandingPage: publicProcedure
    .input(displayLandingPageSchema)
    .query(async ({ input }) => {
      const displayLandingPageUseCase = DependencyInjection.getDisplayLandingPageUseCase();

      return await displayLandingPageUseCase.execute(input.sessionId, input.pageUrl);
    }),

  // Track visitor engagement events
  trackEngagement: publicProcedure
    .input(trackEngagementSchema)
    .mutation(async ({ input }) => {
      const trackEngagementUseCase = DependencyInjection.getTrackEngagementUseCase();

      const engagementData: any = {
        type: input.type,
        pageUrl: input.pageUrl,
      };

      if (input.elementId) engagementData.elementId = input.elementId;
      if (input.elementName) engagementData.elementName = input.elementName;
      if (input.metadata) engagementData.metadata = input.metadata;

      await trackEngagementUseCase.execute(input.sessionId, engagementData);

      return { success: true };
    }),

  // Convert visitor to customer
  convert: publicProcedure
    .input(convertVisitorSchema)
    .mutation(async ({ input }) => {
      const convertVisitorUseCase = DependencyInjection.getConvertVisitorUseCase();

      const contactData: any = {
        email: input.email,
        source: input.source,
      };

      if (input.name) contactData.name = input.name;
      if (input.message) contactData.message = input.message;
      if (input.company) contactData.company = input.company;

      return await convertVisitorUseCase.execute(input.sessionId, contactData);
    }),
});

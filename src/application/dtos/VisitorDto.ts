/**
 * Copyright (c) 2025 Bivex
 *
 * Author: Bivex
 * Available for contact via email: support@b-b.top
 * For up-to-date contact information:
 * https://github.com/bivex
 *
 * Created: 2025-12-23T06:13:27
 * Last Updated: 2025-12-23T07:55:32
 *
 * Licensed under the MIT License.
 * Commercial licensing available upon request.
 */

/**
 * Application DTO: VisitorDto
 *
 * Data Transfer Object for visitor information.
 * Used to transfer visitor data between application and presentation layers.
 */

import { VisitorStatus } from '../../domain/entities/Visitor';

export interface VisitorDto {
  id: string;
  sessionId: string;
  status: VisitorStatus;
  firstVisitAt: Date;
  lastActivityAt: Date;
  convertedAt: Date | undefined;
  engagementScore: number;
  engagementEventsCount: number;
}

export interface ContactFormDto {
  name?: string;
  email: string;
  message?: string;
  company?: string;
  source: string; // e.g., 'contact_form', 'newsletter_signup'
}

export interface ConversionResultDto {
  success: boolean;
  visitorId: string;
  message: string;
  nextSteps?: string[];
}

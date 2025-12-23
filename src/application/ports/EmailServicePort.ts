/**
 * Copyright (c) 2025 Bivex
 *
 * Author: Bivex
 * Available for contact via email: support@b-b.top
 * For up-to-date contact information:
 * https://github.com/bivex
 *
 * Created: 2025-12-23T06:13:25
 * Last Updated: 2025-12-23T06:13:25
 *
 * Licensed under the MIT License.
 * Commercial licensing available upon request.
 */

/**
 * Application Port: EmailServicePort
 *
 * Defines the interface for email communication.
 * This port allows the application to send emails
 * without depending on specific email providers.
 */

import { ContactInfo } from '../../domain/value-objects/ContactInfo';

export interface EmailServicePort {
  /**
   * Sends a welcome email to a converted visitor
   * @param contactInfo The contact information of the recipient
   * @param productName The name of the product they're interested in
   */
  sendWelcomeEmail(contactInfo: ContactInfo, productName: string): Promise<void>;

  /**
   * Sends a contact form submission notification
   * @param contactInfo The contact information from the form
   * @param additionalData Any additional data from the form
   */
  sendContactNotification(
    contactInfo: ContactInfo,
    additionalData?: Record<string, any>
  ): Promise<void>;

  /**
   * Sends a newsletter signup confirmation
   * @param email The email address that signed up
   */
  sendNewsletterConfirmation(email: string): Promise<void>;

  /**
   * Validates if an email address is deliverable
   * @param email The email address to validate
   * @returns true if the email appears valid and deliverable
   */
  validateEmail(email: string): Promise<boolean>;
}

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
   * @param _contactInfo The contact information of the recipient
   * @param _productName The name of the product they're interested in
   */
  sendWelcomeEmail(_contactInfo: ContactInfo, _productName: string): Promise<void>;

  /**
   * Sends a contact form submission notification
   * @param _contactInfo The contact information from the form
   * @param _additionalData Any additional data from the form
   */
  sendContactNotification(
    _contactInfo: ContactInfo,
    _additionalData?: Record<string, any>
  ): Promise<void>;

  /**
   * Sends a newsletter signup confirmation
   * @param _email The email address that signed up
   */
  sendNewsletterConfirmation(_email: string): Promise<void>;

  /**
   * Validates if an email address is deliverable
   * @param _email The email address to validate
   * @returns true if the email appears valid and deliverable
   */
  validateEmail(_email: string): Promise<boolean>;
}

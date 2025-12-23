/**
 * Copyright (c) 2025 Bivex
 *
 * Author: Bivex
 * Available for contact via email: support@b-b.top
 * For up-to-date contact information:
 * https://github.com/bivex
 *
 * Created: 2025-12-23T06:13:09
 * Last Updated: 2025-12-23T07:31:24
 *
 * Licensed under the MIT License.
 * Commercial licensing available upon request.
 */

/**
 * Infrastructure Adapter: ConsoleEmailServiceAdapter
 *
 * Console-based implementation of EmailServicePort for development.
 * Logs email content to console instead of sending. In production,
 * this would be replaced with SendGrid, Mailgun, or similar service.
 */

import { EmailServicePort } from '../../application/ports/EmailServicePort';
import { ContactInfo } from '../../domain/value-objects/ContactInfo';

export class ConsoleEmailServiceAdapter implements EmailServicePort {
  async sendWelcomeEmail(contactInfo: ContactInfo, productName: string): Promise<void> {
    const emailContent = {
      to: contactInfo.email,
      subject: `Welcome to ${productName}! 🚀`,
      content: `
Dear ${contactInfo.name || 'Developer'},

Thank you for your interest in ${productName}!

We're excited to have you join our community. Here's what you can do next:

1. 📖 Check out our documentation at https://docs.nextboilerplate.com
2. 🏗️ Start building your next project with our starter template
3. 💬 Join our Discord community for support and discussions
4. 🐛 Report any issues or suggest improvements on GitHub

If you have any questions, feel free to reply to this email.

Best regards,
The NextBoilerplate Team
      `.trim()
    };

    console.log('📧 Welcome Email:', emailContent);

    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  async sendContactNotification(
    contactInfo: ContactInfo,
    additionalData?: Record<string, any>
  ): Promise<void> {
    const emailContent = {
      to: 'support@nextboilerplate.com', // Internal notification
      subject: `New Contact Form Submission from ${contactInfo.getDisplayName()}`,
      content: `
New contact form submission received:

Name: ${contactInfo.name || 'Not provided'}
Email: ${contactInfo.email}
Company: ${contactInfo.company || 'Not provided'}
Message: ${contactInfo.message || 'No message provided'}

Additional Data: ${JSON.stringify(additionalData || {}, null, 2)}

Please follow up with this lead.
      `.trim()
    };

    console.log('📧 Contact Notification:', emailContent);

    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  async sendNewsletterConfirmation(email: string): Promise<void> {
    const emailContent = {
      to: email,
      subject: 'Welcome to NextBoilerplate Newsletter! 📧',
      content: `
Thank you for subscribing to our newsletter!

You'll receive:
- 🆕 Product updates and new features
- 📚 Development tips and best practices
- 🎉 Exclusive offers and early access
- 📰 Industry news and trends

You can unsubscribe at any time using the link in our emails.

Best regards,
The NextBoilerplate Team
      `.trim()
    };

    console.log('📧 Newsletter Confirmation:', emailContent);

    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  async validateEmail(email: string): Promise<boolean> {
    // Basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidFormat = emailPattern.test(email);

    console.log('🔍 Email Validation:', {
      email,
      isValidFormat,
      checkedAt: new Date().toISOString()
    });

    // In a real implementation, this would check against email verification services
    return isValidFormat;
  }
}

/**
 * Copyright (c) 2025 Bivex
 *
 * Author: Bivex
 * Available for contact via email: support@b-b.top
 * For up-to-date contact information:
 * https://github.com/bivex
 *
 * Created: 2025-12-23T06:02:45
 * Last Updated: 2025-12-23T06:13:12
 *
 * Licensed under the MIT License.
 * Commercial licensing available upon request.
 */

/**
 * Value Object: ContactInfo
 *
 * Represents contact information provided by a visitor during conversion.
 * Immutable value object with validation.
 */

export class ContactInfo {
  private readonly _email: string;
  private readonly _name: string | undefined;
  private readonly _message: string | undefined;
  private readonly _company: string | undefined;

  constructor(email: string, name?: string, message?: string, company?: string) {
    this.validateContactInfo(email, name, message, company);

    this._email = email.toLowerCase().trim();
    this._name = name?.trim();
    this._message = message?.trim();
    this._company = company?.trim();
  }

  // Getters
  get email(): string {
    return this._email;
  }

  get name(): string | undefined {
    return this._name;
  }

  get message(): string | undefined {
    return this._message;
  }

  get company(): string | undefined {
    return this._company;
  }

  // Value object equality
  equals(other: ContactInfo): boolean {
    return (
      this._email === other._email &&
      this._name === other._name &&
      this._message === other._message &&
      this._company === other._company
    );
  }

  // Business methods
  hasName(): boolean {
    return !!this._name;
  }

  hasMessage(): boolean {
    return !!this._message;
  }

  hasCompany(): boolean {
    return !!this._company;
  }

  getDisplayName(): string {
    return this._name ?? (this._email.split('@')[0] || this._email);
  }

  // Validation
  private validateContactInfo(
    email: string,
    name?: string,
    message?: string,
    company?: string
  ): void {
    if (!email || email.trim().length === 0) {
      throw new Error('Email is required');
    }

    // Basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      throw new Error('Invalid email format');
    }

    if (name && name.trim().length > 100) {
      throw new Error('Name cannot exceed 100 characters');
    }

    if (message && message.trim().length > 1000) {
      throw new Error('Message cannot exceed 1000 characters');
    }

    if (company && company.trim().length > 100) {
      throw new Error('Company name cannot exceed 100 characters');
    }
  }
}

/**
 * Copyright (c) 2025 Bivex
 *
 * Author: Bivex
 * Available for contact via email: support@b-b.top
 * For up-to-date contact information:
 * https://github.com/bivex
 *
 * Created: 2025-12-23T05:52:56
 * Last Updated: 2025-12-23T07:49:46
 *
 * Licensed under the MIT License.
 * Commercial licensing available upon request.
 */

/**
 * Value Object: Feature
 *
 * Represents a product feature with its description and category.
 * Value objects are immutable and have no identity.
 */

export enum FeatureCategory {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  MODERN_STACK = 'modern-stack',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  TYPE_SAFETY = 'type-safety',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ACCESSIBLE_UI = 'accessible-ui',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  PRODUCTION_READY = 'production-ready',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  DEVELOPER_EXPERIENCE = 'developer-experience'
}

export class Feature {
  private readonly _id: string;
  private readonly _name: string;
  private readonly _description: string;
  private readonly _category: FeatureCategory;
  private readonly _icon: string | undefined;
  private readonly _priority: number;

  constructor(
    id: string,
    name: string,
    description: string,
    category: FeatureCategory,
    icon?: string,
    priority: number = 0
  ) {
    this.validateFeatureData(id, name, description, category, priority);

    this._id = id;
    this._name = name;
    this._description = description;
    this._category = category;
    this._icon = icon;
    this._priority = priority;
  }

  // Getters
  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get category(): FeatureCategory {
    return this._category;
  }

  get icon(): string | undefined {
    return this._icon;
  }

  get priority(): number {
    return this._priority;
  }

  // Value object equality (based on all properties)
  equals(other: Feature): boolean {
    return (
      this._id === other._id &&
      this._name === other._name &&
      this._description === other._description &&
      this._category === other._category &&
      this._icon === other._icon &&
      this._priority === other._priority
    );
  }

  // Business methods
  isHighPriority(): boolean {
    return this._priority >= 8;
  }

  isMediumPriority(): boolean {
    return this._priority >= 5 && this._priority < 8;
  }

  isLowPriority(): boolean {
    return this._priority < 5;
  }

  // Validation
  private validateFeatureData(
    id: string,
    name: string,
    description: string,
    category: FeatureCategory,
    priority: number
  ): void {
    if (!id || id.trim().length === 0) {
      throw new Error('Feature id cannot be empty');
    }

    if (!name || name.trim().length === 0) {
      throw new Error('Feature name cannot be empty');
    }

    if (!description || description.trim().length === 0) {
      throw new Error('Feature description cannot be empty');
    }

    if (!Object.values(FeatureCategory).includes(category)) {
      throw new Error('Invalid feature category');
    }

    if (priority < 0 || priority > 10) {
      throw new Error('Feature priority must be between 0 and 10');
    }
  }
}

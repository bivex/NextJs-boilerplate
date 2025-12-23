/**
 * Copyright (c) 2025 Bivex
 *
 * Author: Bivex
 * Available for contact via email: support@b-b.top
 * For up-to-date contact information:
 * https://github.com/bivex
 *
 * Created: 2025-12-23T05:58:47
 * Last Updated: 2025-12-23T06:13:17
 *
 * Licensed under the MIT License.
 * Commercial licensing available upon request.
 */

/**
 * Domain Entity: Product
 *
 * Represents the NextBoilerplate product being marketed on the landing page.
 * This is a domain entity with identity and business rules.
 */

export class Product {
  private readonly _id: string;
  private readonly _name: string;
  private readonly _description: string;
  private readonly _version: string;
  private readonly _createdAt: Date;
  private _features: Feature[];

  constructor(
    id: string,
    name: string,
    description: string,
    version: string,
    features: Feature[] = []
  ) {
    this.validateProductData(name, description, version);

    this._id = id;
    this._name = name;
    this._description = description;
    this._version = version;
    this._createdAt = new Date();
    this._features = [...features];
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

  get version(): string {
    return this._version;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get features(): readonly Feature[] {
    return [...this._features];
  }

  // Business methods
  addFeature(feature: Feature): void {
    if (this.hasFeature(feature.id)) {
      throw new Error(`Feature with id ${feature.id} already exists`);
    }
    this._features.push(feature);
  }

  removeFeature(featureId: string): void {
    const index = this._features.findIndex(f => f.id === featureId);
    if (index === -1) {
      throw new Error(`Feature with id ${featureId} not found`);
    }
    this._features.splice(index, 1);
  }

  hasFeature(featureId: string): boolean {
    return this._features.some(f => f.id === featureId);
  }

  getFeaturesByCategory(category: FeatureCategory): Feature[] {
    return this._features.filter(f => f.category === category);
  }

  // Business rules validation
  private validateProductData(name: string, description: string, version: string): void {
    if (!name || name.trim().length === 0) {
      throw new Error('Product name cannot be empty');
    }

    if (!description || description.trim().length === 0) {
      throw new Error('Product description cannot be empty');
    }

    if (!version || version.trim().length === 0) {
      throw new Error('Product version cannot be empty');
    }

    // Version should follow semantic versioning pattern
    const versionPattern = /^\d+\.\d+\.\d+$/;
    if (!versionPattern.test(version)) {
      throw new Error('Product version must follow semantic versioning (x.y.z)');
    }
  }
}

import { Feature, FeatureCategory } from '../value-objects/Feature';

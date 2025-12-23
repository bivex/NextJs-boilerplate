/**
 * Copyright (c) 2025 Bivex
 *
 * Author: Bivex
 * Available for contact via email: support@b-b.top
 * For up-to-date contact information:
 * https://github.com/bivex
 *
 * Created: 2025-12-23T05:52:13
 * Last Updated: 2025-12-23T07:49:46
 *
 * Licensed under the MIT License.
 * Commercial licensing available upon request.
 */

/**
 * Presentation Page: LandingPage
 *
 * The main landing page component that showcases the NextBoilerplate product.
 * This component uses the domain-driven architecture through the useLandingPage hook.
 */

'use client';

import { Zap, ChevronDown, Star, Loader2 } from 'lucide-react';
import React, { useState, useCallback, memo, useMemo } from 'react';

import { ContactFormDto } from '../../application/dtos/VisitorDto';
import { AnalyticsEventType } from '../../domain/value-objects/AnalyticsEvent';
import { Button } from '../components/components';
import { useLandingPage } from '../hooks/useLandingPage';

// Type-safe event type helper
const asAnalyticsEventType = (value: string): AnalyticsEventType => {
  if (Object.values(AnalyticsEventType).includes(value as AnalyticsEventType)) {
    return value as AnalyticsEventType;
  }
  throw new Error(`Invalid AnalyticsEventType: ${value}`);
};

const LandingPage = memo(() => {
  const { product, isLoading, error, trackEngagement, convertVisitor } =
    useLandingPage();

  const [isConverting, setIsConverting] = useState(false);
  const [conversionResult, setConversionResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  // Memoize derived product values to avoid recalculation on every render
  const productDisplayName = useMemo(
    () => product?.name || 'NextBoilerplate',
    [product?.name]
  );
  const productDescription = useMemo(
    () =>
      product?.description ||
      'A modern Next.js starter template with TypeScript, Emotion, Radix UI, and production-ready tooling.',
    [product?.description]
  );

  const handleButtonClick = useCallback(
    (_buttonName: string) => {
      // Fire-and-forget: Don't wait for tracking to complete
      trackEngagement({
        type: asAnalyticsEventType('button_click'),
        elementName: _buttonName,
      }).catch(_err => {
        /* console.error('Tracking failed:', _err) */
      });
    },
    [trackEngagement]
  );

  const handleContactSubmit = useCallback(
    async (formData: ContactFormDto) => {
      setIsConverting(true);
      setConversionResult(null);

      try {
        const result = await convertVisitor(formData);

        setConversionResult({
          success: result.success,
          message: result.message,
        });

        if (result.success) {
          // Fire-and-forget tracking
          trackEngagement({
            type: asAnalyticsEventType('form_submit'),
            elementName: 'contact_form',
            metadata: { source: formData.source },
          }).catch(_err => {
            /* console.error('Tracking failed:', _err) */
          });
        }
      } catch {
        setConversionResult({
          success: false,
          message: 'An unexpected error occurred. Please try again.',
        });
      } finally {
        setIsConverting(false);
      }
    },
    [convertVisitor, trackEngagement]
  );

  const handleFeatureHover = useCallback(
    (_featureId: string, _featureName: string) => {
      // Fire-and-forget: Don't wait for tracking to complete
      trackEngagement({
        type: asAnalyticsEventType('scroll'),
        elementName: `feature_${_featureId}`,
        metadata: { featureName: _featureName },
      }).catch(_err => {
        /* console.error('Tracking failed:', _err) */
      });
    },
    [trackEngagement]
  );

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="text-center">
          <Loader2 className="mx-auto mb-4 h-8 w-8 animate-spin text-blue-600" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="mb-4 text-red-600">⚠️</div>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <BackgroundDecorations />
      <Navigation
        productName={productDisplayName}
        onButtonClick={handleButtonClick}
      />

      <div className="container relative z-10 mx-auto px-6 py-20">
        <HeroSection
          productName={productDisplayName.replace('Boilerplate', '')}
          productDescription={productDescription}
          onButtonClick={handleButtonClick}
        />
        <TechStackSection />

        {/* Interactive Demo */}
        <section id="components" className="mb-20">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Interactive Components
            </h2>
            <p className="mx-auto max-w-96 text-lg text-gray-600">
              Explore our component library built with Radix UI and Emotion
            </p>
          </div>

          <div className="mx-auto max-w-5xl">
            <div className="rounded-3xl border border-white/20 bg-white/80 p-8 shadow-xl backdrop-blur-sm md:p-12">
              <div className="mb-8 text-center">
                <h3 className="mb-2 text-2xl font-semibold text-gray-900">
                  Button Variants
                </h3>
                <p className="text-gray-600">
                  Different sizes and styles for various use cases
                </p>
              </div>

              <div className="mb-8 flex flex-wrap justify-center gap-4">
                <Button
                  variant="solid"
                  size="3"
                  className="shadow-md transition-shadow hover:shadow-lg"
                  onClick={() => handleButtonClick('demo_primary_small')}
                >
                  Primary Medium
                </Button>
                <Button
                  variant="solid"
                  size="3"
                  className="shadow-md transition-shadow hover:shadow-lg"
                  onClick={() => handleButtonClick('demo_primary_medium')}
                >
                  Primary Medium
                </Button>
                <Button
                  variant="solid"
                  size="3"
                  className="shadow-md transition-shadow hover:shadow-lg"
                  onClick={() => handleButtonClick('demo_primary_large')}
                >
                  Primary Large
                </Button>
              </div>

              <div className="mb-8 flex flex-wrap justify-center gap-4">
                <Button
                  variant="soft"
                  size="3"
                  className="shadow-md transition-shadow hover:shadow-lg"
                  onClick={() => handleButtonClick('demo_secondary')}
                >
                  Secondary
                </Button>
                <Button
                  variant="outline"
                  size="3"
                  className="border-2 shadow-md transition-shadow hover:shadow-lg"
                  onClick={() => handleButtonClick('demo_outline')}
                >
                  Outline
                </Button>
              </div>

              <div className="text-center">
                <ContactForm
                  onSubmit={handleContactSubmit}
                  isSubmitting={isConverting}
                  result={conversionResult}
                  onButtonClick={handleButtonClick}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <FeaturesSection
          product={product}
          onFeatureHover={handleFeatureHover}
        />

        {/* Footer */}
        <footer className="mt-20 border-t border-gray-200/50 pt-16">
          <div className="text-center">
            <div className="mb-4 flex items-center justify-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-blue-700">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                {product?.name || 'NextBoilerplate'}
              </span>
            </div>
            <p className="mx-auto mb-16 max-w-96 text-gray-600">
              Built with modern web technologies for enterprise applications.
              Open source and ready for production.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
              <a
                href="#"
                className="flex min-h-[44px] items-center rounded-md px-3 py-2 transition-colors hover:bg-gray-50 hover:text-gray-900"
                onClick={() => handleButtonClick('footer_documentation')}
              >
                Documentation
              </a>
              <a
                href="#"
                className="flex min-h-[44px] items-center rounded-md px-3 py-2 transition-colors hover:bg-gray-50 hover:text-gray-900"
                onClick={() => handleButtonClick('footer_github')}
              >
                GitHub
              </a>
              <a
                href="#"
                className="flex min-h-[44px] items-center rounded-md px-3 py-2 transition-colors hover:bg-gray-50 hover:text-gray-900"
                onClick={() => handleButtonClick('footer_support')}
              >
                Support
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
});

LandingPage.displayName = 'LandingPage';

export default LandingPage;

// Hero Section Component
const HeroSection = memo(
  ({
    productName,
    productDescription,
    onButtonClick,
  }: {
    productName: string;
    productDescription: string;
    onButtonClick: (_buttonName: string) => void;
  }) => {
    return (
      <header className="mb-20 text-center">
        <div className="mb-6 inline-flex items-center rounded-full bg-blue-100/80 px-4 py-2 text-sm font-medium text-blue-700 backdrop-blur-sm">
          <Star className="mr-2 h-4 w-4" />
          Enterprise-Ready Boilerplate
        </div>
        <h1 className="mb-6 bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-5xl font-bold leading-tight text-transparent md:text-7xl">
          {productName}
          <br />
          <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-4xl text-transparent md:text-6xl">
            Boilerplate
          </span>
        </h1>
        <p className="mx-auto mb-20 max-w-5xl text-xl leading-relaxed text-gray-600 md:text-2xl">
          {productDescription}
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="3"
            variant="solid"
            className="transform bg-gradient-to-r from-blue-500 to-blue-700 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:from-blue-600 hover:to-blue-800 hover:shadow-xl"
            onClick={() => onButtonClick('hero_get_started_free')}
          >
            Get Started Free
          </Button>
          <Button
            variant="outline"
            size="3"
            className="border-2 border-gray-300 transition-all duration-300 hover:border-blue-400 hover:bg-blue-50"
            onClick={() => onButtonClick('hero_view_documentation')}
          >
            View Documentation
          </Button>
        </div>
        <div className="mt-12 flex justify-center">
          <ChevronDown className="h-6 w-6 animate-bounce text-gray-400" />
        </div>
      </header>
    );
  }
);

HeroSection.displayName = 'HeroSection';

// Background Component
const BackgroundDecorations = memo(() => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-600/20 blur-3xl"></div>
    <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-tr from-indigo-400/20 to-pink-600/20 blur-3xl"></div>
    <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-gradient-to-r from-cyan-400/10 to-blue-600/10 blur-3xl"></div>
  </div>
));

BackgroundDecorations.displayName = 'BackgroundDecorations';

// Navigation Component
const Navigation = memo(
  ({
    productName,
    onButtonClick,
  }: {
    productName: string;
    onButtonClick: (_buttonName: string) => void;
  }) => (
    <nav className="relative z-10 border-b border-white/20 bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-blue-700">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">
              {productName}
            </span>
          </div>
          <div className="hidden items-center space-x-8 md:flex">
            <a
              href="#features"
              className="flex min-h-[44px] items-center rounded-md px-3 py-2 text-base font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
              onClick={() => onButtonClick('nav_features')}
            >
              Features
            </a>
            <a
              href="#components"
              className="flex min-h-[44px] items-center rounded-md px-3 py-2 text-base font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
              onClick={() => onButtonClick('nav_components')}
            >
              Components
            </a>
            <a
              href="#docs"
              className="flex min-h-[44px] items-center rounded-md px-3 py-2 text-base font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
              onClick={() => onButtonClick('nav_docs')}
            >
              Docs
            </a>
            <Button
              size="3"
              variant="solid"
              className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800"
              onClick={() => onButtonClick('nav_get_started')}
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
);

Navigation.displayName = 'Navigation';

// Tech Stack Section Component
const TechStackSection = memo(() => (
  <section className="mb-20">
    <div className="mb-16 text-center">
      <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
        Built with Modern Tech Stack
      </h2>
      <p className="mx-auto max-w-96 text-lg text-gray-600">
        Built with the latest versions of modern web technologies
      </p>
    </div>
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
      <div className="group transform rounded-2xl border border-white/20 bg-white/80 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 transition-transform duration-300 group-hover:scale-110">
          <span className="text-2xl">⚛️</span>
        </div>
        <h3 className="mb-1 font-semibold text-gray-900">Next.js</h3>
        <p className="mb-2 text-sm text-gray-600">16.1.1</p>
        <p className="text-sm text-gray-500">React Framework</p>
      </div>

      <div className="group transform rounded-2xl border border-white/20 bg-white/80 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 transition-transform duration-300 group-hover:scale-110">
          <span className="text-2xl">🎨</span>
        </div>
        <h3 className="mb-1 font-semibold text-gray-900">Emotion</h3>
        <p className="mb-2 text-sm text-gray-600">11.14.0</p>
        <p className="text-sm text-gray-500">CSS-in-JS</p>
      </div>

      <div className="group transform rounded-2xl border border-white/20 bg-white/80 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 transition-transform duration-300 group-hover:scale-110">
          <span className="text-2xl">🎛️</span>
        </div>
        <h3 className="mb-1 font-semibold text-gray-900">Radix UI</h3>
        <p className="mb-2 text-sm text-gray-600">1.x</p>
        <p className="text-sm text-gray-500">Accessible Components</p>
      </div>

      <div className="group transform rounded-2xl border border-white/20 bg-white/80 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-red-500 transition-transform duration-300 group-hover:scale-110">
          <span className="text-2xl">🐰</span>
        </div>
        <h3 className="mb-1 font-semibold text-gray-900">Bun</h3>
        <p className="mb-2 text-sm text-gray-600">1.0.0+</p>
        <p className="text-sm text-gray-500">Fast Runtime</p>
      </div>
    </div>
  </section>
));

TechStackSection.displayName = 'TechStackSection';

// Features Section Component
const FeaturesSection = memo(
  ({
    product,
    onFeatureHover,
  }: {
    product: {
      featuredFeatures?: Array<{
        id: string;
        name: string;
        description: string;
        icon?: string | undefined;
      }>;
    } | null;
    onFeatureHover: (_featureId: string, _featureName: string) => void;
  }) => (
    <section id="features" className="mb-20">
      <div className="mb-16 text-center">
        <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
          Production-Ready Features
        </h2>
        <p className="mx-auto max-w-5xl text-lg text-gray-600">
          Everything you need to build modern web applications with best
          practices
        </p>
      </div>

      <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-3">
        {product?.featuredFeatures?.map(feature => (
          <div
            key={feature.id}
            className="group transform rounded-3xl border border-white/20 bg-white/80 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            onMouseEnter={() => onFeatureHover(feature.id, feature.name)}
          >
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 transition-transform duration-300 group-hover:scale-110">
              <span className="text-2xl">{feature.icon || '✨'}</span>
            </div>
            <h3 className="mb-3 text-xl font-semibold text-gray-900">
              {feature.name}
            </h3>
            <p className="leading-relaxed text-gray-600">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
);

FeaturesSection.displayName = 'FeaturesSection';

// Contact Form Component
interface ContactFormProps {
  onSubmit: (_data: ContactFormDto) => Promise<void>;
  isSubmitting: boolean;
  result: { success: boolean; message: string } | null;
  onButtonClick: (_buttonName: string) => void;
}

const ContactForm = memo(
  ({ onSubmit, isSubmitting, result, onButtonClick }: ContactFormProps) => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      message: '',
      company: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      await onSubmit({
        ...formData,
        source: 'contact_form',
      });
    };

    const handleChange = (field: string, value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
      <div className="mx-auto max-w-80">
        <Button
          onClick={() => onButtonClick('open_contact_dialog')}
          className="transform bg-gradient-to-r from-purple-500 to-blue-600 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:from-purple-600 hover:to-blue-700 hover:shadow-xl"
          size="3"
          variant="solid"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>🚀 Open Contact Form</>
          )}
        </Button>

        {result && (
          <div
            className={`mt-4 rounded-lg p-4 ${
              result.success
                ? 'border border-green-200 bg-green-50 text-green-800'
                : 'border border-red-200 bg-red-50 text-red-800'
            }`}
          >
            <p className="text-sm">{result.message}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <input
              type="text"
              placeholder="Your Name (optional)"
              value={formData.name}
              onChange={e => handleChange('name', e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <input
              type="email"
              placeholder="Your Email *"
              value={formData.email}
              onChange={e => handleChange('email', e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <textarea
              placeholder="Your Message (optional)"
              value={formData.message}
              onChange={e => handleChange('message', e.target.value)}
              rows={3}
              className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Company (optional)"
              value={formData.company}
              onChange={e => handleChange('company', e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || !formData.email.trim()}
            variant="solid"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
        </form>
      </div>
    );
  }
);

ContactForm.displayName = 'ContactForm';

/**
 * Copyright (c) 2025 Bivex
 *
 * Author: Bivex
 * Available for contact via email: support@b-b.top
 * For up-to-date contact information:
 * https://github.com/bivex
 *
 * Created: 2025-12-23T05:52:13
 * Last Updated: 2025-12-23T07:13:56
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

import { useState, useCallback, memo, lazy, Suspense, useMemo } from 'react';
import { Button } from '../components/components';
import { SimpleThemeSwitcher } from '../components/components/ThemeSwitcher';
import { useLandingPage } from '../hooks/useLandingPage';
import { ContactFormDto } from '../../application/dtos/VisitorDto';
import { AnalyticsEventType } from '../../domain/value-objects/AnalyticsEvent';
import { Zap, Shield, Users, ChevronDown, Star, Loader2 } from 'lucide-react';

// Type-safe event type helper
const asAnalyticsEventType = (value: string): AnalyticsEventType => {
  if (Object.values(AnalyticsEventType).includes(value as AnalyticsEventType)) {
    return value as AnalyticsEventType;
  }
  throw new Error(`Invalid AnalyticsEventType: ${value}`);
};

const LandingPage = memo(function LandingPage() {
  const {
    product,
    visitor,
    isLoading,
    error,
    trackEngagement,
    convertVisitor
  } = useLandingPage();

  const [isConverting, setIsConverting] = useState(false);
  const [conversionResult, setConversionResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  // Memoize derived product values to avoid recalculation on every render
  const productDisplayName = useMemo(() => product?.name || 'NextBoilerplate', [product?.name]);
  const productDescription = useMemo(() =>
    product?.description || 'A modern Next.js starter template with TypeScript, Emotion, Radix UI, and production-ready tooling.',
    [product?.description]
  );

  const handleButtonClick = useCallback((buttonName: string) => {
    // Fire-and-forget: Don't wait for tracking to complete
    trackEngagement({
      type: asAnalyticsEventType('button_click'),
      elementName: buttonName
    }).catch(err => console.error('Tracking failed:', err));
  }, [trackEngagement]);

  const handleContactSubmit = useCallback(async (formData: ContactFormDto) => {
    setIsConverting(true);
    setConversionResult(null);

    try {
      const result = await convertVisitor(formData);

      setConversionResult({
        success: result.success,
        message: result.message
      });

      if (result.success) {
        // Fire-and-forget tracking
        trackEngagement({
          type: asAnalyticsEventType('form_submit'),
          elementName: 'contact_form',
          metadata: { source: formData.source }
        }).catch(err => console.error('Tracking failed:', err));
      }
    } catch (err) {
      setConversionResult({
        success: false,
        message: 'An unexpected error occurred. Please try again.'
      });
    } finally {
      setIsConverting(false);
    }
  }, [convertVisitor, trackEngagement]);

  const handleFeatureHover = useCallback((featureId: string, featureName: string) => {
    // Fire-and-forget: Don't wait for tracking to complete
    trackEngagement({
      type: asAnalyticsEventType('scroll'),
      elementName: `feature_${featureId}`,
      metadata: { featureName }
    }).catch(err => console.error('Tracking failed:', err));
  }, [trackEngagement]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">⚠️</div>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      <BackgroundDecorations />
      <Navigation productName={productDisplayName} onButtonClick={handleButtonClick} />

      <div className="relative z-10 container mx-auto px-8 py-12">
        <HeroSection
        productName={productDisplayName.replace('Boilerplate', '')}
        productDescription={productDescription}
        onButtonClick={handleButtonClick}
      />
        <TechStackSection />

        {/* Interactive Demo */}
        <section id="components" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Interactive Components
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              Explore our component library built with Radix UI and Emotion
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 md:p-12">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Button Variants</h3>
                <p className="text-gray-600">Different sizes and styles for various use cases</p>
              </div>

              <div className="flex flex-wrap gap-4 justify-center mb-8">
                <Button
                  variant="solid"
                  size="2"
                  className="shadow-md hover:shadow-lg transition-shadow"
                  onClick={() => handleButtonClick('demo_primary_small')}
                >
                  Primary Medium
                </Button>
                <Button
                  variant="solid"
                  size="2"
                  className="shadow-md hover:shadow-lg transition-shadow"
                  onClick={() => handleButtonClick('demo_primary_medium')}
                >
                  Primary Medium
                </Button>
                <Button
                  variant="solid"
                  size="3"
                  className="shadow-md hover:shadow-lg transition-shadow"
                  onClick={() => handleButtonClick('demo_primary_large')}
                >
                  Primary Large
                </Button>
              </div>

              <div className="flex flex-wrap gap-4 justify-center mb-8">
                <Button
                  variant="soft"
                  size="2"
                  className="shadow-md hover:shadow-lg transition-shadow"
                  onClick={() => handleButtonClick('demo_secondary')}
                >
                  Secondary
                </Button>
                <Button
                  variant="outline"
                  size="2"
                  className="shadow-md hover:shadow-lg transition-shadow border-2"
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
        <FeaturesSection product={product} onFeatureHover={handleFeatureHover} />

        {/* Footer */}
        <footer className="mt-20 pt-12 border-t border-gray-200/50">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                {product?.name || 'NextBoilerplate'}
              </span>
            </div>
            <p className="text-gray-600 mb-12 max-w-3xl mx-auto">
              Built with modern web technologies for enterprise applications.
              Open source and ready for production.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
              <a
                href="#"
                className="hover:text-gray-900 transition-colors px-3 py-2 rounded-md hover:bg-gray-50 min-h-[44px] flex items-center"
                onClick={() => handleButtonClick('footer_documentation')}
              >
                Documentation
              </a>
              <a
                href="#"
                className="hover:text-gray-900 transition-colors px-3 py-2 rounded-md hover:bg-gray-50 min-h-[44px] flex items-center"
                onClick={() => handleButtonClick('footer_github')}
              >
                GitHub
              </a>
              <a
                href="#"
                className="hover:text-gray-900 transition-colors px-3 py-2 rounded-md hover:bg-gray-50 min-h-[44px] flex items-center"
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
const HeroSection = memo(({
  productName,
  productDescription,
  onButtonClick
}: {
  productName: string;
  productDescription: string;
  onButtonClick: (buttonName: string) => void;
}) => {

  return (
  <header className="text-center mb-20">
    <div className="inline-flex items-center px-4 py-2 bg-blue-100/80 backdrop-blur-sm rounded-full text-blue-700 text-sm font-medium mb-6">
      <Star className="w-4 h-4 mr-2" />
      Enterprise-Ready Boilerplate
    </div>
    <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-6 leading-tight">
      {productName}
      <br />
      <span className="text-4xl md:text-6xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
        Boilerplate
      </span>
    </h1>
    <p className="text-xl md:text-2xl text-gray-600 max-w-5xl mx-auto mb-16 leading-relaxed">
      {productDescription}
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <Button
        size="3"
        variant="solid"
        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        onClick={() => onButtonClick('hero_get_started_free')}
      >
        Get Started Free
      </Button>
      <Button
        variant="outline"
        size="3"
        className="border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300"
        onClick={() => onButtonClick('hero_view_documentation')}
      >
        View Documentation
      </Button>
    </div>
    <div className="mt-12 flex justify-center">
      <ChevronDown className="w-6 h-6 text-gray-400 animate-bounce" />
    </div>
  </header>
  );
});

HeroSection.displayName = 'HeroSection';

// Background Component
const BackgroundDecorations = memo(() => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-pink-600/20 rounded-full blur-3xl"></div>
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl"></div>
  </div>
));

BackgroundDecorations.displayName = 'BackgroundDecorations';

// Navigation Component
const Navigation = memo(({
  productName,
  onButtonClick
}: {
  productName: string;
  onButtonClick: (buttonName: string) => void;
}) => (
  <nav className="relative z-10 border-b border-white/20 bg-white/80 backdrop-blur-sm">
    <div className="container mx-auto px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">
            {productName}
          </span>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <a
            href="#features"
            className="text-gray-600 hover:text-gray-900 transition-colors px-3 py-2 rounded-md hover:bg-gray-50 text-base font-medium min-h-[44px] flex items-center"
            onClick={() => onButtonClick('nav_features')}
          >
            Features
          </a>
          <a
            href="#components"
            className="text-gray-600 hover:text-gray-900 transition-colors px-3 py-2 rounded-md hover:bg-gray-50 text-base font-medium min-h-[44px] flex items-center"
            onClick={() => onButtonClick('nav_components')}
          >
            Components
          </a>
          <a
            href="#docs"
            className="text-gray-600 hover:text-gray-900 transition-colors px-3 py-2 rounded-md hover:bg-gray-50 text-base font-medium min-h-[44px] flex items-center"
            onClick={() => onButtonClick('nav_docs')}
          >
            Docs
          </a>
          <Button
            size="3"
            variant="solid"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            onClick={() => onButtonClick('nav_get_started')}
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  </nav>
));

Navigation.displayName = 'Navigation';

// Tech Stack Section Component
const TechStackSection = memo(() => (
  <section className="mb-20">
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Built with Modern Tech Stack
      </h2>
      <p className="text-lg text-gray-600 max-w-4xl mx-auto">
        Built with the latest versions of modern web technologies
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
      <div className="group bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/20">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
          <span className="text-2xl">⚛️</span>
        </div>
        <h3 className="font-semibold text-gray-900 mb-1">Next.js</h3>
        <p className="text-sm text-gray-600 mb-2">16.1.1</p>
        <p className="text-sm text-gray-500">React Framework</p>
      </div>

      <div className="group bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/20">
        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
          <span className="text-2xl">🎨</span>
        </div>
        <h3 className="font-semibold text-gray-900 mb-1">Emotion</h3>
        <p className="text-sm text-gray-600 mb-2">11.14.0</p>
        <p className="text-sm text-gray-500">CSS-in-JS</p>
      </div>

      <div className="group bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/20">
        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
          <span className="text-2xl">🎛️</span>
        </div>
        <h3 className="font-semibold text-gray-900 mb-1">Radix UI</h3>
        <p className="text-sm text-gray-600 mb-2">1.x</p>
        <p className="text-sm text-gray-500">Accessible Components</p>
      </div>

      <div className="group bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/20">
        <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
          <span className="text-2xl">🐰</span>
        </div>
        <h3 className="font-semibold text-gray-900 mb-1">Bun</h3>
        <p className="text-sm text-gray-600 mb-2">1.0.0+</p>
        <p className="text-sm text-gray-500">Fast Runtime</p>
      </div>
    </div>
  </section>
));

TechStackSection.displayName = 'TechStackSection';

// Features Section Component
const FeaturesSection = memo(({
  product,
  onFeatureHover
}: {
  product: { featuredFeatures?: Array<{ id: string; name: string; description: string; icon?: string | undefined }> } | null;
  onFeatureHover: (featureId: string, featureName: string) => void;
}) => (
  <section id="features" className="mb-20">
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Production-Ready Features
      </h2>
      <p className="text-lg text-gray-600 max-w-5xl mx-auto">
        Everything you need to build modern web applications with best practices
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-12 max-w-7xl mx-auto">
      {product?.featuredFeatures?.map((feature) => (
        <div
          key={feature.id}
          className="group bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/20"
          onMouseEnter={() => onFeatureHover(feature.id, feature.name)}
        >
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <span className="text-2xl">{feature.icon || '✨'}</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.name}</h3>
          <p className="text-gray-600 leading-relaxed">{feature.description}</p>
        </div>
      ))}
    </div>
  </section>
));

FeaturesSection.displayName = 'FeaturesSection';

// Contact Form Component
interface ContactFormProps {
  onSubmit: (data: ContactFormDto) => Promise<void>;
  isSubmitting: boolean;
  result: { success: boolean; message: string } | null;
  onButtonClick: (buttonName: string) => void;
}

const ContactForm = memo(function ContactForm({ onSubmit, isSubmitting, result, onButtonClick }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    company: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await onSubmit({
      ...formData,
      source: 'contact_form'
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-sm mx-auto">
      <Button
        onClick={() => onButtonClick('open_contact_dialog')}
        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        size="3"
        variant="solid"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            🚀 Open Contact Form
          </>
        )}
      </Button>

      {result && (
        <div className={`mt-4 p-4 rounded-lg ${
          result.success
            ? 'bg-green-50 border border-green-200 text-green-800'
            : 'bg-red-50 border border-red-200 text-red-800'
        }`}>
          <p className="text-sm">{result.message}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <input
            type="text"
            placeholder="Your Name (optional)"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <input
            type="email"
            placeholder="Your Email *"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <textarea
            placeholder="Your Message (optional)"
            value={formData.message}
            onChange={(e) => handleChange('message', e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Company (optional)"
            value={formData.company}
            onChange={(e) => handleChange('company', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting || !formData.email.trim()}
          variant="solid"
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
      </form>
    </div>
  );
});

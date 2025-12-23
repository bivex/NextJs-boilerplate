/**
 * Copyright (c) 2025 Bivex
 *
 * Author: Bivex
 * Available for contact via email: support@b-b.top
 * For up-to-date contact information:
 * https://github.com/bivex
 *
 * Created: 2025-12-23T06:12:44
 * Last Updated: 2025-12-23T07:56:53
 *
 * Licensed under the MIT License.
 * Commercial licensing available upon request.
 */

// jest.polyfills.js

// Polyfills for jsdom environment

// crypto
const crypto = require('crypto').webcrypto;
global.crypto = crypto;

// fetch
const fetch = require('node-fetch');
global.fetch = fetch;
global.Request = fetch.Request;
global.Response = fetch.Response;
global.Headers = fetch.Headers;

// TextEncoder/TextDecoder
const { TextDecoder, TextEncoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// URL
const { URL, URLSearchParams } = require('url');
global.URL = URL;
global.URLSearchParams = URLSearchParams;

// Performance API
global.performance = {
  now: () => Date.now(),
  mark: () => {},
  measure: () => {},
  getEntriesByName: () => [],
  getEntriesByType: () => [],
  clearMarks: () => {},
  clearMeasures: () => {},
};

// Mock localStorage and sessionStorage
const createMockStorage = () => {
  let storage = {};
  return {
    getItem: key => storage[key] || null,
    setItem: (key, value) => {
      storage[key] = value.toString();
    },
    removeItem: key => {
      delete storage[key];
    },
    clear: () => {
      storage = {};
    },
    get length() {
      return Object.keys(storage).length;
    },
    key: index => {
      const keys = Object.keys(storage);
      return keys[index] || null;
    },
  };
};

global.localStorage = createMockStorage();
global.sessionStorage = createMockStorage();

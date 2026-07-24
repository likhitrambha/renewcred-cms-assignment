import { describe, it, expect } from 'vitest';
import { createSlug } from '../utils/slug.js';

describe('createSlug', () => {
  it('creates a clean slug from title', () => {
    expect(createSlug('Hello World!')).toBe('hello-world');
  });
});

import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BlockRenderer } from './BlockRenderer';

describe('BlockRenderer', () => {
  it('renders hero content', () => {
    render(<BlockRenderer block={{ type: 'hero', content: { title: 'Hello', subtitle: 'World' } }} />);
    expect(screen.getByText('Hello')).toBeTruthy();
  });
});

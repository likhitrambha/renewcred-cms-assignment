import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import LoginPage from './page';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() })
}));

vi.mock('react-redux', async () => {
  const actual = await vi.importActual<typeof import('react-redux')>('react-redux');
  return {
    ...actual,
    useDispatch: () => vi.fn()
  };
});

describe('LoginPage', () => {
  it('renders the admin login heading', () => {
    render(<LoginPage />);
    expect(screen.getByText('Admin Login')).toBeTruthy();
  });
});

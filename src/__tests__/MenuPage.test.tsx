import React from 'react';
import { render, screen } from '@testing-library/react';
import MenuPage from '../pages/MenuPage';

// Mock fetch for menu items
beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([]),
    })
  ) as jest.Mock;
});
afterAll(() => {
  jest.resetAllMocks();
});

describe('MenuPage', () => {
  it('renders loading state initially', () => {
    render(<MenuPage />);
    expect(screen.getByText(/loading menu/i)).toBeInTheDocument();
  });

  it('renders menu page without crashing', async () => {
    render(<MenuPage />);
    expect(await screen.findByText(/our menu/i)).toBeInTheDocument();
  });
});

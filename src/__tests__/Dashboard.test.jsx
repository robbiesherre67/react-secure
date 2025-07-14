import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ username: 'alice' }),
    })
  );
});

test('renders Dashboard welcome message', async () => {
  render(
    <MemoryRouter>
      <Dashboard />
    </MemoryRouter>
  );
  const greeting = await screen.findByText(/welcome, alice/i);
  expect(greeting).toBeInTheDocument();
});

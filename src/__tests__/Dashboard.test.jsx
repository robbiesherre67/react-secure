// src/__tests__/Dashboard.test.jsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
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

test('renders Dashboard heading and welcome', async () => {
  render(
    <MemoryRouter>
      <Dashboard />
    </MemoryRouter>
  );
  // wait for the greeting to appear
  await waitFor(() =>
    expect(screen.getByText(/welcome, alice/i)).toBeInTheDocument()
  );
});

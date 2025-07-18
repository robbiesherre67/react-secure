// src/__tests__/PrivateRoute.test.jsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import PrivateRoute from '../components/PrivateRoute';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

// polyfill fetch in this file if not already done in jest.setup.js
beforeAll(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  fetch.mockReset();
});

function TestApp({ fetchResponse }) {
  fetch.mockResolvedValueOnce({
    ok: fetchResponse.ok,
    json: () => Promise.resolve({ authenticated: fetchResponse.authenticated })
  });

  return (
    <MemoryRouter initialEntries={['/secret']}>
      <Routes>
        <Route
          path="/secret"
          element={
            <PrivateRoute>
              <div data-testid="protected">Protected!</div>
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<div data-testid="login-page">Login Page</div>} />
      </Routes>
    </MemoryRouter>
  );
}

test('renders children when checkAuth returns authenticated=true', async () => {
  render(<TestApp fetchResponse={{ ok: true, authenticated: true }} />);
  await waitFor(() => {
    expect(screen.getByTestId('protected')).toBeInTheDocument();
  });
});

test('redirects to /login when not authenticated', async () => {
  render(<TestApp fetchResponse={{ ok: false, authenticated: false }} />);
  // We should eventually see the login page text
  await waitFor(() => {
    expect(screen.getByTestId('login-page')).toBeInTheDocument();
  });
});

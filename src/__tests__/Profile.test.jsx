// src/__tests__/Profile.test.jsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Profile from '../pages/Profile';

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ username: 'bob' }),
    })
  );
});

test('renders Profile heading and username input', async () => {
  render(
    <MemoryRouter>
      <Profile />
    </MemoryRouter>
  );
  // wait until the input is populated
  await waitFor(() =>
    expect(screen.getByDisplayValue('bob')).toBeInTheDocument()
  );
});

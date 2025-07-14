import React from 'react';
import { render, screen } from '@testing-library/react';
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

test('renders Profile username input', async () => {
  render(
    <MemoryRouter>
      <Profile />
    </MemoryRouter>
  );
  const input = await screen.findByDisplayValue('bob');
  expect(input).toBeInTheDocument();
});

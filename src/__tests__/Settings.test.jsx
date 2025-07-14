import React from 'react';
import { render, screen } from '@testing-library/react';
import Settings from '../pages/Settings';

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ notificationEmail: 'me@example.com' }),
    })
  );
});

test('renders Settings email input', async () => {
  render(<Settings />);
  const input = await screen.findByDisplayValue('me@example.com');
  expect(input).toBeInTheDocument();
});

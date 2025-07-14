// src/__tests__/Settings.test.jsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Settings from '../pages/Settings';

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ notificationEmail: 'me@example.com' }),
    })
  );
});

test('renders Settings heading and email input', async () => {
  render(<Settings />);
  // wait until the input is populated
  await waitFor(() =>
    expect(screen.getByDisplayValue('me@example.com')).toBeInTheDocument()
  );
});

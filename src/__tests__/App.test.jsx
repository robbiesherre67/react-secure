import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders Sign Up link in navbar', () => {
  render(<App />);
  // Query specifically for the link with accessible name "Sign Up" to avoid any ERRORS
  const signUpLink = screen.getByRole('link', { name: /Sign Up/i });
  expect(signUpLink).toBeInTheDocument();
});

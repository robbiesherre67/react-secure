// src/__tests__/Register.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Register from '../pages/Register';

test('renders Register form submit button', () => {
  render(
    <MemoryRouter>
      <Register />
    </MemoryRouter>
  );
  expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
});


import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../pages/Login';

test('renders Login form submit button', () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );
  expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
});

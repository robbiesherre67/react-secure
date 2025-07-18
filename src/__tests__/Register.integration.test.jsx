import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import toast from 'react-hot-toast';
import Register from '../pages/Register';

// Mock navigation
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

beforeEach(() => {
  mockNavigate.mockReset();
  global.fetch = jest.fn();
  jest.spyOn(toast, 'error').mockImplementation(() => {});
});

afterEach(() => {
  toast.error.mockRestore();
});

test('successful registration calls navigate("/login")', async () => {
  global.fetch.mockResolvedValueOnce({
    ok: true,
    status: 201,
    json: async () => ({ success: 'User registered' }),
  });

  render(
    <MemoryRouter>
      <Register />
    </MemoryRouter>
  );

  await userEvent.type(screen.getByLabelText(/username/i), 'newuser');
  await userEvent.type(screen.getByLabelText(/password/i), 'MyPass123!');
  await userEvent.click(screen.getByRole('button', { name: /sign up/i }));

  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledWith(
      '/backend/register.php',
      expect.objectContaining({
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'newuser', password: 'MyPass123!' })
      })
    );
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });
});

test('failed registration calls toast.error()', async () => {
  global.fetch.mockResolvedValueOnce({
    ok: false,
    status: 400,
    json: async () => ({ error: 'Username taken' }),
  });

  render(
    <MemoryRouter>
      <Register />
    </MemoryRouter>
  );

  await userEvent.type(screen.getByLabelText(/username/i), 'takenuser');
  // use an 8+ char password so zod validation passes
  await userEvent.type(screen.getByLabelText(/password/i), 'ValidPass1');
  await userEvent.click(screen.getByRole('button', { name: /sign up/i }));

  await waitFor(() => {
    expect(toast.error).toHaveBeenCalledWith('Username taken');
  });
});
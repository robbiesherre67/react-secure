import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import toast from 'react-hot-toast';
import Login from '../pages/Login';

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

test('successful login calls navigate("/dashboard")', async () => {
  global.fetch.mockResolvedValueOnce({
    ok: true,
    status: 200,
    json: async () => ({ success: true }),
  });

  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  await userEvent.type(screen.getByLabelText(/username/i), 'existing');
  await userEvent.type(screen.getByLabelText(/password/i), 'CorrectPass!');
  userEvent.click(screen.getByRole('button', { name: /log in/i }));

  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledWith(
      '/backend/login.php',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'existing', password: 'CorrectPass!' })
      })
    );
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });
});

test('failed login calls toast.error()', async () => {
  global.fetch.mockResolvedValueOnce({
    ok: false,
    status: 401,
    json: async () => ({ error: 'Bad creds' }),
  });

  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  await userEvent.type(screen.getByLabelText(/username/i), 'wrong');
  await userEvent.type(screen.getByLabelText(/password/i), 'wrongpass');
  userEvent.click(screen.getByRole('button', { name: /log in/i }));

  await waitFor(() => {
    expect(toast.error).toHaveBeenCalledWith('Bad creds');
  });
});

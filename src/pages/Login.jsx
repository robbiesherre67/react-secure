import React, { useState } from 'react';
import { useForm }          from 'react-hook-form';
import { zodResolver }      from '@hookform/resolvers/zod';
import { authSchema }       from '../utils/validation';
import { useNavigate, Link }from 'react-router-dom';
import toast               from 'react-hot-toast';

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(authSchema)
  });

  const onSubmit = async data => {
    try {
      const res = await fetch('/backend/login.php', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const payload = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(payload.error || 'Login failed');
      }

      // success: mark logged in and redirect
      localStorage.setItem('isLoggedIn', 'true');
      toast.success('Logged in successfully!');
      navigate('/dashboard');
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-200 p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-extrabold text-center text-green-700 mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Username Field */}
          <div>
            <label htmlFor="username" className="block text-gray-700">
              Username
            </label>
            <input
              id="username"
              type="text"
              {...register('username')}
              className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 px-4 py-3
                         focus:border-green-400 focus:ring-2 focus:ring-green-200 transition"
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-600">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="relative">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 px-4 py-3 
                         focus:border-green-400 focus:ring-2 focus:ring-green-200 transition pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(v => !v)}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold
                       hover:bg-green-700 active:scale-95 transition-transform disabled:opacity-50"
          >
            {isSubmitting ? 'Logging In…' : 'Log In'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Need an account?{' '}
          <Link to="/register" className="font-medium text-green-600 hover:underline">
            Sign up now
          </Link>
        </p>
      </div>
    </div>
  );
}

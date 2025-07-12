import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const { pathname } = useLocation();
  const linkClass = path =>
    `px-3 py-2 rounded-md font-medium ${
      pathname === path
        ? 'bg-blue-700 text-white'
        : 'text-gray-700 hover:bg-gray-100'
    }`;

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/logo.png" alt="ReactSecure Logo" className="h-200 w-500" />
            <span className="text-2xl font-bold text-blue-600">SECURE</span>
          </Link>
          <div className="flex space-x-2">
            <Link to="/dashboard" className={linkClass('/dashboard')}>
              Dashboard
            </Link>
            <Link to="/profile" className={linkClass('/profile')}>
              Profile
            </Link>
            <Link to="/settings" className={linkClass('/settings')}>
              Settings
            </Link>
            <Link to="/register" className={linkClass('/register')}>
              Sign Up
            </Link>
            <Link to="/login"    className={linkClass('/login')}>
              Log In
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

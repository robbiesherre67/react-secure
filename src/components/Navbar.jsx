// src/components/Navbar.jsx
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
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
            <img alt="Logo" className="h-100 w-100" src="/logo.png" />
            <span className="text-2xl font-bold text-blue-600">ReactSecure</span>
          </Link>
          <div className="flex space-x-2 items-center">
            <Link to="/dashboard" className={linkClass('/dashboard')}>
              Dashboard
            </Link>
            <Link to="/profile" className={linkClass('/profile')}>
              Profile
            </Link>
            <Link to="/settings" className={linkClass('/settings')}>
              Settings
            </Link>
            { /* Log Out */ }
            <button
              onClick={async () => {
                await fetch('/backend/logout.php', { credentials: 'include' });
                localStorage.removeItem('isLoggedIn');
                toast.success('Logged out');
                navigate('/login');
              }}
              className="px-3 py-2 rounded-md font-medium text-red-600 hover:bg-gray-100"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
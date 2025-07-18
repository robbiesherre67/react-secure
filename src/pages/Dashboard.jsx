import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch('/backend/user.php', {
          credentials: 'include',    // ← ensure session cookie is sent
        });
        console.log('user.php status:', res.status);
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error || 'Not authenticated');
        }
        const data = await res.json();
        console.log('user data:', data);
        setUser(data);
      } catch (e) {
        console.error('Dashboard load error:', e.message);
        setError(e.message);
        navigate('/login');
      }
    }
    loadUser();
  }, [navigate]);

  // Show a loading or error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading your info…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow">
        <h1 className="text-4xl font-bold mb-4">Welcome, {user.username}!</h1>
        <p className="text-gray-600 mb-6">
          You joined on {new Date(user.created_at).toLocaleDateString()}.
        </p>

        {/* Add a Logout button */}
        <button
          onClick={async () => {
            await fetch('/backend/logout.php', {
              credentials: 'include',
            });
            navigate('/login');
          }}
          className="mt-4 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

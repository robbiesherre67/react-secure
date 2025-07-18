import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [authed,  setAuthed]  = useState(false);

  useEffect(() => {
    fetch('/backend/checkAuth.php', {
      credentials: 'include'
    })
      .then(res => res.json().then(data => ({ ok: res.ok, data })))
      .then(({ ok, data }) => {
        setAuthed(ok && data.authenticated);
      })
      .catch(() => setAuthed(false))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading…</div>;
  return authed ? children : <Navigate to="/login" replace />;
}

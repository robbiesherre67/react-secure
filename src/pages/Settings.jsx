import React from 'react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function Settings() {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/settings.php', { credentials: 'include' })
      .then(async res => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || 'Failed to load settings');
        setSettings(data);
      })
      .catch(err => toast.error(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = e => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSave = async e => {
    e.preventDefault();
    try {
      const res = await fetch('/api/settings.php', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Save failed');
      toast.success(data.message || 'Settings saved!');
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading settings…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow">
        <h1 className="text-2xl font-bold mb-4">Settings</h1>

        <form onSubmit={handleSave} className="space-y-4">
          {/* Example setting: notification email */}
          <label className="block">
            <span className="text-gray-700">Notification Email</span>
            <input
              name="notificationEmail"
              value={settings.notificationEmail || ''}
              onChange={handleChange}
              className="mt-1 block w-full border rounded px-3 py-2"
            />
          </label>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Save Settings
          </button>
        </form>
      </div>
    </div>
  );
}

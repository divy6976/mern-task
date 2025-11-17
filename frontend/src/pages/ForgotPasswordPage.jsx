import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiLock, FiMail } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import Alert from '../components/Alert.jsx';
import AuthShell from '../components/AuthShell.jsx';

const ForgotPasswordPage = () => {
  const { forgotPassword, loading } = useAuth();
  const [form, setForm] = useState({
    email: '',
    newPassword: '',
  });
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    if (!alert) return undefined;
    const timer = setTimeout(() => setAlert(null), 4000);
    return () => clearTimeout(timer);
  }, [alert]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await forgotPassword(form);
      setAlert({ type: 'success', message: res.message || 'Password reset!' });
      toast.success('Password updated. Use it next time you log in.');
    } catch (error) {
      setAlert({ type: 'error', message: error.message });
      toast.error(error.message);
    }
  };

  return (
    <AuthShell
      badge="Need access?"
      title="Reset your credentials"
      subtitle="Securely refresh your password and jump right back into the feed."
      helperLink={{ href: '/login', label: 'Back to login' }}
      helperText="Remembered it?"
    >
      {alert && (
        <div className="mb-4">
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <label className="block text-sm font-medium text-slate-600">
          Registered email
          <div className="mt-1 flex items-center gap-2 rounded-3xl border border-white/70 bg-white/80 px-4 py-3 shadow-inner focus-within:border-indigo-200">
            <FiMail className="text-slate-400" />
            <input
              className="w-full bg-transparent text-sm text-slate-700 outline-none"
              placeholder="you@email.com"
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              required
            />
          </div>
        </label>

        <label className="block text-sm font-medium text-slate-600">
          New password
          <div className="mt-1 flex items-center gap-2 rounded-3xl border border-white/70 bg-white/80 px-4 py-3 shadow-inner focus-within:border-indigo-200">
            <FiLock className="text-slate-400" />
            <input
              className="w-full bg-transparent text-sm text-slate-700 outline-none"
              placeholder="••••••••"
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              type="password"
              required
            />
          </div>
        </label>

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.97 }}
          className="gradient-btn w-full py-3"
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update password'}
        </motion.button>
      </form>
    </AuthShell>
  );
};

export default ForgotPasswordPage;

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiLock, FiUser } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import Alert from '../components/Alert.jsx';
import AuthShell from '../components/AuthShell.jsx';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const [form, setForm] = useState({
    username: '',
    password: '',
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
      const res = await login(form);
      toast.success(res.message || 'You are in!');
      navigate('/feed');
    } catch (error) {
      setAlert({ type: 'error', message: error.message });
      toast.error(error.message);
    }
  };

  return (
    <AuthShell
      badge="NOVA SOCIAL"
      helperLink={{ href: '/signup', label: 'Create one' }}
      helperText="New here?"
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
          Username
          <div className="mt-1 flex items-center gap-2 rounded-3xl border border-white/70 bg-white/80 px-4 py-3 shadow-inner focus-within:border-indigo-200">
            <FiUser className="text-slate-400" />
            <input
              className="w-full bg-transparent text-sm text-slate-700 outline-none"
              placeholder="divy"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>
        </label>
        <label className="block text-sm font-medium text-slate-600">
          Password
          <div className="mt-1 flex items-center gap-2 rounded-3xl border border-white/70 bg-white/80 px-4 py-3 shadow-inner focus-within:border-indigo-200">
            <FiLock className="text-slate-400" />
            <input
              className="w-full bg-transparent text-sm text-slate-700 outline-none"
              placeholder="••••••••"
              name="password"
              value={form.password}
              onChange={handleChange}
              type="password"
              required
            />
          </div>
        </label>
        <div className="flex items-center justify-between text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <input type="checkbox" className="rounded border-white/70 text-indigo-500 focus:ring-indigo-200" />
            Remember me
          </div>
          <Link to="/forgot-password" className="font-semibold text-indigo-600">
            Forgot password?
          </Link>
        </div>
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.97 }}
          className="gradient-btn w-full py-3"
          disabled={loading}
        >
          {loading ? 'Authenticating...' : 'Enter workspace'}
        </motion.button>
      </form>
    </AuthShell>
  );
};

export default LoginPage;


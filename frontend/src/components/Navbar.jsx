import { FiLogOut } from 'react-icons/fi';
import Avatar from './Avatar.jsx';
import { motion } from 'framer-motion';

const Navbar = ({ username = 'Explorer', onLogout }) => {
  return (
    <motion.nav
      layout
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card mb-6 flex flex-col gap-4 rounded-[32px] border border-white/50 p-6 shadow-card transition hover:shadow-glass sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex items-center gap-4">
        <Avatar name={username} size="md" />
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.45em] text-slate-400">
            Nova Social
          </p>
          <h2 className="text-xl font-semibold text-slate-900">
            Welcome back,{' '}
            <span className="bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
              {username}
            </span>
          </h2>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <div className="rounded-full bg-white/60 px-4 py-2 text-sm font-medium text-slate-500 shadow-inner">
          {new Date().toLocaleDateString(undefined, {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
          })}
        </div>
        <button
          onClick={onLogout}
          className="gradient-btn flex items-center gap-2 px-5 py-2 text-sm"
        >
          <FiLogOut /> Logout
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;



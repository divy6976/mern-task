import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AuthShell = ({
  badge,
  title,
  subtitle,
  children,
  footer,
  helperLink,
  helperText,
}) => {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-10">
      <div className="grid w-full max-w-5xl gap-10 rounded-[36px] border border-white/40 bg-white/50 p-6 shadow-glass backdrop-blur-3xl md:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6 text-white md:col-span-2"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.3),_transparent)]" />
          <div className="relative z-10 mt-20 space-y-4">
            <p className="text-sm uppercase tracking-[0.65em] text-white/70">
              NOVA SOCIAL
            </p>
            <h2 className="text-3xl font-semibold leading-tight">
              Your space to share thoughts that matter.
            </h2>
            <p className="text-sm text-white/80">
              A clean, modern platform to post, like, and connect with your circle.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:col-span-3"
        >
          <div className="mb-6 space-y-3">
            {badge && (
              <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-600">
                {badge}
              </span>
            )}
            <h1 className="text-3xl font-semibold text-slate-900">{title}</h1>
            <p className="text-sm text-slate-500">{subtitle}</p>
          </div>
          {children}
          {footer && <div className="mt-6 text-sm text-slate-500">{footer}</div>}
          {helperLink && (
            <div className="mt-4 text-sm text-slate-500">
              {helperText}{' '}
              <Link to={helperLink.href} className="font-semibold text-indigo-600">
                {helperLink.label}
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AuthShell;


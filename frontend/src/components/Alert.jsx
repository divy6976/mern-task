import { motion } from 'framer-motion';

const variantMap = {
  success: 'border-emerald-200 bg-emerald-50/90 text-emerald-800',
  error: 'border-rose-200 bg-rose-50/90 text-rose-700',
  info: 'border-sky-200 bg-sky-50/90 text-sky-800',
};

const Alert = ({ type = 'info', message, onClose }) => {
  if (!message) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass-card border-l-4 px-4 py-3 text-sm font-medium shadow-md ${variantMap[type]}`}
    >
      <div className="flex items-start justify-between gap-4">
        <span>{message}</span>
        {onClose && (
          <button
            onClick={onClose}
            className="text-slate-500 transition hover:text-slate-700"
            aria-label="Close alert"
          >
            ×
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default Alert;


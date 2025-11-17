const colors = [
  'from-indigo-500/90 to-pink-500/80',
  'from-sky-400/80 to-indigo-500/90',
  'from-indigo-500/90 to-violet-500/80',
  'from-rose-500/90 to-orange-400/80',
  'from-emerald-400/90 to-teal-500/80',
];

const Avatar = ({ name = 'User', size = 'md' }) => {
  const initials = name
    .split(' ')
    .map((chunk) => chunk.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('');
  const color = colors[name.length % colors.length];
  const dimension = {
    sm: 'w-9 h-9 text-sm',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-xl',
  }[size];

  return (
    <div
      className={`flex items-center justify-center rounded-full bg-gradient-to-br ${color} font-semibold text-white shadow-card ${dimension}`}
    >
      {initials}
    </div>
  );
};

export default Avatar;


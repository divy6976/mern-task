import { FiPlus } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Fab = ({ onClick }) => (
  <motion.button
    whileTap={{ scale: 0.9 }}
    whileHover={{ scale: 1.05 }}
    onClick={onClick}
    className="fixed bottom-6 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-2xl shadow-indigo-500/40 md:hidden"
    aria-label="Create post"
  >
    <FiPlus size={22} />
  </motion.button>
);

export default Fab;


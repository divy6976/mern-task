import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiImage, FiSend } from 'react-icons/fi';
import Avatar from './Avatar.jsx';

const PostForm = ({ onSubmit, defaultValue = '', username, textareaRef }) => {
  const [content, setContent] = useState(defaultValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    onSubmit(content);
    setContent('');
  };

  return (
    <motion.form
      id="composer"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="glass-card mb-8 rounded-[32px] p-6 shadow-card"
      onSubmit={handleSubmit}
    >
      <div className="flex items-start gap-4">
        <Avatar name={username} size="md" />

        <div className="flex-1 space-y-4">
          <div className="rounded-3xl border border-white/60 bg-white/75 px-4 py-2 shadow-inner">
            <textarea
              ref={textareaRef}
              className="min-h-[120px] w-full resize-none bg-transparent px-1 py-2 text-base text-slate-700 outline-none placeholder:text-slate-400"
              placeholder="Drop a thoughtful update for the community..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/50 px-3 py-1.5 text-xs font-medium text-slate-500 shadow-inner">
                <FiImage />
                Media soon
              </span>
            </div>
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="gradient-btn inline-flex items-center gap-2 px-6 py-3 text-sm uppercase tracking-wide"
            >
              Share
              <FiSend />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.form>
  );
};

export default PostForm;


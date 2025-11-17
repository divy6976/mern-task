import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  FiHeart,
  FiMessageCircle,
  FiEdit2,
  FiTrash2,
  FiChevronDown,
} from 'react-icons/fi';
import CommentList from './CommentList.jsx';
import Avatar from './Avatar.jsx';
import dayjs from '../utils/dayjs.js';

const PostList = ({
  posts,
  currentUser,
  onLike,
  onDelete,
  onUpdate,
  onAddComment,
}) => {
  const [editMap, setEditMap] = useState({});
  const [commentMap, setCommentMap] = useState({});
  const [openComments, setOpenComments] = useState({});

  const toggleEdit = (postId, content = '') => {
    setEditMap((prev) => ({
      ...prev,
      [postId]:
        prev[postId]?.editing && prev[postId]?.content === content
          ? undefined
          : { editing: true, content },
    }));
  };

  const handleEditChange = (postId, value) => {
    setEditMap((prev) => ({
      ...prev,
      [postId]: { editing: true, content: value },
    }));
  };

  const handleCommentChange = (postId, value) => {
    setCommentMap((prev) => ({ ...prev, [postId]: value }));
  };

  const toggleComments = (postId) => {
    setOpenComments((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const submitEdit = (postId) => {
    const value = editMap[postId]?.content?.trim();
    if (!value) return;
    onUpdate(postId, value);
    setEditMap((prev) => ({ ...prev, [postId]: undefined }));
  };

  const submitComment = (postId) => {
    const value = commentMap[postId]?.trim();
    if (!value) return;
    onAddComment(postId, value);
    setCommentMap((prev) => ({ ...prev, [postId]: '' }));
    setOpenComments((prev) => ({ ...prev, [postId]: true }));
  };

  if (!posts.length) {
    return (
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center text-slate-400"
      >
        No posts yet. Share something to get the party started!
      </motion.p>
    );
  }

  return (
    <div className="space-y-6">
      <AnimatePresence>
        {posts.map((post) => {
          const authorId =
            typeof post.author === 'string' ? post.author : post.author?._id;
          const isOwner =
            currentUser?.id === authorId || currentUser?._id === authorId;
          const normalizeLike = (like) =>
            typeof like === 'string' ? like : like?._id;
          const isLiked = post.likes?.some(
            (like) =>
              normalizeLike(like) === currentUser?.id ||
              normalizeLike(like) === currentUser?._id
          );
          const editState = editMap[post._id];
          const commentsOpen = openComments[post._id];

          return (
            <motion.article
              key={post._id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="glass-card rounded-[32px] p-6 shadow-card"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-center gap-4">
                  <Avatar name={post.author?.username || 'Nova'} size="md" />
                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      {post.author?.username}
                    </p>
                    <p className="text-xs text-slate-400">
                      {dayjs(post.createdAt).fromNow()} ·{' '}
                      {dayjs(post.createdAt).format('MMM D, hh:mm A')}
                    </p>
                  </div>
                </div>
                {isOwner && (
                  <div className="flex flex-wrap gap-2">
                    <button
                      className="secondary-btn inline-flex items-center gap-2 px-4 py-2 text-sm"
                      onClick={() => toggleEdit(post._id, post.content)}
                    >
                      <FiEdit2 size={16} />
                      {editState?.editing ? 'Cancel' : 'Edit'}
                    </button>
                    <button
                      className="secondary-btn inline-flex items-center gap-2 border-rose-200 text-rose-600 hover:bg-rose-50"
                      onClick={() => onDelete(post._id)}
                    >
                      <FiTrash2 size={16} />
                      Delete
                    </button>
                  </div>
                )}
              </div>

              {editState?.editing ? (
                <div className="mt-5 space-y-3">
                  <textarea
                    className="w-full rounded-3xl border border-white/70 bg-white/80 p-4 text-slate-800 shadow-inner outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-200/60"
                    value={editState.content}
                    onChange={(e) => handleEditChange(post._id, e.target.value)}
                    rows={3}
                  />
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.97 }}
                    className="gradient-btn px-5 py-2.5 text-sm"
                    onClick={() => submitEdit(post._id)}
                  >
                    Save Changes
                  </motion.button>
                </div>
              ) : (
                <p className="mt-5 text-[1.05rem] leading-relaxed text-slate-800">
                  {post.content}
                </p>
              )}

              <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  animate={{ scale: isLiked ? [1, 1.15, 1] : 1 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => onLike(post._id)}
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-2 font-semibold transition ${
                    isLiked
                      ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-card'
                      : 'bg-white/70 text-slate-600 shadow-inner hover:bg-white'
                  }`}
                >
                  <FiHeart className={isLiked ? 'fill-white text-white' : ''} />
                  {post.likes?.length || 0}
                </motion.button>

                <button
                  onClick={() => toggleComments(post._id)}
                  className={`inline-flex items-center gap-2 rounded-full border px-5 py-2 font-semibold transition ${
                    commentsOpen
                      ? 'border-indigo-200 bg-indigo-50 text-indigo-600'
                      : 'border-white/70 bg-white/60 text-slate-500 hover:border-indigo-200 hover:text-indigo-600'
                  }`}
                >
                  <FiMessageCircle />
                  {post.comments?.length || 0} Comments
                  <motion.span
                    animate={{ rotate: commentsOpen ? 180 : 0 }}
                    className="inline-flex"
                  >
                    <FiChevronDown />
                  </motion.span>
                </button>
              </div>

              <AnimatePresence>
                {commentsOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-5 space-y-4 rounded-3xl border border-white/70 bg-white/80 p-4 shadow-inner"
                  >
                    <CommentList comments={post.comments || []} />
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <input
                        type="text"
                        className="input-shell flex-1"
                        placeholder="Add a thoughtful comment..."
                        value={commentMap[post._id] || ''}
                        onChange={(e) =>
                          handleCommentChange(post._id, e.target.value)
                        }
                      />
                      <motion.button
                        whileTap={{ scale: 0.96 }}
                        className="gradient-btn px-6 py-2.5 text-sm"
                        onClick={() => submitComment(post._id)}
                      >
                        Share
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.article>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default PostList;


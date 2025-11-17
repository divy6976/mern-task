import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiRefreshCcw } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import PostForm from '../components/PostForm.jsx';
import PostList from '../components/PostList.jsx';
import Navbar from '../components/Navbar.jsx';
import SkeletonPost from '../components/SkeletonPost.jsx';
import Fab from '../components/Fab.jsx';

const FeedPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const composerRef = useRef(null);

  const fetchPosts = async ({ silent = false } = {}) => {
    if (!silent) setLoading(true);
    else setRefreshing(true);
    try {
      const res = await api.get('/posts');
      setPosts(res.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      if (!silent) setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreate = async (content) => {
    try {
      await api.post('/posts', { content });
      await fetchPosts({ silent: true });
      toast.success('Post shared ✨');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleLike = async (id) => {
    try {
      await api.post(`/posts/${id}/like`);
      await fetchPosts({ silent: true });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this post?')) return;
    try {
      await api.delete(`/posts/${id}`);
      setPosts((prev) => prev.filter((post) => post._id !== id));
      toast.info('Post deleted');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleUpdate = async (id, content) => {
    try {
      await api.put(`/posts/${id}`, { content });
      await fetchPosts({ silent: true });
      toast.success('Post refreshed');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleAddComment = async (id, text) => {
    try {
      await api.post(`/posts/${id}/comment`, { text });
      await fetchPosts({ silent: true });
      toast.success('Comment added');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const focusComposer = () => {
    composerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    composerRef.current?.focus();
  };

  return (
    <div className="space-y-8 pb-20">
      <Navbar username={user?.username} onLogout={handleLogout} />

      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-[36px] border border-white/40 p-6 shadow-card"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.5em] text-slate-400">
              Community pulse
            </p>
            <h3 className="text-2xl font-semibold text-slate-900">
              See what innovators are building today
            </h3>
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => fetchPosts({ silent: true })}
            className="secondary-btn inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold"
          >
            <FiRefreshCcw
              className={refreshing ? 'animate-spin text-indigo-500' : 'text-indigo-500'}
            />
            Refresh feed
          </motion.button>
        </div>
      </motion.section>

      <PostForm
        onSubmit={handleCreate}
        username={user?.username}
        textareaRef={composerRef}
      />

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((key) => (
            <SkeletonPost key={key} />
          ))}
        </div>
      ) : (
        <PostList
          posts={posts}
          currentUser={user}
          onLike={handleLike}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
          onAddComment={handleAddComment}
        />
      )}

      <Fab onClick={focusComposer} />
    </div>
  );
};

export default FeedPage;

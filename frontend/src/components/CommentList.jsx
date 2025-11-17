import Avatar from './Avatar.jsx';
import dayjs from '../utils/dayjs.js';

const CommentList = ({ comments }) => {
  if (!comments?.length) {
    return (
      <p className="text-sm text-slate-400">
        No comments yet. Start the conversation!
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {comments.map((comment) => (
        <div
          key={comment._id}
          className="flex gap-3 rounded-2xl bg-white/90 px-4 py-3 text-sm text-slate-700 shadow-inner shadow-white/60"
        >
          <Avatar name={comment.user?.username || 'anon'} size="sm" />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-slate-900">
                {comment.user?.username || 'anon'}
              </p>
              <span className="text-xs text-slate-400">
                {dayjs(comment.createdAt || Date.now()).fromNow()}
              </span>
            </div>
            <p className="text-slate-600">{comment.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;


const SkeletonPost = () => {
  return (
    <div className="glass-card animate-pulse space-y-4 rounded-[30px] p-6">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-white/60" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-1/3 rounded-full bg-white/70" />
          <div className="h-3 w-1/5 rounded-full bg-white/50" />
        </div>
      </div>
      <div className="space-y-3">
        <div className="h-3 w-full rounded-full bg-white/70" />
        <div className="h-3 w-5/6 rounded-full bg-white/60" />
        <div className="h-3 w-2/3 rounded-full bg-white/50" />
      </div>
      <div className="flex gap-3">
        <div className="h-9 w-24 rounded-full bg-white/60" />
        <div className="h-9 w-28 rounded-full bg-white/60" />
      </div>
    </div>
  );
};

export default SkeletonPost;


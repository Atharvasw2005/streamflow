import VideoCard from "./VideoCard";

function VideoGrid({ videos = [], loading = false }) {
  if (loading) {
    return (
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900"
          >
            <div className="h-44 animate-pulse bg-slate-800" />
            <div className="space-y-3 p-4">
              <div className="h-4 w-3/4 animate-pulse rounded bg-slate-800" />
              <div className="h-3 w-1/2 animate-pulse rounded bg-slate-800" />
              <div className="h-3 w-2/3 animate-pulse rounded bg-slate-800" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!videos.length) {
    return (
      <div className="rounded-xl border border-dashed border-slate-700 bg-slate-900 p-8 text-center text-slate-400">
        No videos available right now.
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}

export default VideoGrid;

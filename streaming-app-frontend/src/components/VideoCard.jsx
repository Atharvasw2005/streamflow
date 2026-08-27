import { Eye, PlayCircle } from "lucide-react";
import { Link } from "react-router-dom";

function formatViewCount(views) {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M`;
  }

  if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K`;
  }

  return `${views}`;
}

function VideoCard({ video }) {
  if (!video) return null;

  const initials = (video.channel || "SF").slice(0, 2).toUpperCase();

  return (
    <Link
      to={`/watch/${video.id}`}
      className="group overflow-hidden rounded-xl border border-slate-800 bg-slate-900 text-left transition hover:border-slate-700 hover:bg-slate-800"
    >
      <div className="relative overflow-hidden">
        {video.thumbnail ? (
          <img
            src={video.thumbnail}
            alt={video.title}
            className="h-44 w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-44 w-full items-center justify-center bg-slate-950 text-slate-500">
            No Thumbnail
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
        {video.category && (
          <div className="absolute left-3 top-3 rounded-full bg-slate-950/80 px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-slate-200">
            {video.category}
          </div>
        )}
        {video.duration && (
          <div className="absolute bottom-3 right-3 rounded-md bg-slate-950/90 px-2 py-1 text-xs font-medium text-white">
            {video.duration}
          </div>
        )}
      </div>

      <div className="space-y-3 p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600/20 text-xs font-semibold text-blue-300">
            {initials}
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="line-clamp-2 text-sm font-semibold text-white">
              {video.title}
            </h3>
            <p className="mt-1 text-xs text-slate-400">
              {video.channel || "Uploaded video"}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <Eye size={12} /> {formatViewCount(video.views)} views
          </span>
          <span className="flex items-center gap-1">
            <PlayCircle size={12} /> {video.publishedAt}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default VideoCard;

import { Link } from "react-router-dom";
import { BadgeCheck, MoreVertical } from "lucide-react";
import { cn } from "../../lib/cn";
import { formatCount } from "../../data/mockData";
import Avatar from "../ui/Avatar";

/*
  VideoCard — the workhorse of every grid.
  layout: "grid" (default, avatar + meta) | "compact" (row, for sidebars/lists)
  onMenu / menu can render a contextual action (e.g. remove from history).
*/
function VideoCard({ video, layout = "grid", menu, className }) {
  const { id, title, thumbnail, duration, views, publishedAt, channel } = video;

  if (layout === "compact") {
    return (
      <div className={cn("group flex gap-3", className)}>
        <Link
          to={`/watch/${id}`}
          className="relative aspect-video w-40 shrink-0 overflow-hidden rounded-lg bg-surface-2"
        >
          <img
            src={thumbnail || "/placeholder.svg"}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <Duration value={duration} />
        </Link>
        <div className="flex min-w-0 flex-1 flex-col">
          <Link to={`/watch/${id}`}>
            <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground text-pretty group-hover:text-white">
              {title}
            </h3>
          </Link>
          <span className="mt-1 flex items-center gap-1 truncate text-xs text-muted">
            {channel?.name}
            {channel?.verified && (
              <BadgeCheck className="h-3.5 w-3.5 text-muted-2" aria-label="Verified" />
            )}
          </span>
          <span className="mt-0.5 text-xs text-muted-2">
            {formatCount(views)} views · {publishedAt}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("group flex flex-col", className)}>
      <Link
        to={`/watch/${id}`}
        className="relative block aspect-video w-full overflow-hidden rounded-xl bg-surface-2"
      >
        <img
          src={thumbnail || "/placeholder.svg"}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
        <Duration value={duration} />
      </Link>

      <div className="mt-3 flex gap-3">
        <Link to={`/watch/${id}`} className="shrink-0 pt-0.5">
          <Avatar src={channel?.avatar} name={channel?.name} size="sm" />
        </Link>
        <div className="flex min-w-0 flex-1 flex-col">
          <Link to={`/watch/${id}`}>
            <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground text-pretty">
              {title}
            </h3>
          </Link>
          <span className="mt-1 flex items-center gap-1 truncate text-xs text-muted">
            {channel?.name}
            {channel?.verified && (
              <BadgeCheck className="h-3.5 w-3.5 text-muted-2" aria-label="Verified" />
            )}
          </span>
          <span className="mt-0.5 text-xs text-muted-2">
            {formatCount(views)} views · {publishedAt}
          </span>
        </div>
        {menu ?? (
          <button
            type="button"
            aria-label="More options"
            className="h-7 w-7 shrink-0 items-center justify-center rounded-full text-muted-2 opacity-0 transition-opacity hover:bg-surface-hover hover:text-foreground group-hover:opacity-100 hidden sm:flex"
          >
            <MoreVertical className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
}

function Duration({ value }) {
  if (!value) return null;
  return (
    <span className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-xs font-medium text-white tabular-nums">
      {value}
    </span>
  );
}

export default VideoCard;

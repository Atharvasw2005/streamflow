import { cn } from "../../lib/cn";
import VideoCard from "../VideoCard/VideoCard";
import { VideoGridSkeleton } from "../LoadingSkeleton/LoadingSkeleton";
import EmptyState from "../EmptyState/EmptyState";

/*
  VideoGrid — responsive grid of VideoCards with built-in loading and empty
  handling so pages stay declarative. `renderMenu(video)` optionally injects a
  per-card action.
*/
function VideoGrid({
  videos = [],
  loading = false,
  skeletonCount = 8,
  emptyProps,
  renderMenu,
  className,
}) {
  if (loading) return <VideoGridSkeleton count={skeletonCount} />;

  if (!videos.length) {
    return <EmptyState {...emptyProps} />;
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        className,
      )}
    >
      {videos.map((video) => (
        <VideoCard
          key={video.id}
          video={video}
          menu={renderMenu ? renderMenu(video) : undefined}
        />
      ))}
    </div>
  );
}

export default VideoGrid;

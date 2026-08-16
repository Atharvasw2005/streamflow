import { useState } from "react";
import { Play } from "lucide-react";
import { cn } from "../../lib/cn";
import VideoPlayer from "../VideoPlayer";

/*
  VideoPlayerShell — the presentational frame around playback.

  It shows a poster with a play affordance and only mounts the real HLS
  <VideoPlayer /> once the viewer chooses to play. This keeps the page light
  and avoids autoplay surprises, while staying fully wired to the existing
  hls.js player. Pass `src` (an .m3u8 manifest) and an optional `poster`.
*/
function VideoPlayerShell({ src, poster, title, className }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div
      className={cn(
        "relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-black",
        className,
      )}
    >
      {playing && src ? (
        <VideoPlayer src={src} className="absolute inset-0 h-full w-full bg-black" />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={title ? `Play ${title}` : "Play video"}
          className="group absolute inset-0 h-full w-full"
        >
          {poster && (
            <img
              src={poster || "/placeholder.svg"}
              alt=""
              className="h-full w-full object-cover"
            />
          )}
          <span className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/20" />
          <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg transition-transform duration-200 group-hover:scale-105">
            <Play className="ml-0.5 h-7 w-7 fill-current" aria-hidden="true" />
          </span>
        </button>
      )}
    </div>
  );
}

export default VideoPlayerShell;

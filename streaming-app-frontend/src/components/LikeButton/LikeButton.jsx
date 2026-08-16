import { useState } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { cn } from "../../lib/cn";
import { formatCount } from "../../data/mockData";

/*
  LikeButton — a paired like / dislike control styled as a single segmented
  pill (a common streaming pattern). State is local; connect handlers later.
*/
function LikeButton({ likes = 0, className }) {
  const [state, setState] = useState(null); // null | "like" | "dislike"

  const displayLikes = likes + (state === "like" ? 1 : 0);

  const toggle = (value) => setState((prev) => (prev === value ? null : value));

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-surface-2",
        className,
      )}
    >
      <button
        type="button"
        onClick={() => toggle("like")}
        aria-pressed={state === "like"}
        aria-label="Like"
        className={cn(
          "flex h-10 items-center gap-2 rounded-l-full pl-4 pr-3 text-sm font-medium transition-colors hover:bg-surface-hover",
          state === "like" ? "text-accent" : "text-foreground",
        )}
      >
        <ThumbsUp className="h-4 w-4" aria-hidden="true" />
        <span className="tabular-nums">{formatCount(displayLikes)}</span>
      </button>
      <span className="h-5 w-px bg-border" aria-hidden="true" />
      <button
        type="button"
        onClick={() => toggle("dislike")}
        aria-pressed={state === "dislike"}
        aria-label="Dislike"
        className={cn(
          "flex h-10 items-center rounded-r-full px-3.5 transition-colors hover:bg-surface-hover",
          state === "dislike" ? "text-danger" : "text-foreground",
        )}
      >
        <ThumbsDown className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}

export default LikeButton;

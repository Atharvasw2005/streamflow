import { useState } from "react";
import { Share2, Check } from "lucide-react";
import { cn } from "../../lib/cn";

/*
  ShareButton — copies the current URL to the clipboard and shows a brief
  confirmation. Falls back gracefully if the clipboard API is unavailable.
*/
function ShareButton({ className, label = "Share" }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      if (navigator.clipboard && typeof window !== "undefined") {
        await navigator.clipboard.writeText(window.location.href);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard blocked — no-op, keep the UI stable.
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className={cn(
        "inline-flex h-10 items-center gap-2 rounded-full border border-border bg-surface-2 px-4 text-sm font-medium text-foreground transition-colors hover:bg-surface-hover",
        className,
      )}
    >
      {copied ? (
        <>
          <Check className="h-4 w-4 text-success" aria-hidden="true" />
          Copied
        </>
      ) : (
        <>
          <Share2 className="h-4 w-4" aria-hidden="true" />
          {label}
        </>
      )}
    </button>
  );
}

export default ShareButton;

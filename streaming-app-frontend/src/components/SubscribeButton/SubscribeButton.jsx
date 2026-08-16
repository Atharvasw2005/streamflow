import { useState } from "react";
import { Bell, BellPlus } from "lucide-react";
import { cn } from "../../lib/cn";

/*
  SubscribeButton — local toggle only. Wire `onToggle(next)` to the real
  subscribe/unsubscribe endpoint later.
*/
function SubscribeButton({ subscribed: controlled, onToggle, className }) {
  const [internal, setInternal] = useState(false);
  const subscribed = controlled !== undefined ? controlled : internal;

  const handleClick = () => {
    const next = !subscribed;
    if (controlled === undefined) setInternal(next);
    onToggle?.(next);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={subscribed}
      className={cn(
        "inline-flex h-10 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition-colors",
        subscribed
          ? "bg-surface-2 text-foreground border border-border hover:bg-surface-hover"
          : "bg-foreground text-background hover:bg-foreground/90",
        className,
      )}
    >
      {subscribed ? (
        <>
          <Bell className="h-4 w-4" aria-hidden="true" />
          Subscribed
        </>
      ) : (
        <>
          <BellPlus className="h-4 w-4" aria-hidden="true" />
          Subscribe
        </>
      )}
    </button>
  );
}

export default SubscribeButton;

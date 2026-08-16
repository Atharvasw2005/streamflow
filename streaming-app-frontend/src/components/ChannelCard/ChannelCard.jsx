import { BadgeCheck } from "lucide-react";
import { cn } from "../../lib/cn";
import { formatCount } from "../../data/mockData";
import Avatar from "../ui/Avatar";
import SubscribeButton from "../SubscribeButton/SubscribeButton";

/*
  ChannelCard — used on the Subscriptions page and channel lists.
  variant: "card" (vertical) | "row" (horizontal list item)
*/
function ChannelCard({ channel, subscribed, variant = "card", className }) {
  if (!channel) return null;

  if (variant === "row") {
    return (
      <div
        className={cn(
          "flex items-center gap-4 rounded-xl border border-border bg-surface p-4",
          className,
        )}
      >
        <Avatar src={channel.avatar} name={channel.name} size="lg" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <p className="truncate font-semibold text-foreground">{channel.name}</p>
            {channel.verified && (
              <BadgeCheck className="h-4 w-4 shrink-0 text-accent" aria-label="Verified" />
            )}
          </div>
          <p className="truncate text-sm text-muted">
            {channel.handle} · {formatCount(channel.subscribers)} subscribers
          </p>
        </div>
        <SubscribeButton subscribed={subscribed} />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center rounded-xl border border-border bg-surface p-6 text-center transition-colors hover:bg-surface-2",
        className,
      )}
    >
      <Avatar src={channel.avatar} name={channel.name} size="xl" />
      <div className="mt-3 flex items-center gap-1.5">
        <p className="font-semibold text-foreground">{channel.name}</p>
        {channel.verified && (
          <BadgeCheck className="h-4 w-4 text-accent" aria-label="Verified" />
        )}
      </div>
      <p className="mt-0.5 text-sm text-muted">
        {formatCount(channel.subscribers)} subscribers
      </p>
      <SubscribeButton subscribed={subscribed} className="mt-4" />
    </div>
  );
}

export default ChannelCard;

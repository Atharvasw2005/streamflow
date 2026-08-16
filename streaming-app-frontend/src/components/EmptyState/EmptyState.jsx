import { Inbox } from "lucide-react";
import { cn } from "../../lib/cn";

/*
  EmptyState — used whenever a list resolves to nothing.
  Pass a lucide icon component, a title, description and an optional action node.
*/
function EmptyState({
  icon: Icon = Inbox,
  title = "Nothing here yet",
  description,
  action,
  className,
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border border-dashed border-border",
        "bg-surface/40 px-6 py-16 text-center",
        className,
      )}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-surface-2 text-muted">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <h3 className="mt-4 text-base font-semibold text-foreground text-balance">
        {title}
      </h3>
      {description && (
        <p className="mt-1 max-w-sm text-sm leading-relaxed text-muted text-pretty">
          {description}
        </p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export default EmptyState;

import { TriangleAlert, RotateCcw } from "lucide-react";
import { cn } from "../../lib/cn";
import Button from "../ui/Button";

/*
  ErrorState — a recoverable failure surface. Wire `onRetry` to a refetch.
*/
function ErrorState({
  title = "Something went wrong",
  description = "We couldn't load this content. Please try again.",
  onRetry,
  className,
}) {
  return (
    <div
      role="alert"
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border border-border",
        "bg-surface/60 px-6 py-16 text-center",
        className,
      )}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-danger-soft text-danger">
        <TriangleAlert className="h-6 w-6" aria-hidden="true" />
      </div>
      <h3 className="mt-4 text-base font-semibold text-foreground text-balance">
        {title}
      </h3>
      <p className="mt-1 max-w-sm text-sm leading-relaxed text-muted text-pretty">
        {description}
      </p>
      {onRetry && (
        <Button variant="secondary" size="sm" className="mt-5" onClick={onRetry}>
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Try again
        </Button>
      )}
    </div>
  );
}

export default ErrorState;

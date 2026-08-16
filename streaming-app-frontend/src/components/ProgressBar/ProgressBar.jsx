import { cn } from "../../lib/cn";

/*
  ProgressBar — determinate progress with an optional inline label.
  tone: accent | success | danger
*/
const TONES = {
  accent: "bg-accent",
  success: "bg-success",
  danger: "bg-danger",
};

function ProgressBar({
  value = 0,
  tone = "accent",
  showLabel = false,
  label,
  className,
}) {
  const pct = Math.min(100, Math.max(0, Math.round(value)));
  return (
    <div className={cn("w-full", className)}>
      {(showLabel || label) && (
        <div className="mb-1.5 flex items-center justify-between text-xs text-muted">
          <span>{label ?? "Progress"}</span>
          <span className="tabular-nums text-foreground">{pct}%</span>
        </div>
      )}
      <div
        className="h-2 w-full overflow-hidden rounded-full bg-surface-2"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={cn("h-full rounded-full transition-[width] duration-300", TONES[tone])}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;

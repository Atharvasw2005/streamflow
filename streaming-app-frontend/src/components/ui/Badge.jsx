import { cn } from "../../lib/cn";

const TONES = {
  neutral: "bg-surface-2 text-muted border border-border",
  accent: "bg-accent-soft text-accent border border-accent/30",
  success: "bg-success-soft text-success border border-success/30",
  warning: "bg-warning-soft text-warning border border-warning/30",
  danger: "bg-danger-soft text-danger border border-danger/30",
};

function Badge({ tone = "neutral", className, children, ...props }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium",
        TONES[tone],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export default Badge;

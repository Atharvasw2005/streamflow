import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "../../lib/cn";

/*
  StatCard — a single KPI tile for the admin dashboard.
  Pass a lucide `icon`, a `value`, `label` and an optional signed `trend` (%).
*/
function StatCard({ icon: Icon, label, value, trend, className }) {
  const up = trend >= 0;
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-surface p-5 transition-colors hover:bg-surface-2",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted">{label}</span>
        {Icon && (
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-2 text-accent">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
        )}
      </div>
      <p className="mt-3 text-2xl font-bold tabular-nums text-foreground">{value}</p>
      {trend !== undefined && (
        <div className="mt-2 flex items-center gap-1 text-xs">
          <span
            className={cn(
              "inline-flex items-center gap-0.5 font-medium",
              up ? "text-success" : "text-danger",
            )}
          >
            {up ? (
              <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <TrendingDown className="h-3.5 w-3.5" aria-hidden="true" />
            )}
            {Math.abs(trend)}%
          </span>
          <span className="text-muted-2">vs last week</span>
        </div>
      )}
    </div>
  );
}

export default StatCard;

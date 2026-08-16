import { cn } from "../../lib/cn";
import EmptyState from "../EmptyState/EmptyState";

/*
  DataTable — a presentational, config-driven table used across the admin area.
  columns: [{ key, header, className, render?(row) }]
  Responsive: scrolls horizontally on small screens.
*/
function DataTable({ columns = [], rows = [], getRowId = (r) => r.id, emptyProps, className }) {
  if (!rows.length) {
    return <EmptyState {...emptyProps} />;
  }

  return (
    <div className={cn("overflow-hidden rounded-xl border border-border bg-surface", className)}>
      <div className="scrollbar-slim overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border">
              {columns.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  className={cn(
                    "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-2",
                    col.className,
                  )}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={getRowId(row)}
                className="border-b border-border/70 last:border-0 transition-colors hover:bg-surface-2"
              >
                {columns.map((col) => (
                  <td key={col.key} className={cn("px-4 py-3 align-middle text-foreground", col.className)}>
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;

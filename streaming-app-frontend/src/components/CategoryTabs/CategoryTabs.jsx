import { cn } from "../../lib/cn";

/*
  CategoryTabs — horizontally scrollable filter chips.
  Controlled via `active` + `onChange`.
*/
function CategoryTabs({ categories = [], active, onChange, className }) {
  return (
    <div
      className={cn(
        "no-scrollbar -mx-1 flex items-center gap-2 overflow-x-auto px-1 py-1",
        className,
      )}
      role="tablist"
      aria-label="Video categories"
    >
      {categories.map((category) => {
        const selected = category === active;
        return (
          <button
            key={category}
            role="tab"
            aria-selected={selected}
            onClick={() => onChange?.(category)}
            className={cn(
              "shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
              selected
                ? "bg-foreground text-background"
                : "border border-border bg-surface text-muted hover:bg-surface-hover hover:text-foreground",
            )}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}

export default CategoryTabs;

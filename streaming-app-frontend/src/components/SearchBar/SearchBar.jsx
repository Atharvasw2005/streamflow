import { useState } from "react";
import { Search, X } from "lucide-react";
import { cn } from "../../lib/cn";

/*
  SearchBar — controlled-or-uncontrolled search input.
  Submitting calls onSearch(query). Purely UI; no fetching here.
*/
function SearchBar({
  value,
  defaultValue = "",
  onChange,
  onSearch,
  placeholder = "Search videos, channels...",
  className,
  autoFocus = false,
}) {
  const [internal, setInternal] = useState(defaultValue);
  const query = value !== undefined ? value : internal;

  const update = (next) => {
    if (value === undefined) setInternal(next);
    onChange?.(next);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ignore Enter fired while composing with a CJK IME.
    onSearch?.(query.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className={cn("group relative w-full", className)}
    >
      <Search
        className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-2 transition-colors group-focus-within:text-muted"
        aria-hidden="true"
      />
      <input
        type="search"
        value={query}
        autoFocus={autoFocus}
        onChange={(e) => update(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && (e.nativeEvent.isComposing || e.keyCode === 229)) {
            e.preventDefault();
          }
        }}
        placeholder={placeholder}
        aria-label="Search"
        className={cn(
          "h-10 w-full rounded-lg border border-border bg-surface pl-10 pr-9 text-sm text-foreground",
          "placeholder:text-muted-2 outline-none transition-colors",
          "focus:border-accent/60 focus:bg-surface-2",
          "[&::-webkit-search-cancel-button]:hidden",
        )}
      />
      {query && (
        <button
          type="button"
          onClick={() => update("")}
          aria-label="Clear search"
          className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-2 hover:bg-surface-hover hover:text-foreground"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      )}
    </form>
  );
}

export default SearchBar;

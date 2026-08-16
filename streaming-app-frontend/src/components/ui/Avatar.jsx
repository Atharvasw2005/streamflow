import { cn } from "../../lib/cn";

const SIZES = {
  xs: "h-6 w-6 text-[10px]",
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-20 w-20 text-2xl",
};

function initials(name = "") {
  return name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function Avatar({ src, name = "", size = "md", className }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full",
        "bg-surface-2 border border-border font-semibold text-muted select-none",
        SIZES[size],
        className,
      )}
    >
      {src ? (
        <img
          src={src || "/placeholder.svg"}
          alt={name ? `${name} avatar` : "User avatar"}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      ) : (
        initials(name)
      )}
    </span>
  );
}

export default Avatar;

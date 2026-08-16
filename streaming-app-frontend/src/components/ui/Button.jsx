import { cn } from "../../lib/cn";

/*
  Button — the single source of truth for actions across StreamFlow.
  variants: primary | secondary | ghost | outline | danger
  sizes:    sm | md | lg | icon
*/
const VARIANTS = {
  primary:
    "bg-accent text-accent-foreground hover:bg-accent-hover focus-visible:ring-accent/50",
  secondary:
    "bg-surface-2 text-foreground hover:bg-surface-hover border border-border focus-visible:ring-border-strong",
  ghost:
    "bg-transparent text-muted hover:text-foreground hover:bg-surface-2 focus-visible:ring-border-strong",
  outline:
    "bg-transparent text-foreground border border-border-strong hover:bg-surface-2 focus-visible:ring-border-strong",
  danger:
    "bg-danger text-white hover:bg-danger/90 focus-visible:ring-danger/50",
};

const SIZES = {
  sm: "h-8 px-3 text-xs gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-11 px-6 text-sm gap-2",
  icon: "h-10 w-10 p-0",
};

function Button({
  as: Comp = "button",
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}) {
  return (
    <Comp
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium",
        "transition-colors duration-150 outline-none",
        "focus-visible:ring-2 focus-visible:ring-offset-0",
        "disabled:opacity-50 disabled:pointer-events-none",
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}

export default Button;

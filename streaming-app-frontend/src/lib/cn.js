// Tiny className combiner. Filters falsy values and joins with a space.
// Keeps the codebase dependency-free (no clsx/tailwind-merge needed).
export function cn(...values) {
  return values
    .flat(Infinity)
    .filter(Boolean)
    .join(" ")
    .trim();
}

export default cn;

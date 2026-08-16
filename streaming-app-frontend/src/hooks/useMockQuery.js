import { useEffect, useRef, useState } from "react";

// Simulates an async data fetch so pages exercise real loading / error /
// empty states. Swap the resolver for a real API call later without touching
// the page components.
export function useMockQuery(resolver, deps = [], { delay = 500 } = {}) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nonce, setNonce] = useState(0);
  const resolverRef = useRef(resolver);
  resolverRef.current = resolver;

  useEffect(() => {
    let active = true;
    setIsLoading(true);
    setError(null);
    const t = setTimeout(async () => {
      try {
        const result = await resolverRef.current();
        if (active) {
          setData(result);
          setIsLoading(false);
        }
      } catch (e) {
        if (active) {
          setError(e);
          setIsLoading(false);
        }
      }
    }, delay);
    return () => {
      active = false;
      clearTimeout(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, nonce]);

  return { data, isLoading, error, refetch: () => setNonce((n) => n + 1) };
}

import { useEffect, useState } from "react";
import { getCurrentUser, isAuthenticated } from "./session";

export function useSession() {
  const [user, setUser] = useState(() => getCurrentUser());
  const [authed, setAuthed] = useState(() => isAuthenticated());

  useEffect(() => {
    const sync = () => {
      setUser(getCurrentUser());
      setAuthed(isAuthenticated());
    };
    window.addEventListener("sf-session-change", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("sf-session-change", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return { user, isAuthenticated: authed };
}

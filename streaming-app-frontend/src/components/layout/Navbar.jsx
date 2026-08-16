import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Menu,
  Upload,
  Bell,
  LogOut,
  User,
  Settings,
  Shield,
  Play,
} from "lucide-react";
import SearchBar from "../SearchBar/SearchBar";
import Avatar from "../ui/Avatar";
import { useSession } from "../../features/auth/useSession";
import { clearSession } from "../../features/auth/session";
import { notifications } from "../../data/mockData";
import { cn } from "../../lib/cn";

function Navbar({ onToggleSidebar }) {
  const navigate = useNavigate();
  const { user } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [bellOpen, setBellOpen] = useState(false);
  const menuRef = useRef(null);
  const bellRef = useRef(null);

  useEffect(() => {
    function onClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
      if (bellRef.current && !bellRef.current.contains(e.target)) {
        setBellOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const unread = notifications.filter((n) => n.unread).length;

  function handleLogout() {
    clearSession();
    navigate("/login");
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="flex h-16 items-center gap-2 px-4 sm:gap-4 sm:px-6">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          aria-label="Toggle menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <Link to="/" className="flex shrink-0 items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/25">
            <Play className="h-5 w-5 fill-current" />
          </span>
          <span className="hidden text-lg font-extrabold tracking-tight text-foreground sm:block">
            Stream<span className="text-primary">Flow</span>
          </span>
        </Link>

        <div className="mx-auto hidden w-full max-w-xl md:block">
          <SearchBar />
        </div>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            onClick={() => navigate("/search")}
            className="grid h-10 w-10 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground md:hidden"
            aria-label="Search"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => navigate("/upload")}
            className="hidden h-10 items-center gap-2 rounded-lg border border-border px-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary sm:inline-flex"
          >
            <Upload className="h-4 w-4" />
            Upload
          </button>

          <div className="relative" ref={bellRef}>
            <button
              type="button"
              onClick={() => setBellOpen((v) => !v)}
              className="relative grid h-10 w-10 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              {unread > 0 && (
                <span className="absolute right-2 top-2 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                  {unread}
                </span>
              )}
            </button>
            {bellOpen && (
              <div className="absolute right-0 mt-2 w-80 overflow-hidden rounded-xl border border-border bg-card shadow-2xl">
                <div className="flex items-center justify-between border-b border-border px-4 py-3">
                  <p className="text-sm font-semibold text-foreground">
                    Notifications
                  </p>
                  <span className="text-xs text-muted-foreground">
                    {unread} new
                  </span>
                </div>
                <ul className="max-h-96 divide-y divide-border overflow-y-auto">
                  {notifications.map((n) => (
                    <li
                      key={n.id}
                      className={cn(
                        "flex gap-3 px-4 py-3 transition-colors hover:bg-secondary/60",
                        n.unread && "bg-primary/5"
                      )}
                    >
                      <img
                        src={n.avatar || "/placeholder.svg"}
                        alt=""
                        className="h-9 w-9 shrink-0 rounded-full object-cover"
                      />
                      <div className="min-w-0">
                        <p className="text-sm leading-snug text-foreground">
                          <span className="font-semibold">{n.title}</span>{" "}
                          {n.body}
                        </p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {n.time}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="ml-1 rounded-full ring-offset-2 ring-offset-background transition hover:ring-2 hover:ring-primary/60"
              aria-label="Account menu"
            >
              <Avatar src={user?.avatar} name={user?.name} size="sm" />
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-60 overflow-hidden rounded-xl border border-border bg-card shadow-2xl">
                <div className="flex items-center gap-3 border-b border-border px-4 py-3">
                  <Avatar src={user?.avatar} name={user?.name} size="md" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-foreground">
                      {user?.name || "Guest"}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {user?.handle || user?.email}
                    </p>
                  </div>
                </div>
                <nav className="p-1.5">
                  {[
                    { to: "/profile", label: "Your channel", icon: User },
                    { to: "/upload", label: "Upload video", icon: Upload },
                    { to: "/admin", label: "Admin dashboard", icon: Shield },
                    { to: "/profile", label: "Settings", icon: Settings },
                  ].map((item, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setMenuOpen(false);
                        navigate(item.to);
                      }}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-foreground transition-colors hover:bg-secondary"
                    >
                      <item.icon className="h-4 w-4 text-muted-foreground" />
                      {item.label}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="mt-1 flex w-full items-center gap-3 rounded-lg border-t border-border px-3 py-2 text-sm text-destructive transition-colors hover:bg-destructive/10"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;

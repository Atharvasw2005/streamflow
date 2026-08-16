import { NavLink } from "react-router-dom";
import {
  House,
  Flame,
  Clock,
  ListVideo,
  Users,
  Upload,
  Shield,
  User,
  Compass,
} from "lucide-react";
import { channels } from "../../data/mockData";
import { cn } from "../../lib/cn";

const primaryLinks = [
  { to: "/", label: "Home", icon: House, end: true },
  { to: "/explore", label: "Explore", icon: Compass },
  { to: "/subscriptions", label: "Subscriptions", icon: Users },
];

const libraryLinks = [
  { to: "/history", label: "History", icon: Clock },
  { to: "/profile", label: "Your videos", icon: ListVideo },
  { to: "/upload", label: "Upload", icon: Upload },
];

const adminLinks = [
  { to: "/admin", label: "Overview", icon: Shield, end: true },
  { to: "/admin/users", label: "Users", icon: User },
  { to: "/admin/videos", label: "Videos", icon: Flame },
];

function SidebarLink({ to, label, icon: Icon, end, onNavigate }) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onNavigate}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-4 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
          isActive
            ? "bg-primary/12 text-primary"
            : "text-muted-foreground hover:bg-secondary hover:text-foreground"
        )
      }
    >
      <Icon className="h-5 w-5 shrink-0" />
      <span className="truncate">{label}</span>
    </NavLink>
  );
}

function Section({ title, children }) {
  return (
    <div className="py-3">
      {title && (
        <p className="px-3 pb-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
          {title}
        </p>
      )}
      <div className="space-y-0.5">{children}</div>
    </div>
  );
}

function Sidebar({ open, onNavigate }) {
  const subs = channels.slice(0, 5);

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-background/70 backdrop-blur-sm lg:hidden"
          onClick={onNavigate}
          aria-hidden="true"
        />
      )}
      <aside
        className={cn(
          "fixed left-0 top-16 z-30 h-[calc(100vh-4rem)] w-64 shrink-0 overflow-y-auto border-r border-border bg-background transition-transform duration-200 lg:sticky lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <nav className="flex flex-col px-3 pb-8">
          <Section>
            {primaryLinks.map((l) => (
              <SidebarLink key={l.to} {...l} onNavigate={onNavigate} />
            ))}
          </Section>

          <div className="border-t border-border" />
          <Section title="Library">
            {libraryLinks.map((l) => (
              <SidebarLink key={l.label} {...l} onNavigate={onNavigate} />
            ))}
          </Section>

          <div className="border-t border-border" />
          <Section title="Subscriptions">
            {subs.map((c) => (
              <NavLink
                key={c.id}
                to={`/channel/${c.id}`}
                onClick={onNavigate}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                    isActive
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )
                }
              >
                <img
                  src={c.avatar || "/placeholder.svg"}
                  alt=""
                  className="h-6 w-6 rounded-full object-cover"
                />
                <span className="truncate">{c.name}</span>
                {c.live && (
                  <span className="ml-auto h-2 w-2 rounded-full bg-destructive" />
                )}
              </NavLink>
            ))}
          </Section>

          <div className="border-t border-border" />
          <Section title="Admin">
            {adminLinks.map((l) => (
              <SidebarLink key={l.label} {...l} onNavigate={onNavigate} />
            ))}
          </Section>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;

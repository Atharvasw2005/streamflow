import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { clearAuthSession } from "../features/auth/authService";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/upload", label: "Upload" },
];

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuthSession();
    navigate("/login");
  };

  const getNavLinkClass = ({ isActive }) =>
    `rounded-md px-3 py-2 text-sm transition ${
      isActive
        ? "bg-slate-800 text-white"
        : "text-slate-300 hover:bg-slate-800 hover:text-white"
    }`;

  return (
    <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-lg font-semibold text-blue-400">
            StreamFlow
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={getNavLinkClass}>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="hidden flex-1 items-center justify-end gap-3 md:flex">
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-200 hover:border-slate-500"
          >
            Logout
          </button>
        </div>

        <button
          type="button"
          className="rounded-md border border-slate-700 p-2 text-slate-200 md:hidden"
          onClick={() => setMobileOpen((current) => !current)}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="space-y-3 border-t border-slate-800 px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={getNavLinkClass}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-200"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;

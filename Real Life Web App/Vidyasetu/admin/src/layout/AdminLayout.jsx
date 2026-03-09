import { Outlet, NavLink, Link, useNavigate } from "react-router-dom";
import { authApi } from "../services/api";

function navClass({ isActive }) {
  return `block px-4 py-3 rounded-xl text-sm font-medium transition ${
    isActive
      ? "bg-amber-500 text-black"
      : "text-slate-200 hover:bg-white/10"
  }`;
}

export default function AdminLayout({ user, setUser }) {
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await authApi.logout();
    } catch {
      // ignore
    } finally {
      setUser(null);
      navigate("/login", { replace: true });
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="grid lg:grid-cols-[260px_1fr]">
        {/* Sidebar */}
        <aside className="border-r border-white/10 min-h-screen p-4 bg-slate-900">
          <Link to="/" className="block text-2xl font-bold text-amber-400 px-2 py-3">
            Admin Panel
          </Link>

          <nav className="mt-6 space-y-2">
            <NavLink to="/" end className={navClass}>
              Dashboard
            </NavLink>
            <NavLink to="/leads" className={navClass}>
              Leads
            </NavLink>
            <NavLink to="/teachers" className={navClass}>
              Teachers
            </NavLink>
          </nav>
        </aside>

        {/* Main */}
        <div className="min-h-screen">
          <header className="h-16 border-b border-white/10 bg-slate-950 px-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Welcome</p>
              <p className="font-semibold">{user?.name || "Admin"}</p>
            </div>

            <button
              onClick={handleLogout}
              className="bg-white/10 border border-white/10 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-white/15"
            >
              Logout
            </button>
          </header>

          <main className="p-6 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
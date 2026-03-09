import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { authApi } from "../services/api";
import AlertBox from "../components/AlertBox";

export default function Login({ setUser, refreshMe }) {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function update(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await authApi.login({
        email: form.email.trim(),
        password: form.password,
      });

      await refreshMe();

      const meRes = await authApi.me();
      const user = meRes.data?.user || null;

      setUser(user);

      if (user?.role !== "admin") {
        setError("This panel is only for admin users.");
        return;
      }

      navigate(from, { replace: true });
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white grid place-items-center p-4">
      <div className="w-full max-w-md bg-slate-900 border border-white/10 rounded-2xl p-8">
        <h1 className="text-2xl font-bold">Admin Login</h1>
        <p className="text-slate-400 mt-2">
          Login to manage leads, teachers, and follow-ups.
        </p>

        <div className="mt-5">
          <AlertBox type="error" message={error} />
        </div>

        <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm text-slate-300">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className="mt-2 w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 outline-none"
              placeholder="admin@gmail.com"
              required
            />
          </div>

          <div>
            <label className="text-sm text-slate-300">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => update("password", e.target.value)}
              className="mt-2 w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 text-black py-3 rounded-xl font-semibold hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-xs text-slate-500 mt-4">
          Use your seeded admin account to access the dashboard.
        </p>
      </div>
    </div>
  );
}
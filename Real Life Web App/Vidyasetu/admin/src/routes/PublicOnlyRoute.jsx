import { Navigate, Outlet } from "react-router-dom";

export default function PublicOnlyRoute({ user, loading }) {
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white grid place-items-center">
        <div className="text-center">
          <p className="text-lg font-semibold">Checking session...</p>
          <p className="text-slate-400 text-sm mt-2">Please wait</p>
        </div>
      </div>
    );
  }

  if (user && user.role === "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
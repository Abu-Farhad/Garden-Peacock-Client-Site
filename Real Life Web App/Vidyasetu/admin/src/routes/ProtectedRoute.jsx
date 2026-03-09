import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRoute({ user, loading }) {
  const location = useLocation();

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

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (user.role !== "admin") {
    return (
      <div className="min-h-screen bg-slate-950 text-white grid place-items-center p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Access denied</h1>
          <p className="text-slate-400 mt-2">
            This panel is only for admins.
          </p>
        </div>
      </div>
    );
  }

  return <Outlet />;
}
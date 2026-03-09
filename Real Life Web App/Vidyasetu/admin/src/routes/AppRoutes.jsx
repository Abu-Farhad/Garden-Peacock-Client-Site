import { Routes, Route } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Leads from "../pages/Leads";
import Teachers from "../pages/Teachers";
import ProtectedRoute from "./ProtectedRoute";
import PublicOnlyRoute from "./PublicOnlyRoute";
import LeadDetails from "../pages/LeadDetails";

export default function AppRoutes({ user, loading, setUser, refreshMe }) {
  return (
    <Routes>
      {/* Public only */}
      <Route element={<PublicOnlyRoute user={user} loading={loading} />}>
        <Route
          path="/login"
          element={<Login setUser={setUser} refreshMe={refreshMe} />}
        />
      </Route>

      {/* Protected admin */}
      <Route element={<ProtectedRoute user={user} loading={loading} />}>
        <Route element={<AdminLayout user={user} setUser={setUser} />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/leads/:id" element={<LeadDetails />} />
        </Route>
      </Route>
    </Routes>
  );
}
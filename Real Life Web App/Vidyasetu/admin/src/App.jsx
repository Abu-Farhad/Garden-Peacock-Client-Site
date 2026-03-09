import { useEffect, useState } from "react";
import AppRoutes from "./routes/AppRoutes";
import { authApi } from "./services/api";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadMe() {
    setLoading(true);
    try {
      const res = await authApi.me();
      setUser(res.data?.user || null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMe();
  }, []);

  return (
    <AppRoutes
      user={user}
      loading={loading}
      setUser={setUser}
      refreshMe={loadMe}
    />
  );
}
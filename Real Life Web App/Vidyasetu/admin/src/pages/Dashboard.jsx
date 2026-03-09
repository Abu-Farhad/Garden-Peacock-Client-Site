import { useEffect, useState } from "react";
import { adminApi, followupsApi, leadsApi } from "../services/api";
import AlertBox from "../components/AlertBox";

function StatCard({ title, value, sub }) {
  return (
    <div className="bg-slate-900 border border-white/10 rounded-2xl p-6">
      <p className="text-sm text-slate-400">{title}</p>
      <h3 className="text-3xl font-bold text-white mt-2">{value}</h3>
      {sub ? <p className="text-xs text-slate-500 mt-2">{sub}</p> : null}
    </div>
  );
}

function formatDateTime(v) {
  if (!v) return "—";
  try {
    return new Date(v).toLocaleString();
  } catch {
    return "—";
  }
}

function getTodayRange() {
  const now = new Date();

  const start = new Date(now);
  start.setHours(0, 0, 0, 0);

  const end = new Date(now);
  end.setHours(23, 59, 59, 999);

  return {
    from: start.toISOString(),
    to: end.toISOString(),
  };
}

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [stats, setStats] = useState({
    totalLeads: 0,
    newLeads: 0,
    contactedLeads: 0,
    assignedLeads: 0,
    convertedLeads: 0,
    totalTeachers: 0,
    verifiedTeachers: 0,
    followupsToday: 0,
  });

  const [todayFollowups, setTodayFollowups] = useState([]);
  const [recentLeads, setRecentLeads] = useState([]);

  useEffect(() => {
    let ignore = false;

    async function loadDashboard() {
      setLoading(true);
      setError("");

      try {
        const { from, to } = getTodayRange();

        const [
          leadsAllRes,
          leadsNewRes,
          leadsContactedRes,
          leadsAssignedRes,
          leadsConvertedRes,
          teachersAllRes,
          teachersVerifiedRes,
          followupsTodayRes,
          recentLeadsRes,
        ] = await Promise.all([
          leadsApi.list({ page: 1, limit: 1 }),
          leadsApi.list({ page: 1, limit: 1, status: "new" }),
          leadsApi.list({ page: 1, limit: 1, status: "contacted" }),
          leadsApi.list({ page: 1, limit: 1, status: "assigned" }),
          leadsApi.list({ page: 1, limit: 1, status: "converted" }),
          adminApi.teachers({ page: 1, limit: 1 }),
          adminApi.teachers({ page: 1, limit: 1, verified: true }),
          followupsApi.list({ page: 1, limit: 10, from, to }),
          leadsApi.list({ page: 1, limit: 5, sort: "newest" }),
        ]);

        if (ignore) return;

        setStats({
          totalLeads: leadsAllRes.data?.total || 0,
          newLeads: leadsNewRes.data?.total || 0,
          contactedLeads: leadsContactedRes.data?.total || 0,
          assignedLeads: leadsAssignedRes.data?.total || 0,
          convertedLeads: leadsConvertedRes.data?.total || 0,
          totalTeachers: teachersAllRes.data?.total || 0,
          verifiedTeachers: teachersVerifiedRes.data?.total || 0,
          followupsToday: followupsTodayRes.data?.total || 0,
        });

        setTodayFollowups(followupsTodayRes.data?.leads || []);
        setRecentLeads(recentLeadsRes.data?.leads || []);
      } catch (e) {
        if (ignore) return;
        setError(e?.response?.data?.message || "Failed to load dashboard");
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    loadDashboard();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-slate-400 mt-2">
          Overview of leads, teachers, and follow-ups.
        </p>
      </div>

      <div className="mt-4">
        <AlertBox type="error" message={error} />
      </div>

      {loading ? (
        <div className="mt-6 grid md:grid-cols-2 xl:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-slate-900 border border-white/10 rounded-2xl p-6 animate-pulse"
            >
              <div className="h-4 bg-slate-800 rounded w-1/2" />
              <div className="h-8 bg-slate-800 rounded w-1/3 mt-4" />
              <div className="h-3 bg-slate-800 rounded w-2/3 mt-4" />
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* Stats */}
          <div className="mt-6 grid md:grid-cols-2 xl:grid-cols-4 gap-5">
            <StatCard title="Total Leads" value={stats.totalLeads} />
            <StatCard title="New Leads" value={stats.newLeads} />
            <StatCard title="Contacted Leads" value={stats.contactedLeads} />
            <StatCard title="Assigned Leads" value={stats.assignedLeads} />
            <StatCard title="Converted Leads" value={stats.convertedLeads} />
            <StatCard title="Total Teachers" value={stats.totalTeachers} />
            <StatCard title="Verified Teachers" value={stats.verifiedTeachers} />
            <StatCard title="Follow-ups Today" value={stats.followupsToday} />
          </div>

          <div className="mt-8 grid xl:grid-cols-2 gap-6">
            {/* Today's followups */}
            <div className="bg-slate-900 border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white">Today’s Follow-ups</h2>

              <div className="mt-5 space-y-4">
                {todayFollowups.length === 0 ? (
                  <p className="text-slate-400 text-sm">
                    No follow-ups scheduled for today.
                  </p>
                ) : (
                  todayFollowups.map((lead) => (
                    <div
                      key={lead.id}
                      className="bg-slate-950 border border-white/10 rounded-xl p-4"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-semibold text-slate-100">
                            {lead.studentName}
                          </p>
                          <p className="text-xs text-slate-400 mt-1">
                            {lead.phone}
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            {lead.deliveryMode} / {lead.subMode}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="text-xs text-slate-400">
                            {formatDateTime(lead.nextFollowUpAt)}
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            {lead.status}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Recent leads */}
            <div className="bg-slate-900 border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white">Recent Leads</h2>

              <div className="mt-5 space-y-4">
                {recentLeads.length === 0 ? (
                  <p className="text-slate-400 text-sm">No recent leads found.</p>
                ) : (
                  recentLeads.map((lead) => (
                    <div
                      key={lead.id}
                      className="bg-slate-950 border border-white/10 rounded-xl p-4"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-semibold text-slate-100">
                            {lead.studentName}
                          </p>
                          <p className="text-xs text-slate-400 mt-1">
                            {lead.phone}
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            {lead.location || "—"} • {lead.deliveryMode || "—"}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="text-xs text-slate-400">
                            {lead.createdAt
                              ? new Date(lead.createdAt).toLocaleDateString()
                              : "—"}
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            {lead.status}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
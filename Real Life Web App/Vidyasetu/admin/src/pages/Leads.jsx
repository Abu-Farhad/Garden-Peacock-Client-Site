import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { leadsApi } from "../services/api";
import AlertBox from "../components/AlertBox";
import { Link } from "react-router-dom";

const STATUS_OPTIONS = [
  "",
  "new",
  "contacted",
  "assigned",
  "converted",
  "closed",
];

export default function Leads() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const limit = 10;
  const [total, setTotal] = useState(0);

  const [filters, setFilters] = useState({
    q: "",
    status: "",
    sort: "newest",
  });

  const totalPages = Math.max(1, Math.ceil(total / limit));

  const params = useMemo(() => {
    const p = { page, limit };
    if (filters.q.trim()) p.q = filters.q.trim();
    if (filters.status) p.status = filters.status;
    if (filters.sort) p.sort = filters.sort;
    return p;
  }, [filters, page]);

  useEffect(() => {
    let ignore = false;

    async function load() {
      setLoading(true);
      setError("");
      try {
        const res = await leadsApi.list(params);
        if (ignore) return;

        setItems(res.data?.leads || []);
        setTotal(res.data?.total || 0);
      } catch (e) {
        if (ignore) return;
        setError(e?.response?.data?.message || "Failed to load leads");
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, [params]);

  function update(key, value) {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  }

  function resetFilters() {
    setFilters({
      q: "",
      status: "",
      sort: "newest",
    });
    setPage(1);
  }

  function badgeClass(status) {
    switch (status) {
      case "new":
        return "bg-blue-500/10 border border-blue-500/30 text-blue-200";
      case "contacted":
        return "bg-amber-500/10 border border-amber-500/30 text-amber-200";
      case "assigned":
        return "bg-purple-500/10 border border-purple-500/30 text-purple-200";
      case "converted":
        return "bg-emerald-500/10 border border-emerald-500/30 text-emerald-200";
      case "closed":
        return "bg-slate-500/10 border border-slate-500/30 text-slate-300";
      default:
        return "bg-white/5 border border-white/10 text-slate-300";
    }
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Leads</h1>
          <p className="text-slate-400 mt-2">
            Manage student requirements, follow-ups, and assignments.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-6 bg-slate-900 border border-white/10 rounded-2xl p-5">
        <div className="grid lg:grid-cols-[1fr_180px_180px_auto] gap-3">
          <div className="flex items-center gap-2 bg-slate-950 border border-white/10 rounded-xl px-3 py-3">
            <Search size={18} className="text-slate-400" />
            <input
              value={filters.q}
              onChange={(e) => update("q", e.target.value)}
              className="w-full bg-transparent outline-none text-sm"
              placeholder="Search by student name, phone, location"
            />
          </div>

          <select
            value={filters.status}
            onChange={(e) => update("status", e.target.value)}
            className="bg-slate-950 border border-white/10 rounded-xl px-3 py-3 text-sm outline-none"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s || "all"} value={s}>
                {s ? `Status: ${s}` : "All statuses"}
              </option>
            ))}
          </select>

          <select
            value={filters.sort}
            onChange={(e) => update("sort", e.target.value)}
            className="bg-slate-950 border border-white/10 rounded-xl px-3 py-3 text-sm outline-none"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="nextFollowUpSoon">Next follow-up soon</option>
            <option value="nextFollowUpLate">Next follow-up late</option>
          </select>

          <button
            onClick={resetFilters}
            className="bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-sm font-semibold hover:bg-white/15"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Alerts */}
      <div className="mt-4">
        <AlertBox type="error" message={error} />
      </div>

      {/* Table */}
      <div className="mt-6 bg-slate-900 border border-white/10 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-4 animate-pulse">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-14 bg-slate-800 rounded-xl" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="p-8 text-center">
            <p className="font-semibold text-slate-200">No leads found</p>
            <p className="text-slate-400 text-sm mt-2">
              Try changing filters or wait for new leads from the client site.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead className="bg-slate-950/80 border-b border-white/10">
                <tr className="text-left text-sm text-slate-400">
                  <th className="px-5 py-4">Student</th>
                  <th className="px-5 py-4">Phone</th>
                  <th className="px-5 py-4">Mode</th>
                  <th className="px-5 py-4">Location</th>
                  <th className="px-5 py-4">Budget</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Next Follow-up</th>
                  <th className="px-5 py-4">Created</th>
                </tr>
              </thead>

              <tbody>
                {items.map((lead) => (
                  <tr
                    key={lead.id}
                    className="border-b border-white/5 hover:bg-white/3 transition"
                  >
                    <td className="px-5 py-4">
                      <Link to={`/leads/${lead.id}`} className="block">
                        <p className="font-semibold text-slate-100 hover:text-amber-300 transition">
                          {lead.studentName}
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                          {lead.email || "No email"}
                        </p>
                      </Link>
                    </td>

                    <td className="px-5 py-4 text-slate-200">{lead.phone}</td>

                    <td className="px-5 py-4">
                      <div className="text-sm text-slate-200">
                        {lead.deliveryMode || "—"}
                      </div>
                      <div className="text-xs text-slate-400 mt-1">
                        {lead.subMode || "—"}
                      </div>
                    </td>

                    <td className="px-5 py-4 text-slate-300">
                      {lead.location || "—"}
                    </td>

                    <td className="px-5 py-4 text-slate-300">
                      {lead.budget != null ? `₹${lead.budget}` : "—"}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${badgeClass(
                          lead.status,
                        )}`}
                      >
                        {lead.status}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-slate-300 text-sm">
                      {lead.nextFollowUpAt
                        ? new Date(lead.nextFollowUpAt).toLocaleString()
                        : "—"}
                    </td>

                    <td className="px-5 py-4 text-slate-400 text-sm">
                      {lead.createdAt
                        ? new Date(lead.createdAt).toLocaleDateString()
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Footer / pagination */}
      <div className="mt-5 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate-400">
          Page <span className="text-slate-200 font-semibold">{page}</span> of{" "}
          <span className="text-slate-200 font-semibold">{totalPages}</span>
          {" · "}
          Total Leads:{" "}
          <span className="text-slate-200 font-semibold">{total}</span>
        </p>

        <div className="flex gap-2">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="px-4 py-2 rounded-xl bg-white/10 border border-white/10 disabled:opacity-40"
          >
            Prev
          </button>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 rounded-xl bg-white/10 border border-white/10 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

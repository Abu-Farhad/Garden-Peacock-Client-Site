import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { adminApi } from "../services/api";
import AlertBox from "../components/AlertBox";

export default function Teachers() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [savingId, setSavingId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [page, setPage] = useState(1);
  const limit = 10;
  const [total, setTotal] = useState(0);

  const [filters, setFilters] = useState({
    q: "",
    verified: "",
    subject: "",
    mode: "",
    location: "",
  });

  const totalPages = Math.max(1, Math.ceil(total / limit));

  const params = useMemo(() => {
    const p = { page, limit };
    if (filters.q.trim()) p.q = filters.q.trim();
    if (filters.verified) p.verified = filters.verified;
    if (filters.subject.trim()) p.subject = filters.subject.trim();
    if (filters.mode.trim()) p.mode = filters.mode.trim();
    if (filters.location.trim()) p.location = filters.location.trim();
    return p;
  }, [filters, page]);

  async function loadTeachers() {
    setLoading(true);
    setError("");

    try {
      const res = await adminApi.teachers(params);
      setItems(res.data?.teachers || []);
      setTotal(res.data?.total || 0);
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to load teachers");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTeachers();
  }, [params]);

  function updateFilter(key, value) {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  }

  function resetFilters() {
    setFilters({
      q: "",
      verified: "",
      subject: "",
      mode: "",
      location: "",
    });
    setPage(1);
  }

  async function handleToggleVerify(item) {
    setSavingId(item.id);
    setError("");
    setSuccess("");

    try {
      const res = await adminApi.updateTeacher(item.id, {
        verified: !item.verified,
      });
      setSuccess(res.data?.message || "Teacher updated");
      await loadTeachers();
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to update teacher");
    } finally {
      setSavingId("");
    }
  }

  async function handleRatingSave(item, ratingValue) {
    setSavingId(item.id);
    setError("");
    setSuccess("");

    try {
      const res = await adminApi.updateTeacher(item.id, {
        rating: Number(ratingValue),
      });
      setSuccess(res.data?.message || "Rating updated");
      await loadTeachers();
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to update rating");
    } finally {
      setSavingId("");
    }
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Teachers</h1>
          <p className="text-slate-400 mt-2">
            Manage teacher verification, rating, and profile overview.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-6 bg-slate-900 border border-white/10 rounded-2xl p-5">
        <div className="grid lg:grid-cols-[1fr_180px_180px_180px_180px_auto] gap-3">
          <div className="flex items-center gap-2 bg-slate-950 border border-white/10 rounded-xl px-3 py-3">
            <Search size={18} className="text-slate-400" />
            <input
              value={filters.q}
              onChange={(e) => updateFilter("q", e.target.value)}
              className="w-full bg-transparent outline-none text-sm"
              placeholder="Search by name, email, phone, subject"
            />
          </div>

          <select
            value={filters.verified}
            onChange={(e) => updateFilter("verified", e.target.value)}
            className="bg-slate-950 border border-white/10 rounded-xl px-3 py-3 text-sm outline-none"
          >
            <option value="">All verified</option>
            <option value="true">Verified</option>
            <option value="false">Not verified</option>
          </select>

          <input
            value={filters.subject}
            onChange={(e) => updateFilter("subject", e.target.value)}
            className="bg-slate-950 border border-white/10 rounded-xl px-3 py-3 text-sm outline-none"
            placeholder="Subject"
          />

          <input
            value={filters.mode}
            onChange={(e) => updateFilter("mode", e.target.value)}
            className="bg-slate-950 border border-white/10 rounded-xl px-3 py-3 text-sm outline-none"
            placeholder="Mode"
          />

          <input
            value={filters.location}
            onChange={(e) => updateFilter("location", e.target.value)}
            className="bg-slate-950 border border-white/10 rounded-xl px-3 py-3 text-sm outline-none"
            placeholder="Location"
          />

          <button
            onClick={resetFilters}
            className="bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-sm font-semibold hover:bg-white/15"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        <AlertBox type="error" message={error} />
        <AlertBox type="success" message={success} />
      </div>

      {/* Table */}
      <div className="mt-6 bg-slate-900 border border-white/10 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-4 animate-pulse">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-16 bg-slate-800 rounded-xl" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="p-8 text-center">
            <p className="font-semibold text-slate-200">No teachers found</p>
            <p className="text-slate-400 text-sm mt-2">
              Try changing filters or wait for teacher registrations.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px]">
              <thead className="bg-slate-950/80 border-b border-white/10">
                <tr className="text-left text-sm text-slate-400">
                  <th className="px-5 py-4">Teacher</th>
                  <th className="px-5 py-4">Subjects</th>
                  <th className="px-5 py-4">Modes</th>
                  <th className="px-5 py-4">Locations</th>
                  <th className="px-5 py-4">Fees</th>
                  <th className="px-5 py-4">Rating</th>
                  <th className="px-5 py-4">Verified</th>
                  <th className="px-5 py-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {items.map((item) => (
                  <TeacherRow
                    key={item.id}
                    item={item}
                    saving={savingId === item.id}
                    onToggleVerify={() => handleToggleVerify(item)}
                    onSaveRating={(ratingValue) =>
                      handleRatingSave(item, ratingValue)
                    }
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="mt-5 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate-400">
          Page <span className="text-slate-200 font-semibold">{page}</span> of{" "}
          <span className="text-slate-200 font-semibold">{totalPages}</span>
          {" · "}
          Total Teachers:{" "}
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

function TeacherRow({ item, saving, onToggleVerify, onSaveRating }) {
  const [ratingValue, setRatingValue] = useState(item.rating ?? 0);

  return (
    <tr className="border-b border-white/5 hover:bg-white/[0.03] transition">
      <td className="px-5 py-4">
        <div>
          <p className="font-semibold text-slate-100">
            {item.user?.name || "Teacher"}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            {item.user?.email || "No email"}
          </p>
          <p className="text-xs text-slate-500 mt-1">
            {item.user?.phone || "No phone"}
          </p>
        </div>
      </td>

      <td className="px-5 py-4 text-slate-300 text-sm">
        {(item.subjects || []).join(", ") || "—"}
      </td>

      <td className="px-5 py-4 text-slate-300 text-sm">
        {(item.deliveryModes || []).join(", ") || "—"}
      </td>

      <td className="px-5 py-4 text-slate-300 text-sm">
        {(item.locationsCovered || []).join(", ") || "—"}
      </td>

      <td className="px-5 py-4 text-slate-300 text-sm">
        {item.feesMin != null && item.feesMax != null
          ? `₹${item.feesMin} - ₹${item.feesMax}`
          : "—"}
      </td>

      <td className="px-5 py-4">
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="0"
            max="5"
            step="0.1"
            value={ratingValue}
            onChange={(e) => setRatingValue(e.target.value)}
            className="w-20 bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none"
          />
          <button
            onClick={() => onSaveRating(ratingValue)}
            disabled={saving}
            className="px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-sm font-semibold hover:bg-white/15 disabled:opacity-60"
          >
            Save
          </button>
        </div>
      </td>

      <td className="px-5 py-4">
        <span
          className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
            item.verified
              ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-200"
              : "bg-slate-500/10 border border-slate-500/30 text-slate-300"
          }`}
        >
          {item.verified ? "Verified" : "Not verified"}
        </span>
      </td>

      <td className="px-5 py-4">
        <button
          onClick={onToggleVerify}
          disabled={saving}
          className={`px-4 py-2 rounded-xl text-sm font-semibold disabled:opacity-60 ${
            item.verified
              ? "bg-white/10 border border-white/10 text-white hover:bg-white/15"
              : "bg-amber-500 text-black hover:opacity-90"
          }`}
        >
          {item.verified ? "Unverify" : "Verify"}
        </button>
      </td>
    </tr>
  );
}
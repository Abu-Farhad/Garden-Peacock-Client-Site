import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { adminApi, leadsApi } from "../services/api";
import AlertBox from "../components/AlertBox";

const STATUS_OPTIONS = ["new", "contacted", "assigned", "converted", "closed"];
const ACTIVITY_TYPES = ["call", "whatsapp", "sms", "email", "meeting"];
const ACTIVITY_OUTCOMES = [
  "connected",
  "not_picked",
  "busy",
  "wrong_number",
  "interested",
  "not_interested",
  "call_later",
  "converted",
];

function formatDateTime(v) {
  if (!v) return "—";
  try {
    return new Date(v).toLocaleString();
  } catch {
    return "—";
  }
}

export default function LeadDetails() {
  const { id } = useParams();

  const [lead, setLead] = useState(null);
  const [activities, setActivities] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [updateForm, setUpdateForm] = useState({
    status: "",
    note: "",
    nextFollowUpAt: "",
    markContactedNow: false,
  });

  const [activityForm, setActivityForm] = useState({
    type: "call",
    outcome: "call_later",
    note: "",
    nextFollowUpAt: "",
    status: "",
  });

  async function loadAll() {
    setLoading(true);
    setError("");

    try {
      const [leadRes, activitiesRes, suggestionsRes] = await Promise.all([
        leadsApi.getById(id),
        leadsApi.activities(id, { page: 1, limit: 20 }),
        leadsApi.suggestions(id),
      ]);

      const leadData = leadRes.data?.lead || null;
      setLead(leadData);
      setActivities(activitiesRes.data?.activities || []);
      setSuggestions(suggestionsRes.data?.suggestions || []);

      setUpdateForm((prev) => ({
        ...prev,
        status: leadData?.status || "",
        nextFollowUpAt: leadData?.nextFollowUpAt
          ? new Date(leadData.nextFollowUpAt).toISOString().slice(0, 16)
          : "",
      }));
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to load lead details");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAll();
  }, [id]);

  function updateUpdateForm(key, value) {
    setUpdateForm((prev) => ({ ...prev, [key]: value }));
  }

  function updateActivityForm(key, value) {
    setActivityForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleLeadUpdate(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const payload = {
        status: updateForm.status || undefined,
        note: updateForm.note.trim() || undefined,
        nextFollowUpAt: updateForm.nextFollowUpAt
          ? new Date(updateForm.nextFollowUpAt).toISOString()
          : undefined,
        markContactedNow: Boolean(updateForm.markContactedNow),
      };

      const res = await leadsApi.update(id, payload);
      setSuccess(res.data?.message || "Lead updated");

      setUpdateForm((prev) => ({
        ...prev,
        note: "",
        markContactedNow: false,
      }));

      await loadAll();
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to update lead");
    } finally {
      setSaving(false);
    }
  }

  async function handleAddActivity(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const payload = {
        type: activityForm.type,
        outcome: activityForm.outcome,
        note: activityForm.note.trim() || undefined,
        nextFollowUpAt: activityForm.nextFollowUpAt
          ? new Date(activityForm.nextFollowUpAt).toISOString()
          : undefined,
        status: activityForm.status || undefined,
      };

      const res = await leadsApi.addActivity(id, payload);
      setSuccess(res.data?.message || "Activity added");

      setActivityForm({
        type: "call",
        outcome: "call_later",
        note: "",
        nextFollowUpAt: "",
        status: "",
      });

      await loadAll();
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to add activity");
    } finally {
      setSaving(false);
    }
  }

  async function handleAssignTeacher(teacherProfileId) {
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const res = await adminApi.assignTeacherToLead(id, {
        teacherProfileId,
        note: "Assigned from teacher suggestions",
      });
      setSuccess(res.data?.message || "Teacher assigned");
      await loadAll();
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to assign teacher");
    } finally {
      setSaving(false);
    }
  }

  async function handleUnlock() {
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const res = await adminApi.unlockLeadContact(id, {});
      setSuccess(res.data?.message || "Contact unlocked");
      await loadAll();
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to unlock contact");
    } finally {
      setSaving(false);
    }
  }

  function statusBadgeClass(status) {
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

  if (loading) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-white">Lead Details</h1>
        <div className="mt-6 bg-slate-900 border border-white/10 rounded-2xl p-6 animate-pulse space-y-4">
          <div className="h-6 bg-slate-800 rounded w-1/3" />
          <div className="h-20 bg-slate-800 rounded" />
          <div className="h-40 bg-slate-800 rounded" />
        </div>
      </div>
    );
  }

  if (!lead) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-white">Lead Details</h1>
        <div className="mt-6 bg-slate-900 border border-white/10 rounded-2xl p-8 text-center">
          <p className="text-slate-200 font-semibold">Lead not found</p>
          <Link
            to="/leads"
            className="inline-block mt-4 bg-amber-500 text-black px-5 py-2 rounded-xl font-semibold"
          >
            Back to Leads
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <Link to="/leads" className="text-sm text-slate-400 hover:text-white">
            ← Back to Leads
          </Link>
          <h1 className="text-3xl font-bold text-white mt-2">
            {lead.studentName}
          </h1>
          <p className="text-slate-400 mt-2">
            Full lead view, updates, activities, and assignment workflow.
          </p>
        </div>

        <span
          className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold h-fit ${statusBadgeClass(
            lead.status
          )}`}
        >
          {lead.status}
        </span>
      </div>

      <div className="mt-6 space-y-4">
        <AlertBox type="error" message={error} />
        <AlertBox type="success" message={success} />
      </div>

      <div className="mt-6 grid xl:grid-cols-[1.2fr_0.8fr] gap-6">
        {/* Left column */}
        <div className="space-y-6">
          {/* Lead info */}
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-bold">Lead Information</h2>

            <div className="mt-5 grid md:grid-cols-2 gap-4 text-sm">
              <div className="bg-slate-950 border border-white/10 rounded-xl p-4">
                <p className="text-slate-400 text-xs">Phone</p>
                <p className="mt-1 font-semibold text-slate-100">{lead.phone || "—"}</p>
              </div>

              <div className="bg-slate-950 border border-white/10 rounded-xl p-4">
                <p className="text-slate-400 text-xs">Email</p>
                <p className="mt-1 font-semibold text-slate-100">{lead.email || "—"}</p>
              </div>

              <div className="bg-slate-950 border border-white/10 rounded-xl p-4">
                <p className="text-slate-400 text-xs">Class</p>
                <p className="mt-1 font-semibold text-slate-100">{lead.classLevel || "—"}</p>
              </div>

              <div className="bg-slate-950 border border-white/10 rounded-xl p-4">
                <p className="text-slate-400 text-xs">Subjects</p>
                <p className="mt-1 font-semibold text-slate-100">
                  {(lead.subjects || []).join(", ") || "—"}
                </p>
              </div>

              <div className="bg-slate-950 border border-white/10 rounded-xl p-4">
                <p className="text-slate-400 text-xs">Mode</p>
                <p className="mt-1 font-semibold text-slate-100">
                  {lead.deliveryMode || "—"} / {lead.subMode || "—"}
                </p>
              </div>

              <div className="bg-slate-950 border border-white/10 rounded-xl p-4">
                <p className="text-slate-400 text-xs">Location</p>
                <p className="mt-1 font-semibold text-slate-100">{lead.location || "—"}</p>
              </div>

              <div className="bg-slate-950 border border-white/10 rounded-xl p-4">
                <p className="text-slate-400 text-xs">Budget</p>
                <p className="mt-1 font-semibold text-slate-100">
                  {lead.budget != null ? `₹${lead.budget}` : "—"}
                </p>
              </div>

              <div className="bg-slate-950 border border-white/10 rounded-xl p-4">
                <p className="text-slate-400 text-xs">Preferred Time</p>
                <p className="mt-1 font-semibold text-slate-100">
                  {lead.preferredTime || "—"}
                </p>
              </div>

              <div className="bg-slate-950 border border-white/10 rounded-xl p-4">
                <p className="text-slate-400 text-xs">Exam Goal</p>
                <p className="mt-1 font-semibold text-slate-100">{lead.examGoal || "—"}</p>
              </div>

              <div className="bg-slate-950 border border-white/10 rounded-xl p-4">
                <p className="text-slate-400 text-xs">Board</p>
                <p className="mt-1 font-semibold text-slate-100">{lead.board || "—"}</p>
              </div>
            </div>
          </div>

          {/* Update lead */}
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-bold">Update Lead</h2>

            <form className="mt-5 space-y-4" onSubmit={handleLeadUpdate}>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-slate-300">Status</label>
                  <select
                    value={updateForm.status}
                    onChange={(e) => updateUpdateForm("status", e.target.value)}
                    className="mt-2 w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 outline-none"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option value={s} key={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm text-slate-300">Next Follow-up</label>
                  <input
                    type="datetime-local"
                    value={updateForm.nextFollowUpAt}
                    onChange={(e) =>
                      updateUpdateForm("nextFollowUpAt", e.target.value)
                    }
                    className="mt-2 w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-slate-300">Add Note</label>
                <textarea
                  value={updateForm.note}
                  onChange={(e) => updateUpdateForm("note", e.target.value)}
                  className="mt-2 w-full min-h-[110px] bg-slate-950 border border-white/10 rounded-xl px-4 py-3 outline-none"
                  placeholder="Write an update note..."
                />
              </div>

              <label className="flex items-center gap-3 text-sm text-slate-300">
                <input
                  type="checkbox"
                  checked={updateForm.markContactedNow}
                  onChange={(e) =>
                    updateUpdateForm("markContactedNow", e.target.checked)
                  }
                />
                Mark contacted now
              </label>

              <button
                type="submit"
                disabled={saving}
                className="bg-amber-500 text-black px-5 py-3 rounded-xl font-semibold disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save Lead Update"}
              </button>
            </form>
          </div>

          {/* Add activity */}
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-bold">Add Activity</h2>

            <form className="mt-5 space-y-4" onSubmit={handleAddActivity}>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm text-slate-300">Type</label>
                  <select
                    value={activityForm.type}
                    onChange={(e) => updateActivityForm("type", e.target.value)}
                    className="mt-2 w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 outline-none"
                  >
                    {ACTIVITY_TYPES.map((t) => (
                      <option value={t} key={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm text-slate-300">Outcome</label>
                  <select
                    value={activityForm.outcome}
                    onChange={(e) => updateActivityForm("outcome", e.target.value)}
                    className="mt-2 w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 outline-none"
                  >
                    {ACTIVITY_OUTCOMES.map((o) => (
                      <option value={o} key={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm text-slate-300">Lead Status (optional)</label>
                  <select
                    value={activityForm.status}
                    onChange={(e) => updateActivityForm("status", e.target.value)}
                    className="mt-2 w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 outline-none"
                  >
                    <option value="">No change</option>
                    {STATUS_OPTIONS.map((s) => (
                      <option value={s} key={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm text-slate-300">Activity Note</label>
                <textarea
                  value={activityForm.note}
                  onChange={(e) => updateActivityForm("note", e.target.value)}
                  className="mt-2 w-full min-h-[110px] bg-slate-950 border border-white/10 rounded-xl px-4 py-3 outline-none"
                  placeholder="Call summary / WhatsApp note..."
                />
              </div>

              <div>
                <label className="text-sm text-slate-300">Next Follow-up</label>
                <input
                  type="datetime-local"
                  value={activityForm.nextFollowUpAt}
                  onChange={(e) =>
                    updateActivityForm("nextFollowUpAt", e.target.value)
                  }
                  className="mt-2 w-full md:w-80 bg-slate-950 border border-white/10 rounded-xl px-4 py-3 outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={saving}
                className="bg-white/10 border border-white/10 px-5 py-3 rounded-xl font-semibold hover:bg-white/15 disabled:opacity-60"
              >
                {saving ? "Saving..." : "Add Activity"}
              </button>
            </form>
          </div>

          {/* Activity timeline */}
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-bold">Activity Timeline</h2>

            <div className="mt-5 space-y-4">
              {activities.length === 0 ? (
                <p className="text-slate-400 text-sm">No activities yet.</p>
              ) : (
                activities.map((a) => (
                  <div
                    key={a.id}
                    className="bg-slate-950 border border-white/10 rounded-xl p-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-200">
                          {a.type}
                        </span>
                        <span className="text-xs px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300">
                          {a.outcome}
                        </span>
                      </div>

                      <p className="text-xs text-slate-400">
                        {formatDateTime(a.createdAt)}
                      </p>
                    </div>

                    <p className="text-sm text-slate-200 mt-3">{a.note || "No note"}</p>

                    <p className="text-xs text-slate-400 mt-2">
                      Next follow-up: {formatDateTime(a.nextFollowUpAt)}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Quick actions */}
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-bold">Quick Actions</h2>

            <div className="mt-5 space-y-3">
              <div className="bg-slate-950 border border-white/10 rounded-xl p-4">
                <p className="text-xs text-slate-400">Assigned Teacher User ID</p>
                <p className="mt-1 text-sm text-slate-100 break-all">
                  {lead.assignedTeacherId || "Not assigned"}
                </p>
              </div>

              <div className="bg-slate-950 border border-white/10 rounded-xl p-4">
                <p className="text-xs text-slate-400">Contact Unlock</p>
                <p className="mt-1 text-sm text-slate-100">
                  {lead.isContactUnlocked ? "Unlocked" : "Locked"}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Unlocked at: {formatDateTime(lead.unlockedAt)}
                </p>
              </div>

              <button
                onClick={handleUnlock}
                disabled={saving || !lead.assignedTeacherId}
                className="w-full bg-emerald-500 text-black py-3 rounded-xl font-semibold disabled:opacity-60"
              >
                Unlock Contact for Assigned Teacher
              </button>
            </div>
          </div>

          {/* Suggestions */}
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-bold">Teacher Suggestions</h2>

            <div className="mt-5 space-y-4">
              {suggestions.length === 0 ? (
                <p className="text-slate-400 text-sm">No suggestions found.</p>
              ) : (
                suggestions.map((s, idx) => (
                  <div
                    key={s.teacherProfile?.id || idx}
                    className="bg-slate-950 border border-white/10 rounded-xl p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold text-slate-100">
                          {s.teacherProfile?.user?.name || "Teacher"}
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                          Score: {s.matchScore}
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                          {(s.teacherProfile?.subjects || []).join(", ") || "—"}
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                          {(s.teacherProfile?.locationsCovered || []).join(", ") || "—"}
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                          ₹{s.teacherProfile?.feesMin ?? "—"} - ₹{s.teacherProfile?.feesMax ?? "—"}
                        </p>
                      </div>

                      <button
                        onClick={() =>
                          handleAssignTeacher(s.teacherProfile?.id)
                        }
                        disabled={saving}
                        className="bg-amber-500 text-black px-4 py-2 rounded-xl text-sm font-semibold disabled:opacity-60"
                      >
                        Assign
                      </button>
                    </div>

                    {s.reasons?.length ? (
                      <ul className="mt-3 space-y-1">
                        {s.reasons.slice(0, 4).map((r, i) => (
                          <li key={i} className="text-xs text-slate-400">
                            • {r}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Notes */}
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-bold">Notes</h2>

            <div className="mt-5 space-y-3">
              {(lead.notes || []).length === 0 ? (
                <p className="text-slate-400 text-sm">No notes yet.</p>
              ) : (
                lead.notes.map((note, i) => (
                  <div
                    key={i}
                    className="bg-slate-950 border border-white/10 rounded-xl p-4 text-sm text-slate-200"
                  >
                    {note}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
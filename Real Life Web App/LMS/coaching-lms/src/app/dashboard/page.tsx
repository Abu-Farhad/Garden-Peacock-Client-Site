import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect(`/login?callbackUrl=/dashboard`);
  }

  const perms = session.user.permissions ?? [];


  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="mt-2 text-sm text-slate-600">
          Logged in as: <span className="font-medium">{session.user.email}</span>
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 p-5">
            <div className="text-sm font-semibold text-slate-900">Role</div>
            <div className="mt-2 text-sm text-slate-700">
              {session.user.role ?? "unknown"}

            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 p-5">
            <div className="text-sm font-semibold text-slate-900">Permissions (sample)</div>
            <div className="mt-2 text-xs text-slate-700">
              {perms.length ? perms.slice(0, 10).join(", ") : "No permissions"}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

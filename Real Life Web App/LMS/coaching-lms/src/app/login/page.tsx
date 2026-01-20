"use client"

import React, { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter, } from "next/navigation"
import { useSearchParams } from "next/navigation";


export default function LoginPage() {
    const router = useRouter();
    const params = useSearchParams()
    const callbackUrl = params.get("callbackUrl") || "/dashboard";

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState<string | null>(null);

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setErr(null);
        setLoading(true);

        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
            callbackUrl,
        });
        setLoading(false);

        if (!res || res.error) {
            setErr("Invalid email or password")
            return;
        }

        router.push(res.url || "/dashboard");
        router.refresh();
    }
    return (
        <main className="min-h-screen bg-white">
            <div className="mx-auto max-w-md px-4 py-16">
                <h1 className="text-3xl font-bold text-slate-900">Login</h1>
                <p className="mt-2 text-sm text-slate-600">Student / Admin / SuperAdmin can login here</p>

                <form onSubmit={onSubmit} className="mt-8 space-y-4">
                    <div>
                        <label className="text-sm font-medium text-slate-700">Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@example.com" required className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-200" />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-slate-700">Password</label>
                        <input className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-200" type="password" />
                    </div>

                    {err && (
                        <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{err}</div>
                    )}

                    <button type="submit" disabled={loading} className="w-full rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:opacity-90 disabled::opacity-60">{loading?"Singing in...":"Sign in"}</button>
                </form>

            </div>
        </main>
    )
}
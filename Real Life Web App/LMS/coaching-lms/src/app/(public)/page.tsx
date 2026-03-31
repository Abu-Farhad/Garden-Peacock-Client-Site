export default function HomePage() {
    return (
        <main className="min-h-screen bg-white">
            <section className="mx-auto max-w-6xl px-4 py-16">
                <div className="grid gap-10 md:grid-cols-2 md:items-center">
                    <div>
                        <p className="text0sm font-medium text-slate-600"> Farhad&apos;s coaching</p>
                        <h1 className="mt-3 text-4xl font-bold tracking-tight">Live + Recorded classes, notes, paymentss - all in one platform.</h1>
                        <p className="mt-4 text-base text-slate-600">
                            Secure student access, admin controls, RBAC permissions, Razorpay payments, ImageKit for notes, cloudflare Stream for recorded lectures.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            <a href="/courses" className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:opacity-90">
                                Explore Courses
                            </a>
                            <a href="/login" className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50">Student Login</a>
                        </div>
                        <div className="mt-8 grid grid-cols-3 gap-4">
                            {[
                                { label: "Students", value: "2,500+" },
                                { label: "Recorded lessons", value: "400+" },
                                { label: "Live batches", value: "15+" },
                            ].map((item) => (
                                <div key={item.label} className="rounded-2xl border border-slate-200 p-4">
                                    <div className="text-2xl font-bold text-slate-900">
                                        {item.value}
                                    </div>
                                    <div className="mt-1 text-xs text-slate-600">{item.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                        <div className="rounded-2xl bg-white p-5 shadow-sm">
                            <p className="text-sm font-semibold text-slate-900">Module 1 Progress</p>
                            <ul className="mt-3 space-y-2 text-sm text-slate-700">
                                <li>✅ Next.js App Router + Tailwind</li>
                                <li>✅ MongoDB connection utility</li>
                                <li>✅ Health API route</li>
                                <li>⏳ NextAuth Credentials (Module 3)</li>
                                <li>⏳ RBAC base (Module 4)</li>
                            </ul>
                            <div className="mt-5 rounded-xl border-slate-200 bg-slate-50 p-4 text-xs text-slate-700">
                                Test API: <span className="font-mono">/api/health</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
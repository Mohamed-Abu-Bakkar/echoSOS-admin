"use client";

import Link from "next/link";
import { anyApi } from "convex/server";
import { useQuery } from "convex/react";
import { ArrowLeft, Users } from "lucide-react";

export default function UsersPage() {
  const users = useQuery(anyApi.admin.listUsers, { limit: 100 });
  return <main className="min-h-screen p-6 lg:p-10">
    <Link href="/" className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-white"><ArrowLeft size={16}/> Overview</Link>
    <div className="mt-7 flex items-center gap-3"><Users className="text-slate-300"/><div><h1 className="text-2xl font-semibold">User management</h1><p className="mt-1 text-sm text-[var(--muted)]">Registered EchoSOS users · latest 100</p></div></div>
    <section className="mt-7 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--panel)]">
      {users === undefined ? <p className="p-6 text-sm text-[var(--muted)]">Loading users…</p> : users.length === 0 ? <p className="p-6 text-sm text-[var(--muted)]">No users found.</p> : <div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="bg-[#142133] text-xs uppercase tracking-wide text-slate-400"><tr><th className="px-5 py-4">Name</th><th className="px-5 py-4">Phone</th><th className="px-5 py-4">Registered</th></tr></thead><tbody className="divide-y divide-[var(--border)]">{users.map((user: any) => <tr key={user.id}><td className="px-5 py-4 font-medium">{user.name}</td><td className="px-5 py-4 text-slate-300">{user.phone}</td><td className="px-5 py-4 text-slate-400">{user.createdAt}</td></tr>)}</tbody></table></div>}
    </section>
  </main>;
}

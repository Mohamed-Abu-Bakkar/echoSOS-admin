import Link from "next/link";
import { ArrowLeft, Users } from "lucide-react";

export default function UsersPage() {
  return <main className="min-h-screen p-6 lg:p-10"><Link href="/" className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-white"><ArrowLeft size={16}/> Overview</Link><div className="mt-7 flex items-center gap-3"><Users className="text-slate-300"/><div><h1 className="text-2xl font-semibold">User management</h1><p className="mt-1 text-sm text-[var(--muted)]">Registered EchoSOS users and account details</p></div></div><section className="mt-7 rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-6"><p className="text-sm text-[var(--muted)]">User records will load from the shared Convex users table after backend admin authorization is installed. Sensitive fields such as password hashes will never be exposed.</p></section></main>;
}

import Link from "next/link";
import { ArrowLeft, Clock3 } from "lucide-react";

export default function HistoryPage() {
  return <main className="min-h-screen p-6 lg:p-10"><Link href="/" className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-white"><ArrowLeft size={16}/> Overview</Link><div className="mt-7 flex items-center gap-3"><Clock3 className="text-slate-300"/><div><h1 className="text-2xl font-semibold">Alert history</h1><p className="mt-1 text-sm text-[var(--muted)]">Historical emergency events and delivery status</p></div></div><section className="mt-7 rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-6"><p className="text-sm text-[var(--muted)]">Historical events will be loaded from alert_history with server-side pagination and filters.</p></section></main>;
}

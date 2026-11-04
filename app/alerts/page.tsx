import Link from "next/link";
import { ArrowLeft, BellRing, MapPin, ShieldAlert } from "lucide-react";

export default function AlertsPage() {
  return <main className="min-h-screen p-6 lg:p-10">
    <Link href="/" className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-white"><ArrowLeft size={16}/> Overview</Link>
    <div className="mt-7 flex items-center gap-3"><div className="grid h-11 w-11 place-items-center rounded-xl bg-rose-500/10 text-rose-400"><BellRing/></div><div><h1 className="text-2xl font-semibold">SOS monitoring</h1><p className="mt-1 text-sm text-[var(--muted)]">Active emergency events and incident locations</p></div></div>
    <section className="mt-7 rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-6">
      <div className="flex items-center gap-2 text-sm font-medium"><ShieldAlert size={18} className="text-amber-300"/> Waiting for secure backend connection</div>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">This view will subscribe to active_alert records from the existing Convex deployment. No alert is shown until the authenticated admin query is available.</p>
      <div className="mt-6 flex items-center gap-2 text-xs text-[var(--muted)]"><MapPin size={14}/> Location pins require coordinates received from the mobile gateway or beacon telemetry.</div>
    </section>
  </main>;
}

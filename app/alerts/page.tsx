"use client";

import Link from "next/link";
import { anyApi } from "convex/server";
import { useQuery } from "convex/react";
import { ArrowLeft, BellRing, MapPin, ShieldAlert } from "lucide-react";

export default function AlertsPage() {
  const data = useQuery(anyApi.admin.overview, {});
  return <main className="min-h-screen p-6 lg:p-10">
    <Link href="/" className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-white"><ArrowLeft size={16}/> Overview</Link>
    <div className="mt-7 flex items-center gap-3"><div className="grid h-11 w-11 place-items-center rounded-xl bg-rose-500/10 text-rose-400"><BellRing/></div><div><h1 className="text-2xl font-semibold">SOS monitoring</h1><p className="mt-1 text-sm text-[var(--muted)]">Active emergency events and incident locations</p></div></div>
    <section className="mt-7 rounded-2xl border border-[var(--border)] bg-[var(--panel)]">
      <div className="flex items-center gap-2 border-b border-[var(--border)] p-5 text-sm font-medium"><ShieldAlert size={18} className="text-amber-300"/> {data === undefined ? "Loading active incidents…" : `${data.activeAlerts.length} active SOS incident(s)`}</div>
      {data?.activeAlerts.map((alert: any) => <div key={alert._id} className="border-b border-[var(--border)] p-5 last:border-0"><div className="flex flex-wrap items-center justify-between gap-3"><span className="font-medium text-rose-300">ACTIVE SOS</span><span className="text-xs text-[var(--muted)]">{alert.detected_at}</span></div><p className="mt-2 text-sm text-slate-300">Beacon: {alert.beacon_id} · Signal: {alert.signal_dbm}</p><p className="mt-1 flex items-center gap-1 text-xs text-[var(--muted)]"><MapPin size={13}/>{alert.latitude}, {alert.longitude}</p></div>)}
      {data && data.activeAlerts.length === 0 && <p className="p-6 text-sm text-[var(--muted)]">No active SOS incidents.</p>}
    </section>
    <p className="mt-4 text-xs text-[var(--muted)]">This console does not cancel user-side SOS events.</p>
  </main>;
}

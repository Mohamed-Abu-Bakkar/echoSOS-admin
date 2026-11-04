"use client";

import dynamic from "next/dynamic";
import { anyApi } from "convex/server";
import { useQuery } from "convex/react";
import Link from "next/link";
import { Activity, BellRing, Bluetooth, Users, Siren, MapPin, ArrowUpRight } from "lucide-react";

type RecentEvent = { _id: string; event_type: string; status_badge: string; created_at: string };
type Incident = { _id: string; latitude: number; longitude: number; detected_at: string; beacon_id: string };
type OverviewData = { activeAlerts: Incident[]; usersSample: number; usersSampleMayBeTruncated: boolean; beaconsSample: number; beaconsSampleMayBeTruncated: boolean; recentEvents: RecentEvent[] };

const LiveMap = dynamic(() => import("@/components/live-map"), { ssr: false, loading: () => <div className="grid h-[360px] place-items-center text-sm text-slate-500">Loading map…</div> });

function Metric({ label, value, note, icon: Icon }: { label: string; value: string; note: string; icon: typeof Activity }) {
  return <section className="rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-5"><div className="flex items-center justify-between text-sm text-[var(--muted)]"><span>{label}</span><Icon size={18}/></div><div className="mt-4 text-3xl font-semibold tracking-tight">{value}</div><p className="mt-2 text-xs text-[var(--muted)]">{note}</p></section>;
}

export default function OverviewLive() {
  const result = useQuery(anyApi.admin.overview, {});
  const data = result as OverviewData | undefined;
  if (data === undefined) return <div className="rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-8 text-sm text-[var(--muted)]">Connecting to the shared EchoSOS backend…</div>;
  const hasActiveEmergency = data.activeAlerts.length > 0;
  return <div className="space-y-7">
    {hasActiveEmergency && <Link href="/alerts" className="group relative block overflow-hidden rounded-2xl border border-rose-300 bg-rose-50 p-5 shadow-sm transition hover:border-rose-400 hover:bg-rose-100/80">
      <div className="absolute inset-y-0 left-0 w-1.5 bg-rose-600" />
      <div className="flex flex-wrap items-center justify-between gap-4 pl-2">
        <div className="flex items-start gap-4">
          <span className="relative mt-0.5 grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-rose-600 text-white"><Siren size={25}/><span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-rose-50 bg-white emergency-pulse" /></span>
          <div><div className="flex flex-wrap items-center gap-2"><span className="text-xs font-bold uppercase tracking-[.18em] text-rose-700">Emergency attention required</span><span className="rounded-full bg-rose-600 px-2.5 py-1 text-[10px] font-bold tracking-wider text-white emergency-pulse">LIVE SOS</span></div><h2 className="mt-1 text-xl font-bold text-rose-950">{data.activeAlerts.length} active emergency {data.activeAlerts.length === 1 ? "incident" : "incidents"}</h2><p className="mt-1 text-sm text-rose-800">An SOS is currently active. Open incident monitoring to review reported details and location.</p></div>
        </div>
        <span className="inline-flex items-center gap-2 rounded-xl bg-rose-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition group-hover:bg-rose-800">Review emergency <ArrowUpRight size={16}/></span>
      </div>
    </Link>}
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <Metric label="Active SOS alerts" value={String(data.activeAlerts.length)} note={hasActiveEmergency ? "Immediate attention required" : "No active incidents"} icon={BellRing}/>
      <Metric label="Users sampled" value={String(data.usersSample)} note={data.usersSampleMayBeTruncated ? "Showing first 500 records" : "All current user records"} icon={Users}/>
      <Metric label="Beacons sampled" value={String(data.beaconsSample)} note={data.beaconsSampleMayBeTruncated ? "Showing first 500 records" : "All current beacon records"} icon={Bluetooth}/>
      <Metric label="Recent events" value={String(data.recentEvents.length)} note="Latest 20 alert-history entries" icon={Activity}/>
    </div>
    <div className="grid gap-5 xl:grid-cols-[1.55fr_1fr]">
      <section className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--panel)]"><div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4"><div><h3 className="font-semibold">SOS incident map</h3><p className="mt-1 text-xs text-[var(--muted)]">OpenStreetMap · active incident coordinates</p></div></div><LiveMap incidents={data.activeAlerts}/><div className="border-t border-[var(--border)] px-5 py-3 text-xs text-[var(--muted)]">© OpenStreetMap contributors</div></section>
      <section className="rounded-2xl border border-[var(--border)] bg-[var(--panel)]"><div className="border-b border-[var(--border)] px-5 py-4"><h3 className="font-semibold">Recent SOS activity</h3><p className="mt-1 text-xs text-[var(--muted)]">Latest emergency events</p></div><div className="divide-y divide-[var(--border)]">{data.recentEvents.length === 0 ? <p className="p-6 text-sm text-[var(--muted)]">No alert history records yet.</p> : data.recentEvents.map((event) => <div key={event._id} className="p-4"><div className="flex items-center justify-between gap-3"><span className="text-sm font-medium">{event.event_type.replaceAll("_", " ")}</span><span className="text-xs text-[var(--muted)]">{event.status_badge}</span></div><p className="mt-1 text-xs text-[var(--muted)]">{event.created_at}</p></div>)}</div></section>
    </div>
  </div>;
}

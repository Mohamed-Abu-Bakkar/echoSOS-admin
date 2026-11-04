"use client";

import Link from "next/link";
import { anyApi } from "convex/server";
import { useQuery } from "convex/react";
import { ArrowLeft, BellRing, MapPin, ShieldAlert, ExternalLink, Users, Siren, Clock3, AlertTriangle } from "lucide-react";

type ActiveAlert = { _id: string; detected_at: string; beacon_id: string; signal_dbm: string | number; latitude: number; longitude: number; user_name?: string; user_phone?: string; emergency_contact_count?: number };
type Overview = { activeAlerts: ActiveAlert[] };

export default function AlertsPage() {
  const result = useQuery(anyApi.admin.overview, {});
  const data = result as Overview | undefined;
  const alerts = data?.activeAlerts;
  const hasActiveEmergency = Boolean(alerts && alerts.length > 0);
  return <main className="min-h-screen p-6 lg:p-10">
    <Link href="/" className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-slate-900"><ArrowLeft size={16}/> Overview</Link>
    <div className="mt-7 flex items-center gap-3"><div className={`grid h-12 w-12 place-items-center rounded-xl ${hasActiveEmergency ? "bg-rose-600 text-white shadow-lg shadow-rose-200" : "bg-slate-100 text-slate-600"}`}>{hasActiveEmergency ? <Siren size={25}/> : <BellRing/>}</div><div><h1 className="text-2xl font-semibold">SOS monitoring</h1><p className="mt-1 text-sm text-[var(--muted)]">Active emergency events and incident locations</p></div></div>
    {hasActiveEmergency && <div className="mt-6 overflow-hidden rounded-2xl border border-rose-300 bg-rose-50 shadow-sm"><div className="flex items-center gap-3 border-b border-rose-200 bg-rose-100/70 px-5 py-3"><span className="h-2.5 w-2.5 rounded-full bg-rose-600 emergency-pulse"/><span className="text-xs font-extrabold uppercase tracking-[.18em] text-rose-800">Live emergency state</span><span className="ml-auto rounded-full bg-rose-600 px-3 py-1 text-[10px] font-bold tracking-wider text-white">ACTION REQUIRED</span></div><div className="flex flex-wrap items-center justify-between gap-3 p-5"><div><h2 className="text-xl font-bold text-rose-950">{alerts?.length} active SOS {alerts?.length === 1 ? "incident" : "incidents"}</h2><p className="mt-1 text-sm text-rose-800">Review each incident and its reported location. This alert remains visible until the user-side SOS flow resolves it.</p></div><AlertTriangle className="text-rose-600" size={30}/></div></div>
    <section className={`mt-6 overflow-hidden rounded-2xl border bg-[var(--panel)] ${hasActiveEmergency ? "border-rose-300 shadow-md shadow-rose-100" : "border-[var(--border)]"}`}>
      <div className="flex items-center gap-2 border-b border-[var(--border)] p-5 text-sm font-medium"><ShieldAlert size={18} className="text-amber-700"/> {alerts === undefined ? "Loading active incidents…" : `${alerts.length} active SOS incident(s)`}</div>
      {alerts?.map((alert) => <div key={alert._id} className="relative border-b border-rose-100 p-5 last:border-0 sm:p-6"><div className="absolute inset-y-0 left-0 w-1 bg-rose-500"/><div className="flex flex-wrap items-center justify-between gap-3"><span className="inline-flex items-center gap-2 rounded-full bg-rose-100 px-3 py-1.5 text-xs font-extrabold tracking-wide text-rose-800"><span className="h-2 w-2 rounded-full bg-rose-600 emergency-pulse"/> ACTIVE SOS · URGENT</span><span className="flex items-center gap-1.5 text-xs font-medium text-slate-500"><Clock3 size={13}/>{alert.detected_at}</span></div><p className="mt-4 text-base font-semibold text-slate-900">{alert.user_name ?? "User details unavailable"} {alert.user_phone ? `· ${alert.user_phone}` : ""}</p><p className="mt-2 text-sm font-medium text-slate-700">Beacon: {alert.beacon_id} · Signal: {alert.signal_dbm}</p><div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-[var(--muted)]"><span className="flex items-center gap-1 font-medium text-slate-700"><MapPin size={14} className="text-rose-600"/>{alert.latitude.toFixed(5)}, {alert.longitude.toFixed(5)}</span><span className="flex items-center gap-1"><Users size={13}/>{alert.emergency_contact_count ?? "—"} emergency contacts</span><a className="inline-flex items-center gap-1 text-sky-700 hover:text-sky-900" href={`https://www.openstreetmap.org/?mlat=${alert.latitude}&mlon=${alert.longitude}#map=16/${alert.latitude}/${alert.longitude}`} target="_blank" rel="noreferrer">Open map <ExternalLink size={12}/></a></div></div>)}
      {alerts && alerts.length === 0 && <p className="p-6 text-sm text-[var(--muted)]">No active SOS incidents.</p>}
    </section>
    <p className="mt-4 text-xs text-[var(--muted)]">This console does not cancel user-side SOS events.</p>
  </main>;
}

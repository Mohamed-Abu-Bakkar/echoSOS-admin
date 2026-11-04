import Link from "next/link";
import OverviewLive from "@/components/overview-live";
import SignOutButton from "@/components/sign-out-button";
import { Activity, BellRing, Bluetooth, Clock3, ShieldCheck, Users } from "lucide-react";

const navigation = [
  { label: "Overview", href: "/", icon: Activity, active: true },
  { label: "SOS monitoring", href: "/alerts", icon: BellRing },
  { label: "Users", href: "/users", icon: Users },
  { label: "Beacons", href: "/beacons", icon: Bluetooth },
  { label: "Alert history", href: "/history", icon: Clock3 }
];

export default function Home() {
  return <main className="min-h-screen lg:grid lg:grid-cols-[250px_1fr]">
    <aside className="border-b border-[var(--border)] bg-[#0b1320] p-5 lg:min-h-screen lg:border-b-0 lg:border-r">
      <div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-xl bg-[#f04452] text-white"><ShieldCheck size={22} /></div><div><div className="font-semibold tracking-wide">EchoSOS</div><div className="text-xs text-[var(--muted)]">ADMIN CONSOLE</div></div></div>
      <div className="mt-10 text-[10px] font-semibold uppercase tracking-[.2em] text-slate-500">Workspace</div>
      <nav className="mt-3 space-y-1">{navigation.map(({ label, href, icon: Icon, active }) => <Link key={label} href={href} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${active ? "bg-[#1a2a3d] text-white" : "text-slate-400 hover:bg-[#142133] hover:text-white"}`}><Icon size={17} />{label}{label === "SOS monitoring" && <span className="ml-auto h-2 w-2 rounded-full bg-rose-500" />}</Link>)}</nav>
      <div className="mt-10 rounded-xl border border-[var(--border)] bg-[var(--panel)] p-4"><div className="flex items-center gap-2 text-sm font-medium"><span className="h-2 w-2 rounded-full bg-amber-400" /> Backend setup</div><p className="mt-2 text-xs leading-5 text-[var(--muted)]">Live records appear after shared Convex admin queries and administrator access are configured.</p></div>
    </aside>
    <div className="min-w-0"><header className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border)] px-6 py-5 lg:px-9"><div><p className="text-xs text-[var(--muted)]">ECHO SOS / OPERATIONS</p><h1 className="mt-1 text-xl font-semibold">Overview</h1></div><div className="flex items-center gap-3"><span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs text-amber-300">Shared backend</span><SignOutButton /></div></header>
      <div className="space-y-7 p-6 lg:p-9"><div className="flex flex-wrap items-end justify-between gap-3"><div><h2 className="text-2xl font-semibold">Emergency operations</h2><p className="mt-1 text-sm text-[var(--muted)]">A live operational view of the EchoSOS ecosystem.</p></div><span className="text-xs text-[var(--muted)]">Live data is sourced from the mobile app&apos;s Convex deployment</span></div><OverviewLive /><section className="rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-5"><div className="flex items-center gap-3"><ShieldCheck size={19} className="text-emerald-400" /><h3 className="font-semibold">Safety boundary</h3></div><p className="mt-2 text-sm leading-6 text-[var(--muted)]">The admin console supports monitoring and administrative case review. It does not cancel a user&apos;s active beacon SOS event. Only the user-side cancellation flow can end the beacon event.</p></section></div>
    </div>
  </main>;
}

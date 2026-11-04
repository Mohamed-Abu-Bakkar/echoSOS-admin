import Link from "next/link";
import { Activity, ArrowUpRight, BellRing, Bluetooth, Clock3, MapPin, ShieldCheck, Users } from "lucide-react";

const navigation = [
  { label: "Overview", href: "/", icon: Activity, active: true },
  { label: "SOS monitoring", href: "/alerts", icon: BellRing },
  { label: "Users", href: "/users", icon: Users },
  { label: "Beacons", href: "/beacons", icon: Bluetooth },
  { label: "Alert history", href: "/history", icon: Clock3 }
];

function Metric({ label, value, note, icon: Icon }: { label: string; value: string; note: string; icon: typeof Activity }) {
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-5">
      <div className="flex items-center justify-between text-sm text-[var(--muted)]">
        <span>{label}</span><Icon size={18} />
      </div>
      <div className="mt-4 text-3xl font-semibold tracking-tight">{value}</div>
      <p className="mt-2 text-xs text-[var(--muted)]">{note}</p>
    </section>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen lg:grid lg:grid-cols-[250px_1fr]">
      <aside className="border-b border-[var(--border)] bg-[#0b1320] p-5 lg:min-h-screen lg:border-b-0 lg:border-r">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#f04452] text-white"><ShieldCheck size={22} /></div>
          <div><div className="font-semibold tracking-wide">EchoSOS</div><div className="text-xs text-[var(--muted)]">ADMIN CONSOLE</div></div>
        </div>
        <div className="mt-10 text-[10px] font-semibold uppercase tracking-[.2em] text-slate-500">Workspace</div>
        <nav className="mt-3 space-y-1">
          {navigation.map(({ label, href, icon: Icon, active }) => (
            <Link key={label} href={href} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${active ? "bg-[#1a2a3d] text-white" : "text-slate-400 hover:bg-[#142133] hover:text-white"}`}>
              <Icon size={17} />{label}
              {label === "SOS monitoring" && <span className="ml-auto h-2 w-2 rounded-full bg-rose-500" />}
            </Link>
          ))}
        </nav>
        <div className="mt-10 rounded-xl border border-[var(--border)] bg-[var(--panel)] p-4">
          <div className="flex items-center gap-2 text-sm font-medium"><span className="h-2 w-2 rounded-full bg-amber-400" /> Backend setup</div>
          <p className="mt-2 text-xs leading-5 text-[var(--muted)]">The dashboard shell is ready. Live records appear after the shared Convex admin queries are installed.</p>
        </div>
      </aside>

      <div className="min-w-0">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border)] px-6 py-5 lg:px-9">
          <div><p className="text-xs text-[var(--muted)]">ECHO SOS / OPERATIONS</p><h1 className="mt-1 text-xl font-semibold">Overview</h1></div>
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs text-amber-300">Backend not connected</span>
            <div className="grid h-9 w-9 place-items-center rounded-full border border-[var(--border)] bg-[var(--panel-soft)] text-sm">A</div>
          </div>
        </header>

        <div className="space-y-7 p-6 lg:p-9">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div><h2 className="text-2xl font-semibold">Emergency operations</h2><p className="mt-1 text-sm text-[var(--muted)]">A live operational view of the EchoSOS ecosystem.</p></div>
            <span className="text-xs text-[var(--muted)]">Live data will be sourced from the mobile app's Convex deployment</span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Metric label="Active SOS alerts" value="—" note="Waiting for authenticated query" icon={BellRing} />
            <Metric label="Registered users" value="—" note="Waiting for shared user records" icon={Users} />
            <Metric label="Registered beacons" value="—" note="Waiting for beacon inventory query" icon={Bluetooth} />
            <Metric label="Alerts today" value="—" note="Waiting for alert history query" icon={Activity} />
          </div>

          <div className="grid gap-5 xl:grid-cols-[1.55fr_1fr]">
            <section className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--panel)]">
              <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
                <div><h3 className="font-semibold">Live SOS map</h3><p className="mt-1 text-xs text-[var(--muted)]">OpenStreetMap · incident locations</p></div>
                <MapPin size={18} className="text-[var(--muted)]" />
              </div>
              <div className="grid min-h-[300px] place-items-center bg-[#0c1724] p-8 text-center">
                <div className="max-w-sm">
                  <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl border border-[var(--border)] bg-[var(--panel-soft)]"><MapPin size={22} className="text-slate-300" /></div>
                  <h4 className="mt-4 font-medium">Map will activate with live alert data</h4>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">No incident coordinates are fabricated. Active SOS locations will be plotted here when the shared backend query is connected.</p>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-[var(--border)] px-5 py-3 text-xs text-[var(--muted)]"><span>© OpenStreetMap contributors</span><span>Map layer: standard</span></div>
            </section>

            <section className="rounded-2xl border border-[var(--border)] bg-[var(--panel)]">
              <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4"><div><h3 className="font-semibold">Recent SOS activity</h3><p className="mt-1 text-xs text-[var(--muted)]">Latest emergency events</p></div><ArrowUpRight size={17} className="text-[var(--muted)]" /></div>
              <div className="grid min-h-[300px] place-items-center p-6 text-center">
                <div><Clock3 size={24} className="mx-auto text-slate-500" /><p className="mt-3 text-sm font-medium">No live activity loaded</p><p className="mt-1 max-w-xs text-xs leading-5 text-[var(--muted)]">Recent alerts will be displayed here from the existing alert_history and active_alert tables.</p></div>
              </div>
            </section>
          </div>

          <section className="rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-5">
            <div className="flex items-center gap-3"><ShieldCheck size={19} className="text-emerald-400" /><h3 className="font-semibold">Safety boundary</h3></div>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">The admin console will support acknowledgement and administrative case resolution. It will not cancel a user's active beacon SOS event. Only the user-side cancellation flow can end the beacon event.</p>
          </section>
        </div>
      </div>
    </main>
  );
}

import Link from "next/link";
import { ArrowLeft, Bluetooth } from "lucide-react";

export default function BeaconsPage() {
  return <main className="min-h-screen p-6 lg:p-10"><Link href="/" className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-white"><ArrowLeft size={16}/> Overview</Link><div className="mt-7 flex items-center gap-3"><Bluetooth className="text-slate-300"/><div><h1 className="text-2xl font-semibold">Beacon management</h1><p className="mt-1 text-sm text-[var(--muted)]">ESP32 beacon inventory, connectivity and battery health</p></div></div><section className="mt-7 rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-6"><p className="text-sm text-[var(--muted)]">Beacon status and telemetry will load from the shared beacons table. Hardware identity and owner associations will be protected by admin-only backend functions.</p></section></main>;
}

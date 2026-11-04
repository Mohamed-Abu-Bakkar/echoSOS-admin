"use client";

import { useState } from "react";
import { ShieldCheck, LockKeyhole, Mail, ArrowRight } from "lucide-react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notice, setNotice] = useState("Authentication will activate when the shared Convex Better Auth component is configured.");
  const [busy, setBusy] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setNotice("The shared authentication backend is not connected yet. No credentials were sent.");
    setBusy(false);
  }

  return <main className="grid min-h-screen place-items-center px-5 py-10">
    <div className="w-full max-w-md rounded-3xl border border-[var(--border)] bg-[var(--panel)] p-8 shadow-2xl shadow-black/20">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#f04452] text-white"><ShieldCheck size={28}/></div>
      <div className="mt-5 text-center"><h1 className="text-2xl font-semibold">EchoSOS Admin</h1><p className="mt-2 text-sm text-[var(--muted)]">Secure administrator access</p></div>
      <form onSubmit={submit} className="mt-8 space-y-4">
        <label className="block text-sm text-slate-300">Administrator email
          <span className="mt-2 flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[#0b1320] px-3"><Mail size={17} className="text-slate-500"/><input required type="email" autoComplete="username" value={email} onChange={e=>setEmail(e.target.value)} placeholder="admin@example.com" className="h-12 w-full bg-transparent text-sm outline-none"/></span>
        </label>
        <label className="block text-sm text-slate-300">Password
          <span className="mt-2 flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[#0b1320] px-3"><LockKeyhole size={17} className="text-slate-500"/><input required type="password" autoComplete="current-password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Enter your password" className="h-12 w-full bg-transparent text-sm outline-none"/></span>
        </label>
        <button disabled={busy} className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#e83d4d] text-sm font-semibold text-white transition hover:bg-[#f05260] disabled:opacity-60">Continue <ArrowRight size={17}/></button>
      </form>
      <p role="status" className="mt-5 rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 text-xs leading-5 text-amber-200">{notice}</p>
      <p className="mt-6 text-center text-[11px] text-slate-500">Access is restricted to the provisioned administrator. Public registration is disabled.</p>
    </div>
  </main>;
}

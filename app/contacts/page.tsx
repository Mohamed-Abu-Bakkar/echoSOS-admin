"use client";

import Link from "next/link";
import { anyApi } from "convex/server";
import { useQuery } from "convex/react";
import { ArrowLeft, ContactRound, Star } from "lucide-react";

type EmergencyContact = {
  id: string;
  userName: string;
  userPhone: string;
  name: string;
  phone: string;
  relationship: string;
  isPrimary: boolean;
  initials: string;
};

export default function EmergencyContactsPage() {
  const result = useQuery(anyApi.admin.listEmergencyContacts, { limit: 100 });
  const contacts = result as EmergencyContact[] | undefined;

  return (
    <main className="min-h-screen p-6 lg:p-10">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-slate-900">
        <ArrowLeft size={16} /> Overview
      </Link>
      <div className="mt-7 flex items-center gap-3">
        <ContactRound className="text-slate-700" />
        <div>
          <h1 className="text-2xl font-semibold">Emergency contacts</h1>
          <p className="mt-1 text-sm text-[var(--muted)]">Read-only contact directory · latest 100</p>
        </div>
      </div>
      <section className="mt-7 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--panel)]">
        {contacts === undefined ? (
          <p className="p-6 text-sm text-[var(--muted)]">Loading emergency contacts…</p>
        ) : contacts.length === 0 ? (
          <p className="p-6 text-sm text-[var(--muted)]">No emergency contacts found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-4">Contact</th>
                  <th className="px-5 py-4">Relationship</th>
                  <th className="px-5 py-4">Phone</th>
                  <th className="px-5 py-4">EchoSOS user</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {contacts.map((contact) => (
                  <tr key={contact.id}>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 font-medium">
                        {contact.name}
                        {contact.isPrimary && <Star size={13} className="text-amber-600" aria-label="Primary contact" />}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-slate-300">{contact.relationship}</td>
                    <td className="px-5 py-4 text-slate-300">{contact.phone}</td>
                    <td className="px-5 py-4">
                      <div>{contact.userName}</div>
                      <div className="mt-1 text-xs text-[var(--muted)]">{contact.userPhone}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
      <p className="mt-4 text-xs text-[var(--muted)]">Contact information is sensitive. This page is available only to the allowlisted administrator.</p>
    </main>
  );
}

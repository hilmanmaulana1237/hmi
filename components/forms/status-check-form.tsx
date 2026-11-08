"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { Loader2, SearchCheck, Users, MessageCircle, ExternalLink, ShieldCheck } from "lucide-react";

type RegistrationResult = {
  registrationCode: string;
  fullName: string;
  studyProgram: string;
  status: string;
  adminNote?: string;
  mentorName?: string;
  mentorRole?: string;
  mentorWhatsappGroup?: string;
};

export function StatusCheckForm() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RegistrationResult | null>(null);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(
        `/api/lk1/status?q=${encodeURIComponent(query.trim())}`,
      );
      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.error ?? "Data pendaftaran tidak ditemukan.");
      }

      setResult(data.registration);
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : "Status belum bisa dicek saat ini.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-3xl border border-[#DCE8E2] bg-white p-6 shadow-[0_18px_60px_rgba(0,61,43,0.08)]">
      <form onSubmit={handleSubmit}>
        <label className="grid gap-2 text-sm font-semibold">
          Kode pendaftaran, NIM, atau email
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="rounded-2xl border border-[#DCE8E2] px-4 py-3 outline-none focus:border-[#006B3F]"
            placeholder="LK1-2026-ABC123 atau 1217050012 atau email@example.com"
            required
          />
        </label>
        <button
          disabled={loading}
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#006B3F] px-6 py-3 text-sm font-bold text-white disabled:cursor-wait disabled:opacity-70 transition-all hover:bg-[#003324]"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <SearchCheck className="h-4 w-4" />
          )}
          Cek status
        </button>
      </form>

      {result ? (
        <div className="mt-6 rounded-2xl border border-[#B7E4C7] bg-[#F0FDF4] p-5 text-sm leading-7 text-[#166534] space-y-2">
          <div className="flex items-center justify-between border-b border-[#BCD7CA] pb-2">
            <div>
              <p className="font-black text-base text-[#003324]">{result.fullName}</p>
              <p className="text-xs text-[#006144] font-mono">{result.registrationCode}</p>
            </div>
            <span className="rounded-full bg-[#006144] px-3 py-1 text-xs font-black text-white">
              {result.status}
            </span>
          </div>

          <p className="text-xs">Program Studi: <strong>{result.studyProgram}</strong></p>

          {/* Grup Utama Calon Kader */}
          <div className="mt-3 rounded-xl border-2 border-[#25D366] bg-[#F0FDF4] p-3.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#006144]">Grup WhatsApp Utama Calon Kader</span>
              <span className="rounded-full bg-red-600 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-white">
                Wajib Masuk
              </span>
            </div>
            <p className="mt-1 text-[11px] text-[#2D4A3E]">
              Grup resmi seluruh calon kader LK-I untuk pengumuman jadwal screening dan arahan panitia.
            </p>
            <a
              href="https://chat.whatsapp.com/EaDcUHFcNud8Dr2yOu4D01"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2.5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-2 text-xs font-black text-white shadow-xs hover:bg-[#1EBE5D] transition-all"
            >
              <MessageCircle className="h-4 w-4 fill-white stroke-[#25D366]" />
              <span>Gabung Grup Utama Calon Kader (Wajib)</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          {result.mentorName && (
            <div className="mt-3 rounded-xl border border-[#BCD7CA] bg-white p-3.5 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-[#006144]">
                <Users className="h-4 w-4" />
                <span>Mentor Bimbingan Terpilih:</span>
              </div>
              <p className="mt-1 font-black text-sm text-[#10231C]">{result.mentorName}</p>
              {result.mentorRole && (
                <p className="text-[11px] text-[#4B6259]">{result.mentorRole}</p>
              )}

              {result.mentorWhatsappGroup && (
                <a
                  href={result.mentorWhatsappGroup}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2.5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#006144] bg-[#F6F8F7] px-4 py-2 text-xs font-bold text-[#006144] hover:bg-[#EAF2EE] transition-all"
                >
                  <Users className="h-4 w-4 text-[#006144]" />
                  <span>Buka Grup WhatsApp Mentor</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          )}

          {result.adminNote ? (
            <div className="mt-2 rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs text-amber-900">
              <strong>Catatan Panitia:</strong> {result.adminNote}
            </div>
          ) : null}
        </div>
      ) : null}

      {error ? (
        <div className="mt-6 rounded-2xl border border-red-100 bg-red-50 p-5 text-sm leading-6 text-red-700">
          {error}
        </div>
      ) : null}
    </div>
  );
}

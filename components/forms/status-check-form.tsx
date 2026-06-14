"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { Loader2, SearchCheck } from "lucide-react";

type RegistrationResult = {
  registrationCode: string;
  fullName: string;
  studyProgram: string;
  status: string;
  adminNote?: string;
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
          Kode pendaftaran atau email
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="rounded-2xl border border-[#DCE8E2] px-4 py-3 outline-none focus:border-[#006B3F]"
            placeholder="LK1-2026-ABC123 atau email@example.com"
            required
          />
        </label>
        <button
          disabled={loading}
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#006B3F] px-6 py-3 text-sm font-bold text-white disabled:cursor-wait disabled:opacity-70"
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
        <div className="mt-6 rounded-2xl border border-[#B7E4C7] bg-[#F0FDF4] p-5 text-sm leading-7 text-[#166534]">
          <p className="font-black text-[#003324]">{result.fullName}</p>
          <p>Kode: {result.registrationCode}</p>
          <p>Prodi: {result.studyProgram}</p>
          <p>
            Status: <strong>{result.status}</strong>
          </p>
          {result.adminNote ? <p>Catatan: {result.adminNote}</p> : null}
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

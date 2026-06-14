"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";

type SubmitState =
  | { status: "idle"; message?: string }
  | { status: "loading"; message?: string }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

export function AdvocacyForm() {
  const [state, setState] = useState<SubmitState>({ status: "idle" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState({ status: "loading" });

    try {
      const form = event.currentTarget;
      const response = await fetch("/api/advocacy", {
        method: "POST",
        body: new FormData(form),
      });
      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(
          typeof data.error === "string"
            ? data.error
            : "Laporan belum bisa dikirim. Periksa isian lalu coba lagi.",
        );
      }

      setState({
        status: "success",
        message: `Laporan berhasil dikirim. Status awal: ${data.status}.`,
      });
      form.reset();
    } catch (error) {
      setState({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "Terjadi kesalahan saat mengirim laporan.",
      });
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-[#DCE8E2] bg-white p-6 shadow-[0_18px_60px_rgba(0,61,43,0.08)]"
    >
      <div className="grid gap-5">
        <label className="grid gap-2 text-sm font-semibold">
          Nama atau inisial
          <input
            name="reporterNameOrInitial"
            className="rounded-2xl border border-[#DCE8E2] px-4 py-3 outline-none focus:border-[#006B3F]"
            placeholder="Contoh: A. Rahman"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          Kontak opsional
          <input
            name="contactOptional"
            className="rounded-2xl border border-[#DCE8E2] px-4 py-3 outline-none focus:border-[#006B3F]"
            placeholder="WhatsApp atau email"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          Topik
          <input
            name="topic"
            className="rounded-2xl border border-[#DCE8E2] px-4 py-3 outline-none focus:border-[#006B3F]"
            placeholder="Akademik, fasilitas, administrasi, atau lainnya"
            required
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          Uraian aspirasi
          <textarea
            name="description"
            className="min-h-36 rounded-2xl border border-[#DCE8E2] px-4 py-3 outline-none focus:border-[#006B3F]"
            placeholder="Tuliskan kronologi atau kebutuhan advokasi"
            minLength={15}
            required
          />
        </label>
        <label className="flex items-center gap-3 text-sm text-[#4B6259]">
          <input
            type="checkbox"
            name="isConfidential"
            className="h-4 w-4 accent-[#006B3F]"
            defaultChecked
          />
          Jaga kerahasiaan identitas pelapor
        </label>

        {state.status === "success" ? (
          <div className="rounded-2xl border border-[#B7E4C7] bg-[#F0FDF4] p-4 text-sm text-[#166534]">
            <CheckCircle2 className="mr-2 inline h-4 w-4" />
            {state.message}
          </div>
        ) : null}

        {state.status === "error" ? (
          <div className="rounded-2xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">
            {state.message}
          </div>
        ) : null}

        <button
          disabled={state.status === "loading"}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#006B3F] px-6 py-3 text-sm font-bold text-white disabled:cursor-wait disabled:opacity-70"
        >
          {state.status === "loading" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
          Kirim laporan
        </button>
      </div>
    </form>
  );
}

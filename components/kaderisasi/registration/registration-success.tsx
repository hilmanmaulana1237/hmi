"use client";

import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import {
  CheckCircle2,
  Copy,
  Check,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Printer,
  Users,
  MessageCircle,
  ExternalLink,
} from "lucide-react";
import type { LK1FormData } from "./types";
import { ParticipantCardModal } from "./participant-card-modal";

interface RegistrationSuccessProps {
  registrationCode: string;
  formData: LK1FormData;
  onReset: () => void;
  onCheckStatus: (code: string) => void;
}

export const RegistrationSuccess: React.FC<RegistrationSuccessProps> = ({
  registrationCode,
  formData,
  onReset,
  onCheckStatus,
}) => {
  const [copied, setCopied] = useState(false);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);

  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#006144", "#008f62", "#F2994A", "#22c55e", "#3b82f6"],
      });
    } catch {
      // ignore
    }
  }, []);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(registrationCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.error("Failed to copy:", e);
    }
  };

  const handleJoinWhatsAppGroup = () => {
    const groupUrl =
      formData.mentorWhatsappGroup ||
      "https://chat.whatsapp.com/EaDcUHFcNud8Dr2yOu4D01";
    window.open(groupUrl, "_blank");
  };

  return (
    <div className="rounded-3xl border border-[#BCD7CA] bg-white p-5 shadow-[0_18px_60px_rgba(0,61,43,0.08)] sm:p-10">
      {/* Icon and Title */}
      <div className="text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-[#006144] to-[#008f62] text-white shadow-lg shadow-[#006144]/30 ring-8 ring-[#EAF2EE]">
          <CheckCircle2 className="h-10 w-10 stroke-[2.5]" />
        </div>

        <div className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-[#EAF2EE] px-3.5 py-1 text-xs font-black uppercase tracking-wider text-[#006144]">
          <Sparkles className="h-3.5 w-3.5 text-[#F2994A]" />
          Pendaftaran Berhasil Terkirim
        </div>

        <h2 className="mt-3 text-2xl font-black tracking-tight text-[#10231C] sm:text-3xl">
          Selamat, {formData.fullName}!
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-xs sm:text-sm text-[#4B6259]">
          Data pendaftaran Anda telah tersimpan di sistem kaderisasi HMI Komisariat Sains
          dan Teknologi UIN Sunan Gunung Djati Bandung.
        </p>
      </div>

      {/* Code Display Box */}
      <div className="mx-auto mt-6 max-w-md rounded-2xl border-2 border-dashed border-[#006144] bg-[#F0FDF4] p-4 text-center sm:p-6">
        <p className="text-[11px] font-bold uppercase tracking-widest text-[#006144]">
          Kode Pendaftaran Resmi Anda
        </p>
        <div className="mt-2 flex items-center justify-center gap-3">
          <span className="font-mono text-2xl font-black tracking-wider text-[#003324] sm:text-3xl">
            {registrationCode}
          </span>
          <button
            type="button"
            onClick={handleCopyCode}
            title="Salin Kode Pendaftaran"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#006144] text-white shadow-xs transition-all hover:bg-[#003324] active:scale-95"
          >
            {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
          </button>
        </div>
        {copied && (
          <p className="mt-2 text-xs font-bold text-[#006144]">
            ✓ Kode berhasil disalin ke clipboard!
          </p>
        )}
      </div>

      {/* MENTOR HIGHLIGHT & WA GROUP JOIN CARD */}
      <div className="mx-auto mt-6 max-w-xl rounded-2xl border-2 border-[#25D366] bg-gradient-to-br from-[#F0FDF4] via-white to-[#F6F8F7] p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#DCE8E2] pb-3">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#25D366] text-white">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#006144]">
                Mentor Bimbingan Anda
              </span>
              <h4 className="text-sm sm:text-base font-black text-[#10231C]">
                {formData.mentorName || "Mentor Kaderisasi LK-I"}
              </h4>
            </div>
          </div>

          {formData.mentorRole && (
            <span className="inline-block self-start sm:self-auto rounded-full bg-[#006144] px-3 py-1 text-[11px] font-bold text-white">
              {formData.mentorRole}
            </span>
          )}
        </div>

        <p className="mt-2.5 text-xs text-[#2D4A3E] leading-relaxed">
          Silakan langsung masuk ke <strong>Grup WhatsApp Calon Kader</strong> bersama mentor pilihan Anda dan panitia.
          Di sini calon kader akan ditampung untuk update informasi bimbingan, perkuliahan, dan materi screening LK-I.
        </p>

        <button
          type="button"
          onClick={handleJoinWhatsAppGroup}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-5 py-3 text-sm font-black text-white shadow-md shadow-[#25D366]/30 transition-all hover:bg-[#1EBE5D] hover:scale-[1.01] active:scale-95"
        >
          <MessageCircle className="h-5 w-5 shrink-0 fill-white stroke-[#25D366]" />
          <span className="truncate">Gabung Grup WA Calon Kader ({formData.mentorName || "Bimbingan LK-I"})</span>
          <ExternalLink className="h-4 w-4 shrink-0" />
        </button>
      </div>

      {/* Primary Action Buttons (Cetak Kartu & Pantau Status) */}
      <div className="mx-auto mt-6 flex max-w-xl flex-col sm:flex-row items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => setIsCardModalOpen(true)}
          className="inline-flex w-full sm:w-1/2 items-center justify-center gap-2 rounded-full bg-[#006144] px-5 py-3 text-xs sm:text-sm font-black text-white shadow-md hover:bg-[#003324] active:scale-95"
        >
          <Printer className="h-4 w-4" />
          <span>Cetak Kartu Peserta</span>
        </button>

        <button
          type="button"
          onClick={() => onCheckStatus(registrationCode)}
          className="inline-flex w-full sm:w-1/2 items-center justify-center gap-2 rounded-full border border-[#BCD7CA] bg-white px-5 py-3 text-xs sm:text-sm font-bold text-[#006144] hover:bg-[#F6F8F7]"
        >
          <ShieldCheck className="h-4 w-4" />
          <span>Pantau Status Berkas</span>
        </button>
      </div>

      {/* Next Steps Checklist */}
      <div className="mx-auto mt-8 max-w-xl space-y-3 rounded-2xl border border-[#DCE8E2] bg-[#F6F8F7] p-5 text-xs text-[#10231C]">
        <h4 className="flex items-center gap-2 font-black text-[#006144]">
          <ShieldCheck className="h-4 w-4" />
          Langkah Selanjutnya:
        </h4>
        <ul className="space-y-2 text-[#4B6259]">
          <li className="flex items-start gap-2">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#006144] text-[11px] font-bold text-white">
              1
            </span>
            <span>
              Cetak atau simpan <strong>Kartu Peserta LK-I Digital</strong> untuk ditunjukkan saat screening wawancara.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#006144] text-[11px] font-bold text-white">
              2
            </span>
            <span>
              Pastikan Anda sudah bergabung di <strong>Grup WhatsApp Calon Kader</strong> untuk update jadwal bimbingan dan materi.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#006144] text-[11px] font-bold text-white">
              3
            </span>
            <span>
              Panitia akan menghubungi nomor WhatsApp <strong>{formData.whatsapp}</strong> untuk jadwal screening.
            </span>
          </li>
        </ul>
      </div>

      {/* Secondary Bottom Reset */}
      <div className="mt-8 text-center border-t border-[#DCE8E2] pt-5">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#4B6259] hover:text-[#006144] hover:underline"
        >
          <span>Daftarkan Calon Peserta Lain</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Printable Card Modal */}
      <ParticipantCardModal
        isOpen={isCardModalOpen}
        onClose={() => setIsCardModalOpen(false)}
        data={formData}
        registrationCode={registrationCode}
      />
    </div>
  );
};


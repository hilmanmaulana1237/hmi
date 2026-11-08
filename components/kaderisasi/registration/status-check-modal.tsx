"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Search,
  Loader2,
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertCircle,
  Calendar,
  User,
  GraduationCap,
  Sparkles,
  Printer,
  Users,
  MessageCircle,
  ExternalLink,
} from "lucide-react";
import type { StoredLK1Registration } from "./types";
import { ParticipantCardModal } from "./participant-card-modal";

interface StatusCheckModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

export const StatusCheckModal: React.FC<StatusCheckModalProps> = ({
  isOpen,
  onClose,
  initialQuery = "",
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<StoredLK1Registration | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const savedCode = localStorage.getItem("hmi_my_registration_code");
      const target = initialQuery || savedCode || "";
      if (target) {
        setQuery(target);
        handleSearch(target);
      }
    }
  }, [isOpen, initialQuery]);

  if (!isOpen) return null;

  async function handleSearch(searchQuery?: string) {
    const q = (searchQuery ?? query).trim();
    if (!q) {
      setError("Masukkan kode pendaftaran, NIM, atau alamat email Anda.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(`/api/lk1/status?q=${encodeURIComponent(q)}`);
      const data = await res.json();

      if (!res.ok || !data.ok || !data.registration) {
        setError(data.error || "Data pendaftaran tidak ditemukan. Periksa kembali kode pendaftaran atau email Anda.");
      } else {
        setResult(data.registration);
      }
    } catch (err) {
      console.error("Error fetching status:", err);
      setError("Terjadi kendala saat memeriksa status pendaftaran. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  }

  const getStatusBadge = (status?: string) => {
    switch (status?.toLowerCase()) {
      case "diterima":
      case "lulus lk-i":
        return {
          bg: "bg-emerald-50 text-emerald-700 border-emerald-200",
          icon: CheckCircle2,
          label: status,
        };
      case "mengikuti screening":
      case "diverifikasi":
        return {
          bg: "bg-blue-50 text-blue-700 border-blue-200",
          icon: Clock,
          label: status,
        };
      case "ditolak":
        return {
          bg: "bg-red-50 text-red-700 border-red-200",
          icon: AlertCircle,
          label: status,
        };
      default:
        return {
          bg: "bg-amber-50 text-amber-700 border-amber-200",
          icon: Clock,
          label: status || "Menunggu Verifikasi",
        };
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 p-0 sm:p-4 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-xl max-h-[90vh] sm:max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl border border-[#BCD7CA] bg-white p-4 sm:p-7 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#DCE8E2] pb-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#006144] text-white">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black text-[#10231C]">
                Cek Status Pendaftaran LK-I
              </h3>
              <p className="text-[11px] text-[#4B6259]">
                Pantau perkembangan verifikasi berkas & jadwal screening
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F6F8F7] text-gray-400 hover:bg-[#EAF2EE] hover:text-[#006144]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Search input */}
        <div className="mt-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="flex gap-2"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Kode LK1, NIM, atau Email pendaftaran..."
                className="w-full rounded-xl border border-[#DCE8E2] bg-white py-2 pl-10 pr-3 text-xs sm:text-sm text-[#10231C] placeholder:text-gray-400 focus:border-[#006B3F] focus:outline-none focus:ring-2 focus:ring-[#006B3F]/20"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#006144] px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#003324] disabled:opacity-60"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <span>Cari</span>
              )}
            </button>
          </form>
        </div>

        {/* Error message */}
        {error && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-600">
            ⚠️ {error}
          </div>
        )}

        {/* Result details */}
        {result && (
          <div className="mt-5 space-y-4 animate-fade-in">
            {/* Status Card */}
            <div className="rounded-2xl border border-[#DCE8E2] bg-[#F9FBFA] p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-[#EAF2EE] pb-3">
                <div>
                  <span className="font-mono text-xs font-bold text-[#006144]">
                    {result.registrationCode}
                  </span>
                  <h4 className="text-base font-black text-[#10231C]">
                    {result.fullName}
                  </h4>
                  <p className="text-xs text-[#4B6259]">
                    {result.studyProgram} • NIM: {result.nim}
                  </p>
                </div>

                {(() => {
                  const badge = getStatusBadge(result.status);
                  const Icon = badge.icon;
                  return (
                    <div
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-black ${badge.bg}`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      <span>{badge.label}</span>
                    </div>
                  );
                })()}
              </div>

              {/* GRUP WA UTAMA & MENTOR HIGHLIGHT IN STATUS CHECK */}
              <div className="mt-3 space-y-2">
                {/* Grup Utama Calon Kader */}
                <div className="rounded-xl border-2 border-[#25D366] bg-[#F0FDF4] p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#006144]">
                      Grup Resmi Seluruh Peserta
                    </span>
                    <span className="rounded-full bg-red-600 px-2 py-0.5 text-[9px] font-black text-white uppercase tracking-wider">
                      Wajib Masuk
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-[#2D4A3E]">
                    Grup induk calon kader LK-I untuk pengumuman jadwal, verifikasi berkas, dan info resmi panitia.
                  </p>
                  <button
                    type="button"
                    onClick={() => window.open("https://chat.whatsapp.com/EaDcUHFcNud8Dr2yOu4D01", "_blank")}
                    className="mt-2.5 inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#25D366] px-3 py-2 text-xs font-black text-white shadow-xs hover:bg-[#1EBE5D] transition-all"
                  >
                    <MessageCircle className="h-3.5 w-3.5 fill-white stroke-[#25D366]" />
                    <span>Gabung Grup Utama Calon Kader (Wajib)</span>
                    <ExternalLink className="h-3 w-3" />
                  </button>
                </div>

                {/* Mentor Bimbingan */}
                <div className="rounded-xl border border-[#BCD7CA] bg-white p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-[#006144]" />
                      <span className="text-[11px] font-bold text-[#4B6259]">
                        Mentor Bimbingan:
                      </span>
                    </div>
                    {result.mentorRole && (
                      <span className="text-[10px] font-bold text-[#006144] bg-[#EAF2EE] px-2 py-0.5 rounded">
                        {result.mentorRole}
                      </span>
                    )}
                  </div>
                  <h5 className="mt-1 text-xs sm:text-sm font-black text-[#10231C]">
                    {result.mentorName || "Panitia Kaderisasi"}
                  </h5>

                  {result.mentorWhatsappGroup && (
                    <button
                      type="button"
                      onClick={() => window.open(result.mentorWhatsappGroup, "_blank")}
                      className="mt-2.5 inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-[#006144] bg-[#F6F8F7] px-3 py-2 text-xs font-bold text-[#006144] hover:bg-[#EAF2EE] transition-all"
                    >
                      <Users className="h-3.5 w-3.5 text-[#006144]" />
                      <span>Buka Grup WhatsApp Mentor</span>
                      <ExternalLink className="h-3 w-3" />
                    </button>
                  )}
                </div>
              </div>

              {/* Screening Schedule & Scores */}
              {result.screeningSchedule && (
                <div className="mt-3 rounded-xl border border-blue-200 bg-blue-50/70 p-3 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-blue-900">
                    <Calendar className="h-3.5 w-3.5 text-blue-600" />
                    <span>Jadwal Screening / Wawancara:</span>
                  </div>
                  <p className="mt-1 font-semibold text-blue-800">
                    {new Date(result.screeningSchedule).toLocaleDateString("id-ID", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              )}

              {/* Screening Scores */}
              {(result.screeningScoreBtq || result.screeningScoreHmi || result.screeningScoreKebangsaan) && (
                <div className="mt-3 rounded-xl border border-[#DCE8E2] bg-white p-3 text-xs">
                  <span className="font-bold text-[#006144] block mb-1.5">
                    Hasil Penilaian Screening:
                  </span>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="rounded-lg bg-[#F6F8F7] p-2">
                      <span className="text-[10px] text-[#4B6259] block">BTQ</span>
                      <span className="font-black text-sm text-[#10231C]">
                        {result.screeningScoreBtq || "-"}
                      </span>
                    </div>
                    <div className="rounded-lg bg-[#F6F8F7] p-2">
                      <span className="text-[10px] text-[#4B6259] block">Ke-HMI-an</span>
                      <span className="font-black text-sm text-[#10231C]">
                        {result.screeningScoreHmi || "-"}
                      </span>
                    </div>
                    <div className="rounded-lg bg-[#F6F8F7] p-2">
                      <span className="text-[10px] text-[#4B6259] block">Kebangsaan</span>
                      <span className="font-black text-sm text-[#10231C]">
                        {result.screeningScoreKebangsaan || "-"}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Admin Note */}
              {result.adminNote && (
                <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50/70 p-3 text-xs text-amber-900">
                  <span className="font-bold block">Catatan Panitia:</span>
                  <p className="mt-0.5">{result.adminNote}</p>
                </div>
              )}
            </div>

            {/* Print Card Button */}
            <button
              type="button"
              onClick={() => setIsCardModalOpen(true)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#006144] py-2.5 text-xs font-bold text-white shadow-xs hover:bg-[#003324] transition-all"
            >
              <Printer className="h-4 w-4" />
              <span>Lihat & Cetak Kartu Peserta Digital</span>
            </button>
          </div>
        )}

        {/* Printable Card Modal */}
        {result && (
          <ParticipantCardModal
            isOpen={isCardModalOpen}
            onClose={() => setIsCardModalOpen(false)}
            data={result}
            registrationCode={result.registrationCode}
          />
        )}
      </div>
    </div>
  );
};


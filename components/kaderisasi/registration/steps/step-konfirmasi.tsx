"use client";

import React from "react";
import {
  User,
  GraduationCap,
  Sparkles,
  Users,
  Link as LinkIcon,
  Edit2,
  ShieldCheck,
  ExternalLink,
  MessageCircle,
} from "lucide-react";
import type { LK1FormData } from "../types";

interface StepKonfirmasiProps {
  formData: LK1FormData;
  updateField: <K extends keyof LK1FormData>(field: K, value: LK1FormData[K]) => void;
  onGoToStep: (stepIndex: number) => void;
  errors?: Record<string, string>;
}

export const StepKonfirmasi: React.FC<StepKonfirmasiProps> = ({
  formData,
  updateField,
  onGoToStep,
  errors = {},
}) => {
  return (
    <div className="space-y-5">
      <div className="border-b border-[#DCE8E2] pb-3">
        <h3 className="text-base sm:text-lg font-black text-[#10231C]">
          6. Konfirmasi & Review Data Pendaftaran
        </h3>
        <p className="mt-0.5 text-xs text-[#4B6259]">
          Periksa kembali kebenaran data Anda sebelum mengirimkan formulir pendaftaran LK-I.
        </p>
      </div>

      <div className="space-y-3.5">
        {/* Section 1: Data Diri */}
        <div className="rounded-2xl border border-[#DCE8E2] bg-white p-4">
          <div className="flex items-center justify-between border-b border-[#F0FDF4] pb-2">
            <div className="flex items-center gap-1.5 font-bold text-[#006144] text-xs">
              <User className="h-4 w-4" />
              <span>Data Diri</span>
            </div>
            <button
              type="button"
              onClick={() => onGoToStep(0)}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-[#006B3F] hover:underline"
            >
              <Edit2 className="h-3 w-3" />
              Ubah
            </button>
          </div>
          <div className="mt-2.5 grid gap-2 text-xs sm:grid-cols-2">
            <div>
              <span className="text-[11px] text-[#4B6259]">Nama Lengkap:</span>
              <p className="font-bold text-[#10231C]">{formData.fullName || "-"}</p>
            </div>
            <div>
              <span className="text-[11px] text-[#4B6259]">Nama Panggilan:</span>
              <p className="font-bold text-[#10231C]">{formData.nickname || "-"}</p>
            </div>
            <div>
              <span className="text-[11px] text-[#4B6259]">Jenis Kelamin:</span>
              <p className="font-bold text-[#10231C]">{formData.gender || "-"}</p>
            </div>
            <div>
              <span className="text-[11px] text-[#4B6259]">WhatsApp:</span>
              <p className="font-bold text-[#10231C]">{formData.whatsapp || "-"}</p>
            </div>
            <div>
              <span className="text-[11px] text-[#4B6259]">Email:</span>
              <p className="font-bold text-[#10231C] truncate">{formData.email || "-"}</p>
            </div>
            <div>
              <span className="text-[11px] text-[#4B6259]">Alamat Domisili:</span>
              <p className="font-medium text-[#10231C]">{formData.address || "-"}</p>
            </div>
          </div>
        </div>

        {/* Section 2: Data Akademik */}
        <div className="rounded-2xl border border-[#DCE8E2] bg-white p-4">
          <div className="flex items-center justify-between border-b border-[#F0FDF4] pb-2">
            <div className="flex items-center gap-1.5 font-bold text-[#006144] text-xs">
              <GraduationCap className="h-4 w-4" />
              <span>Data Akademik</span>
            </div>
            <button
              type="button"
              onClick={() => onGoToStep(1)}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-[#006B3F] hover:underline"
            >
              <Edit2 className="h-3 w-3" />
              Ubah
            </button>
          </div>
          <div className="mt-2.5 grid gap-2 text-xs sm:grid-cols-2">
            <div>
              <span className="text-[11px] text-[#4B6259]">Universitas:</span>
              <p className="font-bold text-[#10231C]">{formData.university || "-"}</p>
            </div>
            <div>
              <span className="text-[11px] text-[#4B6259]">Program Studi:</span>
              <p className="font-bold text-[#10231C]">{formData.studyProgram || "-"}</p>
            </div>
            <div>
              <span className="text-[11px] text-[#4B6259]">NIM:</span>
              <p className="font-bold text-[#10231C]">{formData.nim || "-"}</p>
            </div>
            <div>
              <span className="text-[11px] text-[#4B6259]">Semester & Kelas:</span>
              <p className="font-bold text-[#10231C]">
                Semester {formData.semester} {formData.className ? `(${formData.className})` : ""}
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Motivasi */}
        <div className="rounded-2xl border border-[#DCE8E2] bg-white p-4">
          <div className="flex items-center justify-between border-b border-[#F0FDF4] pb-2">
            <div className="flex items-center gap-1.5 font-bold text-[#006144] text-xs">
              <Sparkles className="h-4 w-4" />
              <span>Motivasi & Minat</span>
            </div>
            <button
              type="button"
              onClick={() => onGoToStep(2)}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-[#006B3F] hover:underline"
            >
              <Edit2 className="h-3 w-3" />
              Ubah
            </button>
          </div>
          <div className="mt-2.5 space-y-2 text-xs">
            <div>
              <span className="text-[11px] text-[#4B6259]">Motivasi LK-I:</span>
              <p className="font-medium text-[#10231C] leading-relaxed mt-0.5">
                {formData.motivation || "-"}
              </p>
            </div>
            <div>
              <span className="text-[11px] text-[#4B6259]">Bidang Minat:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {formData.interestFields.length > 0 ? (
                  formData.interestFields.map((field) => (
                    <span
                      key={field}
                      className="rounded-md bg-[#EAF2EE] px-2 py-0.5 text-[10px] font-bold text-[#006144]"
                    >
                      {field}
                    </span>
                  ))
                ) : (
                  <span className="text-[#4B6259]">-</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Mentor Pilihan (HIGHLIGHTED) */}
        <div className="rounded-2xl border-2 border-[#BCD7CA] bg-gradient-to-r from-[#F0FDF4] to-white p-4">
          <div className="flex items-center justify-between border-b border-[#BCD7CA]/60 pb-2">
            <div className="flex items-center gap-1.5 font-black text-[#006144] text-xs">
              <Users className="h-4 w-4" />
              <span>Mentor Bimbingan Pilihan Anda</span>
            </div>
            <button
              type="button"
              onClick={() => onGoToStep(3)}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-[#006B3F] hover:underline"
            >
              <Edit2 className="h-3 w-3" />
              Ubah Mentor
            </button>
          </div>
          <div className="mt-3 flex items-center justify-between gap-3">
            <div>
              <span className="rounded-full bg-[#006144] px-2.5 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
                {formData.mentorRole || "Belum dipilih"}
              </span>
              <h4 className="mt-1 text-sm font-black text-[#10231C]">
                {formData.mentorName || "Silakan pilih mentor di Langkah 4"}
              </h4>
              <p className="text-[11px] text-[#4B6259] mt-0.5 flex items-center gap-1 text-emerald-700 font-semibold">
                <MessageCircle className="h-3.5 w-3.5 text-[#25D366]" />
                Link Grup WhatsApp Bimbingan akan terbuka setelah tombol Kirim ditekan.
              </p>
            </div>
          </div>
        </div>

        {/* Section 5: Berkas */}
        <div className="rounded-2xl border border-[#DCE8E2] bg-white p-4">
          <div className="flex items-center justify-between border-b border-[#F0FDF4] pb-2">
            <div className="flex items-center gap-1.5 font-bold text-[#006144] text-xs">
              <LinkIcon className="h-4 w-4" />
              <span>Tautan Berkas</span>
            </div>
            <button
              type="button"
              onClick={() => onGoToStep(4)}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-[#006B3F] hover:underline"
            >
              <Edit2 className="h-3 w-3" />
              Ubah
            </button>
          </div>
          <div className="mt-2.5 space-y-1.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-[#4B6259]">Pas Foto Formal:</span>
              {formData.photoUrl ? (
                <a
                  href={formData.photoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-bold text-[#006144] hover:underline"
                >
                  <span>Lihat Link Foto</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              ) : (
                <span className="text-[#4B6259]">Belum dilampirkan</span>
              )}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-[#4B6259]">Bukti Kontribusi:</span>
              {formData.paymentProofUrl ? (
                <a
                  href={formData.paymentProofUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-bold text-[#006144] hover:underline"
                >
                  <span>Lihat Bukti Bayar</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              ) : (
                <span className="text-[#4B6259]">Menyusul saat screening</span>
              )}
            </div>
          </div>
        </div>

        {/* Consent Checkbox */}
        <div className="rounded-2xl border border-[#BCD7CA] bg-[#F4F9F6] p-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.consent}
              onChange={(e) => updateField("consent", e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-[#006144] text-[#006144] focus:ring-[#006144]"
            />
            <span className="text-xs text-[#2D4A3E] leading-relaxed">
              Saya menyatakan dengan sesungguhnya bahwa seluruh data yang saya isikan di atas adalah
              <strong> benar dan dapat dipertanggungjawabkan</strong>. Saya bersedia mengikuti seluruh
              rangkaian kegiatan <strong>Basic Training (LK-I)</strong> dan mematuhi tata tertib pengkaderan
              HMI Komisariat Sains & Teknologi UIN Sunan Gunung Djati Bandung.
            </span>
          </label>
          {errors.consent && (
            <p className="mt-2 text-[11px] font-bold text-red-600">⚠️ {errors.consent}</p>
          )}
        </div>
      </div>
    </div>
  );
};


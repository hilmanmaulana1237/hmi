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
  AlertTriangle,
  FolderPlus,
} from "lucide-react";
import type { LK1FormData } from "../types";

export const IG_PROOF_DRIVE_FOLDER =
  "https://drive.google.com/drive/folders/1pq0Uu3uMlohPPrkyCEHN4rmMk38bNVF-?usp=sharing";

function InstagramIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

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
              <p className="font-bold text-[#10231C]">
                {formData.studyProgram || "-"}
                {formData.studyProgram === "Lainnya / Luar Saintek" && formData.customStudyProgram
                  ? ` (${formData.customStudyProgram})`
                  : ""}
              </p>
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

          {/* Callout khusus untuk Luar Saintek */}
          {formData.studyProgram === "Lainnya / Luar Saintek" && (
            <div className="mt-3 rounded-xl border border-amber-300 bg-amber-50 p-3 text-xs text-amber-900">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
                <div className="space-y-1.5 flex-1">
                  <p className="font-bold text-amber-950">
                    Konfirmasi Wajib Peserta Luar Saintek:
                  </p>
                  <p className="text-[11px] leading-relaxed text-amber-800">
                    Karena Anda memilih jurusan di luar Saintek, pastikan Anda telah melakukan konfirmasi via WhatsApp ke kontak panitia di <strong>+62 812-8241-0724</strong>.
                  </p>
                  <a
                    href="https://wa.me/6281282410724?text=Assalamu%27alaikum%20Wr.%20Wb.%20Halo%20Panitia%20LK-1%20HMI%20Saintek%2C%20saya%20calon%20peserta%20dari%20Luar%20Saintek%20ingin%20mengonfirmasi%20pendaftaran%20LK-I."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#25D366] px-3 py-1.5 text-[11px] font-bold text-white shadow-2xs hover:bg-[#1EBE5D] transition-all"
                  >
                    <MessageCircle className="h-3.5 w-3.5 fill-white stroke-[#25D366]" />
                    <span>Chat WhatsApp Panitia (+62 812-8241-0724)</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          )}
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

        {/* Section 6: Bukti Follow Instagram (IG Saintek Cakaba, IG LK 1, IG KOHATI) */}
        <div className="rounded-2xl border-2 border-[#BCD7CA] bg-gradient-to-br from-[#F4F9F6] to-white p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-[#DCE8E2] pb-2.5">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-tr from-[#E1306C] via-[#FD1D1D] to-[#F77737] text-white">
                <InstagramIcon className="h-4 w-4" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-red-600 block">
                  Wajib Diunggah ke Drive
                </span>
                <h4 className="text-xs sm:text-sm font-black text-[#10231C]">
                  Bukti Follow Instagram Panitia & Kaderisasi
                </h4>
              </div>
            </div>

            <a
              href={IG_PROOF_DRIVE_FOLDER}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 self-start sm:self-auto rounded-full bg-[#006144] px-3.5 py-1.5 text-[11px] font-bold text-white hover:bg-[#003324] transition-all shadow-2xs"
            >
              <span>Buka Google Drive Panitia</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          <div className="mt-2.5 text-xs text-[#4B6259] space-y-2">
            <p className="font-semibold text-[#10231C] text-[11px]">
              Pastikan Anda telah mem-follow 3 akun Instagram di bawah:
            </p>
            <div className="grid gap-1.5 text-[11px] sm:grid-cols-3">
              <a
                href="https://www.instagram.com/hmisaintek.cakaba/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-white p-2 border border-[#DCE8E2] shadow-2xs hover:border-[#006144] transition-all flex items-center justify-between"
              >
                <div>
                  <strong className="text-[#006144] block">1. IG Saintek Cakaba</strong>
                  <span className="text-[10px] text-gray-600">@hmisaintek.cakaba</span>
                </div>
                <ExternalLink className="h-3 w-3 text-gray-400" />
              </a>
              <a
                href="https://www.instagram.com/lk1hmikom.saintek/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-white p-2 border border-[#DCE8E2] shadow-2xs hover:border-[#006144] transition-all flex items-center justify-between"
              >
                <div>
                  <strong className="text-[#006144] block">2. IG LK 1</strong>
                  <span className="text-[10px] text-gray-600">@lk1hmikom.saintek</span>
                </div>
                <ExternalLink className="h-3 w-3 text-gray-400" />
              </a>
              <a
                href="https://www.instagram.com/kohatikom_saintek/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-white p-2 border border-[#DCE8E2] shadow-2xs hover:border-[#006144] transition-all flex items-center justify-between"
              >
                <div>
                  <strong className="text-[#006144] block">3. IG KOHATI</strong>
                  <span className="text-[10px] text-gray-600">@kohatikom_saintek</span>
                </div>
                <ExternalLink className="h-3 w-3 text-gray-400" />
              </a>
            </div>

            <div className="rounded-xl border border-amber-300 bg-amber-50/80 p-2.5 text-[11px] text-amber-950 flex items-start gap-2">
              <FolderPlus className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Format Folder di Google Drive:</span>{" "}
                <code className="bg-white/80 px-1 py-0.5 rounded border border-amber-200 font-mono font-bold">
                  {formData.fullName || "Nama Peserta"} - {formData.studyProgram || "Jurusan"}
                </code>
                <p className="mt-0.5 text-amber-800 text-[10px]">
                  3 file screenshot bukti follow wajib diunggah ke dalam folder dengan format di atas.
                </p>
              </div>
            </div>
          </div>

          {/* Checkbox konfirmasi upload di Step Konfirmasi */}
          <div className="mt-3.5 pt-3 border-t border-[#DCE8E2]">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.igProofConfirmed}
                onChange={(e) => updateField("igProofConfirmed", e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-[#006144] text-[#006144] focus:ring-[#006144]"
              />
              <span className="text-xs font-semibold text-[#10231C] leading-snug">
                Saya telah mem-follow ketiga akun Instagram di atas, membuat folder dengan format <strong>Nama - Jurusan</strong> di Google Drive panitia, dan mengunggah 3 screenshot bukti follow ke dalamnya.
              </span>
            </label>
            {errors.igProofConfirmed && (
              <p className="mt-1.5 text-[11px] font-bold text-red-600">
                ⚠️ {errors.igProofConfirmed}
              </p>
            )}
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


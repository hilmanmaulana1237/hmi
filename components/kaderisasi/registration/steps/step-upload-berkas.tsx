"use client";

import React, { useState } from "react";
import {
  Link as LinkIcon,
  ExternalLink,
  Info,
  CheckCircle2,
  Image,
  Receipt,
  FileCheck2,
  Copy,
  Check,
  FolderPlus,
} from "lucide-react";
import type { LK1FormData } from "../types";

export const IG_PROOF_DRIVE_FOLDER =
  "https://drive.google.com/drive/folders/1pq0Uu3uMlohPPrkyCEHN4rmMk38bNVF-?usp=sharing";

export const IG_ACCOUNTS = [
  {
    name: "IG Saintek Cakaba",
    handle: "@hmisaintek.cakaba",
    url: "https://www.instagram.com/hmisaintek.cakaba/",
    desc: "Akun resmi Calon Kader Baru HMI Saintek",
  },
  {
    name: "IG LK 1",
    handle: "@lk1hmikom.saintek",
    url: "https://www.instagram.com/lk1hmikom.saintek/",
    desc: "Akun resmi Basic Training (LK-I) HMI Saintek",
  },
  {
    name: "IG KOHATI",
    handle: "@kohatikom_saintek",
    url: "https://www.instagram.com/kohatikom_saintek/",
    desc: "Akun resmi Korps HMI-Wati Komisariat Saintek",
  },
] as const;

function InstagramIcon({ className = "h-5 w-5" }: { className?: string }) {
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

interface StepUploadBerkasProps {
  formData: LK1FormData;
  updateField: <K extends keyof LK1FormData>(field: K, value: LK1FormData[K]) => void;
  errors?: Record<string, string>;
}

export const StepUploadBerkas: React.FC<StepUploadBerkasProps> = ({
  formData,
  updateField,
  errors = {},
}) => {
  const [copiedFolder, setCopiedFolder] = useState(false);

  const folderName = `${formData.fullName.trim() || "Nama Peserta"} - ${formData.studyProgram.trim() || "Jurusan"}`;

  const handleCopyFolderName = async () => {
    try {
      await navigator.clipboard.writeText(folderName);
      setCopiedFolder(true);
      setTimeout(() => setCopiedFolder(false), 2000);
    } catch {
      // ignore
    }
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const isGoogleDrive = (url: string) => {
    return url.includes("drive.google.com") || url.includes("docs.google.com");
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Step Header */}
      <div className="border-b border-[#DCE8E2] pb-3 sm:pb-4">
        <h3 className="text-base sm:text-xl font-black text-[#10231C]">
          5. Tautan Berkas & Dokumen Persyaratan
        </h3>
        <p className="mt-0.5 text-xs text-[#4B6259]">
          Unggah berkas ke Google Drive atau Cloud Storage Anda, lalu salin dan tempelkan tautan publiknya di sini.
        </p>
      </div>

      {/* Google Drive Guide Box */}
      <div className="rounded-2xl border border-[#BCD7CA] bg-[#F4F9F6] p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#DCE8E2]/80 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#006144] text-white shadow-xs">
              <Info className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-black text-[#10231C]">
                Petunjuk Upload Berkas via Google Drive
              </h4>
              <p className="text-[11px] text-[#4B6259]">
                Pastikan izin akses tautan disetel <strong>"Siapa saja yang memiliki link"</strong>.
              </p>
            </div>
          </div>

          <a
            href="https://drive.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 self-start sm:self-auto rounded-full bg-[#006144] px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-[#003324] active:scale-95 transition-all"
          >
            <span>Buka Google Drive</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        {/* 3 Step Cards */}
        <div className="mt-3 grid gap-2.5 sm:grid-cols-3">
          <div className="rounded-xl border border-white bg-white/95 p-3 shadow-xs">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#006144]">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#006144] text-[10px] font-black text-white">
                1
              </span>
              <span>Upload Berkas</span>
            </div>
            <p className="mt-1 text-[11px] leading-relaxed text-[#4B6259]">
              Unggah file Pas Foto atau Bukti Transfer ke folder Google Drive pribadi Anda.
            </p>
          </div>

          <div className="rounded-xl border border-white bg-white/95 p-3 shadow-xs">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#006144]">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#006144] text-[10px] font-black text-white">
                2
              </span>
              <span>Ubah Akses Link</span>
            </div>
            <p className="mt-1 text-[11px] leading-relaxed text-[#4B6259]">
              Klik kanan file &gt; <strong>Bagikan</strong> &gt; Ubah ke "Siapa saja yang memiliki link".
            </p>
          </div>

          <div className="rounded-xl border border-white bg-white/95 p-3 shadow-xs">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#006144]">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#006144] text-[10px] font-black text-white">
                3
              </span>
              <span>Tempel Tautan</span>
            </div>
            <p className="mt-1 text-[11px] leading-relaxed text-[#4B6259]">
              Klik <strong>Salin Link</strong> lalu tempelkan ke kolom isian formulir di bawah.
            </p>
          </div>
        </div>
      </div>

      {/* Input Fields */}
      <div className="space-y-4 pt-1">
        {/* Pas Foto Formal */}
        <div className="space-y-1.5">
          <div>
            <label className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#10231C]">
              <Image className="h-4 w-4 text-[#006144]" />
              <span>Tautan Link Pas Foto Formal Calon Peserta</span>
            </label>
            <p className="text-[11px] text-[#4B6259]">
              Foto berpakaian rapi / formal (ukuran 3x4 atau foto setengah badan dengan latar polos).
            </p>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
              <LinkIcon className="h-4 w-4" />
            </div>
            <input
              type="url"
              name="photoUrl"
              value={formData.photoUrl}
              onChange={(e) => updateField("photoUrl", e.target.value)}
              placeholder="https://drive.google.com/file/d/..."
              className={`w-full rounded-xl sm:rounded-2xl border bg-white pl-10 pr-24 py-2.5 sm:py-3 text-xs sm:text-sm text-[#10231C] outline-none transition-all placeholder:text-gray-400 focus:ring-2 focus:ring-[#006144]/20 ${
                errors.photoUrl
                  ? "border-red-400 bg-red-50/30"
                  : "border-[#DCE8E2] focus:border-[#006B3F]"
              }`}
            />
            {formData.photoUrl && isValidUrl(formData.photoUrl) && (
              <a
                href={formData.photoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-y-1.5 right-1.5 inline-flex items-center gap-1 rounded-xl bg-[#EAF2EE] px-2.5 text-[10px] sm:text-xs font-bold text-[#006144] hover:bg-[#BCD7CA] active:scale-95 transition-all"
              >
                <span>Uji Link</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>

          {formData.photoUrl && !isValidUrl(formData.photoUrl) && (
            <p className="text-[11px] text-amber-600 font-medium">
              ⚠️ Format tautan belum valid. Pastikan tautan diawali dengan <code>https://</code>
            </p>
          )}

          {formData.photoUrl && isGoogleDrive(formData.photoUrl) && (
            <p className="flex items-center gap-1 text-[11px] text-[#006144] font-medium">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Tautan Google Drive valid. Pastikan akses sudah publik (Anyone with link).
            </p>
          )}
        </div>

        {/* Bukti Kontribusi */}
        <div className="space-y-1.5">
          <div>
            <label className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#10231C]">
              <Receipt className="h-4 w-4 text-[#006144]" />
              <span>Link Bukti Pembayaran / Kontribusi LK-I (Opsional / Bisa Menyusul)</span>
            </label>
            <p className="text-[11px] text-[#4B6259]">
              Jika pembayaran administrasi via transfer bank/e-wallet, cantumkan link bukti transfer di sini (dapat dikonfirmasi saat screening).
            </p>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
              <LinkIcon className="h-4 w-4" />
            </div>
            <input
              type="url"
              name="paymentProofUrl"
              value={formData.paymentProofUrl}
              onChange={(e) => updateField("paymentProofUrl", e.target.value)}
              placeholder="https://drive.google.com/file/d/..."
              className="w-full rounded-xl sm:rounded-2xl border border-[#DCE8E2] bg-white pl-10 pr-24 py-2.5 sm:py-3 text-xs sm:text-sm text-[#10231C] outline-none transition-all placeholder:text-gray-400 focus:border-[#006B3F] focus:ring-2 focus:ring-[#006144]/20"
            />
            {formData.paymentProofUrl && isValidUrl(formData.paymentProofUrl) && (
              <a
                href={formData.paymentProofUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-y-1.5 right-1.5 inline-flex items-center gap-1 rounded-xl bg-[#EAF2EE] px-2.5 text-[10px] sm:text-xs font-bold text-[#006144] hover:bg-[#BCD7CA] active:scale-95 transition-all"
              >
                <span>Uji Link</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>

          {formData.paymentProofUrl && isGoogleDrive(formData.paymentProofUrl) && (
            <p className="flex items-center gap-1 text-[11px] text-[#006144] font-medium">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Tautan Google Drive valid.
            </p>
          )}
        </div>

        {/* Bukti Follow Instagram (IG Saintek Cakaba, IG LK 1, IG KOHATI) */}
        <div className="rounded-2xl border-2 border-[#BCD7CA] bg-gradient-to-br from-[#F4F9F6] via-white to-[#F0FDF4] p-4 sm:p-5 shadow-xs space-y-4">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#DCE8E2] pb-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-[#E1306C] via-[#FD1D1D] to-[#F77737] text-white shadow-xs">
                <InstagramIcon className="h-5 w-5" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5">
                  <h4 className="text-xs sm:text-sm font-black text-[#10231C]">
                    Bukti Follow 3 Akun Instagram Resmi
                  </h4>
                  <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-black text-red-600">
                    Wajib
                  </span>
                </div>
                <p className="text-[11px] text-[#4B6259]">
                  Follow 3 akun IG di bawah, buat folder <strong>Nama - Jurusan</strong> di Google Drive, lalu upload 3 screenshot bukti follow.
                </p>
              </div>
            </div>

            <a
              href={IG_PROOF_DRIVE_FOLDER}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 self-start sm:self-auto rounded-full bg-[#006144] px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#003324] active:scale-95 transition-all"
            >
              <span>Buka Google Drive Panitia</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Langkah 1: Follow 3 Akun Instagram */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#006144]">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#006144] text-[10px] font-black text-white">
                1
              </span>
              <span>Follow 3 Akun Instagram Resmi HMI Saintek & Ambil Screenshot:</span>
            </div>

            <div className="grid gap-2 sm:grid-cols-3">
              {IG_ACCOUNTS.map((ig) => (
                <div
                  key={ig.handle}
                  className="flex flex-col justify-between rounded-xl border border-[#DCE8E2] bg-white p-3 shadow-2xs hover:border-[#006144] transition-all"
                >
                  <div>
                    <span className="text-[10px] font-bold text-[#006144] uppercase tracking-wider block">
                      {ig.name}
                    </span>
                    <p className="mt-0.5 text-xs font-bold text-[#10231C]">{ig.handle}</p>
                    <p className="text-[10px] text-[#4B6259] mt-0.5">{ig.desc}</p>
                  </div>
                  <a
                    href={ig.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center justify-center gap-1 rounded-lg bg-gradient-to-r from-[#E1306C] to-[#FD1D1D] px-2.5 py-1.5 text-[11px] font-bold text-white shadow-2xs hover:opacity-90 active:scale-95 transition-all"
                  >
                    <span>Follow Akun</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Langkah 2: Buat Folder di Google Drive */}
          <div className="space-y-2 pt-2 border-t border-[#DCE8E2]/80">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#006144]">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#006144] text-[10px] font-black text-white">
                2
              </span>
              <span>Buat Folder Baru di Google Drive dengan Format:</span>
            </div>

            <div className="rounded-xl border border-amber-300 bg-amber-50/80 p-3 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1">
                    <FolderPlus className="h-3.5 w-3.5 text-amber-700" />
                    Format Nama Folder Wajib:
                  </span>
                  <p className="font-mono text-xs sm:text-sm font-black text-[#10231C]">
                    Nama - Jurusan
                  </p>
                  <p className="text-[11px] text-amber-900">
                    Contoh format nama folder Anda:{" "}
                    <strong className="underline text-[#006144]">{folderName}</strong>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleCopyFolderName}
                  className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded-lg bg-white border border-amber-300 px-3 py-1.5 text-[11px] font-bold text-amber-950 shadow-2xs hover:bg-amber-100 active:scale-95 transition-all"
                >
                  {copiedFolder ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-[#006144]" />
                      <span className="text-[#006144]">Format Disalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 text-amber-800" />
                      <span>Salin Format Nama</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Langkah 3: Upload 3 Screenshot */}
          <div className="space-y-1 pt-2 border-t border-[#DCE8E2]/80">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#006144]">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#006144] text-[10px] font-black text-white">
                3
              </span>
              <span>Upload 3 File Screenshot Bukti Follow ke Dalam Folder Tersebut:</span>
            </div>
            <p className="text-[11px] text-[#4B6259] pl-6.5 leading-relaxed">
              Buka Google Drive panitia, masuk ke folder baru yang Anda buat (<strong>{folderName}</strong>), lalu unggah 3 screenshot bukti follow IG Saintek Cakaba, IG LK 1, dan IG KOHATI.
            </p>
          </div>

          {/* Checkbox Konfirmasi Upload */}
          <div className="pt-3 border-t border-[#DCE8E2]">
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
              <p className="mt-1.5 text-[11px] font-semibold text-red-600">
                ⚠️ {errors.igProofConfirmed}
              </p>
            )}
          </div>
        </div>

        {/* Notes */}
        <div className="flex items-start gap-2.5 rounded-2xl border border-[#DCE8E2] bg-[#F6F8F7] p-3.5 text-xs text-[#4B6259]">
          <FileCheck2 className="mt-0.5 h-4 w-4 shrink-0 text-[#006144]" />
          <div>
            <strong className="text-[#10231C]">Kerahasiaan Dokumen:</strong> Tautan berkas Anda hanya dapat diakses oleh tim panitia kaderisasi HMI Komisariat Sains dan Teknologi untuk verifikasi administrasi LK-I.
          </div>
        </div>
      </div>
    </div>
  );
};

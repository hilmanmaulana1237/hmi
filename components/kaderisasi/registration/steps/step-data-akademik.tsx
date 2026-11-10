"use client";

import React from "react";
import {
  School,
  GraduationCap,
  BookMarked,
  Hash,
  Layers,
  Award,
  AlertTriangle,
  MessageCircle,
  ExternalLink,
} from "lucide-react";
import type { LK1FormData } from "../types";

interface StepDataAkademikProps {
  formData: LK1FormData;
  updateField: <K extends keyof LK1FormData>(field: K, value: LK1FormData[K]) => void;
  errors?: Record<string, string>;
}

export const commonSaintekMajors = [
  "Teknik Informatika",
  "Teknik Elektro",
  "Biologi",
  "Kimia",
  "Fisika",
  "Matematika",
  "Agroteknologi",
  "Lainnya / Luar Saintek",
] as const;

export const StepDataAkademik: React.FC<StepDataAkademikProps> = ({
  formData,
  updateField,
  errors = {},
}) => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="border-b border-[#DCE8E2] pb-3 sm:pb-4">
        <h3 className="text-base sm:text-xl font-black text-[#10231C]">
          2. Data Akademik Perguruan Tinggi
        </h3>
        <p className="mt-0.5 text-xs text-[#4B6259]">
          Informasi status mahasiswa, kampus, jurusan, dan nomor induk mahasiswa (NIM).
        </p>
      </div>

      <div className="grid gap-3.5 sm:gap-5 md:grid-cols-2">
        {/* Universitas */}
        <div className="space-y-1.5 md:col-span-2">
          <label className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#10231C]">
            <School className="h-4 w-4 text-[#006144]" />
            <span>Perguruan Tinggi / Kampus</span>
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="university"
            value={formData.university}
            onChange={(e) => updateField("university", e.target.value)}
            placeholder="Contoh: UIN Sunan Gunung Djati Bandung"
            required
            className={`w-full rounded-xl sm:rounded-2xl border bg-white px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm text-[#10231C] outline-none transition-all focus:ring-2 focus:ring-[#006144]/20 ${
              errors.university
                ? "border-red-400 bg-red-50/30"
                : "border-[#DCE8E2] focus:border-[#006B3F]"
            }`}
          />
          {errors.university && (
            <p className="text-[11px] font-semibold text-red-600">{errors.university}</p>
          )}
        </div>

        {/* Fakultas */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#10231C]">
            <GraduationCap className="h-4 w-4 text-[#006144]" />
            <span>Fakultas</span>
          </label>
          <input
            type="text"
            name="faculty"
            value={formData.faculty}
            onChange={(e) => updateField("faculty", e.target.value)}
            placeholder="Contoh: Sains dan Teknologi"
            className="w-full rounded-xl sm:rounded-2xl border border-[#DCE8E2] bg-white px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm text-[#10231C] outline-none transition-all placeholder:text-gray-400 focus:border-[#006B3F] focus:ring-2 focus:ring-[#006144]/20"
          />
        </div>

        {/* Program Studi */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#10231C]">
            <BookMarked className="h-4 w-4 text-[#006144]" />
            <span>Program Studi / Jurusan</span>
            <span className="text-red-500">*</span>
          </label>
          <div className="space-y-2">
            <select
              name="studyProgram"
              value={formData.studyProgram}
              onChange={(e) => updateField("studyProgram", e.target.value)}
              required
              className={`w-full rounded-xl sm:rounded-2xl border bg-white px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm text-[#10231C] outline-none transition-all focus:ring-2 focus:ring-[#006144]/20 ${
                errors.studyProgram
                  ? "border-red-400 bg-red-50/30"
                  : "border-[#DCE8E2] focus:border-[#006B3F]"
              }`}
            >
              <option value="">-- Pilih Program Studi / Jurusan --</option>
              {commonSaintekMajors.map((major) => (
                <option key={major} value={major}>
                  {major}
                </option>
              ))}
            </select>

            {/* Quick chips */}
            <div className="flex flex-wrap gap-1 sm:gap-1.5">
              {commonSaintekMajors.map((major) => (
                <button
                  key={major}
                  type="button"
                  onClick={() => updateField("studyProgram", major)}
                  className={`rounded-lg px-2 py-1 text-[10px] sm:text-[11px] font-semibold transition-all active:scale-95 ${
                    formData.studyProgram === major
                      ? "bg-[#006144] text-white shadow-xs"
                      : "bg-[#F6F8F7] text-[#4B6259] hover:bg-[#EAF2EE]"
                  }`}
                >
                  {major}
                </button>
              ))}
            </div>

            {/* Alert & WhatsApp Confirmation for Luar Saintek */}
            {formData.studyProgram === "Lainnya / Luar Saintek" && (
              <div className="mt-3 space-y-3 rounded-2xl border-2 border-amber-300 bg-amber-50/90 p-3.5 sm:p-4 text-xs text-amber-950 animate-fade-in shadow-xs">
                <div className="flex items-start gap-2.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-amber-600 text-white shadow-xs">
                    <AlertTriangle className="h-4 w-4" />
                  </div>
                  <div>
                    <h5 className="font-black text-amber-900 text-xs sm:text-sm">
                      Pemberitahuan Calon Peserta Luar Saintek (Wajib Konfirmasi)
                    </h5>
                    <p className="mt-1 leading-relaxed text-amber-800 text-[11px] sm:text-xs">
                      Bagi calon peserta yang memilih program studi di luar Saintek, <strong>WAJIB konfirmasi pendaftaran</strong> ke nomor narahubung panitia melalui WhatsApp di{" "}
                      <strong className="font-bold underline text-emerald-800">+62 812-8241-0724</strong>.
                    </p>
                  </div>
                </div>

                <a
                  href="https://wa.me/6281282410724?text=Assalamu%27alaikum%20Wr.%20Wb.%20Halo%20Panitia%20LK-1%20HMI%20Saintek%2C%20saya%20calon%20peserta%20dari%20Luar%20Saintek%20ingin%20mengonfirmasi%20pendaftaran%20LK-I."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-3.5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-[#1EBE5D] transition-all active:scale-95 w-full sm:w-auto"
                >
                  <MessageCircle className="h-4 w-4 fill-white stroke-[#25D366]" />
                  <span>Konfirmasi ke Panitia (+62 812-8241-0724)</span>
                  <ExternalLink className="h-3 w-3" />
                </a>

                <div className="pt-2 border-t border-amber-200/80">
                  <label className="block text-[11px] font-bold text-amber-900 mb-1">
                    Nama Jurusan & Fakultas Asal Anda:
                  </label>
                  <input
                    type="text"
                    name="customStudyProgram"
                    value={formData.customStudyProgram || ""}
                    onChange={(e) => updateField("customStudyProgram", e.target.value)}
                    placeholder="Contoh: Ilmu Komunikasi / FISIP, Manajemen / FEBI, dll."
                    className="w-full rounded-xl border border-amber-300 bg-white px-3 py-2 text-xs text-[#10231C] outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-amber-500/20"
                  />
                </div>
              </div>
            )}
          </div>
          {errors.studyProgram && (
            <p className="text-[11px] font-semibold text-red-600">{errors.studyProgram}</p>
          )}
        </div>

        {/* NIM */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#10231C]">
            <Hash className="h-4 w-4 text-[#006144]" />
            <span>Nomor Induk Mahasiswa (NIM)</span>
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="nim"
            value={formData.nim}
            onChange={(e) => updateField("nim", e.target.value)}
            placeholder="Contoh: 1227050012"
            required
            className={`w-full rounded-xl sm:rounded-2xl border bg-white px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm text-[#10231C] outline-none transition-all placeholder:text-gray-400 focus:ring-2 focus:ring-[#006144]/20 ${
              errors.nim
                ? "border-red-400 bg-red-50/30"
                : "border-[#DCE8E2] focus:border-[#006B3F]"
            }`}
          />
          {errors.nim && (
            <p className="text-[11px] font-semibold text-red-600">{errors.nim}</p>
          )}
        </div>

        {/* Semester */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#10231C]">
            <Layers className="h-4 w-4 text-[#006144]" />
            <span>Semester</span>
          </label>
          <select
            name="semester"
            value={formData.semester}
            onChange={(e) => updateField("semester", e.target.value)}
            className="w-full rounded-xl sm:rounded-2xl border border-[#DCE8E2] bg-white px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm text-[#10231C] outline-none transition-all focus:border-[#006B3F] focus:ring-2 focus:ring-[#006144]/20"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((sem) => (
              <option key={sem} value={sem}>
                Semester {sem}
              </option>
            ))}
          </select>
        </div>

        {/* Kelas */}
        <div className="space-y-1.5 md:col-span-2">
          <label className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#10231C]">
            <Award className="h-4 w-4 text-gray-400" />
            <span>Kelas / Rombel (Opsional)</span>
          </label>
          <input
            type="text"
            name="className"
            value={formData.className}
            onChange={(e) => updateField("className", e.target.value)}
            placeholder="Contoh: IF-A / Kelas 3B"
            className="w-full rounded-xl sm:rounded-2xl border border-[#DCE8E2] bg-white px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm text-[#10231C] outline-none transition-all placeholder:text-gray-400 focus:border-[#006B3F] focus:ring-2 focus:ring-[#006144]/20"
          />
        </div>
      </div>
    </div>
  );
};

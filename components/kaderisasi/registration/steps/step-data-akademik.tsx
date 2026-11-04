"use client";

import React from "react";
import { School, GraduationCap, BookMarked, Hash, Layers, Award } from "lucide-react";
import type { LK1FormData } from "../types";

interface StepDataAkademikProps {
  formData: LK1FormData;
  updateField: <K extends keyof LK1FormData>(field: K, value: LK1FormData[K]) => void;
  errors?: Record<string, string>;
}

const commonSaintekMajors = [
  "Teknik Informatika",
  "Teknik Elektro",
  "Biologi",
  "Kimia",
  "Fisika",
  "Matematika",
  "Agroteknologi",
  "Lainnya / Luar Saintek",
];

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
            <input
              type="text"
              name="studyProgram"
              value={formData.studyProgram}
              onChange={(e) => updateField("studyProgram", e.target.value)}
              placeholder="Ketik atau pilih jurusan di bawah..."
              required
              className={`w-full rounded-xl sm:rounded-2xl border bg-white px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm text-[#10231C] outline-none transition-all placeholder:text-gray-400 focus:ring-2 focus:ring-[#006144]/20 ${
                errors.studyProgram
                  ? "border-red-400 bg-red-50/30"
                  : "border-[#DCE8E2] focus:border-[#006B3F]"
              }`}
            />
            {/* Quick chips */}
            <div className="flex flex-wrap gap-1 sm:gap-1.5">
              {commonSaintekMajors.map((major) => (
                <button
                  key={major}
                  type="button"
                  onClick={() =>
                    updateField(
                      "studyProgram",
                      major === "Lainnya / Luar Saintek" ? "" : major
                    )
                  }
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

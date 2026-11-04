"use client";

import React from "react";
import { Flame, Briefcase, Compass, Check } from "lucide-react";
import type { LK1FormData } from "../types";

interface StepMotivasiProps {
  formData: LK1FormData;
  updateField: <K extends keyof LK1FormData>(field: K, value: LK1FormData[K]) => void;
  toggleInterestField: (field: string) => void;
  errors?: Record<string, string>;
}

const interestOptions = [
  {
    name: "Kaderisasi",
    desc: "Pengembangan kurikulum, mentoring kader baru, dan pelatihan kepemimpinan.",
  },
  {
    name: "PTKP",
    desc: "Perguruan Tinggi, Kemahasiswaan, dan Kepemudaan (Advokasi & Kebijakan Kampus).",
  },
  {
    name: "Kewirausahaan",
    desc: "Pengembangan bisnis, creative hub, dan kemandirian finansial mahasiswa.",
  },
  {
    name: "Media dan Komunikasi",
    desc: "Desain grafis, konten digital, video, jurnalistik, dan media sosial.",
  },
  {
    name: "Keilmuan",
    desc: "Riset ilmiah, teknologi, sains, dan kajian intelektual integratif.",
  },
  {
    name: "Keagamaan",
    desc: "Kajian keislaman, Nilai Dasar Perjuangan (NDP), dan spiritualitas.",
  },
  {
    name: "Sosial Masyarakat",
    desc: "Pengabdian masyarakat, bakti sosial, dan aksi kepedulian lingkungan.",
  },
];

export const StepMotivasi: React.FC<StepMotivasiProps> = ({
  formData,
  updateField,
  toggleInterestField,
  errors = {},
}) => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="border-b border-[#DCE8E2] pb-3 sm:pb-4">
        <h3 className="text-base sm:text-xl font-black text-[#10231C]">
          3. Motivasi & Minat Bidang Pengembangan
        </h3>
        <p className="mt-0.5 text-xs text-[#4B6259]">
          Ceritakan latar belakang ketertarikan Anda mengikuti LK-I dan bidang yang ingin Anda tekuni.
        </p>
      </div>

      <div className="space-y-4 sm:space-y-5">
        {/* Motivasi */}
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center justify-between gap-1.5">
            <label className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#10231C]">
              <Flame className="h-4 w-4 text-[#F2994A]" />
              <span>Motivasi Mengikuti LK-I</span>
              <span className="text-red-500">*</span>
            </label>
            <span
              className={`rounded-full px-2.5 py-0.5 text-[10px] sm:text-[11px] font-bold transition-all ${
                formData.motivation.length >= 10
                  ? "bg-emerald-50 text-[#006144] border border-emerald-200"
                  : "bg-amber-50 text-amber-700 border border-amber-200"
              }`}
            >
              {formData.motivation.length} karakter (Min. 10)
            </span>
          </div>

          <textarea
            name="motivation"
            rows={4}
            value={formData.motivation}
            onChange={(e) => updateField("motivation", e.target.value)}
            placeholder="Ceritakan alasan Anda ingin bergabung dengan HMI dan harapan apa yang ingin dicapai melalui Latihan Kader I..."
            required
            className={`w-full rounded-xl sm:rounded-2xl border bg-white p-3.5 sm:p-4 text-xs sm:text-sm text-[#10231C] outline-none transition-all placeholder:text-gray-400 focus:ring-2 focus:ring-[#006144]/20 ${
              errors.motivation
                ? "border-red-400 bg-red-50/30"
                : "border-[#DCE8E2] focus:border-[#006B3F]"
            }`}
          />
          {errors.motivation && (
            <p className="text-[11px] font-semibold text-red-600">{errors.motivation}</p>
          )}
        </div>

        {/* Pengalaman Organisasi */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#10231C]">
            <Briefcase className="h-4 w-4 text-[#006144]" />
            <span>Pengalaman Organisasi Sebelumnya (Opsional)</span>
          </label>
          <textarea
            name="organizationExperience"
            rows={2}
            value={formData.organizationExperience}
            onChange={(e) => updateField("organizationExperience", e.target.value)}
            placeholder="Contoh: OSIS SMA, Rohis, Pramuka, BEM/DEMA/HMJ, Komunitas IT, dll (Kosongkan jika belum ada)..."
            className="w-full rounded-xl sm:rounded-2xl border border-[#DCE8E2] bg-white p-3.5 sm:p-4 text-xs sm:text-sm text-[#10231C] outline-none transition-all placeholder:text-gray-400 focus:border-[#006B3F] focus:ring-2 focus:ring-[#006144]/20"
          />
        </div>

        {/* Minat Bidang Pengembangan */}
        <div className="space-y-2">
          <label className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#10231C]">
            <Compass className="h-4 w-4 text-[#006144]" />
            <span>Bidang Minat & Keahlian yang Ingin Dikembangkan di HMI</span>
          </label>
          <p className="text-[11px] text-[#4B6259]">
            Pilih satu atau beberapa bidang yang paling sesuai dengan passion Anda:
          </p>

          <div className="grid gap-2.5 sm:grid-cols-2">
            {interestOptions.map((item) => {
              const isSelected = formData.interestFields.includes(item.name);
              return (
                <div
                  key={item.name}
                  onClick={() => toggleInterestField(item.name)}
                  className={`flex cursor-pointer items-start gap-3 rounded-xl sm:rounded-2xl border p-3 sm:p-3.5 transition-all ${
                    isSelected
                      ? "border-[#006144] bg-[#F0FDF4] shadow-xs"
                      : "border-[#DCE8E2] bg-white hover:border-[#BCD7CA]"
                  }`}
                >
                  <div
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all ${
                      isSelected
                        ? "border-[#006144] bg-[#006144] text-white"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    {isSelected && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#10231C]">
                      {item.name}
                    </h4>
                    <p className="mt-0.5 text-[11px] text-[#4B6259] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

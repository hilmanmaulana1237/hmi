"use client";

import React from "react";
import { User, Phone, Mail, MapPin, Calendar, Users } from "lucide-react";
import type { LK1FormData } from "../types";

interface StepDataDiriProps {
  formData: LK1FormData;
  updateField: <K extends keyof LK1FormData>(field: K, value: LK1FormData[K]) => void;
  errors?: Record<string, string>;
}

export const StepDataDiri: React.FC<StepDataDiriProps> = ({
  formData,
  updateField,
  errors = {},
}) => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="border-b border-[#DCE8E2] pb-3 sm:pb-4">
        <h3 className="text-base sm:text-xl font-black text-[#10231C]">
          1. Data Pribadi Calon Peserta
        </h3>
        <p className="mt-0.5 text-xs text-[#4B6259]">
          Lengkapi identitas diri Anda sesuai KTP/KTM untuk data pendaftaran kaderisasi.
        </p>
      </div>

      <div className="grid gap-3.5 sm:gap-5 md:grid-cols-2">
        {/* Nama Lengkap */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#10231C]">
            <User className="h-4 w-4 text-[#006144]" />
            <span>Nama Lengkap</span>
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={(e) => updateField("fullName", e.target.value)}
            placeholder="Contoh: Muhammad Fajar Pratama"
            required
            className={`w-full rounded-xl sm:rounded-2xl border bg-white px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm text-[#10231C] outline-none transition-all placeholder:text-gray-400 focus:ring-2 focus:ring-[#006144]/20 ${
              errors.fullName
                ? "border-red-400 bg-red-50/30"
                : "border-[#DCE8E2] focus:border-[#006B3F]"
            }`}
          />
          {errors.fullName && (
            <p className="text-[11px] font-semibold text-red-600">{errors.fullName}</p>
          )}
        </div>

        {/* Nama Panggilan */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#10231C]">
            <User className="h-4 w-4 text-gray-400" />
            <span>Nama Panggilan</span>
          </label>
          <input
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={(e) => updateField("nickname", e.target.value)}
            placeholder="Contoh: Fajar"
            className="w-full rounded-xl sm:rounded-2xl border border-[#DCE8E2] bg-white px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm text-[#10231C] outline-none transition-all placeholder:text-gray-400 focus:border-[#006B3F] focus:ring-2 focus:ring-[#006144]/20"
          />
        </div>

        {/* Jenis Kelamin */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#10231C]">
            <Users className="h-4 w-4 text-[#006144]" />
            <span>Jenis Kelamin</span>
            <span className="text-red-500">*</span>
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={(e) => updateField("gender", e.target.value)}
            className={`w-full rounded-xl sm:rounded-2xl border bg-white px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm text-[#10231C] outline-none transition-all focus:ring-2 focus:ring-[#006144]/20 ${
              errors.gender
                ? "border-red-400 bg-red-50/30"
                : "border-[#DCE8E2] focus:border-[#006B3F]"
            }`}
          >
            <option value="">-- Pilih Jenis Kelamin --</option>
            <option value="Laki-laki">Laki-laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>
          {errors.gender && (
            <p className="text-[11px] font-semibold text-red-600">{errors.gender}</p>
          )}
        </div>

        {/* Tempat Lahir */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#10231C]">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span>Tempat Lahir</span>
          </label>
          <input
            type="text"
            name="birthPlace"
            value={formData.birthPlace}
            onChange={(e) => updateField("birthPlace", e.target.value)}
            placeholder="Contoh: Bandung"
            className="w-full rounded-xl sm:rounded-2xl border border-[#DCE8E2] bg-white px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm text-[#10231C] outline-none transition-all placeholder:text-gray-400 focus:border-[#006B3F] focus:ring-2 focus:ring-[#006144]/20"
          />
        </div>

        {/* Tanggal Lahir */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#10231C]">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span>Tanggal Lahir</span>
          </label>
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={(e) => updateField("birthDate", e.target.value)}
            className="w-full rounded-xl sm:rounded-2xl border border-[#DCE8E2] bg-white px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm text-[#10231C] outline-none transition-all focus:border-[#006B3F] focus:ring-2 focus:ring-[#006144]/20"
          />
        </div>

        {/* Nomor WhatsApp */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#10231C]">
            <Phone className="h-4 w-4 text-[#006144]" />
            <span>Nomor WhatsApp Aktif</span>
            <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="whatsapp"
            value={formData.whatsapp}
            onChange={(e) => updateField("whatsapp", e.target.value)}
            placeholder="Contoh: 081234567890"
            required
            className={`w-full rounded-xl sm:rounded-2xl border bg-white px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm text-[#10231C] outline-none transition-all placeholder:text-gray-400 focus:ring-2 focus:ring-[#006144]/20 ${
              errors.whatsapp
                ? "border-red-400 bg-red-50/30"
                : "border-[#DCE8E2] focus:border-[#006B3F]"
            }`}
          />
          {errors.whatsapp && (
            <p className="text-[11px] font-semibold text-red-600">{errors.whatsapp}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1.5 md:col-span-2">
          <label className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#10231C]">
            <Mail className="h-4 w-4 text-[#006144]" />
            <span>Alamat Email</span>
            <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) => updateField("email", e.target.value)}
            placeholder="Contoh: fajar@student.uinsgd.ac.id"
            required
            className={`w-full rounded-xl sm:rounded-2xl border bg-white px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm text-[#10231C] outline-none transition-all placeholder:text-gray-400 focus:ring-2 focus:ring-[#006144]/20 ${
              errors.email
                ? "border-red-400 bg-red-50/30"
                : "border-[#DCE8E2] focus:border-[#006B3F]"
            }`}
          />
          {errors.email && (
            <p className="text-[11px] font-semibold text-red-600">{errors.email}</p>
          )}
        </div>

        {/* Alamat Domisili */}
        <div className="space-y-1.5 md:col-span-2">
          <label className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#10231C]">
            <MapPin className="h-4 w-4 text-[#006144]" />
            <span>Alamat Domisili / Kos Saat Ini</span>
          </label>
          <textarea
            name="address"
            rows={2}
            value={formData.address}
            onChange={(e) => updateField("address", e.target.value)}
            placeholder="Contoh: Jl. A.H. Nasution No. 105, Cipadung, Kec. Cibiru, Kota Bandung"
            className="w-full rounded-xl sm:rounded-2xl border border-[#DCE8E2] bg-white p-3 sm:p-3.5 text-xs sm:text-sm text-[#10231C] outline-none transition-all placeholder:text-gray-400 focus:border-[#006B3F] focus:ring-2 focus:ring-[#006144]/20"
          />
        </div>
      </div>
    </div>
  );
};

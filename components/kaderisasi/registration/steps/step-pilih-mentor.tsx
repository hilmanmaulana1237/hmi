"use client";

import React, { useState } from "react";
import {
  Users,
  Award,
  GraduationCap,
  MessageCircle,
  CheckCircle2,
  Sparkles,
  Briefcase,
  Search,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import type { LK1FormData, MentorItem } from "../types";

interface StepPilihMentorProps {
  formData: LK1FormData;
  updateField: <K extends keyof LK1FormData>(field: K, value: LK1FormData[K]) => void;
  mentors: MentorItem[];
  errors?: Record<string, string>;
}

export const StepPilihMentor: React.FC<StepPilihMentorProps> = ({
  formData,
  updateField,
  mentors,
  errors = {},
}) => {
  const [search, setSearch] = useState("");
  const [selectedProdi, setSelectedProdi] = useState("Semua");
  const [showGuide, setShowGuide] = useState(true);

  const filteredMentors = mentors.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.role.toLowerCase().includes(search.toLowerCase()) ||
      m.studyProgram.toLowerCase().includes(search.toLowerCase()) ||
      m.guidanceFocus.toLowerCase().includes(search.toLowerCase());

    const matchesProdi =
      selectedProdi === "Semua" ||
      m.studyProgram.toLowerCase().includes(selectedProdi.toLowerCase());

    return matchesSearch && matchesProdi;
  });

  const handleSelectMentor = (mentor: MentorItem) => {
    updateField("mentorId", mentor.id);
    updateField("mentorName", mentor.name);
    updateField("mentorRole", mentor.role);
    updateField("mentorWhatsappGroup", mentor.whatsappGroupUrl);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Step Header */}
      <div className="border-b border-[#DCE8E2] pb-3 sm:pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
          <div>
            <h3 className="text-base sm:text-xl font-black text-[#10231C] flex items-center gap-2">
              <Users className="h-5 w-5 text-[#006144]" />
              4. Pemilihan Mentor & Idola Bimbingan
            </h3>
            <p className="mt-0.5 text-xs text-[#4B6259]">
              Pilih figur teladan pemimpin mahasiswa yang siap mendampingi Anda di kampus & kaderisasi.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowGuide(!showGuide)}
            className="self-start sm:self-auto inline-flex items-center gap-1 text-xs font-bold text-[#006144] hover:underline"
          >
            <span>{showGuide ? "Sembunyikan Panduan" : "Apa Gunanya Mentor?"}</span>
            {showGuide ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>

      {/* EDUCATIONAL BANNER: Apa itu mentor & Gunanya apa? */}
      {showGuide && (
        <div className="rounded-2xl border border-[#BCD7CA] bg-gradient-to-br from-[#F0FDF4] via-[#F6FBF8] to-white p-4 sm:p-5 shadow-xs">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#006144] text-white shadow-sm">
              <Sparkles className="h-5 w-5 text-[#F2994A]" />
            </div>
            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-1">
                <h4 className="text-xs sm:text-sm font-black text-[#003324]">
                  🌟 Kenapa Harus Memilih Mentor di LK-I?
                </h4>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#EAF2EE] px-2.5 py-0.5 text-[10px] font-bold text-[#006144]">
                  <MessageCircle className="h-3 w-3 text-[#25D366]" />
                  Termasuk Grup WhatsApp Mentor
                </span>
              </div>

              <p className="text-xs leading-relaxed text-[#2D4A3E]">
                <strong>Mentor LK-I</strong> adalah para figur idola mahasiswa di kampus—seperti{" "}
                <strong>Ketua DEMA (Dewan Eksekutif Mahasiswa) FST</strong>,{" "}
                <strong>Ketua SEMA (Senat Mahasiswa) FST</strong>,{" "}
                <strong>Ketua HMJ (Himpunan Mahasiswa Jurusan)</strong>, serta fungsionaris senior HMI.
                Mereka siap menjadi kakak tingkat, sahabat diskusi, dan pembimbing pribadi Anda:
              </p>

              {/* 4 Pilar Bimbingan */}
              <div className="grid gap-2 pt-1 sm:grid-cols-2">
                <div className="flex items-start gap-2 rounded-xl bg-white p-2.5 border border-[#DCE8E2]">
                  <GraduationCap className="h-4 w-4 text-[#006144] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] font-bold text-[#10231C] block">Bimbingan Akademik</span>
                    <p className="text-[10px] text-[#4B6259] leading-normal">
                      Tips perkuliahan, trik praktikum/tugas, strategi IPK 3.8+, dan arahan dosen.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2 rounded-xl bg-white p-2.5 border border-[#DCE8E2]">
                  <Briefcase className="h-4 w-4 text-[#006144] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] font-bold text-[#10231C] block">Pengembangan Organisasi</span>
                    <p className="text-[10px] text-[#4B6259] leading-normal">
                      Peta ormawa kampus (DEMA/SEMA/HMJ), kepemimpinan, dan jaringan relasi.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2 rounded-xl bg-white p-2.5 border border-[#DCE8E2]">
                  <ShieldCheck className="h-4 w-4 text-[#006144] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] font-bold text-[#10231C] block">Pendampingan Screening</span>
                    <p className="text-[10px] text-[#4B6259] leading-normal">
                      Dibimbing belajar BTQ, wawasan keislaman, kebangsaan, dan ke-HMI-an dari nol.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2 rounded-xl bg-white p-2.5 border border-[#DCE8E2]">
                  <MessageCircle className="h-4 w-4 text-[#25D366] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] font-bold text-[#10231C] block">Grup WhatsApp Komunitas</span>
                    <p className="text-[10px] text-[#4B6259] leading-normal">
                      Setelah submit, Anda langsung tergabung ke Grup WA mentoring bersama mentor & teman baru.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="space-y-2.5">
        <div className="relative">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama mentor, jabatan (DEMA/SEMA/HMJ), atau fokus keahlian..."
            className="w-full rounded-xl sm:rounded-2xl border border-[#DCE8E2] bg-white py-2.5 pl-10 pr-4 text-xs sm:text-sm text-[#10231C] placeholder:text-gray-400 outline-none transition-all focus:border-[#006B3F] focus:ring-2 focus:ring-[#006144]/20"
          />
        </div>

        {/* Prodi Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          <span className="text-[11px] font-bold text-[#4B6259] shrink-0 mr-1">Jurusan:</span>
          {["Semua", "Teknik Informatika", "Biologi", "Fisika", "Teknik Elektro", "Agroteknologi"].map((prodi) => (
            <button
              key={prodi}
              type="button"
              onClick={() => setSelectedProdi(prodi)}
              className={`rounded-full px-3 py-1 text-[11px] font-bold whitespace-nowrap transition-all active:scale-95 ${
                selectedProdi === prodi
                  ? "bg-[#006144] text-white shadow-xs"
                  : "bg-white border border-[#DCE8E2] text-[#4B6259] hover:bg-[#F6F8F7]"
              }`}
            >
              {prodi}
            </button>
          ))}
        </div>
      </div>

      {errors.mentorId && (
        <div className="rounded-xl border border-red-300 bg-red-50 p-3 text-xs font-bold text-red-600 flex items-center gap-2">
          <span>⚠️ {errors.mentorId}</span>
        </div>
      )}

      {/* Mentor Cards Grid */}
      <div className="grid gap-3.5 sm:gap-4 sm:grid-cols-2">
        {filteredMentors.map((mentor) => {
          const isSelected = formData.mentorId === mentor.id;
          return (
            <div
              key={mentor.id}
              onClick={() => handleSelectMentor(mentor)}
              className={`relative cursor-pointer rounded-2xl border-2 p-4 transition-all hover:shadow-md ${
                isSelected
                  ? "border-[#006144] bg-[#F0FDF4] shadow-md ring-2 ring-[#006144]/20"
                  : "border-[#DCE8E2] bg-white hover:border-[#BCD7CA]"
              }`}
            >
              {/* Selected Badge */}
              {isSelected && (
                <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-[#006144] px-2.5 py-0.5 text-[10px] font-black text-white shadow-xs">
                  <CheckCircle2 className="h-3 w-3" />
                  <span>Dipilih</span>
                </div>
              )}

              {/* Header Profile */}
              <div className="flex items-start gap-2.5 sm:gap-3">
                <div className="relative shrink-0">
                  <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#006144] to-[#003324] text-white font-bold text-sm sm:text-base overflow-hidden border-2 border-white shadow-xs">
                    {mentor.avatarUrl ? (
                      <img
                        src={mentor.avatarUrl}
                        alt={mentor.name}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          (e.currentTarget as HTMLElement).style.display = "none";
                        }}
                      />
                    ) : (
                      mentor.name.slice(0, 2).toUpperCase()
                    )}
                  </div>
                </div>

                <div className="flex-1 min-w-0 pr-14">
                  <span className="inline-block rounded-md bg-[#EAF2EE] px-2 py-0.5 text-[9px] sm:text-[10px] font-black text-[#006144] uppercase tracking-wider">
                    {mentor.role}
                  </span>
                  <h4 className="mt-0.5 text-xs sm:text-sm font-black text-[#10231C] truncate">
                    {mentor.name}
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-[#4B6259] truncate">
                    {mentor.studyProgram} • {mentor.batch}
                  </p>
                </div>
              </div>

              {/* Bio & Focus */}
              <div className="mt-3 space-y-2 border-t border-[#DCE8E2]/70 pt-2.5 text-xs">
                <p className="text-[11px] leading-relaxed text-[#4B6259] line-clamp-2 italic">
                  "{mentor.bio}"
                </p>

                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#006144]">
                  <Award className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{mentor.guidanceFocus}</span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[#25D366]">
                    <MessageCircle className="h-3 w-3" />
                    <span>Grup WA Tersedia</span>
                  </span>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectMentor(mentor);
                    }}
                    className={`rounded-full px-3 py-1 text-xs font-bold transition-all ${
                      isSelected
                        ? "bg-[#006144] text-white"
                        : "border border-[#DCE8E2] bg-white text-[#006144] hover:bg-[#EAF2EE]"
                    }`}
                  >
                    {isSelected ? "Dipilih ✓" : "Pilih Mentor Ini"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredMentors.length === 0 && (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-6 text-center text-xs text-[#4B6259]">
          <Users className="mx-auto h-7 w-7 text-gray-400 mb-2" />
          Tidak ada mentor yang cocok dengan pencarian kata kunci "{search}".
        </div>
      )}

      {/* Selected Mentor Alert preview */}
      {formData.mentorName && (
        <div className="rounded-2xl border border-[#25D366] bg-[#F0FDF4] p-3.5 text-xs">
          <div className="flex items-center gap-2 font-bold text-[#006144]">
            <CheckCircle2 className="h-4 w-4 text-[#25D366]" />
            <span>Mentor Terpilih: {formData.mentorName} ({formData.mentorRole})</span>
          </div>
          <p className="mt-1 text-[11px] text-[#4B6259]">
            Setelah formulir dikirim, Anda akan langsung mendapatkan tautan untuk bergabung ke
            <strong> Grup WhatsApp Bimbingan</strong> mentor pilihan Anda.
          </p>
        </div>
      )}
    </div>
  );
};

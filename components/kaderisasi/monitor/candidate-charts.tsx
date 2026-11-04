"use client";

import React from "react";
import { BarChart3, PieChart, Users, Award } from "lucide-react";
import type { StoredLK1Registration } from "../registration/types";

interface CandidateChartsProps {
  registrations: any[];
}

export const CandidateCharts: React.FC<CandidateChartsProps> = ({ registrations }) => {
  if (registrations.length === 0) return null;

  // 1. Major counts
  const majorCounts: Record<string, number> = {};
  registrations.forEach((r) => {
    const major = r.study_program || r.studyProgram || "Lainnya";
    majorCounts[major] = (majorCounts[major] || 0) + 1;
  });

  const sortedMajors = Object.entries(majorCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 7);

  const maxMajorCount = Math.max(...Object.values(majorCounts), 1);

  // 2. Gender counts
  const maleCount = registrations.filter((r) => r.gender === "Laki-laki").length;
  const femaleCount = registrations.filter((r) => r.gender === "Perempuan").length;

  const malePercent = Math.round((maleCount / registrations.length) * 100) || 0;
  const femalePercent = Math.round((femaleCount / registrations.length) * 100) || 0;

  // 3. Mentor counts
  const mentorCounts: Record<string, number> = {};
  registrations.forEach((r) => {
    const mentor = r.mentor_name || r.mentorName || "Belum Pilih Mentor";
    mentorCounts[mentor] = (mentorCounts[mentor] || 0) + 1;
  });

  const sortedMentors = Object.entries(mentorCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  const maxMentorCount = Math.max(...Object.values(mentorCounts), 1);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {/* Chart 1: Persebaran Program Studi */}
      <div className="rounded-2xl border border-[#DCE8E2] bg-white p-4.5 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#EAF2EE] pb-3">
          <div className="flex items-center gap-2 text-xs font-black text-[#10231C]">
            <BarChart3 className="h-4 w-4 text-[#006144]" />
            <span>Pendaftar per Program Studi</span>
          </div>
          <span className="text-[10px] font-bold text-[#4B6259]">Top Jurusan</span>
        </div>

        <div className="mt-3.5 space-y-2.5">
          {sortedMajors.map(([major, count]) => {
            const percent = Math.round((count / maxMajorCount) * 100);
            return (
              <div key={major} className="space-y-1">
                <div className="flex justify-between items-center text-[11px] gap-2">
                  <span className="font-semibold text-[#10231C] truncate max-w-[130px] xs:max-w-[180px]">{major}</span>
                  <span className="font-bold text-[#006144] shrink-0">{count} calon</span>
                </div>
                <div className="h-2 rounded-full bg-[#EAF2EE] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#006144] transition-all duration-500"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chart 2: Pilihan Mentor Terbanyak */}
      <div className="rounded-2xl border border-[#DCE8E2] bg-white p-4.5 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#EAF2EE] pb-3">
          <div className="flex items-center gap-2 text-xs font-black text-[#10231C]">
            <Award className="h-4 w-4 text-[#F2994A]" />
            <span>Pilihan Mentor & Idola</span>
          </div>
          <span className="text-[10px] font-bold text-[#4B6259]">Mentee Terbanyak</span>
        </div>

        <div className="mt-3.5 space-y-2.5">
          {sortedMentors.map(([mentor, count]) => {
            const percent = Math.round((count / maxMentorCount) * 100);
            return (
              <div key={mentor} className="space-y-1">
                <div className="flex justify-between items-center text-[11px] gap-2">
                  <span className="font-semibold text-[#10231C] truncate max-w-[130px] xs:max-w-[180px]">{mentor}</span>
                  <span className="font-bold text-[#006144] shrink-0">{count} pendaftar</span>
                </div>
                <div className="h-2 rounded-full bg-[#EAF2EE] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#25D366] transition-all duration-500"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chart 3: Proporsi Gender & Status */}
      <div className="rounded-2xl border border-[#DCE8E2] bg-white p-4.5 shadow-xs flex flex-col justify-between sm:col-span-2 lg:col-span-1">
        <div>
          <div className="flex items-center justify-between border-b border-[#EAF2EE] pb-3">
            <div className="flex items-center gap-2 text-xs font-black text-[#10231C]">
              <PieChart className="h-4 w-4 text-[#006144]" />
              <span>Proporsi Gender Peserta</span>
            </div>
            <span className="text-[10px] font-bold text-[#4B6259]">Total: {registrations.length}</span>
          </div>

          <div className="mt-4 space-y-3">
            <div className="flex h-3 rounded-full overflow-hidden bg-gray-100">
              <div
                className="bg-[#006144] transition-all duration-500"
                style={{ width: `${malePercent}%` }}
              />
              <div
                className="bg-[#F2994A] transition-all duration-500"
                style={{ width: `${femalePercent}%` }}
              />
            </div>

            <div className="flex justify-around text-center pt-2">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#006144]" />
                <div className="text-left">
                  <p className="text-xs font-bold text-[#10231C]">Laki-laki</p>
                  <p className="text-[11px] text-[#4B6259]">
                    {maleCount} ({malePercent}%)
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#F2994A]" />
                <div className="text-left">
                  <p className="text-xs font-bold text-[#10231C]">Perempuan</p>
                  <p className="text-[11px] text-[#4B6259]">
                    {femaleCount} ({femalePercent}%)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-xl bg-[#F6F8F7] p-3 text-[11px] text-[#4B6259] leading-relaxed">
          💡 Data ini diperbarui secara real-time berdasarkan data pendaftaran yang tersimpan di sistem.
        </div>
      </div>
    </div>
  );
};


"use client";

import React from "react";
import { FileText, SearchCheck, UserCheck2, Compass, Sparkles } from "lucide-react";

export const TimelineSection: React.FC = () => {
  const steps = [
    {
      step: "01",
      title: "Pendaftaran Online & Pilih Mentor",
      desc: "Pengisian biodata diri, data akademik, motivasi, pemilihan mentor bimbingan, dan berkas.",
      icon: FileText,
      badge: "Tahap 1",
      badgeColor: "bg-emerald-100 text-emerald-800",
    },
    {
      step: "02",
      title: "Masuk Grup WA & Bimbingan",
      desc: "Langsung bergabung ke Grup WhatsApp mentor untuk mentoring perkuliahan & bimbingan pra-LK-I.",
      icon: SearchCheck,
      badge: "Tahap 2",
      badgeColor: "bg-blue-100 text-blue-800",
    },
    {
      step: "03",
      title: "Screening & Wawancara",
      desc: "Uji wawasan dasar seputar BTQ, keislaman, kebangsaan, dan keorganisasian bersama tim instruktur.",
      icon: UserCheck2,
      badge: "Tahap 3",
      badgeColor: "bg-amber-100 text-amber-800",
    },
    {
      step: "04",
      title: "Forum LK-I (Basic Training)",
      desc: "Pelaksanaan forum pelatihan formal perkaderan selama 3-4 hari hingga pengukuhan kader HMI.",
      icon: Compass,
      badge: "Puncak Agenda",
      badgeColor: "bg-purple-100 text-purple-800",
    },
  ];

  return (
    <section className="mt-12 rounded-3xl border border-[#DCE8E2] bg-white p-5 sm:p-8 shadow-xs">
      <div className="text-center max-w-xl mx-auto">
        <span className="rounded-full bg-[#EAF2EE] px-3 py-1 text-xs font-black uppercase tracking-wider text-[#006144]">
          Roadmap Kaderisasi
        </span>
        <h3 className="mt-2 text-lg sm:text-2xl font-black text-[#10231C]">
          Alur & Tahapan Basic Training (LK-I)
        </h3>
        <p className="mt-1 text-xs text-[#4B6259]">
          Simak tahapan yang akan Anda lalui dari registrasi portal hingga pengukuhan menjadi kader resmi.
        </p>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={item.step}
              className="relative flex flex-col justify-between rounded-2xl border border-[#EAF2EE] bg-[#F9FBFA] p-4 transition-all hover:border-[#BCD7CA] hover:bg-white hover:shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#006144] text-white shadow-xs">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                </div>

                <div className="mt-3">
                  <span className="text-[11px] font-black text-[#006144]">Langkah {idx + 1}</span>
                  <h4 className="text-xs sm:text-sm font-black text-[#10231C] mt-0.5">{item.title}</h4>
                  <p className="mt-1 text-[11px] text-[#4B6259] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};


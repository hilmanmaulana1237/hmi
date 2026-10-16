"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Users,
  ShieldCheck,
  Layers,
  Network,
  Sparkles,
  BookOpen,
  Compass,
  ArrowRight,
  Briefcase,
  GraduationCap,
  ChevronDown,
  CheckCircle2,
  FileText,
  Lightbulb,
  HeartHandshake,
  Laptop,
  Search,
  TrendingUp,
  UsersRound,
  Building2,
  AtSign,
  Maximize2,
  ArrowLeftRight,
  Scale,
  Award,
} from "lucide-react";
import type { StructureMember, FunctionalDivision } from "@/lib/site-data";

interface HierarchyTreeProps {
  initialMembers: StructureMember[];
  divisions: FunctionalDivision[];
}

export function HierarchyTree({ initialMembers, divisions }: HierarchyTreeProps) {
  const [activeTab, setActiveTab] = useState<"tree" | "bidang" | "personalia">("tree");
  const [selectedBidangKey, setSelectedBidangKey] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const treeContainerRef = useRef<HTMLDivElement>(null);

  // Helper scroll for tree
  const scrollTo = (direction: "left" | "center" | "right") => {
    if (!treeContainerRef.current) return;
    const container = treeContainerRef.current;
    if (direction === "left") {
      container.scrollTo({ left: 0, behavior: "smooth" });
    } else if (direction === "center") {
      container.scrollTo({
        left: (container.scrollWidth - container.clientWidth) / 2,
        behavior: "smooth",
      });
    } else {
      container.scrollTo({
        left: container.scrollWidth - container.clientWidth,
        behavior: "smooth",
      });
    }
  };

  // Find dynamic key leaders from CMS/data
  const ketum =
    initialMembers.find(
      (m) =>
        m.roleType === "ketum" ||
        m.position.toLowerCase().includes("ketua umum") ||
        m.position.toLowerCase().includes("formateur")
    ) || initialMembers[0];

  const sekum =
    initialMembers.find(
      (m) =>
        m.roleType === "sekum" ||
        m.position.toLowerCase().includes("sekretaris umum")
    ) || initialMembers[1];

  const bendum =
    initialMembers.find(
      (m) =>
        (m.roleType === "bendum" && m.bidangKey === "bph") ||
        (m.position.toLowerCase().includes("bendahara umum") &&
          !m.position.toLowerCase().includes("kohati"))
    ) || initialMembers[2];

  // Group members dynamically by bidang
  const pppaMembers = initialMembers.filter(
    (m) =>
      m.bidangKey === "pppa" ||
      m.department.toLowerCase().includes("pppa") ||
      m.position.toLowerCase().includes("pppa") ||
      m.department.toLowerCase().includes("kaderisasi")
  );

  const ptkpMembers = initialMembers.filter(
    (m) =>
      m.bidangKey === "ptkp" ||
      m.department.toLowerCase().includes("ptkp") ||
      m.position.toLowerCase().includes("ptkp")
  );

  const kppMembers = initialMembers.filter(
    (m) =>
      m.bidangKey === "kpp" ||
      m.department.toLowerCase().includes("kpp") ||
      m.position.toLowerCase().includes("kpp") ||
      m.department.toLowerCase().includes("kewirausahaan")
  );

  const kohatiMembers = initialMembers.filter(
    (m) =>
      m.bidangKey === "kohati" ||
      m.department.toLowerCase().includes("kohati") ||
      m.position.toLowerCase().includes("kohati") ||
      m.department.toLowerCase().includes("perempuan")
  );

  // Helper to extract roles per bidang dynamically
  const getBidangLeaders = (membersList: StructureMember[]) => {
    const kabid =
      membersList.find(
        (m) =>
          m.roleType === "kabid" ||
          m.position.toLowerCase().includes("ketua bidang") ||
          m.position.toLowerCase().includes("kabid") ||
          m.position.toLowerCase().includes("ketua kohati")
      ) || membersList[0];

    const wasekum =
      membersList.find(
        (m) =>
          m.roleType === "wasekum" ||
          m.position.toLowerCase().includes("wasekum") ||
          m.position.toLowerCase().includes("wakil sekretaris") ||
          m.position.toLowerCase().includes("sekretaris kohati")
      ) || membersList[1];

    const third =
      membersList.find(
        (m) =>
          m.name !== kabid?.name &&
          m.name !== wasekum?.name
      ) || membersList[2];

    return { kabid, wasekum, third };
  };

  const pppaLeaders = getBidangLeaders(pppaMembers);
  const ptkpLeaders = getBidangLeaders(ptkpMembers);
  const kppLeaders = getBidangLeaders(kppMembers);
  const kohatiLeaders = getBidangLeaders(kohatiMembers);

  // Filtered members for personalia tab
  const filteredMembers = initialMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.department.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (selectedBidangKey === "all") return true;
    return member.bidangKey === selectedBidangKey;
  });

  return (
    <div className="space-y-12">
      {/* ─── NAVIGATION TAB SWITCHER ─── */}
      <div className="flex flex-col items-center justify-between gap-4 border-b border-[#E2E8F0] pb-6 sm:flex-row">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#006144]/20 bg-[#EAF5F1] px-3 py-1 text-xs font-black uppercase tracking-wider text-[#006144]">
            <Network className="h-3.5 w-3.5" /> Struktur Organisasi Formal
          </span>
          <h2 className="mt-2 text-2xl font-black text-[#003324] sm:text-3xl">
            Bagan Kepengurusan HMI Sains & Teknologi
          </h2>
          <p className="mt-1 text-sm text-[#4B6259]">
            Garis hierarki kepemimpinan, koordinasi fungsional, dan tupoksi 4 bidang utama.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center gap-1.5 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xs">
          <button
            onClick={() => setActiveTab("tree")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-black transition ${activeTab === "tree"
              ? "bg-[#006144] text-white shadow-sm"
              : "text-slate-600 hover:bg-slate-100 hover:text-[#003324]"
              }`}
          >
            <GitForkIcon className="h-4 w-4" />
            Bagan Pohon Hierarki
          </button>
          <button
            onClick={() => setActiveTab("bidang")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-black transition ${activeTab === "bidang"
              ? "bg-[#006144] text-white shadow-sm"
              : "text-slate-600 hover:bg-slate-100 hover:text-[#003324]"
              }`}
          >
            <Layers className="h-4 w-4" />
            4 Bidang Fungsional
          </button>
          <button
            onClick={() => setActiveTab("personalia")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-black transition ${activeTab === "personalia"
              ? "bg-[#006144] text-white shadow-sm"
              : "text-slate-600 hover:bg-slate-100 hover:text-[#003324]"
              }`}
          >
            <Users className="h-4 w-4" />
            Daftar Personalia ({initialMembers.length})
          </button>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          TAB 1: BAGAN POHON ORGANIGRAM VISUAL (TREE VIEW)
          ═══════════════════════════════════════════════════════════ */}
      {activeTab === "tree" && (
        <section className="space-y-6">
          {/* Tree Canvas Controls & Legend */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-3.5 shadow-xs">
            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-600">
              <span className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-[#006144]" />
                Garis Komando (Vertikal)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full border border-dashed border-[#F2994A] bg-[#FFFBEB]" />
                Garis Koordinasi / Kesekretariatan (Lateral)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-slate-300" />
                Forum Musyawarah Tertinggi
              </span>
            </div>

            {/* Scroll Navigation Helpers */}
            <div className="flex items-center gap-2">
              <span className="hidden text-xs font-semibold text-slate-400 lg:inline">
                Navigasi Bagan:
              </span>
              <button
                onClick={() => scrollTo("left")}
                className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 transition hover:bg-slate-100"
              >
                ← Kiri
              </button>
              <button
                onClick={() => scrollTo("center")}
                className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 transition hover:bg-slate-100"
              >
                Tengah
              </button>
              <button
                onClick={() => scrollTo("right")}
                className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 transition hover:bg-slate-100"
              >
                Kanan →
              </button>
            </div>
          </div>

          {/* MAIN TREE CANVAS WRAPPER */}
          <div
            ref={treeContainerRef}
            className="relative overflow-x-auto rounded-[2.5rem] border border-[#E2E8F0] bg-gradient-to-b from-white via-[#F9FBFB] to-[#F4F8F6] p-6 shadow-[0_20px_60px_rgba(0,51,36,0.06)] sm:p-10 lg:p-14"
          >
            {/* Background pattern */}
            <div className="hmi-pattern pointer-events-none absolute inset-0 opacity-15" />

            <div className="relative z-10 min-w-[1020px] lg:min-w-[1180px]">
              {/* ──────────────────────────────────────────────────
                  LEVEL 0: FORUM MANDAT TERTINGGI (RAK)
                  ────────────────────────────────────────────────── */}
              <div className="flex flex-col items-center">
                {/* Node Utama: RAK (Rapat Anggota Komisariat) */}
                <div className="w-96 rounded-3xl border-2 border-[#006144]/40 bg-gradient-to-br from-[#EAF5F1] via-white to-[#EAF5F1]/80 p-5 text-center shadow-md">
                  <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-[#006144] text-white shadow-xs">
                    <Scale className="h-5 w-5" />
                  </div>
                  <span className="mt-2 inline-flex items-center gap-1 rounded-full border border-[#006144]/30 bg-[#EAF5F1] px-3 py-0.5 text-[10px] font-black uppercase tracking-widest text-[#006144]">
                    Konstitusi Tertinggi
                  </span>
                  <h3 className="font-display mt-1 text-lg font-black text-[#003324]">
                    Struktur Kepengurusan HMI Komisariat Sains dan Teknologi
                  </h3>
                </div>

                {/* Vertical Stem from RAK to Ketum */}
                <div className="h-9 w-0.5 bg-[#006144]/60" />
                <div className="flex items-center justify-center">
                  <span className="rounded-full bg-[#EAF5F1] px-3 py-0.5 text-[10px] font-black uppercase tracking-wider text-[#006144] border border-[#006144]/20 shadow-2xs">
                    Mandat Formateur
                  </span>
                </div>
                <div className="h-4 w-0.5 bg-[#006144]/60" />
              </div>

              {/* ──────────────────────────────────────────────────
                  LEVEL 1: KETUA UMUM (FORMATEUR MANDATARIS)
                  ────────────────────────────────────────────────── */}
              <div className="flex flex-col items-center">
                <div className="w-full max-w-xl rounded-3xl border-2 border-[#006144] bg-white p-6 shadow-xl transition hover:shadow-2xl sm:p-7">
                  <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start text-center sm:text-left">
                    {/* Photo - ALWAYS DISPLAYS REAL PHOTO */}
                    <div className="relative shrink-0">
                      <div className="relative h-24 w-24 overflow-hidden rounded-2xl border-2 border-[#006144]/40 bg-[#EAF5F1] shadow-md sm:h-28 sm:w-28">
                        <Image
                          src={ketum?.photo || "/ketua-umum.jpg"}
                          alt={ketum?.name || "Aisyah Nurhaliza"}
                          fill
                          sizes="(max-width: 640px) 96px, 112px"
                          className="h-full w-full object-cover object-top"
                          priority
                        />
                      </div>
                      <span className="absolute -bottom-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#F2994A] text-white shadow-xs">
                        <Award className="h-4 w-4" />
                      </span>
                    </div>

                    {/* Information */}
                    <div className="flex-1">
                      <div className="mb-2 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                        <span className="rounded-full bg-[#006144] px-3 py-0.5 text-[10px] font-black uppercase tracking-widest text-white">
                          Pimpinan Tertinggi
                        </span>
                        <span className="rounded-full bg-[#FFFBEB] px-3 py-0.5 text-[10px] font-bold text-[#D97706] border border-[#FDE68A]">
                          Periode {ketum?.period || "2025-2026"}
                        </span>
                      </div>
                      <h4 className="font-display text-2xl font-black text-[#003324]">
                        {ketum?.name || "Aisyah Nurhaliza"}
                      </h4>
                      <p className="text-sm font-extrabold text-[#006144]">
                        {ketum?.position || "Ketua Umum / Formateur Mandataris RAK"}
                      </p>
                      <p className="mt-2 text-xs leading-relaxed text-[#4B6259]">
                        {ketum?.description ||
                          "Mandataris RAK. Memimpin arah gerak strategis, penanggung jawab umum kebijakan organisasi, serta memastikan sinergi seluruh bidang fungsional."}
                      </p>
                      {ketum?.instagram && (
                        <p className="mt-2 text-[11px] font-bold text-[#F2994A] flex items-center justify-center sm:justify-start gap-1">
                          <AtSign className="h-3 w-3" />
                          {ketum.instagram.replace("@", "")}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Vertical Stem below Ketum */}
                <div className="h-8 w-0.5 bg-[#006144]/60" />

                {/* Horizontal Bar for Sekum & Bendum */}
                <div className="relative w-[70%] max-w-2xl">
                  <div className="h-0.5 w-full rounded-full bg-[#006144]/60" />
                  <div className="absolute left-0 top-0 h-6 w-0.5 bg-[#006144]/60" />
                  <div className="absolute right-0 top-0 h-6 w-0.5 bg-[#006144]/60" />
                </div>
              </div>

              {/* ──────────────────────────────────────────────────
                  LEVEL 2: PIMPINAN HARIAN (SEKUM & BENDUM)
                  ────────────────────────────────────────────────── */}
              <div className="mt-6 grid grid-cols-2 gap-8 px-12">
                {/* 1. SEKRETARIS UMUM */}
                <div className="flex flex-col items-center">
                  <div className="w-full rounded-2xl border-2 border-slate-200 bg-white p-5 shadow-sm transition hover:border-[#006144]/40 hover:shadow-md">
                    <div className="flex items-start gap-4">
                      {sekum?.photo ? (
                        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
                          <Image
                            src={sekum.photo}
                            alt={sekum.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#EAF5F1] text-[#006144]">
                          <FileText className="h-6 w-6" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <span className="rounded-full bg-[#EAF5F1] px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-[#006144]">
                          Tata Kelola Administrasi
                        </span>
                        <h5 className="font-display mt-1 text-base font-black text-[#003324] truncate">
                          {sekum?.name || "Hana Maulida"}
                        </h5>
                        <p className="text-xs font-bold text-[#006144]">
                          {sekum?.position || "Sekretaris Umum"}
                        </p>
                        <p className="mt-1 text-[11px] text-slate-500 line-clamp-2">
                          {sekum?.description ||
                            "Pengendali sentral tata kelola administrasi, kearsipan persuratan, notulensi ketetapan, dan pemutakhiran basis data kader komisariat."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. BENDAHARA UMUM */}
                <div className="flex flex-col items-center">
                  <div className="w-full rounded-2xl border-2 border-slate-200 bg-white p-5 shadow-sm transition hover:border-[#006144]/40 hover:shadow-md">
                    <div className="flex items-start gap-4">
                      {bendum?.photo ? (
                        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
                          <Image
                            src={bendum.photo}
                            alt={bendum.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#FFFBEB] text-[#D97706]">
                          <Briefcase className="h-6 w-6" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <span className="rounded-full bg-[#FFFBEB] px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-[#D97706]">
                          Perbendaharaan & Kas
                        </span>
                        <h5 className="font-display mt-1 text-base font-black text-[#003324] truncate">
                          {bendum?.name || "Bayu Aditya"}
                        </h5>
                        <p className="text-xs font-bold text-[#D97706]">
                          {bendum?.position || "Bendahara Umum"}
                        </p>
                        <p className="mt-1 text-[11px] text-slate-500 line-clamp-2">
                          {bendum?.description ||
                            "Pengelola perbendaharaan, transparansi arus kas, distribusi anggaran program kerja, serta akuntabilitas iuran anggota komisariat."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ──────────────────────────────────────────────────
                  CONNECTOR TO 4 CORE FUNCTIONAL DIVISIONS
                  ────────────────────────────────────────────────── */}
              <div className="flex flex-col items-center">
                <div className="h-10 w-0.5 bg-[#006144]/60" />
                <div className="rounded-full bg-[#003324] px-4 py-1 text-center shadow-xs">
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-[#F2994A]">
                    4 BIDANG-BIDANG FUNGSIONAL KOMISARIAT
                  </span>
                </div>
                <div className="h-4 w-0.5 bg-[#006144]/60" />

                {/* Big Horizontal Bar for 4 Branches */}
                <div className="relative w-[96%]">
                  <div className="h-0.5 w-full rounded-full bg-[#006144]/60" />
                  <div className="absolute left-[12%] top-0 h-8 w-0.5 bg-[#006144]/60" />
                  <div className="absolute left-[37%] top-0 h-8 w-0.5 bg-[#006144]/60" />
                  <div className="absolute left-[63%] top-0 h-8 w-0.5 bg-[#006144]/60" />
                  <div className="absolute left-[88%] top-0 h-8 w-0.5 bg-[#006144]/60" />
                </div>
              </div>

              {/* ──────────────────────────────────────────────────
                  LEVEL 3: 4 BIDANG-BIDANG FUNGSIONAL (CARD GRID)
                  DYNAMICALLY DERIVED FROM CMS MEMBERS
                  ────────────────────────────────────────────────── */}
              <div className="mt-8 grid grid-cols-4 gap-4 items-start">
                {/* ─── 1. BIDANG PPPA ─── */}
                <div className="flex flex-col items-center">
                  <div className="w-full rounded-3xl border-2 border-[#006144] bg-white p-5 shadow-sm transition hover:shadow-lg">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="rounded-full bg-[#EAF5F1] px-3 py-1 text-xs font-black text-[#006144]">
                        PPPA (P3A)
                      </span>
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#006144] text-white">
                        <GraduationCap className="h-3.5 w-3.5" />
                      </span>
                    </div>
                    <h5 className="font-display text-sm font-black text-[#003324]">
                      Penelitian, Pengembangan & Pembinaan Anggota
                    </h5>
                    <div className="mt-3 space-y-1.5 border-t border-slate-100 pt-3">
                      <p className="text-[11px] font-bold text-[#006144]">
                        Ketua Bidang:{" "}
                        <span className="font-black text-slate-800">
                          {pppaLeaders.kabid?.name || "Maya Lestari"}
                        </span>
                      </p>
                      <p className="text-[10px] text-slate-600">
                        Wasekum:{" "}
                        <span className="font-semibold text-slate-800">
                          {pppaLeaders.wasekum?.name || "Rizky Ramadhan"}
                        </span>
                      </p>
                      <p className="text-[10px] text-slate-600">
                        Litbang:{" "}
                        <span className="font-semibold text-slate-800">
                          {pppaLeaders.third?.name || "Anisa Fitri"}
                        </span>
                      </p>
                    </div>

                    <div className="mt-3 rounded-xl bg-[#EAF5F1]/80 p-2 text-[10px] text-[#003324]">
                      <p className="font-black text-[#006144]">Fokus Utama:</p>
                      <p className="mt-0.5 leading-snug">
                        Rekrutmen LK-1, screening, pembinaan anggota, follow-up & BPL.
                      </p>
                    </div>
                  </div>

                  {/* Stem & Sub-nodes */}
                  <div className="h-5 w-0.5 bg-[#006144]/40" />
                  <div className="space-y-1.5 w-full">
                    <div className="rounded-xl border border-slate-200 bg-white p-2 text-center text-[10px] font-bold text-slate-700 shadow-2xs">
                      Dept. Rekrutmen & LK-1
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-white p-2 text-center text-[10px] font-bold text-slate-700 shadow-2xs">
                      Dept. Litbang & Follow-Up
                    </div>
                    <div className="rounded-xl border border-[#006144]/30 bg-[#EAF5F1] p-1.5 text-center text-[9px] font-black text-[#006144]">
                      Badan Pengelola Latihan (BPL)
                    </div>
                  </div>
                </div>

                {/* ─── 2. BIDANG PTKP ─── */}
                <div className="flex flex-col items-center">
                  <div className="w-full rounded-3xl border-2 border-[#0E7490] bg-white p-5 shadow-sm transition hover:shadow-lg">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="rounded-full bg-[#ECFEFF] px-3 py-1 text-xs font-black text-[#0E7490]">
                        PTKP
                      </span>
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0E7490] text-white">
                        <Building2 className="h-3.5 w-3.5" />
                      </span>
                    </div>
                    <h5 className="font-display text-sm font-black text-[#003324]">
                      Perguruan Tinggi, Kemahasiswaan & Kepemudaan
                    </h5>
                    <div className="mt-3 space-y-1.5 border-t border-slate-100 pt-3">
                      <p className="text-[11px] font-bold text-[#0E7490]">
                        Ketua Bidang:{" "}
                        <span className="font-black text-slate-800">
                          {ptkpLeaders.kabid?.name || "Muhammad Farhan"}
                        </span>
                      </p>
                      <p className="text-[10px] text-slate-600">
                        Wasekum:{" "}
                        <span className="font-semibold text-slate-800">
                          {ptkpLeaders.wasekum?.name || "Dimas Pratama"}
                        </span>
                      </p>
                      <p className="text-[10px] text-slate-600">
                        Advokasi:{" "}
                        <span className="font-semibold text-slate-800">
                          {ptkpLeaders.third?.name || "Ilham Saputra"}
                        </span>
                      </p>
                    </div>

                    <div className="mt-3 rounded-xl bg-[#ECFEFF]/80 p-2 text-[10px] text-[#003324]">
                      <p className="font-black text-[#0E7490]">Fokus Utama:</p>
                      <p className="mt-0.5 leading-snug">
                        Advokasi kampus, kajian sains strategis, relasi SEMA/DEMA/HMJ.
                      </p>
                    </div>
                  </div>

                  {/* Stem & Sub-nodes */}
                  <div className="h-5 w-0.5 bg-[#0E7490]/40" />
                  <div className="space-y-1.5 w-full">
                    <div className="rounded-xl border border-slate-200 bg-white p-2 text-center text-[10px] font-bold text-slate-700 shadow-2xs">
                      Dept. Kemahasiswaan & Advokasi
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-white p-2 text-center text-[10px] font-bold text-slate-700 shadow-2xs">
                      Dept. Kepemudaan & Ansos
                    </div>
                    <div className="rounded-xl border border-[#0E7490]/30 bg-[#ECFEFF] p-1.5 text-center text-[9px] font-black text-[#0E7490]">
                      Posko Pengaduan Aspirasi Mahasiswa
                    </div>
                  </div>
                </div>

                {/* ─── 3. BIDANG KPP ─── */}
                <div className="flex flex-col items-center">
                  <div className="w-full rounded-3xl border-2 border-[#D97706] bg-white p-5 shadow-sm transition hover:shadow-lg">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="rounded-full bg-[#FFFBEB] px-3 py-1 text-xs font-black text-[#D97706]">
                        KPP
                      </span>
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#D97706] text-white">
                        <TrendingUp className="h-3.5 w-3.5" />
                      </span>
                    </div>
                    <h5 className="font-display text-sm font-black text-[#003324]">
                      Kewirausahaan & Pengembangan Profesi
                    </h5>
                    <div className="mt-3 space-y-1.5 border-t border-slate-100 pt-3">
                      <p className="text-[11px] font-bold text-[#D97706]">
                        Ketua Bidang:{" "}
                        <span className="font-black text-slate-800">
                          {kppLeaders.kabid?.name || "Fajar Nugraha"}
                        </span>
                      </p>
                      <p className="text-[10px] text-slate-600">
                        Wasekum:{" "}
                        <span className="font-semibold text-slate-800">
                          {kppLeaders.wasekum?.name || "Yoga Firmansyah"}
                        </span>
                      </p>
                      <p className="text-[10px] text-slate-600">
                        Inovasi:{" "}
                        <span className="font-semibold text-slate-800">
                          {kppLeaders.third?.name || "Luthfi Hakim"}
                        </span>
                      </p>
                    </div>

                    <div className="mt-3 rounded-xl bg-[#FFFBEB]/80 p-2 text-[10px] text-[#003324]">
                      <p className="font-black text-[#D97706]">Fokus Utama:</p>
                      <p className="mt-0.5 leading-snug">
                        Inkubasi startup, hidroponik agrotek, tech-bootcamp & unit usaha.
                      </p>
                    </div>
                  </div>

                  {/* Stem & Sub-nodes */}
                  <div className="h-5 w-0.5 bg-[#D97706]/40" />
                  <div className="space-y-1.5 w-full">
                    <div className="rounded-xl border border-slate-200 bg-white p-2 text-center text-[10px] font-bold text-slate-700 shadow-2xs">
                      Dept. Inkubasi Bisnis & Ekraf
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-white p-2 text-center text-[10px] font-bold text-slate-700 shadow-2xs">
                      Dept. Profesi Sains & Teknologi
                    </div>
                    <div className="rounded-xl border border-[#D97706]/30 bg-[#FFFBEB] p-1.5 text-center text-[9px] font-black text-[#D97706]">
                      Unit Bisnis & Merchandise Mandiri
                    </div>
                  </div>
                </div>

                {/* ─── 4. BIDANG PP / KOHATI ─── */}
                <div className="flex flex-col items-center">
                  <div className="w-full rounded-3xl border-2 border-[#E11D48] bg-white p-5 shadow-sm transition hover:shadow-lg">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="rounded-full bg-[#FFF1F2] px-3 py-1 text-xs font-black text-[#E11D48]">
                        PP / KOHATI
                      </span>
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#E11D48] text-white">
                        <UsersRound className="h-3.5 w-3.5" />
                      </span>
                    </div>
                    <h5 className="font-display text-sm font-black text-[#003324]">
                      Pemberdayaan Perempuan (Korps HMI-Wati)
                    </h5>
                    <div className="mt-3 space-y-1.5 border-t border-slate-100 pt-3">
                      <p className="text-[11px] font-bold text-[#E11D48]">
                        Ketua Bidang:{" "}
                        <span className="font-black text-slate-800">
                          {kohatiLeaders.kabid?.name || "Salsabila Putri"}
                        </span>
                      </p>
                      <p className="text-[10px] text-slate-600">
                        Wasekum:{" "}
                        <span className="font-semibold text-slate-800">
                          {kohatiLeaders.wasekum?.name || "Citra Amalia"}
                        </span>
                      </p>
                      <p className="text-[10px] text-slate-600">
                        Bendahara:{" "}
                        <span className="font-semibold text-slate-800">
                          {kohatiLeaders.third?.name || "Dea Kartika"}
                        </span>
                      </p>
                    </div>

                    <div className="mt-3 rounded-xl bg-[#FFF1F2]/80 p-2 text-[10px] text-[#003324]">
                      <p className="font-black text-[#E11D48]">Fokus Utama:</p>
                      <p className="mt-0.5 leading-snug">
                        Intelektualitas muslimah, Women in STEM, Latihan Khusus & ruang aman.
                      </p>
                    </div>
                  </div>

                  {/* Stem & Sub-nodes */}
                  <div className="h-5 w-0.5 bg-[#E11D48]/40" />
                  <div className="space-y-1.5 w-full">
                    <div className="rounded-xl border border-slate-200 bg-white p-2 text-center text-[10px] font-bold text-slate-700 shadow-2xs">
                      Dept. Kajian Intelektual Perempuan
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-white p-2 text-center text-[10px] font-bold text-slate-700 shadow-2xs">
                      Dept. Advokasi & Sosial HMI-Wati
                    </div>
                    <div className="rounded-xl border border-[#E11D48]/30 bg-[#FFF1F2] p-1.5 text-center text-[9px] font-black text-[#E11D48]">
                      Lembaga Otonom KOHATI Komisariat
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════
          TAB 2: RINCIAN 4 BIDANG FUNGSIONAL & TUPOKSI
          ═══════════════════════════════════════════════════════════ */}
      {activeTab === "bidang" && (
        <section className="space-y-10">
          <div className="rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-sm sm:p-8">
            <h3 className="font-display text-xl font-black text-[#003324] sm:text-2xl">
              Pedoman Fungsional Kepengurusan HMI
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#4B6259]">
              Berdasarkan Pedoman Kepengurusan Himpunan Mahasiswa Islam (HMI), struktur kepengurusan komisariat ditopang oleh 4 bidang fungsional utama yang saling bersinergi dalam mewujudkan tujuan HMI: terbinanya insan akademis, pencipta, pengabdi yang bernafaskan Islam, dan bertanggung jawab atas terwujudnya masyarakat adil makmur yang diridhai Allah SWT.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {divisions.map((div) => {
              // Dynamically lookup current leader names from initialMembers
              let currentKabid = div.kabid;
              let currentWasekum = div.wasekum;

              if (div.key === "pppa") {
                currentKabid = pppaLeaders.kabid?.name || div.kabid;
                currentWasekum = pppaLeaders.wasekum?.name || div.wasekum;
              } else if (div.key === "ptkp") {
                currentKabid = ptkpLeaders.kabid?.name || div.kabid;
                currentWasekum = ptkpLeaders.wasekum?.name || div.wasekum;
              } else if (div.key === "kpp") {
                currentKabid = kppLeaders.kabid?.name || div.kabid;
                currentWasekum = kppLeaders.wasekum?.name || div.wasekum;
              } else if (div.key === "kohati") {
                currentKabid = kohatiLeaders.kabid?.name || div.kabid;
                currentWasekum = kohatiLeaders.wasekum?.name || div.wasekum;
              }

              return (
                <div
                  key={div.key}
                  id={div.key}
                  className="group flex flex-col justify-between rounded-3xl border-2 bg-white p-7 shadow-sm transition hover:shadow-xl"
                  style={{ borderColor: div.borderColor }}
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span
                          className="rounded-full px-3.5 py-1 text-xs font-black uppercase tracking-wider"
                          style={{ backgroundColor: div.badgeBg, color: div.badgeText }}
                        >
                          {div.code}
                        </span>
                        <h4 className="font-display mt-3 text-xl font-black text-[#003324] leading-snug">
                          {div.name}
                        </h4>
                        <p className="mt-1 text-xs font-bold" style={{ color: div.accentColor }}>
                          {div.dasarPedoman}
                        </p>
                      </div>
                    </div>

                    {/* Summary */}
                    <p className="mt-4 text-xs leading-relaxed text-slate-600">
                      {div.fullDesc}
                    </p>

                    {/* Personalia Pengurus */}
                    <div className="mt-5 rounded-2xl border border-slate-100 bg-[#F9FBFB] p-4">
                      <p className="text-[11px] font-black uppercase tracking-wider text-slate-500">
                        Pimpinan & Koordinasi Bidang:
                      </p>
                      <div className="mt-2 grid grid-cols-2 gap-3 text-xs">
                        <div>
                          <span className="text-[10px] text-slate-400">Ketua Bidang:</span>
                          <p className="font-black text-[#003324]">{currentKabid}</p>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400">Wasekum Bidang:</span>
                          <p className="font-black text-[#003324]">{currentWasekum}</p>
                        </div>
                      </div>
                    </div>

                    {/* Tupoksi */}
                    <div className="mt-5 space-y-2">
                      <p className="text-xs font-black uppercase tracking-wider text-[#003324]">
                        Tugas Pokok & Fungsi (Tupoksi):
                      </p>
                      <div className="space-y-1.5 text-xs text-slate-600">
                        {div.tupoksi.map((task, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <CheckCircle2
                              className="h-4 w-4 shrink-0 mt-0.5"
                              style={{ color: div.accentColor }}
                            />
                            <span>{task}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Program Unggulan */}
                    <div className="mt-5 space-y-2">
                      <p className="text-xs font-black uppercase tracking-wider text-[#003324]">
                        Program Kerja Unggulan:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {div.programUnggulan.map((prog, i) => (
                          <span
                            key={i}
                            className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-700"
                          >
                            {prog}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Departemen List */}
                  <div className="mt-6 border-t border-slate-100 pt-4">
                    <p className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                      Departemen di Bawah Bidang {div.code}:
                    </p>
                    <div className="mt-2 space-y-1.5">
                      {div.departemen.map((dept, i) => (
                        <div
                          key={i}
                          className="rounded-xl border border-slate-100 bg-[#F8FAF9] p-2 text-xs"
                        >
                          <p className="font-black text-[#003324]">{dept.name}</p>
                          <p className="text-[11px] text-slate-500">{dept.focus}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════
          TAB 3: DAFTAR LENGKAP PERSONALIA (CARD DIRECTORY)
          ═══════════════════════════════════════════════════════════ */}
      {activeTab === "personalia" && (
        <section className="space-y-8">
          {/* Filters & Search */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Category Filter Chips */}
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { key: "all", label: "Semua Pengurus" },
                { key: "bph", label: "Presidium BPH" },
                { key: "pppa", label: "Bidang PPPA" },
                { key: "ptkp", label: "Bidang PTKP" },
                { key: "kpp", label: "Bidang KPP" },
                { key: "kohati", label: "PP / KOHATI" },
              ].map((chip) => (
                <button
                  key={chip.key}
                  onClick={() => setSelectedBidangKey(chip.key)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-black transition ${selectedBidangKey === chip.key
                    ? "bg-[#006144] text-white shadow-xs"
                    : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                    }`}
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {/* Search input */}
            <div className="relative w-full sm:w-72">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Cari nama atau jabatan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-slate-200 bg-white py-2 pl-10 pr-4 text-xs font-semibold text-slate-800 focus:border-[#006144] focus:outline-hidden focus:ring-2 focus:ring-[#006144]/20"
              />
            </div>
          </div>

          {/* Members Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredMembers.map((member, index) => {
              const isKetum =
                member.roleType === "ketum" ||
                member.position.toLowerCase().includes("ketua umum");

              const memberPhoto = member.photo || (isKetum ? "/ketua-umum.jpg" : undefined);

              return (
                <article
                  key={member.name + index}
                  className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-xs transition hover:border-[#006144]/40 hover:shadow-lg"
                >
                  {/* Photo / Fallback */}
                  {memberPhoto ? (
                    <div className="relative mb-4 aspect-square w-full overflow-hidden rounded-2xl bg-slate-100">
                      <Image
                        src={memberPhoto}
                        alt={member.name}
                        fill
                        className="object-cover object-top"
                      />
                    </div>
                  ) : (
                    <div className="mb-4 flex aspect-square w-full flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-[#EAF5F1] to-[#D5EFE6] text-[#006144]">
                      <span className="font-display text-3xl font-black">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join("")}
                      </span>
                      <span className="mt-1 text-[10px] font-black uppercase tracking-wider text-[#006144]/70">
                        {member.position}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.16em] text-[#F2994A]">
                      {member.department}
                    </span>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-bold text-slate-500">
                      No. {member.order || index + 1}
                    </span>
                  </div>

                  <h4 className="font-display mt-2 text-lg font-black text-[#003324]">
                    {member.name}
                  </h4>
                  <p className="text-xs font-bold text-[#006144]">
                    {member.position}
                  </p>

                  {member.period && (
                    <p className="mt-0.5 text-[11px] font-semibold text-slate-400">
                      Periode {member.period}
                    </p>
                  )}

                  {member.description && (
                    <p className="mt-3 text-xs leading-relaxed text-slate-600 line-clamp-3">
                      {member.description}
                    </p>
                  )}

                  <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                    {member.instagram ? (
                      <a
                        href={`https://instagram.com/${member.instagram.replace("@", "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F2994A] transition hover:text-[#006144]"
                      >
                        <AtSign className="h-3.5 w-3.5" />
                        {member.instagram}
                      </a>
                    ) : (
                      <span className="text-[10px] text-slate-400">HMI Saintek</span>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════
          SECTION 4: PEDOMAN GARIS KOMANDO & HUBUNGAN LEMBAGA
          ═══════════════════════════════════════════════════════════ */}
      <section className="rounded-3xl border border-[#E2E8F0] bg-gradient-to-br from-white via-[#F9FBFB] to-[#EAF5F1]/40 p-6 sm:p-10 shadow-sm">
        <div className="grid gap-8 lg:grid-cols-3">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EAF5F1] px-3 py-1 text-xs font-black uppercase tracking-wider text-[#006144]">
              <Compass className="h-3.5 w-3.5" /> Landasan Konstitusi
            </span>
            <h3 className="font-display mt-3 text-2xl font-black text-[#003324]">
              Mekanisme Tata Kerja & Hubungan Lembaga
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-[#4B6259]">
              Setiap komponen dalam bagan hierarki HMI Komisariat Sains dan Teknologi menjalankan fungsi yang terintegrasi sesuai Anggaran Dasar (AD) dan Anggaran Rumah Tangga (ART) HMI.
            </p>
          </div>

          <div className="space-y-4 lg:col-span-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#EAF5F1] text-[#006144]">
                  <Scale className="h-4 w-4" />
                </div>
                <div>
                  <h5 className="text-xs font-black text-[#003324] uppercase tracking-wider">
                    1. Garis Instruksi / Komando (Tegak Lurus)
                  </h5>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600">
                    Ketua Umum memegang wewenang komando tertinggi atas seluruh kebijakan operasional komisariat. Instruksi diturunkan melalui Sekretaris Umum, Bendahara Umum, dan Ketua-Ketua Bidang Fungsional untuk dilaksanakan oleh departemen terkait.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#FFFBEB] text-[#D97706]">
                  <ArrowLeftRight className="h-4 w-4" />
                </div>
                <div>
                  <h5 className="text-xs font-black text-[#003324] uppercase tracking-wider">
                    2. Garis Koordinasi Fungsional (Horizontal)
                  </h5>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600">
                    Hubungan horizontal antar-bidang (PPPA, PTKP, KPP, dan PP/KOHATI) berlangsung melalui mekanisme Rapat Pengurus Harian (RPH) dan Rapat Presidium, memastikan program perkaderan, pergerakan, dan kemandirian berjalan selaras tanpa tumpang tindih.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#ECFEFF] text-[#0E7490]">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div>
                  <h5 className="text-xs font-black text-[#003324] uppercase tracking-wider">
                    3. Garis Pertanggungjawaban RAK
                  </h5>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600">
                    Pengurus Komisariat bertanggung jawab penuh kepada forum Rapat Anggota Komisariat (RAK) di akhir periode melalui Laporan Pertanggungjawaban (LPJ).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Custom GitForkIcon
function GitForkIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="18" r="3" />
      <circle cx="6" cy="6" r="3" />
      <circle cx="18" cy="6" r="3" />
      <path d="M18 9v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9" />
      <path d="M12 12v3" />
    </svg>
  );
}

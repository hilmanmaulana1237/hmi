"use client";

import { motion } from "framer-motion";
import { Sparkles, Quote, Camera, Users, ShieldCheck, ChevronDown, Compass } from "lucide-react";

export function KahmiHero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-emerald-50/40 to-white pb-20 pt-36 text-neutral-900 sm:pb-28 sm:pt-44">
      {/* Background Soft Glows (Light & Clean, Not Dark) */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-emerald-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-amber-200/30 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-10 h-64 w-64 -translate-x-1/2 rounded-full bg-emerald-100/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          {/* Top Pill Badges */}
          <motion.div variants={itemVariants} className="inline-flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-4 py-1.5 text-xs font-bold tracking-wider text-amber-900 uppercase sm:text-sm shadow-sm">
              <Sparkles className="h-4 w-4 text-amber-600 animate-pulse" />
              Keluarga Alumni HMI (KAHMI)
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 text-xs font-semibold text-[#006144] shadow-sm">
              <Compass className="h-3.5 w-3.5 text-[#006144]" />
              Komisariat Sains & Teknologi UIN Bandung
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="mx-auto mt-6 max-w-4xl text-3xl font-black tracking-tight text-neutral-950 sm:text-5xl lg:text-6xl"
          >
            Mutiara Gagasan & Khidmat Pengabdian{" "}
            <span className="bg-gradient-to-r from-[#006144] via-emerald-600 to-[#008f62] bg-clip-text text-transparent">
              Alumni KAHMI Saintek
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-neutral-600 sm:text-lg sm:leading-8"
          >
            Merawat tali silaturahmi lintas generasi alumni HMI Komisariat Sains dan Teknologi UIN SGD Bandung.
            Menghimpun inspirasi, keteladanan kepemimpinan, dan karya nyata di dunia profesional—mulai dari
            birokrasi dan praktisi teknologi, instruktur perkaderan, hingga akademisi.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#kata-alumni"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#006144] to-[#008f62] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-900/15 transition-all hover:scale-105 hover:brightness-110 active:scale-95"
            >
              <Quote className="h-4 w-4" />
              Telusuri Kata Inspirasi
            </a>
            <a
              href="#galeri-kahmi"
              className="inline-flex items-center gap-2 rounded-2xl border border-neutral-300 bg-white px-6 py-3.5 text-sm font-bold text-neutral-800 shadow-sm transition-all hover:bg-neutral-50 hover:border-emerald-500 hover:scale-105 active:scale-95"
            >
              <Camera className="h-4 w-4 text-[#006144]" />
              Dokumentasi Silaturahmi
            </a>
          </motion.div>

          {/* Value Highlight Cards (White & Bright) */}
          <motion.div
            variants={itemVariants}
            className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6 text-left"
          >
            <div className="relative overflow-hidden rounded-2xl border border-neutral-200/90 bg-white p-5 shadow-sm transition hover:border-[#006144]/40 hover:shadow-md">
              <div className="flex items-center gap-3.5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600 border border-amber-200/60">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-neutral-900">Sinergi Lintas Angkatan</h4>
                  <p className="text-xs text-neutral-500">Menghubungkan alumni dari masa ke masa</p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-neutral-200/90 bg-white p-5 shadow-sm transition hover:border-[#006144]/40 hover:shadow-md">
              <div className="flex items-center gap-3.5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-[#006144] border border-emerald-200/60">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-neutral-900">Intelektual & Teknologi</h4>
                  <p className="text-xs text-neutral-500">Kiprah ASN, praktisi TI, & instruktur BPL</p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-neutral-200/90 bg-white p-5 shadow-sm transition hover:border-[#006144]/40 hover:shadow-md">
              <div className="flex items-center gap-3.5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-700 border border-teal-200/60">
                  <Sparkles className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-neutral-900">Asas Manfaat & Insan Cita</h4>
                  <p className="text-xs text-neutral-500">Iman, ilmu, dan amal untuk umat & bangsa</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Subtle Bottom Indicator */}
      <div className="mt-12 flex justify-center text-neutral-400 animate-bounce">
        <ChevronDown className="h-6 w-6" />
      </div>
    </section>
  );
}

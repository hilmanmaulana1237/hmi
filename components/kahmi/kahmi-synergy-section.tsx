"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Code2,
  GraduationCap,
  Briefcase,
  HeartHandshake,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

const pillars = [
  {
    icon: Code2,
    title: "Sains, Teknologi & Digitalisasi",
    description:
      "Mendorong kader dan alumni menguasai frontier teknologi mutakhir, artificial intelligence, rekayasa perangkat lunak, dan riset sains untuk kemaslahatan umat.",
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: Briefcase,
    title: "Birokrasi & Integritas Publik",
    description:
      "Mewujudkan tata kelola berorientasi asas manfaat di ranah pemerintahan (ASN) dan institusi publik dengan berpegang teguh pada Al-Qur'an dan Hadits.",
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: GraduationCap,
    title: "Regenerasi & Mentorship Perkaderan",
    description:
      "Alumni KAHMI Saintek aktif membimbing adik-adik kader komisariat sejak Latihan Kader I (LK-1), pendampingan skripsi/akademik, hingga jejaring karir profesional.",
    color: "from-teal-600 to-emerald-700",
  },
];

export function KahmiSynergySection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#fbfcfc] via-white to-white py-20 text-neutral-900 sm:py-28 border-t border-neutral-200/60">
      {/* Background Soft Glows (Light & Clean) */}
      <div className="pointer-events-none absolute right-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-emerald-100/40 blur-3xl" />
      <div className="pointer-events-none absolute left-0 bottom-10 h-80 w-80 rounded-full bg-amber-100/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#006144] border border-emerald-200 shadow-sm">
            <HeartHandshake className="h-4 w-4" />
            Trilogi Sinergi Alumni Saintek
          </span>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
            Peran Strategis KAHMI Saintek
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-neutral-600 sm:text-lg">
            Menghimpun potensi alumni sains dan teknologi dalam kesatuan nilai Insan Cita
            untuk memperkuat dakwah, perkaderan, dan pengabdian masyarakat.
          </p>
        </div>

        {/* Pillars Grid (Bright White Cards) */}
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="group relative flex flex-col justify-between rounded-3xl border border-neutral-200/90 bg-white p-7 shadow-[0_4px_25px_rgba(0,0,0,0.05)] transition-all hover:-translate-y-1 hover:border-[#006144]/40 hover:shadow-xl"
              >
                <div>
                  <div
                    className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${pillar.color} text-white shadow-md`}
                  >
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold tracking-tight text-neutral-900">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-[#006144]">
                  <CheckCircle2 className="h-4 w-4" />
                  Komitmen Khidmat KAHMI
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Vibrant Emerald Banner CTA (Fresh, Not Black) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 rounded-3xl border border-emerald-600/30 bg-gradient-to-r from-[#006144] via-[#00704f] to-[#008f62] p-8 text-white shadow-2xl sm:p-10"
        >
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-300">
                <ShieldCheck className="h-4 w-4" />
                Dukungan Perkaderan Mahasiswa Baru
              </span>
              <h3 className="mt-2 text-2xl font-black text-white sm:text-3xl">
                Ingin Mengikuti Jejak Para Alumni KAHMI Saintek?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-emerald-100/90 sm:text-base">
                Pintu perkaderan Basic Training (LK-1) HMI Komisariat Sains dan Teknologi UIN Bandung terbuka luas bagi mahasiswa Fakultas Sains dan Teknologi. Dapatkan mentor inspiratif dan bimbingan kepemimpinan dari senior dan alumni!
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/kaderisasi/daftar-lk-1"
                className="inline-flex items-center gap-2 rounded-2xl bg-[#F2994A] px-6 py-3.5 text-sm font-bold text-neutral-950 shadow-lg shadow-amber-950/20 transition-all hover:scale-105 hover:bg-amber-400 active:scale-95"
              >
                Daftar LK-1 Sekarang
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/profil"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/30 bg-white/10 px-5 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20"
              >
                Tentang Komisariat
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

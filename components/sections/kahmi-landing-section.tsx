"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  GraduationCap,
  ArrowRight,
  Sparkles,
  Users,
  Compass,
  MapPin,
  Quote,
} from "lucide-react";
import { kahmiQuotes } from "@/lib/kahmi-data";

export function KahmiLandingSection() {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24 border-t border-neutral-200/70">
      {/* Soft background decorative glow */}
      <div className="pointer-events-none absolute -left-20 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-emerald-100/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-1/4 h-80 w-80 rounded-full bg-amber-100/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Title */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-900 border border-amber-200 shadow-sm">
              <GraduationCap className="h-4 w-4 text-amber-600" />
              Keluarga Alumni HMI (KAHMI)
            </div>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
              Sinergi & Pengabdian{" "}
              <span className="text-[#006144]">KAHMI Saintek</span>
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-600 sm:text-lg">
              Wadah silaturahmi, ruang temu gagasan, dan teladan kepemimpinan para alumni
              HMI Komisariat Sains dan Teknologi UIN Sunan Gunung Djati Bandung.
            </p>
          </div>

          <Link
            href="/kahmi"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-[#006144] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-950/15 transition-all hover:bg-[#004f37] hover:scale-105"
          >
            Buka Portal KAHMI
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Main Content Layout */}
        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          {/* Left: Featured Gathering Photo */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="group relative overflow-hidden rounded-3xl border border-neutral-200/90 bg-neutral-100 shadow-[0_10px_35px_rgba(0,0,0,0.08)] transition-all hover:shadow-[0_20px_45px_rgba(0,97,68,0.12)] hover:border-emerald-500/40">
              {/* Photo */}
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src="/images/kahmi/kahmi-landing-gathering.jpg"
                  alt="Silaturahmi Akbar KAHMI Saintek"
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-70 group-hover:opacity-50 transition-opacity" />

                {/* Location Badge */}
                <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3.5 py-1 text-xs font-semibold text-neutral-800 shadow-sm backdrop-blur-md">
                  <MapPin className="h-3.5 w-3.5 text-amber-600" />
                  Bandung, Jawa Barat
                </div>

                {/* Bottom Photo Overlay Info */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-[#006144]/90 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider backdrop-blur-sm">
                    <Sparkles className="h-3 w-3 text-amber-300" />
                    Silaturahmi Akbar Lintas Generasi
                  </span>
                  <h3 className="mt-2 text-lg font-bold sm:text-xl text-white drop-shadow-md">
                    Temu Kangen & Dialog Gagasan Alumni HMI Saintek
                  </h3>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Synergy Highlights & Alumni Voices */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col justify-between gap-6 lg:col-span-5"
          >
            {/* Feature 1 */}
            <div className="rounded-2xl border border-neutral-200/90 bg-[#fbfcfc] p-5 shadow-sm transition hover:border-emerald-300 hover:bg-white">
              <div className="flex items-start gap-3.5">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-[#006144]">
                  <Compass className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-neutral-900">
                    Mentorship & Perkaderan Berkelanjutan
                  </h4>
                  <p className="mt-1 text-xs leading-relaxed text-neutral-600 sm:text-sm">
                    Alumni hadir mendampingi adik-adik mahasiswa baru sejak Basic Training
                    (LK-1) hingga transfer pengalaman di bidang akademik & karir.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="rounded-2xl border border-neutral-200/90 bg-[#fbfcfc] p-5 shadow-sm transition hover:border-emerald-300 hover:bg-white">
              <div className="flex items-start gap-3.5">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-neutral-900">
                    Jejaring Lintas Profesi & Disiplin
                  </h4>
                  <p className="mt-1 text-xs leading-relaxed text-neutral-600 sm:text-sm">
                    Kiprah nyata alumni di sektor birokrasi pemerintahan (ASN), industri
                    teknologi & IT, instruktur BPL, riset sains, dan wirausaha.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 3: Alumni Voices Preview Box */}
            <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/50 p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#006144]">
                  <Quote className="h-3.5 w-3.5" />
                  Mutiara Gagasan Alumni
                </span>
                <Link
                  href="/kahmi#kata-alumni"
                  className="text-xs font-semibold text-[#006144] hover:underline"
                >
                  Lihat Semua
                </Link>
              </div>

              {/* Alumni Avatar Thumbnails */}
              <div className="mt-4 flex items-center justify-between">
                <div className="flex -space-x-2 overflow-hidden">
                  {kahmiQuotes.map((q) => (
                    <div
                      key={q.id}
                      className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-white shadow-sm bg-neutral-200"
                      title={q.name}
                    >
                      {q.photoUrl ? (
                        <Image
                          src={q.photoUrl}
                          alt={q.name}
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-[#006144] text-xs font-bold text-white">
                          {q.name[0]}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <span className="text-xs font-medium text-neutral-500">
                  Refleksi para Ketua Umum & Pengurus
                </span>
              </div>

              <p className="mt-3 text-xs italic text-neutral-700 leading-relaxed border-t border-emerald-200/50 pt-3">
                &ldquo;Masa depan Islam, HMI dan Indonesia tidak hanya membutuhkan pemimpin hebat di radar kekuasaan, melainkan insan yang memberi manfaat secara sistemik dan berkelanjutan.&rdquo;
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


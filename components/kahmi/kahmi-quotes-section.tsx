"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Quote,
  Sparkles,
  BookOpen,
  Copy,
  Check,
  ArrowRight,
  Filter,
} from "lucide-react";
import { kahmiQuotes, type KahmiQuote } from "@/lib/kahmi-data";
import { KahmiReflectionModal } from "./kahmi-reflection-modal";

const categories = [
  { id: "all", label: "Semua Inspirasi" },
  { id: "Ketua Komisariat", label: "Mantan Ketua Umum" },
  { id: "Teknologi & ASN", label: "Teknologi & Birokrasi ASN" },
  { id: "BPL", label: "Instruktur BPL" },
];

export function KahmiQuotesSection() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeModalQuote, setActiveModalQuote] = useState<KahmiQuote | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredQuotes =
    selectedCategory === "all"
      ? kahmiQuotes
      : kahmiQuotes.filter((item) => item.category === selectedCategory);

  const handleCopy = (item: KahmiQuote) => {
    navigator.clipboard.writeText(
      `"${item.quote}"\n\n— ${item.name} (${item.role})\nKAHMI Saintek UIN SGD Bandung`
    );
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="kata-alumni" className="relative py-20 sm:py-28 bg-[#fbfcfc] border-t border-neutral-200/60">
      {/* Background Soft Gradients (Bright & Clean) */}
      <div className="pointer-events-none absolute left-0 top-1/4 h-80 w-80 rounded-full bg-emerald-100/40 blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-1/4 h-80 w-80 rounded-full bg-amber-100/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-bold text-[#006144]">
            <Quote className="h-3.5 w-3.5" />
            Untaian Nasihat & Pesan Perjuangan
          </div>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
            Kata Inspirasi & Refleksi{" "}
            <span className="text-[#006144]">
              Kader & Alumni
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-neutral-600 sm:text-lg">
            Gagasan orisinal, prinsip hidup, dan sari pati pengalaman para alumni KAHMI Saintek
            yang telah berkhidmat di berbagai medan perjuangan dan karya profesional.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
          <span className="hidden items-center gap-1.5 text-xs font-medium text-neutral-500 md:inline-flex mr-2">
            <Filter className="h-3.5 w-3.5" />
            Kategori:
          </span>
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`relative rounded-xl px-4 py-2 text-xs font-bold transition-all sm:text-sm ${
                  isActive
                    ? "bg-[#006144] text-white shadow-md shadow-emerald-900/20"
                    : "bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200/90 shadow-sm"
                }`}
              >
                {cat.label}
                {isActive && (
                  <motion.div
                    layoutId="activeFilterBubble"
                    className="absolute inset-0 rounded-xl border-2 border-[#F2994A]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Quotes Grid with Framer Motion */}
        <motion.div
          layout
          className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredQuotes.map((item, idx) => {
              const isCopied = copiedId === item.id;
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{
                    duration: 0.4,
                    delay: idx * 0.08,
                    ease: "easeOut",
                  }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-neutral-200/90 bg-white p-7 shadow-[0_4px_25px_rgba(0,0,0,0.05)] transition-all hover:border-[#006144]/40 hover:shadow-[0_20px_40px_rgba(0,97,68,0.1)]"
                >
                  {/* Subtle top gradient accent */}
                  <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#006144] via-[#F2994A] to-[#006144]" />

                  {/* Top: Alumni Details & Avatar */}
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3.5">
                        {/* Profile Image with Golden Ring */}
                        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-2xl border-2 border-[#F2994A] shadow-md transition-transform duration-300 group-hover:scale-105 bg-neutral-100">
                          {item.photoUrl ? (
                            <Image
                              src={item.photoUrl}
                              alt={item.name}
                              fill
                              className="object-cover object-top"
                              sizes="64px"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-[#006144] text-lg font-bold text-white">
                              {item.name.charAt(0)}
                            </div>
                          )}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-[#006144] border border-emerald-200">
                              <Sparkles className="h-3 w-3 text-[#F2994A]" />
                              {item.badge || item.category}
                            </span>
                          </div>
                          <h3 className="mt-1 text-lg font-bold text-neutral-900 group-hover:text-[#006144] transition-colors">
                            {item.name}
                          </h3>
                          <p className="text-xs text-neutral-500">
                            {item.role}
                          </p>
                        </div>
                      </div>

                      {/* Large decorative quotation mark */}
                      <div className="flex-shrink-0 text-emerald-600/15">
                        <Quote className="h-10 w-10 rotate-180" />
                      </div>
                    </div>

                    {/* Highlight Quote Box (Clean & Bright) */}
                    <div className="relative mt-5 rounded-2xl bg-emerald-50/60 p-5 border border-emerald-100/80">
                      <p className="text-base font-semibold italic leading-relaxed text-neutral-800 sm:text-lg">
                        &ldquo;{item.quote}&rdquo;
                      </p>
                    </div>

                    {/* Reflection Snippet */}
                    <div className="mt-4">
                      <p className="line-clamp-3 text-xs leading-relaxed text-neutral-600 sm:text-sm">
                        {item.reflection}
                      </p>
                    </div>
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-neutral-100 pt-4">
                    <button
                      type="button"
                      onClick={() => setActiveModalQuote(item)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#006144] hover:text-[#003d2b] transition-colors"
                    >
                      <BookOpen className="h-3.5 w-3.5" />
                      Baca Refleksi Lengkap
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleCopy(item)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-neutral-600 transition hover:bg-neutral-50 hover:text-emerald-700"
                      title="Salin Kata Mutiara"
                    >
                      {isCopied ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-600" />
                          <span className="text-emerald-700 font-bold">
                            Tersalin
                          </span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          Salin
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Fullscreen Reflection Modal */}
      <KahmiReflectionModal
        quote={activeModalQuote}
        isOpen={activeModalQuote !== null}
        onClose={() => setActiveModalQuote(null)}
      />
    </section>
  );
}

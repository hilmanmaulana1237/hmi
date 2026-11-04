"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Quote, Calendar, Award, Sparkles, Check, Copy } from "lucide-react";
import { useState } from "react";
import type { KahmiQuote } from "@/lib/kahmi-data";

interface KahmiReflectionModalProps {
  quote: KahmiQuote | null;
  isOpen: boolean;
  onClose: () => void;
}

export function KahmiReflectionModal({
  quote,
  isOpen,
  onClose,
}: KahmiReflectionModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!quote) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `"${quote.quote}"\n— ${quote.name} (${quote.role})\nKAHMI Saintek UIN Bandung`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Split reflection paragraphs
  const paragraphs = quote.reflection
    .split("\n\n")
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop (Soft Clean Blur, Not Pitch Black) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-neutral-900/50 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal Card (Pure White) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative z-10 flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white text-neutral-900 shadow-2xl"
          >
            {/* Modal Header (Vibrant Emerald Green) */}
            <div className="relative border-b border-emerald-700/30 bg-gradient-to-r from-[#006144] via-[#00704f] to-[#008f62] px-6 py-6 text-white sm:px-8">
              <div className="hmi-pattern pointer-events-none absolute inset-0 opacity-15" />
              <button
                type="button"
                onClick={onClose}
                className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition hover:bg-white/30 hover:scale-105 focus:outline-none"
                aria-label="Tutup modal"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center">
                {/* Photo */}
                <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl border-2 border-[#F2994A] shadow-lg bg-neutral-100">
                  {quote.photoUrl ? (
                    <Image
                      src={quote.photoUrl}
                      alt={quote.name}
                      fill
                      className="object-cover object-top"
                      sizes="80px"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-emerald-800 text-xl font-bold text-white">
                      {quote.name.charAt(0)}
                    </div>
                  )}
                </div>

                {/* Name & Roles */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm border border-white/30">
                      <Sparkles className="h-3 w-3 text-amber-300" />
                      {quote.badge || quote.category}
                    </span>
                    {quote.period && (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-100">
                        <Calendar className="h-3 w-3" />
                        Periode {quote.period}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-1 text-xl font-black tracking-tight text-white sm:text-2xl">
                    {quote.name}
                  </h3>
                  <p className="mt-0.5 text-xs text-white/90 sm:text-sm">
                    {quote.role}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Body / Scrollable Content (Pure White) */}
            <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8 space-y-6 bg-white">
              {/* Highlight Quote Box */}
              <div className="relative overflow-hidden rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5">
                <Quote className="absolute right-3 top-3 h-12 w-12 text-[#006144]/15" />
                <p className="relative text-xs font-bold uppercase tracking-wider text-[#006144]">
                  Kata Mutiara & Prinsip
                </p>
                <p className="relative mt-2 text-base font-semibold italic text-neutral-800 sm:text-lg">
                  &ldquo;{quote.quote}&rdquo;
                </p>
              </div>

              {/* Long Reflection Essay */}
              <div>
                <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-neutral-500">
                  <Award className="h-4 w-4 text-[#F2994A]" />
                  Refleksi Kepemimpinan & Pengabdian
                </h4>
                <div className="mt-3 space-y-4 text-sm leading-relaxed text-neutral-700 sm:text-base">
                  {paragraphs.map((p, idx) => (
                    <p key={idx} className="text-justify indent-4 sm:indent-6">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-neutral-200 bg-neutral-50 px-6 py-4 sm:px-8 flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-neutral-500">
                KAHMI Saintek • HMI Kom. Saintek UIN Sunan Gunung Djati Bandung
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-300 bg-white px-3.5 py-2 text-xs font-semibold text-neutral-700 shadow-sm transition hover:bg-neutral-100 hover:text-emerald-700"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                      Tersalin!
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      Salin Mutiara Kata
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center rounded-xl bg-[#006144] px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#004f37]"
                >
                  Tutup
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

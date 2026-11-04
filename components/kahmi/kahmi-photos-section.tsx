"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  MapPin,
  Maximize2,
  X,
  Users,
} from "lucide-react";
import { kahmiPhotos, type KahmiPhoto } from "@/lib/kahmi-data";

export function KahmiPhotosSection() {
  const [selectedPhoto, setSelectedPhoto] = useState<KahmiPhoto | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedPhoto(null);
    };
    if (selectedPhoto) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedPhoto]);

  return (
    <section id="galeri-kahmi" className="relative py-20 sm:py-28 bg-white border-t border-neutral-200/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-1.5 text-xs font-bold text-amber-900 border border-amber-200">
            <Camera className="h-3.5 w-3.5 text-amber-600" />
            Dokumentasi Silaturahmi Akbar
          </div>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
            Galeri Kebersamaan{" "}
            <span className="text-[#006144]">
              KAHMI Saintek
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-neutral-600 sm:text-lg">
            Momen hangat temu kangen lintas angkatan kader dan alumni HMI Komisariat
            Sains dan Teknologi UIN Bandung. Menjaga tali persaudaraan dan menyatukan
            energi untuk masa depan umat dan bangsa.
          </p>
        </div>

        {/* Photos Grid (White & Bright Style) */}
        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {kahmiPhotos.map((photo, idx) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-neutral-200/90 bg-white shadow-[0_4px_25px_rgba(0,0,0,0.06)] transition-all hover:border-[#006144]/40 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)]"
            >
              {/* Image Container with Hover Zoom & Action Overlay */}
              <div
                className="relative aspect-[16/10] w-full cursor-pointer overflow-hidden bg-slate-100"
                onClick={() => setSelectedPhoto(photo)}
              >
                <Image
                  src={photo.imageUrl}
                  alt={photo.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={idx === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40" />

                {/* Location Badge */}
                {photo.location && (
                  <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-neutral-800 shadow-sm backdrop-blur-md">
                    <MapPin className="h-3.5 w-3.5 text-amber-600" />
                    {photo.location}
                  </div>
                )}

                {/* Enlarge Hint Button */}
                <button
                  type="button"
                  aria-label="Perbesar foto"
                  className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-neutral-800 shadow-sm backdrop-blur-md transition-all hover:scale-110 hover:bg-[#006144] hover:text-white"
                >
                  <Maximize2 className="h-4 w-4" />
                </button>

                {/* Floating Tags */}
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-1.5">
                  {photo.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg bg-black/50 px-2.5 py-0.5 text-[11px] font-medium text-white backdrop-blur-md"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Photo Description Card (Bright & Clean) */}
              <div className="flex flex-1 flex-col justify-between p-6 sm:p-7 bg-white">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#006144]">
                    <Users className="h-3.5 w-3.5" />
                    {photo.subtitle}
                  </div>
                  <h3 className="mt-2 text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
                    {photo.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                    {photo.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-xs text-neutral-400">
                    KAHMI Komisariat Sains & Teknologi
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedPhoto(photo)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#006144] hover:text-[#004f37] transition-colors"
                  >
                    Buka Ukuran Penuh
                    <Maximize2 className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal (Clean View) */}
      <AnimatePresence>
        {selectedPhoto && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhoto(null)}
              className="fixed inset-0 bg-neutral-950/75 backdrop-blur-md"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative z-10 flex max-h-[95vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl border border-neutral-200"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                className="absolute right-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition hover:scale-105 hover:bg-[#006144]"
                aria-label="Tutup foto"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Full Image */}
              <div className="relative aspect-[16/9] w-full bg-neutral-900 max-h-[65vh]">
                <Image
                  src={selectedPhoto.imageUrl}
                  alt={selectedPhoto.title}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>

              {/* Caption Footer */}
              <div className="p-6 bg-white border-t border-neutral-200 text-neutral-900">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-900 border border-amber-200">
                    {selectedPhoto.subtitle}
                  </span>
                  {selectedPhoto.location && (
                    <span className="inline-flex items-center gap-1 text-xs text-neutral-500">
                      <MapPin className="h-3.5 w-3.5 text-amber-600" />
                      {selectedPhoto.location}
                    </span>
                  )}
                </div>
                <h3 className="mt-2 text-xl font-bold sm:text-2xl text-neutral-900">
                  {selectedPhoto.title}
                </h3>
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed max-w-3xl">
                  {selectedPhoto.description}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

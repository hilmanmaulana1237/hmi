"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { PlayCircle } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import type { GalleryItem } from "@/lib/site-data";

type GalleryFilterProps = {
  items: GalleryItem[];
  initialType?: "Semua" | "Foto" | "Video";
};

export function GalleryFilter({ items, initialType = "Semua" }: GalleryFilterProps) {
  const [category, setCategory] = useState("Semua");
  const [type, setType] = useState(initialType);

  const categories = useMemo(
    () => ["Semua", ...Array.from(new Set(items.map((item) => item.category)))],
    [items],
  );

  const shown = useMemo(
    () =>
      items.filter((item) => {
        const matchesCategory =
          category === "Semua" || item.category === category;
        const matchesType = type === "Semua" || item.type === type;

        return matchesCategory && matchesType;
      }),
    [category, items, type],
  );

  return (
    <div>
      <div className="flex flex-col gap-3 rounded-[1.35rem] border border-[#DCE8E2] bg-white p-4 shadow-[0_12px_30px_rgba(0,0,0,0.04)] sm:flex-row sm:items-end sm:justify-between">
        <label className="grid gap-2 text-sm font-bold text-[#10231C]">
          Kategori
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="rounded-2xl border border-[#DCE8E2] bg-white px-4 py-3 outline-none focus:border-[#006B3F]"
          >
            {categories.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <div className="flex rounded-full bg-[#F4F8F6] p-1">
          {(["Semua", "Foto", "Video"] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setType(item)}
              className={`rounded-full px-4 py-2 text-sm font-black transition ${
                type === item
                  ? "bg-[#006B3F] text-white"
                  : "text-[#4B6259] hover:bg-white"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {shown.length ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {shown.map((item) => (
            <article
              key={`${item.title}-${item.date}`}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#DCE8E2]"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#003D2B]/85 via-transparent to-transparent" />
              {item.type === "Video" ? (
                <div className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/90 text-[#006B3F]">
                  <PlayCircle className="h-5 w-5" />
                </div>
              ) : null}
              <div className="absolute bottom-0 p-5 text-white">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D6A84F]">
                  {item.category} - {item.type}
                </p>
                <h2 className="mt-2 text-lg font-bold">{item.title}</h2>
                <p className="mt-1 text-xs text-white/70">{item.date}</p>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-8">
          <EmptyState
            title="Galeri tidak ditemukan"
            description="Ubah kategori atau tipe dokumentasi untuk melihat arsip lain."
          />
        </div>
      )}
    </div>
  );
}

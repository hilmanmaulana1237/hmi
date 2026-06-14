"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { documents, events, news, opinions } from "@/lib/site-data";

const entries = [
  ...news.map((item) => ({
    type: "Berita",
    title: item.title,
    excerpt: item.excerpt,
    href: `/informasi/berita/${item.slug}`,
  })),
  ...events.map((item) => ({
    type: "Agenda",
    title: item.title,
    excerpt: item.excerpt,
    href: `/informasi/agenda/${item.slug}`,
  })),
  ...opinions.map((item) => ({
    type: "Gagasan",
    title: item.title,
    excerpt: item.excerpt,
    href: `/informasi/gagasan-kader/${item.slug}`,
  })),
  ...documents.map((item) => ({
    type: "Dokumen",
    title: item.title,
    excerpt: item.desc,
    href: "/layanan/pusat-dokumen",
  })),
];

export function SearchClient() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("Semua");

  const results = useMemo(() => {
    const search = query.toLowerCase().trim();

    if (!search) {
      return entries;
    }

    return entries.filter((entry) => {
      const matchesQuery =
        entry.title.toLowerCase().includes(search) ||
        entry.excerpt.toLowerCase().includes(search);
      const matchesType = type === "Semua" || entry.type === type;

      return matchesQuery && matchesType;
    });
  }, [query, type]);

  return (
    <div>
      <div className="rounded-3xl border border-[#DCE8E2] bg-white p-4 shadow-[0_18px_60px_rgba(0,61,43,0.08)]">
        <div className="grid gap-3 md:grid-cols-[1fr_auto]">
          <label className="relative block">
            <span className="sr-only">Kata kunci</span>
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5F766D]" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="w-full rounded-2xl border border-[#DCE8E2] py-4 pl-11 pr-4 outline-none focus:border-[#006B3F]"
              placeholder="Cari berita, agenda, dokumen..."
            />
          </label>
          <select
            value={type}
            onChange={(event) => setType(event.target.value)}
            className="rounded-2xl border border-[#DCE8E2] bg-white px-4 py-4 text-sm font-bold outline-none focus:border-[#006B3F]"
          >
            {["Semua", "Berita", "Agenda", "Gagasan", "Dokumen"].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
      </div>

      {results.length ? (
        <div className="mt-8 grid gap-4">
          {results.map((item) => (
            <Link
              key={`${item.type}-${item.title}`}
              href={item.href}
              className="group rounded-[1.35rem] border border-[#DCE8E2] bg-white p-6 shadow-[0_12px_30px_rgba(0,0,0,0.04)] transition hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(0,61,43,0.08)]"
            >
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#F2994A]">
                {item.type}
              </p>
              <h2 className="mt-2 text-xl font-black text-[#003324]">
                {item.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#4B6259]">
                {item.excerpt}
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-[#006B3F]">
                Buka konten
                <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-8">
          <EmptyState
            title="Konten tidak ditemukan"
            description="Coba kata kunci lain atau ubah kategori pencarian."
          />
        </div>
      )}
    </div>
  );
}

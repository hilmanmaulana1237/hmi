import Link from "next/link";
import { Megaphone, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/sections/page-header";
import { formatDate, getAnnouncements } from "@/lib/cms";

export const metadata = {
  title: "Pengumuman",
  description: "Pengumuman resmi HMI Komisariat Sains dan Teknologi.",
};

export default async function PengumumanPage() {
  const result = await getAnnouncements({ limit: 30 });

  return (
    <main>
      <PageHeader
        eyebrow="Pengumuman"
        title="Informasi Resmi Komisariat"
        description="Pemberitahuan kaderisasi, sekretariat, media, dan layanan organisasi."
      />
      <section className="mx-auto grid max-w-5xl gap-5 px-4 py-20 sm:px-6 lg:px-8">
        {result.docs.length === 0 && (
          <p className="py-20 text-center text-[#4B6259]">
            Belum ada pengumuman aktif.
          </p>
        )}
        {result.docs.map((item) => (
          <article
            key={item.id}
            className="rounded-[1.35rem] border border-[#DCE8E2] bg-white p-6 shadow-[0_12px_30px_rgba(0,0,0,0.04)]"
          >
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#E8F7EF] px-3 py-1 text-xs font-black text-[#006B3F]">
                <Megaphone className="h-3.5 w-3.5" />
                Pengumuman
              </span>
              <span className="text-xs font-semibold text-slate-400">
                {formatDate(item.publishedAt as string | undefined)}
              </span>
              <span className="rounded-full bg-[#FFF7E4] px-3 py-1 text-xs font-black text-[#8A6200]">
                {item.status === "published" ? "Aktif" : item.status}
              </span>
            </div>
            <h2 className="mt-4 text-xl font-black text-[#003324]">
              {item.title}
            </h2>
            <p className="mt-3 text-sm leading-7 text-[#4B6259]">
              {item.excerpt as string}
            </p>
            <div className="mt-6 flex items-center">
              <Link
                href={`/informasi/pengumuman/${item.slug}`}
                className="inline-flex items-center gap-2 text-sm font-bold text-[#006B3F] hover:text-[#008f54] transition-colors"
              >
                Lihat Selengkapnya <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

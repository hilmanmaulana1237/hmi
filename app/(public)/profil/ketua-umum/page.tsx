import Image from "next/image";
import { User } from "lucide-react";
import { PageHeader } from "@/components/sections/page-header";
import { getFormerChairpersons, getMediaUrl } from "@/lib/cms";

export const metadata = {
  title: "Arsip Ketua Umum",
};

export default async function KetuaUmumPage() {
  const chairs = await getFormerChairpersons();

  return (
    <main>
      <PageHeader
        eyebrow="Arsip"
        title="Daftar Ketua Umum"
        description="Arsip kepemimpinan HMI Komisariat Sains dan Teknologi dari masa ke masa."
      />
      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-20 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
        {chairs.length === 0 && (
          <p className="col-span-3 py-20 text-center text-[#4B6259]">
            Data ketua umum belum tersedia.
          </p>
        )}
        {chairs.map((chair) => (
          <article
            key={chair.id}
            className="flex h-full flex-col rounded-[1.35rem] border border-slate-100 bg-white p-6 shadow-[0_12px_30px_rgba(0,0,0,0.04)]"
          >
            {chair.photo ? (
              <div className="relative mb-4 aspect-square w-full overflow-hidden rounded-2xl bg-slate-100">
                <Image
                  src={getMediaUrl(chair.photo)}
                  alt={chair.name}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="relative mb-4 flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl bg-slate-100 text-slate-300">
                <User className="h-20 w-20" />
              </div>
            )}
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#F2994A]">
              {chair.period as string}
            </p>
            <h2 className="mt-3 text-xl font-black text-[#003324]">
              {chair.name}
            </h2>
            {chair.quote && (
              <blockquote className="mt-4 rounded-2xl bg-[#F6F8F7] p-4 text-sm font-semibold leading-7 text-[#006B3F]">
                &quot;{chair.quote as string}&quot;
              </blockquote>
            )}
            <div className="mt-auto pt-2">
              <p className="mt-4 text-sm leading-7 text-slate-600">
                {chair.description as string}
              </p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

import Image from "next/image";
import { AtSign } from "lucide-react";
import { PageHeader } from "@/components/sections/page-header";
import { getOrganizationStructure, getMediaUrl } from "@/lib/cms";

export const metadata = {
  title: "Struktur Kepengurusan",
};

export default async function StrukturKepengurusanPage() {
  const members = await getOrganizationStructure();

  return (
    <main>
      <PageHeader
        eyebrow="Profil"
        title="Struktur Kepengurusan"
        description="Susunan pengurus HMI Komisariat Sains dan Teknologi periode berjalan."
      />
      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-20 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {members.length === 0 && (
          <p className="col-span-4 py-20 text-center text-[#4B6259]">
            Data struktur kepengurusan belum tersedia.
          </p>
        )}
        {members.map((member, index) => (
          <article
            key={member.id}
            className="flex h-full flex-col rounded-[1.35rem] border border-slate-100 bg-white p-6 shadow-[0_12px_30px_rgba(0,0,0,0.04)]"
          >
            {member.photo ? (
              <div className="relative mb-4 aspect-square w-full overflow-hidden rounded-2xl bg-slate-100">
                <Image
                  src={getMediaUrl(member.photo)}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="grid h-16 w-16 place-items-center rounded-2xl bg-[#F4F8F6] text-xl font-black text-[#006144]">
                {index + 1}
              </div>
            )}
            <p className="mt-5 text-xs font-black uppercase tracking-[0.16em] text-[#F2994A]">
              {member.department as string}
            </p>
            <h2 className="mt-3 text-xl font-black text-[#003324]">
              {member.name}
            </h2>
            <p className="mt-1 text-sm font-bold text-[#006B3F]">
              {member.position as string}
            </p>
            {member.period && (
              <p className="mt-1 text-xs font-semibold text-slate-400">
                Periode {member.period as string}
              </p>
            )}
            {member.description && (
              <p className="mb-2 mt-4 text-sm leading-7 text-slate-600">
                {member.description as string}
              </p>
            )}
            <div className="mt-auto pt-4">
              {member.instagram && (
                <a
                  href={`https://instagram.com/${(member.instagram as string).replace("@", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#F2994A] transition hover:text-[#006B3F]"
                >
                  <AtSign className="h-4 w-4" />
                  {member.instagram as string}
                </a>
              )}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import { PageHeader } from "@/components/sections/page-header";
import { formatDate, getEvents, getMediaUrl } from "@/lib/cms";

export const metadata = {
  title: "Agenda",
  description: "Agenda dan kegiatan HMI Komisariat Sains dan Teknologi.",
};

export default async function AgendaPage() {
  const result = await getEvents({ limit: 30 });

  const statusMap: Record<string, string> = {
    upcoming: "Akan Datang",
    ongoing: "Berlangsung",
    done: "Selesai",
    cancelled: "Dibatalkan",
  };

  return (
    <main>
      <PageHeader
        eyebrow="Agenda & Kegiatan"
        title="Official Agenda"
        description="Ruang publikasi agenda kaderisasi, diskusi, pengabdian, dan aktivitas pengurus komisariat."
      />
      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-20 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
        {result.docs.length === 0 && (
          <p className="col-span-3 py-20 text-center text-[#4B6259]">
            Belum ada agenda yang dipublikasikan.
          </p>
        )}
        {result.docs.map((event: any) => {
          const imgSrc = getMediaUrl(
            event.coverImage,
            "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1200&q=80"
          );
          const statusLabel = statusMap[event.status as string] || (event.status as string);
          return (
            <article
              key={event.id}
              className="group overflow-hidden rounded-[1.35rem] border border-slate-100 bg-white shadow-[0_12px_30px_rgba(0,0,0,0.04)] transition hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,51,36,0.09)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#003324]">
                <Image
                  src={imgSrc}
                  alt={event.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#003D2B]/85 via-transparent to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-4 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-[#006B3F]">
                  {statusLabel}
                </span>
                <CalendarDays className="absolute bottom-4 right-4 h-12 w-12 text-[#F2994A]" />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-black leading-snug text-[#003324]">
                  {event.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {event.excerpt as string}
                </p>
                <div className="mt-5 grid gap-3 text-sm text-slate-600">
                  <p className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-[#006144]" />
                    {formatDate(event.date as string)}{event.startTime ? `, ${event.startTime}` : ""}
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[#006144]" />
                    {event.location as string}
                  </p>
                </div>
                <Link
                  href={`/informasi/agenda/${event.slug}`}
                  className="mt-6 inline-flex rounded-full bg-[#F4F8F6] px-5 py-2.5 text-sm font-black text-[#006144]"
                >
                  Lihat detail
                </Link>
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}

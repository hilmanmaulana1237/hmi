import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock, MapPin } from "lucide-react";
import { events } from "@/lib/site-data";

type Props = {
  params: Promise<{ slug: string }>;
};

function getEvent(slug: string) {
  return events.find((item) => item.slug === slug);
}

export function generateStaticParams() {
  return events.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = getEvent(slug);

  if (!event) {
    return {
      title: "Agenda tidak ditemukan",
    };
  }

  return {
    title: event.title,
    description: event.excerpt,
    openGraph: {
      title: event.title,
      description: event.excerpt,
      images: [event.image],
    },
  };
}

export default async function AgendaDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = getEvent(slug);

  if (!event) {
    notFound();
  }

  return (
    <main className="bg-white">
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-36 sm:px-6 lg:px-8">
        <Link
          href="/informasi/agenda"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#006B3F]"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke agenda
        </Link>
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px] lg:items-start">
          <article>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#F2994A]">
              {event.status}
            </p>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-[#10231C] sm:text-5xl">
              {event.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#4B6259]">
              {event.excerpt}
            </p>
            <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-3xl bg-[#DCE8E2]">
              <Image
                src={event.image}
                alt={event.title}
                fill
                priority
                sizes="(min-width: 1024px) 720px, 100vw"
                className="object-cover"
              />
            </div>
          </article>
          <aside className="rounded-[1.35rem] border border-[#DCE8E2] bg-[#F6F8F7] p-6">
            <h2 className="text-xl font-black text-[#003324]">
              Informasi agenda
            </h2>
            <div className="mt-5 grid gap-4 text-sm leading-6 text-[#4B6259]">
              <p className="flex gap-3">
                <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-[#006B3F]" />
                {event.date}
              </p>
              <p className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#006B3F]" />
                {event.time}
                {event.endTime ? ` - ${event.endTime}` : ""}
              </p>
              <p className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#006B3F]" />
                {event.location}
              </p>
            </div>
            {event.registrationLink ? (
              <Link
                href={event.registrationLink}
                className="mt-6 inline-flex w-full justify-center rounded-full bg-[#006B3F] px-5 py-3 text-sm font-black text-white"
              >
                Daftar kegiatan
              </Link>
            ) : null}
          </aside>
        </div>
      </section>
    </main>
  );
}

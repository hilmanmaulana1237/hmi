import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  FileText,
  GraduationCap,
  HandHeart,
  Megaphone,
  MessageSquareText,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import { ArticleCard } from "@/components/cards/article-card";
import { EventCard } from "@/components/cards/event-card";
import { OpinionCard } from "@/components/cards/opinion-card";
import { SectionHeading } from "@/components/sections/section-heading";
import { KahmiLandingSection } from "@/components/sections/kahmi-landing-section";
import {
  formatDate,
  getEvents,
  getGallery,
  getMediaUrl,
  getNews,
  getOpinions,
  getSiteSettings,
} from "@/lib/cms";
import { siteConfig } from "@/lib/site-data";

export default async function Home() {
  const [settings, newsResult, eventsResult, opinionsResult, galleryResult] =
    await Promise.all([
      getSiteSettings(),
      getNews({ limit: 6 }),
      getEvents({ limit: 5 }),
      getOpinions({ limit: 3 }),
      getGallery({ limit: 8 }),
    ]);

  const hp = settings?.homepage as Record<string, unknown> | undefined;

  const stats = [
    { label: "Total Kader", value: hp?.totalCadres ? `${hp.totalCadres}+` : "420+" },
    { label: "Total Alumni", value: hp?.totalAlumni ? `${hp.totalAlumni}+` : "180+" },
    { label: "Agenda Aktif", value: (hp?.totalAgenda as number | undefined) ?? 24 },
    { label: "Publikasi", value: (hp?.totalPublications as number | undefined) ?? 96 },
    { label: "Dokumen", value: (hp?.totalDocuments as number | undefined) ?? 32 },
  ];

  const heroTitle = (hp?.heroTitle as string) || "HMI Komisariat Sains dan Teknologi";
  const heroSubtitle =
    (hp?.heroSubtitle as string) ||
    `Ruang kolaborasi intelektual, kaderisasi, pengabdian, dan transformasi digital kader ${siteConfig.organization} ${siteConfig.branch}.`;
  const heroBadge = (hp?.heroBadge as string) || "Official Website";
  const heroImage = getMediaUrl(
    hp?.heroImage,
    "/background.jpeg"
  );
  const primaryCtaLabel = (hp?.primaryCtaLabel as string) || "Daftar LK-I";
  const primaryCtaHref = (hp?.primaryCtaHref as string) || "https://pendaftaran-lk1-saintek.vercel.app/";
  const secondaryCtaLabel = (hp?.secondaryCtaLabel as string) || "Lihat Profil Komisariat";
  const secondaryCtaHref = (hp?.secondaryCtaHref as string) || "/profil";

  // Map CMS docs to shapes expected by existing card components
  const newsItems = newsResult.docs.map((n) => ({
    title: n.title,
    slug: n.slug as string,
    category: n.category as string,
    author:
      typeof n.author === "object" && n.author && "name" in n.author
        ? (n.author as { name: string }).name
        : "Redaksi",
    date: formatDate(n.publishedAt as string | undefined),
    excerpt: n.excerpt as string,
    image: getMediaUrl(
      n.coverImage,
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
    ),
    content: [] as string[],
  }));

  const eventItems = eventsResult.docs.map((e) => {
    const statusMap: Record<string, string> = {
      upcoming: "Akan Datang",
      ongoing: "Berlangsung",
      done: "Selesai",
      cancelled: "Dibatalkan",
    };
    return {
      title: e.title,
      slug: e.slug as string,
      date: formatDate(e.date as string | undefined),
      time: (e.startTime as string) || "",
      endTime: (e.endTime as string) || undefined,
      location: e.location as string,
      status: (statusMap[e.status as string] || e.status) as
        | "Akan Datang"
        | "Berlangsung"
        | "Selesai"
        | "Dibatalkan",
      excerpt: (e.excerpt as string) || "",
      image: getMediaUrl(
        e.coverImage,
        "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1200&q=80"
      ),
      registrationLink: (e.registrationLink as string) || undefined,
    };
  });

  const opinionItems = opinionsResult.docs.map((o) => ({
    title: o.title,
    slug: o.slug as string,
    author: o.authorName as string,
    prodi: (o.authorProdi as string) || "",
    status: (o.authorStatus as string) || "",
    category: (o.category as string) || "",
    date: formatDate(o.publishedAt as string | undefined),
    excerpt: o.excerpt as string,
    image: getMediaUrl(
      o.coverImage,
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"
    ),
    content: [] as string[],
  }));

  const galleryItems = galleryResult.docs.map((g) => ({
    title: g.title,
    category: (g.category as string) || "",
    type: "Foto" as "Foto" | "Video",
    image: getMediaUrl(
      g.image,
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=80"
    ),
    date: formatDate(g.date as string | undefined),
  }));

  return (
    <div className="min-h-screen bg-[#F6F8F7]">
      <main>
        {/* ── Hero ── */}
        <section className="relative isolate flex min-h-screen items-center overflow-hidden bg-[#003324] px-4 pb-20 pt-40 text-left text-white sm:px-6 lg:px-8">
          <Image
            src={heroImage}
            alt="Suasana kampus dan kegiatan mahasiswa"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#006144]/88 to-[#003324]/96" />
          <div className="hmi-pattern pointer-events-none absolute inset-0 opacity-25" />
          <div className="relative z-10 mx-auto w-full max-w-7xl">
            <div className="max-w-3xl">
              <div className="mb-7 inline-flex w-fit items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-2 text-xs font-black uppercase tracking-[0.22em] text-white backdrop-blur">
                <ShieldCheck className="h-4 w-4 text-[#D6A84F]" />
                {heroBadge}
              </div>
              <h1 className="max-w-4xl text-5xl font-black leading-tight tracking-tight drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)] sm:text-7xl">
                {heroTitle}
              </h1>
              <p className="mt-7 max-w-2xl text-base font-semibold leading-8 text-white/90 sm:text-xl">
                {heroSubtitle}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={primaryCtaHref}
                  target={primaryCtaHref.startsWith("http") ? "_blank" : undefined}
                  rel={primaryCtaHref.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#F2994A] to-[#F2C94C] px-7 py-3 text-base font-black text-white shadow-[0_15px_35px_rgba(242,153,74,0.32)] transition hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(242,153,74,0.5)]"
                >
                  {primaryCtaLabel}
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-[#003324]/15">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
                <Link
                  href={secondaryCtaHref}
                  className="inline-flex items-center justify-center rounded-full border border-white/25 px-7 py-3 text-base font-black text-white transition hover:bg-white/10"
                >
                  {secondaryCtaLabel}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats Bar ── */}
        <section className="relative z-10 mx-auto -mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 rounded-[1.35rem] border border-[#006144]/10 bg-white p-4 shadow-[0_20px_40px_rgba(0,51,36,0.08)] sm:grid-cols-2 lg:grid-cols-5">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl bg-[#F4F8F6] p-6 text-center">
                <p className="text-4xl font-black text-[#003324]">{stat.value}</p>
                <p className="mt-2 text-xs font-black uppercase tracking-[0.18em] text-[#64748B]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Berita ── */}
        {newsItems.length > 0 && (
          <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <SectionHeading
                eyebrow="Warta Himpunan"
                title="Berita terbaru komisariat"
                description="Publikasi resmi kegiatan, sikap organisasi, dan dokumentasi kerja pengurus."
              />
              <Link
                href="/informasi/berita"
                className="inline-flex w-fit items-center gap-2 rounded-full border border-[#BCD7CA] px-5 py-2.5 text-sm font-bold text-[#006B3F] hover:bg-white"
              >
                Lihat semua berita
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="no-scrollbar -mx-4 flex snap-x gap-6 overflow-x-auto px-4 pb-4">
              {newsItems.map((item) => (
                <div key={item.slug} className="w-[320px] shrink-0 snap-start md:w-[380px]">
                  <ArticleCard item={item} hrefPrefix="/informasi/berita" />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Agenda ── */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Official Agenda"
              title="Agenda kader dan pengurus"
              description="Agenda terdekat untuk kaderisasi, kajian, media, dan pengabdian masyarakat."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { title: "Kaderisasi", icon: GraduationCap, desc: "LK-I, follow up, dan forum intelektual kader." },
                { title: "Advokasi", icon: HandHeart, desc: "Kanal aspirasi dan pengawalan isu mahasiswa." },
                { title: "Publikasi", icon: Megaphone, desc: "Berita, opini, dan dokumentasi kegiatan." },
                { title: "Dokumen", icon: FileText, desc: "Materi kaderisasi dan administrasi organisasi." },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-[#DCE8E2] bg-[#F6F8F7] p-5">
                  <item.icon className="h-6 w-6 text-[#006B3F]" />
                  <h3 className="mt-4 font-bold text-[#10231C]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#4B6259]">{item.desc}</p>
                </div>
              ))}
            </div>
            {eventItems.length > 0 && (
              <div className="no-scrollbar mt-10 flex snap-x gap-6 overflow-x-auto pb-4">
                {eventItems.map((event) => (
                  <div key={event.slug} className="w-[310px] shrink-0 snap-start">
                    <EventCard event={event} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── Opini ── */}
        {opinionItems.length > 0 && (
          <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Gagasan Kader"
              title="Opini dan refleksi kader"
              description="Ruang tulis kader untuk menghubungkan ilmu, iman, dan kerja pengabdian."
              align="center"
            />
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {opinionItems.map((opinion) => (
                <OpinionCard key={opinion.slug} opinion={opinion} />
              ))}
            </div>
          </section>
        )}

        {/* ── LK-I CTA ── */}
        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="grid overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#006144] to-[#003324] text-white shadow-[0_22px_80px_rgba(0,61,43,0.18)] lg:grid-cols-[1fr_0.85fr]">
            <div className="hmi-pattern p-8 sm:p-10 lg:p-12">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#D6A84F]">
                Pendaftaran LK-I
              </p>
              <h2 className="mt-4 max-w-2xl text-3xl font-black sm:text-4xl">
                Bergabung dalam ruang kaderisasi, ilmu, dan pengabdian.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/75">
                Daftar LK-I secara online, unggah berkas, lalu cek status
                pendaftaran menggunakan kode pendaftaran atau email.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="https://pendaftaran-lk1-saintek.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D6A84F] px-6 py-3 text-sm font-bold text-[#10231C]"
                >
                  Mulai daftar
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/kaderisasi/status-pendaftaran"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-bold"
                >
                  Cek status
                </Link>
              </div>
            </div>
            <div className="grid gap-4 bg-[#10231C]/30 p-8 sm:p-10">
              {["Data diri", "Data akademik", "Motivasi", "Upload berkas", "Konfirmasi"].map(
                (step, index) => (
                  <div
                    key={step}
                    className="flex items-center gap-4 rounded-2xl border border-white/12 bg-white/10 p-4"
                  >
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-sm font-black text-[#006B3F]">
                      {index + 1}
                    </span>
                    <span className="font-semibold">{step}</span>
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        {/* ── KAHMI Saintek ── */}
        <KahmiLandingSection />

        {/* ── Advokasi ── */}
        <section className="bg-white py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
            <div>
              <SectionHeading
                eyebrow="Layanan PTKP"
                title="Kanal advokasi dan aspirasi mahasiswa"
                description="Sampaikan isu akademik, fasilitas, atau aspirasi kampus. Identitas pelapor dapat dijaga rahasia."
              />
              <Link
                href="/layanan/advokasi"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#006B3F] px-6 py-3 text-sm font-bold text-white"
              >
                Buka layanan advokasi
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="rounded-3xl border border-[#DCE8E2] bg-[#F6F8F7] p-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl bg-white p-5">
                  <MessageSquareText className="h-7 w-7 text-[#006B3F]" />
                  <h3 className="mt-4 font-bold">Aspirasi cepat</h3>
                  <p className="mt-2 text-sm leading-6 text-[#4B6259]">
                    Form singkat untuk isu yang perlu diteruskan ke bidang PTKP.
                  </p>
                </div>
                <div className="rounded-2xl bg-white p-5">
                  <UsersRound className="h-7 w-7 text-[#006B3F]" />
                  <h3 className="mt-4 font-bold">Rahasia pelapor</h3>
                  <p className="mt-2 text-sm leading-6 text-[#4B6259]">
                    Data kontak tidak ditampilkan publik dan hanya diakses admin.
                  </p>
                </div>
              </div>
              <div className="mt-5 rounded-2xl border border-dashed border-[#BCD7CA] bg-white p-5 text-sm leading-6 text-[#4B6259]">
                Fokus keamanan data: halaman publik database kader hanya
                menampilkan nama, prodi, status kader, dan angkatan.
              </div>
            </div>
          </div>
        </section>

        {/* ── Galeri ── */}
        {galleryItems.length > 0 && (
          <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <SectionHeading
                eyebrow="Galeri Kegiatan"
                title="Dokumentasi gerak komisariat"
                description="Cuplikan kegiatan kaderisasi, kajian, organisasi, dan pengabdian."
              />
              <Link
                href="/galeri"
                className="inline-flex w-fit items-center gap-2 rounded-full border border-[#BCD7CA] px-5 py-2.5 text-sm font-bold text-[#006B3F] hover:bg-white"
              >
                Lihat galeri
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {galleryItems.slice(0, 8).map((item) => (
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
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#003D2B]/80 via-transparent to-transparent" />
                  <div className="pointer-events-none absolute bottom-0 p-5 text-white">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D6A84F]">
                      {item.category}
                    </p>
                    <h3 className="mt-2 text-lg font-bold">{item.title}</h3>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

import Link from "next/link";
import { ArrowRight, BookOpenCheck, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/sections/page-header";
import { getPrograms, getSiteSettings } from "@/lib/cms";
import { lk1Materials } from "@/lib/site-data";

const flow = [
  "Pendaftaran online",
  "Verifikasi berkas",
  "Screening peserta",
  "Pelaksanaan LK-I",
  "Follow up anggota muda",
];

export const metadata = {
  title: "LK-I",
  description: "Informasi Latihan Kader I HMI Komisariat Sains dan Teknologi.",
};

export default async function Lk1Page() {
  const [programs, settings] = await Promise.all([
    getPrograms("Kaderisasi"),
    getSiteSettings(),
  ]);

  // If no programs from CMS yet, show static lk1Materials as fallback
  const materials =
    programs.length > 0
      ? programs.map((p) => p.title)
      : lk1Materials;

  const isOpen =
    (settings?.featureToggles as Record<string, unknown> | undefined)?.openLK1Registration !== false;

  return (
    <main>
      <PageHeader
        eyebrow="Kaderisasi"
        title="Latihan Kader I"
        description="Basic Training sebagai pintu awal kader HMI untuk mengenal nilai, sejarah, organisasi, dan tanggung jawab pengabdian."
      />
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
        <div className="rounded-[1.5rem] border border-[#DCE8E2] bg-white p-8 shadow-[0_18px_60px_rgba(0,61,43,0.08)]">
          <BookOpenCheck className="h-9 w-9 text-[#006B3F]" />
          <h2 className="mt-5 text-3xl font-black text-[#003324]">
            Materi pokok LK-I
          </h2>
          <div className="mt-6 grid gap-3">
            {materials.map((item) => (
              <p
                key={item}
                className="flex gap-3 rounded-2xl bg-[#F6F8F7] p-4 text-sm font-semibold text-[#4B6259]"
              >
                <CheckCircle2 className="h-5 w-5 shrink-0 text-[#006B3F]" />
                {item}
              </p>
            ))}
          </div>
        </div>
        <div className="rounded-[1.5rem] bg-gradient-to-br from-[#006144] to-[#003324] p-8 text-white shadow-[0_18px_60px_rgba(0,61,43,0.15)]">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#F2994A]">
            Alur peserta
          </p>
          <div className="mt-6 grid gap-4">
            {flow.map((item, index) => (
              <div
                key={item}
                className="flex items-center gap-4 rounded-2xl border border-white/15 bg-white/10 p-4"
              >
                <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-sm font-black text-[#006B3F]">
                  {index + 1}
                </span>
                <span className="font-bold">{item}</span>
              </div>
            ))}
          </div>
          {isOpen ? (
            <Link
              href="https://pendaftaran-lk1-saintek.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#F2994A] px-6 py-3 text-sm font-black text-[#003324]"
            >
              Daftar LK-I
              <ArrowRight className="h-4 w-4" />
            </Link>
          ) : (
            <p className="mt-8 rounded-2xl bg-white/10 px-6 py-3 text-sm font-semibold text-white/80">
              Pendaftaran LK-I saat ini ditutup. Pantau pengumuman komisariat.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}

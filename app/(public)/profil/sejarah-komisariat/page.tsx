import { Clock3 } from "lucide-react";
import { PageHeader } from "@/components/sections/page-header";

const timeline = [
  {
    year: "2016",
    title: "Konsolidasi kader Saintek",
    desc: "Kader dari rumpun sains dan teknologi mulai membangun ruang diskusi dan kaderisasi yang lebih terarah.",
  },
  {
    year: "2019",
    title: "Penguatan forum keilmuan",
    desc: "Kajian, diskusi kampus, dan forum pengabdian menjadi bagian dari kerja komisariat.",
  },
  {
    year: "2022",
    title: "Digitalisasi administrasi",
    desc: "Pengurus mulai merapikan arsip, database kader, dan dokumentasi kegiatan secara digital.",
  },
  {
    year: "2026",
    title: "Rumah Digital HMI Saintek",
    desc: "Website dikembangkan sebagai pusat informasi, pendaftaran LK-I, publikasi, dan layanan organisasi.",
  },
];

export const metadata = {
  title: "Sejarah Komisariat",
  description: "Sejarah HMI Komisariat Sains dan Teknologi.",
};

export default function SejarahKomisariatPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Sejarah"
        title="Sejarah Komisariat Saintek"
        description="Jejak bertumbuhnya ruang kaderisasi, keilmuan, dan pengabdian HMI Komisariat Sains dan Teknologi."
      />
      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="relative grid gap-6">
          {timeline.map((item) => (
            <article
              key={item.year}
              className="grid gap-4 rounded-[1.35rem] border border-[#DCE8E2] bg-white p-6 shadow-[0_12px_30px_rgba(0,0,0,0.04)] sm:grid-cols-[110px_1fr]"
            >
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#E8F7EF] px-4 py-2 text-sm font-black text-[#006B3F]">
                  <Clock3 className="h-4 w-4" />
                  {item.year}
                </span>
              </div>
              <div>
                <h2 className="text-xl font-black text-[#003324]">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-[#4B6259]">
                  {item.desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

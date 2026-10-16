import { Eye, Target } from "lucide-react";
import { PageHeader } from "@/components/sections/page-header";

export const metadata = {
  title: "Visi Misi",
};

export default function VisiMisiPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Arah Gerak"
        title="Visi dan Misi"
        description="Arah perjuangan HMI Komisariat Sains dan Teknologi dalam kaderisasi, keilmuan, dan pengabdian."
      />
      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-20 sm:px-6 md:grid-cols-2 lg:px-8">
        <article className="rounded-[1.35rem] border border-slate-100 bg-white p-8 shadow-[0_12px_30px_rgba(0,0,0,0.04)]">
          <Eye className="h-8 w-8 text-[#006144]" />
          <h2 className="mt-5 text-2xl font-black text-[#003324]">Visi</h2>
          <p className="mt-4 text-lg leading-9 text-slate-700">
            Menjadi pusat kaderisasi intelektual yang unggul, kritis, berdaya
            saing, dan bernafaskan Islam.
          </p>
        </article>
        <article className="rounded-[1.35rem] border border-slate-100 bg-white p-8 shadow-[0_12px_30px_rgba(0,0,0,0.04)]">
          <Target className="h-8 w-8 text-[#006144]" />
          <h2 className="mt-5 text-2xl font-black text-[#003324]">Misi</h2>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>Memperkuat kaderisasi berbasis ilmu dan akhlak.</li>
            <li>Mendorong transformasi digital organisasi.</li>
            <li>Menghadirkan advokasi dan pengabdian yang berdampak.</li>
          </ul>
        </article>
      </section>
    </main>
  );
}

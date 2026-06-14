import { AdvocacyForm } from "@/components/forms/advocacy-form";
import { PageHeader } from "@/components/sections/page-header";

export const metadata = {
  title: "Layanan Advokasi",
  description: "Kanal aspirasi dan advokasi PTKP HMI Komisariat Sains dan Teknologi.",
};

export default function AdvokasiPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Layanan PTKP"
        title="Advokasi dan Aspirasi Mahasiswa"
        description="Sampaikan aspirasi akademik, fasilitas kampus, atau laporan yang perlu ditindaklanjuti. Identitas pelapor dapat dijaga rahasia."
      />
      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
        <AdvocacyForm />
      </section>
    </main>
  );
}

import { PageHeader } from "@/components/sections/page-header";
import { SejarahAccordion } from "./accordion";

export const metadata = {
  title: "Sejarah HMI | Himpunan Mahasiswa Islam",
};

export default function SejarahHmiPage() {
  return (
    <main className="relative">
      {/* Dekorasi Grid Background */}
      <div 
        className="fixed inset-0 z-[-1] opacity-5"
        style={{
          backgroundImage: "radial-gradient(#006144 1px, transparent 1px)",
          backgroundSize: "30px 30px"
        }}
      />
      
      <PageHeader
        eyebrow="Arsip Digital"
        title="Materi Sejarah HMI"
        description="Mengenal lebih dekat perjalanan dan dinamika HMI sebagai organisasi mahasiswa Islam tertua di Indonesia melalui jejak sejarah."
      />
      <section className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <SejarahAccordion />
      </section>
    </main>
  );
}

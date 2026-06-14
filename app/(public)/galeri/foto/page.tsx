import { GalleryFilter } from "@/components/filters/gallery-filter";
import { PageHeader } from "@/components/sections/page-header";
import { gallery } from "@/lib/site-data";

export const metadata = {
  title: "Galeri Foto",
  description: "Arsip foto kegiatan HMI Komisariat Sains dan Teknologi.",
};

export default function GaleriFotoPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Galeri Foto"
        title="Arsip Foto Kegiatan"
        description="Dokumentasi visual kegiatan kaderisasi, kajian, organisasi, dan pengabdian."
      />
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <GalleryFilter
          items={gallery.filter((item) => item.type === "Foto")}
          initialType="Foto"
        />
      </section>
    </main>
  );
}

import { GalleryFilter } from "@/components/filters/gallery-filter";
import { PageHeader } from "@/components/sections/page-header";
import { gallery } from "@/lib/site-data";

export const metadata = {
  title: "Galeri Video",
  description: "Arsip video kegiatan HMI Komisariat Sains dan Teknologi.",
};

export default function GaleriVideoPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Galeri Video"
        title="Arsip Video Kegiatan"
        description="Cuplikan dokumentasi video kegiatan, dialog, dan kelas kader komisariat."
      />
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <GalleryFilter
          items={gallery.filter((item) => item.type === "Video")}
          initialType="Video"
        />
      </section>
    </main>
  );
}

import Image from "next/image";
import { PageHeader } from "@/components/sections/page-header";
import { formatDate, getGallery, getMediaUrl } from "@/lib/cms";
import { FancyboxWrapper } from "@/components/ui/fancybox-wrapper";

export const metadata = {
  title: "Galeri",
  description: "Dokumentasi kegiatan HMI Komisariat Sains dan Teknologi.",
};

export default async function GaleriPage() {
  const result = await getGallery({ limit: 60 });

  const items = result.docs.map((g: any) => ({
    id: g.id,
    title: g.title,
    category: (g.category as string) || "Umum",
    image: getMediaUrl(
      g.image,
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=80"
    ),
    date: formatDate(g.date as string | undefined),
    videoUrl: g.videoUrl as string | undefined,
  }));

  // Get unique categories
  const categories = ["Semua", ...Array.from(new Set(items.map((i: any) => i.category)))];

  return (
    <main>
      <PageHeader
        eyebrow="Galeri"
        title="Dokumentasi Kegiatan"
        description="Arsip visual kegiatan kaderisasi, kajian, rapat organisasi, dan pengabdian masyarakat."
      />
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        {items.length === 0 ? (
          <p className="py-20 text-center text-[#4B6259]">
            Belum ada galeri yang dipublikasikan.
          </p>
        ) : (
          <FancyboxWrapper
            options={{
              Toolbar: {
                display: {
                  left: ["infobar"],
                  middle: ["zoomIn", "zoomOut", "toggle1to1", "rotateCCW", "rotateCW"],
                  right: ["slideshow", "download", "close"],
                },
              },
            }}
          >
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {items.map((item: any) => (
                <a
                  key={item.id}
                  href={item.videoUrl || item.image}
                  data-fancybox="gallery"
                  data-caption={item.title}
                  className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-[#DCE8E2] transition-transform duration-500 hover:-translate-y-1 hover:shadow-xl"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#003D2B]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 p-5 text-white">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D6A84F]">
                      {item.category}
                      {item.videoUrl ? " · Video" : " · Foto"}
                    </p>
                    <h3 className="mt-2 text-lg font-bold">{item.title}</h3>
                    {item.date && (
                      <p className="mt-1 text-xs text-white/70">{item.date}</p>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </FancyboxWrapper>
        )}
      </section>
    </main>
  );
}

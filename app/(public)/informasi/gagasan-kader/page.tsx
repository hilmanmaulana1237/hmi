import { OpinionCard } from "@/components/cards/opinion-card";
import { PageHeader } from "@/components/sections/page-header";
import { formatDate, getMediaUrl, getOpinions } from "@/lib/cms";

export const metadata = {
  title: "Gagasan Kader",
  description: "Ruang opini kader HMI Komisariat Sains dan Teknologi.",
};

export default async function GagasanKaderPage() {
  const result = await getOpinions({ limit: 30 });

  const opinionItems = result.docs.map((o) => ({
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

  return (
    <main>
      <PageHeader
        eyebrow="Mimbar Gagasan"
        title="Ruang Opini Kader"
        description="Kumpulan tulisan kader tentang ilmu, kampus, teknologi, keislaman, dan tanggung jawab sosial."
      />
      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-20 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
        {opinionItems.length === 0 && (
          <p className="col-span-3 py-20 text-center text-[#4B6259]">
            Belum ada opini yang dipublikasikan.
          </p>
        )}
        {opinionItems.map((opinion) => (
          <OpinionCard key={opinion.slug} opinion={opinion} />
        ))}
      </section>
    </main>
  );
}

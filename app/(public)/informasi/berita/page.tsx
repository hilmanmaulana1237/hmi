import { ArticleCard } from "@/components/cards/article-card";
import { PageHeader } from "@/components/sections/page-header";
import { formatDate, getMediaUrl, getNews } from "@/lib/cms";

export const metadata = {
  title: "Berita",
  description: "Warta Himpunan HMI Komisariat Sains dan Teknologi.",
};

export default async function BeritaPage() {
  const result = await getNews({ limit: 30 });

  const newsItems = result.docs.map((n) => ({
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

  return (
    <main>
      <PageHeader
        eyebrow="Warta Himpunan"
        title="Berita Komisariat"
        description="Publikasi resmi kegiatan, agenda, dan sikap organisasi HMI Komisariat Sains dan Teknologi."
      />
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        {newsItems.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-3">
            {newsItems.map((item) => (
              <ArticleCard key={item.slug} item={item} hrefPrefix="/informasi/berita" />
            ))}
          </div>
        ) : (
          <p className="py-20 text-center text-[#4B6259]">
            Belum ada berita yang dipublikasikan.
          </p>
        )}
      </section>
    </main>
  );
}

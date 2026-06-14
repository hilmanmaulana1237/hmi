import { notFound } from "next/navigation";
import { Megaphone, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { RichText } from "@/components/ui/rich-text";
import { ShareButtons } from "@/components/ui/share-buttons";
import { formatDate, getAnnouncementBySlug, getAnnouncementSlugs } from "@/lib/cms";
import { siteConfig } from "@/lib/site-data";

export async function generateStaticParams() {
  const slugs = await getAnnouncementSlugs();
  return slugs;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const announcement = await getAnnouncementBySlug(slug);

  if (!announcement) {
    return { title: "Pengumuman Tidak Ditemukan" };
  }

  return {
    title: `${announcement.title} | Pengumuman HMI`,
    description: announcement.excerpt as string,
  };
}

export default async function PengumumanDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const announcement = await getAnnouncementBySlug(slug);

  if (!announcement) {
    notFound();
  }

  const shareText = `${announcement.title} - ${siteConfig.shortName}`;
  const shareUrl = `/informasi/pengumuman/${slug}`;

  return (
    <main className="bg-[#f8faf9] min-h-screen py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/informasi/pengumuman"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#006B3F] hover:text-[#008f54] transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Daftar Pengumuman
        </Link>
        
        <article className="rounded-[1.5rem] border border-[#DCE8E2] bg-white p-8 md:p-12 shadow-[0_12px_30px_rgba(0,0,0,0.04)]">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#E8F7EF] px-3 py-1 text-xs font-black text-[#006B3F]">
              <Megaphone className="h-3.5 w-3.5" />
              Pengumuman
            </span>
            <span className="text-sm font-semibold text-slate-400">
              {formatDate(announcement.publishedAt as string | undefined)}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-black text-[#003324] mb-8 leading-tight">
            {announcement.title}
          </h1>

          <div className="mt-8">
            <RichText content={announcement.content} />
          </div>
          <div className="mt-8 border-t border-[#DCE8E2] pt-8">
            <h2 className="text-sm font-black uppercase tracking-[0.16em] text-[#003324] mb-4">
              Bagikan
            </h2>
            <ShareButtons shareText={shareText} shareUrl={shareUrl} />
          </div>
        </article>
      </div>
    </main>
  );
}

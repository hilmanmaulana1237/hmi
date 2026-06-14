import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  UserRound,
} from "lucide-react";
import { RichText } from "@/components/ui/rich-text";
import { ShareButtons } from "@/components/ui/share-buttons";
import { formatDate, getMediaUrl, getNewsBySlug, getNewsSlugs } from "@/lib/cms";
import { siteConfig } from "@/lib/site-data";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getNewsSlugs();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getNewsBySlug(slug);

  if (!post) {
    return { title: "Berita tidak ditemukan" };
  }

  const coverUrl = getMediaUrl(post.coverImage);

  return {
    title: (post.seoTitle as string) || post.title,
    description: (post.seoDescription as string) || (post.excerpt as string),
    openGraph: {
      title: post.title,
      description: post.excerpt as string,
      images: coverUrl ? [coverUrl] : [],
      type: "article",
    },
  };
}

export default async function BeritaDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getNewsBySlug(slug);

  if (!post) notFound();

  const category = post.category as string;
  const coverImage = getMediaUrl(post.coverImage);
  const authorName =
    typeof post.author === "object" && post.author && "name" in post.author
      ? (post.author as { name: string }).name
      : "Redaksi";
  const publishedAt = formatDate(post.publishedAt as string | undefined);
  const shareText = `${post.title} - ${siteConfig.shortName}`;
  const shareUrl = `/informasi/berita/${slug}`;

  return (
    <main>
      <article className="bg-white">
        <div className="mx-auto max-w-4xl px-4 pb-12 pt-36 sm:px-6 lg:px-8">
          <Link
            href="/informasi/berita"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#006B3F]"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke berita
          </Link>
          <p className="mt-10 text-sm font-bold uppercase tracking-[0.18em] text-[#006B3F]">
            {category}
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-[#10231C] sm:text-5xl">
            {post.title}
          </h1>
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-[#5F766D]">
            <span className="inline-flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              {publishedAt}
            </span>
            <span className="inline-flex items-center gap-2">
              <UserRound className="h-4 w-4" />
              {authorName}
            </span>
          </div>
        </div>

        {coverImage && (
          <div className="relative mx-auto aspect-[16/8] max-w-6xl overflow-hidden rounded-3xl bg-[#DCE8E2]">
            <Image
              src={coverImage}
              alt={post.title}
              fill
              priority
              sizes="(min-width: 1024px) 960px, 100vw"
              className="object-cover"
            />
          </div>
        )}

        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_260px] lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xl font-semibold leading-9 text-[#10231C]">
              {post.excerpt as string}
            </p>
            <div className="mt-8">
              <RichText content={post.content as Parameters<typeof RichText>[0]["content"]} />
            </div>
          </div>
          <aside className="h-fit rounded-[1.35rem] border border-[#DCE8E2] bg-[#F6F8F7] p-5">
            <h2 className="text-sm font-black uppercase tracking-[0.16em] text-[#003324] mb-4">
              Bagikan
            </h2>
            <ShareButtons shareText={shareText} shareUrl={shareUrl} />
          </aside>
        </div>
      </article>
    </main>
  );
}

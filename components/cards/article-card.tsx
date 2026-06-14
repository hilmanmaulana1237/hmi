import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, UserRound } from "lucide-react";

type ArticleCardProps = {
  item: {
    title: string;
    slug: string;
    category: string;
    author: string;
    date: string;
    excerpt: string;
    image: string;
  };
  hrefPrefix: string;
};

export function ArticleCard({ item, hrefPrefix }: ArticleCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#DCE8E2] bg-white shadow-[0_18px_60px_rgba(0,61,43,0.08)]">
      <div className="relative aspect-[16/10] overflow-hidden bg-[#DCE8E2]">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#006B3F]">
          {item.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex flex-wrap gap-3 text-xs font-medium text-[#5F766D]">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5" />
            {item.date}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <UserRound className="h-3.5 w-3.5" />
            {item.author}
          </span>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold leading-snug text-[#10231C]">
            {item.title}
          </h3>
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#4B6259]">
            {item.excerpt}
          </p>
        </div>
        <Link
          href={`${hrefPrefix}/${item.slug}`}
          className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#006B3F]"
        >
          Baca selengkapnya
          <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </article>
  );
}

import Link from "next/link";
import { ArrowUpRight, PenLine } from "lucide-react";
import type { OpinionItem } from "@/lib/site-data";

type OpinionCardProps = {
  opinion: OpinionItem;
};

export function OpinionCard({ opinion }: OpinionCardProps) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-slate-100 bg-white p-7 shadow-[0_12px_30px_rgba(0,0,0,0.04)] transition hover:-translate-y-1 hover:shadow-[0_20px_44px_rgba(0,51,36,0.08)]">
      <span className="absolute -right-4 -top-8 text-8xl font-black text-[#006144]/5">
        &quot;
      </span>
      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#F4F8F6] text-[#006144]">
        <PenLine className="h-5 w-5" />
      </div>
      <p className="mt-6 text-xs font-black uppercase tracking-[0.16em] text-[#F2994A]">
        {opinion.category}
      </p>
      <h2 className="mt-3 text-xl font-black leading-snug text-[#003324]">
        {opinion.title}
      </h2>
      <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-600">
        {opinion.excerpt}
      </p>
      <div className="mt-auto border-t border-slate-100 pt-5">
        <p className="font-black text-[#003324]">{opinion.author}</p>
        <p className="mt-1 text-sm text-slate-500">
          {opinion.prodi} - {opinion.status}
        </p>
      </div>
      <Link
        href={`/informasi/gagasan-kader/${opinion.slug}`}
        className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-black text-[#006B3F]"
      >
        Baca gagasan
        <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>
    </article>
  );
}

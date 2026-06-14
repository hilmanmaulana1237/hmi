"use client";

import Link from "next/link";
import { MessageCircle, Share2 } from "lucide-react";

type Props = {
  shareText: string;
  shareUrl: string;
};

export function ShareButtons({ shareText, shareUrl }: Props) {
  const fullUrl = typeof window !== "undefined" ? window.location.origin + shareUrl : "http://localhost:3000" + shareUrl;

  return (
    <div className="grid gap-3">
      <Link
        href={`https://wa.me/?text=${encodeURIComponent(shareText)}%20${encodeURIComponent(fullUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-black text-white hover:bg-[#20ba59] transition-colors"
      >
        <MessageCircle className="h-4 w-4" />
        WhatsApp
      </Link>
      <Link
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-[#1877F2] px-4 py-2.5 text-sm font-black text-white hover:bg-[#166fe5] transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
        </svg>
        Facebook
      </Link>
      <Link
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(fullUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-[#1DA1F2] px-4 py-2.5 text-sm font-black text-white hover:bg-[#1a91da] transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
        </svg>
        Twitter
      </Link>
      <button
        className="inline-flex items-center gap-2 rounded-full border border-[#BCD7CA] px-4 py-2.5 text-sm font-black text-[#006B3F] hover:bg-[#E8F7EF] transition-colors"
        onClick={() => {
          navigator.clipboard.writeText(fullUrl);
          alert("Tautan berhasil disalin ke clipboard!");
        }}
      >
        <Share2 className="h-4 w-4" />
        Salin Tautan
      </button>
    </div>
  );
}

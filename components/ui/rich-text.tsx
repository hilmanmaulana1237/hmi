/**
 * components/ui/rich-text.tsx
 * Render Lexical rich text JSON dari Payload CMS menjadi HTML React.
 */

import { RichText as LexicalRichText } from "@payloadcms/richtext-lexical/react";

type Props = {
  content: any;
  className?: string;
};

export function RichText({ content, className = "" }: Props) {
  if (!content) return null;

  return (
    <div
      className={`prose prose-slate max-w-none
        prose-headings:font-black prose-headings:text-[#10231C] prose-headings:mb-4
        prose-p:leading-relaxed prose-p:text-[#334E44] prose-p:text-justify prose-p:mb-6
        prose-a:text-[#006B3F] prose-a:font-semibold hover:prose-a:underline
        prose-strong:text-[#10231C]
        prose-ul:text-[#334E44] prose-ol:text-[#334E44]
        prose-blockquote:border-[#006B3F] prose-blockquote:text-[#4B6259] prose-blockquote:bg-[#F6F8F7] prose-blockquote:p-4 prose-blockquote:rounded-r-lg
        ${className}`}
    >
      <LexicalRichText data={content} />
    </div>
  );
}

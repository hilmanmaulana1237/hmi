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
      className={`prose prose-slate lg:prose-lg max-w-none
        prose-headings:font-black prose-headings:text-[#10231C] prose-headings:tracking-tight
        prose-h1:text-3xl sm:prose-h1:text-4xl prose-h1:mt-10 prose-h1:mb-4
        prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4
        prose-h3:text-xl sm:prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
        prose-h4:text-lg sm:prose-h4:text-xl prose-h4:mt-6 prose-h4:mb-2
        prose-p:leading-relaxed prose-p:text-[#2D4139] prose-p:mb-6
        prose-a:text-[#006144] prose-a:font-semibold hover:prose-a:underline
        prose-strong:text-[#10231C] prose-strong:font-extrabold
        prose-ul:text-[#2D4139] prose-ol:text-[#2D4139]
        prose-blockquote:border-l-4 prose-blockquote:border-[#006144] prose-blockquote:text-[#233d33] prose-blockquote:bg-[#F0F7F4] prose-blockquote:py-3 prose-blockquote:px-5 prose-blockquote:rounded-r-xl prose-blockquote:not-italic
        ${className}`}
    >
      <LexicalRichText data={content} />
    </div>
  );
}

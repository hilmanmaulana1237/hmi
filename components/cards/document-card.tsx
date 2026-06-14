import { CloudDownload, FileArchive, LockKeyhole } from "lucide-react";
import type { DocumentItem } from "@/lib/site-data";

type DocumentCardProps = {
  document: DocumentItem;
};

export function DocumentCard({ document }: DocumentCardProps) {
  const restricted = document.access !== "public";
  const href = document.fileUrl || (document.fileName ? `/api/media/file/${document.fileName}` : "#");

  const Content = (
    <>
      {/* Icon Box */}
      <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#e8f5e9] to-[#c8e6c9] text-2xl text-[#006144] shadow-[inset_0_2px_4px_rgba(255,255,255,0.5)] transition-all duration-400 group-hover:-rotate-12 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-[#006144] group-hover:to-[#003324] group-hover:text-white">
        {restricted ? <LockKeyhole className="h-7 w-7" /> : <FileArchive className="h-7 w-7" />}
      </div>

      {/* Text Info */}
      <div className="flex-grow overflow-hidden">
        <h3 className="mb-1 truncate text-[1.05rem] font-bold text-slate-800 transition-colors duration-400 group-hover:text-[#006144]">
          {document.title}
        </h3>
        <p className="line-clamp-2 text-sm leading-snug text-slate-500">
          {document.desc || "Silakan unduh dokumen ini."}
        </p>
      </div>

      {/* Download Badge */}
      <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-slate-100 text-[1.1rem] text-slate-400 transition-all duration-400 group-hover:-translate-y-1 group-hover:bg-[#f2994a] group-hover:text-white">
        {restricted ? <LockKeyhole className="h-5 w-5" /> : <CloudDownload className="h-5 w-5" />}
      </div>

      {/* Hover bottom border effect */}
      <div className="absolute bottom-0 left-0 h-[3px] w-full origin-left scale-x-0 bg-gradient-to-r from-[#006144] to-[#f2994a] transition-transform duration-400 group-hover:scale-x-100" />
    </>
  );

  const baseClasses =
    "group relative flex items-center gap-[18px] overflow-hidden rounded-[20px] border border-white bg-white/95 p-[22px] text-left shadow-[0_10px_30px_rgba(0,0,0,0.03)] backdrop-blur-[20px] transition-all duration-400 hover:-translate-y-1 hover:bg-white hover:shadow-[0_20px_40px_rgba(0,97,68,0.1)]";

  if (restricted) {
    return (
      <div className={`${baseClasses} cursor-not-allowed opacity-80`} title="Perlu akses khusus">
        {Content}
      </div>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={baseClasses}
    >
      {Content}
    </a>
  );
}

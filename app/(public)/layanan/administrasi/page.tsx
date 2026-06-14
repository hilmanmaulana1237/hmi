import { CloudDownload, FileArchive, FileText, FolderOpen, MailCheck, ShieldCheck, FileImage } from "lucide-react";
import { DocumentCard } from "@/components/cards/document-card";
import { getDocuments } from "@/lib/cms";

const services = [
  {
    title: "Permohonan surat",
    desc: "Pengajuan surat keterangan, rekomendasi, dan kebutuhan administrasi komisariat.",
    icon: MailCheck,
  },
  {
    title: "Arsip dokumen",
    desc: "Pengelolaan dokumen resmi, template surat, dan pedoman organisasi.",
    icon: FileText,
  },
  {
    title: "Proteksi data",
    desc: "Akses dokumen sensitif dibatasi sesuai role admin dan kebutuhan organisasi.",
    icon: ShieldCheck,
  },
];

export const metadata = {
  title: "Layanan Administrasi",
  description: "Layanan administrasi HMI Komisariat Tarbiyah.",
};

export default async function AdministrasiPage() {
  const result = await getDocuments({ access: "public", limit: 50 });

  const adminDocuments = result.docs
    .filter((d) => ["Administrasi", "Surat", "Pedoman Organisasi"].includes(d.category))
    .map((d) => ({
      title: d.title,
      category: d.category as any,
      access: d.access as "public" | "kader" | "admin",
      desc: (d.description as string) || "",
      updatedAt: d.updatedAt,
      fileName:
        typeof d.file === "object" && d.file && "filename" in d.file
          ? (d.file as { filename: string }).filename
          : "",
      fileUrl: d.fileUrl as string | undefined,
    }));

  const groupedDocuments = adminDocuments.reduce((acc, doc) => {
    if (!acc[doc.category]) acc[doc.category] = [];
    acc[doc.category].push(doc);
    return acc;
  }, {} as Record<string, typeof adminDocuments>);

  return (
    <main className="bg-[#f4f7f6] pb-[100px]">
      <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-b-[25px] bg-gradient-to-br from-[#003324] to-[#006144] px-[5%] pb-[70px] pt-[130px] text-center text-white shadow-[0_20px_40px_rgba(0,97,68,0.15)] md:rounded-b-[40px]">
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)",
            backgroundSize: "30px 30px",
          }}
        />
        <div className="relative z-10 mb-[15px] inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-[0.85rem] font-bold uppercase tracking-[1px] backdrop-blur-[10px]">
          <FolderOpen className="text-[#f2994a]" size={16} /> Layanan
        </div>
        <h1 className="relative z-10 mb-[15px] text-[clamp(2rem,5vw,3.2rem)] font-extrabold leading-[1.2] tracking-[-1px]">
          Administrasi Komisariat
        </h1>
        <p className="relative z-10 mx-auto max-w-[600px] px-[10px] text-[1.05rem] leading-[1.6] opacity-85">
          Pusat informasi layanan surat, arsip, dan pedoman administrasi organisasi.
        </p>
      </div>

      <div className="relative z-10 mx-auto mt-[30px] max-w-[1200px] px-5 sm:px-6 lg:px-8">
        <div className="mb-12 grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.title}
              className="rounded-[1.35rem] border border-[#DCE8E2] bg-white p-6 shadow-[0_12px_30px_rgba(0,0,0,0.04)] transition hover:-translate-y-1 hover:shadow-lg"
            >
              <service.icon className="h-7 w-7 text-[#006144]" />
              <h2 className="mt-5 text-xl font-black text-[#003324]">
                {service.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-[#4B6259]">
                {service.desc}
              </p>
            </article>
          ))}
        </div>

        <div className="grid gap-[25px] sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(groupedDocuments).map(([category, docs]) => (
            <div key={category} className="col-span-full contents">
              <div className="col-span-full mt-4 flex items-center gap-[15px]">
                <div className="text-[1.25rem] font-extrabold uppercase tracking-[1px] text-[#003324]">
                  {category}
                </div>
                <div className="h-[2px] flex-grow bg-gradient-to-r from-[rgba(0,97,68,0.2)] to-transparent" />
              </div>
              {docs.map((document) => (
                <DocumentCard
                  key={document.fileName || document.title}
                  document={document}
                />
              ))}
            </div>
          ))}

          {/* Hardcoded Pedoman Organisasi Card per user request */}
          <div className="col-span-full contents">
            <div className="col-span-full mt-4 flex items-center gap-[15px]">
              <div className="text-[1.25rem] font-extrabold uppercase tracking-[1px] text-[#003324]">
                Pedoman Eksternal
              </div>
              <div className="h-[2px] flex-grow bg-gradient-to-r from-[rgba(0,97,68,0.2)] to-transparent" />
            </div>

            <a
              href="https://drive.google.com/drive/folders/1O2Vd_W8yDr2oGwlonY5E_3hHN6lI7OuX?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-[18px] overflow-hidden rounded-[20px] border border-white bg-white/95 p-[22px] text-left shadow-[0_10px_30px_rgba(0,0,0,0.03)] backdrop-blur-[20px] transition-all duration-400 hover:-translate-y-1 hover:bg-white hover:shadow-[0_20px_40px_rgba(0,97,68,0.1)]"
            >
              <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#e8f5e9] to-[#c8e6c9] text-2xl text-[#006144] shadow-[inset_0_2px_4px_rgba(255,255,255,0.5)] transition-all duration-400 group-hover:-rotate-12 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-[#006144] group-hover:to-[#003324] group-hover:text-white">
                <FileArchive className="h-7 w-7" />
              </div>
              <div className="flex-grow overflow-hidden">
                <h3 className="mb-1 truncate text-[1.05rem] font-bold text-slate-800 transition-colors duration-400 group-hover:text-[#006144]">
                  Pedoman Organisasi Komisariat
                </h3>
                <p className="line-clamp-2 text-sm leading-snug text-slate-500">
                  Ringkasan alur koordinasi, bidang kerja, dan kalender organisasi.
                </p>
              </div>
              <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-slate-100 text-[1.1rem] text-slate-400 transition-all duration-400 group-hover:-translate-y-1 group-hover:bg-[#f2994a] group-hover:text-white">
                <CloudDownload className="h-5 w-5" />
              </div>
              <div className="absolute bottom-0 left-0 h-[3px] w-full origin-left scale-x-0 bg-gradient-to-r from-[#006144] to-[#f2994a] transition-transform duration-400 group-hover:scale-x-100" />
            </a>
          </div>

          {/* New Static Categories */}
          {[
            {
              title: "Materi HMI",
              docs: [
                {
                  title: "MATERI SCREENING LK 1",
                  desc: "silakan unduh file dibawah ini",
                  url: "https://drive.google.com/drive/folders/1aIjQSKcQ-qmOTAz9P6Ckgl25N9d7XXdp?usp=drive_link",
                  icon: FileText,
                },
              ],
            },
            {
              title: "Identitas Visual",
              docs: [
                {
                  title: "Filosofi Logo HMI",
                  desc: "silakan unduh file dibawah ini",
                  url: "https://hmikomtaruinril.id/assets/docs/DOC_1766161684_filosofi_logo_hmi.jpg",
                  icon: FileImage,
                },
                {
                  title: "Logo HMI",
                  desc: "silakan unduh file dibawah ini",
                  url: "https://hmikomtaruinril.id/assets/docs/DOC_1766161659_LOGO-HMI.png",
                  icon: FileImage,
                },
                {
                  title: "Logo Resmi HMI Komisariat Tarbiyah UIN RIL",
                  desc: "Download File di bawah ini",
                  url: "https://drive.google.com/file/d/1GPfaDLKMEeNFSuNgvXb4XU4XH83JseQC/view?usp=sharing",
                  icon: FileImage,
                },
              ],
            },
            {
              title: "Hasil Ketetapan Organisasi",
              docs: [
                {
                  title: "DRAFT_RAK_XXX_KOMTAR 2025",
                  desc: "silakan unduh file dibawah ini",
                  url: "https://hmikomtaruinril.id/assets/docs/DOC_1766165966_DRAFT_RAK_XXX_KOMTAR_2025_FIX.docx",
                  icon: FileText,
                },
                {
                  title: "Hasil-Kongres-HMI-KE-XXXII-Pontianak",
                  desc: "silakan unduh file hasil kongres dibawah ini",
                  url: "https://hmikomtaruinril.id/assets/docs/DOC_1766160321_hasilkongrespontianak_compressed.pdf",
                  icon: FileText,
                },
              ],
            },
          ].map((category) => (
            <div key={category.title} className="col-span-full contents">
              <div className="col-span-full mt-4 flex items-center gap-[15px]">
                <div className="text-[1.25rem] font-extrabold uppercase tracking-[1px] text-[#003324]">
                  {category.title}
                </div>
                <div className="h-[2px] flex-grow bg-gradient-to-r from-[rgba(0,97,68,0.2)] to-transparent" />
              </div>
              {category.docs.map((doc, idx) => (
                <a
                  key={idx}
                  href={doc.url}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center gap-[18px] overflow-hidden rounded-[20px] border border-white bg-white/95 p-[22px] text-left shadow-[0_10px_30px_rgba(0,0,0,0.03)] backdrop-blur-[20px] transition-all duration-400 hover:-translate-y-1 hover:bg-white hover:shadow-[0_20px_40px_rgba(0,97,68,0.1)]"
                >
                  <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#e8f5e9] to-[#c8e6c9] text-2xl text-[#006144] shadow-[inset_0_2px_4px_rgba(255,255,255,0.5)] transition-all duration-400 group-hover:-rotate-12 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-[#006144] group-hover:to-[#003324] group-hover:text-white">
                    <doc.icon className="h-7 w-7" />
                  </div>
                  <div className="flex-grow overflow-hidden">
                    <h3 className="mb-1 truncate text-[1.05rem] font-bold text-slate-800 transition-colors duration-400 group-hover:text-[#006144]">
                      {doc.title}
                    </h3>
                    <p className="line-clamp-2 text-sm leading-snug text-slate-500">
                      {doc.desc}
                    </p>
                  </div>
                  <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-slate-100 text-[1.1rem] text-slate-400 transition-all duration-400 group-hover:-translate-y-1 group-hover:bg-[#f2994a] group-hover:text-white">
                    <CloudDownload className="h-5 w-5" />
                  </div>
                  <div className="absolute bottom-0 left-0 h-[3px] w-full origin-left scale-x-0 bg-gradient-to-r from-[#006144] to-[#f2994a] transition-transform duration-400 group-hover:scale-x-100" />
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

import { BookOpen } from "lucide-react";
import { DocumentCard } from "@/components/cards/document-card";
import { getDocuments } from "@/lib/cms";

export const metadata = {
  title: "Materi Kaderisasi",
  description: "Materi kaderisasi HMI Komisariat Sains dan Teknologi.",
};

export default async function MateriPage() {
  // Fetch LK-I and LK-II materials from CMS (public access)
  const result = await getDocuments({ access: "public", limit: 50 });

  const materials = result.docs
    .filter((d) => {
      const cat = d.category as string;
      return cat.startsWith("Materi");
    })
    .map((d) => ({
      title: d.title,
      category: d.category as
        | "Materi LK-I"
        | "Materi LK-II"
        | "Konstitusi HMI"
        | "Administrasi"
        | "Surat"
        | "Pedoman Organisasi",
      access: d.access as "public" | "kader" | "admin",
      desc: (d.description as string) || "",
      updatedAt: d.updatedAt,
      fileName:
        typeof d.file === "object" && d.file && "filename" in d.file
          ? (d.file as { filename: string }).filename
          : "",
      fileUrl: d.fileUrl as string | undefined,
    }));

  // Group materials by category
  const groupedMaterials = materials.reduce((acc, doc) => {
    if (!acc[doc.category]) {
      acc[doc.category] = [];
    }
    acc[doc.category].push(doc);
    return acc;
  }, {} as Record<string, typeof materials>);

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
          <BookOpen className="text-[#f2994a]" size={16} /> Kaderisasi
        </div>
        <h1 className="relative z-10 mb-[15px] text-[clamp(2rem,5vw,3.2rem)] font-extrabold leading-[1.2] tracking-[-1px]">
          Materi Kaderisasi
        </h1>
        <p className="relative z-10 mx-auto max-w-[600px] px-[10px] text-[1.05rem] leading-[1.6] opacity-85">
          Bahan bacaan dan dokumen pendukung LK-I, follow up, dan forum pembinaan kader.
        </p>
      </div>

      <div className="relative z-10 mx-auto mt-[30px] max-w-[1200px] px-5 sm:px-6 lg:px-8">
        {materials.length === 0 ? (
          <div className="col-span-full rounded-3xl bg-white p-[60px_20px] text-center shadow-[0_10px_40px_rgba(0,0,0,0.02)]">
            <p className="text-[#4B6259]">Materi kaderisasi belum tersedia.</p>
          </div>
        ) : (
          <div className="grid gap-[25px] sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(groupedMaterials).map(([category, docs]) => (
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
          </div>
        )}
      </div>
    </main>
  );
}

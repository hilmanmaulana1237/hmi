import { CadreTable } from "@/components/tables/cadre-table";
import { PageHeader } from "@/components/sections/page-header";
import { getCadres } from "@/lib/cms";

export const metadata = {
  title: "Database Kader",
  description: "Database kader publik HMI Komisariat Sains dan Teknologi.",
};

export default async function DatabaseKaderPage() {
  const result = await getCadres({ limit: 1000 });

  // Map to shape expected by CadreTable
  const cadres = result.docs.map((c) => ({
    fullName: c.fullName,
    studyProgram: c.studyProgram as string,
    cadreStatus: c.cadreStatus as
      | "Anggota Muda"
      | "LK-I"
      | "LK-II"
      | "LK-III"
      | "Pengurus"
      | "Alumni",
    batchYear: c.batchYear as number,
  }));

  return (
    <main>
      <PageHeader
        eyebrow="Database Kader"
        title="Data Publik Kader"
        description="Cari kader berdasarkan nama, program studi, status kader, dan angkatan. Data sensitif tetap dilindungi."
      />
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <CadreTable cadres={cadres} />
      </section>
    </main>
  );
}

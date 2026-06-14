import { SearchClient } from "@/components/search/search-client";
import { PageHeader } from "@/components/sections/page-header";

export const metadata = {
  title: "Search",
  description: "Pencarian konten Rumah Digital HMI Saintek.",
};

export default function SearchPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Search"
        title="Cari Konten"
        description="Pencarian untuk berita, agenda, gagasan kader, dokumen, dan galeri."
      />
      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
        <SearchClient />
      </section>
    </main>
  );
}

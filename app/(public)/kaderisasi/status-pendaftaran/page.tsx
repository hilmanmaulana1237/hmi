import { StatusCheckForm } from "@/components/forms/status-check-form";
import { PageHeader } from "@/components/sections/page-header";

export const metadata = {
  title: "Status Pendaftaran LK-I",
  description: "Cek status pendaftaran LK-I.",
};

export default function StatusPendaftaranPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Status LK-I"
        title="Cek Status Pendaftaran"
        description="Masukkan kode pendaftaran atau email untuk melihat status verifikasi peserta LK-I."
      />
      <section className="mx-auto max-w-2xl px-4 py-20 sm:px-6 lg:px-8">
        <StatusCheckForm />
      </section>
    </main>
  );
}

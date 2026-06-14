import { LK1RegistrationForm } from "@/components/forms/lk1-registration-form";
import { PageHeader } from "@/components/sections/page-header";

export const metadata = {
  title: "Daftar LK-I",
  description: "Form pendaftaran LK-I HMI Komisariat Sains dan Teknologi.",
};

export default function DaftarLk1Page() {
  return (
    <main>
      <PageHeader
        eyebrow="Kaderisasi"
        title="Pendaftaran LK-I Online"
        description="Isi data diri, data akademik, motivasi, unggah berkas, lalu kirim pendaftaran untuk diverifikasi pengurus kaderisasi."
      />
      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <LK1RegistrationForm />
      </section>
    </main>
  );
}

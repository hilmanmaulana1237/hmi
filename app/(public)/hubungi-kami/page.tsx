import { Mail, MapPin, Phone } from "lucide-react";
import { PageHeader } from "@/components/sections/page-header";
import { siteConfig } from "@/lib/site-data";

export const metadata = {
  title: "Hubungi Kami",
  description: "Kontak HMI Komisariat Sains dan Teknologi.",
};

export default function HubungiKamiPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Kontak"
        title="Hubungi HMI Saintek"
        description="Terhubung dengan pengurus komisariat untuk informasi LK-I, kerja sama, publikasi, dan layanan organisasi."
      />
      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-20 sm:px-6 lg:grid-cols-3 lg:px-8">
        {[
          { label: "Alamat", value: siteConfig.address, icon: MapPin },
          { label: "Email", value: siteConfig.email, icon: Mail },
          { label: "Telepon", value: siteConfig.phone, icon: Phone },
        ].map((item) => (
          <article
            key={item.label}
            className="rounded-2xl border border-[#DCE8E2] bg-white p-6 shadow-[0_14px_44px_rgba(0,61,43,0.06)]"
          >
            <item.icon className="h-7 w-7 text-[#006B3F]" />
            <h2 className="mt-5 text-xl font-bold">{item.label}</h2>
            <p className="mt-3 text-sm leading-6 text-[#4B6259]">
              {item.value}
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}

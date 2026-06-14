import Link from "next/link";
import { ArrowRight, FileText, History, ShieldCheck, Trophy, UsersRound } from "lucide-react";
import { PageHeader } from "@/components/sections/page-header";
import { SectionHeading } from "@/components/sections/section-heading";
import { getSiteSettings } from "@/lib/cms";
import { siteConfig } from "@/lib/site-data";

const values = [
  {
    title: "Identitas Organisasi",
    icon: ShieldCheck,
    desc: "Menampilkan profil resmi komisariat, sejarah, visi misi, dan struktur kepengurusan.",
  },
  {
    title: "Database Kader Aman",
    icon: UsersRound,
    desc: "Data publik dibatasi pada nama, prodi, status kader, dan angkatan.",
  },
  {
    title: "Arsip Administrasi",
    icon: FileText,
    desc: "Dokumen kaderisasi dan administrasi dikelola lewat CMS dengan akses bertingkat.",
  },
];

const profileLinks = [
  { label: "Sejarah HMI", href: "/profil/sejarah-hmi", icon: History },
  { label: "Sejarah Komisariat", href: "/profil/sejarah-komisariat", icon: History },
  { label: "Visi dan Misi", href: "/profil/visi-misi", icon: ShieldCheck },
  { label: "Struktur Kepengurusan", href: "/profil/struktur-kepengurusan", icon: UsersRound },
  { label: "Arsip Ketua Umum", href: "/profil/ketua-umum", icon: Trophy },
  { label: "Database Kader", href: "/profil/database-kader", icon: FileText },
];

export const metadata = {
  title: "Profil",
  description: `Profil ${siteConfig.organization} ${siteConfig.university}.`,
};

export default async function ProfilPage() {
  const settings = await getSiteSettings();
  const orgName = (settings?.organizationName as string) || siteConfig.organization;
  const description =
    (settings?.siteDescription as string) ||
    "Komisariat Saintek menghimpun kader dari rumpun sains dan teknologi untuk membangun tradisi intelektual, kepemimpinan, dan tanggung jawab sosial.";

  return (
    <main>
      <PageHeader
        eyebrow="Profil Komisariat"
        title={orgName}
        description="Rumah digital untuk merawat identitas, sejarah, struktur, dan basis data kader HMI Komisariat Sains dan Teknologi."
      />
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Tentang"
          title="Ruang kaderisasi dan pengabdian berbasis keilmuan"
          description={description}
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {values.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-[#DCE8E2] bg-white p-6 shadow-[0_14px_44px_rgba(0,61,43,0.06)]"
            >
              <item.icon className="h-7 w-7 text-[#006B3F]" />
              <h2 className="mt-5 text-xl font-bold">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-[#4B6259]">{item.desc}</p>
            </article>
          ))}
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {profileLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-center justify-between rounded-[1.35rem] border border-[#DCE8E2] bg-white p-5 font-black text-[#003324] shadow-[0_12px_30px_rgba(0,0,0,0.04)] transition hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(0,61,43,0.08)]"
            >
              <span className="inline-flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#F4F8F6] text-[#006B3F]">
                  <item.icon className="h-5 w-5" />
                </span>
                {item.label}
              </span>
              <ArrowRight className="h-4 w-4 text-[#006B3F] transition group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

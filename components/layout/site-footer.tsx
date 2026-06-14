import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { AtSign, Mail, MapPin, Phone, Share2, User, Video } from "lucide-react";
import { siteConfig } from "@/lib/site-data";

const navigation = [
  { label: "Beranda", href: "/" },
  { label: "Sejarah HMI", href: "/profil/sejarah-hmi" },
  { label: "Sejarah Komisariat", href: "/profil/sejarah-komisariat" },
  { label: "Struktur Organisasi", href: "/profil/struktur-kepengurusan" },
  { label: "Database Kader", href: "/profil/database-kader" },
  { label: "Galeri Kegiatan", href: "/galeri" },
];

const information = [
  { label: "Berita Terkini", href: "/informasi/berita" },
  { label: "Agenda Kaderisasi", href: "/informasi/agenda" },
  { label: "Gagasan Kader", href: "/informasi/gagasan-kader" },
  { label: "Pengumuman", href: "/informasi/pengumuman" },
  { label: "Layanan PTKP", href: "/layanan/advokasi" },
  { label: "Pusat Dokumen", href: "/layanan/pusat-dokumen" },
  { label: "Daftar LK-I", href: "/kaderisasi/daftar-lk-1" },
];

type SiteSettingsData = Record<string, unknown> | null;

export function SiteFooter({ settings }: { settings?: SiteSettingsData }) {
  // Prefer CMS data; fall back to static siteConfig
  const orgName = (settings?.organizationName as string) || siteConfig.organization;
  const univName = (settings?.universityName as string) || siteConfig.university;
  const tagline = (settings?.tagline as string) || siteConfig.tagline;
  const address = (settings?.address as string) || siteConfig.address;
  const email = (settings?.email as string) || siteConfig.email;
  const phone = (settings?.phone as string) || siteConfig.phone;
  const instagram = (settings?.instagram as string) || siteConfig.instagram;
  const footerDesc =
    (settings?.footerDescription as string) ||
    "Terbinanya insan akademis, pencipta, pengabdi yang bernafaskan Islam.";

  return (
    <footer className="bg-gradient-to-br from-[#003324] to-[#001C14] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.4fr_0.85fr_0.85fr_1.15fr] lg:px-8">
        <div>
          <div className="flex items-center gap-4">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl bg-white">
              <Image src="/logo.png" alt="Logo HMI" fill className="object-contain p-1" />
            </div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-wide">
                {orgName}
              </h3>
              <p className="mt-1 text-[0.66rem] font-bold uppercase tracking-[0.18em] text-[#B9FBC0]">
                {univName}
              </p>
            </div>
          </div>
          <p className="mt-6 max-w-md text-sm leading-7 text-white/70">
            {tagline} {footerDesc}
          </p>
          <div className="mt-6 flex gap-3">
            {instagram && (
              <Link
                href={`https://instagram.com/${instagram.replace("@", "")}`}
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-[#F2994A] hover:text-[#003324]"
              >
                <AtSign className="h-4 w-4" />
              </Link>
            )}
            {[Video, Share2].map((Icon, index) => (
              <Link
                key={index}
                href="/"
                aria-label="Sosial media"
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-[#F2994A] hover:text-[#003324]"
              >
                <Icon className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </div>

        <FooterColumn title="Navigasi" links={navigation} />
        <FooterColumn title="Informasi" links={information} />

        <div>
          <FooterTitle>Hubungi Kami</FooterTitle>
          <div className="mt-6 space-y-4 text-sm text-white/75">
            {address && (
              <p className="flex gap-3">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-[#F2994A]" />
                <span>
                  <strong className="text-white">Sekretariat Saintek</strong>
                  <br />
                  {address}
                </span>
              </p>
            )}
            {email && (
              <p className="flex gap-3">
                <Mail className="mt-1 h-4 w-4 shrink-0 text-[#F2994A]" />
                {email}
              </p>
            )}
            {phone && (
              <p className="flex gap-3">
                <Phone className="mt-1 h-4 w-4 shrink-0 text-[#F2994A]" />
                {phone}
              </p>
            )}
            <p className="flex gap-3">
              <User className="mt-1 h-4 w-4 shrink-0 text-[#F2994A]" />
              <span>
                Admin Website:{" "}
                <a
                  href="https://wa.me/6287827718245"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-white transition hover:text-[#F2994A]"
                >
                  Hilman Maulana
                </a>
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-center text-xs text-white/55 sm:flex-row sm:text-left">
          <span>&copy; {new Date().getFullYear()} {orgName}. All Rights Reserved.</span>
          <span className="font-black text-[#F2994A]">#YakinUsahaSampai</span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: Array<{ label: string; href: string }>;
}) {
  return (
    <div>
      <FooterTitle>{title}</FooterTitle>
      <ul className="mt-6 grid gap-3 text-sm text-white/72">
        {links.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="inline-flex items-center gap-2 transition hover:translate-x-1 hover:text-white"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#F2994A]" />
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterTitle({ children }: { children: ReactNode }) {
  return (
    <h3 className="relative w-fit pb-3 text-sm font-black uppercase tracking-[0.18em] text-white">
      {children}
      <span className="absolute bottom-0 left-0 h-1 w-10 rounded-full bg-[#F2994A]" />
    </h3>
  );
}

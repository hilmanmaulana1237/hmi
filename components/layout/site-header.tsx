"use client";

import Image from "next/image";
import Link from "next/link";
import type { ComponentType } from "react";
import { useEffect, useState } from "react";
import {
  BookOpenText,
  CalendarDays,
  ChevronDown,
  ContactRound,
  FileArchive,
  Fingerprint,
  GalleryHorizontal,
  Home,
  IdCard,
  Landmark,
  Lightbulb,
  Menu,
  Newspaper,
  Network,
  PenLine,
  Search,
  ShieldCheck,
  Trophy,
  UserRound,
  X,
} from "lucide-react";
import { siteConfig } from "@/lib/site-data";

const profileLinks = [
  { label: "Profil Komisariat", href: "/profil", icon: UserRound },
  { label: "Sejarah HMI", href: "/profil/sejarah-hmi", icon: BookOpenText },
  { label: "Sejarah Komisariat", href: "/profil/sejarah-komisariat", icon: Landmark },
  { label: "Struktur Pengurus", href: "/profil/struktur-kepengurusan", icon: Network },
  { label: "Daftar Ketua Umum", href: "/profil/ketua-umum", icon: Trophy },
  { label: "Visi Misi", href: "/profil/visi-misi", icon: Lightbulb },
  { label: "Database Kader", href: "/profil/database-kader", icon: IdCard },
];

const infoLinks = [
  { label: "Agenda Event", href: "/informasi/agenda", icon: CalendarDays },
  { label: "Berita Terkini", href: "/informasi/berita", icon: Newspaper },
  { label: "Ruang Opini", href: "/informasi/gagasan-kader", icon: PenLine },
  { label: "Pengumuman", href: "/informasi/pengumuman", icon: ShieldCheck },
];

const cadreLinks = [
  { label: "Informasi LK-I", href: "/kaderisasi/lk-1", icon: BookOpenText },
  { label: "Daftar LK-I", href: "/kaderisasi/daftar-lk-1", icon: IdCard },
  { label: "Status Pendaftaran", href: "/kaderisasi/status-pendaftaran", icon: ShieldCheck },
  { label: "Materi Kaderisasi", href: "/kaderisasi/materi", icon: FileArchive },
];

const serviceLinks = [
  { label: "Advokasi PTKP", href: "/layanan/advokasi", icon: ContactRound },
  { label: "Administrasi", href: "/layanan/administrasi", icon: FileArchive },
  { label: "Bank Dokumen", href: "/layanan/pusat-dokumen", icon: FileArchive },
];

type SiteSettingsData = Record<string, unknown> | null;

export function SiteHeader({ settings }: { settings?: SiteSettingsData }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Prefer CMS data; fall back to static siteConfig
  const orgName =
    (settings?.organizationName as string) || siteConfig.organization;
  const univName =
    (settings?.universityName as string) || siteConfig.university;
  const activePeriod = (settings?.activePeriod as string) || "Periode 2025-2026";

  return (
    <>
      <div
        className={`fixed inset-0 z-[60] bg-[#003324]/45 backdrop-blur-sm transition md:hidden ${
          open ? "visible opacity-100" : "pointer-events-none invisible opacity-0"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />
      <header
        className={`fixed inset-x-0 top-0 z-[70] border-b border-white/10 bg-gradient-to-br from-[#006144] to-[#003324] px-4 text-white shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-all duration-300 sm:px-6 lg:px-8 ${
          scrolled ? "h-[75px]" : "h-[95px]"
        }`}
      >
        <div className="mx-auto flex h-full max-w-[1500px] items-center justify-between">
          <Link href="/" className="flex max-w-[72%] items-center gap-3">
            <div
              className={`relative shrink-0 overflow-hidden rounded-[14px] bg-white transition-all ${
                scrolled ? "h-[45px] w-[45px]" : "h-[55px] w-[55px]"
              }`}
            >
              <Image src="/logo.png" alt="Logo HMI" fill className="object-contain p-1" />
            </div>
            <span className="flex flex-col justify-center">
              <h1 className="m-0 text-[0.68rem] font-extrabold leading-[1.1] tracking-[0.2px] text-white sm:text-[1rem]">
                {orgName}
              </h1>
              <p className="mt-[1px] text-[0.55rem] font-semibold leading-[1.2] tracking-[0.5px] text-[#b9fbc0] opacity-80 sm:text-[0.6rem]">
                {univName}
              </p>
              <span className="mt-[1px] text-[0.5rem] font-bold uppercase tracking-[1px] text-white/90 sm:text-[0.55rem]">
                {activePeriod}
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 xl:flex">
            <NavLink href="/" icon={Home} label="Beranda" />
            <Dropdown label="Profil" icon={Landmark} links={profileLinks} />
            <Dropdown label="Informasi" icon={ShieldCheck} links={infoLinks} />
            <NavLink href="/galeri" icon={GalleryHorizontal} label="Galeri" />
            <Dropdown label="Kaderisasi" icon={IdCard} links={cadreLinks} />
            <Dropdown label="Layanan" icon={FileArchive} links={serviceLinks} />
            <NavLink
              href="/kaderisasi/daftar-lk-1"
              icon={IdCard}
              label="Daftar LK-I"
              variant="accent"
            />
            <Link
              href="/admin"
              aria-label="Login Pengurus"
              className="ml-2 grid h-10 w-10 place-items-center rounded-full bg-white/5 text-white/55 transition hover:bg-white/15 hover:text-white"
            >
              <Fingerprint className="h-4 w-4" />
            </Link>
            <Link
              href="/search"
              aria-label="Cari"
              className="grid h-10 w-10 place-items-center rounded-full bg-white/5 text-white/70 transition hover:bg-white/15 hover:text-white"
            >
              <Search className="h-4 w-4" />
            </Link>
          </nav>

          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white xl:hidden"
            onClick={() => setOpen((value: boolean) => !value)}
            aria-expanded={open}
            aria-label={open ? "Tutup menu" : "Buka menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      <aside
        className={`fixed right-0 top-0 z-[80] h-dvh w-[85%] max-w-[360px] overflow-y-auto rounded-l-[2.5rem] bg-gradient-to-b from-white to-[#F0FDF4] px-5 pb-10 pt-28 shadow-[-20px_0_60px_rgba(0,51,36,0.16)] transition duration-300 xl:hidden ${
          open ? "pointer-events-auto translate-x-0" : "pointer-events-none translate-x-full"
        }`}
        aria-hidden={!open}
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="absolute right-5 top-6 grid h-11 w-11 place-items-center rounded-full bg-[#003324] text-white shadow-[0_10px_24px_rgba(0,51,36,0.18)]"
          aria-label="Tutup menu"
        >
          <X className="h-5 w-5" />
        </button>
        <MobileLink href="/" icon={Home} label="Beranda" onClick={() => setOpen(false)} />
        <MobileGroup label="Profil" links={profileLinks} onNavigate={() => setOpen(false)} />
        <MobileGroup label="Informasi" links={infoLinks} onNavigate={() => setOpen(false)} />
        <MobileLink href="/galeri" icon={GalleryHorizontal} label="Galeri" onClick={() => setOpen(false)} />
        <MobileGroup label="Kaderisasi" links={cadreLinks} onNavigate={() => setOpen(false)} />
        <MobileGroup label="Layanan" links={serviceLinks} onNavigate={() => setOpen(false)} />
        <MobileLink href="/kaderisasi/daftar-lk-1" icon={IdCard} label="Daftar LK-I" onClick={() => setOpen(false)} accent />
        <Link
          href="/admin"
          onClick={() => setOpen(false)}
          className="mt-5 flex items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-4 text-sm font-bold text-slate-500"
        >
          <Fingerprint className="h-4 w-4" />
          Login Pengurus
        </Link>
      </aside>
    </>
  );
}

type IconType = ComponentType<{ className?: string }>;

function NavLink({
  href,
  label,
  icon: Icon,
  variant,
}: {
  href: string;
  label: string;
  icon: IconType;
  variant?: "soft" | "accent";
}) {
  const isExternal = href.startsWith("http");
  const className =
    variant === "accent"
      ? "bg-[#F2994A] text-[#003324] font-black hover:bg-white"
      : variant === "soft"
        ? "border border-white/25 bg-white/12 font-bold text-white hover:bg-white hover:text-[#006144]"
        : "text-white/85 hover:bg-white/10 hover:text-white";

  return (
    <Link
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition ${className}`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  );
}

function Dropdown({
  label,
  icon: Icon,
  links,
}: {
  label: string;
  icon: IconType;
  links: Array<{ label: string; href: string; icon: IconType }>;
}) {
  return (
    <div className="group relative">
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-white/85 transition hover:bg-white/10 hover:text-white"
      >
        <Icon className="h-4 w-4" />
        {label}
        <ChevronDown className="h-3 w-3" />
      </button>
      <div className="invisible absolute left-1/2 top-[calc(100%-2px)] w-72 -translate-x-1/2 pt-3 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <div className="translate-y-1 rounded-[1.35rem] bg-white p-3 shadow-[0_20px_40px_rgba(0,0,0,0.15)] transition group-hover:translate-y-0 group-focus-within:translate-y-0">
          {links.map((item) => {
            const isExternal = item.href.startsWith("http");
            return (
              <Link
                key={item.href}
                href={item.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-[#1E293B] transition hover:bg-[#F0F7F4] hover:pl-5 hover:text-[#006144]"
              >
                <item.icon className="h-4 w-4 text-[#006144]" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function MobileGroup({
  label,
  links,
  onNavigate,
}: {
  label: string;
  links: Array<{ label: string; href: string; icon: IconType }>;
  onNavigate: () => void;
}) {
  return (
    <details className="group mb-2">
      <summary className="flex cursor-pointer list-none items-center justify-between rounded-2xl bg-slate-50 px-4 py-4 text-sm font-black text-[#003324]">
        {label}
        <ChevronDown className="h-4 w-4 transition group-open:rotate-180" />
      </summary>
      <div className="ml-4 mt-2 grid gap-2 border-l-2 border-[#008F62] pl-3">
        {links.map((item) => {
          const isExternal = item.href.startsWith("http");
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white px-4 py-3 text-sm font-semibold text-slate-700"
            >
              <item.icon className="h-4 w-4 text-[#006144]" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </details>
  );
}

function MobileLink({
  href,
  label,
  icon: Icon,
  onClick,
  accent,
}: {
  href: string;
  label: string;
  icon: IconType;
  onClick: () => void;
  accent?: boolean;
}) {
  const isExternal = href.startsWith("http");
  return (
    <Link
      href={href}
      onClick={onClick}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={`mb-2 flex items-center justify-between rounded-2xl px-4 py-4 text-sm font-black ${
        accent ? "bg-[#F2994A] text-[#003324]" : "bg-slate-50 text-[#003324]"
      }`}
    >
      <span className="inline-flex items-center gap-3">
        <Icon className="h-4 w-4" />
        {label}
      </span>
    </Link>
  );
}

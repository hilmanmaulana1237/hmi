import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronRight, Home, Users, MessageSquare } from "lucide-react";
import { PageHeader } from "@/components/sections/page-header";
import { HierarchyTree } from "@/components/sections/hierarchy-tree";
import { getOrganizationStructure, getMediaUrl } from "@/lib/cms";
import {
  organizationStructure as defaultMembers,
  hmiFunctionalDivisions,
  type StructureMember,
} from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Bagan Hierarki Struktur Kepengurusan · HMI Saintek",
  description:
    "Bagan hierarki garis komando, koordinasi, serta pembagian tugas 4 bidang fungsional (PPPA, PTKP, KPP, PP/KOHATI) HMI Komisariat Sains dan Teknologi UIN Sunan Gunung Djati Bandung.",
};

export default async function StrukturKepengurusanPage() {
  const cmsMembers = await getOrganizationStructure();

  // Helper function to infer role metadata
  const inferRoleMeta = (position: string, department: string) => {
    const p = (position || "").toLowerCase();
    const d = (department || "").toLowerCase();

    let roleType: StructureMember["roleType"] = "departemen";
    let bidangKey: StructureMember["bidangKey"] = "bph";

    if (p.includes("ketua umum") || p === "formateur") {
      roleType = "ketum";
      bidangKey = "bph";
    } else if (p.includes("sekretaris umum") || p.includes("sekum")) {
      roleType = "sekum";
      bidangKey = "bph";
    } else if (p.includes("bendahara umum") || p.includes("bendum")) {
      roleType = "bendum";
      bidangKey = "bph";
    } else if (p.includes("ketua bidang") || p.includes("kabid")) {
      roleType = "kabid";
    } else if (p.includes("wasekum") || p.includes("wakil sekretaris")) {
      roleType = "wasekum";
    } else if (p.includes("biro")) {
      roleType = "biro";
      bidangKey = "biro";
    }

    if (p.includes("pppa") || d.includes("pppa") || p.includes("p3a") || d.includes("kaderisasi")) {
      bidangKey = "pppa";
    } else if (p.includes("ptkp") || d.includes("ptkp") || d.includes("perguruan tinggi")) {
      bidangKey = "ptkp";
    } else if (p.includes("kpp") || d.includes("kpp") || d.includes("kewirausahaan")) {
      bidangKey = "kpp";
    } else if (p.includes("kohati") || p.includes("perempuan") || d.includes("kohati") || d.includes("perempuan")) {
      bidangKey = "kohati";
    } else if (p.includes("media") || p.includes("rumah tangga") || d.includes("biro")) {
      bidangKey = "biro";
    }

    return { roleType, bidangKey };
  };

  // Merge CMS records with rich site-data fallbacks
  let members: StructureMember[] = [];

  if (cmsMembers && cmsMembers.length > 0) {
    members = cmsMembers.map((m, idx) => {
      const position = (m.position as string) || "";
      const department = (m.department as string) || "";
      const rawBidang = (m.bidang as string) || "";
      const rawRoleLevel = (m.roleLevel as string) || "";

      let { roleType, bidangKey } = inferRoleMeta(position, department);

      if (rawBidang === "bph_ketum") {
        bidangKey = "bph";
        roleType = "ketum";
      } else if (rawBidang === "bph_sekum") {
        bidangKey = "bph";
        roleType = "sekum";
      } else if (rawBidang === "bph_bendum") {
        bidangKey = "bph";
        roleType = "bendum";
      } else if (rawBidang === "pppa") {
        bidangKey = "pppa";
      } else if (rawBidang === "ptkp") {
        bidangKey = "ptkp";
      } else if (rawBidang === "kpp") {
        bidangKey = "kpp";
      } else if (rawBidang === "kohati") {
        bidangKey = "kohati";
      }

      if (rawRoleLevel === "kabid") roleType = "kabid";
      else if (rawRoleLevel === "wasekum") roleType = "wasekum";
      else if (rawRoleLevel === "departemen") roleType = "departemen";
      else if (rawRoleLevel === "bendum_kohati") roleType = "bendum";

      // Find matching default member for description fallback
      const matchedDefault = defaultMembers.find(
        (def) => def.name.toLowerCase() === (m.name as string).toLowerCase()
      );

      const isKetum =
        roleType === "ketum" || position.toLowerCase().includes("ketua umum");

      return {
        name: (m.name as string) || "",
        position,
        department: department || matchedDefault?.department || "Pengurus Komisariat",
        period: (m.period as string) || matchedDefault?.period || "2025-2026",
        description:
          (m.description as string) ||
          matchedDefault?.description ||
          "Pengurus HMI Komisariat Sains dan Teknologi Periode 2025-2026.",
        photo: m.photo
          ? getMediaUrl(m.photo)
          : isKetum
          ? "/ketua-umum.jpg"
          : matchedDefault?.photo,
        instagram: (m.instagram as string) || matchedDefault?.instagram,
        roleType: matchedDefault?.roleType || roleType,
        bidangKey: matchedDefault?.bidangKey || bidangKey,
        order: (m.order as unknown as number) ?? matchedDefault?.order ?? idx + 1,
      };
    });

    // Sort by order
    members.sort((a, b) => (a.order || 0) - (b.order || 0));
  } else {
    members = defaultMembers;
  }

  return (
    <main className="min-h-screen bg-[#F4F7F6]">
      {/* ─── PAGE HERO ─── */}
      <PageHeader
        eyebrow="Tata Kelola & Struktur Organisasi"
        title="Bagan Hierarki Kepengurusan"
        description="Bagan hierarki komprehensif garis komando, koordinasi fungsional, dan pembagian tugas 4 bidang utama (PPPA, PTKP, KPP, PP/KOHATI) HMI Komisariat Sains dan Teknologi UIN Sunan Gunung Djati Bandung."
      />

      {/* ─── BREADCRUMB & CONTEXT STRIP ─── */}
      <div className="border-b border-slate-200 bg-white shadow-2xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Link href="/" className="flex items-center gap-1 hover:text-[#006144]">
              <Home className="h-3.5 w-3.5" />
              <span>Beranda</span>
            </Link>
            <ChevronRight className="h-3 w-3 text-slate-300" />
            <Link href="/profil" className="hover:text-[#006144]">
              Profil
            </Link>
            <ChevronRight className="h-3 w-3 text-slate-300" />
            <span className="font-bold text-[#006144]">Bagan Hierarki</span>
          </nav>

          <div className="hidden sm:flex items-center gap-4 text-xs font-bold">
            <Link
              href="/profil/ketua-umum"
              className="text-slate-600 transition hover:text-[#006144]"
            >
              Arsip Ketua Umum →
            </Link>
            <Link
              href="/profil/database-kader"
              className="rounded-full bg-[#EAF5F1] px-3 py-1 text-[#006144] transition hover:bg-[#006144] hover:text-white"
            >
              Database Kader
            </Link>
          </div>
        </div>
      </div>

      {/* ─── MAIN CONTENT SECTION ─── */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <HierarchyTree initialMembers={members} divisions={hmiFunctionalDivisions} />

        {/* ─── BOTTOM BANNER / COLLABORATION CTA ─── */}
        <section className="mt-16 overflow-hidden rounded-3xl border border-[#006144]/30 bg-gradient-to-br from-[#003324] via-[#004D36] to-[#006144] p-8 text-white shadow-xl sm:p-12">
          <div className="relative z-10 flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
            <div className="max-w-2xl">
              <span className="rounded-full bg-[#F2994A] px-3.5 py-1 text-xs font-black uppercase tracking-wider text-[#003324]">
                Kolaborasi & Sinergi Gerakan
              </span>
              <h3 className="font-display mt-3 text-2xl font-black sm:text-3xl">
                Ingin Berkoordinasi dengan Bidang Terkait?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/80">
                Pintu komunikasi HMI Komisariat Sains dan Teknologi terbuka untuk audiensi kemahasiswaan, kemitraan riset sains, mentoring kewirausahaan, serta kerja sama keumatan.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/hubungi-kami"
                className="inline-flex items-center gap-2 rounded-full bg-[#F2994A] px-6 py-3 text-xs font-black text-[#003324] shadow-md transition hover:bg-[#ffa759] hover:shadow-lg"
              >
                <MessageSquare className="h-4 w-4" />
                Hubungi Pengurus
              </Link>
              <Link
                href="/kaderisasi/lk-1"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-xs font-black text-white backdrop-blur-xs transition hover:bg-white/20"
              >
                Pendaftaran LK-1 <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

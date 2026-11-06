/**
 * app/api/seed/route.ts
 * ─────────────────────────────────────────────────────────────────
 * Endpoint untuk menjalankan seed data awal.
 * PENTING: Hanya bisa diakses dengan SEED_SECRET yang benar.
 * Hapus file ini setelah selesai seed!
 *
 * Usage:
 *   GET /api/seed?secret=SEED_SECRET_DARI_ENV
 * ─────────────────────────────────────────────────────────────────
 */

import { NextRequest, NextResponse } from "next/server";
import config from "@payload-config";
import { getPayload } from "payload";

const SEED_SECRET = process.env.SEED_SECRET ?? "hmi-saintek-seed-2026";

function buildLexicalFromParagraphs(paragraphs: string[]): object {
  return {
    root: {
      type: "root",
      children: paragraphs.map((text) => ({
        type: "paragraph",
        children: [{ type: "text", text, version: 1 }],
        direction: "ltr",
        format: "",
        indent: 0,
        version: 1,
      })),
      direction: "ltr",
      format: "",
      indent: 0,
      version: 1,
    },
  };
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");

  if (secret !== SEED_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = await getPayload({ config });
    const results: string[] = [];

    // ── 1. Super Admin ──────────────────────────────────────────
    const existingUsers = await payload.find({ collection: "users", limit: 1 });
    if (existingUsers.totalDocs === 0) {
      await payload.create({
        collection: "users",
        data: {
          name: "Super Admin HMI",
          email: "admin@hmisaintek.org",
          password: "HMISaintek2026!",
          roles: ["super_admin"],
          isActive: true,
        },
      });
      results.push("✓ Super admin dibuat (admin@hmisaintek.org / HMISaintek2026!)");
    } else {
      results.push("⏭  Admin sudah ada");
    }

    // ── 2. SiteSettings ─────────────────────────────────────────
    const existingSettings = await payload.find({ collection: "site-settings", limit: 1 });
    if (existingSettings.totalDocs === 0) {
      await payload.create({
        collection: "site-settings",
        data: {
          siteName: "HMI Komisariat Sains dan Teknologi",
          siteDescription: "Ruang kolaborasi intelektual kader HMI Saintek",
          organizationName: "HMI Komisariat Sains dan Teknologi",
          branchName: "Cabang Kabupaten Bandung",
          universityName: "UIN Sunan Gunung Djati Bandung",
          address: "Jl. A.H. Nasution No.105, Cipadung, Kec. Cibiru, Kota Bandung, Jawa Barat 40614",
          email: "komt.saintek@gmail.com",
          phone: "+62 87-8277-18245",
          whatsapp: "+6287827718245",
          instagram: "@hmisaintek.cakaba",
          activePeriod: "Periode 2025-2026",
          tagline: "Yakin Usaha Sampai.",
          footerDescription: "Terbinanya insan akademis, pencipta, pengabdi yang bernafaskan Islam.",
          homepage: {
            heroBadge: "Official Website",
            heroTitle: "HMI Komisariat Sains dan Teknologi",
            heroSubtitle: "Ruang kolaborasi intelektual, kaderisasi, pengabdian, dan transformasi digital kader HMI Saintek.",
            primaryCtaLabel: "Daftar LK-I",
            primaryCtaHref: "https://www.hmikomsaintek.my.id/kaderisasi/daftar-lk-1",
            secondaryCtaLabel: "Lihat Profil Komisariat",
            secondaryCtaHref: "/profil",
            totalCadres: 420,
            totalAlumni: 180,
            totalAgenda: 24,
            totalPublications: 96,
            totalDocuments: 32,
          },
          featureToggles: {
            showNews: true,
            showAgenda: true,
            showOpinions: true,
            showGallery: true,
            showAdvocacy: true,
            showChatWidget: true,
            openLK1Registration: true,
          },
        },
      });
      results.push("✓ SiteSettings dibuat");
    } else {
      results.push("⏭  SiteSettings sudah ada");
    }

    // ── 3. Berita Contoh ─────────────────────────────────────────
    const sampleNews = [
      {
        title: "HMI Saintek Gelar Diskusi Ilmiah: Teknologi dan Keislaman",
        slug: "diskusi-ilmiah-teknologi-keislaman",
        excerpt: "Komisariat Saintek mengadakan diskusi ilmiah bulanan dengan tema integrasi teknologi modern dan nilai-nilai keislaman dalam pengembangan SDM kader.",
        category: "Kaderisasi",
        content: ["Diskusi ilmiah bulanan yang diadakan oleh HMI Komisariat Sains dan Teknologi berlangsung sukses.", "Kegiatan ini diikuti oleh lebih dari 50 kader aktif dari berbagai jurusan sains dan teknologi."],
      },
      {
        title: "Pengumuman Pembukaan Pendaftaran LK-I Periode 2025-2026",
        slug: "pendaftaran-lk-1-2025-2026",
        excerpt: "HMI Komisariat Saintek membuka pendaftaran Latihan Kader I (LK-I) untuk semester genap 2025-2026. Mahasiswa baru dipersilahkan mendaftar.",
        category: "Kaderisasi",
        content: ["HMI Komisariat Sains dan Teknologi resmi membuka pendaftaran LK-I.", "Pendaftaran dibuka mulai 1 Februari hingga 28 Februari 2026."],
      },
    ];

    for (const item of sampleNews) {
      const existing = await payload.find({ collection: "news", where: { slug: { equals: item.slug } }, limit: 1 });
      if (existing.totalDocs > 0) { results.push(`⏭  Berita "${item.title}" sudah ada`); continue; }
      await payload.create({
        collection: "news",
        data: {
          title: item.title,
          slug: item.slug,
          excerpt: item.excerpt,
          content: buildLexicalFromParagraphs(item.content),
          category: item.category,
          status: "published",
          publishedAt: new Date().toISOString(),
        },
      });
      results.push(`✓ Berita: ${item.title}`);
    }

    // ── 4. Pengurus Contoh ───────────────────────────────────────
    const samplePengurus = [
      { name: "Ahmad Fauzi", position: "Ketua Umum", department: "Pimpinan Komisariat", period: "2025-2026", order: 1 },
      { name: "Siti Rahmawati", position: "Sekretaris Umum", department: "Pimpinan Komisariat", period: "2025-2026", order: 2 },
      { name: "Muhammad Rizki", position: "Bendahara Umum", department: "Pimpinan Komisariat", period: "2025-2026", order: 3 },
    ];
    for (const m of samplePengurus) {
      const existing = await payload.find({ collection: "organization-structure", where: { name: { equals: m.name } }, limit: 1 });
      if (existing.totalDocs > 0) { results.push(`⏭  Pengurus "${m.name}" sudah ada`); continue; }
      await payload.create({
        collection: "organization-structure",
        data: m,
      });
      results.push(`✓ Pengurus: ${m.name}`);
    }

    // ── 5. Kader Contoh ──────────────────────────────────────────
    const sampleCadres = [
      { fullName: "Ahmad Fauzi", studyProgram: "Teknik Informatika", cadreStatus: "Pengurus", batchYear: 2022, isPublic: true },
      { fullName: "Siti Rahmawati", studyProgram: "Matematika", cadreStatus: "LK-I", batchYear: 2023, isPublic: true },
      { fullName: "Budi Santoso", studyProgram: "Fisika", cadreStatus: "Anggota Muda", batchYear: 2024, isPublic: true },
    ];
    for (const c of sampleCadres) {
      const existing = await payload.find({ collection: "cadres", where: { fullName: { equals: c.fullName } }, limit: 1 });
      if (existing.totalDocs > 0) { results.push(`⏭  Kader "${c.fullName}" sudah ada`); continue; }
      await payload.create({ collection: "cadres", data: c });
      results.push(`✓ Kader: ${c.fullName}`);
    }

    // ── 6. Ketua Umum Arsip ──────────────────────────────────────
    const sampleChairs = [
      { name: "Ahmad Fauzi", period: "2025-2026", quote: "HMI bukan hanya organisasi, tapi sekolah peradaban.", description: "Memimpin komisariat dengan fokus pada transformasi digital dan kaderisasi berbasis teknologi.", order: 1 },
    ];
    for (const ch of sampleChairs) {
      const existing = await payload.find({ collection: "former-chairpersons", where: { name: { equals: ch.name } }, limit: 1 });
      if (existing.totalDocs > 0) { results.push(`⏭  Ketua "${ch.name}" sudah ada`); continue; }
      await payload.create({ collection: "former-chairpersons", data: ch });
      results.push(`✓ Ketua: ${ch.name}`);
    }

    return NextResponse.json({
      success: true,
      message: "Seed berhasil!",
      results,
      nextSteps: [
        "1. Buka http://localhost:3000/admin",
        "2. Login: admin@hmisaintek.org / HMISaintek2026!",
        "3. Tambah konten lewat Payload Admin",
        "4. HAPUS file app/api/seed/route.ts setelah selesai!",
      ],
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

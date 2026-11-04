/**
 * scripts/seed.ts
 * ─────────────────────────────────────────────────────────────────
 * Mengisi database Supabase dengan data awal dari lib/site-data.ts
 *
 * Jalankan dengan:
 *   npx tsx scripts/seed.ts
 * ─────────────────────────────────────────────────────────────────
 */

import "dotenv/config";
import { getPayload } from "payload";
import config from "../payload.config";
import {
  announcements,
  cadres,
  events,
  formerChairpersons,
  gallery,
  news,
  opinions,
  organizationStructure,
  siteConfig,
} from "../lib/site-data";

async function seed() {
  console.log("🌱 Memulai seed database...\n");
  const payload = await getPayload({ config });

  // ── 1. Users (Super Admin) ─────────────────────────────────────
  console.log("👤 Membuat super admin...");
  try {
    const existing = await payload.find({ collection: "users", limit: 1 });
    if (existing.totalDocs === 0) {
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
      console.log("   ✓ Super admin dibuat (email: admin@hmisaintek.org, password: HMISaintek2026!)");
    } else {
      console.log("   ⏭  Admin sudah ada, dilewati.");
    }
  } catch (e) {
    console.error("   ✗ Gagal buat admin:", e);
  }

  // ── 2. SiteSettings ───────────────────────────────────────────
  console.log("⚙️  Membuat SiteSettings...");
  try {
    const existing = await payload.find({ collection: "site-settings", limit: 1 });
    if (existing.totalDocs === 0) {
      await payload.create({
        collection: "site-settings",
        data: {
          siteName: siteConfig.name,
          siteDescription: siteConfig.tagline,
          organizationName: siteConfig.organization,
          branchName: siteConfig.branch,
          universityName: siteConfig.university,
          address: siteConfig.address,
          email: siteConfig.email,
          phone: siteConfig.phone,
          whatsapp: siteConfig.whatsapp,
          instagram: siteConfig.instagram,
          activePeriod: "Periode 2025-2026",
          tagline: siteConfig.tagline,
          footerDescription: "Terbinanya insan akademis, pencipta, pengabdi yang bernafaskan Islam.",
          homepage: {
            heroBadge: "Official Website",
            heroTitle: siteConfig.organization,
            heroSubtitle: siteConfig.tagline,
            primaryCtaLabel: "Daftar LK-I",
            primaryCtaHref: "/kaderisasi/daftar-lk-1",
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
      console.log("   ✓ SiteSettings dibuat");
    } else {
      console.log("   ⏭  SiteSettings sudah ada, dilewati.");
    }
  } catch (e) {
    console.error("   ✗ Gagal buat SiteSettings:", e);
  }

  // ── 3. News ───────────────────────────────────────────────────
  console.log("📰 Seeding berita...");
  for (const item of news) {
    try {
      const existing = await payload.find({
        collection: "news",
        where: { slug: { equals: item.slug } },
        limit: 1,
      });
      if (existing.totalDocs > 0) {
        console.log(`   ⏭  Berita "${item.title}" sudah ada.`);
        continue;
      }
      // Build Lexical content from plain text paragraphs
      const lexicalContent = buildLexicalFromParagraphs(item.content);
      await payload.create({
        collection: "news",
        data: {
          title: item.title,
          slug: item.slug,
          excerpt: item.excerpt,
          content: lexicalContent,
          category: item.category,
          status: "published",
          publishedAt: new Date().toISOString(),
          featured: false,
        },
      });
      console.log(`   ✓ Berita: ${item.title}`);
    } catch (e) {
      console.error(`   ✗ Gagal: ${item.title}:`, e);
    }
  }

  // ── 4. Events ─────────────────────────────────────────────────
  console.log("📅 Seeding agenda...");
  const statusMap: Record<string, string> = {
    "Akan Datang": "upcoming",
    "Berlangsung": "ongoing",
    "Selesai": "done",
    "Dibatalkan": "cancelled",
  };
  for (const event of events) {
    try {
      const existing = await payload.find({
        collection: "events",
        where: { slug: { equals: event.slug } },
        limit: 1,
      });
      if (existing.totalDocs > 0) {
        console.log(`   ⏭  Event "${event.title}" sudah ada.`);
        continue;
      }
      await payload.create({
        collection: "events",
        data: {
          title: event.title,
          slug: event.slug,
          excerpt: event.excerpt,
          date: new Date(2026, 5, 28).toISOString(), // approximate
          startTime: event.time,
          endTime: event.endTime,
          location: event.location,
          status: statusMap[event.status] || "upcoming",
          isPublished: true,
          featured: false,
          registrationLink: event.registrationLink,
        },
      });
      console.log(`   ✓ Event: ${event.title}`);
    } catch (e) {
      console.error(`   ✗ Gagal: ${event.title}:`, e);
    }
  }

  // ── 5. Opinions ───────────────────────────────────────────────
  console.log("✍️  Seeding opini...");
  for (const op of opinions) {
    try {
      const existing = await payload.find({
        collection: "opinions",
        where: { slug: { equals: op.slug } },
        limit: 1,
      });
      if (existing.totalDocs > 0) {
        console.log(`   ⏭  Opini "${op.title}" sudah ada.`);
        continue;
      }
      const lexicalContent = buildLexicalFromParagraphs(op.content);
      await payload.create({
        collection: "opinions",
        data: {
          title: op.title,
          slug: op.slug,
          authorName: op.author,
          authorProdi: op.prodi,
          authorStatus: op.status,
          excerpt: op.excerpt,
          content: lexicalContent,
          category: op.category,
          status: "published",
          publishedAt: new Date().toISOString(),
        },
      });
      console.log(`   ✓ Opini: ${op.title}`);
    } catch (e) {
      console.error(`   ✗ Gagal: ${op.title}:`, e);
    }
  }

  // ── 6. Gallery ────────────────────────────────────────────────
  console.log("🖼️  Seeding galeri...");
  for (const g of gallery) {
    try {
      const existing = await payload.find({
        collection: "gallery",
        where: { title: { equals: g.title } },
        limit: 1,
      });
      if (existing.totalDocs > 0) {
        console.log(`   ⏭  Galeri "${g.title}" sudah ada.`);
        continue;
      }
      await payload.create({
        collection: "gallery",
        data: {
          title: g.title,
          category: g.category,
          date: new Date().toISOString(),
          isPublished: true,
        },
      });
      console.log(`   ✓ Galeri: ${g.title}`);
    } catch (e) {
      console.error(`   ✗ Gagal: ${g.title}:`, e);
    }
  }

  // ── 7. Cadres ─────────────────────────────────────────────────
  console.log("👥 Seeding kader...");
  for (const c of cadres) {
    try {
      const existing = await payload.find({
        collection: "cadres",
        where: { fullName: { equals: c.fullName } },
        limit: 1,
      });
      if (existing.totalDocs > 0) continue;
      await payload.create({
        collection: "cadres",
        data: {
          fullName: c.fullName,
          studyProgram: c.studyProgram,
          cadreStatus: c.cadreStatus,
          batchYear: c.batchYear,
          isPublic: true,
        },
      });
      console.log(`   ✓ Kader: ${c.fullName}`);
    } catch (e) {
      console.error(`   ✗ Gagal: ${c.fullName}:`, e);
    }
  }

  // ── 8. OrganizationStructure ──────────────────────────────────
  console.log("🏢 Seeding struktur organisasi...");
  for (let i = 0; i < organizationStructure.length; i++) {
    const m = organizationStructure[i];
    try {
      const existing = await payload.find({
        collection: "organization-structure",
        where: { name: { equals: m.name } },
        limit: 1,
      });
      if (existing.totalDocs > 0) continue;
      await payload.create({
        collection: "organization-structure",
        data: {
          name: m.name,
          position: m.position,
          department: m.department,
          description: m.description,
          period: m.period,
          order: i + 1,
        },
      });
      console.log(`   ✓ Pengurus: ${m.name} — ${m.position}`);
    } catch (e) {
      console.error(`   ✗ Gagal: ${m.name}:`, e);
    }
  }

  // ── 9. FormerChairpersons ─────────────────────────────────────
  console.log("🏆 Seeding mantan ketua umum...");
  for (let i = 0; i < formerChairpersons.length; i++) {
    const ch = formerChairpersons[i];
    try {
      const existing = await payload.find({
        collection: "former-chairpersons",
        where: { name: { equals: ch.name } },
        limit: 1,
      });
      if (existing.totalDocs > 0) continue;
      await payload.create({
        collection: "former-chairpersons",
        data: {
          name: ch.name,
          period: ch.period,
          quote: ch.quote,
          description: ch.description,
          order: i + 1,
        },
      });
      console.log(`   ✓ Ketua: ${ch.name} (${ch.period})`);
    } catch (e) {
      console.error(`   ✗ Gagal: ${ch.name}:`, e);
    }
  }

  // ── 10. Announcements ─────────────────────────────────────────
  console.log("📢 Seeding pengumuman...");
  for (const ann of announcements) {
    try {
      const slug = ann.title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
        .slice(0, 80);
      const existing = await payload.find({
        collection: "announcements",
        where: { title: { equals: ann.title } },
        limit: 1,
      });
      if (existing.totalDocs > 0) continue;
      await payload.create({
        collection: "announcements",
        data: {
          title: ann.title,
          slug,
          excerpt: ann.excerpt,
          publishedAt: new Date().toISOString(),
          status: ann.status === "Aktif" ? "published" : "archived",
        },
      });
      console.log(`   ✓ Pengumuman: ${ann.title}`);
    } catch (e) {
      console.error(`   ✗ Gagal: ${ann.title}:`, e);
    }
  }

  console.log("\n✅ Seed selesai!\n");
  console.log("📋 Langkah selanjutnya:");
  console.log("   1. Buka http://localhost:3000/admin");
  console.log("   2. Login dengan: admin@hmisaintek.org / HMISaintek2026!");
  console.log("   3. Upload gambar untuk berita, galeri, dll di collection Media");
  process.exit(0);
}

/**
 * Build minimal Lexical JSON from array of plain text paragraphs.
 */
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

seed().catch((err) => {
  console.error("❌ Seed gagal:", err);
  process.exit(1);
});

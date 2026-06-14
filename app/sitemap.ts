import { MetadataRoute } from "next";
import {
  getNewsSlugs,
  getEventSlugs,
  getOpinionSlugs,
  getAnnouncementSlugs,
} from "@/lib/cms";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hmikomsaintek.my.id";

  // Static routes configuration
  const staticRoutes = [
    "",
    "/galeri",
    "/galeri/foto",
    "/galeri/video",
    "/hubungi-kami",
    "/informasi/berita",
    "/informasi/agenda",
    "/informasi/pengumuman",
    "/informasi/gagasan-kader",
    "/kaderisasi/lk-1",
    "/kaderisasi/daftar-lk-1",
    "/kaderisasi/status-pendaftaran",
    "/kaderisasi/materi",
    "/layanan/administrasi",
    "/layanan/advokasi",
    "/layanan/pusat-dokumen",
    "/profil",
    "/profil/visi-misi",
    "/profil/sejarah-hmi",
    "/profil/sejarah-komisariat",
    "/profil/struktur-kepengurusan",
    "/profil/ketua-umum",
    "/profil/database-kader",
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Fetch dynamic slugs from Payload CMS
  const [news, events, opinions, announcements] = await Promise.all([
    getNewsSlugs(),
    getEventSlugs(),
    getOpinionSlugs(),
    getAnnouncementSlugs(),
  ]);

  const newsRoutes = news.map((item) => ({
    url: `${siteUrl}/informasi/berita/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const eventRoutes = events.map((item) => ({
    url: `${siteUrl}/informasi/agenda/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const opinionRoutes = opinions.map((item) => ({
    url: `${siteUrl}/informasi/gagasan-kader/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const announcementRoutes = announcements.map((item) => ({
    url: `${siteUrl}/informasi/pengumuman/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...newsRoutes,
    ...eventRoutes,
    ...opinionRoutes,
    ...announcementRoutes,
  ];
}

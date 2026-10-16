/**
 * lib/cms.ts
 * ─────────────────────────────────────────────────────────────────
 * Semua fungsi query ke Payload CMS untuk digunakan oleh Server
 * Components. Menggunakan Payload `getPayload()` secara langsung
 * (bukan HTTP fetch) agar tidak ada overhead round-trip jaringan.
 * ─────────────────────────────────────────────────────────────────
 */

import config from "@payload-config";
import { getPayload } from "payload";
import type { Where } from "payload";

type PayloadClient = Awaited<ReturnType<typeof getPayload>>;
type CmsDoc = Record<string, string> & {
  author?: { name?: string } | string | null;
  batchYear?: number;
  coverImage?: unknown;
  file?: unknown;
  heroImage?: unknown;
  homepage?: Record<string, unknown>;
  id?: string;
  image?: unknown;
  photo?: unknown;
};
type CmsFindResult<TDoc extends CmsDoc = CmsDoc> = {
  docs: TDoc[];
  page: number;
  totalDocs: number;
  totalPages: number;
  [key: string]: unknown;
};
type SlugDoc = { slug: string };

const parsedCmsTimeout = Number(process.env.CMS_QUERY_TIMEOUT_MS);
const CMS_TIMEOUT_MS = Number.isFinite(parsedCmsTimeout)
  ? parsedCmsTimeout
  : 5000;
const parsedCmsRetryCooldown = Number(process.env.CMS_RETRY_COOLDOWN_MS);
const CMS_RETRY_COOLDOWN_MS = Number.isFinite(parsedCmsRetryCooldown)
  ? parsedCmsRetryCooldown
  : 30000;
const PAYLOAD_CACHE_VERSION = 3;

// Global cache object to persist singleton across Hot Module Replacements (HMR)
interface CachedPayload {
  version: number;
  client: PayloadClient | null;
  promise: Promise<PayloadClient> | null;
  unavailableUntil?: number;
}

const globalForPayload = globalThis as typeof globalThis & {
  payload?: CachedPayload;
};

let cached = globalForPayload.payload;

if (!cached || cached.version !== PAYLOAD_CACHE_VERSION) {
  cached = globalForPayload.payload = {
    version: PAYLOAD_CACHE_VERSION,
    client: null,
    promise: null,
  };
}

const payloadCache: CachedPayload = cached;

function emptyResult<TDoc extends CmsDoc = CmsDoc>(): CmsFindResult<TDoc> {
  return { docs: [], totalDocs: 0, totalPages: 0, page: 1 };
}

async function withTimeout<T>(
  promise: Promise<T>,
  label: string,
  timeoutMs = CMS_TIMEOUT_MS
): Promise<T> {
  let timeout: ReturnType<typeof setTimeout> | undefined;

  const timeoutPromise = new Promise<never>((_, reject) => {
    timeout = setTimeout(() => {
      reject(new Error(`${label} timed out after ${timeoutMs}ms`));
    }, timeoutMs);
  });

  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    if (timeout) clearTimeout(timeout);
  }
}

function guardPayloadFind(client: PayloadClient): PayloadClient {
  const guardedClient = client as PayloadClient & { __hmiFindGuarded?: boolean };

  if (guardedClient.__hmiFindGuarded) {
    return client;
  }

  const originalFind = client.find.bind(client) as PayloadClient["find"];

  guardedClient.find = (async (options: Parameters<PayloadClient["find"]>[0]) => {
    const collectionLabel =
      typeof options === "object" &&
      options !== null &&
      "collection" in options &&
      typeof options.collection === "string"
        ? options.collection
        : "collection";

    return withTimeout(
      originalFind(options as never),
      `Payload find ${collectionLabel}`
    );
  }) as PayloadClient["find"];

  guardedClient.__hmiFindGuarded = true;
  return client;
}

/** Singleton Payload instance with global caching */
async function getPayloadClient(): Promise<PayloadClient> {
  if (payloadCache.client) {
    return payloadCache.client;
  }

  if (
    payloadCache.unavailableUntil &&
    payloadCache.unavailableUntil > Date.now()
  ) {
    throw new Error("Payload is temporarily unavailable");
  }

  if (!payloadCache.promise) {
    payloadCache.promise = withTimeout(
      getPayload({ config }),
      "Payload initialization"
    ).then(guardPayloadFind);
  }

  try {
    payloadCache.client = await payloadCache.promise;
    payloadCache.unavailableUntil = undefined;
  } catch (error) {
    payloadCache.promise = null;
    payloadCache.unavailableUntil = Date.now() + CMS_RETRY_COOLDOWN_MS;
    throw error;
  }

  return payloadCache.client;
}

// ─────────────────────────────────────────────────────────────────
// SITE SETTINGS
// ─────────────────────────────────────────────────────────────────

export async function getSiteSettings(): Promise<CmsDoc | null> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "site-settings",
      limit: 1,
      depth: 2,
      overrideAccess: true,
    });
    return (result.docs[0] as CmsDoc | undefined) ?? null;
  } catch {
    return null;
  }
}

// ─────────────────────────────────────────────────────────────────
// NEWS / BERITA
// ─────────────────────────────────────────────────────────────────

export type GetNewsOptions = {
  limit?: number;
  page?: number;
  category?: string;
  featured?: boolean;
};

export async function getNews(options: GetNewsOptions = {}): Promise<CmsFindResult> {
  try {
    const payload = await getPayloadClient();
    const { limit = 12, page = 1, category, featured } = options;

    const where: Where = {
      status: { equals: "published" },
    };
    if (category) where.category = { equals: category };
    if (featured !== undefined) where.featured = { equals: featured };

    const result = await payload.find({
      collection: "news",
      limit,
      page,
      where,
      sort: "-publishedAt",
      depth: 1,
    });
    return result as CmsFindResult;
  } catch {
    return emptyResult();
  }
}

export async function getNewsBySlug(slug: string): Promise<CmsDoc | null> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "news",
      limit: 1,
      where: {
        slug: { equals: slug },
      },
      depth: 2,
    });
    return (result.docs[0] as CmsDoc | undefined) ?? null;
  } catch {
    return null;
  }
}

export async function getNewsSlugs(): Promise<SlugDoc[]> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "news",
      limit: 1000,
      where: { status: { equals: "published" } },
      select: { slug: true } as never,
    });
    return (result.docs as CmsDoc[]).map((d) => ({ slug: d.slug as string }));
  } catch {
    return [];
  }
}

// ─────────────────────────────────────────────────────────────────
// EVENTS / AGENDA
// ─────────────────────────────────────────────────────────────────

export type GetEventsOptions = {
  limit?: number;
  page?: number;
  status?: string;
  featured?: boolean;
};

export async function getEvents(options: GetEventsOptions = {}): Promise<CmsFindResult> {
  try {
    const payload = await getPayloadClient();
    const { limit = 12, page = 1, status, featured } = options;

    const where: Where = {
      isPublished: { equals: true },
    };
    if (status) where.status = { equals: status };
    if (featured !== undefined) where.featured = { equals: featured };

    const result = await payload.find({
      collection: "events",
      limit,
      page,
      where,
      sort: "-date",
      depth: 1,
    });
    return result as CmsFindResult;
  } catch {
    return emptyResult();
  }
}

export async function getEventBySlug(slug: string): Promise<CmsDoc | null> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "events",
      limit: 1,
      where: { slug: { equals: slug } },
      depth: 2,
    });
    return (result.docs[0] as CmsDoc | undefined) ?? null;
  } catch {
    return null;
  }
}

export async function getEventSlugs(): Promise<SlugDoc[]> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "events",
      limit: 1000,
      where: { isPublished: { equals: true } },
      select: { slug: true } as never,
    });
    return (result.docs as CmsDoc[]).map((d) => ({ slug: d.slug as string }));
  } catch {
    return [];
  }
}

// ─────────────────────────────────────────────────────────────────
// OPINIONS / GAGASAN KADER
// ─────────────────────────────────────────────────────────────────

export type GetOpinionsOptions = {
  limit?: number;
  page?: number;
  category?: string;
};

export async function getOpinions(options: GetOpinionsOptions = {}): Promise<CmsFindResult> {
  try {
    const payload = await getPayloadClient();
    const { limit = 12, page = 1, category } = options;

    const where: Where = {
      status: { equals: "published" },
    };
    if (category) where.category = { equals: category };

    const result = await payload.find({
      collection: "opinions",
      limit,
      page,
      where,
      sort: "-publishedAt",
      depth: 1,
    });
    return result as CmsFindResult;
  } catch {
    return emptyResult();
  }
}

export async function getOpinionBySlug(slug: string): Promise<CmsDoc | null> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "opinions",
      limit: 1,
      where: { slug: { equals: slug } },
      depth: 2,
    });
    return (result.docs[0] as CmsDoc | undefined) ?? null;
  } catch {
    return null;
  }
}

export async function getOpinionSlugs(): Promise<SlugDoc[]> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "opinions",
      limit: 1000,
      where: { status: { equals: "published" } },
      select: { slug: true } as never,
    });
    return (result.docs as CmsDoc[]).map((d) => ({ slug: d.slug as string }));
  } catch {
    return [];
  }
}

// ─────────────────────────────────────────────────────────────────
// GALLERY / GALERI
// ─────────────────────────────────────────────────────────────────

export type GetGalleryOptions = {
  limit?: number;
  page?: number;
  category?: string;
};

export async function getGallery(options: GetGalleryOptions = {}): Promise<CmsFindResult> {
  try {
    const payload = await getPayloadClient();
    const { limit = 20, page = 1, category } = options;

    const where: Where = {
      isPublished: { equals: true },
    };
    if (category) where.category = { equals: category };

    const result = await payload.find({
      collection: "gallery",
      limit,
      page,
      where,
      sort: "-date",
      depth: 2,
    });
    return result as CmsFindResult;
  } catch {
    return emptyResult();
  }
}

// ─────────────────────────────────────────────────────────────────
// DOCUMENTS / DOKUMEN
// ─────────────────────────────────────────────────────────────────

export type GetDocumentsOptions = {
  limit?: number;
  page?: number;
  category?: string;
  access?: "public" | "kader" | "admin";
};

export async function getDocuments(options: GetDocumentsOptions = {}): Promise<CmsFindResult> {
  try {
    const payload = await getPayloadClient();
    const { limit = 20, page = 1, category, access } = options;

    const where: Where = {};
    if (category) where.category = { equals: category };
    if (access) where.access = { equals: access };

    const result = await payload.find({
      collection: "documents",
      limit,
      page,
      where,
      sort: "-updatedAt",
      depth: 2,
    });
    return result as CmsFindResult;
  } catch {
    return emptyResult();
  }
}

// ─────────────────────────────────────────────────────────────────
// CADRES / DATABASE KADER
// ─────────────────────────────────────────────────────────────────

export type GetCadresOptions = {
  limit?: number;
  page?: number;
  studyProgram?: string;
  cadreStatus?: string;
  batchYear?: number;
};

export async function getCadres(options: GetCadresOptions = {}): Promise<CmsFindResult> {
  try {
    const payload = await getPayloadClient();
    const { limit = 50, page = 1, studyProgram, cadreStatus, batchYear } = options;

    const where: Where = {
      isPublic: { equals: true },
    };
    if (studyProgram) where.studyProgram = { equals: studyProgram };
    if (cadreStatus) where.cadreStatus = { equals: cadreStatus };
    if (batchYear) where.batchYear = { equals: batchYear };

    const result = await payload.find({
      collection: "cadres",
      limit,
      page,
      where,
      sort: "-batchYear",
      depth: 0,
      overrideAccess: true,
    });
    return result as CmsFindResult;
  } catch {
    return emptyResult();
  }
}

// ─────────────────────────────────────────────────────────────────
// ORGANIZATION STRUCTURE / STRUKTUR KEPENGURUSAN
// ─────────────────────────────────────────────────────────────────

export async function getOrganizationStructure(period?: string): Promise<CmsDoc[]> {
  try {
    const payload = await getPayloadClient();
    const where: Where = {};
    if (period) where.period = { equals: period };

    const result = await payload.find({
      collection: "organization-structure",
      limit: 100,
      where,
      sort: "order",
      depth: 2,
      overrideAccess: true,
    });
    return result.docs as CmsDoc[];
  } catch {
    return [];
  }
}

// ─────────────────────────────────────────────────────────────────
// FORMER CHAIRPERSONS / MANTAN KETUA UMUM
// ─────────────────────────────────────────────────────────────────

export async function getFormerChairpersons(): Promise<CmsDoc[]> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "former-chairpersons",
      limit: 100,
      sort: "-order",
      depth: 2,
    });
    return result.docs as CmsDoc[];
  } catch {
    return [];
  }
}

// ─────────────────────────────────────────────────────────────────
// ANNOUNCEMENTS / PENGUMUMAN
// ─────────────────────────────────────────────────────────────────

export type GetAnnouncementsOptions = {
  limit?: number;
  page?: number;
};

export async function getAnnouncements(options: GetAnnouncementsOptions = {}): Promise<CmsFindResult> {
  try {
    const payload = await getPayloadClient();
    const { limit = 20, page = 1 } = options;
    const result = await payload.find({
      collection: "announcements",
      limit,
      page,
      where: { status: { equals: "published" } },
      sort: "-publishedAt",
      depth: 1,
    });
    return result as CmsFindResult;
  } catch {
    return emptyResult();
  }
}

export async function getAnnouncementBySlug(slug: string): Promise<CmsDoc | null> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "announcements",
      limit: 1,
      where: { slug: { equals: slug } },
      depth: 2,
    });
    return (result.docs[0] as CmsDoc | undefined) ?? null;
  } catch {
    return null;
  }
}

export async function getAnnouncementSlugs(): Promise<SlugDoc[]> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "announcements",
      limit: 1000,
      where: { status: { equals: "published" } },
      select: { slug: true } as never,
    });
    return (result.docs as CmsDoc[]).map((d) => ({ slug: d.slug as string }));
  } catch {
    return [];
  }
}

// ─────────────────────────────────────────────────────────────────
// PROGRAMS / PROGRAM KERJA
// ─────────────────────────────────────────────────────────────────

export async function getPrograms(department?: string): Promise<CmsDoc[]> {
  try {
    const payload = await getPayloadClient();
    const where: Where = {
      isActive: { equals: true },
    };
    if (department) where.department = { equals: department };

    const result = await payload.find({
      collection: "programs",
      limit: 100,
      where,
      sort: "order",
      depth: 2,
    });
    return result.docs as CmsDoc[];
  } catch {
    return [];
  }
}

// ─────────────────────────────────────────────────────────────────
// BANNERS
// ─────────────────────────────────────────────────────────────────

export async function getBanners(placement?: string): Promise<CmsDoc[]> {
  try {
    const payload = await getPayloadClient();
    const where: Where = {
      isActive: { equals: true },
    };
    if (placement) where.placement = { equals: placement };

    const result = await payload.find({
      collection: "banners",
      limit: 20,
      where,
      sort: "order",
      depth: 2,
    });
    return result.docs as CmsDoc[];
  } catch {
    return [];
  }
}

// ─────────────────────────────────────────────────────────────────
// HELPERS — MEDIA URL
// ─────────────────────────────────────────────────────────────────

/**
 * Ambil URL dari field media (bisa berupa string URL atau objek Media).
 * Jika tidak ada, kembalikan fallback.
 */
export function getMediaUrl(
  media: unknown,
  fallback = ""
): string {
  if (!media) return fallback;
  if (typeof media === "string") return media;
  if (typeof media === "object" && media !== null) {
    const m = media as Record<string, unknown>;
    if (typeof m.url === "string") return m.url;
    if (typeof m.filename === "string") return `/media/${m.filename}`;
  }
  return fallback;
}

/**
 * Format tanggal Payload (ISO string) ke format Indonesia.
 */
export function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return "";
  try {
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(dateString));
  } catch {
    return dateString;
  }
}

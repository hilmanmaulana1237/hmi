/**
 * scripts/seed.mjs
 * ─────────────────────────────────────────────────────────────────
 * Seed script dalam format ESM (.mjs) agar kompatibel dengan
 * Payload yang menggunakan ESM. Jalankan dengan:
 *   node --env-file=.env.local scripts/seed.mjs
 * ─────────────────────────────────────────────────────────────────
 */

// Process env sudah di-load oleh --env-file flag
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import { getPayload } from "payload";

// Dynamic import config karena Payload config menggunakan @payload-config alias
// yang di-resolve oleh next. Fallback: import langsung
let config;
try {
  const mod = await import("../payload.config.js");
  config = mod.default;
} catch {
  // Try .ts path with tsx transformer
  const mod = await import("../payload.config.ts");
  config = mod.default;
}

async function seed() {
  console.log("🌱 Memulai seed database...\n");
  
  const payload = await getPayload({ config });

  // ── 1. Check DB connection ─────────────────────────────────────
  console.log("✓ Terhubung ke database\n");

  // ── 2. Super Admin ────────────────────────────────────────────
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
      console.log("   ✓ Super admin dibuat");
    } else {
      console.log("   ⏭  Admin sudah ada");
    }
  } catch (e) {
    console.error("   ✗ Gagal buat admin:", e.message);
  }

  console.log("\n✅ Seed selesai!");
  console.log("\n📋 Buka: http://localhost:3000/admin");
  console.log("   Login: admin@hmisaintek.org / HMISaintek2026!");
  
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed gagal:", err);
  process.exit(1);
});

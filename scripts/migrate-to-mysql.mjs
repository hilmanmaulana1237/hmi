/**
 * scripts/migrate-to-mysql.mjs
 * ─────────────────────────────────────────────────────────────────
 * Script migrasi otomatis dari PostgreSQL (Neon / Supabase) ke MySQL
 * 
 * Cara Penggunaan:
 *   node scripts/migrate-to-mysql.mjs
 * ─────────────────────────────────────────────────────────────────
 */

import pg from "pg";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });
if (!process.env.DATABASE_URL) {
  dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
}

const pgUrl = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;

const mysqlConfig = {
  host: process.env.MYSQL_HOST || "localhost",
  port: Number(process.env.MYSQL_PORT) || 3306,
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "",
  database: process.env.MYSQL_DATABASE || "hmi_saintek",
  multipleStatements: true,
};

async function main() {
  console.log("=====================================================");
  console.log("🚀 MEMULAI MIGRASI DATABASE NEON (POSTGRES) -> MYSQL");
  console.log("=====================================================\n");

  console.log(`1. Target MySQL Server: ${mysqlConfig.user}@${mysqlConfig.host}:${mysqlConfig.port}/${mysqlConfig.database}`);
  
  let mysqlConn;
  try {
    // Connect to MySQL server without database first to ensure database exists
    const rootConn = await mysql.createConnection({
      host: mysqlConfig.host,
      port: mysqlConfig.port,
      user: mysqlConfig.user,
      password: mysqlConfig.password,
    });

    await rootConn.query(`CREATE DATABASE IF NOT EXISTS \`${mysqlConfig.database}\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
    await rootConn.end();

    mysqlConn = await mysql.createConnection(mysqlConfig);
    console.log("   ✓ Terhubung ke MySQL dengan sukses!");
  } catch (err) {
    console.error("   ✗ Gagal terhubung ke MySQL:", err.message);
    console.error("   Pastikan XAMPP / Laragon / service MySQL Anda sedang berjalan.");
    process.exit(1);
  }

  // 2. Jalankan skema MySQL jika ada file schema.mysql.sql
  const schemaPath = path.resolve(process.cwd(), "schema.mysql.sql");
  if (fs.existsSync(schemaPath)) {
    console.log("\n2. Mengeksekusi tabel dari schema.mysql.sql...");
    const ddl = fs.readFileSync(schemaPath, "utf-8");
    await mysqlConn.query(ddl);
    console.log("   ✓ Struktur tabel MySQL siap!");
  }

  // 3. Hubungkan ke PostgreSQL (Neon)
  if (!pgUrl) {
    console.log("\n⚠️  Tidak ada DATABASE_URL PostgreSQL di .env. Menghentikan salin data.");
    await mysqlConn.end();
    return;
  }

  console.log("\n3. Menghubungkan ke database PostgreSQL (Neon)...");
  const pgClient = new pg.Client({
    connectionString: pgUrl,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await pgClient.connect();
    console.log("   ✓ Terhubung ke PostgreSQL (Neon)!");

    // Migrasi lk1_registrations
    console.log("\n4. Mentransfer data pendaftaran LK-I...");
    try {
      const { rows } = await pgClient.query(`SELECT * FROM "public"."lk1_registrations"`);
      console.log(`   Ditemukan ${rows.length} pendaftaran.`);

      for (const row of rows) {
        const query = `
          INSERT INTO lk1_registrations (
            registration_code, full_name, nickname, gender, birth_place, birth_date,
            whatsapp, email, address, university, faculty, study_program,
            semester, nim, class_name, motivation, organization_experience,
            photo_url, payment_proof_url, status, payment_status, submitted_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE full_name = VALUES(full_name);
        `;

        const values = [
          row.registration_code || `LK1-${row.id}`,
          row.full_name || row.fullName || "",
          row.nickname || null,
          row.gender || null,
          row.birth_place || null,
          row.birth_date || null,
          row.whatsapp || "",
          row.email || "",
          row.address || null,
          row.university || "UIN Sunan Gunung Djati Bandung",
          row.faculty || "Fakultas Sains dan Teknologi",
          row.study_program || row.studyProgram || "",
          row.semester || 1,
          row.nim || "",
          row.class_name || null,
          row.motivation || "-",
          row.organization_experience || null,
          row.photo_url || null,
          row.payment_proof_url || null,
          row.status || "Pending",
          row.payment_status || "Belum Dicek",
          row.submitted_at || new Date(),
        ];

        await mysqlConn.execute(query, values);
      }
      console.log("   ✓ Berhasil menyalin pendaftaran LK-I ke MySQL.");
    } catch (e) {
      console.warn("   ℹ Catatan tabel lk1_registrations:", e.message);
    }

    // Migrasi cadres
    console.log("\n5. Mentransfer data kader...");
    try {
      const { rows: cadresRows } = await pgClient.query(`SELECT * FROM "public"."cadres"`);
      console.log(`   Ditemukan ${cadresRows.length} data kader.`);

      for (const c of cadresRows) {
        const query = `
          INSERT INTO cadres (
            full_name, nickname, gender, university, faculty, study_program,
            nim, batch_year, cadre_status, phone_private, email_private, is_public
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
          c.full_name || c.fullName,
          c.nickname,
          c.gender,
          c.university,
          c.faculty,
          c.study_program || c.studyProgram,
          c.nim,
          c.batch_year || c.batchYear,
          c.cadre_status || c.cadreStatus || "Anggota Muda",
          c.phone_private || c.phonePrivate,
          c.email_private || c.emailPrivate,
          c.is_public ?? true,
        ];
        await mysqlConn.execute(query, values);
      }
      console.log("   ✓ Berhasil menyalin data kader ke MySQL.");
    } catch (e) {
      console.warn("   ℹ Catatan tabel cadres:", e.message);
    }

    await pgClient.end();
  } catch (err) {
    console.warn("   ⚠️ Gagal membaca dari PostgreSQL:", err.message);
  }

  await mysqlConn.end();
  console.log("\n=====================================================");
  console.log("🎉 PROSES MIGRASI KE MYSQL SELESAI!");
  console.log("=====================================================");
}

main().catch((err) => {
  console.error("Migration fatal error:", err);
  process.exit(1);
});


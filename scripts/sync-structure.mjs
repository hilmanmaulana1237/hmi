import pg from "pg";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const { Client } = pg;
const c = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function update() {
  await c.connect();
  console.log("Connected to Neon DB. Updating organization_structure without biro...");
  await c.query("DELETE FROM organization_structure;");
  
  const members = [
    ["Aisyah Nurhaliza", "Ketua Umum", "Presidium BPH", "2025-2026", "Mandataris RAK. Memimpin arah gerak strategis, penanggung jawab umum kebijakan organisasi, serta memastikan sinergi seluruh bidang fungsional.", 1, "@aisyah.nh", "bph_ketum", "ketum"],
    ["Hana Maulida", "Sekretaris Umum", "Presidium BPH", "2025-2026", "Pengendali sentral tata kelola administrasi, kearsipan persuratan, notulensi ketetapan, dan pemutakhiran basis data kader komisariat.", 2, "@hanamaulida", "bph_sekum", "sekum_bendum"],
    ["Bayu Aditya", "Bendahara Umum", "Presidium BPH", "2025-2026", "Pengelola perbendaharaan, transparansi arus kas, distribusi anggaran program kerja, serta akuntabilitas iuran anggota komisariat.", 3, "@bayuaditya", "bph_bendum", "sekum_bendum"],
    ["Maya Lestari", "Ketua Bidang PPPA", "Bidang PPPA", "2025-2026", "Memimpin siklus kaderisasi formal HMI, mengawal pelaksanaan LK-1, pendampingan follow-up, serta riset mutu pembinaan anggota.", 4, "@mayalestari", "pppa", "kabid"],
    ["Rizky Ramadhan", "Wasekum Bidang PPPA", "Bidang PPPA", "2025-2026", "Mengadministrasikan database kader baru, presensi follow-up, berkas sertifikasi kader, dan modul kurikulum perkaderan.", 5, "@rizkyramadhan", "pppa", "wasekum"],
    ["Anisa Fitri", "Koordinator Litbang & Keilmuan", "Bidang PPPA", "2025-2026", "Merancang kurikulum bacaan kader, riset evaluasi pengkaderan, serta menyelenggarakan majelis diskusi Nilai Dasar Perjuangan (NDP).", 6, "@anisafitri", "pppa", "departemen"],
    ["Muhammad Farhan", "Ketua Bidang PTKP", "Bidang PTKP", "2025-2026", "Mengawal dinamika kampus, memimpin advokasi hak-hak mahasiswa saintek, kajian isu sosial-politik, dan koordinasi lintas lembaga kemahasiswaan.", 7, "@mfarhan", "ptkp", "kabid"],
    ["Dimas Pratama", "Wasekum Bidang PTKP", "Bidang PTKP", "2025-2026", "Mengelola administrasi persuratan audiensi advokasi kampus, dokumentasi berkas aspirasi, dan relasi organisasi kemitraan.", 8, "@dimaspratama", "ptkp", "wasekum"],
    ["Ilham Saputra", "Koordinator Advokasi & Pengabdian", "Bidang PTKP", "2025-2026", "Mengoperasikan layanan helpdesk aspirasi mahasiswa dan mengoordinasikan aksi kepedulian sosial kemasyarakatan kader.", 9, "@ilhamsaputra", "ptkp", "departemen"],
    ["Fajar Nugraha", "Ketua Bidang KPP", "Bidang KPP", "2025-2026", "Mengembangkan ekosistem technopreneurship kader, pelatihan keprofesian sains & teknologi, serta kemandirian ekonomi komisariat.", 10, "@fajarnugraha", "kpp", "kabid"],
    ["Yoga Firmansyah", "Wasekum Bidang KPP", "Bidang KPP", "2025-2026", "Mencatat inventarisasi aset usaha mandiri, pembukuan unit bisnis komisariat, dan administrasi kerja sama profesional.", 11, "@yogafirmansyah", "kpp", "wasekum"],
    ["Luthfi Hakim", "Koordinator Inovasi & Sains Terapan", "Bidang KPP", "2025-2026", "Memfasilitasi inkubasi startup teknologi, pelatihan hidroponik modern, dan workshop digital tools saintifik.", 12, "@luthfihakim", "kpp", "departemen"],
    ["Salsabila Putri", "Ketua Bidang PP / Ketua KOHATI", "Bidang PP / KOHATI", "2025-2026", "Memimpin Korps HMI-Wati komisariat, mengakselerasi kepemimpinan intelektual muslimah, dan memperkuat pembinaan karakter HMI-Wati.", 13, "@salsabilaputri", "kohati", "kabid"],
    ["Citra Amalia", "Wasekum Bidang PP / Sekretaris KOHATI", "Bidang PP / KOHATI", "2025-2026", "Mengelola administrasi persuratan khusus KOHATI, database HMI-Wati aktif, dan dokumentasi agenda keperempuanan.", 14, "@citraamalia", "kohati", "wasekum"],
    ["Dea Kartika", "Bendahara KOHATI", "Bidang PP / KOHATI", "2025-2026", "Mengelola keuangan dan kas kegiatan KOHATI serta menginisiasi program penggalangan dana kreatif keperempuanan.", 15, "@deakartika", "kohati", "bendum_kohati"],
  ];

  // Check if columns exist
  const cols = await c.query("SELECT column_name FROM information_schema.columns WHERE table_name = 'organization_structure';");
  const colNames = cols.rows.map(r => r.column_name);
  const hasBidang = colNames.includes("bidang");
  const hasRoleLevel = colNames.includes("role_level");

  for (const m of members) {
    if (hasBidang && hasRoleLevel) {
      await c.query(
        'INSERT INTO organization_structure (name, position, department, period, description, "order", instagram, bidang, role_level, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW())',
        m
      );
    } else {
      await c.query(
        'INSERT INTO organization_structure (name, position, department, period, description, "order", instagram, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())',
        m.slice(0, 7)
      );
    }
  }

  console.log(`✓ Berhasil memperbarui ${members.length} pengurus (BPH + 4 Bidang Fungsional) di Neon!`);
  await c.end();
}

update().catch((e) => {
  console.error("Gagal update:", e);
  process.exit(1);
});

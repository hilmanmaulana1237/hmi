import pg from "pg";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const { Client } = pg;
const c = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const DEFAULT_VISION =
  "Terwujudnya HMI Komisariat Sains dan Teknologi UIN Sunan Gunung Djati Bandung sebagai pusat kaderisasi yang unggul, progresif, dan berintegritas dalam mencetak insan akademis, pencipta, pengabdi yang bernafaskan Islam serta mampu mengintegrasikan nilai-nilai keislaman, keilmuan, dan teknologi untuk memberikan kontribusi nyata bagi kemajuan umat, bangsa, dan peradaban.";

const DEFAULT_VISION_DESC =
  "Visi tersebut menjadi landasan bagi seluruh aktivitas organisasi dalam membangun kader yang tidak hanya memiliki kemampuan akademik yang baik, tetapi juga memiliki karakter kepemimpinan, kemampuan berpikir kritis, semangat kolaborasi, serta kepedulian terhadap persoalan sosial dan kemasyarakatan.";

const DEFAULT_ARAH_GERAK_QUOTE =
  "“Yakin Usaha Sampai (YAKUSA) menjadi motivasi pengabdian tiada henti, menyatukan keislaman, keilmuan, dan keorganisasian.”";

const DEFAULT_ARAH_GERAK_DESC =
  "Himpunan Mahasiswa Islam (HMI) Komisariat Sains dan Teknologi UIN Sunan Gunung Djati Bandung merupakan organisasi kader yang berkomitmen membentuk insan akademis, pencipta, pengabdi, dan muslim yang bernafaskan Islam serta bertanggung jawab atas terwujudnya masyarakat adil makmur yang diridhai Allah SWT.\n\nSebagai bagian dari lingkungan akademik yang berorientasi pada pengembangan ilmu pengetahuan dan teknologi, komisariat hadir untuk menjadi ruang pembelajaran, pengembangan karakter, dan penguatan kepemimpinan bagi seluruh kader. Setiap aktivitas yang dilaksanakan tidak hanya bertujuan meningkatkan kapasitas intelektual, tetapi juga menanamkan nilai-nilai keislaman, integritas, profesionalisme, dan semangat pengabdian kepada masyarakat.\n\nDengan semangat “Yakin Usaha Sampai”, HMI Komisariat Sains dan Teknologi berupaya menjadi organisasi yang adaptif terhadap perkembangan zaman tanpa meninggalkan identitas keislaman dan nilai-nilai perjuangan HMI.";

const DEFAULT_TUJUAN_HMI =
  "Terbinanya Insan Akademis, Pencipta, Pengabdi yang Bernafaskan Islam dan Bertanggung Jawab atas Terwujudnya Masyarakat Adil Makmur yang Diridhai Allah SWT.";

const DEFAULT_MISSIONS = [
  {
    title: "Memperkuat sistem kaderisasi yang berkelanjutan",
    description:
      "Mengembangkan proses kaderisasi yang sistematis, terarah, dan berlandaskan nilai-nilai keislaman serta prinsip dasar perjuangan HMI guna melahirkan kader yang memiliki integritas, loyalitas organisasi, dan semangat perjuangan yang tinggi.",
  },
  {
    title: "Membangun budaya intelektual di lingkungan komisariat",
    description:
      "Mendorong tumbuhnya tradisi diskusi, kajian ilmiah, penelitian, literasi, dan pengembangan keilmuan sebagai bentuk aktualisasi mahasiswa dalam menghadapi tantangan perkembangan sains dan teknologi.",
  },
  {
    title: "Mengembangkan kualitas sumber daya kader",
    description:
      "Memberikan ruang bagi kader untuk meningkatkan kemampuan akademik, kepemimpinan, komunikasi, manajemen organisasi, serta kemampuan berpikir kritis dan analitis sehingga mampu menjadi pribadi yang kompeten dan adaptif.",
  },
  {
    title: "Mengintegrasikan nilai Islam dengan ilmu pengetahuan dan teknologi",
    description:
      "Menjadikan ajaran Islam sebagai landasan moral dan etika dalam pengembangan ilmu pengetahuan, inovasi teknologi, serta setiap bentuk aktivitas organisasi sehingga menghasilkan kemajuan yang membawa kemaslahatan bagi masyarakat.",
  },
  {
    title: "Menumbuhkan jiwa kepemimpinan dan tanggung jawab sosial",
    description:
      "Mencetak kader yang mampu menjadi pemimpin yang amanah, visioner, dan memiliki kepedulian terhadap persoalan umat, lingkungan kampus, serta masyarakat melalui berbagai kegiatan advokasi, pengabdian, dan pemberdayaan.",
  },
  {
    title: "Mendorong kolaborasi dan inovasi organisasi",
    description:
      "Membangun budaya organisasi yang terbuka, profesional, kolaboratif, serta mampu memanfaatkan teknologi informasi untuk meningkatkan efektivitas pelayanan, komunikasi, dan pengembangan organisasi.",
  },
  {
    title: "Meningkatkan kontribusi nyata kepada masyarakat",
    description:
      "Mengoptimalkan potensi kader dalam bidang pendidikan, penelitian, sosial, lingkungan, dan teknologi melalui program-program yang memberikan dampak positif dan berkelanjutan bagi masyarakat.",
  },
];

async function main() {
  await c.connect();
  console.log("Connected to Neon DB. Setting up columns and tables...");

  // 1. Add training_batch to cadres
  await c.query(`
    ALTER TABLE cadres ADD COLUMN IF NOT EXISTS training_batch VARCHAR(255);
  `);
  console.log("✓ Added training_batch column to cadres table");

  // 2. Add vision columns to site_settings
  await c.query(`
    ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS vision_mision_vision TEXT;
    ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS vision_mision_vision_description TEXT;
    ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS vision_mision_arah_gerak_quote TEXT;
    ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS vision_mision_arah_gerak_description TEXT;
    ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS vision_mision_tujuan_hmi TEXT;
    ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS vision TEXT;
    ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS vision_description TEXT;
  `);
  console.log("✓ Added vision fields to site_settings table");

  // 3. Create site_settings_vision_mision_missions table for Payload CMS Array field
  await c.query(`
    CREATE TABLE IF NOT EXISTS site_settings_vision_mision_missions (
      _order INTEGER NOT NULL,
      _parent_id INTEGER NOT NULL REFERENCES site_settings(id) ON DELETE CASCADE,
      id VARCHAR(255) PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_site_settings_vm_missions_parent ON site_settings_vision_mision_missions(_parent_id);
    CREATE INDEX IF NOT EXISTS idx_site_settings_vm_missions_order ON site_settings_vision_mision_missions(_order);
  `);
  console.log("✓ Created/verified site_settings_vision_mision_missions table");

  // 4. Update site_settings row (id: 1) with default vision texts
  await c.query(`
    UPDATE site_settings
    SET
      vision_mision_vision = COALESCE(vision_mision_vision, $1),
      vision_mision_vision_description = COALESCE(vision_mision_vision_description, $2),
      vision_mision_arah_gerak_quote = COALESCE(vision_mision_arah_gerak_quote, $3),
      vision_mision_arah_gerak_description = COALESCE(vision_mision_arah_gerak_description, $4),
      vision_mision_tujuan_hmi = COALESCE(vision_mision_tujuan_hmi, $5),
      vision = COALESCE(vision, $1),
      vision_description = COALESCE(vision_description, $2),
      updated_at = NOW()
    WHERE id = 1;
  `, [
    DEFAULT_VISION,
    DEFAULT_VISION_DESC,
    DEFAULT_ARAH_GERAK_QUOTE,
    DEFAULT_ARAH_GERAK_DESC,
    DEFAULT_TUJUAN_HMI
  ]);
  console.log("✓ Seeded default vision text in site_settings (row 1)");

  // 5. Populate site_settings_vision_mision_missions if empty
  const countRes = await c.query("SELECT COUNT(*) FROM site_settings_vision_mision_missions WHERE _parent_id = 1");
  const count = parseInt(countRes.rows[0].count, 10);
  if (count === 0) {
    for (let i = 0; i < DEFAULT_MISSIONS.length; i++) {
      const m = DEFAULT_MISSIONS[i];
      const id = `misi_${i + 1}`;
      await c.query(`
        INSERT INTO site_settings_vision_mision_missions (_order, _parent_id, id, title, description)
        VALUES ($1, 1, $2, $3, $4)
      `, [i + 1, id, m.title, m.description]);
    }
    console.log(`✓ Inserted ${DEFAULT_MISSIONS.length} default missions into site_settings_vision_mision_missions`);
  } else {
    console.log(`ℹ missions already populated (${count} entries)`);
  }

  await c.end();
  console.log("✅ Schema setup completed successfully!");
}

main().catch(err => {
  console.error("Setup failed:", err);
  process.exit(1);
});

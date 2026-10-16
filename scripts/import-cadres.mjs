import fs from "fs";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const { Client } = pg;
const c = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const content = fs.readFileSync("dataanggota.md", "utf-8");
const lines = content.split(/\r?\n/);

const BATCHES = [
  "Aksara Bhakti",
  "INCHATER",
  "Otekan",
  "Zoton",
  "Ampau",
  "Bringka",
  "Brinka",
  "Buram",
  "Kudase",
  "Anarco",
  "Tugu Retak",
  "Sisedan",
  "Destiny",
];

const BATCH_DEFAULT_YEAR = {
  "Destiny": 2018,
  "Sisedan": 2018,
  "Tugu Retak": 2019,
  "Anarco": 2020,
  "Kudase": 2021,
  "Buram": 2021,
  "Bringka": 2022,
  "Brinka": 2022,
  "Ampau": 2023,
  "Zoton": 2024,
  "Otekan": 2024,
  "INCHATER": 2024,
  "Aksara Bhakti": 2025,
};

const KNOWN_PRODIS = [
  "Teknik Informatika",
  "Informatika",
  "IF STIMIK",
  "RPL",
  "Teknik Elektro",
  "Elektro",
  "Agroteknologi",
  "Agro",
  "Biologi",
  "Kimia",
  "Fisika",
  "Matematika",
  "Mtematika",
  "Matekmatika",
  "MTK",
  "Ekonomi Syariah",
  "Farmasi",
  "farmasi",
  "MPI",
  "MKS",
  "Muamalah",
  "MUAMALAH",
  "Hukum Keluarga",
  "HTN",
  "Ilmu Hadits",
  "PAI",
  "PIAUD",
  "Jurnalistik",
  "Jurnal",
  "JURNAL",
  "KPI",
  "PMI",
  "ILPOL",
  "Pariwisata",
  "Administrasi Publik",
  "Perbandingan Mazhab",
  "Manajemen Dakwah",
  "Manajemen",
  "Menejemen Dakwah",
  "Studi Agama Agama",
  "Aqidah Filsafat",
  "Komunikasi Penyiaran",
  "Tadris B Indonesia",
  "SPI",
  "UPI"
];

function normalizeStudyProgram(raw) {
  if (!raw) return "Teknik Informatika";
  const s = raw.trim();
  const lower = s.toLowerCase();
  if (lower === "teknik informatika" || lower === "informatika" || lower === "rpl" || lower === "if stimik") return "Teknik Informatika";
  if (lower === "teknik elektro" || lower === "elektro") return "Teknik Elektro";
  if (lower === "agroteknologi" || lower === "agro") return "Agroteknologi";
  if (lower === "biologi") return "Biologi";
  if (lower === "kimia") return "Kimia";
  if (lower === "fisika") return "Fisika";
  if (lower === "matematika" || lower === "mtematika" || lower === "matekmatika" || lower === "mtk") return "Matematika";
  if (lower === "farmasi") return "Farmasi";
  if (lower === "ekonomi syariah") return "Ekonomi Syariah";
  if (lower === "hukum keluarga") return "Hukum Keluarga";
  if (lower === "administrasi publik") return "Administrasi Publik";
  if (lower === "perbandingan mazhab") return "Perbandingan Mazhab";
  if (lower === "manajemen dakwah" || lower === "menejemen dakwah") return "Manajemen Dakwah";
  if (lower === "manajemen") return "Manajemen";
  if (lower === "jurnalistik" || lower === "jurnal") return "Jurnalistik";
  if (lower === "komunikasi penyiaran" || lower === "kpi") return "Komunikasi Penyiaran Islam";
  if (lower === "mpi") return "Manajemen Pendidikan Islam";
  if (lower === "mks") return "Manajemen Keuangan Syariah";
  if (lower === "piaud") return "Pendidikan Islam Anak Usia Dini";
  if (lower === "pai") return "Pendidikan Agama Islam";
  if (lower === "htn") return "Hukum Tata Negara";
  if (lower === "studi agama agama") return "Studi Agama-Agama";
  if (lower === "aqidah filsafat") return "Aqidah dan Filsafat Islam";
  if (lower === "tadris b indonesia") return "Tadris Bahasa Indonesia";
  if (lower === "muamalah") return "Muamalah";
  if (lower === "ilpol") return "Ilmu Politik";
  if (lower === "pmi") return "Pengembangan Masyarakat Islam";
  if (lower === "spi") return "Sejarah Peradaban Islam";
  if (lower === "pariwisata") return "Pariwisata";
  if (lower === "ilmu hadits") return "Ilmu Hadits";
  return s;
}

function getFaculty(studyProgram) {
  const saintek = [
    "Teknik Informatika",
    "Teknik Elektro",
    "Agroteknologi",
    "Biologi",
    "Kimia",
    "Fisika",
    "Matematika",
  ];
  if (saintek.includes(studyProgram)) return "Fakultas Sains dan Teknologi";
  if (["Ekonomi Syariah", "Muamalah", "MKS", "HTN", "Hukum Keluarga", "Perbandingan Mazhab", "Ilmu Hadits"].includes(studyProgram)) {
    return "Fakultas Syariah dan Hukum";
  }
  if (["PAI", "PIAUD", "MPI", "Tadris Bahasa Indonesia"].includes(studyProgram)) {
    return "Fakultas Tarbiyah dan Keguruan";
  }
  if (["Komunikasi Penyiaran Islam", "Jurnalistik", "Manajemen Dakwah", "Pengembangan Masyarakat Islam"].includes(studyProgram)) {
    return "Fakultas Dakwah dan Komunikasi";
  }
  if (["Aqidah dan Filsafat Islam", "Studi Agama-Agama", "Sejarah Peradaban Islam"].includes(studyProgram)) {
    return "Fakultas Ushuluddin";
  }
  if (["Administrasi Publik", "Ilmu Politik", "Manajemen"].includes(studyProgram)) {
    return "Fakultas Ilmu Sosial dan Ilmu Politik";
  }
  return "Fakultas Sains dan Teknologi";
}

const KNOWN_PLACES = [
  /Dsn\s+[^\b]+,\s*RT\s*\d+\s*RW\s*\d+/i,
  /Cinunuk\s+Kab\.?\s*Bandu(ng)?/i,
  /Pelabuhan\s+Ratu,\s*Cianjur/i,
  /Banjarmasin,\s*Kalimantan/i,
  /Sumat[e|r]a\s+Utara/i,
  /Sumat[e|r]a\s+Barat/i,
  /Kab\.?\s*Bandung\s+Barat/i,
  /Kab\.?\s*Bandung/i,
  /Tarogong\s+Kidul(,\s*Gar)?/i,
  /Bojong\s+Soang(,\s*Bandung)?/i,
  /Ujung\s+Berung(,\s*Bandung)?/i,
  /Arcamanik,\s*Bandung/i,
  /Cipadung,\s*Bandung/i,
  /Majalaya,\s*(Kab\.?\s*)?Bandung/i,
  /Cicalengka,\s*Bandung/i,
  /Rancaekek,\s*(Kab\.?\s*)?Bandung/i,
  /Kopo,\s*Bandung/i,
  /Gedebage,\s*Bandung/i,
  /Dago,\s*Bandung/i,
  /Soreang,\s*(Kab\.?\s*)?Bandung/i,
  /Kiaracondong,\s*Bandung/i,
  /Margahayu,\s*Bandung/i,
  /Panyileukan,\s*Bandung/i,
  /Cikutra,\s*Bandung/i,
  /Lembang,\s*Bandung/i,
  /Ciparay,\s*Bandung/i,
  /Sumedang,\s*Bandung/i,
  /Sukawening,\s*Garut/i,
  /Samarang,\s*Garut/i,
  /Malangbong,\s*Garut/i,
  /Cikajang,\s*Garut/i,
  /Cipanas,\s*Garut/i,
  /Limbangan,\s*Garut/i,
  /Cikarang,\s*Bekasi/i,
  /GBI,\s*BANDUNG/i,
  /\b(Bandung|Garut|Tasikmalaya|Cianjur|Bekasi|Bogor|Sukabumi|Subang|Sumedang|Majalengka|Purwakarta|Tangerang|Jakarta|Banten|Medan|Kendari|Kediri|Karawang|Cimahi|Riau|Padalarang|Pangandaran)\b/i
];

function parseAllMembers() {
  const parsedRows = [];

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    if (!line) continue;
    if (line.startsWith("NO ") || line.startsWith("DAFTAR DATA KADER")) {
      continue;
    }

    const matchNum = line.match(/^(\d+)\s+(.*)$/);
    if (!matchNum) continue;

    const rowNo = parseInt(matchNum[1], 10);
    let rest = matchNum[2].trim();

    rest = rest.replace(/LAKI\s*-\s*LAKI/gi, " LAKI-LAKI ");
    rest = rest.replace(/PEREMPUAN/gi, " PEREMPUAN ");
    rest = rest.replace(/\s+/g, " ").trim();

    let batch = null;
    for (const b of BATCHES) {
      const bRegex = new RegExp(`\\b${b}\\b`, "i");
      if (bRegex.test(rest)) {
        batch = b === "Brinka" ? "Bringka" : b;
        rest = rest.replace(bRegex, " ___BATCH___ ");
        break;
      }
    }

    let academicYear = null;
    const yearMatch = rest.match(/\b(201[7-9]|202[0-9])\b/);
    if (yearMatch) {
      academicYear = parseInt(yearMatch[1], 10);
      rest = rest.replace(yearMatch[0], "").trim();
    }

    if (!batch && academicYear) {
      if (academicYear === 2018) batch = "Destiny";
      else if (academicYear === 2019) batch = "Tugu Retak";
      else if (academicYear === 2020) batch = "Anarco";
      else if (academicYear === 2021) batch = "Kudase";
      else if (academicYear === 2022) batch = "Bringka";
      else if (academicYear === 2023) batch = "Ampau";
      else if (academicYear === 2024) batch = "Zoton";
      else if (academicYear === 2025) batch = "Aksara Bhakti";
    }

    const batchYear = academicYear || (batch ? BATCH_DEFAULT_YEAR[batch] : 2024) || 2024;

    let beforeBatch = rest;
    if (rest.includes("___BATCH___")) {
      const parts = rest.split("___BATCH___");
      beforeBatch = parts[0].trim();
    }

    let gender = null;
    if (/\bLAKI-LAKI\b/i.test(beforeBatch)) {
      gender = "Laki-laki";
      beforeBatch = beforeBatch.replace(/\bLAKI-LAKI\b/i, " ___GENDER___ ");
    } else if (/\bPEREMPUAN\b/i.test(beforeBatch)) {
      gender = "Perempuan";
      beforeBatch = beforeBatch.replace(/\bPEREMPUAN\b/i, " ___GENDER___ ");
    }

    let prodi = null;
    for (const kp of KNOWN_PRODIS) {
      const kpRegex = new RegExp(`\\b${kp}\\b`, "i");
      if (kpRegex.test(beforeBatch)) {
        prodi = kp;
        beforeBatch = beforeBatch.replace(kpRegex, "").trim();
        break;
      }
    }

    let name = "";
    let addressPrivate = "";

    if (beforeBatch.includes("___GENDER___")) {
      const parts = beforeBatch.split("___GENDER___");
      let nameAndPlace = parts[0].trim();

      for (const placeRegex of KNOWN_PLACES) {
        const pMatch = nameAndPlace.match(placeRegex);
        if (pMatch) {
          addressPrivate = pMatch[0].trim();
          nameAndPlace = nameAndPlace.replace(placeRegex, "").trim();
          break;
        }
      }
      name = nameAndPlace;
    } else {
      name = beforeBatch.trim();
    }

    name = name.replace(/[,\.\-\s]+$/, "").replace(/\s+/g, " ").trim();
    name = name.replace(/\s+\d+$/, "").trim();

    if (!name) continue;

    const studyProgram = normalizeStudyProgram(prodi);
    const faculty = getFaculty(studyProgram);

    parsedRows.push({
      rowNo,
      fullName: name,
      gender,
      studyProgram,
      faculty,
      university: "UIN Sunan Gunung Djati Bandung",
      batchYear,
      trainingBatch: batch,
      cadreStatus: "LK-I",
      addressPrivate: addressPrivate || null,
      notesPrivate: `Kader LK-1 Angkatan ${batch || "Saintek"} (${batchYear})`,
      isPublic: true,
    });
  }

  return parsedRows;
}

async function runImport() {
  const members = parseAllMembers();
  console.log(`📋 Total kader terbaca dari dataanggota.md: ${members.length}`);

  await c.connect();
  console.log("Connected to Neon DB. Checking existing cadres...");

  // Fetch existing cadres
  const existingRes = await c.query("SELECT id, LOWER(full_name) as lower_name, cadre_status FROM cadres");
  const existingMap = new Map();
  for (const row of existingRes.rows) {
    existingMap.set(row.lower_name.trim(), row);
  }
  console.log(`Database currently has ${existingMap.size} existing cadres.`);

  let insertedCount = 0;
  let updatedCount = 0;

  for (const m of members) {
    const key = m.fullName.toLowerCase().trim();
    const existing = existingMap.get(key);

    if (existing) {
      // Update existing record (don't overwrite 'Pengurus' or 'LK-II' if they have higher rank)
      const newStatus = existing.cadre_status === "Pengurus" || existing.cadre_status === "LK-II" || existing.cadre_status === "Alumni"
        ? existing.cadre_status
        : m.cadreStatus;

      await c.query(`
        UPDATE cadres
        SET
          gender = COALESCE(gender, $1),
          study_program = $2,
          faculty = $3,
          university = $4,
          batch_year = $5,
          training_batch = $6,
          cadre_status = $7,
          address_private = COALESCE(address_private, $8),
          notes_private = COALESCE(notes_private, $9),
          updated_at = NOW()
        WHERE id = $10
      `, [
        m.gender,
        m.studyProgram,
        m.faculty,
        m.university,
        m.batchYear,
        m.trainingBatch,
        newStatus,
        m.addressPrivate,
        m.notesPrivate,
        existing.id,
      ]);
      updatedCount++;
    } else {
      // Insert new record
      await c.query(`
        INSERT INTO cadres (
          full_name,
          gender,
          study_program,
          faculty,
          university,
          batch_year,
          training_batch,
          cadre_status,
          address_private,
          notes_private,
          is_public,
          created_at,
          updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW(), NOW())
      `, [
        m.fullName,
        m.gender,
        m.studyProgram,
        m.faculty,
        m.university,
        m.batchYear,
        m.trainingBatch,
        m.cadreStatus,
        m.addressPrivate,
        m.notesPrivate,
        m.isPublic,
      ]);
      insertedCount++;
    }
  }

  const finalCountRes = await c.query("SELECT COUNT(*) FROM cadres");
  const finalTotal = finalCountRes.rows[0].count;

  // Also update site_settings homepage_total_cadres if needed
  await c.query(`
    UPDATE site_settings
    SET homepage_total_cadres = $1, updated_at = NOW()
    WHERE id = 1
  `, [finalTotal]);

  console.log(`\n🎉 IMPORT SELESAI!`);
  console.log(`- Berhasil ditambahkan baru : ${insertedCount}`);
  console.log(`- Berhasil diperbarui       : ${updatedCount}`);
  console.log(`- Total data kader di DB     : ${finalTotal}`);

  await c.end();
}

runImport().catch(err => {
  console.error("Import failed:", err);
  process.exit(1);
});

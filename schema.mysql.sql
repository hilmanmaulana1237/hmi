-- =====================================================================
-- DATABASE SCHEMA MYSQL UNTUK HMI KOMISARIAT SAINS DAN TEKNOLOGI
-- Kompatibel dengan: MySQL 5.7 / 8.0 / MariaDB (XAMPP, Laragon, cPanel, phpMyAdmin)
-- Karakter: utf8mb4 / utf8mb4_unicode_ci
-- =====================================================================

CREATE DATABASE IF NOT EXISTS `hmi_saintek` 
DEFAULT CHARACTER SET utf8mb4 
DEFAULT COLLATE utf8mb4_unicode_ci;

USE `hmi_saintek`;

-- ---------------------------------------------------------------------
-- 1. TABEL MENTORS (MENTOR LK-I: KETUA DEMA, SEMA, HMJ, DLL)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `mentors` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `mentor_key` VARCHAR(64) UNIQUE NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `role` VARCHAR(255) NOT NULL COMMENT 'Jabatan: Ketua DEMA, Ketua SEMA, Ketua HMJ, dll',
  `faculty` VARCHAR(150) DEFAULT 'Fakultas Sains dan Teknologi',
  `study_program` VARCHAR(150) DEFAULT '',
  `batch` VARCHAR(100) DEFAULT '',
  `avatar_url` TEXT,
  `bio` TEXT,
  `guidance_focus` TEXT COMMENT 'Fokus bimbingan: Akademik, Organisasi, dll',
  `whatsapp_group_url` VARCHAR(255) NOT NULL COMMENT 'Link Grup WhatsApp Bimbingan',
  `whatsapp_number` VARCHAR(50) DEFAULT '',
  `is_active` BOOLEAN DEFAULT TRUE,
  `display_order` INT DEFAULT 0,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- 2. TABEL PENDAFTARAN LK-I (LK1 REGISTRATIONS)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `lk1_registrations` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `registration_code` VARCHAR(50) UNIQUE NOT NULL,
  `full_name` VARCHAR(255) NOT NULL,
  `nickname` VARCHAR(100),
  `gender` ENUM('Laki-laki', 'Perempuan') DEFAULT 'Laki-laki',
  `birth_place` VARCHAR(100),
  `birth_date` DATE,
  `whatsapp` VARCHAR(50) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `address` TEXT,
  `university` VARCHAR(150) NOT NULL,
  `faculty` VARCHAR(150),
  `study_program` VARCHAR(150) NOT NULL,
  `semester` INT DEFAULT 1,
  `nim` VARCHAR(50) NOT NULL,
  `class_name` VARCHAR(50),
  
  -- Mentor Bimbingan
  `mentor_id` VARCHAR(64),
  `mentor_name` VARCHAR(255),
  `mentor_role` VARCHAR(255),
  `mentor_whatsapp_group` VARCHAR(255),

  -- Motivasi & Berkas
  `motivation` TEXT NOT NULL,
  `organization_experience` TEXT,
  `interest_fields` JSON,
  `photo_url` TEXT,
  `payment_proof_url` TEXT,

  -- Status & Verifikasi
  `status` VARCHAR(50) DEFAULT 'Pending',
  `payment_status` VARCHAR(50) DEFAULT 'Belum Dicek',
  `screening_schedule` DATETIME,
  `screening_result` TEXT,
  `screening_score_btq` VARCHAR(50),
  `screening_score_hmi` VARCHAR(50),
  `screening_score_kebangsaan` VARCHAR(50),
  `screening_notes` TEXT,
  `admin_note` TEXT,
  `submitted_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  INDEX `idx_reg_code` (`registration_code`),
  INDEX `idx_email` (`email`),
  INDEX `idx_nim` (`nim`),
  INDEX `idx_mentor` (`mentor_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- 3. TABEL DATABASE KADER (CADRES)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `cadres` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `full_name` VARCHAR(255) NOT NULL,
  `nickname` VARCHAR(100),
  `gender` ENUM('Laki-laki', 'Perempuan'),
  `university` VARCHAR(150),
  `faculty` VARCHAR(150),
  `study_program` VARCHAR(150),
  `nim` VARCHAR(50),
  `batch_year` INT,
  `cadre_status` VARCHAR(50) DEFAULT 'Anggota Muda',
  `phone_private` VARCHAR(50),
  `email_private` VARCHAR(150),
  `is_public` BOOLEAN DEFAULT TRUE,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- SEED DATA CONTOH MENTOR KE DALAM MYSQL
-- ---------------------------------------------------------------------
INSERT INTO `mentors` 
(`mentor_key`, `name`, `role`, `faculty`, `study_program`, `batch`, `avatar_url`, `bio`, `guidance_focus`, `whatsapp_group_url`, `whatsapp_number`, `is_active`, `display_order`)
VALUES
('mentor-dema-fst', 'Muhammad Farhan Al-Ghifari', 'Ketua DEMA FST UIN SGD', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', 'Angkatan 2021', '/ketua-umum.jpg', 'Membimbing kader dalam kepemimpinan ormawa fakultas, diplomasi kampus, manajemen konflik organisasi, dan kiat menjaga IPK 3.8+ di jurusan teknologi.', 'Kepemimpinan Ormawa, Diplomasi Kampus & Sukses Akademik', 'https://chat.whatsapp.com/L8oJqcIbNBq8Ipje6JM38u', '087827718245', 1, 1),

('mentor-sema-fst', 'Ahmad Fauzan Ramadhan', 'Ketua SEMA FST UIN SGD', 'Fakultas Sains dan Teknologi', 'Fisika', 'Angkatan 2021', '/apple-icon.png', 'Fokus mendampingi kader dalam berpikir kritis (critical thinking), legislasi & konstitusi mahasiswa, metodologi persidangan, serta riset keilmuan sains murni.', 'Legislasi Mahasiswa, Berpikir Kritis & Riset Sains', 'https://chat.whatsapp.com/L8oJqcIbNBq8Ipje6JM38u', '087827718245', 1, 2),

('mentor-hmj-ti', 'Hilman Maulana, S.Kom.', 'Ketua HMJ Teknik Informatika', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', 'Angkatan 2022', '/icon.png', 'Membina mahasiswa baru di bidang rekayasa perangkat lunak, hackathon, persiapan karir tech industry, dan penerapan nilai Islam dalam transformasi digital.', 'Software Engineering, Karir Tech & Intelektual Digital', 'https://chat.whatsapp.com/L8oJqcIbNBq8Ipje6JM38u', '087827718245', 1, 3),

('mentor-hmj-bio', 'Nabila Azzahra Putri', 'Ketua HMJ Biologi', 'Fakultas Sains dan Teknologi', 'Biologi', 'Angkatan 2022', '/apple-icon.png', 'Mendampingi kader muslimah dalam kepemimpinan mahasiswa, riset bio-konservasi laboratorium, serta integrasi sains dan ayat-ayat kauniyah.', 'Kepemimpinan Muslimah, Riset Laboratorium & Sains Islam', 'https://chat.whatsapp.com/L8oJqcIbNBq8Ipje6JM38u', '087827718245', 1, 4),

('mentor-hmj-elektro', 'Rizky Aditya Pratama', 'Ketua HMJ Teknik Elektro', 'Fakultas Sains dan Teknologi', 'Teknik Elektro', 'Angkatan 2022', '/icon.png', 'Membimbing inovasi hardware, IoT & robotika kampus, manajemen waktu praktikum padat, dan kedisiplinan pembentukan karakter kader HMI.', 'Teknologi IoT & Robotika, Manajemen Praktikum & Karakter', 'https://chat.whatsapp.com/L8oJqcIbNBq8Ipje6JM38u', '087827718245', 1, 5),

('mentor-hmj-agro-kimia', 'Sarah Nur Aulia', 'Ketua HMJ Agroteknologi & Sains Terapan', 'Fakultas Sains dan Teknologi', 'Agroteknologi', 'Angkatan 2022', '/apple-icon.png', 'Mendampingi pemberdayaan masyarakat, riset agrikultur berkelanjutan, wirausaha mahasiswa, serta persiapan materi LK-1 dari nol.', 'Pengabdian Masyarakat, Agro-Entrepreneurship & Bimbingan LK-1', 'https://chat.whatsapp.com/L8oJqcIbNBq8Ipje6JM38u', '087827718245', 1, 6)
ON DUPLICATE KEY UPDATE `name`=VALUES(`name`), `role`=VALUES(`role`), `whatsapp_group_url`=VALUES(`whatsapp_group_url`);


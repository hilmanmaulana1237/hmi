export const cmsModules = [
  {
    title: "Website",
    description:
      "Identitas website, hero beranda, navbar, footer, halaman statis, banner, dan program.",
    owner: "Super Admin / Bidang Media",
    items: [
      {
        label: "Site Settings",
        slug: "site-settings",
        action: "Atur identitas, hero, statistik, kontak, feature toggles",
        publicPath: "/",
      },
      {
        label: "Navigasi Website",
        slug: "navigation-items",
        action: "Tambah menu navbar, dropdown, footer, shortcut admin",
        publicPath: "Navbar & Footer",
      },
      {
        label: "Pages",
        slug: "pages",
        action: "Tambah halaman statis dan SEO halaman",
        publicPath: "/profil",
      },
      {
        label: "Banners",
        slug: "banners",
        action: "Tambah banner CTA dan promosi kegiatan",
        publicPath: "Section beranda",
      },
      {
        label: "Programs",
        slug: "programs",
        action: "Tambah program kerja dan bidang",
        publicPath: "/profil",
      },
    ],
  },
  {
    title: "Informasi",
    description:
      "Publikasi resmi berupa berita, agenda, pengumuman, dan gagasan kader.",
    owner: "Ketua Umum / Bidang Media / Editor",
    items: [
      {
        label: "Berita",
        slug: "news",
        action: "Tulis, draft, publish, archive, SEO, cover image",
        publicPath: "/informasi/berita",
      },
      {
        label: "Agenda",
        slug: "events",
        action: "Jadwal, lokasi, status agenda, link pendaftaran",
        publicPath: "/informasi/agenda",
      },
      {
        label: "Gagasan Kader",
        slug: "opinions",
        action: "Artikel opini, profil penulis, kategori",
        publicPath: "/informasi/gagasan-kader",
      },
      {
        label: "Pengumuman",
        slug: "announcements",
        action: "Pengumuman resmi dan status publikasi",
        publicPath: "/informasi/pengumuman",
      },
    ],
  },
  {
    title: "Kaderisasi",
    description:
      "Database kader, pendaftar LK-I, mentor bimbingan, screening, pembayaran, struktur, dan arsip ketua.",
    owner: "Sekretaris Umum / Bidang Kaderisasi / Bendahara",
    items: [
      {
        label: "Database Kader",
        slug: "cadres",
        action: "Tambah kader, status, prodi, angkatan, proteksi data privat",
        publicPath: "/profil/database-kader",
      },
      {
        label: "Pendaftaran LK-I",
        slug: "lk1-registrations",
        action: "Verifikasi peserta, mentor pilihan, status LK-I, pembayaran, screening",
        publicPath: "/kaderisasi/daftar-lk-1",
      },
      {
        label: "Mentor LK-I",
        slug: "mentors",
        action: "Atur daftar mentor (Ketua DEMA, SEMA, HMJ, dll), foto, bio, dan link grup WhatsApp",
        publicPath: "/kaderisasi/daftar-lk-1",
      },
      {
        label: "Struktur Pengurus",
        slug: "organization-structure",
        action: "Nama, jabatan, bidang, urutan, periode",
        publicPath: "/profil/struktur-kepengurusan",
      },
      {
        label: "Mantan Ketua Umum",
        slug: "former-chairpersons",
        action: "Arsip ketua umum, periode, kutipan, deskripsi",
        publicPath: "/profil/ketua-umum",
      },
    ],
  },
  {
    title: "Media & Dokumen",
    description:
      "Upload file, galeri kegiatan, video, dokumen kaderisasi, dan administrasi.",
    owner: "Bidang Media / Sekretaris Umum / Kaderisasi",
    items: [
      {
        label: "Media",
        slug: "media",
        action: "Upload gambar, PDF, alt text, caption",
        publicPath: "Aset website",
      },
      {
        label: "Galeri",
        slug: "gallery",
        action: "Foto, video URL, kategori, tanggal, publish",
        publicPath: "/galeri",
      },
      {
        label: "Dokumen",
        slug: "documents",
        action: "File, kategori, versi, akses public/kader/admin",
        publicPath: "/layanan/pusat-dokumen",
      },
    ],
  },
  {
    title: "Layanan",
    description:
      "Advokasi PTKP, pesan kontak, tindak lanjut, audit log, dan user role.",
    owner: "PTKP / Super Admin / Ketua Umum",
    items: [
      {
        label: "Advokasi PTKP",
        slug: "advocacy-reports",
        action: "Status laporan, follow up, handler, catatan rahasia",
        publicPath: "/layanan/advokasi",
      },
      {
        label: "Pesan Kontak",
        slug: "contact-messages",
        action: "Baca pesan, status, handler, catatan balasan",
        publicPath: "/hubungi-kami",
      },
      {
        label: "Users & Role",
        slug: "users",
        action: "Tambah admin, role, aktivasi akun",
        publicPath: "/admin",
      },
      {
        label: "Audit Logs",
        slug: "audit-logs",
        action: "Lacak perubahan penting dan aktivitas admin",
        publicPath: "Internal",
      },
    ],
  },
];

export const roleGuides = [
  "Super Admin: semua fitur, user, role, setting website, audit, dan emergency edit.",
  "Ketua Umum: membaca seluruh data, mengawasi laporan, dan approve konten strategis.",
  "Sekretaris Umum: database kader, dokumen, surat, dan administrasi.",
  "Bendahara Umum: pembayaran LK-I dan verifikasi bukti pembayaran.",
  "Bidang Kaderisasi: pendaftaran LK-I, mentor bimbingan, screening, status peserta, materi.",
  "Bidang PTKP: laporan advokasi, follow up, status pengaduan.",
  "Bidang Media: berita, agenda, galeri, gagasan, pengumuman, banner.",
  "Editor: membuat draft konten tanpa kontrol publish.",
  "Viewer: hanya membaca dashboard sesuai izin.",
];

export const criticalWorkflows = [
  {
    title: "Publish berita",
    steps: "News -> create -> isi title/slug/excerpt/content -> status Published.",
  },
  {
    title: "Kelola Mentor LK-I",
    steps:
      "Mentors -> create / edit -> isi nama, jabatan (Ketua DEMA/SEMA/HMJ), foto, bio bimbingan, dan link grup WhatsApp.",
  },
  {
    title: "Verifikasi LK-I",
    steps:
      "LK1 Registrations -> buka peserta -> cek mentor pilihan, berkas/pembayaran -> update status dan admin note.",
  },
  {
    title: "Update database kader",
    steps:
      "Cadres -> tambah/edit kader -> pastikan isPublic dan data privat tidak ditampilkan publik.",
  },
  {
    title: "Tindak lanjut advokasi",
    steps:
      "Advocacy Reports -> ubah status -> isi followUps dan handledBy -> simpan catatan.",
  },
  {
    title: "Ubah tampilan beranda",
    steps:
      "Site Settings -> Kontrol Beranda + Feature Toggles, atau Banners untuk CTA visual.",
  },
  {
    title: "Kontrol menu website",
    steps:
      "Navigation Items -> tambah label/href/location/order -> aktifkan isActive.",
  },
];

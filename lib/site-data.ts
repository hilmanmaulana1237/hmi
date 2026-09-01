export const siteConfig = {
  name: "Rumah Digital HMI Komisariat Sains dan Teknologi",
  shortName: "HMI Saintek",
  organization: "HMI Komisariat Sains dan Teknologi",
  university: "UIN Sunan Gunung Djati Bandung",
  branch: "Cabang Kabupaten Bandung",
  tagline:
    "Ruang kolaborasi intelektual, kaderisasi, pengabdian, dan transformasi digital kader HMI Komisariat Sains dan Teknologi.",
  address: "Sekretariat HMI Komisariat Sains dan Teknologi, Bandung",
  email: "komt.saintek@gmail.com",
  phone: "+62 87-8277-18245",
  whatsapp: "6287827718245",
  instagram: "@hmisaintek.cakaba",
};

export const navItems = [
  { label: "Beranda", href: "/" },
  { label: "Profil", href: "/profil" },
  { label: "Informasi", href: "/informasi/berita" },
  { label: "Galeri", href: "/galeri" },
  { label: "Kaderisasi", href: "/kaderisasi/lk-1" },
  { label: "Layanan", href: "/layanan/advokasi" },
  { label: "Hubungi Kami", href: "/hubungi-kami" },
];

export const stats = [
  { label: "Total Kader", value: "420+" },
  { label: "Total Alumni", value: "180+" },
  { label: "Agenda Aktif", value: "24" },
  { label: "Publikasi", value: "96" },
  { label: "Dokumen", value: "32" },
];

export type NewsItem = {
  title: string;
  slug: string;
  category: string;
  author: string;
  date: string;
  excerpt: string;
  image: string;
  content: string[];
};

export const news: NewsItem[] = [
  {
    title: "Saintek Menggelar Diskusi Kaderisasi Berbasis Riset",
    slug: "diskusi-kaderisasi-berbasis-riset",
    category: "Kaderisasi",
    author: "Bidang Media",
    date: "12 Juni 2026",
    excerpt:
      "Forum mingguan kader membahas cara memperkuat tradisi intelektual, riset kampus, dan pengabdian sosial berbasis keilmuan.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    content: [
      "HMI Komisariat Sains dan Teknologi menggelar diskusi kaderisasi berbasis riset sebagai ruang latihan membaca persoalan kampus secara lebih metodis.",
      "Forum ini menekankan pentingnya kader HMI untuk tidak berhenti pada slogan. Setiap gagasan perlu diuji melalui data, bacaan, dan pengalaman sosial yang dekat dengan kehidupan mahasiswa.",
      "Pengurus berharap agenda rutin ini menjadi pintu masuk untuk membangun budaya menulis, berdiskusi, dan mengabdi secara lebih tertata.",
    ],
  },
  {
    title: "Rapat Kerja Komisariat Menetapkan Agenda Satu Periode",
    slug: "rapat-kerja-komisariat",
    category: "Organisasi",
    author: "Sekretaris Umum",
    date: "9 Juni 2026",
    excerpt:
      "Pengurus merumuskan prioritas program kaderisasi, advokasi, media, dan tata kelola administrasi komisariat.",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
    content: [
      "Rapat kerja komisariat menjadi forum konsolidasi awal untuk menyusun arah gerak pengurus selama satu periode.",
      "Agenda yang dibahas meliputi penguatan database kader, pendaftaran LK-I online, pengarsipan dokumen, kanal advokasi, dan peningkatan kualitas publikasi digital.",
      "Setiap bidang diarahkan untuk bekerja dengan target yang terukur tanpa meninggalkan nilai dasar perkaderan HMI.",
    ],
  },
  {
    title: "Pengurus Membuka Kanal Aspirasi Mahasiswa Saintek",
    slug: "kanal-aspirasi-mahasiswa-saintek",
    category: "PTKP",
    author: "Bidang PTKP",
    date: "7 Juni 2026",
    excerpt:
      "Layanan advokasi disiapkan untuk menghimpun aspirasi akademik, fasilitas kampus, dan isu kemahasiswaan.",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
    content: [
      "Bidang PTKP membuka kanal aspirasi mahasiswa sebagai komitmen pengurus untuk mendengar isu akademik, fasilitas, administrasi, dan ruang belajar mahasiswa.",
      "Laporan yang masuk akan dipilah berdasarkan urgensi dan ditindaklanjuti melalui komunikasi kelembagaan yang sesuai.",
      "Identitas pelapor dapat dijaga rahasia agar mahasiswa merasa aman menyampaikan aspirasi secara bertanggung jawab.",
    ],
  },
  {
    title: "Kelas Media Melatih Kader Mengelola Publikasi Organisasi",
    slug: "kelas-media-publikasi-organisasi",
    category: "Media",
    author: "Bidang Media",
    date: "4 Juni 2026",
    excerpt:
      "Kader belajar menulis rilis, mengelola dokumentasi kegiatan, dan menjaga bahasa publik organisasi agar tetap rapi.",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80",
    content: [
      "Kelas media diselenggarakan untuk memperkuat kemampuan kader dalam menulis, mendokumentasikan kegiatan, dan mengelola kanal digital komisariat.",
      "Materi pelatihan mencakup dasar penulisan berita, pengarsipan foto, desain publikasi, dan etika komunikasi organisasi.",
      "Kegiatan ini menjadi bagian dari ikhtiar transformasi digital agar kerja-kerja komisariat terdokumentasi dengan baik.",
    ],
  },
  {
    title: "Kajian Konstitusi Menguatkan Pemahaman Dasar Organisasi",
    slug: "kajian-konstitusi-hmi",
    category: "Keilmuan",
    author: "Bidang Kaderisasi",
    date: "1 Juni 2026",
    excerpt:
      "Kajian konstitusi mengajak kader memahami nilai, struktur, dan pedoman organisasi sebagai fondasi bergerak.",
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80",
    content: [
      "Kajian konstitusi menjadi ruang pembacaan ulang terhadap pedoman organisasi, tujuan HMI, dan tugas kader dalam kehidupan kampus.",
      "Kader diajak memahami konstitusi bukan hanya sebagai dokumen formal, tetapi sebagai kompas etis dalam mengambil keputusan organisasi.",
      "Forum ini akan dilanjutkan dengan diskusi tematik agar pemahaman konstitusi semakin dekat dengan praktik kepengurusan.",
    ],
  },
  {
    title: "Pengabdian Literasi Digital Dijalankan Bersama Warga",
    slug: "pengabdian-literasi-digital",
    category: "Pengabdian",
    author: "Bidang Sosial",
    date: "28 Mei 2026",
    excerpt:
      "Kader Saintek mengadakan pengabdian literasi digital sederhana untuk membantu warga mengenal keamanan data dasar.",
    image:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1200&q=80",
    content: [
      "Kader HMI Saintek melaksanakan pengabdian literasi digital bersama warga sebagai bentuk penerjemahan ilmu ke ruang sosial.",
      "Materi yang dibawakan meliputi keamanan akun, penggunaan perangkat secara bijak, dan cara mengenali informasi palsu.",
      "Program ini akan dikembangkan menjadi agenda berkala bersama komunitas lokal dan lembaga kampus.",
    ],
  },
];

export type EventItem = {
  title: string;
  slug: string;
  date: string;
  time: string;
  endTime?: string;
  location: string;
  status: "Akan Datang" | "Berlangsung" | "Selesai" | "Dibatalkan";
  excerpt: string;
  image: string;
  registrationLink?: string;
};

export const events: EventItem[] = [
  {
    title: "Latihan Kader I Gelombang Saintek",
    slug: "latihan-kader-i-gelombang-saintek",
    date: "28 Juni 2026",
    time: "08.00 WIB",
    endTime: "17.00 WIB",
    location: "Kampus UIN Sunan Gunung Djati Bandung",
    status: "Akan Datang",
    excerpt:
      "Basic Training LK-I untuk calon kader HMI Komisariat Sains dan Teknologi.",
    image:
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1200&q=80",
    registrationLink: "https://pendaftaran-lk1-saintek.vercel.app/",
  },
  {
    title: "Kajian Konstitusi HMI",
    slug: "kajian-konstitusi-hmi",
    date: "20 Juni 2026",
    time: "19.30 WIB",
    endTime: "21.30 WIB",
    location: "Sekretariat Komisariat",
    status: "Akan Datang",
    excerpt:
      "Kajian rutin untuk membaca Nilai Dasar Perjuangan dan pedoman organisasi.",
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Kelas Media dan Publikasi Kader",
    slug: "kelas-media-dan-publikasi-kader",
    date: "15 Juni 2026",
    time: "16.00 WIB",
    endTime: "18.00 WIB",
    location: "Ruang Diskusi Saintek",
    status: "Berlangsung",
    excerpt:
      "Pelatihan penulisan berita, dokumentasi, dan desain publikasi organisasi.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Bakti Sosial dan Literasi Digital",
    slug: "bakti-sosial-literasi-digital",
    date: "2 Juni 2026",
    time: "09.00 WIB",
    endTime: "14.00 WIB",
    location: "Kabupaten Bandung",
    status: "Selesai",
    excerpt:
      "Pengabdian kader melalui edukasi literasi digital dan pendampingan masyarakat.",
    image:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Sekolah Administrasi Komisariat",
    slug: "sekolah-administrasi-komisariat",
    date: "5 Juli 2026",
    time: "13.00 WIB",
    endTime: "16.00 WIB",
    location: "Sekretariat Komisariat",
    status: "Akan Datang",
    excerpt:
      "Kelas teknis pengarsipan surat, notulensi, database kader, dan tata kelola dokumen.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
  },
];

export type OpinionItem = {
  title: string;
  slug: string;
  author: string;
  prodi: string;
  status: string;
  category: string;
  date: string;
  excerpt: string;
  image: string;
  content: string[];
};

export const opinions: OpinionItem[] = [
  {
    title: "Kader Saintek dan Etika Teknologi",
    slug: "kader-saintek-dan-etika-teknologi",
    author: "Nadia Zahra",
    prodi: "Teknik Informatika",
    status: "LK-I",
    category: "Teknologi",
    date: "10 Juni 2026",
    excerpt:
      "Transformasi digital harus tetap berpijak pada nilai keislaman, keilmuan, dan keberpihakan sosial.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    content: [
      "Teknologi bukan ruang kosong nilai. Ia dibentuk oleh kepentingan, cara pandang, dan pilihan moral manusia yang mengembangkannya.",
      "Kader Saintek perlu hadir sebagai subjek yang tidak hanya mampu memakai alat digital, tetapi juga menguji dampaknya terhadap manusia dan lingkungan sosial.",
      "Di titik ini, etika teknologi menjadi bagian dari laku perkaderan: membaca, mengkritik, dan memberi manfaat.",
    ],
  },
  {
    title: "Membaca Kampus Sebagai Ruang Pengabdian",
    slug: "membaca-kampus-sebagai-ruang-pengabdian",
    author: "Rizky Maulana",
    prodi: "Matematika",
    status: "Pengurus",
    category: "Kampus",
    date: "8 Juni 2026",
    excerpt:
      "Kampus bukan hanya ruang akademik, tetapi medan latihan kepemimpinan dan tanggung jawab publik.",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80",
    content: [
      "Kampus sering dibaca hanya sebagai ruang kuliah dan indeks prestasi. Padahal di sana juga berlangsung latihan kepemimpinan, keberpihakan, dan pengabdian.",
      "HMI perlu menjaga tradisi membaca kampus secara kritis agar kader tidak tercerabut dari persoalan mahasiswa dan masyarakat di sekitarnya.",
      "Pengabdian dimulai dari kemampuan mendengar, menyusun sikap, lalu bergerak bersama secara bertanggung jawab.",
    ],
  },
  {
    title: "Yakin Usaha Sampai di Era Data",
    slug: "yakin-usaha-sampai-di-era-data",
    author: "Salsabila Nur",
    prodi: "Fisika",
    status: "LK-II",
    category: "Keilmuan",
    date: "6 Juni 2026",
    excerpt:
      "Semangat perjuangan kader perlu diterjemahkan menjadi literasi data, riset, dan kerja kolektif.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    content: [
      "Yakin Usaha Sampai bukan sekadar kalimat penutup. Ia adalah disiplin untuk menghubungkan keyakinan dengan kerja yang terukur.",
      "Di era data, kader perlu terbiasa membaca angka, melakukan riset kecil, dan menguji asumsi sebelum mengambil keputusan.",
      "Tradisi intelektual HMI akan semakin kuat ketika semangat perjuangan bertemu metode yang rapi.",
    ],
  },
  {
    title: "Kaderisasi dan Keheningan Membaca",
    slug: "kaderisasi-dan-keheningan-membaca",
    author: "Arif Fadillah",
    prodi: "Kimia",
    status: "LK-I",
    category: "Kaderisasi",
    date: "3 Juni 2026",
    excerpt:
      "Di tengah ritme organisasi yang cepat, membaca tetap menjadi ruang sunyi untuk menata sikap kader.",
    image:
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=1200&q=80",
    content: [
      "Organisasi sering menuntut kader untuk sigap bergerak. Namun gerak yang tidak dibekali bacaan mudah berubah menjadi kesibukan yang kehilangan arah.",
      "Membaca memberi jeda untuk menimbang, menghubungkan pengalaman dengan teori, dan menyusun sikap yang lebih matang.",
      "Kaderisasi perlu memberi ruang bagi keheningan semacam itu agar kader tumbuh bukan hanya aktif, tetapi juga mendalam.",
    ],
  },
  {
    title: "Ekologi, Iman, dan Tanggung Jawab Sains",
    slug: "ekologi-iman-dan-tanggung-jawab-sains",
    author: "Maya Lestari",
    prodi: "Biologi",
    status: "Pengurus",
    category: "Lingkungan",
    date: "30 Mei 2026",
    excerpt:
      "Ilmu pengetahuan perlu diarahkan untuk menjaga kehidupan, bukan sekadar mengejar efisiensi.",
    image:
      "https://images.unsplash.com/photo-1473773508845-188df298d2d1?auto=format&fit=crop&w=1200&q=80",
    content: [
      "Sains memberi manusia kemampuan memahami alam, tetapi iman mengingatkan bahwa kemampuan itu membawa tanggung jawab.",
      "Kader Saintek perlu melihat isu lingkungan sebagai bagian dari medan pengabdian, bukan sekadar topik akademik.",
      "Kampus dapat menjadi laboratorium kecil untuk membangun kebiasaan ekologis yang nyata dan menular.",
    ],
  },
  {
    title: "Administrasi Sebagai Etika Merawat Amanah",
    slug: "administrasi-sebagai-etika-merawat-amanah",
    author: "Hana Maulida",
    prodi: "Agroteknologi",
    status: "Sekretaris",
    category: "Organisasi",
    date: "26 Mei 2026",
    excerpt:
      "Administrasi yang rapi adalah cara sederhana organisasi menjaga ingatan dan tanggung jawab.",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80",
    content: [
      "Administrasi sering dianggap pekerjaan teknis, padahal di dalamnya ada etika menjaga amanah organisasi.",
      "Surat, notulensi, database, dan dokumen kegiatan adalah ingatan kolektif yang membantu pengurus berikutnya bergerak lebih baik.",
      "Digitalisasi administrasi menjadi penting agar arsip komisariat tidak hilang bersama pergantian periode.",
    ],
  },
];

export type GalleryItem = {
  title: string;
  category: string;
  type: "Foto" | "Video";
  image: string;
  date: string;
};

export const gallery: GalleryItem[] = [
  {
    title: "Forum diskusi kader",
    category: "Kaderisasi",
    type: "Foto",
    date: "12 Juni 2026",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Rapat program kerja",
    category: "Organisasi",
    type: "Foto",
    date: "9 Juni 2026",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Kajian dan literasi",
    category: "Keilmuan",
    type: "Foto",
    date: "7 Juni 2026",
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Pengabdian masyarakat",
    category: "Sosial",
    type: "Foto",
    date: "2 Juni 2026",
    image:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Kelas media komisariat",
    category: "Media",
    type: "Foto",
    date: "30 Mei 2026",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Konsolidasi bidang",
    category: "Organisasi",
    type: "Foto",
    date: "24 Mei 2026",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Video dokumenter LK-I",
    category: "Kaderisasi",
    type: "Video",
    date: "20 Mei 2026",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Cuplikan dialog publik",
    category: "PTKP",
    type: "Video",
    date: "18 Mei 2026",
    image:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Pelatihan administrasi",
    category: "Administrasi",
    type: "Foto",
    date: "12 Mei 2026",
    image:
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Aksi bersih ruang diskusi",
    category: "Sosial",
    type: "Foto",
    date: "8 Mei 2026",
    image:
      "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Video kelas kepemimpinan",
    category: "Keilmuan",
    type: "Video",
    date: "4 Mei 2026",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Dokumentasi silaturahmi alumni",
    category: "Alumni",
    type: "Foto",
    date: "28 April 2026",
    image:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=900&q=80",
  },
];

export type DocumentItem = {
  title: string;
  category:
    | "Materi LK-I"
    | "Materi LK-II"
    | "Konstitusi HMI"
    | "Administrasi"
    | "Surat"
    | "Pedoman Organisasi";
  access: "public" | "kader" | "admin";
  desc: string;
  updatedAt: string;
  fileName: string;
  fileUrl?: string;
};

export const documents: DocumentItem[] = [
  {
    title: "Konstitusi HMI",
    category: "Konstitusi HMI",
    access: "public",
    desc: "Dokumen dasar organisasi untuk rujukan nilai, struktur, dan aturan HMI.",
    updatedAt: "12 Juni 2026",
    fileName: "konstitusi-hmi.pdf",
  },
  {
    title: "Materi Pengantar LK-I",
    category: "Materi LK-I",
    access: "public",
    desc: "Bahan bacaan awal calon peserta Basic Training LK-I.",
    updatedAt: "10 Juni 2026",
    fileName: "materi-pengantar-lk1.pdf",
  },
  {
    title: "Nilai Dasar Perjuangan",
    category: "Materi LK-I",
    access: "kader",
    desc: "Materi pendalaman NDP untuk forum follow up kader.",
    updatedAt: "9 Juni 2026",
    fileName: "nilai-dasar-perjuangan.pdf",
  },
  {
    title: "Template Surat Komisariat",
    category: "Surat",
    access: "admin",
    desc: "Format administrasi dan persuratan pengurus komisariat.",
    updatedAt: "7 Juni 2026",
    fileName: "template-surat-komisariat.docx",
  },
  {
    title: "Pedoman Database Kader",
    category: "Administrasi",
    access: "admin",
    desc: "Panduan pengelolaan data kader secara aman dan bertanggung jawab.",
    updatedAt: "5 Juni 2026",
    fileName: "pedoman-database-kader.pdf",
  },
  {
    title: "Pedoman Organisasi Komisariat",
    category: "Pedoman Organisasi",
    access: "public",
    desc: "Ringkasan alur koordinasi, bidang kerja, dan kalender organisasi.",
    updatedAt: "1 Juni 2026",
    fileName: "pedoman-organisasi-komisariat.pdf",
  },
];

export type CadreItem = {
  fullName: string;
  studyProgram: string;
  cadreStatus:
    | "Anggota Muda"
    | "LK-I"
    | "LK-II"
    | "LK-III"
    | "Pengurus"
    | "Alumni";
  batchYear: number;
};

export const cadres: CadreItem[] = [
  { fullName: "Aisyah Nurhaliza", studyProgram: "Teknik Informatika", cadreStatus: "Pengurus", batchYear: 2022 },
  { fullName: "Muhammad Farhan", studyProgram: "Matematika", cadreStatus: "LK-II", batchYear: 2021 },
  { fullName: "Salsabila Putri", studyProgram: "Fisika", cadreStatus: "LK-I", batchYear: 2023 },
  { fullName: "Rizky Ramadhan", studyProgram: "Kimia", cadreStatus: "Anggota Muda", batchYear: 2024 },
  { fullName: "Maya Lestari", studyProgram: "Biologi", cadreStatus: "Pengurus", batchYear: 2022 },
  { fullName: "Ilham Saputra", studyProgram: "Teknik Elektro", cadreStatus: "LK-I", batchYear: 2023 },
  { fullName: "Nadia Zahra", studyProgram: "Teknik Informatika", cadreStatus: "LK-I", batchYear: 2024 },
  { fullName: "Arif Fadillah", studyProgram: "Kimia", cadreStatus: "LK-II", batchYear: 2021 },
  { fullName: "Hana Maulida", studyProgram: "Agroteknologi", cadreStatus: "Pengurus", batchYear: 2022 },
  { fullName: "Dimas Pratama", studyProgram: "Matematika", cadreStatus: "Alumni", batchYear: 2019 },
  { fullName: "Citra Amalia", studyProgram: "Biologi", cadreStatus: "LK-III", batchYear: 2020 },
  { fullName: "Fajar Nugraha", studyProgram: "Fisika", cadreStatus: "LK-I", batchYear: 2023 },
  { fullName: "Luthfi Hakim", studyProgram: "Teknik Informatika", cadreStatus: "Anggota Muda", batchYear: 2025 },
  { fullName: "Dea Kartika", studyProgram: "Agroteknologi", cadreStatus: "LK-I", batchYear: 2024 },
  { fullName: "Bayu Aditya", studyProgram: "Teknik Elektro", cadreStatus: "Pengurus", batchYear: 2022 },
  { fullName: "Siti Rahmah", studyProgram: "Matematika", cadreStatus: "LK-II", batchYear: 2021 },
  { fullName: "Yoga Firmansyah", studyProgram: "Fisika", cadreStatus: "Alumni", batchYear: 2018 },
  { fullName: "Anisa Fitri", studyProgram: "Kimia", cadreStatus: "Pengurus", batchYear: 2022 },
  { fullName: "Fikri Maulana", studyProgram: "Biologi", cadreStatus: "LK-I", batchYear: 2023 },
  { fullName: "Rara Sekar", studyProgram: "Teknik Informatika", cadreStatus: "LK-III", batchYear: 2020 },
];

export type StructureMember = {
  name: string;
  position: string;
  department: string;
  period: string;
  description: string;
};

export const organizationStructure: StructureMember[] = [
  {
    name: "Aisyah Nurhaliza",
    position: "Ketua Umum",
    department: "Presidium",
    period: "2025-2026",
    description: "Memimpin arah gerak komisariat dan memastikan koordinasi lintas bidang.",
  },
  {
    name: "Hana Maulida",
    position: "Sekretaris Umum",
    department: "Sekretariat",
    period: "2025-2026",
    description: "Mengelola administrasi, arsip, surat, dan basis data organisasi.",
  },
  {
    name: "Bayu Aditya",
    position: "Bendahara Umum",
    department: "Keuangan",
    period: "2025-2026",
    description: "Mengelola tata keuangan, iuran, dan pelaporan kas komisariat.",
  },
  {
    name: "Maya Lestari",
    position: "Ketua Bidang Kaderisasi",
    department: "Kaderisasi",
    period: "2025-2026",
    description: "Mengawal LK-I, follow up, dan pembinaan anggota muda.",
  },
  {
    name: "Muhammad Farhan",
    position: "Ketua Bidang PTKP",
    department: "PTKP",
    period: "2025-2026",
    description: "Mengelola kanal advokasi, aspirasi, dan kajian isu kemahasiswaan.",
  },
  {
    name: "Nadia Zahra",
    position: "Ketua Bidang Media",
    department: "Media dan Komunikasi",
    period: "2025-2026",
    description: "Mengelola publikasi, dokumentasi, dan kanal digital komisariat.",
  },
  {
    name: "Anisa Fitri",
    position: "Koordinator Keilmuan",
    department: "Kaderisasi",
    period: "2025-2026",
    description: "Menyusun forum kajian, diskusi tematik, dan kurikulum bacaan kader.",
  },
  {
    name: "Ilham Saputra",
    position: "Koordinator Pengabdian",
    department: "Sosial Masyarakat",
    period: "2025-2026",
    description: "Merancang program pengabdian sosial berbasis keilmuan saintek.",
  },
];

export const formerChairpersons = [
  {
    name: "Ahmad Fauzi",
    period: "2016-2017",
    quote: "Kaderisasi adalah napas panjang organisasi.",
    description: "Menguatkan tradisi follow up dan forum diskusi dasar.",
  },
  {
    name: "Rina Marlina",
    period: "2017-2018",
    quote: "Administrasi rapi membuat perjuangan mudah diwariskan.",
    description: "Memulai pengarsipan surat dan dokumen komisariat secara lebih tertata.",
  },
  {
    name: "Dede Firmansyah",
    period: "2018-2019",
    quote: "Ilmu harus turun menjadi pengabdian.",
    description: "Mengembangkan program pengabdian masyarakat lintas prodi.",
  },
  {
    name: "Nur Aulia",
    period: "2019-2020",
    quote: "Kampus adalah ruang belajar keberpihakan.",
    description: "Memperkuat kanal advokasi dan kajian isu kemahasiswaan.",
  },
  {
    name: "Reza Ramadhan",
    period: "2020-2021",
    quote: "Digitalisasi adalah alat, nilai tetap kompas.",
    description: "Mendorong adaptasi kegiatan organisasi pada masa pembelajaran daring.",
  },
  {
    name: "Fitri Handayani",
    period: "2021-2022",
    quote: "HMI tumbuh dari kader yang tekun belajar.",
    description: "Membuka kelas literasi dan penulisan kader.",
  },
  {
    name: "Gilang Prakoso",
    period: "2022-2023",
    quote: "Periode boleh selesai, pengabdian tetap berjalan.",
    description: "Menghubungkan jejaring alumni dengan pengurus aktif.",
  },
  {
    name: "Siti Khadijah",
    period: "2023-2024",
    quote: "Bahagia HMI, berjayalah Indonesia.",
    description: "Memperkuat kaderisasi kolaboratif dengan komisariat lain.",
  },
  {
    name: "Iqbal Maulana",
    period: "2024-2025",
    quote: "Data kader adalah amanah yang harus dijaga.",
    description: "Memulai inisiatif database kader dan sistem pendaftaran digital.",
  },
  {
    name: "Aisyah Nurhaliza",
    period: "2025-2026",
    quote: "Bergerak dari tradisi, berinovasi untuk peradaban.",
    description: "Mengembangkan Rumah Digital HMI Saintek sebagai pusat informasi dan layanan.",
  },
];

export const announcements = [
  {
    title: "Pendaftaran LK-I Gelombang Saintek Dibuka",
    date: "13 Juni 2026",
    category: "Kaderisasi",
    status: "Aktif",
    excerpt:
      "Calon peserta dapat mengisi formulir online dan memantau status pendaftaran melalui kode pendaftaran.",
  },
  {
    title: "Pemutakhiran Database Kader Periode 2025-2026",
    date: "10 Juni 2026",
    category: "Sekretariat",
    status: "Aktif",
    excerpt:
      "Kader diminta memperbarui data dasar melalui sekretariat agar arsip organisasi tetap akurat.",
  },
  {
    title: "Kanal Advokasi PTKP Mulai Diaktifkan",
    date: "7 Juni 2026",
    category: "PTKP",
    status: "Aktif",
    excerpt:
      "Mahasiswa dapat menyampaikan aspirasi akademik, fasilitas, dan administrasi melalui form advokasi.",
  },
  {
    title: "Unggah Dokumentasi Kegiatan ke Galeri Komisariat",
    date: "3 Juni 2026",
    category: "Media",
    status: "Arsip",
    excerpt:
      "Bidang media membuka pengumpulan foto dan video kegiatan untuk arsip digital komisariat.",
  },
];

export const lk1Materials = [
  "Sejarah HMI dan tujuan perkaderan",
  "Nilai Dasar Perjuangan",
  "Konstitusi HMI",
  "Kepemimpinan dan manajemen organisasi",
  "Keislaman, keindonesiaan, dan keilmuan",
  "Analisis sosial dan tanggung jawab kader",
];

export interface MentorItem {
  id: string;
  name: string;
  role: string;
  faculty: string;
  studyProgram: string;
  batch: string;
  avatarUrl?: string;
  bio: string;
  guidanceFocus: string;
  whatsappGroupUrl: string;
  whatsappNumber?: string;
  isActive: boolean;
  order: number;
}

export const defaultMentors: MentorItem[] = [
  {
    id: "mentor-dema-fst",
    name: "Muhammad Farhan Al-Ghifari",
    role: "Ketua DEMA FST UIN SGD",
    faculty: "Fakultas Sains dan Teknologi",
    studyProgram: "Teknik Informatika",
    batch: "Angkatan 2021",
    avatarUrl: "/ketua-umum.jpg",
    bio: "Membimbing kader dalam kepemimpinan ormawa fakultas, diplomasi kampus, manajemen konflik organisasi, dan kiat menjaga IPK 3.8+ di jurusan teknologi.",
    guidanceFocus: "Kepemimpinan Ormawa, Diplomasi Kampus & Sukses Akademik",
    whatsappGroupUrl: "https://chat.whatsapp.com/EaDcUHFcNud8Dr2yOu4D01",
    whatsappNumber: "087827718245",
    isActive: true,
    order: 1,
  },
  {
    id: "mentor-sema-fst",
    name: "Ahmad Fauzan Ramadhan",
    role: "Ketua SEMA FST UIN SGD",
    faculty: "Fakultas Sains dan Teknologi",
    studyProgram: "Fisika",
    batch: "Angkatan 2021",
    avatarUrl: "/apple-icon.png",
    bio: "Fokus mendampingi kader dalam berpikir kritis (critical thinking), legislasi & konstitusi mahasiswa, metodologi persidangan, serta riset keilmuan sains murni.",
    guidanceFocus: "Legislasi Mahasiswa, Berpikir Kritis & Riset Sains",
    whatsappGroupUrl: "https://chat.whatsapp.com/EaDcUHFcNud8Dr2yOu4D01",
    whatsappNumber: "087827718245",
    isActive: true,
    order: 2,
  },
  {
    id: "mentor-hmj-ti",
    name: "Hilman Maulana, S.Kom.",
    role: "Ketua HMJ Teknik Informatika",
    faculty: "Fakultas Sains dan Teknologi",
    studyProgram: "Teknik Informatika",
    batch: "Angkatan 2022",
    avatarUrl: "/icon.png",
    bio: "Membina mahasiswa baru di bidang rekayasa perangkat lunak, hackathon, persiapan karir tech industry, dan penerapan nilai Islam dalam transformasi digital.",
    guidanceFocus: "Software Engineering, Karir Tech & Intelektual Digital",
    whatsappGroupUrl: "https://chat.whatsapp.com/EaDcUHFcNud8Dr2yOu4D01",
    whatsappNumber: "087827718245",
    isActive: true,
    order: 3,
  },
  {
    id: "mentor-hmj-bio",
    name: "Nabila Azzahra Putri",
    role: "Ketua HMJ Biologi",
    faculty: "Fakultas Sains dan Teknologi",
    studyProgram: "Biologi",
    batch: "Angkatan 2022",
    avatarUrl: "/apple-icon.png",
    bio: "Mendampingi kader muslimah dalam kepemimpinan mahasiswa, riset bio-konservasi laboratorium, serta integrasi sains dan ayat-ayat kauniyah.",
    guidanceFocus: "Kepemimpinan Muslimah, Riset Laboratorium & Sains Islam",
    whatsappGroupUrl: "https://chat.whatsapp.com/EaDcUHFcNud8Dr2yOu4D01",
    whatsappNumber: "087827718245",
    isActive: true,
    order: 4,
  },
  {
    id: "mentor-hmj-elektro",
    name: "Rizky Aditya Pratama",
    role: "Ketua HMJ Teknik Elektro",
    faculty: "Fakultas Sains dan Teknologi",
    studyProgram: "Teknik Elektro",
    batch: "Angkatan 2022",
    avatarUrl: "/icon.png",
    bio: "Membimbing inovasi hardware, IoT & robotika kampus, manajemen waktu praktikum padat, dan kedisiplinan pembentukan karakter kader HMI.",
    guidanceFocus: "Teknologi IoT & Robotika, Manajemen Praktikum & Karakter",
    whatsappGroupUrl: "https://chat.whatsapp.com/EaDcUHFcNud8Dr2yOu4D01",
    whatsappNumber: "087827718245",
    isActive: true,
    order: 5,
  },
  {
    id: "mentor-hmj-agro-kimia",
    name: "Sarah Nur Aulia",
    role: "Ketua HMJ Agroteknologi & Sains Terapan",
    faculty: "Fakultas Sains dan Teknologi",
    studyProgram: "Agroteknologi",
    batch: "Angkatan 2022",
    avatarUrl: "/apple-icon.png",
    bio: "Mendampingi pemberdayaan masyarakat, riset agrikultur berkelanjutan, wirausaha mahasiswa, serta persiapan materi LK-1 dari nol.",
    guidanceFocus: "Pengabdian Masyarakat, Agro-Entrepreneurship & Bimbingan LK-1",
    whatsappGroupUrl: "https://chat.whatsapp.com/EaDcUHFcNud8Dr2yOu4D01",
    whatsappNumber: "087827718245",
    isActive: true,
    order: 6,
  },
];


export interface KahmiQuote {
  id: string;
  name: string;
  role: string;
  quote: string;
  reflection: string;
  photoUrl?: string;
  driveId?: string;
  category: "Ketua Komisariat" | "BPL" | "Teknologi & ASN" | "Akademisi";
  period?: string;
  badge?: string;
}

export interface KahmiPhoto {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  description: string;
  tags: string[];
  date?: string;
  location?: string;
}

export const kahmiPhotos: KahmiPhoto[] = [
  {
    id: "gathering-outdoor",
    title: "Temu Kangen & Sinergi KAHMI Saintek",
    subtitle: "Konsolidasi Lintas Generasi di Kaki Gunung",
    imageUrl: "/images/kahmi/kahmi-saintek-outdoor.jpg",
    description:
      "Pertemuan hangat alumni HMI Komisariat Sains dan Teknologi dari berbagai angkatan dan profesi. Mempererat ukhuwah Islamiyah, merumuskan arah pengabdian alumni, dan mengokohkan sinergi untuk kemajuan kader aktif di kampus.",
    tags: ["Temu Alumni", "Konsolidasi", "Lintas Generasi", "Saintek"],
    location: "Bandung, Jawa Barat",
  },
  {
    id: "silaturahmi-indoor",
    title: "Silaturahmi Akbar KAHMI Komisariat Sains dan Teknologi",
    subtitle: "Dialog Gagasan, Refleksi Perjuangan & Buka Bersama",
    imageUrl: "/images/kahmi/kahmi-saintek-silaturahmi.jpg",
    description:
      "Momen kebersamaan penuh kekeluargaan antara alumni KAHMI Saintek dan pengurus komisariat aktif. Membahas kesinambungan perkaderan, transfer pengalaman kepemimpinan, dan dukungan karir profesional pasca-kampus.",
    tags: ["Silaturahmi", "Dialog Gagasan", "Ukhuwah", "Kaderisasi"],
    location: "Bandung, Jawa Barat",
  },
];

export const kahmiQuotes: KahmiQuote[] = [
  {
    id: "jajang-nur-alamin",
    name: "Jajang Nur Alamin, S.T.",
    role: "Ketua Umum HMI Komisariat Sains & Teknologi Periode 2017 - 2018",
    period: "2017 - 2018",
    category: "Ketua Komisariat",
    badge: "Mantan Ketua Umum",
    photoUrl: "/images/kahmi/jajang-nur-alamin.jpg",
    quote:
      "Masa depan Islam, HMI dan Indonesia tidak hanya membutuhkan pemimpin hebat berada di radar kekuasaan, Tetapi Dialah Insan yang mampu memberi manfaat secara sistemik dan sustainable serta mampu menghadirkan perubahan secara Universal dengan Turut Al-Qur'an & Hadist sebagai Jalan keselamatan.",
    reflection: `Sebagai kader HMI membentuk cara kita memimpin dengan nilai, intelektualitas, dan semangat pengabdian. HMI mengajarkan kita untuk berpikir Kritis dan Visioner, bersikap Bijak dan inklusif, serta menjadikan kepemimpinan bukan hanya berbicara tentang posisi, tetapi tentang tanggung jawab untuk memberikan manfaat untuk Bangsa & Tanah Air.

Nilai-nilai keislaman, keindonesiaan, dan semangat INSAN CITA yang kita pelajari bersama menjadi fondasi kekuatan dalam setiap langkah pengabdian. Oleh karena itu kepemimpinan adalah tentang bagaimana membangun sinergitas, menghadirkan solusi, dan mewujudkan asas manfaat yang nyata untuk sesama.

Menjadi kader HMI bukan hanya tentang pengalaman berorganisasi, tetapi sebuah proses panjang yang membentuk cara kita berpikir, bersikap, dan memimpin. Di HMI kita belajar bahwa seorang pemimpin tidak cukup hanya memiliki kemampuan, tetapi juga harus memiliki kekuatan integritas dan Diplomasi, serta keberanian untuk menyuarakan kebenaran, dan hadirnya kepedulian terhadap Dinamika yang ada disekitarnya.

Berbagai dinamika, perbedaan pandangan, dan proses belajar di HMI mengajarkan Kita untuk tidak mudah menyerah, mau mendengar, dan mampu mengambil keputusan dengan mempertimbangkan kepentingan bersama. Sehingga kita memahami bahwa kepemimpinan bukan tentang seberapa tinggi posisi kita, tetapi seberapa besar manfaat yang mampu kita berikan.

Oleh Karena itu, sampai hari ini saya memandang kepemimpinan di HMI sebagai bentuk pengabdian. Apapun ruang dan peran yang kita jalani, saya yakin tetap membawa nilai-nilai keislaman dan Keindonesiaan melalui Kekuatan IMAN, ILMU, AMAL dan semangat 5 Kualitas INSAN CITA.`,
    driveId: "1JWU-LHyWLN6UlbHl1HGCk0u6iXb26ofu",
  },
  {
    id: "imam-firdaus",
    name: "Imam Firdaus, S.Kom.",
    role: "Pranata Komputer Ahli Pertama • Birokrat & Praktisi Teknologi",
    category: "Teknologi & ASN",
    badge: "Praktisi Tech & ASN",
    photoUrl: "/images/kahmi/imam-firdaus.jpg",
    quote:
      "Yakinkan dengan iman, usahakan dengan ilmu, sampaikan dengan amal, yakin usaha sampai.",
    reflection: `Pengalaman sebagai kader HMI memiliki pengaruh yang sangat kuat terhadap perjalanan kepemimpinan dan pengabdian saya. Di HMI, saya tidak hanya belajar berorganisasi, tetapi juga belajar mengelola gagasan, manusia, konflik, perubahan, serta tanggung jawab sosial. Proses kaderisasi membentuk cara berpikir saya agar lebih kritis, sistematis, dan berorientasi pada pemecahan masalah.

Nilai-nilai keislaman, keindonesiaan, dan keilmuan yang ditanamkan HMI menjadi landasan bagi saya dalam bekerja, khususnya di bidang teknologi. Saya memandang teknologi bukan sekadar perangkat atau sistem digital, melainkan instrumen untuk menghadirkan kemaslahatan, memperluas akses, meningkatkan transparansi, dan memperbaiki kualitas pelayanan kepada masyarakat.

Dalam memimpin, saya berusaha menggabungkan pendekatan yang humanis dengan pengambilan keputusan berbasis data. Sebab, transformasi digital tidak hanya berbicara tentang aplikasi, infrastruktur, atau otomatisasi, tetapi juga tentang kesiapan manusia, perubahan budaya kerja, dan keberanian melakukan inovasi. Teknologi yang canggih tidak akan memiliki makna apabila tidak menjawab kebutuhan nyata dan tidak dikelola dengan integritas.

HMI juga mengajarkan bahwa seorang pemimpin bukan hanya orang yang mampu mengarahkan, melainkan seseorang yang sanggup membaca perubahan, membangun kolaborasi, serta menyiapkan sistem yang dapat terus bekerja melampaui dirinya. Karena itu, pengabdian saya di bidang teknologi saya maknai sebagai ikhtiar untuk menerjemahkan nilai-nilai perjuangan ke dalam solusi yang konkret, berkelanjutan, dan berdampak luas.

Bagi saya, menjadi kader HMI berarti menjaga keseimbangan antara kecerdasan intelektual, kedalaman spiritual, dan kepekaan sosial. Ketiganya menjadi kompas agar teknologi tetap berpihak kepada manusia dan kepemimpinan tetap berorientasi pada kemajuan peradaban.`,
    driveId: "1Vwq2I6uR5isVIkCrSEB6Bin65PNWRWYr",
  },
  {
    id: "jati-gunawan",
    name: "Jati Gunawan, S.T.",
    role: "Ketua HMI Komisariat Sains & Teknologi Periode 2017 - 2018",
    period: "2017 - 2018",
    category: "Ketua Komisariat",
    badge: "Mantan Ketua Umum",
    photoUrl: "/images/kahmi/jati-gunawan.jpg",
    quote: "Jangan pernah berhenti untuk berproses.",
    reflection:
      "Perjalanan perkaderan di HMI Komisariat Sains dan Teknologi membentuk karakter pribadi yang mandiri, tahan uji menghadapi dinamika zaman, dan senantiasa berorientasi pada pencarian solusi serta integritas pribadi.",
    driveId: "1Kd3DmtdHFpGP4qHjoZdtx7YhIez_1QEA",
  },
  {
    id: "agista-imani",
    name: "Agista Imani Juang Gunawan",
    role: "Ketua Umum BPL-HMI Cabang Kabupaten Bandung",
    category: "BPL",
    badge: "Instruktur & BPL",
    photoUrl: "/images/kahmi/agista-imani.jpg",
    quote: "Yakin Usaha Sampai.",
    reflection:
      "Pengalaman sebagai kader dan instruktur pengelola latihan di Badan Pengelola Latihan (BPL) HMI memiliki pengaruh yang sangat mendasar dalam mengasah kedewasaan bersikap, ketahanan mental, serta komitmen pengabdian tanpa pamrih bagi kemajuan himpunan dan umat.",
    driveId: "1fiT80Yhk90ZXEZF992k_SI9dmZGOaHhc",
  },
];

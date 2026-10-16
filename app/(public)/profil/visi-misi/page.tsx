import { PageHeader } from "@/components/sections/page-header";
import { getSiteSettings } from "@/lib/cms";
import { 
  BookOpen, 
  Brain, 
  Shield, 
  Briefcase, 
  Users, 
  Lightbulb, 
  Heart,
  Quote,
  Target,
  Compass
} from "lucide-react";

export const metadata = {
  title: "Visi & Misi | HMI Komisariat Sains dan Teknologi",
  description: "Visi, Misi, Arah Gerak, dan Landasan Perjuangan HMI Komisariat Sains & Teknologi UIN Sunan Gunung Djati Bandung.",
};

const DEFAULT_VISION =
  "Terwujudnya HMI Komisariat Sains dan Teknologi UIN Sunan Gunung Djati Bandung sebagai pusat kaderisasi yang unggul, progresif, dan berintegritas dalam mencetak insan akademis, pencipta, pengabdi yang bernafaskan Islam serta mampu mengintegrasikan nilai-nilai keislaman, keilmuan, dan teknologi untuk memberikan kontribusi nyata bagi kemajuan umat, bangsa, dan peradaban.";

const DEFAULT_VISION_DESC =
  "Visi tersebut menjadi landasan bagi seluruh aktivitas organisasi dalam membangun kader yang tidak hanya memiliki kemampuan akademik yang baik, tetapi juga memiliki karakter kepemimpinan, kemampuan berpikir kritis, semangat kolaborasi, serta kepedulian terhadap persoalan sosial dan kemasyarakatan.";

const DEFAULT_ARAH_GERAK_QUOTE =
  "“Yakin Usaha Sampai (YAKUSA) menjadi motivasi pengabdian tiada henti, menyatukan keislaman, keilmuan, dan keorganisasian.”";

const DEFAULT_ARAH_GERAK_DESC = [
  "Himpunan Mahasiswa Islam (HMI) Komisariat Sains dan Teknologi UIN Sunan Gunung Djati Bandung merupakan organisasi kader yang berkomitmen membentuk insan akademis, pencipta, pengabdi, dan muslim yang bernafaskan Islam serta bertanggung jawab atas terwujudnya masyarakat adil makmur yang diridhai Allah SWT.",
  "Sebagai bagian dari lingkungan akademik yang berorientasi pada pengembangan ilmu pengetahuan dan teknologi, komisariat hadir untuk menjadi ruang pembelajaran, pengembangan karakter, dan penguatan kepemimpinan bagi seluruh kader. Setiap aktivitas yang dilaksanakan tidak hanya bertujuan meningkatkan kapasitas intelektual, tetapi juga menanamkan nilai-nilai keislaman, integritas, profesionalisme, dan semangat pengabdian kepada masyarakat.",
  "Dengan semangat “Yakin Usaha Sampai”, HMI Komisariat Sains dan Teknologi berupaya menjadi organisasi yang adaptif terhadap perkembangan zaman tanpa meninggalkan identitas keislaman dan nilai-nilai perjuangan HMI."
];

const DEFAULT_TUJUAN_HMI =
  "Terbinanya Insan Akademis, Pencipta, Pengabdi yang Bernafaskan Islam dan Bertanggung Jawab atas Terwujudnya Masyarakat Adil Makmur yang Diridhai Allah SWT.";

const defaultMisiList = [
  {
    title: "Memperkuat sistem kaderisasi yang berkelanjutan",
    description: "Mengembangkan proses kaderisasi yang sistematis, terarah, dan berlandaskan nilai-nilai keislaman serta prinsip dasar perjuangan HMI guna melahirkan kader yang memiliki integritas, loyalitas organisasi, dan semangat perjuangan yang tinggi."
  },
  {
    title: "Membangun budaya intelektual di lingkungan komisariat",
    description: "Mendorong tumbuhnya tradisi diskusi, kajian ilmiah, penelitian, literasi, dan pengembangan keilmuan sebagai bentuk aktualisasi mahasiswa dalam menghadapi tantangan perkembangan sains dan teknologi."
  },
  {
    title: "Mengembangkan kualitas sumber daya kader",
    description: "Memberikan ruang bagi kader untuk meningkatkan kemampuan akademik, kepemimpinan, komunikasi, manajemen organisasi, serta kemampuan berpikir kritis dan analitis sehingga mampu menjadi pribadi yang kompeten dan adaptif."
  },
  {
    title: "Mengintegrasikan nilai Islam dengan ilmu pengetahuan dan teknologi",
    description: "Menjadikan ajaran Islam sebagai landasan moral dan etika dalam pengembangan ilmu pengetahuan, inovasi teknologi, serta setiap bentuk aktivitas organisasi sehingga menghasilkan kemajuan yang membawa kemaslahatan bagi masyarakat."
  },
  {
    title: "Menumbuhkan jiwa kepemimpinan dan tanggung jawab sosial",
    description: "Mencetak kader yang mampu menjadi pemimpin yang amanah, visioner, dan memiliki kepedulian terhadap persoalan umat, lingkungan kampus, serta masyarakat melalui berbagai kegiatan advokasi, pengabdian, dan pemberdayaan."
  },
  {
    title: "Mendorong kolaborasi dan inovasi organisasi",
    description: "Membangun budaya organisasi yang terbuka, profesional, kolaboratif, serta mampu memanfaatkan teknologi informasi untuk meningkatkan efektivitas pelayanan, komunikasi, dan pengembangan organisasi."
  },
  {
    title: "Meningkatkan kontribusi nyata kepada masyarakat",
    description: "Mengoptimalkan potensi kader dalam bidang pendidikan, penelitian, sosial, lingkungan, dan teknologi melalui program-program yang memberikan dampak positif dan berkelanjutan bagi masyarakat."
  }
];

const nilaiList = [
  {
    title: "Keislaman",
    description: "Keislaman sebagai landasan moral dan spiritual.",
    icon: BookOpen
  },
  {
    title: "Intelektualitas",
    description: "Intelektualitas sebagai budaya berpikir dan berkarya.",
    icon: Brain
  },
  {
    title: "Integritas",
    description: "Integritas dalam setiap sikap dan tindakan.",
    icon: Shield
  },
  {
    title: "Profesionalisme",
    description: "Profesionalisme dalam menjalankan amanah organisasi.",
    icon: Briefcase
  },
  {
    title: "Kolaborasi",
    description: "Kolaborasi dalam membangun kekuatan bersama.",
    icon: Users
  },
  {
    title: "Inovasi",
    description: "Inovasi dalam menghadapi perkembangan zaman.",
    icon: Lightbulb
  },
  {
    title: "Pengabdian",
    description: "Pengabdian sebagai bentuk tanggung jawab kepada umat dan bangsa.",
    icon: Heart
  }
];

export default async function VisiMisiPage() {
  const settings = await getSiteSettings();
  const vm = (settings?.visionMision as unknown as Record<string, unknown>) || {};

  const vision =
    (typeof vm.vision === "string" && vm.vision.trim()) ||
    (typeof settings?.vision === "string" && settings.vision.trim()) ||
    DEFAULT_VISION;

  const visionDescription =
    (typeof vm.visionDescription === "string" && vm.visionDescription.trim()) ||
    (typeof settings?.visionDescription === "string" && settings.visionDescription.trim()) ||
    DEFAULT_VISION_DESC;

  const arahGerakQuote =
    (typeof vm.arahGerakQuote === "string" && vm.arahGerakQuote.trim()) ||
    DEFAULT_ARAH_GERAK_QUOTE;

  const arahGerakDescRaw =
    typeof vm.arahGerakDescription === "string" && vm.arahGerakDescription.trim()
      ? vm.arahGerakDescription.trim()
      : null;

  const arahGerakParagraphs = arahGerakDescRaw
    ? arahGerakDescRaw.split(/\n\s*\n/).filter(Boolean)
    : DEFAULT_ARAH_GERAK_DESC;

  const tujuanHmi =
    (typeof vm.tujuanHmi === "string" && vm.tujuanHmi.trim()) ||
    DEFAULT_TUJUAN_HMI;

  const activeMissions =
    Array.isArray(vm.missions) && vm.missions.length > 0
      ? (vm.missions as Array<{ title?: string; description?: string }>).map((m) => ({
          title: m.title || "",
          description: m.description || "",
        }))
      : defaultMisiList;

  return (
    <main className="relative min-h-screen pb-16">
      {/* Grid Background */}
      <div 
        className="fixed inset-0 z-[-1] opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(#006B3F 1.5px, transparent 1.5px)",
          backgroundSize: "40px 40px"
        }}
      />

      <PageHeader
        eyebrow="Landasan Gerak"
        title="Visi & Misi"
        description="Arah perjuangan HMI Komisariat Sains dan Teknologi UIN Sunan Gunung Djati Bandung dalam membentuk kader muslim berintelektual tinggi."
      />

      {/* Arah Gerak Section */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#E5F2EC] px-4 py-1.5 text-xs font-black uppercase tracking-wider text-[#006B3F]">
              <Compass className="h-4 w-4 animate-spin-slow" />
              Arah Gerak
            </div>
            <h2 className="text-3xl font-black tracking-tight text-[#10231C] sm:text-4xl">
              Arah Gerak Organisasi
            </h2>
            <div className="h-1.5 w-20 bg-[#006B3F] rounded-full"></div>
            
            <div className="rounded-2xl border border-[#DCE8E2] bg-[#F6F8F7] p-6 shadow-sm">
              <p className="text-sm font-semibold text-[#003324] leading-relaxed italic">
                &ldquo;{arahGerakQuote.replace(/^["“]+|["”]+$/g, "")}&rdquo;
              </p>
            </div>
          </div>
          <div className="lg:col-span-7 space-y-6 text-[#334E44] leading-relaxed text-justify">
            {arahGerakParagraphs.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Visi Section */}
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#003324] to-[#004D2E] text-white py-16 px-6 sm:px-12 md:py-20 md:px-16 relative overflow-hidden rounded-[2.5rem] shadow-xl">
          <div className="absolute right-0 top-0 -translate-y-12 translate-x-12 opacity-10">
            <Quote className="h-80 w-80 text-white" />
          </div>
          <div className="relative mx-auto max-w-4xl text-center space-y-8">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-md">
              <Target className="h-8 w-8 text-[#00E676]" />
            </div>
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#00E676]">VISI UTAMA</span>
            <h3 className="text-xl font-bold leading-relaxed sm:text-2xl lg:text-3xl text-balance">
              &ldquo;{vision.replace(/^["“]+|["”]+$/g, "")}&rdquo;
            </h3>
            {visionDescription && (
              <div className="mx-auto max-w-2xl text-xs leading-relaxed text-emerald-200/80 pt-4 border-t border-white/10">
                {visionDescription}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Misi Section */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-[#006B3F]">MISI KAMI</span>
          <h2 className="text-3xl font-black text-[#10231C] sm:text-4xl">
            {activeMissions.length} Misi Strategis Organisasi
          </h2>
          <p className="mx-auto max-w-2xl text-[#334E44]">Langkah-langkah strategis yang kami jalankan secara konsisten demi mewujudkan visi besar komisariat.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {activeMissions.map((misi, idx) => (
            <div 
              key={idx} 
              className="group relative flex flex-col justify-between rounded-3xl border border-[#DCE8E2] bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-[#006B3F]/30"
            >
              <div>
                <span className="text-4xl font-black text-[#006B3F]/10 group-hover:text-[#006B3F]/20 transition-colors duration-300">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <h4 className="mt-4 text-base font-bold text-[#10231C] leading-snug group-hover:text-[#006B3F] transition-colors duration-300">
                  {misi.title}
                </h4>
                <p className="mt-3 text-sm text-[#334E44]/90 leading-relaxed text-justify">
                  {misi.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Nilai-Nilai Section */}
      <section className="bg-[#F6F8F7] py-20 border-y border-[#DCE8E2]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#006B3F]">NILAI PERJUANGAN</span>
            <h2 className="text-3xl font-black text-[#10231C] sm:text-4xl">Nilai-Nilai Organisasi</h2>
            <p className="mx-auto max-w-2xl text-[#334E44]">Pilar moral dan etika yang melandasi setiap sikap, tindakan, dan keputusan dalam menjalankan roda organisasi.</p>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center">
            {nilaiList.map((nilai, idx) => (
              <div 
                key={idx} 
                className="flex items-start gap-4 rounded-2xl bg-white p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#E5F2EC] text-[#006B3F]">
                  <nilai.icon className="h-6 w-6 animate-pulse-slow" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#10231C]">{nilai.title}</h4>
                  <p className="mt-1 text-xs text-[#334E44]/90 leading-relaxed">{nilai.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Komitmen Bersama Section */}
      <section className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="space-y-8 rounded-[2rem] border border-[#DCE8E2] bg-white p-8 sm:p-12 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-[#006B3F]"></div>
          <span className="text-xs font-black uppercase tracking-[0.2em] text-[#006B3F]">KOMITMEN BERSAMA</span>
          <h3 className="text-2xl font-black text-[#10231C] leading-snug">
            Menjadi Rumah Kader yang Unggul & Adaptif
          </h3>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-[#334E44] text-justify sm:text-center">
            HMI Komisariat Sains dan Teknologi UIN Sunan Gunung Djati Bandung berkomitmen menjadi rumah kader yang mampu melahirkan generasi muslim yang cerdas, kritis, inovatif, dan berakhlak mulia. Dengan memadukan semangat keislaman, intelektualitas, serta penguasaan sains dan teknologi, komisariat diharapkan dapat menjadi ruang pembelajaran yang melahirkan pemimpin-pemimpin masa depan yang siap mengabdi untuk kemajuan umat, bangsa, dan negara.
          </p>
          
          <div className="pt-6 border-t border-slate-100">
            <p className="text-[10px] font-black uppercase tracking-widest text-[#006B3F] mb-3">Tujuan HMI (Pasal 4 AD HMI)</p>
            <blockquote className="text-lg sm:text-xl font-black leading-relaxed text-[#003324] max-w-2xl mx-auto italic">
              &ldquo;{tujuanHmi.replace(/^["“]+|["”]+$/g, "")}&rdquo;
            </blockquote>
          </div>
        </div>
      </section>
    </main>
  );
}


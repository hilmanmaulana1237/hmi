import type { Metadata } from "next";
import { KahmiHero } from "@/components/kahmi/kahmi-hero";
import { KahmiQuotesSection } from "@/components/kahmi/kahmi-quotes-section";
import { KahmiPhotosSection } from "@/components/kahmi/kahmi-photos-section";
import { KahmiSynergySection } from "@/components/kahmi/kahmi-synergy-section";

export const metadata: Metadata = {
  title: "KAHMI Saintek • Mutiara Kata Alumni & Dokumentasi",
  description:
    "Halaman resmi Keluarga Alumni HMI (KAHMI) Komisariat Sains dan Teknologi UIN Sunan Gunung Djati Bandung. Untaian kata inspirasi alumni, dokumentasi silaturahmi akbar, dan sinergi perkaderan.",
  keywords: [
    "KAHMI Saintek",
    "KAHMI UIN Bandung",
    "Keluarga Alumni HMI Saintek",
    "Alumni HMI Saintek",
    "Kata Mutiara Alumni HMI",
    "HMI Saintek UIN Bandung",
    "Silaturahmi KAHMI Saintek",
  ],
  openGraph: {
    title: "KAHMI Saintek • Mutiara Kata Alumni & Dokumentasi",
    description:
      "Jejak langkah, pemikiran, dan pengabdian alumni KAHMI Komisariat Sains dan Teknologi UIN Bandung.",
    images: [
      {
        url: "/images/kahmi/kahmi-saintek-outdoor.jpg",
        width: 1200,
        height: 675,
        alt: "Temu Kangen KAHMI Saintek",
      },
    ],
  },
};

export default function KahmiPage() {
  return (
    <main className="min-h-screen bg-white">
      <KahmiHero />
      <KahmiQuotesSection />
      <KahmiPhotosSection />
      <KahmiSynergySection />
    </main>
  );
}


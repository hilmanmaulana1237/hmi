import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { hydrationAttributeCleanupScript } from "@/lib/hydration-cleanup";
import "../globals.css";

const heading = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#006144",
};

export const metadata: Metadata = {
  title: "Portal Monitoring LK-I | HMI Sains dan Teknologi",
  description:
    "Portal Manajemen, Evaluasi & Rekapitulasi Data Pendaftar Latihan Kader I (Basic Training) HMI Komisariat Sains dan Teknologi UIN SGD Bandung.",
};

export default function MonitorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${heading.variable} ${body.variable} h-full scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-[#F4F7F6] text-[#10231C]" suppressHydrationWarning>
        <script
          id="monitor-hydration-attribute-cleanup"
          dangerouslySetInnerHTML={{ __html: hydrationAttributeCleanupScript }}
        />
        <NextTopLoader
          color="#006144"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
        />
        {children}
      </body>
    </html>
  );
}


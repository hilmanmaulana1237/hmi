import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { Suspense } from "react";
import { ChatWidget } from "@/components/layout/chat-widget";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getSiteSettings } from "@/lib/cms";
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

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://hmikomsaintek.my.id"
  ),
  title: {
    default: "Rumah Digital HMI Komisariat Sains dan Teknologi UIN SGD Bandung",
    template: "%s | HMI Saintek UIN SGD Bandung",
  },
  description:
    "Official website HMI Komisariat Sains dan Teknologi UIN Sunan Gunung Djati Bandung. Portal organisasi digital untuk informasi, kaderisasi, publikasi, advokasi, dan dokumentasi HMI Saintek.",
  keywords: [
    "HMI",
    "Himpunan Mahasiswa Islam",
    "HMI Saintek",
    "HMI Komisariat Sains dan Teknologi",
    "HMI UIN Bandung",
    "HMI UIN SGD",
    "HMI Bandung",
    "Kaderisasi HMI",
    "LK-I HMI",
    "Maperca HMI",
    "NDP HMI",
    "Rumah Digital HMI",
    "Lafran Pane"
  ],
  authors: [{ name: "Bidang IT HMI Komisariat Sains dan Teknologi UIN SGD" }],
  creator: "HMI Komisariat Sains dan Teknologi UIN SGD Bandung",
  publisher: "HMI Komisariat Sains dan Teknologi UIN SGD Bandung",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "./",
  },
  openGraph: {
    title: "Rumah Digital HMI Komisariat Sains dan Teknologi UIN SGD Bandung",
    description:
      "Portal organisasi digital untuk informasi, kaderisasi, publikasi, advokasi, dan dokumentasi HMI Komisariat Sains dan Teknologi UIN Sunan Gunung Djati Bandung.",
    type: "website",
    locale: "id_ID",
    siteName: "HMI Saintek UIN SGD Bandung",
  },
};

async function SiteHeaderWithSettings() {
  const settings = await getSiteSettings();
  return <SiteHeader settings={settings} />;
}

async function SiteFooterWithSettings() {
  const settings = await getSiteSettings();
  return <SiteFooter settings={settings} />;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch SiteSettings once at layout level — shared across Header & Footer
  return (
    <html
      lang="id"
      className={`${heading.variable} ${body.variable} h-full scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-[#F6F8F7] text-[#10231C]" suppressHydrationWarning>
        <script
          id="public-hydration-attribute-cleanup"
          dangerouslySetInnerHTML={{ __html: hydrationAttributeCleanupScript }}
        />
        <NextTopLoader
          color="#ffffffff"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
        />
        <Suspense fallback={<SiteHeader />}>
          <SiteHeaderWithSettings />
        </Suspense>
        {children}
        <ChatWidget />
        <Suspense fallback={<SiteFooter />}>
          <SiteFooterWithSettings />
        </Suspense>
      </body>
    </html>
  );
}

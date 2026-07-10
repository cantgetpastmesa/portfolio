import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { TerminalNav } from "@/components/ui/TerminalNav";
import { Footer } from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const googleSansCode = localFont({
  src: "../../fonts/Google_Sans_Code/GoogleSansCode-VariableFont_wght.ttf",
  variable: "--font-google-sans-code",
  display: "swap",
  fallback: ["monospace"],
});

const bitcountFont = localFont({
  src: "../../fonts/Bitcount_Prop_Single/BitcountPropSingle-VariableFont_CRSV,ELSH,ELXP,slnt,wght.ttf",
  variable: "--font-bitcount",
  display: "swap",
  fallback: ["system-ui"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://felipemesa.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Felipe A. Mesa N. — AI/ML & Robotics",
    template: "%s | Felipe A. Mesa N.",
  },
  description:
    "Felipe Andrés Mesa Niño — Electronic & Computer Engineering student at Universidad de los Andes. AI/ML research, robotics, and president of ROBOCOL.",
  keywords: [
    "Felipe Mesa",
    "AI",
    "machine learning",
    "deep learning",
    "robotics",
    "ROBOCOL",
    "Universidad de los Andes",
    "research",
    "portfolio",
  ],
  authors: [{ name: "Felipe Andrés Mesa Niño" }],
  creator: "Felipe Andrés Mesa Niño",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "es_CO",
    url: siteUrl,
    title: "Felipe A. Mesa N. — AI/ML & Robotics",
    description:
      "Engineering intelligent systems — AI/ML research, robotics, and the software that binds them.",
    siteName: "Felipe A. Mesa N.",
    images: [
      {
        url: "/media/pointcloud-face-square.jpeg",
        width: 1200,
        height: 1200,
        alt: "RealSense point-cloud self-portrait of Felipe A. Mesa N.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Felipe A. Mesa N. — AI/ML & Robotics",
    description:
      "Engineering intelligent systems — AI/ML research, robotics, and the software that binds them.",
    images: ["/media/pointcloud-face-square.jpeg"],
  },
  icons: {
    icon: [
      { url: "/favicon/favicon.ico" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/favicon/site.webmanifest",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Felipe Andrés Mesa Niño",
  url: siteUrl,
  email: "mailto:f.mesan@uniandes.edu.co",
  image: `${siteUrl}/media/pointcloud-face-square.jpeg`,
  jobTitle: "AI/ML & Robotics Researcher (Student)",
  affiliation: {
    "@type": "CollegeOrUniversity",
    name: "Universidad de los Andes",
  },
  knowsAbout: [
    "Machine Learning",
    "Deep Learning",
    "Robotics",
    "Computer Vision",
    "Cryptography",
    "Software Engineering",
  ],
  sameAs: [
    "https://github.com/cantgetpastmesa",
    "https://linkedin.com/in/felipe-a-mesa-n",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${googleSansCode.variable} ${bitcountFont.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <LanguageProvider>
          <TerminalNav />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}

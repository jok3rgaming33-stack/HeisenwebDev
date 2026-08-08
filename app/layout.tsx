import type { Metadata } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import { SiteInteractive } from "@/components/site-interactive";
import "./globals.css";

const display = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const body = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "HeisenWeb — Développeur full-stack | Conception & développement web",
  description:
    "Page vitrine HeisenWeb. Conception et développement d'applications web full-stack sur mesure : boutiques, admin, messagerie, paiements, PWA.",
  robots: { index: true, follow: true },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "HeisenWeb",
  },
  openGraph: {
    title: "HeisenWeb — Développeur full-stack",
    description: "Des produits web solides, élégants et prêts pour la production.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${display.variable} ${body.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="noise min-h-screen bg-[#05070d] text-[#eef2ff]">
        <SiteInteractive>{children}</SiteInteractive>
      </body>
    </html>
  );
}

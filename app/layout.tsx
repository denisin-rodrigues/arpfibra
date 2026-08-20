import type { Metadata, Viewport } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL = "https://arpfibra.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ARP Fibra — Internet de fibra óptica para o seu dia a dia",
    template: "%s | ARP Fibra",
  },
  description:
    "Fibra óptica de alta performance para sua casa e empresa. Planos ilimitados de 100 a 800 Mega, Wi-Fi 6 e suporte próximo. Trabalhe, estude, jogue e assista sem travar.",
  keywords: [
    "internet fibra óptica",
    "ARP Fibra",
    "provedor de internet Mambaí",
    "planos de internet residencial",
    "Wi-Fi 6",
    "internet ilimitada Goiás",
  ],
  authors: [{ name: "ARP Fibra" }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: "ARP Fibra",
    title: "ARP Fibra — Sua vida acontece rápido. Sua internet também deveria.",
    description:
      "Fibra óptica de alta performance para sua casa e empresa. Planos ilimitados, Wi-Fi 6 e suporte ARP.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ARP Fibra — Internet de fibra óptica",
    description:
      "Fibra óptica de alta performance para sua casa e empresa. Planos ilimitados e suporte próximo.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE_URL },
};

export const viewport: Viewport = {
  themeColor: "#08080a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${sora.variable} ${inter.variable}`}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}

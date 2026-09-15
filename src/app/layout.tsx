import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ev-revolution.com"),
  title: {
    default: "Eve's Sisters — The Evolution of a Woman's Body",
    template: "%s | Eve's Sisters",
  },
  description:
    "Evidence-led women's wellness and longevity: weight, hormones and menopause, skin and beauty, energy, recovery and healthspan. Different stages. The same power.",
  openGraph: {
    title: "Eve's Sisters — The Evolution of a Woman's Body",
    description:
      "Evidence-led women's wellness and longevity for every stage. Different stages. The same power.",
    siteName: "Eve's Sisters",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans">
        <a
          href="#main"
          className="brand-eyebrow sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-plum focus:px-4 focus:py-2 focus:text-ivory"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

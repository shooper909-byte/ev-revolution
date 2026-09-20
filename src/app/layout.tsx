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
  metadataBase: new URL("https://evevolutionhealth.com"),
  title: {
    default: "Eve’s Sisters — The Evolution of a Woman's Body",
    template: "%s | Eve’s Sisters",
  },
  description:
    "Evidence-led women's wellness and longevity: weight, hormones and menopause, skin and beauty, energy, recovery and healthspan. Different stages. The same power.",
  openGraph: {
    title: "Eve’s Sisters — The Evolution of a Woman's Body",
    description:
      "Evidence-led women's wellness and longevity for every stage. Different stages. The same power.",
    siteName: "Eve’s Sisters",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
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
        <script
          dangerouslySetInnerHTML={{
            __html:
              'document.addEventListener("click",function(e){var a=e.target.closest&&e.target.closest("a[href]");if(!a)return;var h=a.getAttribute("href");if(h&&h.charAt(0)==="/"&&h.charAt(1)!=="/"){e.preventDefault();e.stopImmediatePropagation();window.location.href=a.href;}},true);',
          }}
        />
      </body>
    </html>
  );
}

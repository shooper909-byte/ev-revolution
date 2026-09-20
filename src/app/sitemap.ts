import type { MetadataRoute } from "next";
import { pillars } from "@/lib/pillars";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://evevolutionhealth.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/care", "/care/weight-management", "/care/hormones-menopause", "/care/skin-beauty", "/care/energy-performance", "/peptide-care", "/about", "/journal", "/contact", "/disclaimer"];

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority:
        route === ""
          ? 1
          : route === "/care"
            ? 0.9
            : route.startsWith("/care/") || route === "/peptide-care"
              ? 0.85
              : 0.7,
    })),
    ...pillars.map((pillar) => ({
      url: `${baseUrl}/pillars/${pillar.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}

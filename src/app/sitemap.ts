import type { MetadataRoute } from "next";
import { pillars } from "@/lib/pillars";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ev-revolution.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/journal", "/contact", "/disclaimer"];

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.7,
    })),
    ...pillars.map((pillar) => ({
      url: `${baseUrl}/pillars/${pillar.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}

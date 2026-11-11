import type { MetadataRoute } from "next";
import { guides } from "@/lib/guides";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://evevolutionhealth.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/services", "/gender-affirming-care", "/resources", "/guides", "/about", "/contact", "/early-access", "/faq", "/privacy-policy", "/terms-of-service", "/telehealth-consent", "/subscription-cancellation", "/hipaa-policy", "/disclaimer"];

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.7,
    })),
    ...guides.map((g) => ({
      url: `${baseUrl}/guides/${g.slug}`,
      lastModified: new Date(`${g.date}T00:00:00Z`),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}

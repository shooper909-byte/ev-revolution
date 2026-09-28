import type { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://evevolutionhealth.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/care", "/care/weight-management", "/care/hormones-menopause", "/care/skin-beauty", "/eves-secret", "/treatments", "/packages/mrs-collection", "/packages/mrs-jones", "/packages/mrs-golden", "/packages/mrs-robinson", "/about", "/contact", "/faq", "/privacy-policy", "/terms-of-service", "/telehealth-consent", "/subscription-cancellation", "/hipaa-policy", "/disclaimer"];

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
            : route.startsWith("/care/") || route === "/eves-secret"
              ? 0.85
              : 0.7,
    })),
  ];
}

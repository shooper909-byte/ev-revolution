import { permanentRedirect } from "next/navigation";
import { pillars } from "@/lib/pillars";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return pillars.map((pillar) => ({ slug: pillar.slug }));
}

/**
 * Retain legacy editorial URLs while making the launch care pages canonical.
 */
export default async function PillarPage({ params }: Params) {
  const { slug } = await params;
  const redirects: Record<string, string> = {
    "weight-loss": "/care/weight-management",
    "hormones-menopause": "/care/hormones-menopause",
    "skin-beauty": "/care/skin-beauty",
    "longevity-healthspan": "/care/longevity-healthspan",
    "energy-performance": "/care/energy-performance",
    "recovery-rejuvenation": "/care/recovery-rejuvenation",
  };
  permanentRedirect(redirects[slug] ?? "/care");
}

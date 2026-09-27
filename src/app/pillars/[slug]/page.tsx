import { notFound, permanentRedirect } from "next/navigation";
import { getPillar, pillars } from "@/lib/pillars";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return pillars.map((pillar) => ({ slug: pillar.slug }));
}

/**
 * Retain legacy editorial URLs while making the launch care pages canonical.
 */
export default async function PillarPage({ params }: Params) {
  const { slug } = await params;
  const pillar = getPillar(slug);

  if (!pillar) notFound();
  permanentRedirect(pillar.carePath ?? "/care");
}

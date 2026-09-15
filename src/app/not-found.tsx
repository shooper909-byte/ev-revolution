import Link from "next/link";
import { Container, Eyebrow } from "@/components/Container";
import { CurvatureMark } from "@/components/Wordmark";

export default function NotFound() {
  return (
    <section>
      <Container className="flex flex-col items-start py-28 sm:py-36">
        <CurvatureMark className="h-20 w-auto opacity-60" />
        <Eyebrow className="mt-10">404</Eyebrow>
        <h1 className="mt-6 font-display text-4xl leading-tight text-ivory sm:text-5xl">
          This page has evolved elsewhere.
        </h1>
        <p className="mt-6 max-w-md text-base leading-relaxed text-ivory-200/80">
          The page you were looking for is not here. The six pillars are a good
          place to pick the thread back up.
        </p>
        <Link
          href="/"
          className="brand-eyebrow mt-10 bg-plum px-8 py-4 text-[0.625rem] text-ivory transition-colors hover:bg-plum-600"
        >
          Back to home
        </Link>
      </Container>
    </section>
  );
}

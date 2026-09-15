export type PillarIconName =
  | "leaf"
  | "lotus"
  | "honeycomb"
  | "bolt"
  | "renew"
  | "infinity";

const paths: Record<PillarIconName, React.ReactNode> = {
  leaf: (
    <>
      <path d="M20 4c0 9-5 15-14 15C6 10 11 4 20 4Z" />
      <path d="M6 20 18 7" />
    </>
  ),
  lotus: (
    <>
      <path d="M12 3.4c2.9 2.9 4.3 5.9 4.3 9 0 2.2-1.9 3.9-4.3 3.9s-4.3-1.7-4.3-3.9c0-3.1 1.4-6.1 4.3-9Z" />
      <path d="M7.9 8.9C5.2 9.1 3.1 10.2 2.4 11.9c1.4 3.3 4.8 5.5 9.6 5.5s8.2-2.2 9.6-5.5c-.7-1.7-2.8-2.8-5.5-3" />
    </>
  ),
  honeycomb: (
    <>
      <path d="M12 2.6l3.9 2.2v4.5L12 11.6 8.1 9.3V4.8L12 2.6Z" />
      <path d="M8.1 9.3l3.9 2.3v4.5l-3.9 2.2-3.9-2.2v-4.5l3.9-2.3ZM15.9 9.3l3.9 2.3v4.5l-3.9 2.2-3.9-2.2v-4.5l3.9-2.3Z" />
    </>
  ),
  bolt: <path d="M13.5 3 5 13.4h5.7L10 21l8.5-10.4h-5.7L13.5 3Z" />,
  renew: (
    <>
      <path d="M20 12a8 8 0 1 1-2.6-5.9" />
      <path d="M20.4 4.5v4.2h-4.2" />
    </>
  ),
  infinity: (
    <path d="M8.2 8.4c2.1 0 2.7 1.6 3.8 3.6 1.1 2 1.7 3.6 3.8 3.6a3.6 3.6 0 0 0 0-7.2c-2.1 0-2.7 1.6-3.8 3.6-1.1 2-1.7 3.6-3.8 3.6a3.6 3.6 0 0 1 0-7.2Z" />
  ),
};

export function PillarIcon({
  name,
  className = "",
}: {
  name: PillarIconName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {paths[name]}
    </svg>
  );
}

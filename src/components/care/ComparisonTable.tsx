import { Check, onIvoryFocus } from "@/components/care/PlanCards";

/* ------------------------------------------------------------------
   The plan comparison, shared by the care pages.

   A string value prints as written, which is how conditional care is stated
   ("When clinically appropriate") rather than implied by a tick. `true` is a
   tick, `false` a dash — both carry screen-reader text, because a tick alone
   is not a sentence.

   The scroll container is `contain: paint`: a table with a min-width still
   widens the layout viewport on a phone otherwise, which zooms the page out.
   ------------------------------------------------------------------ */

export type ComparisonRow = { label: string; values: (string | boolean)[] };

export function ComparisonTable({
  columns,
  rows,
  caption,
  heading,
  intro,
}: {
  columns: string[];
  rows: ComparisonRow[];
  caption: string;
  heading: string;
  intro: string;
}) {
  return (
    <div className="mt-16">
      <h3 className="font-display text-[1.6rem] leading-tight text-onyx">
        {heading}
      </h3>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-onyx-800/75">
        {intro}
      </p>

      <div
        tabIndex={0}
        role="region"
        aria-label={`${caption}, scrollable`}
        className={`mt-7 max-w-full overflow-x-auto [contain:paint] ${onIvoryFocus}`}
      >
        <table
          className="w-full border-collapse text-left"
          style={{ minWidth: `${14 + columns.length * 9}rem` }}
        >
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr className="border-b border-onyx/20">
              <th scope="col" className="py-4 pr-4 text-sm font-normal text-onyx-800/70">
                <span className="sr-only">Feature</span>
              </th>
              {columns.map((column) => (
                <th
                  key={column}
                  scope="col"
                  className="py-4 pr-4 font-display text-base font-normal text-onyx last:pr-0"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-b border-onyx/10">
                <th
                  scope="row"
                  className="py-4 pr-6 text-sm font-normal leading-relaxed text-onyx-800/85"
                >
                  {row.label}
                </th>
                {row.values.map((value, index) => (
                  <td
                    key={`${row.label}-${columns[index]}`}
                    className="py-4 pr-4 text-sm leading-relaxed text-onyx-800/85 last:pr-0"
                  >
                    {typeof value === "string" ? (
                      value
                    ) : value ? (
                      <>
                        <span aria-hidden="true" className="text-plum">
                          <Check />
                        </span>
                        <span className="sr-only">Included</span>
                      </>
                    ) : (
                      <>
                        <span aria-hidden="true" className="text-taupe-700">
                          &mdash;
                        </span>
                        <span className="sr-only">Not included</span>
                      </>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

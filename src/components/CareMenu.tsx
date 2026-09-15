"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { careLabel, pillars } from "@/lib/pillars";

/**
 * The desktop "Care" navigation item: a link to the Care hub that also opens
 * a dropdown of the six care pathways.
 *
 * "Care" itself stays a real link, so a click or Enter always reaches /care.
 * The dropdown is a separate disclosure button beside it — that keeps the
 * link's behaviour unambiguous for every input, and gives touch users
 * something to tap that is not also a navigation.
 */
export function CareMenu({ active }: { active: boolean }) {
  const menuId = useId();
  const [open, setOpen] = useState(false);
  const wrapper = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  // Close on outside pointer, on Escape, and whenever focus leaves the menu.
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!wrapper.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    const onFocusIn = (event: FocusEvent) => {
      if (!wrapper.current?.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("focusin", onFocusIn);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("focusin", onFocusIn);
    };
  }, [open]);

  return (
    <div
      ref={wrapper}
      className="relative"
      /* Hover-to-open is for pointers that actually hover. On a touch screen
         the browser emulates an enter event as part of the tap, which would
         open the menu and let the same tap's click close it again — so the
         tap never appears to do anything. Gating on `pointerType` leaves the
         button as a plain toggle for touch and keyboard. */
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setOpen(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") setOpen(false);
      }}
    >
      <div className="flex items-center gap-1">
        <Link
          href="/care"
          className={`brand-eyebrow text-[0.625rem] transition-colors hover:text-champagne ${
            active ? "text-champagne" : "text-ivory-200"
          }`}
          aria-current={active ? "page" : undefined}
        >
          Care
        </Link>
        <button
          ref={trigger}
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls={menuId}
          className="flex h-6 w-6 items-center justify-center rounded-full text-ivory-200 transition-colors hover:text-champagne"
        >
          <span className="sr-only">
            {open ? "Hide care pathways" : "Show care pathways"}
          </span>
          <svg
            viewBox="0 0 12 8"
            className={`h-2 w-2 transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M1 1.6 6 6.4l5-4.8" />
          </svg>
        </button>
      </div>

      <div
        id={menuId}
        hidden={!open}
        className="absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-4"
      >
        <ul className="hairline border bg-onyx-900/98 py-2 shadow-[0_24px_50px_-20px_rgba(0,0,0,0.9)] backdrop-blur-md">
          {pillars.map((pillar) => (
            <li key={pillar.slug}>
              <Link
                href={`/pillars/${pillar.slug}`}
                className="group flex items-center justify-between gap-3 px-5 py-2.5 text-sm text-ivory-200 transition-colors hover:bg-onyx-800 hover:text-champagne"
              >
                {careLabel(pillar)}
                <span
                  aria-hidden="true"
                  className="text-champagne opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                >
                  &rarr;
                </span>
              </Link>
            </li>
          ))}
          <li className="hairline mt-2 border-t pt-2">
            <Link
              href="/care"
              className="brand-eyebrow block px-5 py-2.5 text-[0.5625rem] text-champagne transition-colors hover:bg-onyx-800"
            >
              All care pathways
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

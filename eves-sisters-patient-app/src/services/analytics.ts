/**
 * Product analytics guard.
 *
 * No analytics vendor is installed. This module is the only door any future
 * vendor may be wired through, and it enforces:
 *  - an allow-list of event names (no free-form events);
 *  - an allow-list of property keys with primitive values;
 *  - redaction of anything that looks like an email, phone number or date;
 *  - no screen names or route params that could reveal a health interest
 *    (treatment, category and package slugs are dropped).
 *
 * Health information must never reach analytics, advertising trackers or
 * crash logs. Treatment interest itself is health information.
 */
export type AnalyticsEvent =
  | 'app_opened'
  | 'onboarding_viewed'
  | 'sign_in_succeeded'
  | 'sign_up_succeeded'
  | 'catalog_viewed'
  | 'settings_changed';

const allowedProps = ['step', 'platform', 'outcome'] as const;
type AllowedProp = (typeof allowedProps)[number];

const EMAIL = /[^\s@]+@[^\s@]+\.[^\s@]+/;
const PHONE = /\+?\d[\d\s().-]{6,}\d/;
const DATE = /\d{4}-\d{2}-\d{2}|\d{1,2}\/\d{1,2}\/\d{2,4}/;

export type SanitizedEvent = { name: AnalyticsEvent; props: Partial<Record<AllowedProp, string | number | boolean>> };

export function sanitizeAnalytics(name: AnalyticsEvent, props: Record<string, unknown> = {}): SanitizedEvent {
  const clean: SanitizedEvent['props'] = {};
  for (const key of allowedProps) {
    const value = props[key];
    if (typeof value === 'number' || typeof value === 'boolean') clean[key] = value;
    else if (typeof value === 'string') {
      clean[key] = EMAIL.test(value) || PHONE.test(value) || DATE.test(value) ? '[redacted]' : value.slice(0, 40);
    }
  }
  return { name, props: clean };
}

type Sink = (event: SanitizedEvent) => void;
let sink: Sink | null = null;

/** Only for a reviewed, BAA-covered or PHI-free vendor integration. */
export function setAnalyticsSink(next: Sink | null) {
  sink = next;
}

export function track(name: AnalyticsEvent, props?: Record<string, unknown>) {
  const event = sanitizeAnalytics(name, props);
  sink?.(event);
}

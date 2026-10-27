/**
 * Form validation. Each validator returns an error message, or undefined when
 * the value is valid. Messages are written to be read aloud by screen readers.
 */
export type Validator<T = string> = (value: T) => string | undefined;

export const required =
  (label: string): Validator =>
  (value) =>
    value.trim().length === 0 ? `${label} is required.` : undefined;

export const email: Validator = (value) => {
  const v = value.trim();
  if (!v) return 'Email is required.';
  // Deliberately simple: the identity provider performs authoritative checks.
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) || v.length > 254) return 'Enter a valid email address.';
  return undefined;
};

export const PASSWORD_RULES = [
  { test: (v: string) => v.length >= 12, label: 'At least 12 characters' },
  { test: (v: string) => /[a-z]/.test(v) && /[A-Z]/.test(v), label: 'Upper- and lower-case letters' },
  { test: (v: string) => /\d/.test(v), label: 'At least one number' },
  { test: (v: string) => /[^A-Za-z0-9]/.test(v), label: 'At least one symbol' },
] as const;

export const newPassword: Validator = (value) => {
  if (!value) return 'Password is required.';
  const failing = PASSWORD_RULES.filter((r) => !r.test(value));
  if (failing.length) return `Password needs: ${failing.map((r) => r.label.toLowerCase()).join(', ')}.`;
  return undefined;
};

export const existingPassword: Validator = (value) => (value ? undefined : 'Password is required.');

export const personName =
  (label: string): Validator =>
  (value) => {
    const v = value.trim();
    if (!v) return `${label} is required.`;
    if (v.length > 50) return `${label} must be 50 characters or fewer.`;
    if (!/^[\p{L}][\p{L}\p{M} '’.-]*$/u.test(v)) return `${label} can include letters, spaces, apostrophes and hyphens.`;
    return undefined;
  };

/** MM/DD/YYYY; patient must be 18 or older. */
export function dateOfBirth(value: string, today: Date = new Date()): string | undefined {
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value.trim());
  if (!m) return 'Enter your date of birth as MM/DD/YYYY.';
  const [month, day, year] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const d = new Date(year, month - 1, day);
  if (d.getFullYear() !== year || d.getMonth() !== month - 1 || d.getDate() !== day) {
    return 'Enter a real calendar date.';
  }
  if (d > today) return 'Date of birth can’t be in the future.';
  const adult = new Date(year + 18, month - 1, day);
  if (adult > today) return 'You must be 18 or older to use Eve’s Sisters.';
  if (year < today.getFullYear() - 120) return 'Enter a valid year.';
  return undefined;
}

export const usPhoneOptional: Validator = (value) => {
  const digits = value.replace(/\D/g, '');
  if (!digits) return undefined;
  if (digits.length === 10 || (digits.length === 11 && digits.startsWith('1'))) return undefined;
  return 'Enter a 10-digit U.S. phone number.';
};

export const matches =
  (other: string, message: string): Validator =>
  (value) =>
    value === other ? undefined : message;

export function weightLbs(value: string): string | undefined {
  const v = value.trim();
  if (!v) return 'Enter a weight, or skip this entry.';
  if (!/^\d{2,3}(\.\d)?$/.test(v)) return 'Enter a number like 152 or 152.5.';
  const n = Number(v);
  if (n < 50 || n > 700) return 'Enter a weight between 50 and 700 lbs.';
  return undefined;
}

export const maxLength =
  (label: string, max: number): Validator =>
  (value) =>
    value.length > max ? `${label} must be ${max} characters or fewer.` : undefined;

export function runValidators(value: string, validators: Validator[]): string | undefined {
  for (const v of validators) {
    const error = v(value);
    if (error) return error;
  }
  return undefined;
}

/** Validates a whole form. Returns a map of field → error for invalid fields only. */
export function validateForm<K extends string>(
  values: Record<K, string>,
  rules: Partial<Record<K, Validator[]>>,
): Partial<Record<K, string>> {
  const errors: Partial<Record<K, string>> = {};
  (Object.keys(rules) as K[]).forEach((key) => {
    const error = runValidators(values[key] ?? '', rules[key] ?? []);
    if (error) errors[key] = error;
  });
  return errors;
}

export const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA',
  'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR',
  'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
] as const;

export function usState(value: string): string | undefined {
  const v = value.trim().toUpperCase();
  if (!v) return 'State is required.';
  return (US_STATES as readonly string[]).includes(v) ? undefined : 'Enter a two-letter U.S. state code, like TX.';
}

import { formatDob } from '@/lib/format';
import {
  dateOfBirth,
  email,
  matches,
  newPassword,
  personName,
  usPhoneOptional,
  usState,
  validateForm,
  weightLbs,
} from '@/lib/validation';

describe('email', () => {
  it.each(['a@b.co', 'first.last+tag@example.com'])('accepts %s', (v) => expect(email(v)).toBeUndefined());
  it.each(['', 'nope', 'a@b', 'a b@c.com'])('rejects %p', (v) => expect(email(v)).toBeDefined());
});

describe('newPassword', () => {
  it('accepts a strong password', () => expect(newPassword('Sunlit-Garden-42')).toBeUndefined());
  it('lists every unmet rule', () => {
    const msg = newPassword('short');
    expect(msg).toMatch(/12 characters/);
    expect(msg).toMatch(/number/);
    expect(msg).toMatch(/symbol/);
  });
});

describe('dateOfBirth', () => {
  const today = new Date(2026, 9, 27);
  it('accepts an adult', () => expect(dateOfBirth('01/15/1980', today)).toBeUndefined());
  it('accepts someone who turned 18 today', () => expect(dateOfBirth('10/27/2008', today)).toBeUndefined());
  it('rejects someone under 18', () => expect(dateOfBirth('10/28/2008', today)).toMatch(/18 or older/));
  it('rejects impossible dates', () => expect(dateOfBirth('02/30/1990', today)).toMatch(/real calendar date/));
  it('rejects wrong format', () => expect(dateOfBirth('1990-01-01', today)).toMatch(/MM\/DD\/YYYY/));
  it('formats digits as they are typed', () => {
    expect(formatDob('0115')).toBe('01/15');
    expect(formatDob('01151980')).toBe('01/15/1980');
    expect(formatDob('01/15/19801234')).toBe('01/15/1980');
  });
});

describe('other validators', () => {
  it('validates names', () => {
    expect(personName('First name')('Amara')).toBeUndefined();
    expect(personName('First name')('Anne-Marie O’Neil')).toBeUndefined();
    expect(personName('First name')('')).toMatch(/required/);
    expect(personName('First name')('123')).toBeDefined();
  });
  it('validates optional US phone numbers', () => {
    expect(usPhoneOptional('')).toBeUndefined();
    expect(usPhoneOptional('(713) 555-0100')).toBeUndefined();
    expect(usPhoneOptional('555-0100')).toBeDefined();
  });
  it('validates weight entries', () => {
    expect(weightLbs('152.5')).toBeUndefined();
    expect(weightLbs('abc')).toBeDefined();
    expect(weightLbs('20')).toBeDefined();
  });
  it('validates states', () => {
    expect(usState('tx')).toBeUndefined();
    expect(usState('ZZ')).toBeDefined();
  });
  it('validateForm returns only failing fields', () => {
    const errors = validateForm(
      { email: 'bad', confirm: 'x' },
      { email: [email], confirm: [matches('y', 'Passwords don’t match.')] },
    );
    expect(Object.keys(errors).sort()).toEqual(['confirm', 'email']);
  });
});

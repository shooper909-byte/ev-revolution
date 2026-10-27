import { colors, contrastRatio } from '@/theme';

/** Every text/background pairing the components actually use must meet WCAG AA (4.5:1). */
const pairs: [keyof typeof colors, keyof typeof colors][] = [
  ['text', 'background'],
  ['text', 'surface'],
  ['text', 'surfaceMuted'],
  ['text', 'surfaceAccent'],
  ['textMuted', 'background'],
  ['textMuted', 'surface'],
  ['textMuted', 'surfaceMuted'],
  ['textMuted', 'surfaceAccent'],
  ['textSubtle', 'surface'],
  ['heading', 'background'],
  ['heading', 'surface'],
  ['heading', 'surfaceAccent'],
  ['link', 'background'],
  ['link', 'surface'],
  ['onPrimary', 'primary'],
  ['textInverse', 'surfaceInverse'],
  ['textInverseMuted', 'surfaceInverse'],
  ['success', 'successSurface'],
  ['warning', 'warningSurface'],
  ['danger', 'dangerSurface'],
  ['info', 'infoSurface'],
  ['danger', 'background'],
  ['success', 'surface'],
];

describe('colour contrast', () => {
  it.each(pairs)('%s on %s meets 4.5:1', (fg, bg) => {
    expect(contrastRatio(colors[fg], colors[bg])).toBeGreaterThanOrEqual(4.5);
  });

  it('keeps champagne gold out of text roles (it fails on light surfaces)', () => {
    expect(contrastRatio(colors.gold, colors.background)).toBeLessThan(4.5);
  });

  it('rejects malformed colours', () => {
    expect(() => contrastRatio('#fff', '#000000')).toThrow();
  });
});

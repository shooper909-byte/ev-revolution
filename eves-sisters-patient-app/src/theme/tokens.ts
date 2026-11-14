/**
 * Eve's Sisters design tokens — the single source for colour, type, spacing,
 * radii and elevation. Components read from here; screens never hard-code a
 * hex value.
 *
 * Palette direction: deep burgundy, dusty rose, blush pink, warm ivory and
 * restrained champagne-gold accents. Gold is used for rules, borders and
 * icons only — it does not meet text-contrast minimums on light surfaces, so
 * `colors.gold` is never used for body copy (see contrast tests).
 */

export const palette = {
  burgundy900: '#2A0B18',
  burgundy800: '#3A0F22',
  burgundy700: '#5C1A33',
  burgundy600: '#742544',
  burgundy500: '#8E3A5A',
  rose500: '#B07386',
  rose400: '#C48B9F',
  rose200: '#E6C3CE',
  blush100: '#F6E3E6',
  blush50: '#FBF0F1',
  ivory50: '#FFFBF6',
  ivory100: '#FAF5EF',
  ivory200: '#F1E8DD',
  gold500: '#C9A96B',
  gold300: '#E3CD9F',
  gold700: '#8A6A2F',
  ink900: '#2B1620',
  ink700: '#5A3E4A',
  ink500: '#6E5560',
  white: '#FFFFFF',
  success700: '#2F6B4F',
  success100: '#E3F1EA',
  warning700: '#7A5410',
  warning100: '#F8EDD5',
  danger700: '#9B2335',
  danger100: '#F8E1E4',
  info700: '#3B4F7A',
  info100: '#E4E9F4',
} as const;

export const colors = {
  background: palette.ivory100,
  surface: palette.white,
  surfaceMuted: palette.blush50,
  surfaceAccent: palette.blush100,
  surfaceInverse: palette.burgundy800,
  border: palette.ivory200,
  borderStrong: palette.rose200,
  gold: palette.gold500,
  goldSoft: palette.gold300,

  text: palette.ink900,
  textMuted: palette.ink500,
  textSubtle: palette.ink700,
  textInverse: palette.ivory50,
  textInverseMuted: palette.rose200,
  heading: palette.burgundy700,
  link: palette.burgundy600,

  primary: palette.burgundy700,
  primaryPressed: palette.burgundy800,
  onPrimary: palette.ivory50,
  secondary: palette.rose400,
  onSecondary: palette.burgundy900,

  success: palette.success700,
  successSurface: palette.success100,
  warning: palette.warning700,
  warningSurface: palette.warning100,
  danger: palette.danger700,
  dangerSurface: palette.danger100,
  info: palette.info700,
  infoSurface: palette.info100,

  overlay: 'rgba(42, 11, 24, 0.55)',
  focus: palette.gold700,
} as const;

export type ColorToken = keyof typeof colors;

/** Font family names registered in `src/app/_layout.tsx`. */
export const fonts = {
  display: 'PlayfairDisplay_600SemiBold',
  displayItalic: 'PlayfairDisplay_400Regular_Italic',
  displayRegular: 'PlayfairDisplay_400Regular',
  body: 'Inter_400Regular',
  bodyMedium: 'Inter_500Medium',
  bodySemiBold: 'Inter_600SemiBold',
} as const;

export const typography = {
  hero: { fontFamily: fonts.display, fontSize: 34, lineHeight: 42 },
  title: { fontFamily: fonts.display, fontSize: 26, lineHeight: 34 },
  heading: { fontFamily: fonts.display, fontSize: 21, lineHeight: 28 },
  subheading: { fontFamily: fonts.bodySemiBold, fontSize: 17, lineHeight: 24 },
  body: { fontFamily: fonts.body, fontSize: 16, lineHeight: 24 },
  bodyStrong: { fontFamily: fonts.bodySemiBold, fontSize: 16, lineHeight: 24 },
  small: { fontFamily: fonts.body, fontSize: 14, lineHeight: 20 },
  caption: { fontFamily: fonts.bodyMedium, fontSize: 13, lineHeight: 18 },
  eyebrow: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 1.6,
    textTransform: 'uppercase' as const,
  },
  script: { fontFamily: fonts.displayItalic, fontSize: 20, lineHeight: 28 },
} as const;

export type TypographyVariant = keyof typeof typography;

export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

export const radii = {
  sm: 8,
  md: 14,
  lg: 20,
  xl: 28,
  pill: 999,
} as const;

export const shadows = {
  card: {
    shadowColor: palette.burgundy900,
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  raised: {
    shadowColor: palette.burgundy900,
    shadowOpacity: 0.14,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 10 },
    elevation: 5,
  },
} as const;

/** Minimum touch target, per Apple HIG (44pt) and Material (48dp). */
export const minTouchTarget = 48;

/** Content is centred and capped on tablets and the web. */
export const maxContentWidth = 640;

export const motion = {
  fast: 150,
  base: 250,
  slow: 400,
} as const;

export const theme = { palette, colors, fonts, typography, spacing, radii, shadows, minTouchTarget, maxContentWidth, motion };
export type Theme = typeof theme;

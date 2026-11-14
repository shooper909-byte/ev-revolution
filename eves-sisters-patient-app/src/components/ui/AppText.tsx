import { Text, type TextProps } from 'react-native';

import { colors, typography, type ColorToken, type TypographyVariant } from '@/theme';

export type AppTextProps = TextProps & {
  variant?: TypographyVariant;
  color?: ColorToken;
  align?: 'left' | 'center' | 'right';
};

const headingVariants: TypographyVariant[] = ['hero', 'title', 'heading'];

/**
 * Every piece of copy goes through AppText so type scale and colour stay on
 * the design system. Headings are announced as headers to screen readers.
 */
export function AppText({ variant = 'body', color, align, style, ...rest }: AppTextProps) {
  const isHeading = headingVariants.includes(variant);
  const resolvedColor = color ? colors[color] : isHeading ? colors.heading : colors.text;
  return (
    <Text
      accessibilityRole={isHeading ? 'header' : undefined}
      maxFontSizeMultiplier={1.6}
      {...rest}
      style={[typography[variant], { color: resolvedColor }, align ? { textAlign: align } : null, style]}
    />
  );
}

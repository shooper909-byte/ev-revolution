import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import { colors, spacing } from '@/theme';

import { AppText } from './AppText';

const logoFull = require('@/assets/images/brand/logo-full.png');
const logoMark = require('@/assets/images/brand/logo-mark.png');

export const TAGLINE = 'Fall in Love With Yourself Again.';

export function Logo({ size = 200, variant = 'full' }: { size?: number; variant?: 'full' | 'mark' }) {
  return (
    <Image
      source={variant === 'full' ? logoFull : logoMark}
      style={{ width: size, height: variant === 'full' ? size : size * 1.1 }}
      contentFit="contain"
      accessibilityLabel="Eve’s Sisters"
      accessible
    />
  );
}

/** A thin champagne rule used to separate editorial sections. */
export function GoldRule({ width = 48 }: { width?: number }) {
  return <View style={[styles.rule, { width }]} importantForAccessibility="no" />;
}

export function Tagline({ inverse = false }: { inverse?: boolean }) {
  return (
    <AppText variant="script" color={inverse ? 'textInverse' : 'heading'} align="center">
      {TAGLINE}
    </AppText>
  );
}

const styles = StyleSheet.create({
  rule: { height: 1.5, backgroundColor: colors.gold, marginVertical: spacing.xs, alignSelf: 'center' },
});

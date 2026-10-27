import { StyleSheet, View } from 'react-native';

import { colors, radii, spacing, type ColorToken } from '@/theme';

import { AppText } from './AppText';

export type BadgeTone = 'neutral' | 'brand' | 'success' | 'warning' | 'danger' | 'info' | 'demo';

const tones: Record<BadgeTone, { bg: string; text: ColorToken }> = {
  neutral: { bg: colors.border, text: 'textSubtle' },
  brand: { bg: colors.surfaceAccent, text: 'heading' },
  success: { bg: colors.successSurface, text: 'success' },
  warning: { bg: colors.warningSurface, text: 'warning' },
  danger: { bg: colors.dangerSurface, text: 'danger' },
  info: { bg: colors.infoSurface, text: 'info' },
  demo: { bg: colors.warningSurface, text: 'warning' },
};

export function Badge({ label, tone = 'neutral' }: { label: string; tone?: BadgeTone }) {
  const t = tones[tone];
  return (
    <View style={[styles.badge, { backgroundColor: t.bg }]}>
      <AppText variant="caption" color={t.text}>
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radii.pill,
  },
});

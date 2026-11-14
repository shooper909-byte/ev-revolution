import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { colors, radii, spacing, type ColorToken } from '@/theme';

import { AppText } from './AppText';
import { Icon, type IconName } from './Icon';

type Tone = 'info' | 'warning' | 'success' | 'danger' | 'brand' | 'demo';

const tones: Record<Tone, { bg: string; fg: ColorToken; icon: IconName }> = {
  info: { bg: colors.infoSurface, fg: 'info', icon: 'information-circle-outline' },
  warning: { bg: colors.warningSurface, fg: 'warning', icon: 'alert-circle-outline' },
  success: { bg: colors.successSurface, fg: 'success', icon: 'checkmark-circle-outline' },
  danger: { bg: colors.dangerSurface, fg: 'danger', icon: 'warning-outline' },
  brand: { bg: colors.surfaceAccent, fg: 'heading', icon: 'heart-outline' },
  demo: { bg: colors.warningSurface, fg: 'warning', icon: 'flask-outline' },
};

/** Inline callout for disclosures, simulated-feature notices and confirmations. */
export function Notice({
  tone = 'info',
  title,
  children,
  icon,
  testID,
}: {
  tone?: Tone;
  title?: string;
  children?: ReactNode;
  icon?: IconName;
  testID?: string;
}) {
  const t = tones[tone];
  return (
    <View style={[styles.box, { backgroundColor: t.bg }]} testID={testID} accessibilityRole="summary">
      <Icon name={icon ?? t.icon} size={20} color={t.fg} />
      <View style={styles.text}>
        {title ? (
          <AppText variant="bodyStrong" color={t.fg}>
            {title}
          </AppText>
        ) : null}
        {typeof children === 'string' ? (
          <AppText variant="small" color="text">
            {children}
          </AppText>
        ) : (
          children
        )}
      </View>
    </View>
  );
}

/** The banner every simulated clinical screen carries. */
export function DemoNotice({ children }: { children?: string }) {
  return (
    <Notice tone="demo" title="Demonstration only" testID="demo-notice">
      {children ??
        'This screen uses fictional sample data. No clinical request is sent and no care is provided through this preview.'}
    </Notice>
  );
}

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radii.md,
    alignItems: 'flex-start',
  },
  text: { flex: 1, gap: spacing.xs },
});

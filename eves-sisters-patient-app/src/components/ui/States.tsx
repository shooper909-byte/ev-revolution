import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { colors, spacing } from '@/theme';

import { AppText } from './AppText';
import { Button } from './Button';
import { Icon, type IconName } from './Icon';

export function LoadingState({ label = 'Loading…' }: { label?: string }) {
  return (
    <View style={styles.center} accessibilityRole="progressbar" accessibilityLabel={label} testID="loading-state">
      <ActivityIndicator size="large" color={colors.primary} />
      <AppText variant="small" color="textMuted" align="center">
        {label}
      </AppText>
    </View>
  );
}

export function EmptyState({
  icon = 'sparkles-outline',
  title,
  body,
  actionLabel,
  onAction,
}: {
  icon?: IconName;
  title: string;
  body?: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <View style={styles.center} testID="empty-state">
      <View style={styles.iconCircle}>
        <Icon name={icon} size={28} />
      </View>
      <AppText variant="subheading" align="center" color="heading">
        {title}
      </AppText>
      {body ? (
        <AppText variant="small" color="textMuted" align="center">
          {body}
        </AppText>
      ) : null}
      {actionLabel && onAction ? <Button label={actionLabel} onPress={onAction} variant="outline" fullWidth={false} /> : null}
    </View>
  );
}

export function ErrorState({
  title = 'Something didn’t load',
  body = 'Please check your connection and try again.',
  onRetry,
}: {
  title?: string;
  body?: string;
  onRetry?: () => void;
}) {
  return (
    <View style={styles.center} accessibilityRole="alert" testID="error-state">
      <View style={[styles.iconCircle, styles.errorCircle]}>
        <Icon name="cloud-offline-outline" size={28} color="danger" />
      </View>
      <AppText variant="subheading" align="center" color="heading">
        {title}
      </AppText>
      <AppText variant="small" color="textMuted" align="center">
        {body}
      </AppText>
      {onRetry ? <Button label="Try again" icon="refresh" onPress={onRetry} variant="outline" fullWidth={false} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.lg,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.surfaceAccent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorCircle: { backgroundColor: colors.dangerSurface },
});

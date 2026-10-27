import { Pressable, StyleSheet, View } from 'react-native';

import { minTouchTarget, spacing } from '@/theme';

import { AppText } from './AppText';

export function SectionHeader({
  eyebrow,
  title,
  actionLabel,
  onAction,
}: {
  eyebrow?: string;
  title: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <View style={styles.row}>
      <View style={styles.text}>
        {eyebrow ? (
          <AppText variant="eyebrow" color="textMuted">
            {eyebrow}
          </AppText>
        ) : null}
        <AppText variant="heading">{title}</AppText>
      </View>
      {actionLabel && onAction ? (
        <Pressable onPress={onAction} accessibilityRole="link" hitSlop={8} style={styles.action}>
          <AppText variant="caption" color="link">
            {actionLabel}
          </AppText>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', gap: spacing.md },
  text: { flex: 1, gap: spacing.xxs },
  action: { minHeight: minTouchTarget, justifyContent: 'flex-end', paddingBottom: spacing.xs },
});

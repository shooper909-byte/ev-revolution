import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { colors, minTouchTarget, radii, spacing } from '@/theme';

import { AppText } from './AppText';
import { Icon, type IconName } from './Icon';

export function ListRow({
  title,
  subtitle,
  icon,
  onPress,
  trailing,
  destructive = false,
  accessibilityHint,
  testID,
}: {
  title: string;
  subtitle?: string;
  icon?: IconName;
  onPress?: () => void;
  trailing?: ReactNode;
  destructive?: boolean;
  accessibilityHint?: string;
  testID?: string;
}) {
  const content = (
    <>
      {icon ? (
        <View style={[styles.iconWrap, destructive ? styles.iconDanger : null]}>
          <Icon name={icon} size={20} color={destructive ? 'danger' : 'heading'} />
        </View>
      ) : null}
      <View style={styles.text}>
        <AppText variant="bodyStrong" color={destructive ? 'danger' : 'text'}>
          {title}
        </AppText>
        {subtitle ? (
          <AppText variant="small" color="textMuted">
            {subtitle}
          </AppText>
        ) : null}
      </View>
      {trailing ?? (onPress ? <Icon name="chevron-forward" size={18} color="textMuted" /> : null)}
    </>
  );

  if (!onPress) return <View style={styles.row}>{content}</View>;

  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={subtitle ? `${title}. ${subtitle}` : title}
      accessibilityHint={accessibilityHint}
      style={({ pressed }) => [styles.row, pressed ? styles.pressed : null]}>
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    minHeight: minTouchTarget + 8,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xs,
    borderRadius: radii.md,
  },
  pressed: { backgroundColor: colors.surfaceMuted },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: radii.pill,
    backgroundColor: colors.surfaceAccent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconDanger: { backgroundColor: colors.dangerSurface },
  text: { flex: 1, gap: spacing.xxs },
});

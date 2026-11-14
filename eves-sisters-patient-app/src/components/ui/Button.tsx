import { ActivityIndicator, Pressable, StyleSheet, View, type ViewStyle } from 'react-native';

import { colors, minTouchTarget, radii, spacing, type ColorToken } from '@/theme';

import { AppText } from './AppText';
import { Icon, type IconName } from './Icon';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

const variantStyles: Record<Variant, { bg: string; pressed: string; border: string; text: ColorToken }> = {
  primary: { bg: colors.primary, pressed: colors.primaryPressed, border: colors.primary, text: 'onPrimary' },
  secondary: { bg: colors.surfaceAccent, pressed: colors.borderStrong, border: colors.surfaceAccent, text: 'heading' },
  outline: { bg: 'transparent', pressed: colors.surfaceMuted, border: colors.primary, text: 'heading' },
  ghost: { bg: 'transparent', pressed: colors.surfaceMuted, border: 'transparent', text: 'link' },
  danger: { bg: colors.danger, pressed: colors.danger, border: colors.danger, text: 'onPrimary' },
};

export type ButtonProps = {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  icon?: IconName;
  loading?: boolean;
  disabled?: boolean;
  /** Explains a disabled or simulated action to screen-reader users. */
  accessibilityHint?: string;
  fullWidth?: boolean;
  style?: ViewStyle;
  testID?: string;
};

export function Button({
  label,
  onPress,
  variant = 'primary',
  icon,
  loading = false,
  disabled = false,
  accessibilityHint,
  fullWidth = true,
  style,
  testID,
}: ButtonProps) {
  const v = variantStyles[variant];
  const inactive = disabled || loading;

  return (
    <Pressable
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled: inactive, busy: loading }}
      disabled={inactive}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        { backgroundColor: pressed ? v.pressed : v.bg, borderColor: v.border },
        fullWidth ? styles.fullWidth : null,
        inactive ? styles.inactive : null,
        style,
      ]}>
      {loading ? (
        <ActivityIndicator color={colors[v.text]} />
      ) : (
        <View style={styles.content}>
          {icon ? <Icon name={icon} size={20} color={v.text} /> : null}
          <AppText variant="bodyStrong" color={v.text} align="center">
            {label}
          </AppText>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: minTouchTarget + 4,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: radii.pill,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: { alignSelf: 'stretch' },
  inactive: { opacity: 0.5 },
  content: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
});

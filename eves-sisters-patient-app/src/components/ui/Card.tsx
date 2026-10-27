import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { colors, radii, shadows, spacing } from '@/theme';

type Tone = 'default' | 'muted' | 'accent' | 'inverse';

const toneBackground: Record<Tone, string> = {
  default: colors.surface,
  muted: colors.surfaceMuted,
  accent: colors.surfaceAccent,
  inverse: colors.surfaceInverse,
};

export function Card({
  children,
  tone = 'default',
  onPress,
  accessibilityLabel,
  accessibilityHint,
  style,
  padded = true,
  testID,
}: {
  children: ReactNode;
  tone?: Tone;
  onPress?: () => void;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  style?: StyleProp<ViewStyle>;
  padded?: boolean;
  testID?: string;
}) {
  const base = [
    styles.card,
    { backgroundColor: toneBackground[tone] },
    tone === 'default' ? styles.bordered : null,
    padded ? styles.padded : null,
    style,
  ];

  if (!onPress) {
    return (
      <View style={base} testID={testID}>
        {children}
      </View>
    );
  }

  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      style={({ pressed }) => [base, pressed ? styles.pressed : null]}>
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radii.lg,
    overflow: 'hidden',
    ...shadows.card,
  },
  bordered: { borderWidth: 1, borderColor: colors.border },
  padded: { padding: spacing.lg },
  pressed: { opacity: 0.92, transform: [{ scale: 0.995 }] },
});

import Ionicons from '@expo/vector-icons/Ionicons';
import type { ComponentProps } from 'react';

import { colors, type ColorToken } from '@/theme';

export type IconName = ComponentProps<typeof Ionicons>['name'];

/** Decorative by default; pass `accessibilityLabel` when the icon carries meaning on its own. */
export function Icon({
  name,
  size = 22,
  color = 'heading',
  accessibilityLabel,
}: {
  name: IconName;
  size?: number;
  color?: ColorToken;
  accessibilityLabel?: string;
}) {
  return (
    <Ionicons
      name={name}
      size={size}
      color={colors[color]}
      accessible={Boolean(accessibilityLabel)}
      accessibilityLabel={accessibilityLabel}
      importantForAccessibility={accessibilityLabel ? 'yes' : 'no-hide-descendants'}
    />
  );
}

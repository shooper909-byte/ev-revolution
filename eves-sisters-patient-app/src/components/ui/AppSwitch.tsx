import { Platform, Switch, type SwitchProps } from 'react-native';

import { colors } from '@/theme';

/** Brand-coloured switch. Always pass `accessibilityLabel`. */
export function AppSwitch(props: SwitchProps & { accessibilityLabel: string }) {
  return (
    <Switch
      trackColor={{ true: colors.primary, false: colors.borderStrong }}
      thumbColor={Platform.OS === 'android' ? colors.surface : undefined}
      {...(Platform.OS === 'web' ? { activeThumbColor: colors.surface } : null)}
      ios_backgroundColor={colors.borderStrong}
      {...props}
    />
  );
}

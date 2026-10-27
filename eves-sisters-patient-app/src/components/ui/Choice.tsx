import { Pressable, StyleSheet, View } from 'react-native';

import { colors, minTouchTarget, radii, spacing } from '@/theme';

import { AppText } from './AppText';

export type ChoiceOption<T extends string> = { value: T; label: string; description?: string };

/** Segmented control for switching between a small number of views. */
export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  accessibilityLabel,
}: {
  options: ChoiceOption<T>[];
  value: T;
  onChange: (value: T) => void;
  accessibilityLabel: string;
}) {
  return (
    <View style={styles.segmented} accessibilityRole="tablist" accessibilityLabel={accessibilityLabel}>
      {options.map((o) => {
        const selected = o.value === value;
        return (
          <Pressable
            key={o.value}
            onPress={() => onChange(o.value)}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            style={[styles.segment, selected ? styles.segmentSelected : null]}>
            <AppText variant="caption" color={selected ? 'onPrimary' : 'textSubtle'} align="center">
              {o.label}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

/** Wrapping chip group: single-select by default, multi-select with `multiple`. */
export function ChipGroup<T extends string>({
  options,
  selected,
  onToggle,
  accessibilityLabel,
}: {
  options: ChoiceOption<T>[];
  selected: T[];
  onToggle: (value: T) => void;
  accessibilityLabel: string;
}) {
  return (
    <View style={styles.chips} accessibilityLabel={accessibilityLabel} accessibilityRole="radiogroup">
      {options.map((o) => {
        const isOn = selected.includes(o.value);
        return (
          <Pressable
            key={o.value}
            onPress={() => onToggle(o.value)}
            accessibilityRole="radio"
            accessibilityState={{ checked: isOn }}
            accessibilityLabel={o.label}
            style={[styles.chip, isOn ? styles.chipOn : null]}>
            <AppText variant="caption" color={isOn ? 'onPrimary' : 'text'}>
              {o.label}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

/** Large tappable option card for wizards (appointment type, time slots, etc.). */
export function OptionCard({
  label,
  description,
  selected,
  onPress,
  disabled,
  testID,
}: {
  label: string;
  description?: string;
  selected: boolean;
  onPress: () => void;
  disabled?: boolean;
  testID?: string;
}) {
  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="radio"
      accessibilityState={{ checked: selected, disabled }}
      accessibilityLabel={description ? `${label}. ${description}` : label}
      style={[styles.option, selected ? styles.optionOn : null, disabled ? styles.optionDisabled : null]}>
      <View style={[styles.radio, selected ? styles.radioOn : null]}>{selected ? <View style={styles.radioDot} /> : null}</View>
      <View style={styles.optionText}>
        <AppText variant="bodyStrong">{label}</AppText>
        {description ? (
          <AppText variant="small" color="textMuted">
            {description}
          </AppText>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  segmented: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceAccent,
    borderRadius: radii.pill,
    padding: spacing.xs,
    gap: spacing.xs,
  },
  segment: {
    flex: 1,
    minHeight: minTouchTarget - 4,
    borderRadius: radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.sm,
  },
  segmentSelected: { backgroundColor: colors.primary },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  chip: {
    minHeight: minTouchTarget - 4,
    paddingHorizontal: spacing.lg,
    borderRadius: radii.pill,
    borderWidth: 1.5,
    borderColor: colors.borderStrong,
    backgroundColor: colors.surface,
    justifyContent: 'center',
  },
  chipOn: { backgroundColor: colors.primary, borderColor: colors.primary },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.lg,
    minHeight: minTouchTarget + 12,
    borderRadius: radii.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  optionOn: { borderColor: colors.primary, backgroundColor: colors.surfaceMuted },
  optionDisabled: { opacity: 0.45 },
  optionText: { flex: 1, gap: spacing.xxs },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.borderStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOn: { borderColor: colors.primary },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.primary },
});

import { forwardRef, useState } from 'react';
import { Pressable, StyleSheet, TextInput, View, type TextInputInstance, type TextInputProps } from 'react-native';

import { colors, fonts, minTouchTarget, radii, spacing } from '@/theme';

import { AppText } from './AppText';
import { Icon } from './Icon';

export type TextFieldProps = Omit<TextInputProps, 'style'> & {
  label: string;
  error?: string;
  helper?: string;
  /** Renders a show/hide toggle and masks the value. */
  secure?: boolean;
  required?: boolean;
};

export const TextField = forwardRef<TextInputInstance, TextFieldProps>(function TextField(
  { label, error, helper, secure = false, required = false, testID, ...inputProps },
  ref,
) {
  const [hidden, setHidden] = useState(secure);
  const [focused, setFocused] = useState(false);
  const describedBy = error ?? helper;

  return (
    <View style={styles.wrapper}>
      <AppText variant="caption" color="textSubtle" nativeID={testID ? `${testID}-label` : undefined}>
        {label}
        {required ? ' *' : ''}
      </AppText>
      <View
        style={[
          styles.inputRow,
          focused ? styles.focused : null,
          error ? styles.errored : null,
          inputProps.editable === false ? styles.disabled : null,
        ]}>
        <TextInput
          ref={ref}
          testID={testID}
          accessibilityLabel={label}
          accessibilityHint={describedBy}
          aria-invalid={Boolean(error)}
          placeholderTextColor={colors.textMuted}
          secureTextEntry={hidden}
          maxFontSizeMultiplier={1.6}
          {...inputProps}
          onFocus={(e) => {
            setFocused(true);
            inputProps.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            inputProps.onBlur?.(e);
          }}
          style={styles.input}
        />
        {secure ? (
          <Pressable
            onPress={() => setHidden((h) => !h)}
            accessibilityRole="button"
            accessibilityLabel={hidden ? `Show ${label.toLowerCase()}` : `Hide ${label.toLowerCase()}`}
            hitSlop={8}
            style={styles.toggle}>
            <Icon name={hidden ? 'eye-outline' : 'eye-off-outline'} color="textMuted" />
          </Pressable>
        ) : null}
      </View>
      {error ? (
        <AppText variant="caption" color="danger" accessibilityLiveRegion="polite" accessibilityRole="alert">
          {error}
        </AppText>
      ) : helper ? (
        <AppText variant="caption" color="textMuted">
          {helper}
        </AppText>
      ) : null}
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: { gap: spacing.xs, alignSelf: 'stretch' },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: minTouchTarget + 4,
    borderRadius: radii.md,
    borderWidth: 1.5,
    borderColor: colors.borderStrong,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
  },
  focused: { borderColor: colors.focus },
  errored: { borderColor: colors.danger },
  disabled: { backgroundColor: colors.surfaceMuted },
  input: {
    flex: 1,
    fontFamily: fonts.body,
    fontSize: 16,
    color: colors.text,
    paddingVertical: spacing.md,
  },
  toggle: { paddingLeft: spacing.sm, minHeight: minTouchTarget, justifyContent: 'center' },
});

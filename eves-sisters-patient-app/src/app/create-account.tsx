import { Link } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppSwitch, AppText, Button, Icon, Notice, Screen, TextField } from '@/components/ui';
import { toUserMessage } from '@/integrations/karpa/errors';
import {
  PASSWORD_RULES,
  dateOfBirth,
  email as emailRule,
  matches,
  newPassword,
  personName,
  validateForm,
} from '@/lib/validation';
import { formatDob } from '@/lib/format';
import { useSession } from '@/state/SessionProvider';
import { spacing } from '@/theme';

type Field = 'firstName' | 'lastName' | 'email' | 'dob' | 'password' | 'confirm';

/**
 * Account creation collects the minimum needed to create a login and confirm
 * the user is an adult. No health information is requested here — clinical
 * intake happens later, inside the clinical platform's secure flow.
 */
export default function CreateAccount() {
  const { signUp } = useSession();
  const [values, setValues] = useState<Record<Field, string>>({
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    password: '',
    confirm: '',
  });
  const [errors, setErrors] = useState<Partial<Record<Field | 'terms', string>>>({});
  const [agreed, setAgreed] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const set = (key: Field) => (v: string) => {
    setValues((prev) => ({ ...prev, [key]: key === 'dob' ? formatDob(v) : v }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const submit = async () => {
    setFormError(null);
    const next: typeof errors = validateForm(values, {
      firstName: [personName('First name')],
      lastName: [personName('Last name')],
      email: [emailRule],
      dob: [(v) => dateOfBirth(v)],
      password: [newPassword],
      confirm: [matches(values.password, 'Passwords don’t match.')],
    });
    if (!agreed) next.terms = 'Please review and accept to continue.';
    setErrors(next);
    if (Object.keys(next).length) return;

    setSubmitting(true);
    try {
      // Date of birth is used only for the age check and is not sent in the demo.
      await signUp({
        email: values.email,
        password: values.password,
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
      });
      // The protected-route guard moves the user into the app.
    } catch (e) {
      setFormError(toUserMessage(e));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Screen>
      <View style={{ gap: spacing.xs }}>
        <AppText variant="title">Begin your journey</AppText>
        <AppText color="textMuted">
          Create a private account. We’ll only ask about your health later, in a secure consultation intake.
        </AppText>
      </View>
      <Notice tone="demo" title="Demo account">
        This preview doesn’t create a real account. Please don’t enter real personal or health information.
      </Notice>

      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <TextField label="First name" value={values.firstName} onChangeText={set('firstName')} error={errors.firstName} autoComplete="given-name" textContentType="givenName" required testID="ca-first" />
        </View>
        <View style={{ flex: 1 }}>
          <TextField label="Last name" value={values.lastName} onChangeText={set('lastName')} error={errors.lastName} autoComplete="family-name" textContentType="familyName" required testID="ca-last" />
        </View>
      </View>
      <TextField label="Email" value={values.email} onChangeText={set('email')} error={errors.email} keyboardType="email-address" autoCapitalize="none" autoComplete="email" textContentType="emailAddress" required testID="ca-email" />
      <TextField
        label="Date of birth"
        value={values.dob}
        onChangeText={set('dob')}
        error={errors.dob}
        helper="MM/DD/YYYY. You must be 18 or older."
        keyboardType="number-pad"
        maxLength={10}
        required
        testID="ca-dob"
      />
      <TextField label="Password" value={values.password} onChangeText={set('password')} error={errors.password} secure autoComplete="new-password" textContentType="newPassword" required testID="ca-password" />
      <View style={styles.rules} accessibilityLabel="Password requirements">
        {PASSWORD_RULES.map((r) => {
          const ok = r.test(values.password);
          return (
            <View key={r.label} style={styles.rule}>
              <Icon name={ok ? 'checkmark-circle' : 'ellipse-outline'} size={16} color={ok ? 'success' : 'textMuted'} />
              <AppText variant="caption" color={ok ? 'success' : 'textMuted'}>
                {r.label}
              </AppText>
            </View>
          );
        })}
      </View>
      <TextField label="Confirm password" value={values.confirm} onChangeText={set('confirm')} error={errors.confirm} secure autoComplete="new-password" required testID="ca-confirm" />

      <Pressable
        onPress={() => {
          setAgreed((a) => !a);
          setErrors((prev) => ({ ...prev, terms: undefined }));
        }}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: agreed }}
        style={styles.terms}>
        <AppSwitch
          value={agreed}
          onValueChange={setAgreed}
          accessibilityLabel="Accept terms"
          testID="ca-terms"
        />
        <AppText variant="small" style={{ flex: 1 }}>
          I agree to the Terms of Service, Privacy Policy and Telehealth Consent.{' '}
          <AppText variant="small" color="textMuted">
            (Final documents pending legal review.)
          </AppText>
        </AppText>
      </Pressable>
      {errors.terms ? (
        <AppText variant="caption" color="danger" accessibilityRole="alert">
          {errors.terms}
        </AppText>
      ) : null}

      {formError ? <Notice tone="danger">{formError}</Notice> : null}

      <Button label="Create account" onPress={submit} loading={submitting} testID="ca-submit" />
      <View style={styles.signIn}>
        <AppText color="textMuted">Already a member?</AppText>
        <Link href="/sign-in" replace>
          <AppText variant="bodyStrong" color="link">
            Sign in
          </AppText>
        </Link>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: spacing.md },
  rules: { gap: spacing.xs, marginTop: -spacing.sm },
  rule: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  terms: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, minHeight: 48 },
  signIn: { flexDirection: 'row', gap: spacing.xs, justifyContent: 'center', flexWrap: 'wrap' },
});

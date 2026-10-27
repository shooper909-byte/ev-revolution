import { Link } from 'expo-router';
import { useRef, useState } from 'react';
import { StyleSheet, View, type TextInputInstance } from 'react-native';

import { AppText, Button, Notice, Screen, TextField } from '@/components/ui';
import { DEMO_PASSWORD_HINT } from '@/data/demo/seed';
import { toUserMessage } from '@/integrations/karpa/errors';
import { email as emailRule, existingPassword, validateForm } from '@/lib/validation';
import { useSession } from '@/state/SessionProvider';
import { spacing } from '@/theme';

export default function SignIn() {
  const { signIn, endNotice, clearEndNotice } = useSession();
  const [values, setValues] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<Partial<Record<'email' | 'password', string>>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const passwordRef = useRef<TextInputInstance>(null);

  const set = (key: keyof typeof values) => (v: string) => {
    setValues((prev) => ({ ...prev, [key]: v }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const submit = async () => {
    setFormError(null);
    const next = validateForm(values, { email: [emailRule], password: [existingPassword] });
    setErrors(next);
    if (Object.keys(next).length) return;
    setSubmitting(true);
    try {
      await signIn(values.email, values.password);
      clearEndNotice();
      // The protected-route guard moves the user into the app.
    } catch (e) {
      setFormError(toUserMessage(e));
      setValues((prev) => ({ ...prev, password: '' }));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Screen>
      <View style={styles.intro}>
        <AppText variant="title">Welcome back</AppText>
        <AppText color="textMuted">Sign in to see your appointments, care plan and wellness journey.</AppText>
      </View>

      {endNotice ? <Notice tone="info">{endNotice}</Notice> : null}
      <Notice tone="demo" title="Demo sign-in">
        {`${DEMO_PASSWORD_HINT} No real account or health information is used.`}
      </Notice>

      <TextField
        label="Email"
        value={values.email}
        onChangeText={set('email')}
        error={errors.email}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        textContentType="username"
        returnKeyType="next"
        onSubmitEditing={() => passwordRef.current?.focus()}
        testID="sign-in-email"
        required
      />
      <TextField
        ref={passwordRef}
        label="Password"
        value={values.password}
        onChangeText={set('password')}
        error={errors.password}
        secure
        autoComplete="current-password"
        textContentType="password"
        returnKeyType="go"
        onSubmitEditing={submit}
        testID="sign-in-password"
        required
      />

      {formError ? (
        <Notice tone="danger" testID="sign-in-error">
          {formError}
        </Notice>
      ) : null}

      <Button label="Sign in" onPress={submit} loading={submitting} testID="sign-in-submit" />
      <Link href="/forgot-password" style={styles.link}>
        <AppText variant="bodyStrong" color="link">
          Forgot your password?
        </AppText>
      </Link>
      <View style={styles.row}>
        <AppText color="textMuted">New to Eve’s Sisters?</AppText>
        <Link href="/create-account" replace>
          <AppText variant="bodyStrong" color="link">
            Create an account
          </AppText>
        </Link>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  intro: { gap: spacing.xs },
  link: { alignSelf: 'center', paddingVertical: spacing.md },
  row: { flexDirection: 'row', gap: spacing.xs, justifyContent: 'center', flexWrap: 'wrap' },
});

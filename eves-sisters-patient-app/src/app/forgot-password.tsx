import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import { AppText, Button, Notice, Screen, TextField } from '@/components/ui';
import { email as emailRule } from '@/lib/validation';
import { useSession } from '@/state/SessionProvider';
import { spacing } from '@/theme';

/**
 * Account recovery. The response is identical whether or not the email has an
 * account, so the screen can't be used to discover who is a patient.
 */
export default function ForgotPassword() {
  const { requestPasswordReset } = useSession();
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | undefined>();
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const submit = async () => {
    const e = emailRule(value);
    setError(e);
    if (e) return;
    setSubmitting(true);
    try {
      await requestPasswordReset(value);
    } finally {
      // Always show the same confirmation, even on failure (anti-enumeration).
      setSubmitting(false);
      setSent(true);
    }
  };

  return (
    <Screen>
      <View style={{ gap: spacing.xs }}>
        <AppText variant="title">Reset your password</AppText>
        <AppText color="textMuted">Enter the email you use for Eve’s Sisters and we’ll send reset instructions.</AppText>
      </View>
      {sent ? (
        <>
          <Notice tone="success" title="Check your email" testID="reset-sent">
            If an account exists for that address, you’ll receive instructions shortly. The link expires for your security.
          </Notice>
          <Notice tone="demo">No email is actually sent from this preview.</Notice>
          <Button label="Back to sign in" onPress={() => router.replace('/sign-in')} />
        </>
      ) : (
        <>
          <TextField
            label="Email"
            value={value}
            onChangeText={(v) => {
              setValue(v);
              setError(undefined);
            }}
            error={error}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            required
            testID="reset-email"
          />
          <Button label="Send reset instructions" onPress={submit} loading={submitting} testID="reset-submit" />
        </>
      )}
    </Screen>
  );
}

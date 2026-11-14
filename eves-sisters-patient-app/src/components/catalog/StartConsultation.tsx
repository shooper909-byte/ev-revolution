import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import { AppText, Button, Card } from '@/components/ui';
import { useSession } from '@/state/SessionProvider';
import { spacing } from '@/theme';

/**
 * The "Start Consultation" next step. Signed-in patients go to the
 * (simulated) consultation request; visitors are asked to sign in first so
 * nothing about their interest is collected anonymously.
 */
export function StartConsultation({ interestSlug, label = 'Start consultation' }: { interestSlug: string; label?: string }) {
  const { status } = useSession();
  const [askAuth, setAskAuth] = useState(false);

  if (status === 'signed-in') {
    return (
      <Button
        label={label}
        icon="chatbubble-ellipses-outline"
        onPress={() => router.push({ pathname: '/consultation/start', params: { interest: interestSlug } })}
        testID="start-consultation"
      />
    );
  }

  return (
    <View style={{ gap: spacing.md }}>
      <Button label={label} icon="chatbubble-ellipses-outline" onPress={() => setAskAuth(true)} testID="start-consultation" />
      {askAuth ? (
        <Card tone="muted" testID="consultation-auth-prompt">
          <View style={{ gap: spacing.md }}>
            <AppText variant="bodyStrong">Create a private account to continue</AppText>
            <AppText variant="small" color="textMuted">
              Your consultation request is kept inside your account, never collected anonymously.
            </AppText>
            <Button label="Create account" onPress={() => router.push('/create-account')} />
            <Button label="Sign in" variant="secondary" onPress={() => router.push('/sign-in')} />
          </View>
        </Card>
      ) : null}
    </View>
  );
}

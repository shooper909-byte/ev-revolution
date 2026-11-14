import { useState } from 'react';
import { View } from 'react-native';

import { AppText, Button, Card, DemoNotice, Notice, OptionCard, Screen, TextField } from '@/components/ui';
import { recordAudit } from '@/services/audit';
import { useSession } from '@/state/SessionProvider';
import { spacing } from '@/theme';

const reasons = [
  'I no longer need the service',
  'I have privacy concerns',
  'I’m using another provider',
  'Something else',
  'I’d rather not say',
];

/**
 * Account deletion request (Apple App Store guideline 5.1.1(v) and Google
 * Play's account-deletion policy both require an in-app path).
 *
 * The request is a *request*: medical records are generally subject to legal
 * retention requirements, so the backend and clinical partner decide what is
 * deleted and what must be retained. Retention language is a placeholder
 * pending legal review.
 */
export default function DeleteAccount() {
  const { user, signOut } = useSession();
  const [reason, setReason] = useState<string | null>(null);
  const [confirmText, setConfirmText] = useState('');
  const [error, setError] = useState<string | undefined>();
  const [submitted, setSubmitted] = useState(false);

  const submit = () => {
    if (confirmText.trim().toUpperCase() !== 'DELETE') {
      setError('Type DELETE to confirm.');
      return;
    }
    // Reason category only — no free text — goes to the audit log.
    recordAudit('account.deletion-requested', user?.id ?? null, { reason: reason ?? 'not-given', mode: 'mock' });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Screen>
        <Notice tone="success" title="Deletion request received" testID="delete-submitted">
          We’ll confirm by email within the published timeframe and let you know about any records we’re legally required to keep.
        </Notice>
        <DemoNotice>No account was deleted — this preview has no real accounts. Signing out will clear all demo data from this device.</DemoNotice>
        <Button label="Sign out now" onPress={() => void signOut()} testID="delete-sign-out" />
      </Screen>
    );
  }

  return (
    <Screen footer={<Button label="Request deletion" variant="danger" onPress={submit} testID="delete-submit" />}>
      <AppText variant="title">Delete your account</AppText>
      <Card tone="muted">
        <View style={{ gap: spacing.sm }}>
          <AppText variant="bodyStrong">What happens next</AppText>
          <AppText variant="small">• Your sign-in and app data are deleted.</AppText>
          <AppText variant="small">• Any active membership is cancelled; you won’t be billed again.</AppText>
          <AppText variant="small">
            • Medical records held by your clinical provider may need to be retained for a period required by law. [Placeholder — confirm with
            legal.]
          </AppText>
          <AppText variant="small">• You can create a new account in the future.</AppText>
        </View>
      </Card>
      <AppText variant="subheading" color="heading">
        Mind sharing why? (optional)
      </AppText>
      {reasons.map((r) => (
        <OptionCard key={r} label={r} selected={reason === r} onPress={() => setReason(r)} />
      ))}
      <TextField
        label="Type DELETE to confirm"
        value={confirmText}
        onChangeText={(v) => {
          setConfirmText(v);
          setError(undefined);
        }}
        error={error}
        autoCapitalize="characters"
        testID="delete-confirm"
      />
    </Screen>
  );
}

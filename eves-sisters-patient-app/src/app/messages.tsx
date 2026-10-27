import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText, Button, DemoNotice, EmptyState, ErrorState, LoadingState, Notice, Screen, TextField } from '@/components/ui';
import { useAsync } from '@/hooks/useAsync';
import { karpa } from '@/integrations/karpa';
import { toUserMessage } from '@/integrations/karpa/errors';
import { formatDateTime } from '@/lib/format';
import { maxLength, required, runValidators } from '@/lib/validation';
import { colors, radii, spacing } from '@/theme';

export default function Messages() {
  const data = useAsync(() => karpa.messages.list());
  const [draft, setDraft] = useState('');
  const [error, setError] = useState<string | undefined>();
  const [sending, setSending] = useState(false);

  const send = async () => {
    const e = runValidators(draft, [required('Message'), maxLength('Message', 1000)]);
    setError(e);
    if (e) return;
    setSending(true);
    try {
      await karpa.messages.send(draft.trim());
      setDraft('');
      await data.refresh();
    } catch (err) {
      setError(toUserMessage(err));
    } finally {
      setSending(false);
    }
  };

  return (
    <Screen
      refreshing={data.refreshing}
      onRefresh={data.refresh}
      footer={
        <>
          <TextField label="Message" value={draft} onChangeText={(v) => { setDraft(v); setError(undefined); }} error={error} multiline maxLength={1000} placeholder="Write to your care team" testID="message-input" />
          <Button label="Send (simulated)" icon="send-outline" onPress={send} loading={sending} testID="message-send" />
        </>
      }>
      <DemoNotice>Messages are simulated. Nothing is delivered to a care team — please don’t share real health information.</DemoNotice>
      <Notice tone="info">Messages aren’t monitored around the clock. For emergencies, call 911.</Notice>
      {data.status === 'loading' && !data.data ? <LoadingState /> : null}
      {data.status === 'error' ? <ErrorState body={data.error} onRetry={data.reload} /> : null}
      {data.data && data.data.length === 0 ? <EmptyState icon="chatbubbles-outline" title="No messages yet" /> : null}
      {data.data?.map((m) => (
        <View key={m.id} style={[styles.bubble, m.from === 'patient' ? styles.mine : styles.theirs]}>
          <AppText variant="caption" color="textMuted">
            {m.senderName} · {formatDateTime(m.sentAt)}
          </AppText>
          <AppText>{m.body}</AppText>
        </View>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  bubble: { padding: spacing.md, borderRadius: radii.lg, gap: spacing.xs, maxWidth: '88%' },
  mine: { alignSelf: 'flex-end', backgroundColor: colors.surfaceAccent },
  theirs: { alignSelf: 'flex-start', backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
});

import { useLocalSearchParams } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { View } from 'react-native';

import { AppText, Button, Card, DemoNotice, ErrorState, Icon, LoadingState, Notice, Screen } from '@/components/ui';
import { useAsync } from '@/hooks/useAsync';
import { karpa } from '@/integrations/karpa';
import { formatTime } from '@/lib/format';
import { recordAudit } from '@/services/audit';
import { useSession } from '@/state/SessionProvider';
import { spacing } from '@/theme';

/**
 * Secure video consultation entry point.
 *
 * The join action is disabled: no telehealth video vendor is approved and
 * there is no Karpa video capability documented. When one is approved, the
 * visit opens either in that vendor's SDK or in the hosted portal via the
 * system browser — the app never embeds an unreviewed web view.
 */
export default function VideoVisit() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { user } = useSession();
  const session = useAsync(() => karpa.telehealth.getVisitSession(id), [id]);
  const portalUrl = karpa.handoff.urlFor('video-visit');

  if (session.status === 'loading') return <Screen><LoadingState label="Checking your visit…" /></Screen>;
  if (session.status === 'error') return <Screen><ErrorState body={session.error} onRetry={session.reload} /></Screen>;

  const s = session.data;
  const joinable = Boolean(s.joinUrl ?? portalUrl);

  return (
    <Screen>
      <DemoNotice>Video visits are not connected. This screen shows the planned entry point only — no call will start.</DemoNotice>
      <Card tone="inverse">
        <View style={{ alignItems: 'center', gap: spacing.md, paddingVertical: spacing.lg }}>
          <Icon name="videocam-outline" size={40} color="goldSoft" />
          <AppText variant="heading" color="textInverse" align="center">
            {s.status === 'waiting-room' ? 'Your waiting room is open' : 'Your visit room isn’t open yet'}
          </AppText>
          <AppText variant="small" color="textInverseMuted" align="center">
            The room opens 10 minutes before your visit, at {formatTime(s.opensAt)}.
          </AppText>
        </View>
      </Card>

      <Card tone="muted">
        <View style={{ gap: spacing.sm }}>
          <AppText variant="bodyStrong">Before you join</AppText>
          {[
            'Find a private space where you won’t be overheard.',
            'Use headphones if others are nearby.',
            'Allow camera and microphone access when asked.',
            'Have your ID available if your clinician needs to verify it.',
          ].map((t) => (
            <View key={t} style={{ flexDirection: 'row', gap: spacing.sm }}>
              <Icon name="checkmark-circle-outline" size={18} color="success" />
              <AppText variant="small" style={{ flex: 1 }}>
                {t}
              </AppText>
            </View>
          ))}
        </View>
      </Card>

      <Button
        label={joinable ? 'Join secure visit' : 'Join secure visit (not yet available)'}
        icon="lock-closed-outline"
        disabled={!joinable}
        accessibilityHint="Video visits are not connected in this preview"
        onPress={async () => {
          const url = s.joinUrl ?? portalUrl;
          recordAudit('telehealth.join-attempted', user?.id ?? null, { appointmentId: id, outcome: url ? 'opened' : 'unavailable' });
          if (url) await WebBrowser.openAuthSessionAsync(url);
        }}
        testID="join-visit"
      />
      <Notice tone="info">
        Video visits will be enabled only after an approved, secure telehealth provider is connected and reviewed.
      </Notice>
    </Screen>
  );
}

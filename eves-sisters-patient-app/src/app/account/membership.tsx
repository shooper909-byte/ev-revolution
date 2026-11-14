import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Platform, View } from 'react-native';

import { MembershipTierCard } from '@/components/catalog/CatalogCards';
import { AppText, Badge, Button, Card, DemoNotice, ErrorState, LoadingState, Notice, Screen } from '@/components/ui';
import { getMembershipTier, getMrsPackage } from '@/data/catalog';
import { useAsync } from '@/hooks/useAsync';
import { karpa } from '@/integrations/karpa';
import { toUserMessage } from '@/integrations/karpa/errors';
import { formatLongDate } from '@/lib/format';
import { recordAudit } from '@/services/audit';
import { useSession } from '@/state/SessionProvider';
import { spacing } from '@/theme';

const statusLabel = {
  none: { label: 'No membership', tone: 'neutral' },
  'pending-evaluation': { label: 'Pending consultation', tone: 'warning' },
  active: { label: 'Active', tone: 'success' },
  paused: { label: 'Paused', tone: 'info' },
  cancelled: { label: 'Cancelled', tone: 'danger' },
} as const;

export default function MembershipDetails() {
  const { user } = useSession();
  const data = useAsync(() => karpa.memberships.getCurrent());
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  if (data.status === 'loading' && !data.data) return <Screen><LoadingState /></Screen>;
  if (data.status === 'error' && !data.data) return <Screen><ErrorState body={data.error} onRetry={data.reload} /></Screen>;
  const m = data.data!;
  const tier = getMembershipTier(m.tierId ?? undefined);
  const pkg = getMrsPackage(m.packageSlug ?? undefined);
  const s = statusLabel[m.status];

  const cancel = async () => {
    setBusy(true);
    setError(null);
    try {
      await karpa.memberships.requestCancellation();
      recordAudit('membership.cancellation-requested', user?.id ?? null, { mode: karpa.mode });
      await data.reload();
    } catch (e) {
      setError(toUserMessage(e));
    } finally {
      setBusy(false);
    }
  };

  const confirm = () => {
    if (Platform.OS === 'web') return void cancel();
    Alert.alert('Request cancellation?', 'In this demo, this only changes the simulated status.', [
      { text: 'Keep membership', style: 'cancel' },
      { text: 'Request cancellation', style: 'destructive', onPress: () => void cancel() },
    ]);
  };

  return (
    <Screen refreshing={data.refreshing} onRefresh={data.refresh}>
      <DemoNotice>Membership status is simulated. No payment method is stored and nothing is billed.</DemoNotice>
      <Card>
        <View style={{ gap: spacing.sm }}>
          <Badge label={s.label} tone={s.tone} />
          <AppText variant="heading">{tier ? `${tier.name} membership` : 'No membership selected'}</AppText>
          {pkg ? <AppText color="textSubtle">Paired with {pkg.name} · {pkg.pillar}</AppText> : null}
          {m.renewsOn && m.status !== 'cancelled' ? (
            <AppText variant="small" color="textMuted">
              Billing would begin only after your consultation. Demo renewal date: {formatLongDate(m.renewsOn)}
            </AppText>
          ) : null}
        </View>
      </Card>
      {tier ? <MembershipTierCard tier={tier} /> : null}
      <Button label={tier ? 'Change membership' : 'Choose a membership'} onPress={() => router.push({ pathname: '/membership/enroll', params: tier ? { tier: tier.id } : {} })} />
      {pkg ? <Button label={`About ${pkg.name}`} variant="secondary" onPress={() => router.push({ pathname: '/collection/[slug]', params: { slug: pkg.slug } })} /> : null}
      {m.status !== 'cancelled' && tier ? (
        <Button label="Request cancellation" variant="ghost" onPress={confirm} loading={busy} testID="cancel-membership" />
      ) : null}
      {error ? <Notice tone="danger">{error}</Notice> : null}
      <AppText variant="caption" color="textMuted">
        Cancellation and refund terms will be shown by the approved billing provider. See the published Subscription Cancellation policy on evevolutionhealth.com.
      </AppText>
    </Screen>
  );
}

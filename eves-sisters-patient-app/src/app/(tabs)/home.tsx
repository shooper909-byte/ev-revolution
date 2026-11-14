import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { AppointmentCard } from '@/components/appointments/AppointmentCard';
import { MrsCard } from '@/components/catalog/CatalogCards';
import {
  AppText,
  Badge,
  Button,
  Card,
  DemoNotice,
  EmptyState,
  ErrorState,
  GoldRule,
  Icon,
  ListRow,
  LoadingState,
  ProgressBar,
  Screen,
  SectionHeader,
} from '@/components/ui';
import { formatMonthly, getMembershipTier, getMrsPackage } from '@/data/catalog';
import { wellnessResources } from '@/data/demo/resources';
import { useAsync } from '@/hooks/useAsync';
import { karpa } from '@/integrations/karpa';
import { formatDate, greeting } from '@/lib/format';
import { useSession } from '@/state/SessionProvider';
import { colors, radii, spacing } from '@/theme';

const membershipStatusLabel = {
  none: 'No membership yet',
  'pending-evaluation': 'Pending your consultation',
  active: 'Active',
  paused: 'Paused',
  cancelled: 'Cancelled',
} as const;

export default function Home() {
  const { user } = useSession();
  const data = useAsync(async () => {
    const [appointments, carePlan, statuses, membership, messages] = await Promise.all([
      karpa.appointments.list(),
      karpa.carePlans.getCurrent(),
      karpa.carePlans.treatmentStatuses(),
      karpa.memberships.getCurrent(),
      karpa.messages.list(),
    ]);
    return { appointments, carePlan, statuses, membership, messages };
  });

  const header = (
    <View style={{ gap: spacing.xs }}>
      <AppText variant="eyebrow" color="textMuted">
        {greeting()}
      </AppText>
      <AppText variant="hero">{user?.firstName ?? 'Welcome'}</AppText>
      <AppText variant="script" color="textSubtle">
        Fall in love with yourself again.
      </AppText>
      <GoldRule />
    </View>
  );

  if (data.status === 'loading' && !data.data) {
    return (
      <Screen>
        {header}
        <LoadingState label="Loading your dashboard…" />
      </Screen>
    );
  }
  if (data.status === 'error' && !data.data) {
    return (
      <Screen>
        {header}
        <ErrorState body={data.error} onRetry={data.reload} />
      </Screen>
    );
  }

  const { appointments, carePlan, statuses, membership, messages } = data.data!;
  const now = new Date().toISOString();
  const next = appointments.find((a) => a.status === 'scheduled' && a.startsAt >= now);
  const tier = getMembershipTier(membership.tierId ?? undefined);
  const pkg = getMrsPackage(membership.packageSlug ?? undefined);
  const unread = messages.filter((m) => !m.read).length;
  const doneCount = carePlan?.items.filter((i) => i.status === 'done').length ?? 0;

  return (
    <Screen refreshing={data.refreshing} onRefresh={data.refresh}>
      {header}
      <DemoNotice>Fictional demo data. Clinical actions are simulated and nothing is sent to a care team.</DemoNotice>
      {data.status === 'error' ? <ErrorState title="Couldn’t refresh" body={data.error} onRetry={data.reload} /> : null}

      <SectionHeader eyebrow="Up next" title="Your next appointment" actionLabel="All visits" onAction={() => router.push('/appointments')} />
      {next ? (
        <AppointmentCard appointment={next} highlight />
      ) : (
        <Card>
          <EmptyState
            icon="calendar-outline"
            title="No upcoming appointments"
            body="When you’re ready, schedule a private visit."
            actionLabel="Schedule a visit"
            onAction={() => router.push('/appointments/schedule')}
          />
        </Card>
      )}

      <SectionHeader eyebrow="My care plan" title={carePlan?.title ?? 'Your care plan'} />
      {carePlan ? (
        <Card testID="care-plan-card">
          <View style={{ gap: spacing.md }}>
            <View style={styles.between}>
              <AppText variant="small" color="textMuted">
                {doneCount} of {carePlan.items.length} steps complete
              </AppText>
              <AppText variant="caption" color="textMuted">
                Updated {formatDate(carePlan.updatedAt)}
              </AppText>
            </View>
            <ProgressBar value={doneCount / carePlan.items.length} label="Care plan progress" />
            {carePlan.items.map((item) => (
              <View key={item.id} style={styles.planItem}>
                <Icon
                  name={item.status === 'done' ? 'checkmark-circle' : item.status === 'in-progress' ? 'time-outline' : 'ellipse-outline'}
                  size={20}
                  color={item.status === 'done' ? 'success' : 'heading'}
                />
                <View style={{ flex: 1 }}>
                  <AppText variant="bodyStrong">{item.title}</AppText>
                  <AppText variant="small" color="textMuted">
                    {item.detail}
                  </AppText>
                </View>
              </View>
            ))}
            <AppText variant="caption" color="textMuted">
              Care team: {carePlan.careTeam.map((c) => c.name).join(' · ')}
            </AppText>
          </View>
        </Card>
      ) : (
        <Card>
          <EmptyState title="Your care plan will appear here" body="After your consultation, your clinician’s plan shows up here." />
        </Card>
      )}

      <SectionHeader eyebrow="Treatment status" title="Where things stand" />
      {statuses.length ? (
        statuses.map((s) => (
          <Card key={s.id}>
            <View style={{ gap: spacing.sm }}>
              <View style={styles.between}>
                <AppText variant="bodyStrong" style={{ flex: 1 }}>
                  {s.programName}
                </AppText>
                <Badge label={s.stageLabel} tone="info" />
              </View>
              <StageTrack stage={s.stage} />
              <AppText variant="small" color="textMuted">
                {s.nextStep}
              </AppText>
            </View>
          </Card>
        ))
      ) : (
        <Card>
          <EmptyState title="Nothing in progress" body="Start a consultation to begin." />
        </Card>
      )}

      <SectionHeader eyebrow="Membership" title={tier ? `${tier.name} membership` : 'Membership'} actionLabel="Details" onAction={() => router.push('/account/membership')} />
      <Card tone="inverse">
        <View style={{ gap: spacing.sm }}>
          <AppText variant="eyebrow" color="textInverseMuted">
            {membershipStatusLabel[membership.status]}
          </AppText>
          <AppText variant="heading" color="textInverse">
            {tier ? `${tier.name} · ${formatMonthly(tier.monthlyPriceUsd)}` : 'Explore memberships'}
          </AppText>
          {pkg ? (
            <AppText variant="small" color="textInverseMuted">
              Exploring {pkg.name} — {pkg.pillar}
            </AppText>
          ) : null}
          <AppText variant="caption" color="textInverseMuted">
            Demo status. No payment has been taken.
          </AppText>
        </View>
      </Card>
      {pkg ? <MrsCard pkg={pkg} compact /> : null}

      <SectionHeader eyebrow="For you" title="Wellness resources" />
      {wellnessResources.map((r) => (
        <Card
          key={r.id}
          onPress={() => router.push({ pathname: '/resources/[id]', params: { id: r.id } })}
          accessibilityLabel={`${r.title}. ${r.minutes} minute read`}>
          <View style={styles.planItem}>
            <View style={styles.resIcon}>
              <Icon name={r.icon} size={20} />
            </View>
            <View style={{ flex: 1 }}>
              <AppText variant="bodyStrong">{r.title}</AppText>
              <AppText variant="small" color="textMuted">
                {r.summary} · {r.minutes} min
              </AppText>
            </View>
          </View>
        </Card>
      ))}

      <SectionHeader eyebrow="Shortcuts" title="Your account" />
      <Card>
        <ListRow icon="chatbubbles-outline" title="Secure messages" subtitle={unread ? `${unread} unread` : 'No new messages'} onPress={() => router.push('/messages')} />
        <ListRow icon="calendar-number-outline" title="Schedule a visit" onPress={() => router.push('/appointments/schedule')} />
        <ListRow icon="leaf-outline" title="Check in with yourself" subtitle="Energy & mood journal" onPress={() => router.push('/journey/check-in')} />
        <ListRow icon="notifications-outline" title="Notification preferences" onPress={() => router.push('/account/notifications')} />
        <ListRow icon="help-buoy-outline" title="Help & support" onPress={() => router.push('/account/support')} />
      </Card>

      <Button label="Explore care & the Mrs. Collection" variant="outline" icon="sparkles-outline" onPress={() => router.push('/care')} />
    </Screen>
  );
}

const stages = [
  { key: 'intake', label: 'Intake' },
  { key: 'clinician-review', label: 'Review' },
  { key: 'plan-ready', label: 'Plan' },
  { key: 'active', label: 'Care' },
] as const;

function StageTrack({ stage }: { stage: string }) {
  const current = Math.max(0, stages.findIndex((s) => s.key === stage));
  return (
    <View style={styles.stageRow} accessibilityLabel={`Step ${current + 1} of ${stages.length}: ${stages[current].label}`}>
      {stages.map((s, i) => (
        <View key={s.key} style={styles.stage}>
          <View style={[styles.stageDot, i <= current ? styles.stageDotOn : null]} />
          <AppText variant="caption" color={i <= current ? 'heading' : 'textMuted'}>
            {s.label}
          </AppText>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  between: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: spacing.sm },
  planItem: { flexDirection: 'row', gap: spacing.md, alignItems: 'flex-start' },
  resIcon: {
    width: 40,
    height: 40,
    borderRadius: radii.pill,
    backgroundColor: colors.surfaceAccent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stageRow: { flexDirection: 'row', justifyContent: 'space-between' },
  stage: { alignItems: 'center', gap: spacing.xs, flex: 1 },
  stageDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: colors.border },
  stageDotOn: { backgroundColor: colors.secondary },
});

import { Stack, router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Alert, Platform, View } from 'react-native';

import { modalityLabel, statusBadge } from '@/components/appointments/AppointmentCard';
import { AppText, Badge, Button, Card, DemoNotice, EmptyState, ErrorState, Icon, LoadingState, Notice, Screen, SectionHeader } from '@/components/ui';
import { useAsync } from '@/hooks/useAsync';
import { karpa } from '@/integrations/karpa';
import { toUserMessage } from '@/integrations/karpa/errors';
import { formatLongDate, formatTime } from '@/lib/format';
import { recordAudit } from '@/services/audit';
import { useSession } from '@/state/SessionProvider';
import { spacing } from '@/theme';

export default function AppointmentDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { user } = useSession();
  const data = useAsync(() => karpa.appointments.get(id), [id]);
  const [cancelling, setCancelling] = useState(false);
  const [cancelError, setCancelError] = useState<string | null>(null);

  if (data.status === 'loading') return <Screen><LoadingState /></Screen>;
  if (data.status === 'error') return <Screen><ErrorState body={data.error} onRetry={data.reload} /></Screen>;
  const appt = data.data;
  if (!appt) {
    return (
      <Screen>
        <EmptyState title="Appointment not found" actionLabel="Back" onAction={() => router.back()} />
      </Screen>
    );
  }

  const m = modalityLabel[appt.modality];
  const s = statusBadge[appt.status];
  const upcoming = appt.status === 'scheduled' && new Date(appt.startsAt) > new Date();

  const doCancel = async () => {
    setCancelling(true);
    setCancelError(null);
    try {
      await karpa.appointments.cancel(appt.id);
      recordAudit('appointment.cancelled', user?.id ?? null, { appointmentId: appt.id, mode: karpa.mode });
      await data.reload();
    } catch (e) {
      setCancelError(toUserMessage(e));
    } finally {
      setCancelling(false);
    }
  };

  const confirmCancel = () => {
    const msg = 'This cancels the simulated appointment in this demo.';
    if (Platform.OS === 'web') {
      void doCancel();
      return;
    }
    Alert.alert('Cancel this appointment?', msg, [
      { text: 'Keep it', style: 'cancel' },
      { text: 'Cancel appointment', style: 'destructive', onPress: () => void doCancel() },
    ]);
  };

  return (
    <Screen>
      <Stack.Screen options={{ title: appt.title }} />
      <DemoNotice />
      <View style={{ gap: spacing.sm }}>
        <Badge label={s.label} tone={s.tone} />
        <AppText variant="title">{appt.title}</AppText>
        <AppText color="textSubtle">
          {formatLongDate(appt.startsAt)} at {formatTime(appt.startsAt)} · {appt.durationMinutes} minutes
        </AppText>
      </View>

      <Card>
        <View style={{ gap: spacing.md }}>
          <Detail icon={m.icon} label="How" value={m.label} />
          <Detail icon="person-outline" label="With" value={`${appt.clinicianName}\n${appt.clinicianTitle}`} />
          <Detail icon="lock-closed-outline" label="Privacy" value="Visits take place on a secure, private connection." />
        </View>
      </Card>

      {appt.preparation.length ? (
        <>
          <SectionHeader title="Before your visit" />
          <Card tone="muted">
            <View style={{ gap: spacing.sm }}>
              {appt.preparation.map((p) => (
                <View key={p} style={{ flexDirection: 'row', gap: spacing.sm }}>
                  <Icon name="checkmark-circle-outline" size={18} color="success" />
                  <AppText variant="small" style={{ flex: 1 }}>
                    {p}
                  </AppText>
                </View>
              ))}
            </View>
          </Card>
        </>
      ) : null}

      {appt.summary ? (
        <>
          <SectionHeader title="Visit summary" />
          <AppText color="textSubtle">{appt.summary}</AppText>
        </>
      ) : null}

      {upcoming && appt.modality === 'video' ? (
        <Button
          label="Go to video visit"
          icon="videocam-outline"
          onPress={() => router.push({ pathname: '/appointments/visit/[id]', params: { id: appt.id } })}
          testID="go-to-visit"
        />
      ) : null}
      {upcoming ? (
        <>
          <Button label="Reschedule" variant="secondary" onPress={() => router.push({ pathname: '/appointments/schedule', params: { type: appt.type } })} />
          <Button label="Cancel appointment" variant="ghost" onPress={confirmCancel} loading={cancelling} testID="cancel-appointment" />
        </>
      ) : null}
      {cancelError ? <Notice tone="danger">{cancelError}</Notice> : null}
      <AppText variant="caption" color="textMuted">
        Need to talk to someone sooner? Use secure messages. For emergencies, call 911.
      </AppText>
    </Screen>
  );
}

function Detail({ icon, label, value }: { icon: React.ComponentProps<typeof Icon>['name']; label: string; value: string }) {
  return (
    <View style={{ flexDirection: 'row', gap: spacing.md, alignItems: 'flex-start' }}>
      <Icon name={icon} size={20} />
      <View style={{ flex: 1 }}>
        <AppText variant="caption" color="textMuted">
          {label}
        </AppText>
        <AppText>{value}</AppText>
      </View>
    </View>
  );
}

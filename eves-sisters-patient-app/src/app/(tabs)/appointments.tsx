import { router, useFocusEffect } from 'expo-router';
import { useCallback, useRef, useState } from 'react';
import { View } from 'react-native';

import { AppointmentCard } from '@/components/appointments/AppointmentCard';
import { Button, DemoNotice, EmptyState, ErrorState, LoadingState, Screen, SegmentedControl } from '@/components/ui';
import { useAsync } from '@/hooks/useAsync';
import { karpa } from '@/integrations/karpa';
import { spacing } from '@/theme';

export default function Appointments() {
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming');
  const data = useAsync(() => karpa.appointments.list());
  const firstFocus = useRef(true);

  // Refresh when returning from scheduling or cancelling.
  useFocusEffect(
    useCallback(() => {
      if (firstFocus.current) {
        firstFocus.current = false;
        return;
      }
      void data.refresh();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  const now = new Date().toISOString();
  const all = data.data ?? [];
  const upcoming = all.filter((a) => a.status === 'scheduled' && a.startsAt >= now);
  const past = all.filter((a) => !(a.status === 'scheduled' && a.startsAt >= now)).reverse();
  const list = tab === 'upcoming' ? upcoming : past;

  return (
    <Screen refreshing={data.refreshing} onRefresh={data.refresh}>
      <DemoNotice>Appointments are fictional. Booking and video visits are simulated until a clinical platform is connected.</DemoNotice>
      <SegmentedControl
        accessibilityLabel="Appointment list"
        value={tab}
        onChange={setTab}
        options={[
          { value: 'upcoming', label: `Upcoming${data.data ? ` (${upcoming.length})` : ''}` },
          { value: 'past', label: 'Past' },
        ]}
      />
      <Button label="Schedule a visit" icon="add-circle-outline" onPress={() => router.push('/appointments/schedule')} testID="schedule-visit" />

      {data.status === 'loading' && !data.data ? <LoadingState label="Loading appointments…" /> : null}
      {data.status === 'error' ? <ErrorState body={data.error} onRetry={data.reload} /> : null}
      {data.data ? (
        list.length ? (
          <View style={{ gap: spacing.md }}>
            {list.map((a) => (
              <AppointmentCard key={a.id} appointment={a} />
            ))}
          </View>
        ) : (
          <EmptyState
            icon="calendar-clear-outline"
            title={tab === 'upcoming' ? 'No upcoming visits' : 'No past visits yet'}
            body={tab === 'upcoming' ? 'Schedule a private visit whenever you’re ready.' : 'Completed and cancelled visits will appear here.'}
          />
        )
      ) : null}
    </Screen>
  );
}

import { router, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { View } from 'react-native';

import {
  AppText,
  Button,
  ChipGroup,
  DemoNotice,
  EmptyState,
  ErrorState,
  LoadingState,
  Notice,
  OptionCard,
  Screen,
  TextField,
} from '@/components/ui';
import { useAsync } from '@/hooks/useAsync';
import { karpa } from '@/integrations/karpa';
import { toUserMessage } from '@/integrations/karpa/errors';
import type { Appointment, AppointmentModality, AppointmentType } from '@/integrations/karpa/types';
import { formatDate, formatLongDate, formatTime } from '@/lib/format';
import { maxLength } from '@/lib/validation';
import { recordAudit } from '@/services/audit';
import { useSession } from '@/state/SessionProvider';
import { spacing } from '@/theme';

const types: { value: AppointmentType; label: string; description: string }[] = [
  { value: 'initial-consultation', label: 'Initial consultation', description: '30 min with a licensed clinician' },
  { value: 'follow-up', label: 'Follow-up visit', description: '20 min to review how things are going' },
  { value: 'lab-review', label: 'Lab review', description: '20 min to go over results, if labs were ordered' },
  { value: 'care-team-check-in', label: 'Care team check-in', description: '15 min, non-clinical questions' },
];

const modalities: { value: AppointmentModality; label: string; description: string }[] = [
  { value: 'video', label: 'Video visit', description: 'Face to face from wherever you are' },
  { value: 'phone', label: 'Phone call', description: 'Audio only' },
];

type Step = 'type' | 'time' | 'confirm' | 'done';

export default function Schedule() {
  const params = useLocalSearchParams<{ type?: AppointmentType }>();
  const { user } = useSession();
  const [step, setStep] = useState<Step>(params.type ? 'time' : 'type');
  const [type, setType] = useState<AppointmentType>(params.type ?? 'initial-consultation');
  const [modality, setModality] = useState<AppointmentModality>('video');
  const [slot, setSlot] = useState<string | null>(null);
  const [day, setDay] = useState<string | null>(null);
  const [reason, setReason] = useState('');
  const [reasonError, setReasonError] = useState<string | undefined>();
  const [booking, setBooking] = useState(false);
  const [bookError, setBookError] = useState<string | null>(null);
  const [booked, setBooked] = useState<Appointment | null>(null);

  const availability = useAsync(() => karpa.appointments.availability(type, new Date(), 10), [type]);
  const days = useMemo(() => {
    const map = new Map<string, string[]>();
    (availability.data ?? []).forEach((s) => {
      const key = new Date(s.startsAt).toDateString();
      map.set(key, [...(map.get(key) ?? []), s.startsAt]);
    });
    return [...map.entries()];
  }, [availability.data]);
  const selectedDay = day ?? days[0]?.[0] ?? null;
  const slotsForDay = days.find(([d]) => d === selectedDay)?.[1] ?? [];

  const book = async () => {
    const err = maxLength('Reason', 300)(reason);
    setReasonError(err);
    if (err || !slot) return;
    setBooking(true);
    setBookError(null);
    try {
      // Free-text reason is sensitive: it is passed to the adapter only and never logged.
      const appt = await karpa.appointments.schedule({ type, modality, startsAt: slot, reason: reason.trim() || undefined });
      recordAudit('appointment.scheduled', user?.id ?? null, { appointmentId: appt.id, mode: karpa.mode });
      setBooked(appt);
      setStep('done');
    } catch (e) {
      setBookError(toUserMessage(e));
    } finally {
      setBooking(false);
    }
  };

  if (step === 'done' && booked) {
    return (
      <Screen>
        <Notice tone="success" title="Simulated booking confirmed" testID="booking-confirmed">
          {`${booked.title} on ${formatLongDate(booked.startsAt)} at ${formatTime(booked.startsAt)}.`}
        </Notice>
        <DemoNotice>No real appointment was created and no clinician has been notified.</DemoNotice>
        <Button label="View appointment" onPress={() => router.replace({ pathname: '/appointments/[id]', params: { id: booked.id } })} />
        <Button label="Done" variant="secondary" onPress={() => router.back()} />
      </Screen>
    );
  }

  return (
    <Screen
      footer={
        step === 'type' ? (
          <Button label="Choose a time" onPress={() => setStep('time')} testID="schedule-next" />
        ) : step === 'time' ? (
          <>
            <Button label="Review" onPress={() => setStep('confirm')} disabled={!slot} accessibilityHint={!slot ? 'Choose a time first' : undefined} testID="schedule-review" />
            <Button label="Back" variant="ghost" onPress={() => setStep('type')} />
          </>
        ) : (
          <>
            <Button label="Confirm simulated booking" onPress={book} loading={booking} testID="schedule-confirm" />
            <Button label="Back" variant="ghost" onPress={() => setStep('time')} />
          </>
        )
      }>
      <DemoNotice>Scheduling is simulated. Times shown are fictional.</DemoNotice>
      <AppText variant="caption" color="textMuted">
        Step {step === 'type' ? 1 : step === 'time' ? 2 : 3} of 3
      </AppText>

      {step === 'type' ? (
        <View style={{ gap: spacing.md }} accessibilityRole="radiogroup" accessibilityLabel="Visit type">
          <AppText variant="heading">What kind of visit?</AppText>
          {types.map((t) => (
            <OptionCard
              key={t.value}
              label={t.label}
              description={t.description}
              selected={type === t.value}
              onPress={() => {
                setType(t.value);
                setSlot(null);
                setDay(null);
              }}
              testID={`type-${t.value}`}
            />
          ))}
          <AppText variant="heading">How would you like to meet?</AppText>
          {modalities.map((m) => (
            <OptionCard key={m.value} label={m.label} description={m.description} selected={modality === m.value} onPress={() => setModality(m.value)} />
          ))}
        </View>
      ) : null}

      {step === 'time' ? (
        <View style={{ gap: spacing.md }}>
          <AppText variant="heading">Pick a day and time</AppText>
          {availability.status === 'loading' ? <LoadingState label="Finding available times…" /> : null}
          {availability.status === 'error' ? <ErrorState body={availability.error} onRetry={availability.reload} /> : null}
          {availability.status === 'success' && days.length === 0 ? (
            <EmptyState icon="calendar-clear-outline" title="No times available" body="Please check back soon or message your care team." />
          ) : null}
          {availability.status === 'success' && days.length ? (
            <>
              <AppText variant="eyebrow" color="textMuted">
                Day
              </AppText>
              <ChipGroup
                accessibilityLabel="Day"
                options={days.map(([d]) => ({ value: d, label: formatDate(new Date(d).toISOString()) }))}
                selected={selectedDay ? [selectedDay] : []}
                onToggle={(d) => {
                  setDay(d);
                  setSlot(null);
                }}
              />
              <AppText variant="eyebrow" color="textMuted">
                Time
              </AppText>
              <ChipGroup
                accessibilityLabel="Time"
                options={slotsForDay.map((s) => ({ value: s, label: formatTime(s) }))}
                selected={slot ? [slot] : []}
                onToggle={setSlot}
              />
            </>
          ) : null}
        </View>
      ) : null}

      {step === 'confirm' && slot ? (
        <View style={{ gap: spacing.md }}>
          <AppText variant="heading">Review your visit</AppText>
          <Notice tone="brand" title={types.find((t) => t.value === type)?.label}>
            {`${formatLongDate(slot)} at ${formatTime(slot)} · ${modalities.find((m) => m.value === modality)?.label}`}
          </Notice>
          <TextField
            label="Anything you’d like your clinician to know? (optional)"
            value={reason}
            onChangeText={(v) => {
              setReason(v);
              setReasonError(undefined);
            }}
            error={reasonError}
            helper="Keep it brief. In this demo, nothing you type is saved or sent. Please don’t enter real health details."
            multiline
            maxLength={320}
            testID="schedule-reason"
          />
          {bookError ? <Notice tone="danger">{bookError}</Notice> : null}
        </View>
      ) : null}
    </Screen>
  );
}

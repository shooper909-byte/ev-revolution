import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { AppText, Badge, Card, Icon, type BadgeTone, type IconName } from '@/components/ui';
import type { Appointment } from '@/integrations/karpa/types';
import { formatDate, formatTime, relativeDays } from '@/lib/format';
import { colors, radii, spacing } from '@/theme';

export const modalityLabel: Record<Appointment['modality'], { label: string; icon: IconName }> = {
  video: { label: 'Video visit', icon: 'videocam-outline' },
  phone: { label: 'Phone call', icon: 'call-outline' },
  'async-review': { label: 'Async review', icon: 'document-text-outline' },
};

export const statusBadge: Record<Appointment['status'], { label: string; tone: BadgeTone }> = {
  scheduled: { label: 'Scheduled', tone: 'success' },
  completed: { label: 'Completed', tone: 'neutral' },
  cancelled: { label: 'Cancelled', tone: 'danger' },
  'no-show': { label: 'Missed', tone: 'warning' },
};

export function AppointmentCard({ appointment, highlight = false }: { appointment: Appointment; highlight?: boolean }) {
  const m = modalityLabel[appointment.modality];
  const s = statusBadge[appointment.status];
  const day = new Date(appointment.startsAt);

  return (
    <Card
      tone={highlight ? 'accent' : 'default'}
      onPress={() => router.push({ pathname: '/appointments/[id]', params: { id: appointment.id } })}
      accessibilityLabel={`${appointment.title}, ${formatDate(appointment.startsAt)} at ${formatTime(appointment.startsAt)}, ${m.label}, ${s.label}`}
      accessibilityHint="Opens appointment details"
      testID={`appointment-${appointment.id}`}>
      <View style={styles.row}>
        <View style={styles.date}>
          <AppText variant="caption" color="onPrimary">
            {day.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}
          </AppText>
          <AppText variant="heading" color="onPrimary">
            {day.getDate()}
          </AppText>
        </View>
        <View style={{ flex: 1, gap: spacing.xxs }}>
          <AppText variant="bodyStrong">{appointment.title}</AppText>
          <AppText variant="small" color="textMuted">
            {formatTime(appointment.startsAt)} · {appointment.durationMinutes} min · {relativeDays(appointment.startsAt)}
          </AppText>
          <View style={styles.meta}>
            <Icon name={m.icon} size={16} color="textSubtle" />
            <AppText variant="caption" color="textSubtle" style={{ flex: 1 }}>
              {m.label} · {appointment.clinicianName}
            </AppText>
          </View>
          <Badge label={s.label} tone={s.tone} />
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: spacing.md, alignItems: 'flex-start' },
  date: {
    width: 56,
    paddingVertical: spacing.sm,
    borderRadius: radii.md,
    backgroundColor: colors.primary,
    alignItems: 'center',
  },
  meta: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
});

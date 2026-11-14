import { StyleSheet, View } from 'react-native';

import { AppSwitch, AppText, Card, Notice, Screen, SectionHeader } from '@/components/ui';
import { buildNotificationContent, type NotificationPreferences } from '@/services/notifications';
import { usePreferences } from '@/state/PreferencesProvider';
import { colors, spacing } from '@/theme';

const rows: { key: keyof NotificationPreferences; title: string; body: string }[] = [
  { key: 'appointmentReminders', title: 'Appointment reminders', body: 'A reminder before each visit.' },
  { key: 'messages', title: 'Secure messages', body: 'When your care team replies.' },
  { key: 'carePlanUpdates', title: 'Account updates', body: 'When something changes in your account.' },
  { key: 'orderUpdates', title: 'Delivery updates', body: 'When a shipment is on its way.' },
  { key: 'journeyReminders', title: 'Journey reminders', body: 'Gentle prompts to check in with yourself.' },
];

export default function Notifications() {
  const { notifications, setNotification } = usePreferences();
  const preview = buildNotificationContent('new-message', notifications);

  return (
    <Screen>
      <Notice tone="brand" title="Private by default" icon="lock-closed-outline">
        Notifications never show treatment names, health details, clinician names or message content — only a gentle prompt to open the app.
      </Notice>

      <Card>
        {rows.map((r) => (
          <Toggle key={r.key} title={r.title} body={r.body} value={notifications[r.key]} onChange={(v) => setNotification(r.key, v)} />
        ))}
      </Card>

      <SectionHeader title="Lock screen" />
      <Card>
        <Toggle
          title="Show a preview line"
          body="Turn off to show only “Eve’s Sisters” with no text."
          value={notifications.showPreviews}
          onChange={(v) => setNotification('showPreviews', v)}
        />
      </Card>

      <SectionHeader eyebrow="Preview" title="How a message alert looks" />
      <View style={styles.preview} accessible accessibilityLabel={preview ? `Example notification: ${preview.title}. ${preview.body ?? ''}` : 'Message notifications are off'}>
        {preview ? (
          <>
            <AppText variant="bodyStrong">{preview.title}</AppText>
            {preview.body ? <AppText variant="small" color="textMuted">{preview.body}</AppText> : null}
          </>
        ) : (
          <AppText variant="small" color="textMuted">
            Message notifications are off.
          </AppText>
        )}
      </View>
      <Notice tone="demo">Push notifications are not connected in this preview; these settings are not saved.</Notice>
    </Screen>
  );
}

function Toggle({ title, body, value, onChange }: { title: string; body: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <View style={styles.row}>
      <View style={{ flex: 1 }}>
        <AppText variant="bodyStrong">{title}</AppText>
        <AppText variant="small" color="textMuted">
          {body}
        </AppText>
      </View>
      <AppSwitch value={value} onValueChange={onChange} accessibilityLabel={title} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.md, minHeight: 56 },
  preview: {
    padding: spacing.lg,
    borderRadius: 18,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.xxs,
  },
});

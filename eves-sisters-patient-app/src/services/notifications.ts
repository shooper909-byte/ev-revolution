/**
 * Privacy-conscious notification copy.
 *
 * Lock screens are visible to anyone nearby. Notification text therefore
 * never includes treatment names, conditions, clinician names, lab results,
 * medication or message content — only a generic prompt to open the app,
 * where the details sit behind sign-in.
 *
 * Push delivery is not implemented in this milestone (it needs an approved
 * provider and backend). This module defines the content contract and the
 * user's preferences.
 */
export type NotificationKind =
  | 'appointment-reminder'
  | 'new-message'
  | 'care-plan-updated'
  | 'order-update'
  | 'journey-reminder';

export type NotificationPreferences = {
  appointmentReminders: boolean;
  messages: boolean;
  carePlanUpdates: boolean;
  orderUpdates: boolean;
  journeyReminders: boolean;
  /** Show a preview line at all. When false, only "Eve's Sisters" is shown. */
  showPreviews: boolean;
};

export const defaultNotificationPreferences: NotificationPreferences = {
  appointmentReminders: true,
  messages: true,
  carePlanUpdates: true,
  orderUpdates: true,
  journeyReminders: false,
  showPreviews: true,
};

const prefKey: Record<NotificationKind, keyof NotificationPreferences> = {
  'appointment-reminder': 'appointmentReminders',
  'new-message': 'messages',
  'care-plan-updated': 'carePlanUpdates',
  'order-update': 'orderUpdates',
  'journey-reminder': 'journeyReminders',
};

const genericBody: Record<NotificationKind, string> = {
  'appointment-reminder': 'You have an upcoming appointment. Open the app for details.',
  'new-message': 'You have a new secure message.',
  'care-plan-updated': 'There’s an update in your account.',
  'order-update': 'There’s an update on a delivery.',
  'journey-reminder': 'A gentle reminder to check in with yourself today.',
};

export type NotificationContent = { title: string; body: string | null };

/** Returns null when the user has turned this kind of notification off. */
export function buildNotificationContent(
  kind: NotificationKind,
  prefs: NotificationPreferences,
): NotificationContent | null {
  if (!prefs[prefKey[kind]]) return null;
  return { title: 'Eve’s Sisters', body: prefs.showPreviews ? genericBody[kind] : null };
}

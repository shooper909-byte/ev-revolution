import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

import { karpa } from '@/integrations/karpa';
import { recordAudit } from '@/services/audit';
import { defaultNotificationPreferences, type NotificationPreferences } from '@/services/notifications';

/**
 * In-memory preferences for the demo. A production build would sync these to
 * the backend (notification preferences) or keep them on-device (UI only).
 */
type PreferencesContextValue = {
  notifications: NotificationPreferences;
  setNotification: (key: keyof NotificationPreferences, value: boolean) => void;
  simulateNetworkErrors: boolean;
  setSimulateNetworkErrors: (value: boolean) => void;
};

const PreferencesContext = createContext<PreferencesContextValue | null>(null);

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState(defaultNotificationPreferences);
  const [simulateNetworkErrors, setSimulate] = useState(karpa.simulation.forceNetworkError);

  const value = useMemo<PreferencesContextValue>(
    () => ({
      notifications,
      setNotification: (key, v) => {
        setNotifications((prev) => ({ ...prev, [key]: v }));
        recordAudit('privacy.preferences-changed', null, { channel: key });
      },
      simulateNetworkErrors,
      setSimulateNetworkErrors: (v) => {
        karpa.simulation.forceNetworkError = v;
        setSimulate(v);
      },
    }),
    [notifications, simulateNetworkErrors],
  );

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export function usePreferences() {
  const ctx = useContext(PreferencesContext);
  if (!ctx) throw new Error('usePreferences must be used within PreferencesProvider');
  return ctx;
}

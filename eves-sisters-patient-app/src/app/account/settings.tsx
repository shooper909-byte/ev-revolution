import { StyleSheet, View } from 'react-native';

import { AppSwitch, AppText, Card, ListRow, Notice, Screen, SectionHeader } from '@/components/ui';
import { karpa } from '@/integrations/karpa';
import { sessionPolicy } from '@/services/auth/session';
import { usePreferences } from '@/state/PreferencesProvider';
import { useSession } from '@/state/SessionProvider';
import { spacing } from '@/theme';

export default function Settings() {
  const { simulateNetworkErrors, setSimulateNetworkErrors } = usePreferences();
  const { signOut } = useSession();

  return (
    <Screen>
      <SectionHeader title="Security" />
      <Card>
        <ListRow icon="timer-outline" title="Automatic sign-out" subtitle={`After ${sessionPolicy.idleTimeoutMs / 60_000} minutes of inactivity`} />
        <ListRow icon="key-outline" title="Change password" subtitle="Available once a real identity provider is connected" />
        <ListRow icon="finger-print-outline" title="Face ID / fingerprint unlock" subtitle="Planned — requires security review" />
        <ListRow icon="log-out-outline" title="Sign out on this device" onPress={() => void signOut()} />
      </Card>

      <SectionHeader eyebrow="For reviewers" title="Demo controls" />
      <Card>
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <AppText variant="bodyStrong">Simulate network errors</AppText>
            <AppText variant="small" color="textMuted">
              Makes every data request fail so error states can be reviewed.
            </AppText>
          </View>
          <AppSwitch
            value={simulateNetworkErrors}
            onValueChange={setSimulateNetworkErrors}
            accessibilityLabel="Simulate network errors"
            testID="toggle-network-errors"
          />
        </View>
        <ListRow icon="git-network-outline" title="Integration mode" subtitle={`${karpa.mode} — ${karpa.isSimulated ? 'all clinical data simulated' : 'connected'}`} />
      </Card>
      <Notice tone="demo">Settings in this preview are not saved between launches.</Notice>
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.sm },
});

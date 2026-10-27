import { router } from 'expo-router';
import { View } from 'react-native';

import { AppText, Button, Card, GoldRule, ListRow, Screen } from '@/components/ui';
import { karpa } from '@/integrations/karpa';
import { useSession } from '@/state/SessionProvider';
import { spacing } from '@/theme';

export default function Account() {
  const { user, signOut } = useSession();

  return (
    <Screen>
      <View style={{ gap: spacing.xs }}>
        <AppText variant="title">{user ? `${user.firstName} ${user.lastName}` : 'Your account'}</AppText>
        <AppText color="textMuted">{user?.email}</AppText>
        <GoldRule />
      </View>

      <Card>
        <ListRow icon="person-outline" title="Profile" onPress={() => router.push('/account/profile')} testID="account-profile" />
        <ListRow icon="diamond-outline" title="Membership details" onPress={() => router.push('/account/membership')} />
        <ListRow icon="chatbubbles-outline" title="Secure messages" onPress={() => router.push('/messages')} />
        <ListRow icon="notifications-outline" title="Notification preferences" onPress={() => router.push('/account/notifications')} />
      </Card>
      <Card>
        <ListRow icon="shield-checkmark-outline" title="Privacy information" onPress={() => router.push('/account/privacy')} />
        <ListRow icon="help-buoy-outline" title="Help & support" onPress={() => router.push('/account/support')} />
        <ListRow icon="settings-outline" title="Account settings" onPress={() => router.push('/account/settings')} />
        <ListRow icon="trash-outline" title="Request account deletion" destructive onPress={() => router.push('/account/delete')} testID="account-delete" />
      </Card>

      <Button label="Sign out" variant="outline" icon="log-out-outline" onPress={() => void signOut()} testID="sign-out" />
      <AppText variant="caption" color="textMuted" align="center">
        Eve’s Sisters patient app · preview build · integration mode: {karpa.mode}
        {karpa.isSimulated ? ' (simulated data)' : ''}
      </AppText>
    </Screen>
  );
}

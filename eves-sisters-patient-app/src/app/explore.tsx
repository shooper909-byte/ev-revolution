import { router } from 'expo-router';
import { View } from 'react-native';

import { CareCatalog } from '@/components/catalog/CareCatalog';
import { AppText, Button, Card, Screen } from '@/components/ui';
import { generalDisclosures } from '@/data/catalog';
import { spacing } from '@/theme';

/** Public catalog for visitors who haven't signed in. */
export default function Explore() {
  return (
    <Screen>
      <View style={{ gap: spacing.xs }}>
        <AppText variant="title">Explore our services</AppText>
        <AppText color="textMuted">Browse at your own pace — no account needed.</AppText>
      </View>
      <CareCatalog />
      <Card tone="muted">
        <View style={{ gap: spacing.md }}>
          <AppText variant="subheading" color="heading">
            Ready when you are
          </AppText>
          <AppText variant="small" color="textMuted">
            {generalDisclosures.evaluation}
          </AppText>
          <Button label="Create account" onPress={() => router.push('/create-account')} />
          <Button label="Sign in" variant="secondary" onPress={() => router.push('/sign-in')} />
        </View>
      </Card>
    </Screen>
  );
}

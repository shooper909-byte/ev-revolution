import { router } from 'expo-router';
import { View } from 'react-native';

import { MembershipTierCard } from '@/components/catalog/CatalogCards';
import { AppText, Button, Notice, Screen } from '@/components/ui';
import { generalDisclosures, membershipTiers, mrsPricingStatement } from '@/data/catalog';
import { useSession } from '@/state/SessionProvider';
import { spacing } from '@/theme';

export default function Memberships() {
  const { status } = useSession();
  const signedIn = status === 'signed-in';

  return (
    <Screen>
      <View style={{ gap: spacing.xs }}>
        <AppText variant="title">Memberships</AppText>
        <AppText color="textMuted">Choose the level of support that fits your life. You can change later.</AppText>
      </View>
      {membershipTiers.map((t) => (
        <MembershipTierCard
          key={t.id}
          tier={t}
          actionLabel="Choose"
          onSelect={() =>
            signedIn
              ? router.push({ pathname: '/membership/enroll', params: { tier: t.id } })
              : router.push('/create-account')
          }
        />
      ))}
      <Notice tone="brand" title="What membership pricing covers">
        {mrsPricingStatement}
      </Notice>
      <Notice tone="info">{generalDisclosures.evaluation}</Notice>
      {!signedIn ? <Button label="Create account to choose" onPress={() => router.push('/create-account')} /> : null}
    </Screen>
  );
}

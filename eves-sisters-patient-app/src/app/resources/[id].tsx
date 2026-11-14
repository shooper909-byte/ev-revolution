import { router, useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';

import { AppText, EmptyState, GoldRule, Notice, Screen } from '@/components/ui';
import { getResource } from '@/data/demo/resources';
import { generalDisclosures } from '@/data/catalog';
import { spacing } from '@/theme';

export default function ResourceDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const resource = getResource(id);
  if (!resource) {
    return (
      <Screen>
        <EmptyState title="Resource not found" actionLabel="Back" onAction={() => router.back()} />
      </Screen>
    );
  }
  return (
    <Screen>
      <View style={{ gap: spacing.sm }}>
        <AppText variant="eyebrow" color="textMuted">
          {resource.minutes} min read
        </AppText>
        <AppText variant="title">{resource.title}</AppText>
        <AppText color="textSubtle">{resource.summary}</AppText>
        <GoldRule />
      </View>
      {resource.body.map((p) => (
        <AppText key={p}>{p}</AppText>
      ))}
      <Notice tone="demo">Placeholder article written for the demo — awaiting clinical content review.</Notice>
      <AppText variant="caption" color="textMuted">
        {generalDisclosures.noIndividualAdvice}
      </AppText>
    </Screen>
  );
}

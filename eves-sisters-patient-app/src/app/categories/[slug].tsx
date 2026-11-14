import { Image } from 'expo-image';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { TreatmentRow } from '@/components/catalog/CatalogCards';
import { StartConsultation } from '@/components/catalog/StartConsultation';
import { AppText, Card, EmptyState, GoldRule, Icon, Notice, Screen, SectionHeader } from '@/components/ui';
import { generalDisclosures, getCategory, treatmentsForCategory } from '@/data/catalog';
import { radii, spacing } from '@/theme';

export default function CategoryDetail() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const category = getCategory(slug);

  if (!category) {
    return (
      <Screen>
        <EmptyState icon="help-circle-outline" title="We couldn’t find that care area" actionLabel="Back" onAction={() => router.back()} />
      </Screen>
    );
  }
  const items = treatmentsForCategory(category);

  return (
    <Screen>
      <Stack.Screen options={{ title: category.short }} />
      <Image source={category.image} style={styles.hero} contentFit="cover" accessible={false} />
      <View style={{ gap: spacing.sm }}>
        <AppText variant="eyebrow" color="textMuted">
          {category.kind === 'pathway' ? 'Care pathway' : 'Care area'}
        </AppText>
        <AppText variant="title">{category.name}</AppText>
        <AppText variant="script" color="textSubtle" style={{ fontSize: 18 }}>
          {category.promise}
        </AppText>
        <GoldRule />
        <AppText color="textSubtle">{category.intro}</AppText>
      </View>

      <SectionHeader eyebrow="You might be experiencing" title="Sound familiar?" />
      <Card tone="muted">
        <View style={{ gap: spacing.sm }}>
          {category.experiences.map((e) => (
            <View key={e} style={styles.point}>
              <Icon name="ellipse" size={8} color="secondary" />
              <AppText variant="small" style={{ flex: 1 }}>
                {e}
              </AppText>
            </View>
          ))}
        </View>
      </Card>

      <SectionHeader eyebrow="Clinician-guided" title="Options to discuss" />
      {items.length ? (
        items.map((t) => <TreatmentRow key={t.slug} treatment={t} />)
      ) : (
        <EmptyState title="No options listed yet" body="Your clinician can talk you through what may be appropriate." />
      )}

      <Notice tone="info" title="Clinical note">
        {category.clinicalNote}
      </Notice>
      <Notice tone="info">{generalDisclosures.stateAvailability}</Notice>
      <StartConsultation interestSlug={category.slug} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { width: '100%', height: 220, borderRadius: radii.xl },
  point: { flexDirection: 'row', gap: spacing.sm, alignItems: 'center' },
});

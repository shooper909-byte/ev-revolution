import { Image } from 'expo-image';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { StartConsultation } from '@/components/catalog/StartConsultation';
import { AppText, Badge, Button, Card, EmptyState, GoldRule, Icon, Notice, Screen, SectionHeader } from '@/components/ui';
import { generalDisclosures, getCategory, getMrsPackage, getTreatment, mrsPricingStatement } from '@/data/catalog';
import { useSession } from '@/state/SessionProvider';
import { radii, spacing } from '@/theme';

export default function MrsPackageDetail() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const pkg = getMrsPackage(slug);
  const { status } = useSession();

  if (!pkg) {
    return (
      <Screen>
        <EmptyState icon="help-circle-outline" title="We couldn’t find that package" actionLabel="Back" onAction={() => router.back()} />
      </Screen>
    );
  }

  const treatments = pkg.treatments.map(getTreatment).filter((t) => t !== undefined);
  const focus = pkg.focus.map(getCategory).filter((c) => c !== undefined);

  return (
    <Screen>
      <Stack.Screen options={{ title: pkg.name }} />
      <Image source={pkg.image} style={styles.hero} contentFit="cover" contentPosition="top" accessibilityLabel={pkg.imageAlt} accessible />
      <View style={{ gap: spacing.sm }}>
        <AppText variant="eyebrow" color="textMuted">
          {pkg.pillar}
        </AppText>
        <AppText variant="hero">{pkg.name}</AppText>
        <AppText variant="script" color="textSubtle">
          {pkg.line}
        </AppText>
        <GoldRule />
        <AppText>{pkg.persona}</AppText>
        <AppText color="textSubtle">{pkg.manifesto}</AppText>
        <Badge label={pkg.lifeStage} tone="brand" />
      </View>

      <View style={styles.points}>
        {pkg.pillarPoints.map((p) => (
          <View key={p} style={styles.point}>
            <Icon name="sparkles-outline" size={16} />
            <AppText variant="small" style={{ flex: 1 }}>
              {p}
            </AppText>
          </View>
        ))}
      </View>

      <SectionHeader eyebrow="Priorities" title="What this program focuses on" />
      {pkg.priorities.map((p) => (
        <Card key={p.title}>
          <AppText variant="subheading" color="heading">
            {p.title}
          </AppText>
          <AppText variant="small" color="textMuted">
            {p.copy}
          </AppText>
        </Card>
      ))}

      <SectionHeader eyebrow="Is it for you?" title={`${pkg.name} may suit you if you are…`} />
      <Card tone="muted">
        <View style={{ gap: spacing.sm }}>
          {pkg.forWho.map((w) => (
            <View key={w} style={styles.point}>
              <Icon name="heart-outline" size={16} />
              <AppText variant="small" style={{ flex: 1 }}>
                {w}
              </AppText>
            </View>
          ))}
        </View>
      </Card>

      <SectionHeader eyebrow="What’s included" title="Your program" />
      <Card>
        <View style={{ gap: spacing.sm }}>
          {pkg.includes.map((i) => (
            <View key={i} style={styles.point}>
              <Icon name="checkmark-circle-outline" size={18} color="success" />
              <AppText variant="small" style={{ flex: 1 }}>
                {i}
              </AppText>
            </View>
          ))}
        </View>
      </Card>

      {focus.length ? (
        <>
          <SectionHeader eyebrow="Care areas" title="Explore related care" />
          <View style={styles.badges}>
            {focus.map((c) => (
              <Button
                key={c.slug}
                label={c.name}
                variant="outline"
                fullWidth={false}
                onPress={() => router.push({ pathname: '/categories/[slug]', params: { slug: c.slug } })}
              />
            ))}
          </View>
        </>
      ) : null}

      {treatments.length ? (
        <>
          <SectionHeader eyebrow="Clinician-guided options" title="Treatments a clinician may consider" />
          <AppText variant="small" color="textMuted">
            Listed for information only. A licensed clinician decides whether any of these are appropriate for you.
          </AppText>
          {treatments.map((t) => (
            <Card
              key={t.slug}
              onPress={() => router.push({ pathname: '/treatments/[slug]', params: { slug: t.slug } })}
              accessibilityLabel={t.name}
              accessibilityHint="Opens treatment information">
              <View style={styles.row}>
                <AppText variant="bodyStrong" color="heading" style={{ flex: 1 }}>
                  {t.name}
                </AppText>
                <Icon name="chevron-forward" size={18} color="textMuted" />
              </View>
            </Card>
          ))}
        </>
      ) : null}

      <Notice tone="brand" title="Pricing">
        {mrsPricingStatement}
      </Notice>
      <Notice tone="info">{generalDisclosures.evaluation}</Notice>

      <SectionHeader eyebrow="Next step" title="Begin with a private consultation" />
      <StartConsultation interestSlug={pkg.slug} label={`Start my ${pkg.name} consultation`} />
      {status === 'signed-in' ? (
        <Button
          label="Choose a membership"
          variant="secondary"
          onPress={() => router.push({ pathname: '/membership/enroll', params: { package: pkg.slug } })}
        />
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { width: '100%', height: 380, borderRadius: radii.xl },
  points: { gap: spacing.sm },
  point: { flexDirection: 'row', gap: spacing.sm, alignItems: 'flex-start' },
  badges: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
});

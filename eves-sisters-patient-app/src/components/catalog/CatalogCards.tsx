import { Image } from 'expo-image';
import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { AppText, Badge, Card, GoldRule, Icon } from '@/components/ui';
import {
  formatMonthly,
  treatmentsForCategory,
  type MembershipTier,
  type MrsPackage,
  type Treatment,
  type TreatmentCategory,
} from '@/data/catalog';
import { colors, radii, spacing } from '@/theme';

export function MrsCard({ pkg, compact = false }: { pkg: MrsPackage; compact?: boolean }) {
  return (
    <Card
      padded={false}
      onPress={() => router.push({ pathname: '/collection/[slug]', params: { slug: pkg.slug } })}
      accessibilityLabel={`${pkg.name}. ${pkg.pillar}. ${pkg.line}`}
      accessibilityHint="Opens package details"
      testID={`mrs-card-${pkg.slug}`}>
      <Image
        source={pkg.image}
        style={[styles.mrsImage, compact ? { height: 180 } : null]}
        contentFit="cover"
        contentPosition="top"
        accessible={false}
      />
      <View style={styles.mrsBody}>
        <AppText variant="eyebrow" color="textMuted">
          {pkg.pillar}
        </AppText>
        <AppText variant="heading">{pkg.name}</AppText>
        <AppText variant="script" color="textSubtle" style={{ fontSize: 17 }}>
          {pkg.line}
        </AppText>
        {!compact ? (
          <AppText variant="small" color="textMuted">
            {pkg.lifeStage}
          </AppText>
        ) : null}
      </View>
    </Card>
  );
}

export function CategoryCard({ category }: { category: TreatmentCategory }) {
  const count = treatmentsForCategory(category).length;
  return (
    <Card
      padded={false}
      onPress={() => router.push({ pathname: '/categories/[slug]', params: { slug: category.slug } })}
      accessibilityLabel={`${category.name}. ${category.promise}`}
      accessibilityHint="Opens this care area"
      testID={`category-card-${category.slug}`}>
      <View style={styles.catRow}>
        <Image source={category.image} style={styles.catImage} contentFit="cover" accessible={false} />
        <View style={styles.catBody}>
          <AppText variant="subheading" color="heading">
            {category.name}
          </AppText>
          <AppText variant="small" color="textMuted" numberOfLines={3}>
            {category.promise}
          </AppText>
          <AppText variant="caption" color="link">
            {count} {count === 1 ? 'option' : 'options'} · {category.kind === 'pathway' ? 'Care pathway' : 'Care area'}
          </AppText>
        </View>
      </View>
    </Card>
  );
}

export function TreatmentRow({ treatment }: { treatment: Treatment }) {
  return (
    <Card
      onPress={() => router.push({ pathname: '/treatments/[slug]', params: { slug: treatment.slug } })}
      accessibilityLabel={`${treatment.name}. ${treatment.forms.join(', ')}`}
      accessibilityHint="Opens treatment information"
      testID={`treatment-row-${treatment.slug}`}>
      <View style={styles.tRow}>
        <View style={{ flex: 1, gap: spacing.xs }}>
          <AppText variant="bodyStrong" color="heading">
            {treatment.name}
            {treatment.aka ? (
              <AppText variant="small" color="textMuted">
                {`  (${treatment.aka})`}
              </AppText>
            ) : null}
          </AppText>
          <AppText variant="small" color="textMuted" numberOfLines={2}>
            {treatment.summary}
          </AppText>
          <View style={styles.badges}>
            {treatment.forms.map((f) => (
              <Badge key={f} label={f} />
            ))}
            {treatment.compounded !== 'no' ? <Badge label={treatment.compounded === 'partial' ? 'Some forms compounded' : 'Compounded'} tone="info" /> : null}
          </View>
        </View>
        <Icon name="chevron-forward" size={18} color="textMuted" />
      </View>
    </Card>
  );
}

export function MembershipTierCard({
  tier,
  onSelect,
  selected = false,
  actionLabel = 'Choose',
}: {
  tier: MembershipTier;
  onSelect?: () => void;
  selected?: boolean;
  actionLabel?: string;
}) {
  return (
    <Card
      tone={tier.featured ? 'accent' : 'default'}
      onPress={onSelect}
      accessibilityLabel={`${tier.name} membership, ${formatMonthly(tier.monthlyPriceUsd)}. ${tier.positioning}`}
      accessibilityHint={onSelect ? `${actionLabel} this membership` : undefined}
      style={selected ? styles.tierSelected : null}
      testID={`tier-${tier.id}`}>
      <View style={styles.tierHead}>
        <View style={{ flex: 1 }}>
          <AppText variant="heading">{tier.name}</AppText>
          <AppText variant="small" color="textMuted">
            {tier.positioning}
          </AppText>
        </View>
        {tier.featured ? <Badge label="Most chosen" tone="brand" /> : null}
      </View>
      <View style={styles.price}>
        <AppText variant="title" color="heading">
          ${tier.monthlyPriceUsd}
        </AppText>
        <AppText variant="small" color="textMuted">
          / month
        </AppText>
      </View>
      <GoldRule width={36} />
      <View style={{ gap: spacing.xs }}>
        {tier.features.map((f) => (
          <View key={f} style={styles.feature}>
            <Icon name="checkmark" size={16} color="success" />
            <AppText variant="small" style={{ flex: 1 }}>
              {f}
            </AppText>
          </View>
        ))}
      </View>
      {selected ? <Badge label="Selected" tone="success" /> : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  mrsImage: { width: '100%', height: 260 },
  mrsBody: { padding: spacing.lg, gap: spacing.xs },
  catRow: { flexDirection: 'row' },
  catImage: { width: 104, minHeight: 124, backgroundColor: colors.surfaceAccent },
  catBody: { flex: 1, padding: spacing.md, gap: spacing.xs, justifyContent: 'center' },
  tRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  badges: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs, marginTop: spacing.xxs },
  tierHead: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md },
  price: { flexDirection: 'row', alignItems: 'baseline', gap: spacing.xs, marginTop: spacing.sm },
  feature: { flexDirection: 'row', gap: spacing.sm, alignItems: 'flex-start' },
  tierSelected: { borderWidth: 2, borderColor: colors.primary, borderRadius: radii.lg },
});

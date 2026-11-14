import { Stack, router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { StartConsultation } from '@/components/catalog/StartConsultation';
import { AppText, Badge, Card, EmptyState, GoldRule, Icon, Notice, Screen, SectionHeader } from '@/components/ui';
import { generalDisclosures, getCategory, getTreatment, treatmentPricing } from '@/data/catalog';
import { spacing } from '@/theme';

/**
 * Treatment information page: name, description, general eligibility,
 * pricing status, clinician-evaluation requirement, safety disclosures and
 * the Start Consultation action. No dosing or individual recommendations.
 */
export default function TreatmentDetail() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const treatment = getTreatment(slug);

  if (!treatment) {
    return (
      <Screen>
        <EmptyState icon="help-circle-outline" title="We couldn’t find that treatment" actionLabel="Back" onAction={() => router.back()} />
      </Screen>
    );
  }
  const category = getCategory(treatment.category);

  return (
    <Screen>
      <Stack.Screen options={{ title: treatment.name }} />
      <View style={{ gap: spacing.sm }}>
        {category ? (
          <AppText variant="eyebrow" color="textMuted">
            {category.name}
          </AppText>
        ) : null}
        <AppText variant="title">{treatment.name}</AppText>
        {treatment.aka ? (
          <AppText variant="small" color="textMuted">
            Also known as {treatment.aka}
          </AppText>
        ) : null}
        <View style={styles.badges}>
          {treatment.forms.map((f) => (
            <Badge key={f} label={f} />
          ))}
          {treatment.compounded !== 'no' ? (
            <Badge label={treatment.compounded === 'partial' ? 'Some forms compounded' : 'Compounded'} tone="info" />
          ) : null}
        </View>
        <GoldRule />
      </View>

      <SectionHeader title="What it is" />
      <AppText>{treatment.summary}</AppText>
      {treatment.contentPending ? (
        <Notice tone="warning">Full ingredient details are being confirmed with the pharmacy partner.</Notice>
      ) : null}

      <SectionHeader title="How it’s used" />
      <AppText color="textSubtle">{treatment.howItsUsed}</AppText>
      <AppText variant="small" color="textMuted">
        Your clinician decides whether this is appropriate and, if so, how it is used. This app never provides dosing.
      </AppText>
      {treatment.programs?.length ? (
        <Card tone="muted">
          <AppText variant="bodyStrong">Programs</AppText>
          {treatment.programs.map((p) => (
            <AppText key={p} variant="small" color="textSubtle">
              • {p}
            </AppText>
          ))}
        </Card>
      ) : null}

      <SectionHeader title="General eligibility" />
      <Card>
        <View style={{ gap: spacing.sm }}>
          <Row icon="person-outline" text="For adults. Eligibility is determined by a licensed clinician after reviewing your health history, current medications and goals." />
          <Row icon="map-outline" text={generalDisclosures.stateAvailability} />
          {category ? <Row icon="medkit-outline" text={category.clinicalNote} /> : null}
        </View>
      </Card>

      <SectionHeader title="Pricing" />
      <Notice tone="brand" title="Personalized pricing" icon="pricetag-outline">
        {treatmentPricing.note}
      </Notice>

      <SectionHeader title="Clinician evaluation required" />
      <Notice tone="info" icon="shield-checkmark-outline">
        {generalDisclosures.evaluation}
      </Notice>

      <SectionHeader title="Safety information" />
      <Card tone="muted" testID="safety-disclosures">
        <View style={{ gap: spacing.sm }}>
          {treatment.considerations.map((c) => (
            <Row key={c} icon="alert-circle-outline" text={c} />
          ))}
          {treatment.compoundedNote ? <Row icon="flask-outline" text={treatment.compoundedNote} /> : null}
          {treatment.compounded !== 'no' ? <Row icon="flask-outline" text={generalDisclosures.compounded} /> : null}
          <Row icon="information-circle-outline" text={generalDisclosures.noIndividualAdvice} />
          <Row icon="call-outline" text={generalDisclosures.emergency} />
        </View>
      </Card>

      <SectionHeader eyebrow="Next step" title="Talk it through with a clinician" />
      <StartConsultation interestSlug={treatment.category} />
    </Screen>
  );
}

function Row({ icon, text }: { icon: React.ComponentProps<typeof Icon>['name']; text: string }) {
  return (
    <View style={styles.row}>
      <Icon name={icon} size={18} color="textSubtle" />
      <AppText variant="small" style={{ flex: 1 }}>
        {text}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  badges: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs },
  row: { flexDirection: 'row', gap: spacing.sm, alignItems: 'flex-start' },
});

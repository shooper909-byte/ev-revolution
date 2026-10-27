import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import { MembershipTierCard } from '@/components/catalog/CatalogCards';
import { AppText, Button, DemoNotice, Notice, OptionCard, Screen } from '@/components/ui';
import {
  formatMonthly,
  getMembershipTier,
  getMrsPackage,
  membershipTiers,
  mrsCollection,
  mrsPricingStatement,
  type MembershipTier,
} from '@/data/catalog';
import { karpa } from '@/integrations/karpa';
import { toUserMessage } from '@/integrations/karpa/errors';
import { recordAudit } from '@/services/audit';
import { useSession } from '@/state/SessionProvider';
import { spacing } from '@/theme';

type Step = 'tier' | 'package' | 'review' | 'done';

/**
 * Mock membership flow: choose a tier, optionally a Mrs. Collection program,
 * review, and record interest. No payment details are ever collected in the
 * app — billing belongs to the approved enrollment/payment provider.
 */
export default function Enroll() {
  const params = useLocalSearchParams<{ tier?: string; package?: string }>();
  const { user } = useSession();
  const [tierId, setTierId] = useState<MembershipTier['id']>(getMembershipTier(params.tier)?.id ?? 'signature');
  const [pkg, setPkg] = useState<string | null>(getMrsPackage(params.package)?.slug ?? null);
  const [step, setStep] = useState<Step>(params.tier ? 'package' : 'tier');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const tier = getMembershipTier(tierId)!;

  const submit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      await karpa.memberships.requestEnrollment({ tierId, packageSlug: pkg });
      recordAudit('membership.enrollment-requested', user?.id ?? null, { tierId, mode: karpa.mode });
      setStep('done');
    } catch (e) {
      setError(toUserMessage(e));
    } finally {
      setSubmitting(false);
    }
  };

  if (step === 'done') {
    return (
      <Screen>
        <Notice tone="success" title="Simulated request recorded" testID="enroll-done">
          {`${tier.name} membership${pkg ? ` with ${getMrsPackage(pkg)?.name}` : ''} — pending your consultation.`}
        </Notice>
        <DemoNotice>No payment was taken and no membership was created. Billing will be handled only by an approved payment provider.</DemoNotice>
        <Button label="View membership details" onPress={() => router.replace('/account/membership')} />
        <Button label="Done" variant="secondary" onPress={() => router.back()} />
      </Screen>
    );
  }

  return (
    <Screen
      footer={
        step === 'tier' ? (
          <Button label="Continue" onPress={() => setStep('package')} testID="enroll-next" />
        ) : step === 'package' ? (
          <>
            <Button label="Review" onPress={() => setStep('review')} testID="enroll-review" />
            <Button label="Back" variant="ghost" onPress={() => setStep('tier')} />
          </>
        ) : (
          <>
            <Button label="Request membership (simulated)" onPress={submit} loading={submitting} testID="enroll-submit" />
            <Button label="Back" variant="ghost" onPress={() => setStep('package')} />
          </>
        )
      }>
      <DemoNotice>Membership enrollment is simulated. No payment information is requested.</DemoNotice>

      {step === 'tier' ? (
        <View style={{ gap: spacing.md }}>
          <AppText variant="heading">Choose your membership</AppText>
          {membershipTiers.map((t) => (
            <MembershipTierCard key={t.id} tier={t} selected={t.id === tierId} onSelect={() => setTierId(t.id)} actionLabel="Select" />
          ))}
        </View>
      ) : null}

      {step === 'package' ? (
        <View style={{ gap: spacing.md }}>
          <AppText variant="heading">Pair it with a Mrs. Collection program?</AppText>
          <AppText variant="small" color="textMuted">
            Optional. Your clinician will help shape your plan either way.
          </AppText>
          <OptionCard label="Not right now" selected={pkg === null} onPress={() => setPkg(null)} />
          {mrsCollection.map((p) => (
            <OptionCard key={p.slug} label={p.name} description={`${p.pillar} · ${p.line}`} selected={pkg === p.slug} onPress={() => setPkg(p.slug)} testID={`pkg-${p.slug}`} />
          ))}
        </View>
      ) : null}

      {step === 'review' ? (
        <View style={{ gap: spacing.md }}>
          <AppText variant="heading">Review</AppText>
          <Notice tone="brand" title={`${tier.name} · ${formatMonthly(tier.monthlyPriceUsd)}`}>
            {pkg ? `With ${getMrsPackage(pkg)?.name}. ` : ''}
            {tier.positioning}
          </Notice>
          <Notice tone="info">{mrsPricingStatement}</Notice>
          <AppText variant="small" color="textMuted">
            Billing terms, renewal and cancellation details will be shown by the approved payment provider before anything is charged.
          </AppText>
          {error ? <Notice tone="danger">{error}</Notice> : null}
        </View>
      ) : null}
    </Screen>
  );
}

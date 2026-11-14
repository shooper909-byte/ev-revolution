import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { AppSwitch, AppText, Button, Card, DemoNotice, Notice, OptionCard, Screen, TextField } from '@/components/ui';
import { generalDisclosures, getCategory, getMrsPackage, treatmentCategories } from '@/data/catalog';
import { karpa } from '@/integrations/karpa';
import { toUserMessage } from '@/integrations/karpa/errors';
import type { IntakeSubmission } from '@/integrations/karpa/types';
import { usState } from '@/lib/validation';
import { recordAudit } from '@/services/audit';
import { useSession } from '@/state/SessionProvider';
import { spacing } from '@/theme';

type Answer = 'yes' | 'no' | 'unsure';

/**
 * General routing pre-screen. The pregnancy question appears in the
 * pre-screens previously published on the Eve's Sisters site; the other two
 * are generic routing questions written for this demo. Final intake questions
 * must come from the clinical partner and be approved by a clinician (see the
 * security & compliance checklist).
 */
const preScreenQuestions = [
  { id: 'pregnancy', prompt: 'Are you pregnant, breastfeeding, or planning a pregnancy?' },
  { id: 'emergency', prompt: 'Are you experiencing symptoms that feel urgent or severe right now?' },
  { id: 'medications', prompt: 'Do you currently take any prescription medications?' },
] as const;

type Step = 'interest' | 'screen' | 'consent' | 'done';

export default function StartConsultation() {
  const params = useLocalSearchParams<{ interest?: string }>();
  const { user } = useSession();
  const initial = getCategory(params.interest) ?? getMrsPackage(params.interest);
  const [step, setStep] = useState<Step>(initial ? 'screen' : 'interest');
  const [interest, setInterest] = useState<string>(params.interest ?? '');
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [state, setState] = useState('');
  const [stateError, setStateError] = useState<string | undefined>();
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState<string | undefined>();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<IntakeSubmission | null>(null);

  const interestName = getCategory(interest)?.name ?? getMrsPackage(interest)?.name ?? 'Care';
  const unanswered = preScreenQuestions.filter((q) => !answers[q.id]);
  const urgent = answers.emergency === 'yes';

  const submit = async () => {
    const sErr = usState(state);
    setStateError(sErr);
    setConsentError(consent ? undefined : 'Please review and accept the telehealth consent to continue.');
    if (sErr || !consent) return;
    setSubmitting(true);
    setError(null);
    try {
      const submission = await karpa.intake.submit({
        interestSlug: interest,
        preScreen: answers,
        stateOfResidence: state.trim().toUpperCase(),
        consentToTelehealth: consent,
      });
      // Audit records that a request happened — not what it was about.
      recordAudit('intake.submitted', user?.id ?? null, { mode: karpa.mode });
      setResult(submission);
      setStep('done');
    } catch (e) {
      setError(toUserMessage(e));
    } finally {
      setSubmitting(false);
    }
  };

  if (step === 'done' && result) {
    return (
      <Screen>
        <Notice tone="success" title="Simulated request received" testID="consultation-done">
          {`Your ${interestName} consultation request was recorded in this demo.`}
        </Notice>
        <DemoNotice>
          Nothing was sent to a clinician. When a clinical platform is connected, you’d continue to a secure intake and a licensed
          clinician would review it.
        </DemoNotice>
        <Button label="Schedule a consultation" onPress={() => router.replace({ pathname: '/appointments/schedule', params: { type: 'initial-consultation' } })} />
        <Button label="Back to home" variant="secondary" onPress={() => router.dismissAll()} />
      </Screen>
    );
  }

  return (
    <Screen
      footer={
        step === 'interest' ? (
          <Button label="Continue" disabled={!interest} onPress={() => setStep('screen')} testID="consult-next" />
        ) : step === 'screen' ? (
          <Button
            label="Continue"
            disabled={unanswered.length > 0 || urgent}
            accessibilityHint={unanswered.length ? 'Answer every question first' : undefined}
            onPress={() => setStep('consent')}
            testID="consult-screen-next"
          />
        ) : (
          <Button label="Submit simulated request" onPress={submit} loading={submitting} testID="consult-submit" />
        )
      }>
      <DemoNotice>This consultation request is simulated. Please don’t enter real health information.</DemoNotice>

      {step === 'interest' ? (
        <View style={{ gap: spacing.md }}>
          <AppText variant="heading">What would you like to talk about?</AppText>
          {treatmentCategories.map((c) => (
            <OptionCard key={c.slug} label={c.name} description={c.promise} selected={interest === c.slug} onPress={() => setInterest(c.slug)} />
          ))}
        </View>
      ) : null}

      {step === 'screen' ? (
        <View style={{ gap: spacing.lg }}>
          <View style={{ gap: spacing.xs }}>
            <AppText variant="eyebrow" color="textMuted">
              {interestName}
            </AppText>
            <AppText variant="heading">A few safety questions</AppText>
            <AppText variant="small" color="textMuted">
              These help us route your request safely. Your answers don’t determine eligibility — a clinician does.
            </AppText>
          </View>
          {preScreenQuestions.map((q) => (
            <Card key={q.id}>
              <View style={{ gap: spacing.sm }} accessibilityRole="radiogroup" accessibilityLabel={q.prompt}>
                <AppText variant="bodyStrong">{q.prompt}</AppText>
                {(['yes', 'no', 'unsure'] as const).map((a) => (
                  <OptionCard
                    key={a}
                    label={a === 'unsure' ? 'Not sure' : a === 'yes' ? 'Yes' : 'No'}
                    selected={answers[q.id] === a}
                    onPress={() => setAnswers((prev) => ({ ...prev, [q.id]: a }))}
                    testID={`q-${q.id}-${a}`}
                  />
                ))}
              </View>
            </Card>
          ))}
          {urgent ? (
            <Notice tone="danger" title="Please get help now" testID="urgent-notice">
              Eve’s Sisters can’t help with urgent or emergency symptoms. If this is an emergency, call 911 or go to the nearest emergency room.
            </Notice>
          ) : null}
        </View>
      ) : null}

      {step === 'consent' ? (
        <View style={{ gap: spacing.lg }}>
          <AppText variant="heading">Where you’ll receive care</AppText>
          <TextField
            label="State of residence"
            value={state}
            onChangeText={(v) => {
              setState(v.toUpperCase().slice(0, 2));
              setStateError(undefined);
            }}
            error={stateError}
            helper="Two-letter code, e.g. TX."
            autoCapitalize="characters"
            maxLength={2}
            required
            testID="consult-state"
          />
          <Notice tone="info">{generalDisclosures.stateAvailability}</Notice>
          <Notice tone="info">{generalDisclosures.evaluation}</Notice>
          <Pressable
            onPress={() => {
              setConsent((c) => !c);
              setConsentError(undefined);
            }}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: consent }}
            style={{ flexDirection: 'row', gap: spacing.md, alignItems: 'center', minHeight: 48 }}>
            <AppSwitch value={consent} onValueChange={setConsent} accessibilityLabel="Telehealth consent" testID="consult-consent" />
            <AppText variant="small" style={{ flex: 1 }}>
              I consent to receive care via telehealth. <AppText variant="small" color="textMuted">(Final consent language pending legal review.)</AppText>
            </AppText>
          </Pressable>
          {consentError ? (
            <AppText variant="caption" color="danger" accessibilityRole="alert">
              {consentError}
            </AppText>
          ) : null}
          {error ? <Notice tone="danger">{error}</Notice> : null}
        </View>
      ) : null}
    </Screen>
  );
}

import { router } from 'expo-router';
import { useState } from 'react';

import { AppText, Button, ChipGroup, Screen, TextField } from '@/components/ui';
import { maxLength, required, runValidators } from '@/lib/validation';
import { newId, useJourney } from '@/state/JourneyProvider';

const suggestions = [
  'Move my body in a way I enjoy',
  'Protect my sleep',
  'Drink more water',
  'Make time for myself each week',
  'Prepare questions for my clinician',
];

export default function NewGoal() {
  const { dispatch } = useJourney();
  const [title, setTitle] = useState('');
  const [why, setWhy] = useState('');
  const [errors, setErrors] = useState<{ title?: string; why?: string }>({});

  const save = () => {
    const next = {
      title: runValidators(title, [required('Goal'), maxLength('Goal', 80)]),
      why: runValidators(why, [maxLength('Reason', 160)]),
    };
    setErrors(next);
    if (next.title || next.why) return;
    dispatch({ type: 'add-goal', goal: { id: newId('g'), title: title.trim(), why: why.trim() || undefined, createdAt: new Date().toISOString() } });
    router.back();
  };

  return (
    <Screen footer={<Button label="Save goal" onPress={save} testID="goal-save" />}>
      <AppText variant="heading">Set a gentle intention</AppText>
      <AppText color="textMuted">There’s no wrong goal. Choose something that feels kind and doable.</AppText>
      <ChipGroup
        accessibilityLabel="Suggested goals"
        options={suggestions.map((s) => ({ value: s, label: s }))}
        selected={suggestions.filter((s) => s === title)}
        onToggle={(s) => {
          setTitle(s);
          setErrors({});
        }}
      />
      <TextField label="Your goal" value={title} onChangeText={(v) => { setTitle(v); setErrors((e) => ({ ...e, title: undefined })); }} error={errors.title} maxLength={90} required testID="goal-title" />
      <TextField label="Why it matters to you (optional)" value={why} onChangeText={(v) => { setWhy(v); setErrors((e) => ({ ...e, why: undefined })); }} error={errors.why} multiline maxLength={170} testID="goal-why" />
    </Screen>
  );
}

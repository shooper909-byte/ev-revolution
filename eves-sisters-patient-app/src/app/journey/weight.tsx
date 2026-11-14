import { router } from 'expo-router';
import { useState } from 'react';

import { AppText, Button, Notice, Screen, TextField } from '@/components/ui';
import { weightLbs } from '@/lib/validation';
import { newId, useJourney } from '@/state/JourneyProvider';

export default function LogWeight() {
  const { dispatch } = useJourney();
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | undefined>();

  const save = () => {
    const e = weightLbs(value);
    setError(e);
    if (e) return;
    dispatch({ type: 'add-weight', entry: { id: newId('w'), date: new Date().toISOString(), lbs: Number(value) } });
    router.back();
  };

  return (
    <Screen footer={<Button label="Save entry" onPress={save} testID="weight-save" />}>
      <AppText variant="heading">Log your weight</AppText>
      <AppText color="textMuted">
        Bodies naturally fluctuate day to day. This is information for you, not a grade.
      </AppText>
      <TextField
        label="Weight (lbs)"
        value={value}
        onChangeText={(v) => {
          setValue(v.replace(/[^\d.]/g, ''));
          setError(undefined);
        }}
        error={error}
        keyboardType="decimal-pad"
        maxLength={5}
        required
        testID="weight-input"
      />
      <Notice tone="demo">Demo entries stay on this device and are cleared when you sign out.</Notice>
    </Screen>
  );
}

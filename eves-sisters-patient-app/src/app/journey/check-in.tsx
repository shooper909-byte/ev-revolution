import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import { AppText, Button, ChipGroup, Notice, OptionCard, Screen, TextField } from '@/components/ui';
import { maxLength } from '@/lib/validation';
import { energyLabels, moodOptions, type JournalEntry, type Mood } from '@/state/journey';
import { newId, useJourney } from '@/state/JourneyProvider';
import { spacing } from '@/theme';

export default function CheckIn() {
  const { dispatch } = useJourney();
  const [energy, setEnergy] = useState<JournalEntry['energy'] | null>(null);
  const [mood, setMood] = useState<Mood | null>(null);
  const [note, setNote] = useState('');
  const [error, setError] = useState<string | null>(null);

  const save = () => {
    const noteError = maxLength('Note', 280)(note);
    if (!energy || !mood) {
      setError('Choose an energy level and a mood to save your check-in.');
      return;
    }
    if (noteError) {
      setError(noteError);
      return;
    }
    dispatch({
      type: 'add-journal',
      entry: { id: newId('j'), date: new Date().toISOString(), energy, mood, note: note.trim() || undefined },
    });
    router.back();
  };

  return (
    <Screen footer={<Button label="Save check-in" onPress={save} testID="checkin-save" />}>
      <AppText variant="heading">How are you, really?</AppText>
      <AppText color="textMuted">Every answer is a valid one.</AppText>

      <AppText variant="subheading" color="heading">
        Energy
      </AppText>
      <View style={{ gap: spacing.sm }} accessibilityRole="radiogroup" accessibilityLabel="Energy">
        {([1, 2, 3, 4, 5] as const).map((e) => (
          <OptionCard key={e} label={energyLabels[e]} selected={energy === e} onPress={() => { setEnergy(e); setError(null); }} testID={`energy-${e}`} />
        ))}
      </View>

      <AppText variant="subheading" color="heading">
        Mood
      </AppText>
      <ChipGroup accessibilityLabel="Mood" options={moodOptions} selected={mood ? [mood] : []} onToggle={(m) => { setMood(m); setError(null); }} />

      <TextField label="A few words (optional)" value={note} onChangeText={setNote} multiline maxLength={300} helper="Private to you in this demo." testID="checkin-note" />
      {error ? (
        <Notice tone="warning" testID="checkin-error">
          {error}
        </Notice>
      ) : null}
      <AppText variant="caption" color="textMuted">
        If you’re struggling or feel unsafe, please reach out for support. In the U.S., you can call or text 988 at any time. For emergencies, call 911.
      </AppText>
    </Screen>
  );
}

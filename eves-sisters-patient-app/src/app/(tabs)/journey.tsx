import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import {
  AppSwitch,
  AppText,
  Badge,
  Button,
  Card,
  EmptyState,
  GoldRule,
  Icon,
  Notice,
  Screen,
  SectionHeader,
  TrendBars,
} from '@/components/ui';
import { formatDate } from '@/lib/format';
import { averageEnergy, describeWeightTrend, energyLabels, moodOptions } from '@/state/journey';
import { useJourney } from '@/state/JourneyProvider';
import { spacing } from '@/theme';

export default function Journey() {
  const { state, dispatch } = useJourney();
  const activeGoals = state.goals.filter((g) => !g.completedAt);
  const doneGoals = state.goals.filter((g) => g.completedAt);
  const avg = averageEnergy(state.journal);
  const recentJournal = state.journal.slice(-7);
  const recentWeights = state.weights.slice(-8);

  return (
    <Screen>
      <View style={{ gap: spacing.xs }}>
        <AppText variant="title">My wellness journey</AppText>
        <AppText color="textMuted">Optional, private and entirely yours. Track only what feels helpful.</AppText>
        <GoldRule />
      </View>
      <Notice tone="demo" title="Stays on this device">
        In this demo, journal and tracking entries are kept in memory and cleared when you sign out. They are not shared with your care team.
      </Notice>

      <SectionHeader eyebrow="Intentions" title="Personal goals" actionLabel="Add goal" onAction={() => router.push('/journey/goal')} />
      {activeGoals.length ? (
        activeGoals.map((g) => (
          <Card key={g.id} testID={`goal-${g.id}`}>
            <View style={styles.row}>
              <View style={{ flex: 1, gap: 2 }}>
                <AppText variant="bodyStrong">{g.title}</AppText>
                {g.why ? (
                  <AppText variant="small" color="textMuted">
                    {g.why}
                  </AppText>
                ) : null}
              </View>
              <Button
                label="Done"
                variant="outline"
                fullWidth={false}
                onPress={() => dispatch({ type: 'complete-goal', id: g.id, at: new Date().toISOString() })}
                accessibilityHint={`Marks “${g.title}” as reached`}
              />
            </View>
          </Card>
        ))
      ) : (
        <Card>
          <EmptyState icon="flower-outline" title="No active goals" body="Set a gentle intention — small steps count." actionLabel="Add a goal" onAction={() => router.push('/journey/goal')} />
        </Card>
      )}

      <SectionHeader eyebrow="Check-ins" title="Energy & mood" actionLabel="Check in" onAction={() => router.push('/journey/check-in')} />
      <Card>
        {recentJournal.length ? (
          <View style={{ gap: spacing.md }}>
            <AppText variant="small" color="textMuted">
              {avg ? `Your recent energy has averaged ${avg} of 5 — “${energyLabels[Math.round(avg) as 1 | 2 | 3 | 4 | 5]}”.` : ''}
            </AppText>
            <TrendBars
              points={recentJournal.map((j) => ({ label: formatDate(j.date, { weekday: 'narrow' }), value: j.energy }))}
              summary={`Energy over your last ${recentJournal.length} check-ins, averaging ${avg} out of 5.`}
              formatValue={(v) => `${v}/5`}
            />
            <View style={styles.moods}>
              {recentJournal.slice(-3).reverse().map((j) => (
                <Badge key={j.id} label={`${formatDate(j.date)} · ${moodOptions.find((m) => m.value === j.mood)?.label}`} tone="brand" />
              ))}
            </View>
          </View>
        ) : (
          <EmptyState icon="sunny-outline" title="No check-ins yet" body="A quick note on how you feel helps you notice patterns over time." />
        )}
      </Card>

      <SectionHeader eyebrow="Optional" title="Weight" />
      <Card>
        <View style={[styles.row, { marginBottom: state.showWeight ? spacing.md : 0 }]}>
          <AppText variant="small" style={{ flex: 1 }}>
            Show weight tracking
          </AppText>
          <AppSwitch
            value={state.showWeight}
            onValueChange={(v) => dispatch({ type: 'set-show-weight', value: v })}
            accessibilityLabel="Show weight tracking"
          />
        </View>
        {state.showWeight ? (
          recentWeights.length ? (
            <View style={{ gap: spacing.md }}>
              <TrendBars
                points={recentWeights.map((w) => ({ label: formatDate(w.date, { month: 'numeric', day: 'numeric' }), value: w.lbs }))}
                summary={describeWeightTrend(state.weights)}
                formatValue={(v) => `${v} lbs`}
              />
              <AppText variant="small" color="textMuted">
                {describeWeightTrend(state.weights)}
              </AppText>
              <Button label="Log weight" variant="outline" icon="add" onPress={() => router.push('/journey/weight')} />
            </View>
          ) : (
            <EmptyState title="No entries" body="Weight is just one piece of information — log it only if it’s useful to you." actionLabel="Log weight" onAction={() => router.push('/journey/weight')} />
          )
        ) : (
          <AppText variant="caption" color="textMuted">
            Hidden. Your entries are kept and you can turn this back on anytime.
          </AppText>
        )}
      </Card>

      <SectionHeader eyebrow="Celebrate" title="Milestones" />
      {state.milestones.length || doneGoals.length ? (
        <Card tone="muted">
          <View style={{ gap: spacing.md }}>
            {[...state.milestones].reverse().map((m) => (
              <View key={m.id} style={styles.row}>
                <Icon name="ribbon-outline" size={20} color="heading" />
                <View style={{ flex: 1 }}>
                  <AppText variant="bodyStrong">{m.title}</AppText>
                  <AppText variant="caption" color="textMuted">
                    {formatDate(m.date)}
                  </AppText>
                </View>
              </View>
            ))}
          </View>
        </Card>
      ) : (
        <EmptyState icon="ribbon-outline" title="Your milestones will appear here" />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  moods: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs },
});

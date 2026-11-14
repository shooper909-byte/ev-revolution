import { StyleSheet, View } from 'react-native';

import { colors, radii, spacing } from '@/theme';

import { AppText } from './AppText';

export function ProgressBar({ value, label }: { value: number; label: string }) {
  const pct = Math.max(0, Math.min(1, value));
  return (
    <View
      accessibilityRole="progressbar"
      accessibilityLabel={label}
      accessibilityValue={{ min: 0, max: 100, now: Math.round(pct * 100) }}
      style={styles.track}>
      <View style={[styles.fill, { width: `${pct * 100}%` }]} />
    </View>
  );
}

export type TrendPoint = { label: string; value: number };

/**
 * A light, dependency-free bar trend. Values are shown relative to the
 * series' own range so the chart reads as a gentle trend rather than a
 * scorecard. Screen readers get a plain-language summary instead of bars.
 */
export function TrendBars({
  points,
  summary,
  height = 96,
  formatValue = (v) => String(v),
}: {
  points: TrendPoint[];
  summary: string;
  height?: number;
  formatValue?: (value: number) => string;
}) {
  if (points.length === 0) return null;
  const values = points.map((p) => p.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;

  return (
    <View accessible accessibilityLabel={summary} style={styles.chart}>
      <View style={[styles.bars, { height }]}>
        {points.map((p, i) => {
          const h = 0.25 + ((p.value - min) / span) * 0.75;
          return (
            <View key={`${p.label}-${i}`} style={styles.barCol}>
              <View style={[styles.bar, { height: `${h * 100}%` }, i === points.length - 1 ? styles.barLatest : null]} />
            </View>
          );
        })}
      </View>
      <View style={styles.labels}>
        {points.map((p, i) => (
          <AppText key={`${p.label}-l-${i}`} variant="caption" color="textMuted" style={styles.labelText} numberOfLines={1}>
            {p.label}
          </AppText>
        ))}
      </View>
      <AppText variant="caption" color="textMuted">
        Range {formatValue(min)} – {formatValue(max)}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  track: { height: 8, borderRadius: radii.pill, backgroundColor: colors.surfaceAccent, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: radii.pill, backgroundColor: colors.secondary },
  chart: { gap: spacing.sm },
  bars: { flexDirection: 'row', alignItems: 'flex-end', gap: spacing.sm },
  barCol: { flex: 1, height: '100%', justifyContent: 'flex-end' },
  bar: { borderTopLeftRadius: radii.sm, borderTopRightRadius: radii.sm, backgroundColor: colors.borderStrong },
  barLatest: { backgroundColor: colors.secondary },
  labels: { flexDirection: 'row', gap: spacing.sm },
  labelText: { flex: 1, textAlign: 'center', fontSize: 11 },
});

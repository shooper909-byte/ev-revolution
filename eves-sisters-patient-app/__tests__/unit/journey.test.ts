import { averageEnergy, describeWeightTrend, emptyJourney, journeyReducer, seedJourney } from '@/state/journey';

const now = new Date(2026, 9, 27);

describe('wellness journey', () => {
  it('completing a goal records a milestone once', () => {
    const s0 = seedJourney(now);
    const s1 = journeyReducer(s0, { type: 'complete-goal', id: 'g1', at: now.toISOString() });
    const s2 = journeyReducer(s1, { type: 'complete-goal', id: 'g1', at: now.toISOString() });
    expect(s1.goals.find((g) => g.id === 'g1')?.completedAt).toBeDefined();
    expect(s2.milestones.length).toBe(s1.milestones.length);
    expect(s1.milestones.length).toBe(s0.milestones.length + 1);
  });

  it('keeps weight entries in date order', () => {
    const s = journeyReducer(emptyJourney, { type: 'add-weight', entry: { id: 'b', date: '2026-10-02T00:00:00Z', lbs: 150 } });
    const s2 = journeyReducer(s, { type: 'add-weight', entry: { id: 'a', date: '2026-10-01T00:00:00Z', lbs: 151 } });
    expect(s2.weights.map((w) => w.id)).toEqual(['a', 'b']);
  });

  it('describes weight change neutrally', () => {
    const text = describeWeightTrend([
      { id: '1', date: '2026-10-01', lbs: 170 },
      { id: '2', date: '2026-10-20', lbs: 168 },
    ]);
    expect(text).toMatch(/2 lbs lower/);
    expect(text.toLowerCase()).not.toMatch(/great|good job|bad|fail|success|progress!/);
  });

  it('averages recent energy', () => {
    expect(averageEnergy([])).toBeNull();
    expect(averageEnergy(seedJourney(now).journal)).toBeCloseTo(3.3, 1);
  });

  it('can hide weight tracking without losing data', () => {
    const s = journeyReducer(seedJourney(now), { type: 'set-show-weight', value: false });
    expect(s.showWeight).toBe(false);
    expect(s.weights.length).toBeGreaterThan(0);
  });
});

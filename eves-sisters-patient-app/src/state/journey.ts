/**
 * My Wellness Journey — pure state model (reducer + selectors).
 *
 * Tracking is optional and self-directed. Language stays supportive: no
 * "good/bad" judgements, no targets imposed by the app, and weight is never
 * framed as success or failure.
 *
 * Demo storage: entries live in memory only and are cleared on sign-out. Real
 * self-tracked data is health information; persisting it requires an
 * approved storage decision (see the security checklist).
 */
export type Goal = { id: string; title: string; why?: string; createdAt: string; completedAt?: string };
export type WeightEntry = { id: string; date: string; lbs: number };
export type Mood = 'low' | 'tender' | 'steady' | 'bright' | 'radiant';
export type JournalEntry = { id: string; date: string; energy: 1 | 2 | 3 | 4 | 5; mood: Mood; note?: string };
export type Milestone = { id: string; title: string; date: string };

export type JourneyState = {
  goals: Goal[];
  weights: WeightEntry[];
  journal: JournalEntry[];
  milestones: Milestone[];
  /** User can hide weight tracking entirely. */
  showWeight: boolean;
};

export type JourneyAction =
  | { type: 'add-goal'; goal: Goal }
  | { type: 'complete-goal'; id: string; at: string }
  | { type: 'remove-goal'; id: string }
  | { type: 'add-weight'; entry: WeightEntry }
  | { type: 'remove-weight'; id: string }
  | { type: 'add-journal'; entry: JournalEntry }
  | { type: 'remove-journal'; id: string }
  | { type: 'set-show-weight'; value: boolean }
  | { type: 'reset'; state: JourneyState };

export const moodOptions: { value: Mood; label: string }[] = [
  { value: 'low', label: 'Low' },
  { value: 'tender', label: 'Tender' },
  { value: 'steady', label: 'Steady' },
  { value: 'bright', label: 'Bright' },
  { value: 'radiant', label: 'Radiant' },
];

export const energyLabels: Record<JournalEntry['energy'], string> = {
  1: 'Running low',
  2: 'A little tired',
  3: 'Steady',
  4: 'Energized',
  5: 'Full of energy',
};

function daysAgo(now: Date, n: number) {
  const d = new Date(now);
  d.setDate(d.getDate() - n);
  d.setHours(9, 0, 0, 0);
  return d.toISOString();
}

/** Fictional seed so the demo isn't empty. */
export function seedJourney(now: Date): JourneyState {
  return {
    goals: [
      { id: 'g1', title: 'Wind down by 10 pm on weeknights', why: 'I want my mornings to feel calmer.', createdAt: daysAgo(now, 20) },
      { id: 'g2', title: 'Take a 20-minute walk three times a week', createdAt: daysAgo(now, 14) },
      { id: 'g3', title: 'Write down questions for my consultation', createdAt: daysAgo(now, 10), completedAt: daysAgo(now, 3) },
    ],
    weights: [42, 35, 28, 21, 14, 7, 0].map((n, i) => ({
      id: `w${i}`,
      date: daysAgo(now, n),
      lbs: [168.4, 167.8, 168.1, 167.2, 166.9, 167.0, 166.4][i],
    })),
    journal: [6, 5, 4, 3, 2, 1, 0].map((n, i) => ({
      id: `j${i}`,
      date: daysAgo(now, n),
      energy: ([3, 2, 3, 4, 3, 4, 4] as const)[i],
      mood: (['steady', 'tender', 'steady', 'bright', 'steady', 'bright', 'radiant'] as const)[i],
    })),
    milestones: [
      { id: 'm1', title: 'Joined Eve’s Sisters', date: daysAgo(now, 21) },
      { id: 'm2', title: 'Completed your health history', date: daysAgo(now, 10) },
    ],
    showWeight: true,
  };
}

export const emptyJourney: JourneyState = { goals: [], weights: [], journal: [], milestones: [], showWeight: true };

const byDate = <T extends { date: string }>(a: T, b: T) => a.date.localeCompare(b.date);

export function journeyReducer(state: JourneyState, action: JourneyAction): JourneyState {
  switch (action.type) {
    case 'add-goal':
      return { ...state, goals: [action.goal, ...state.goals] };
    case 'complete-goal': {
      const goal = state.goals.find((g) => g.id === action.id);
      if (!goal || goal.completedAt) return state;
      return {
        ...state,
        goals: state.goals.map((g) => (g.id === action.id ? { ...g, completedAt: action.at } : g)),
        milestones: [...state.milestones, { id: `m-${action.id}`, title: `Reached a goal: ${goal.title}`, date: action.at }],
      };
    }
    case 'remove-goal':
      return { ...state, goals: state.goals.filter((g) => g.id !== action.id) };
    case 'add-weight':
      return { ...state, weights: [...state.weights, action.entry].sort(byDate) };
    case 'remove-weight':
      return { ...state, weights: state.weights.filter((w) => w.id !== action.id) };
    case 'add-journal': {
      const journal = [...state.journal, action.entry].sort(byDate);
      const milestones =
        journal.length === 10 && !state.milestones.some((m) => m.id === 'm-journal-10')
          ? [...state.milestones, { id: 'm-journal-10', title: 'Ten check-ins with yourself', date: action.entry.date }]
          : state.milestones;
      return { ...state, journal, milestones };
    }
    case 'remove-journal':
      return { ...state, journal: state.journal.filter((j) => j.id !== action.id) };
    case 'set-show-weight':
      return { ...state, showWeight: action.value };
    case 'reset':
      return action.state;
  }
}

/** Neutral, non-judgemental description of a weight trend. */
export function describeWeightTrend(weights: WeightEntry[]): string {
  if (weights.length < 2) return 'Add a few entries to see your trend over time.';
  const first = weights[0].lbs;
  const last = weights[weights.length - 1].lbs;
  const diff = Math.round((last - first) * 10) / 10;
  const span = `across ${weights.length} entries`;
  if (Math.abs(diff) < 0.5) return `Holding steady ${span}.`;
  return `${Math.abs(diff)} lbs ${diff < 0 ? 'lower' : 'higher'} than your first entry, ${span}. Bodies change for many reasons — this is just information.`;
}

export function averageEnergy(entries: JournalEntry[], lastN = 7): number | null {
  const recent = entries.slice(-lastN);
  if (!recent.length) return null;
  return Math.round((recent.reduce((s, e) => s + e.energy, 0) / recent.length) * 10) / 10;
}

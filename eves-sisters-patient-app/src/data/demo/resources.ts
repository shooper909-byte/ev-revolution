import type { IconName } from '@/components/ui';

/**
 * Wellness resources shown on the dashboard. These are general,
 * non-prescriptive reading prompts written for the demo; each is marked as a
 * placeholder until the clinical team approves final articles.
 */
export type WellnessResource = {
  id: string;
  title: string;
  summary: string;
  minutes: number;
  icon: IconName;
  body: string[];
};

export const wellnessResources: WellnessResource[] = [
  {
    id: 'questions-for-your-visit',
    title: 'Questions worth bringing to your visit',
    summary: 'A short checklist so nothing important gets left unsaid.',
    minutes: 3,
    icon: 'chatbubbles-outline',
    body: [
      'Write down what you have noticed, when it started and what seems to make it better or worse.',
      'Bring a list of every medication, supplement and over-the-counter product you take.',
      'Ask what each option involves, what the alternatives are, and what follow-up looks like.',
      'It is always fine to ask a clinician to explain something again.',
    ],
  },
  {
    id: 'rest-routine',
    title: 'Small steps toward a more restful evening',
    summary: 'Gentle ideas for winding down — no perfection required.',
    minutes: 4,
    icon: 'moon-outline',
    body: [
      'Choose a consistent time to begin winding down, even on weekends.',
      'Dim lights and set screens aside when you can.',
      'Keep your bedroom cool, dark and quiet.',
      'If sleep changes are new or persistent, mention them to your clinician.',
    ],
  },
  {
    id: 'tracking-symptoms',
    title: 'Tracking how you feel, kindly',
    summary: 'Notes that help your care team — without turning life into a spreadsheet.',
    minutes: 3,
    icon: 'journal-outline',
    body: [
      'A few words a day is plenty. Patterns matter more than precision.',
      'Track what feels useful to you and skip what doesn’t.',
      'Your journal in this demo stays on this device and is cleared when you sign out.',
    ],
  },
];

export function getResource(id: string | undefined) {
  return wellnessResources.find((r) => r.id === id);
}

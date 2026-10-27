import { router } from 'expo-router';
import { useState } from 'react';
import { Linking, Pressable, View } from 'react-native';

import { AppText, Card, Icon, ListRow, Notice, Screen, SectionHeader } from '@/components/ui';
import { brand } from '@/data/catalog';
import { spacing } from '@/theme';

const faqs: [string, string][] = [
  [
    'Will I be approved for treatment?',
    'No treatment or prescription is guaranteed. Eligibility depends on your medical history, current medications, state availability and the independent clinician’s evaluation.',
  ],
  [
    'Are services available in every state?',
    'Services vary by state. The secure clinical intake confirms whether the requested program is available where you live and whether a live visit is required.',
  ],
  [
    'How is pricing decided?',
    'Pricing for each Mrs. program is personalized and confirmed during your private consultation — before you commit to anything. Eve’s Sisters memberships start at $199/month.',
  ],
  ['Is this app for emergencies?', 'No. If you are experiencing a medical emergency, call 911.'],
];

export default function Support() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Screen>
      <Notice tone="danger" title="In an emergency, call 911" icon="call-outline">
        Eve’s Sisters is not an emergency service. If you’re in crisis, you can call or text 988 (U.S.).
      </Notice>
      <SectionHeader title="Contact us" />
      <Card>
        <ListRow icon="chatbubbles-outline" title="Message your care team" subtitle="Secure messages, inside the app" onPress={() => router.push('/messages')} />
        <ListRow
          icon="mail-outline"
          title="Email support"
          subtitle={`${brand.supportEmail} — please don’t include health details`}
          onPress={() => void Linking.openURL(`mailto:${brand.supportEmail}?subject=${encodeURIComponent('App support')}`)}
        />
      </Card>

      <SectionHeader title="Common questions" />
      {faqs.map(([q, a], i) => (
        <Card key={q}>
          <Pressable
            onPress={() => setOpen(open === i ? null : i)}
            accessibilityRole="button"
            accessibilityState={{ expanded: open === i }}
            style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md, minHeight: 44 }}>
            <AppText variant="bodyStrong" style={{ flex: 1 }}>
              {q}
            </AppText>
            <Icon name={open === i ? 'chevron-up' : 'chevron-down'} size={18} color="textMuted" />
          </Pressable>
          {open === i ? (
            <View style={{ paddingTop: spacing.sm }}>
              <AppText variant="small" color="textSubtle">
                {a}
              </AppText>
            </View>
          ) : null}
        </Card>
      ))}
    </Screen>
  );
}

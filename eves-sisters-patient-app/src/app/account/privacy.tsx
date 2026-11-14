import * as WebBrowser from 'expo-web-browser';
import { View } from 'react-native';

import { AppText, Card, Icon, ListRow, Notice, Screen, SectionHeader, type IconName } from '@/components/ui';
import { brand } from '@/data/catalog';

import { spacing } from '@/theme';

const practices: { icon: IconName; title: string; body: string }[] = [
  {
    icon: 'person-outline',
    title: 'We ask for the minimum',
    body: 'Your account holds contact details. Health information is collected only in the secure clinical intake, when you choose to start care.',
  },
  {
    icon: 'lock-closed-outline',
    title: 'Protected in transit and on your device',
    body: 'Connections use HTTPS. Sign-in tokens are kept in your device’s secure keystore, and you’re signed out after inactivity.',
  },
  {
    icon: 'eye-off-outline',
    title: 'No health data in analytics or ads',
    body: 'This app contains no advertising trackers. Health details never go into analytics, crash reports or notifications.',
  },
  {
    icon: 'notifications-off-outline',
    title: 'Discreet notifications',
    body: 'Alerts never name a treatment, condition or clinician.',
  },
  {
    icon: 'trash-outline',
    title: 'You can ask us to delete your account',
    body: 'Request deletion anytime from Account. Some records may need to be retained by law; we’ll tell you what and why.',
  },
];

const policies = [
  { title: 'Privacy Policy', url: `${brand.website}/privacy-policy` },
  { title: 'HIPAA Notice', url: `${brand.website}/hipaa-policy` },
  { title: 'Terms of Service', url: `${brand.website}/terms-of-service` },
  { title: 'Telehealth Consent', url: `${brand.website}/telehealth-consent` },
];

export default function Privacy() {
  return (
    <Screen>
      <AppText variant="title">Your privacy</AppText>
      <AppText color="textSubtle">How this app is designed to treat your information.</AppText>
      {practices.map((p) => (
        <Card key={p.title}>
          <View style={{ flexDirection: 'row', gap: spacing.md }}>
            <Icon name={p.icon} />
            <View style={{ flex: 1, gap: 2 }}>
              <AppText variant="bodyStrong">{p.title}</AppText>
              <AppText variant="small" color="textMuted">
                {p.body}
              </AppText>
            </View>
          </View>
        </Card>
      ))}
      <Notice tone="warning" title="Preview build">
        These are the app’s design commitments. The binding terms are the published policies below, which are subject to legal review before
        this app is released.
      </Notice>
      <SectionHeader title="Published policies" />
      <Card>
        {policies.map((p) => (
          <ListRow key={p.title} icon="document-text-outline" title={p.title} subtitle="Opens evevolutionhealth.com" onPress={() => void WebBrowser.openBrowserAsync(p.url)} />
        ))}
      </Card>
    </Screen>
  );
}

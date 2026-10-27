import { router } from 'expo-router';

import { EmptyState, Screen } from '@/components/ui';

export default function NotFound() {
  return (
    <Screen>
      <EmptyState icon="compass-outline" title="This page isn’t here" body="It may have moved." actionLabel="Go home" onAction={() => router.replace('/')} />
    </Screen>
  );
}

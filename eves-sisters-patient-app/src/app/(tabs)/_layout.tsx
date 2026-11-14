import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router/js-tabs';
import { Platform } from 'react-native';
import type { ComponentProps } from 'react';

import { colors, fonts } from '@/theme';

type IconName = ComponentProps<typeof Ionicons>['name'];

const tabs: { name: string; title: string; icon: IconName; iconActive: IconName }[] = [
  { name: 'home', title: 'Home', icon: 'home-outline', iconActive: 'home' },
  { name: 'care', title: 'Care', icon: 'sparkles-outline', iconActive: 'sparkles' },
  { name: 'appointments', title: 'Visits', icon: 'calendar-outline', iconActive: 'calendar' },
  { name: 'journey', title: 'Journey', icon: 'leaf-outline', iconActive: 'leaf' },
  { name: 'account', title: 'Account', icon: 'person-circle-outline', iconActive: 'person-circle' },
];

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTitleStyle: { fontFamily: fonts.display, fontSize: 20, color: colors.heading },
        headerShadowVisible: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: { fontFamily: fonts.bodyMedium, fontSize: 12, lineHeight: 16 },
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          ...(Platform.OS === 'web' ? { height: 64, paddingBottom: 8 } : null),
        },
        sceneStyle: { backgroundColor: colors.background },
      }}>
      {tabs.map((t) => (
        <Tabs.Screen
          key={t.name}
          name={t.name}
          options={{
            title: t.title,
            tabBarAccessibilityLabel: `${t.title} tab`,
            tabBarIcon: ({ color, focused, size }) => <Ionicons name={focused ? t.iconActive : t.icon} size={size} color={color as string} />,
          }}
        />
      ))}
    </Tabs>
  );
}

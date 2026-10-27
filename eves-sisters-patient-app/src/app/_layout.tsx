import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold } from '@expo-google-fonts/inter';
import {
  PlayfairDisplay_400Regular,
  PlayfairDisplay_400Regular_Italic,
  PlayfairDisplay_600SemiBold,
} from '@expo-google-fonts/playfair-display';
import { useFonts } from 'expo-font';
import { Stack, usePathname } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { track } from '@/services/analytics';
import { JourneyProvider } from '@/state/JourneyProvider';
import { launch } from '@/state/launch';
import { PreferencesProvider } from '@/state/PreferencesProvider';
import { SessionProvider, useSession } from '@/state/SessionProvider';
import { colors, fonts } from '@/theme';

void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    PlayfairDisplay_400Regular,
    PlayfairDisplay_400Regular_Italic,
    PlayfairDisplay_600SemiBold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      void SplashScreen.hideAsync();
      track('app_opened');
    }
  }, [fontsLoaded, fontError]);

  // Fall back to system fonts rather than blocking the app if fonts fail.
  if (!fontsLoaded && !fontError) return null;

  return (
    <SafeAreaProvider>
      <SessionProvider>
        <PreferencesProvider>
          <JourneyProvider>
            <StatusBar style="dark" />
            <RootNavigator />
          </JourneyProvider>
        </PreferencesProvider>
      </SessionProvider>
    </SafeAreaProvider>
  );
}

function RootNavigator() {
  const { status } = useSession();
  const signedIn = status === 'signed-in';
  const pathname = usePathname();
  const firstPath = useRef(pathname);

  // Opened via a deep link rather than "/": skip the splash for this launch.
  useEffect(() => {
    if (firstPath.current !== '/') launch.markSplashPlayed();
  }, []);

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.primary,
        headerTitleStyle: { fontFamily: fonts.display, fontSize: 18 },
        headerShadowVisible: false,
        headerBackButtonDisplayMode: 'minimal',
        contentStyle: { backgroundColor: colors.background },
        animation: 'fade_from_bottom',
      }}>
      {/* Branded splash; decides where to go once the session is restored. */}
      <Stack.Screen name="index" options={{ headerShown: false, animation: 'none' }} />

      {/* Public: onboarding, authentication and the service catalog. */}
      <Stack.Protected guard={!signedIn}>
        <Stack.Screen name="welcome" options={{ headerShown: false }} />
        <Stack.Screen name="sign-in" options={{ title: 'Sign in' }} />
        <Stack.Screen name="create-account" options={{ title: 'Create account' }} />
        <Stack.Screen name="forgot-password" options={{ title: 'Reset password' }} />
        <Stack.Screen name="explore" options={{ title: 'Explore services' }} />
      </Stack.Protected>

      <Stack.Screen name="collection/[slug]" options={{ title: 'The Mrs. Collection' }} />
      <Stack.Screen name="treatments/[slug]" options={{ title: 'Treatment' }} />
      <Stack.Screen name="categories/[slug]" options={{ title: 'Care area' }} />
      <Stack.Screen name="memberships" options={{ title: 'Memberships' }} />
      <Stack.Screen name="resources/[id]" options={{ title: 'Wellness resource' }} />

      {/* Signed-in patient area. */}
      <Stack.Protected guard={signedIn}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="appointments/[id]" options={{ title: 'Appointment' }} />
        <Stack.Screen name="appointments/schedule" options={{ title: 'Schedule a visit', presentation: 'modal' }} />
        <Stack.Screen name="appointments/visit/[id]" options={{ title: 'Video visit' }} />
        <Stack.Screen name="consultation/start" options={{ title: 'Start a consultation', presentation: 'modal' }} />
        <Stack.Screen name="membership/enroll" options={{ title: 'Membership', presentation: 'modal' }} />
        <Stack.Screen name="journey/goal" options={{ title: 'New goal', presentation: 'modal' }} />
        <Stack.Screen name="journey/weight" options={{ title: 'Log weight', presentation: 'modal' }} />
        <Stack.Screen name="journey/check-in" options={{ title: 'Energy & mood', presentation: 'modal' }} />
        <Stack.Screen name="messages" options={{ title: 'Secure messages' }} />
        <Stack.Screen name="account/profile" options={{ title: 'Profile' }} />
        <Stack.Screen name="account/membership" options={{ title: 'Membership details' }} />
        <Stack.Screen name="account/notifications" options={{ title: 'Notifications' }} />
        <Stack.Screen name="account/privacy" options={{ title: 'Privacy' }} />
        <Stack.Screen name="account/support" options={{ title: 'Help & support' }} />
        <Stack.Screen name="account/settings" options={{ title: 'Account settings' }} />
        <Stack.Screen name="account/delete" options={{ title: 'Delete account' }} />
      </Stack.Protected>
    </Stack>
  );
}

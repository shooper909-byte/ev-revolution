import { LinearGradient } from 'expo-linear-gradient';
import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { AccessibilityInfo, Animated, StyleSheet, View } from 'react-native';

import { AppText, GoldRule, Logo, Tagline } from '@/components/ui';
import { launch } from '@/state/launch';
import { useSession } from '@/state/SessionProvider';
import { palette, spacing } from '@/theme';

const SPLASH_MS = 1400;

/** Branded splash. Holds briefly for the brand moment, then routes by session. */
export default function Splash() {
  const { status } = useSession();
  const [ready, setReady] = useState(() => launch.splashPlayed);
  const [opacity] = useState(() => new Animated.Value(0));

  useEffect(() => {
    let cancelled = false;
    AccessibilityInfo.isReduceMotionEnabled()
      .then((reduce) => {
        if (cancelled) return;
        if (reduce) opacity.setValue(1);
        else Animated.timing(opacity, { toValue: 1, duration: 600, useNativeDriver: true }).start();
      })
      .catch(() => opacity.setValue(1));
    const t = setTimeout(() => {
      launch.markSplashPlayed();
      setReady(true);
    }, SPLASH_MS);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [opacity]);

  if (ready && status !== 'restoring') {
    return <Redirect href={status === 'signed-in' ? '/home' : '/welcome'} />;
  }

  return (
    <LinearGradient colors={[palette.burgundy900, palette.burgundy800, palette.burgundy700]} style={styles.root}>
      <Animated.View style={[styles.center, { opacity }]}>
        <Logo size={240} />
        <GoldRule width={64} />
        <Tagline inverse />
        <View style={{ height: spacing.xl }} />
        <AppText variant="eyebrow" color="textInverseMuted" align="center">
          Women’s wellness & telehealth
        </AppText>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xl },
  center: { alignItems: 'center', gap: spacing.md },
});

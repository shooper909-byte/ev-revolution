import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText, Button, GoldRule, Icon, Logo, type IconName } from '@/components/ui';
import { brand, patientJourney } from '@/data/catalog';
import { track } from '@/services/analytics';
import { colors, maxContentWidth, palette, radii, spacing } from '@/theme';

type Slide = { key: string; eyebrow: string; title: string; body: string; image?: number; steps?: boolean };

const slides: Slide[] = [
  {
    key: 'welcome',
    eyebrow: brand.empowerment,
    title: 'Personalized wellness for every chapter of womanhood',
    body: 'Clinician-guided care for weight, hormones and menopause, skin, hair, longevity and intimate wellness — designed to evolve with you.',
    image: require('@/assets/images/brand/welcome-hero.jpg'),
  },
  {
    key: 'services',
    eyebrow: 'The Mrs. Collection & care areas',
    title: 'Care, thoughtfully curated',
    body: 'Explore the Mrs. Collection and treatment areas at your own pace. Every option begins with a private evaluation by a licensed clinician.',
    image: require('@/assets/images/collection/mrs-golden.jpg'),
  },
  {
    key: 'journey',
    eyebrow: 'How it works',
    title: 'Your journey, step by step',
    body: '',
    steps: true,
  },
];

export default function Welcome() {
  const { width, height } = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const listRef = useRef<FlatList<Slide>>(null);
  const pageWidth = Math.min(width, maxContentWidth);
  const imageHeight = Math.max(140, Math.min(260, height * 0.26));

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const i = Math.round(e.nativeEvent.contentOffset.x / pageWidth);
    if (i !== index) {
      setIndex(i);
      track('onboarding_viewed', { step: String(i + 1) });
    }
  };

  const goTo = (i: number) => listRef.current?.scrollToIndex({ index: i, animated: true });

  return (
    <LinearGradient colors={[palette.ivory50, palette.blush50, palette.blush100]} style={styles.root}>
      <SafeAreaView style={styles.root}>
        <View style={[styles.header, { width: pageWidth }]}>
          <Logo variant="mark" size={40} />
          <AppText variant="eyebrow" color="heading">
            {brand.name}
          </AppText>
          <View style={{ width: 40 }} />
        </View>

        <FlatList
          ref={listRef}
          data={slides}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={onScroll}
          keyExtractor={(s) => s.key}
          style={{ width: pageWidth, alignSelf: 'center' }}
          getItemLayout={(_, i) => ({ length: pageWidth, offset: pageWidth * i, index: i })}
          renderItem={({ item }) => (
            <ScrollView style={{ width: pageWidth }} contentContainerStyle={styles.slide} showsVerticalScrollIndicator={false}>
              {item.image ? (
                <Image source={item.image} style={[styles.image, { height: imageHeight }]} contentFit="cover" contentPosition="top" accessible={false} />
              ) : null}
              <AppText variant="eyebrow" color="textMuted" align="center">
                {item.eyebrow}
              </AppText>
              <AppText variant="title" align="center">
                {item.title}
              </AppText>
              <GoldRule />
              {item.body ? (
                <AppText color="textSubtle" align="center">
                  {item.body}
                </AppText>
              ) : null}
              {item.steps ? (
                <View style={styles.steps}>
                  {patientJourney.map((s) => (
                    <View key={s.n} style={styles.step}>
                      <View style={styles.stepIcon}>
                        <Icon name={s.icon as IconName} size={20} />
                      </View>
                      <View style={{ flex: 1, gap: 2 }}>
                        <AppText variant="bodyStrong">{s.title}</AppText>
                        <AppText variant="small" color="textMuted">
                          {s.copy}
                        </AppText>
                      </View>
                    </View>
                  ))}
                </View>
              ) : null}
            </ScrollView>
          )}
        />

        <View style={[styles.footer, { width: pageWidth }]}>
          <View style={styles.pager}>
            <View style={styles.dots} accessibilityLabel={`Page ${index + 1} of ${slides.length}`}>
              {slides.map((s, i) => (
                <Pressable
                  key={s.key}
                  onPress={() => goTo(i)}
                  accessibilityRole="button"
                  accessibilityLabel={`Go to page ${i + 1}`}
                  hitSlop={10}
                  style={[styles.dot, i === index ? styles.dotActive : null]}
                />
              ))}
            </View>
            {index < slides.length - 1 ? (
              <Pressable onPress={() => goTo(index + 1)} accessibilityRole="button" accessibilityHint="Shows the next introduction page" hitSlop={10} style={styles.next}>
                <AppText variant="bodyStrong" color="link">
                  Next
                </AppText>
                <Icon name="arrow-forward" size={18} color="link" />
              </Pressable>
            ) : null}
          </View>
          <Button label="Create account" onPress={() => router.push('/create-account')} testID="welcome-create-account" />
          <Button label="Sign in" variant="secondary" onPress={() => router.push('/sign-in')} testID="welcome-sign-in" />
          <Button label="Explore services" variant="ghost" icon="compass-outline" onPress={() => router.push('/explore')} />
          <AppText variant="caption" color="textMuted" align="center">
            Preview build with fictional demo data. Not for emergencies — call 911.
          </AppText>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  header: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
  slide: { paddingHorizontal: spacing.xl, paddingTop: spacing.lg, paddingBottom: spacing.lg, gap: spacing.md, alignItems: 'center' },
  image: { width: '100%', borderRadius: radii.xl, marginBottom: spacing.sm },
  steps: { gap: spacing.md, alignSelf: 'stretch', marginTop: spacing.sm },
  step: { flexDirection: 'row', gap: spacing.md, alignItems: 'flex-start' },
  stepIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.goldSoft,
  },
  footer: { alignSelf: 'center', paddingHorizontal: spacing.xl, paddingBottom: spacing.lg, gap: spacing.sm },
  pager: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', minHeight: 44 },
  dots: { flexDirection: 'row', gap: spacing.sm },
  next: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, minHeight: 44 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.borderStrong },
  dotActive: { width: 24, backgroundColor: colors.primary },
});

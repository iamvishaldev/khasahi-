import React from 'react';
import {StyleSheet, View} from 'react-native';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {ScreenContainer} from '@/components/layout/ScreenContainer';
import {AppText} from '@/components/typography/AppText';
import {PrimaryButton} from '@/components/actions/PrimaryButton';
import {useAppTheme} from '@/theme/useAppTheme';
import {AppStackParamList, AppTabParamList} from '@/types/navigation';

type HomeNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<AppTabParamList, 'Home'>,
  NativeStackNavigationProp<AppStackParamList>
>;

type Highlight = {
  icon: string;
  title: string;
  description: string;
};

const HIGHLIGHTS: Highlight[] = [
  {
    icon: '⚡',
    title: 'Instant AI Analysis',
    description: 'Point your camera at any label for a health breakdown in seconds.',
  },
  {
    icon: '🎯',
    title: 'Personalized for You',
    description: 'Recommendations tailored to your lifestyle and health goals.',
  },
  {
    icon: '🌱',
    title: 'Healthier Alternatives',
    description: "Discover better options when a product doesn't score well.",
  },
];

export function HomeScreen(): React.JSX.Element {
  const theme = useAppTheme();
  const navigation = useNavigation<HomeNavigationProp>();

  return (
    <ScreenContainer scrollable>
      <View style={{gap: theme.spacing.xs}}>
        <AppText variant="label" color="secondary">
          Welcome to
        </AppText>
        <AppText variant="display">Khasahi AI</AppText>
      </View>

      <View
        style={[
          styles.hero,
          {
            backgroundColor: theme.colors.surface.subtle,
            borderRadius: theme.radii.lg,
            padding: theme.spacing.xl,
            gap: theme.spacing.md,
          },
        ]}>
        <View
          style={[
            styles.heroIcon,
            {
              backgroundColor: theme.colors.surface.primary,
              borderRadius: theme.radii.pill,
              ...theme.shadows.card,
            },
          ]}>
          <AppText style={styles.heroGlyph}>🔍</AppText>
        </View>
        <AppText variant="heading">Know what's really in your food</AppText>
        <AppText variant="body" color="secondary">
          Scan any packaged food product to get an instant AI-powered health
          analysis, ingredient breakdown, and personalized recommendation.
        </AppText>
        <PrimaryButton
          label="Scan Product"
          onPress={() => navigation.navigate('Scanner', undefined)}
        />
      </View>

      <View style={{gap: theme.spacing.md}}>
        {HIGHLIGHTS.map(highlight => (
          <View
            key={highlight.title}
            style={[
              styles.highlightRow,
              {
                backgroundColor: theme.colors.surface.primary,
                borderRadius: theme.radii.md,
                padding: theme.spacing.lg,
                gap: theme.spacing.md,
                ...theme.shadows.card,
              },
            ]}>
            <AppText style={styles.highlightGlyph}>{highlight.icon}</AppText>
            <View style={{flex: 1, gap: theme.spacing.xs}}>
              <AppText variant="heading">{highlight.title}</AppText>
              <AppText variant="caption" color="secondary">
                {highlight.description}
              </AppText>
            </View>
          </View>
        ))}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  hero: {
    alignItems: 'flex-start',
  },
  heroIcon: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroGlyph: {
    fontSize: 28,
    lineHeight: 34,
  },
  highlightRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  highlightGlyph: {
    fontSize: 28,
    lineHeight: 34,
  },
});

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {ScreenContainer} from '@/components/layout/ScreenContainer';
import {AppText} from '@/components/typography/AppText';
import {PrimaryButton} from '@/components/actions/PrimaryButton';
import {Icon, IconName} from '@/components/icons/Icon';
import {useAppTheme} from '@/theme/useAppTheme';
import {AppStackParamList, AppTabParamList} from '@/types/navigation';

type HomeNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<AppTabParamList, 'Home'>,
  NativeStackNavigationProp<AppStackParamList>
>;

type Highlight = {
  icon: IconName;
  tint: string;
  title: string;
  description: string;
};

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) {
    return 'Good Morning';
  }
  if (hour < 18) {
    return 'Good Afternoon';
  }
  return 'Good Evening';
}

export function HomeScreen(): React.JSX.Element {
  const theme = useAppTheme();
  const navigation = useNavigation<HomeNavigationProp>();

  const highlights: Highlight[] = [
    {
      icon: 'zap',
      tint: theme.colors.feedback.warning,
      title: 'Instant AI Analysis',
      description: 'Point your camera at any label for a health breakdown in seconds.',
    },
    {
      icon: 'target',
      tint: theme.colors.accent.primary,
      title: 'Personalized for You',
      description: 'Recommendations tailored to your lifestyle and health goals.',
    },
    {
      icon: 'leaf',
      tint: theme.colors.accent.secondary,
      title: 'Healthier Alternatives',
      description: "Discover better options when a product doesn't score well.",
    },
  ];

  return (
    <ScreenContainer scrollable>
      <View style={{gap: theme.spacing.xs}}>
        <AppText variant="label" color="secondary">
          {getGreeting()}
        </AppText>
        <AppText variant="display">Khasahi AI</AppText>
        <AppText variant="caption" color="secondary" style={styles.tagline}>
          FOOD INTELLIGENCE · POWERED BY AI
        </AppText>
      </View>

      <View
        style={[
          styles.hero,
          {
            backgroundColor: theme.colors.brand.ink,
            borderRadius: theme.radii.lg,
            padding: theme.spacing.xl,
            gap: theme.spacing.sm,
          },
        ]}>
        <View
          style={[
            styles.aiBadge,
            {
              backgroundColor: 'rgba(255,255,255,0.12)',
              borderRadius: theme.radii.pill,
              paddingVertical: theme.spacing.xs,
              paddingHorizontal: theme.spacing.md,
              gap: theme.spacing.xs,
            },
          ]}>
          <Icon name="sparkles" size={13} color={theme.colors.accent.primary} />
          <AppText variant="caption" style={{color: theme.colors.accent.primary}}>
            AI-Powered
          </AppText>
        </View>

        <AppText variant="title" style={{color: theme.colors.text.inverse}}>
          Scan Food Product
        </AppText>
        <AppText variant="body" style={styles.heroSubtitle}>
          AI explains every ingredient before you buy.
        </AppText>

        <View style={{marginTop: theme.spacing.sm}}>
          <PrimaryButton
            label="Scan Product"
            onPress={() => navigation.navigate('Scanner', undefined)}
          />
        </View>
      </View>

      <View style={{gap: theme.spacing.md}}>
        {highlights.map(highlight => (
          <View
            key={highlight.title}
            style={[
              styles.highlightRow,
              {
                backgroundColor: theme.colors.surface.primary,
                borderRadius: theme.radii.lg,
                padding: theme.spacing.lg,
                gap: theme.spacing.md,
                ...theme.shadows.card,
              },
            ]}>
            <View
              style={[
                styles.iconBadge,
                {backgroundColor: `${highlight.tint}1F`, borderRadius: theme.radii.md},
              ]}>
              <Icon name={highlight.icon} size={20} color={highlight.tint} />
            </View>
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
  tagline: {
    letterSpacing: 1,
  },
  hero: {
    alignItems: 'flex-start',
  },
  aiBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heroSubtitle: {
    color: 'rgba(255,255,255,0.72)',
  },
  highlightRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBadge: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

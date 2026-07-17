import React from 'react';
import {StyleSheet, View} from 'react-native';
import {AppText} from '@/components/typography/AppText';
import {PrimaryButton} from '@/components/actions/PrimaryButton';
import {useAppTheme} from '@/theme/useAppTheme';
import {OnboardingStepLayout} from '../../components/OnboardingStepLayout';
import {OnboardingPaginationDots} from '../../components/OnboardingPaginationDots';

type WelcomeStepProps = {
  onNext: () => void;
};

export function WelcomeStep({onNext}: WelcomeStepProps): React.JSX.Element {
  const theme = useAppTheme();

  return (
    <OnboardingStepLayout
      footer={
        <View style={{gap: theme.spacing.lg}}>
          <PrimaryButton label="Get Started" onPress={onNext} />
          <OnboardingPaginationDots total={3} current={0} />
        </View>
      }>
      <View
        style={[
          styles.illustration,
          {
            backgroundColor: theme.colors.surface.primary,
            borderRadius: theme.radii.lg,
            padding: theme.spacing.xl,
            ...theme.shadows.card,
          },
        ]}>
        <View
          style={[
            styles.badge,
            styles.badgeDanger,
            {
              backgroundColor: theme.colors.brand.ink,
              borderRadius: theme.radii.sm,
              padding: theme.spacing.xs,
            },
          ]}>
          <AppText variant="caption" color="inverse">
            ⚠ Sodium High – 840mg
          </AppText>
        </View>
        <AppText variant="display">🧾 |||||||||||||</AppText>
        <View
          style={[
            styles.badge,
            styles.badgeSuccess,
            {
              backgroundColor: theme.colors.accent.primary,
              borderRadius: theme.radii.sm,
              padding: theme.spacing.xs,
            },
          ]}>
          <AppText variant="caption" color="inverse">
            ✓ Score 7.4/10 Good
          </AppText>
        </View>
      </View>

      <AppText variant="display">
        Understand Every Ingredient Before You Buy.
      </AppText>
      <AppText variant="body" color="secondary">
        AI-powered food intelligence. Scan any label, decode every
        ingredient, get a personalized health score.
      </AppText>
    </OnboardingStepLayout>
  );
}

const styles = StyleSheet.create({
  illustration: {
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
  },
  badgeDanger: {
    top: 8,
    right: 8,
  },
  badgeSuccess: {
    bottom: 8,
    left: 8,
  },
});

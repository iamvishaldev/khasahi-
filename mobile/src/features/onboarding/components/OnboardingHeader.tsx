import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {AppText} from '@/components/typography/AppText';
import {useAppTheme} from '@/theme/useAppTheme';
import {OnboardingProgressBar} from './OnboardingProgressBar';

type OnboardingHeaderProps = {
  step: number;
  totalSteps: number;
  onBack: () => void;
};

export function OnboardingHeader({
  step,
  totalSteps,
  onBack,
}: OnboardingHeaderProps): React.JSX.Element {
  const theme = useAppTheme();

  return (
    <View style={[styles.row, {gap: theme.spacing.md}]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Go back"
        onPress={onBack}
        style={[
          styles.backButton,
          {
            backgroundColor: theme.colors.surface.subtle,
            borderRadius: theme.radii.sm,
          },
        ]}>
        <AppText variant="heading">←</AppText>
      </Pressable>
      <OnboardingProgressBar currentStep={step} totalSteps={totalSteps} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

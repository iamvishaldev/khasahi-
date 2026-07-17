import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useAppTheme} from '@/theme/useAppTheme';

type OnboardingProgressBarProps = {
  currentStep: number;
  totalSteps: number;
};

export function OnboardingProgressBar({
  currentStep,
  totalSteps,
}: OnboardingProgressBarProps): React.JSX.Element {
  const theme = useAppTheme();

  return (
    <View style={[styles.row, {gap: theme.spacing.xs}]}>
      {Array.from({length: totalSteps}, (_, index) => (
        <View
          key={index}
          style={[
            styles.segment,
            {
              backgroundColor:
                index < currentStep
                  ? theme.colors.accent.primary
                  : theme.colors.border.subtle,
              borderRadius: theme.radii.pill,
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flex: 1,
  },
  segment: {
    flex: 1,
    height: 4,
  },
});

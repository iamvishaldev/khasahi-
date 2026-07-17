import React from 'react';
import {StyleSheet, View} from 'react-native';
import {PrimaryButton} from '@/components/actions/PrimaryButton';
import {AppText} from '@/components/typography/AppText';
import {useAppTheme} from '@/theme/useAppTheme';
import {useOnboardingStore} from '@/store/onboarding.store';
import {OnboardingStepLayout} from '../../components/OnboardingStepLayout';
import {OnboardingHeader} from '../../components/OnboardingHeader';
import {SelectableChip} from '../../components/SelectableChip';
import {OnboardingConfirmationBanner} from '../../components/OnboardingConfirmationBanner';
import {onboardingHealthGoals} from '../../data/healthGoals';

type HealthGoalsStepProps = {
  step: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
};

export function HealthGoalsStep({
  step,
  totalSteps,
  onNext,
  onBack,
}: HealthGoalsStepProps): React.JSX.Element {
  const theme = useAppTheme();
  const healthGoals = useOnboardingStore(state => state.healthGoals);
  const toggleHealthGoal = useOnboardingStore(state => state.toggleHealthGoal);

  return (
    <OnboardingStepLayout
      header={
        <OnboardingHeader step={step} totalSteps={totalSteps} onBack={onBack} />
      }
      footer={
        <PrimaryButton
          label="Continue"
          disabled={healthGoals.length === 0}
          onPress={onNext}
        />
      }>
      <AppText variant="title">What are your health goals?</AppText>
      <AppText variant="body" color="secondary">
        Select all that apply.
      </AppText>
      <View style={[styles.chipGrid, {gap: theme.spacing.sm}]}>
        {onboardingHealthGoals.map(goal => (
          <SelectableChip
            key={goal.id}
            icon={goal.icon}
            label={goal.label}
            selected={healthGoals.includes(goal.label)}
            onPress={() => toggleHealthGoal(goal.label)}
          />
        ))}
      </View>
      {healthGoals.length > 0 ? (
        <OnboardingConfirmationBanner count={healthGoals.length} />
      ) : null}
    </OnboardingStepLayout>
  );
}

const styles = StyleSheet.create({
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

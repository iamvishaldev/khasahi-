import React from 'react';
import {StyleSheet, View} from 'react-native';
import {PrimaryButton} from '@/components/actions/PrimaryButton';
import {AppText} from '@/components/typography/AppText';
import {useAppTheme} from '@/theme/useAppTheme';
import {useOnboardingStore} from '@/store/onboarding.store';
import {OnboardingStepLayout} from '../../components/OnboardingStepLayout';
import {OnboardingHeader} from '../../components/OnboardingHeader';
import {OnboardingInfoCard} from '../../components/OnboardingInfoCard';
import {SelectableChip} from '../../components/SelectableChip';
import {onboardingDietaryPreferences} from '../../data/dietaryPreferences';

type DietaryPreferencesStepProps = {
  step: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
};

export function DietaryPreferencesStep({
  step,
  totalSteps,
  onNext,
  onBack,
}: DietaryPreferencesStepProps): React.JSX.Element {
  const theme = useAppTheme();
  const dietaryPreference = useOnboardingStore(
    state => state.dietaryPreference,
  );
  const setDietaryPreference = useOnboardingStore(
    state => state.setDietaryPreference,
  );

  return (
    <OnboardingStepLayout
      header={
        <OnboardingHeader step={step} totalSteps={totalSteps} onBack={onBack} />
      }
      footer={
        <PrimaryButton
          label="Continue"
          disabled={!dietaryPreference}
          onPress={onNext}
        />
      }>
      <AppText variant="display">Tell us about your diet.</AppText>
      <AppText variant="body" color="secondary">
        AI flags ingredients that conflict with your dietary choices.
      </AppText>
      <OnboardingInfoCard
        icon="🥗"
        title="Dietary-aware AI scanning"
        description="We'll highlight hidden animal products, gluten traces, and non-keto additives automatically."
      />
      <View style={[styles.chipGrid, {gap: theme.spacing.sm}]}>
        {onboardingDietaryPreferences.map(preference => (
          <SelectableChip
            key={preference.id}
            label={preference.label}
            selected={dietaryPreference === preference.label}
            onPress={() => setDietaryPreference(preference.label)}
          />
        ))}
      </View>
    </OnboardingStepLayout>
  );
}

const styles = StyleSheet.create({
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

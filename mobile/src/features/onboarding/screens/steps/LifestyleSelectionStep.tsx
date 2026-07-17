import React from 'react';
import {PrimaryButton} from '@/components/actions/PrimaryButton';
import {AppText} from '@/components/typography/AppText';
import {useOnboardingStore} from '@/store/onboarding.store';
import {lifestyleProfiles} from '@/features/profile/data/lifestyleProfiles';
import {OnboardingStepLayout} from '../../components/OnboardingStepLayout';
import {OnboardingHeader} from '../../components/OnboardingHeader';
import {SelectableCard} from '../../components/SelectableCard';
import {lifestyleProfileIcons} from '../../data/lifestyleProfileIcons';

type LifestyleSelectionStepProps = {
  step: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
};

export function LifestyleSelectionStep({
  step,
  totalSteps,
  onNext,
  onBack,
}: LifestyleSelectionStepProps): React.JSX.Element {
  const lifestyleProfileId = useOnboardingStore(
    state => state.lifestyleProfileId,
  );
  const setLifestyleProfile = useOnboardingStore(
    state => state.setLifestyleProfile,
  );

  return (
    <OnboardingStepLayout
      header={
        <OnboardingHeader step={step} totalSteps={totalSteps} onBack={onBack} />
      }
      footer={
        <PrimaryButton
          label="Continue"
          disabled={!lifestyleProfileId}
          onPress={onNext}
        />
      }>
      <AppText variant="display">Which lifestyle fits you best?</AppText>
      <AppText variant="body" color="secondary">
        Select one — shapes your entire AI profile.
      </AppText>
      {lifestyleProfiles.map(profile => (
        <SelectableCard
          key={profile.id}
          icon={lifestyleProfileIcons[profile.id]}
          title={profile.label}
          subtitle={profile.description}
          selected={lifestyleProfileId === profile.id}
          onPress={() => setLifestyleProfile(profile.id)}
        />
      ))}
    </OnboardingStepLayout>
  );
}

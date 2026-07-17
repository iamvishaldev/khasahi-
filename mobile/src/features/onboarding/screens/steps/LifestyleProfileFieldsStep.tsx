import React from 'react';
import {PrimaryButton} from '@/components/actions/PrimaryButton';
import {AppText} from '@/components/typography/AppText';
import {useOnboardingStore} from '@/store/onboarding.store';
import {findLifestyleProfile} from '@/features/profile/data/lifestyleProfiles';
import {OnboardingStepLayout} from '../../components/OnboardingStepLayout';
import {OnboardingHeader} from '../../components/OnboardingHeader';
import {OnboardingInfoCard} from '../../components/OnboardingInfoCard';
import {DynamicLifestyleField} from '../../components/DynamicLifestyleField';
import {lifestyleProfileIcons} from '../../data/lifestyleProfileIcons';

type LifestyleProfileFieldsStepProps = {
  step: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
};

export function LifestyleProfileFieldsStep({
  step,
  totalSteps,
  onNext,
  onBack,
}: LifestyleProfileFieldsStepProps): React.JSX.Element | null {
  const lifestyleProfileId = useOnboardingStore(
    state => state.lifestyleProfileId,
  );
  const lifestyleAnswers = useOnboardingStore(state => state.lifestyleAnswers);
  const setLifestyleAnswer = useOnboardingStore(
    state => state.setLifestyleAnswer,
  );

  const profile = lifestyleProfileId
    ? findLifestyleProfile(lifestyleProfileId)
    : undefined;

  if (!profile) {
    return null;
  }

  const requiredFieldsAnswered = profile.fields
    .filter(field => field.required)
    .every(field =>
      lifestyleAnswers.some(
        answer =>
          answer.fieldId === field.id &&
          (Array.isArray(answer.value)
            ? answer.value.length > 0
            : answer.value !== ''),
      ),
    );

  return (
    <OnboardingStepLayout
      header={
        <OnboardingHeader step={step} totalSteps={totalSteps} onBack={onBack} />
      }
      footer={
        <PrimaryButton
          label="Continue"
          disabled={!requiredFieldsAnswered}
          onPress={onNext}
        />
      }>
      <OnboardingInfoCard
        icon={lifestyleProfileIcons[profile.id]}
        title={`${profile.label} Nutrition`}
        description={profile.description}
      />
      <AppText variant="title">Your {profile.label.toLowerCase()} details</AppText>
      <AppText variant="body" color="secondary">
        Calibrates daily calorie and micronutrient targets.
      </AppText>
      {profile.fields.map(field => (
        <DynamicLifestyleField
          key={field.id}
          field={field}
          value={
            lifestyleAnswers.find(answer => answer.fieldId === field.id)
              ?.value
          }
          onChange={value => setLifestyleAnswer(field.id, value)}
        />
      ))}
    </OnboardingStepLayout>
  );
}

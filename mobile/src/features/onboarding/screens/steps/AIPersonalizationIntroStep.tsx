import React from 'react';
import {PrimaryButton} from '@/components/actions/PrimaryButton';
import {AppText} from '@/components/typography/AppText';
import {OnboardingStepLayout} from '../../components/OnboardingStepLayout';
import {OnboardingHeader} from '../../components/OnboardingHeader';
import {PillBadge} from '../../components/PillBadge';
import {FeatureListItem} from '../../components/FeatureListItem';
import {onboardingFeatureHighlights} from '../../data/featureHighlights';

type AIPersonalizationIntroStepProps = {
  step: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
};

export function AIPersonalizationIntroStep({
  step,
  totalSteps,
  onNext,
  onBack,
}: AIPersonalizationIntroStepProps): React.JSX.Element {
  return (
    <OnboardingStepLayout
      header={
        <OnboardingHeader step={step} totalSteps={totalSteps} onBack={onBack} />
      }
      footer={<PrimaryButton label="Continue" onPress={onNext} />}>
      <PillBadge label="AI PERSONALIZATION" />
      <AppText variant="title">Let's build your nutrition profile.</AppText>
      <AppText variant="body" color="secondary">
        3 quick questions. Your answers train the AI to give you
        hyper-relevant food insights — not generic advice.
      </AppText>
      {onboardingFeatureHighlights.map(feature => (
        <FeatureListItem
          key={feature.id}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </OnboardingStepLayout>
  );
}

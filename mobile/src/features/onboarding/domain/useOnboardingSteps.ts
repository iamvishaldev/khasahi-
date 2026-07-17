import {useMemo} from 'react';
import {findLifestyleProfile} from '@/features/profile/data/lifestyleProfiles';
import {useOnboardingStore} from '@/store/onboarding.store';

export type OnboardingStepId =
  | 'welcome'
  | 'ai-intro'
  | 'lifestyle'
  | 'goals'
  | 'diet'
  | 'lifestyle-fields'
  | 'profile-ready';

const PROGRESS_STEP_IDS: OnboardingStepId[] = [
  'ai-intro',
  'lifestyle',
  'goals',
  'diet',
  'lifestyle-fields',
];

type UseOnboardingStepsResult = {
  steps: OnboardingStepId[];
  totalProgressSteps: number;
  progressStepFor: (stepId: OnboardingStepId) => number;
};

export function useOnboardingSteps(): UseOnboardingStepsResult {
  const lifestyleProfileId = useOnboardingStore(
    state => state.lifestyleProfileId,
  );

  const hasLifestyleFields = useMemo(() => {
    if (!lifestyleProfileId) {
      return false;
    }
    const profile = findLifestyleProfile(lifestyleProfileId);
    return Boolean(profile?.fields.length);
  }, [lifestyleProfileId]);

  const steps = useMemo<OnboardingStepId[]>(() => {
    const ordered: OnboardingStepId[] = [
      'welcome',
      'ai-intro',
      'lifestyle',
      'goals',
      'diet',
    ];
    if (hasLifestyleFields) {
      ordered.push('lifestyle-fields');
    }
    ordered.push('profile-ready');
    return ordered;
  }, [hasLifestyleFields]);

  const totalProgressSteps = hasLifestyleFields
    ? PROGRESS_STEP_IDS.length
    : PROGRESS_STEP_IDS.length - 1;

  function progressStepFor(stepId: OnboardingStepId): number {
    const index = PROGRESS_STEP_IDS.indexOf(stepId);
    return index === -1 ? 0 : index + 1;
  }

  return {steps, totalProgressSteps, progressStepFor};
}

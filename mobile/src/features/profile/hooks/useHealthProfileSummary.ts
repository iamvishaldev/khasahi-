import {useOnboardingStore} from '@/store/onboarding.store';
import {findLifestyleProfile} from '@/features/profile/data/lifestyleProfiles';
import {lifestyleProfileIcons} from '@/features/onboarding/data/lifestyleProfileIcons';
import {onboardingHealthGoals} from '@/features/onboarding/data/healthGoals';

export type HealthProfileSummary = {
  lifestyleLabel: string;
  lifestyleIcon: string;
  goalLabel: string;
  goalIcon: string;
};

const DEFAULT_LIFESTYLE_ICON = '👤';
const DEFAULT_GOAL_ICON = '🥗';
const DEFAULT_GOAL_LABEL = 'Eat Healthier';

/**
 * Reads the user's real onboarding answers (lifestyle profile + first
 * health goal) and shapes them into the small summary every "why this is
 * personalized for you" surface in the app needs — the AI Processing
 * screen's Health Profile card and Product Analysis's Personalized
 * Insight card both consume this instead of duplicating the lookup.
 */
export function useHealthProfileSummary(): HealthProfileSummary {
  const lifestyleProfileId = useOnboardingStore(state => state.lifestyleProfileId);
  const healthGoals = useOnboardingStore(state => state.healthGoals);

  const profile = lifestyleProfileId ? findLifestyleProfile(lifestyleProfileId) : undefined;
  const firstGoalLabel = healthGoals[0];
  const goalDefinition = onboardingHealthGoals.find(goal => goal.label === firstGoalLabel);

  return {
    lifestyleLabel: profile?.label ?? 'General User',
    lifestyleIcon: lifestyleProfileId
      ? lifestyleProfileIcons[lifestyleProfileId]
      : DEFAULT_LIFESTYLE_ICON,
    goalLabel: goalDefinition?.label ?? firstGoalLabel ?? DEFAULT_GOAL_LABEL,
    goalIcon: goalDefinition?.icon ?? DEFAULT_GOAL_ICON,
  };
}

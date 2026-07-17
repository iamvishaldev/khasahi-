import {UserPreferences} from '@shared/index';

type OnboardingDraftForSubmission = {
  lifestyleProfileId: UserPreferences['lifestyle']['profileId'] | null;
  lifestyleAnswers: UserPreferences['lifestyle']['answers'];
  healthGoals: string[];
  dietaryPreference: string | null;
  allergies: string[];
  age: number | undefined;
};

export function buildUserPreferences(
  draft: OnboardingDraftForSubmission,
): UserPreferences {
  if (!draft.lifestyleProfileId) {
    throw new Error(
      'Cannot build user preferences before a lifestyle profile is selected.',
    );
  }

  const dietaryPreferences =
    draft.dietaryPreference && draft.dietaryPreference !== 'No Preference'
      ? [draft.dietaryPreference]
      : [];

  return {
    lifestyle: {
      profileId: draft.lifestyleProfileId,
      answers: draft.lifestyleAnswers,
    },
    healthGoals: draft.healthGoals,
    dietaryPreferences,
    allergies: draft.allergies,
    age: draft.age,
  };
}

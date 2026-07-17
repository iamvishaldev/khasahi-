import {describe, beforeEach, it, expect} from '@jest/globals';
import {useOnboardingStore} from './onboarding.store';

describe('useOnboardingStore', () => {
  beforeEach(() => {
    useOnboardingStore.getState().reset();
  });

  it('sets the lifestyle profile and clears prior lifestyle answers', () => {
    useOnboardingStore.getState().setLifestyleAnswer('work-style', 'remote');

    useOnboardingStore.getState().setLifestyleProfile('it-professional');

    expect(useOnboardingStore.getState().lifestyleProfileId).toBe(
      'it-professional',
    );
    expect(useOnboardingStore.getState().lifestyleAnswers).toEqual([]);
  });

  it('upserts a lifestyle answer for the same field id instead of duplicating it', () => {
    useOnboardingStore.getState().setLifestyleAnswer('work-style', 'remote');
    useOnboardingStore.getState().setLifestyleAnswer('work-style', 'hybrid');

    expect(useOnboardingStore.getState().lifestyleAnswers).toEqual([
      {fieldId: 'work-style', value: 'hybrid'},
    ]);
  });

  it('toggles a health goal on and back off', () => {
    useOnboardingStore.getState().toggleHealthGoal('Lose Weight');
    expect(useOnboardingStore.getState().healthGoals).toEqual([
      'Lose Weight',
    ]);

    useOnboardingStore.getState().toggleHealthGoal('Lose Weight');
    expect(useOnboardingStore.getState().healthGoals).toEqual([]);
  });

  it('keeps dietary preference selection exclusive', () => {
    useOnboardingStore.getState().setDietaryPreference('Vegan');
    expect(useOnboardingStore.getState().dietaryPreference).toBe('Vegan');

    useOnboardingStore.getState().setDietaryPreference('Keto');
    expect(useOnboardingStore.getState().dietaryPreference).toBe('Keto');
  });

  it('resets the draft back to its initial state', () => {
    useOnboardingStore.getState().setLifestyleProfile('parent');
    useOnboardingStore.getState().toggleHealthGoal('Lose Weight');
    useOnboardingStore.getState().setDietaryPreference('Vegan');

    useOnboardingStore.getState().reset();

    expect(useOnboardingStore.getState().lifestyleProfileId).toBeNull();
    expect(useOnboardingStore.getState().healthGoals).toEqual([]);
    expect(useOnboardingStore.getState().dietaryPreference).toBeNull();
    expect(useOnboardingStore.getState().submissionStatus).toBe('idle');
  });
});

import {describe, it, expect} from '@jest/globals';
import {buildUserPreferences} from './buildUserPreferences';

describe('buildUserPreferences', () => {
  const baseDraft = {
    lifestyleProfileId: 'parent' as const,
    lifestyleAnswers: [],
    healthGoals: ['Lose Weight'],
    dietaryPreference: 'Vegan',
    allergies: [],
    age: undefined,
  };

  it('maps a filled-out draft into the shared UserPreferences shape', () => {
    const preferences = buildUserPreferences(baseDraft);

    expect(preferences).toEqual({
      lifestyle: {profileId: 'parent', answers: []},
      healthGoals: ['Lose Weight'],
      dietaryPreferences: ['Vegan'],
      allergies: [],
      age: undefined,
    });
  });

  it('maps "No Preference" to an empty dietary preferences array instead of the literal string', () => {
    const preferences = buildUserPreferences({
      ...baseDraft,
      dietaryPreference: 'No Preference',
    });

    expect(preferences.dietaryPreferences).toEqual([]);
  });

  it('maps a null dietary preference to an empty array', () => {
    const preferences = buildUserPreferences({
      ...baseDraft,
      dietaryPreference: null,
    });

    expect(preferences.dietaryPreferences).toEqual([]);
  });

  it('throws when no lifestyle profile has been selected', () => {
    expect(() =>
      buildUserPreferences({...baseDraft, lifestyleProfileId: null}),
    ).toThrow();
  });
});

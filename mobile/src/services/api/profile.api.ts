import {UserPreferences, UserProfile} from '@shared/index';
import {apiRequest} from './client';

type WirePreferences = {
  lifestyle: {
    profile_id: string;
    answers: {field_id: string; value: string | number | string[]}[];
  };
  health_goals: string[];
  dietary_preferences: string[];
  allergies: string[];
  age: number | null;
};

type WireUserProfile = {
  id: string;
  display_name: string | null;
  preferences: WirePreferences;
};

function toWirePreferences(preferences: UserPreferences): WirePreferences {
  return {
    lifestyle: {
      profile_id: preferences.lifestyle.profileId,
      answers: preferences.lifestyle.answers.map(answer => ({
        field_id: answer.fieldId,
        value: answer.value,
      })),
    },
    health_goals: preferences.healthGoals,
    dietary_preferences: preferences.dietaryPreferences,
    allergies: preferences.allergies,
    age: preferences.age ?? null,
  };
}

function fromWireUserProfile(wire: WireUserProfile): UserProfile {
  return {
    id: wire.id,
    displayName: wire.display_name,
    preferences: {
      lifestyle: {
        profileId: wire.preferences.lifestyle.profile_id as UserPreferences['lifestyle']['profileId'],
        answers: wire.preferences.lifestyle.answers.map(answer => ({
          fieldId: answer.field_id,
          value: answer.value,
        })),
      },
      healthGoals: wire.preferences.health_goals,
      dietaryPreferences: wire.preferences.dietary_preferences,
      allergies: wire.preferences.allergies,
      age: wire.preferences.age ?? undefined,
    },
  };
}

export async function upsertPreferences(
  preferences: UserPreferences,
  accessToken: string,
): Promise<UserProfile> {
  const response = await apiRequest<WireUserProfile>(
    '/v1/profile/me/preferences',
    {
      method: 'PUT',
      body: toWirePreferences(preferences),
      accessToken,
    },
  );

  return fromWireUserProfile(response.data);
}

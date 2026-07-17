import {describe, beforeEach, it, expect, jest} from '@jest/globals';
import type {MockedFunction} from 'jest-mock';
import {apiRequest} from './client';
import {upsertPreferences} from './profile.api';

jest.mock('./client', () => ({
  apiRequest: jest.fn(),
}));

const mockedApiRequest = apiRequest as MockedFunction<typeof apiRequest>;

describe('profile.api upsertPreferences', () => {
  beforeEach(() => {
    mockedApiRequest.mockReset();
  });

  it('sends camelCase preferences as snake_case to the correct endpoint', async () => {
    mockedApiRequest.mockResolvedValue({
      data: {
        id: 'user-1',
        display_name: 'Vishal',
        preferences: {
          lifestyle: {profile_id: 'parent', answers: []},
          health_goals: ['Lose Weight'],
          dietary_preferences: ['Vegan'],
          allergies: [],
          age: null,
        },
      },
      meta: {requestId: 'req-1', timestamp: '2026-07-17T00:00:00.000Z'},
    });

    await upsertPreferences(
      {
        lifestyle: {profileId: 'parent', answers: []},
        healthGoals: ['Lose Weight'],
        dietaryPreferences: ['Vegan'],
        allergies: [],
        age: undefined,
      },
      'token-abc',
    );

    expect(mockedApiRequest).toHaveBeenCalledWith(
      '/v1/profile/me/preferences',
      {
        method: 'PUT',
        accessToken: 'token-abc',
        body: {
          lifestyle: {profile_id: 'parent', answers: []},
          health_goals: ['Lose Weight'],
          dietary_preferences: ['Vegan'],
          allergies: [],
          age: null,
        },
      },
    );
  });

  it('maps the snake_case response back into the camelCase UserProfile shape', async () => {
    mockedApiRequest.mockResolvedValue({
      data: {
        id: 'user-1',
        display_name: null,
        preferences: {
          lifestyle: {profile_id: 'general-user', answers: []},
          health_goals: [],
          dietary_preferences: [],
          allergies: [],
          age: 30,
        },
      },
      meta: {requestId: 'req-2', timestamp: '2026-07-17T00:00:00.000Z'},
    });

    const profile = await upsertPreferences(
      {
        lifestyle: {profileId: 'general-user', answers: []},
        healthGoals: [],
        dietaryPreferences: [],
        allergies: [],
        age: 30,
      },
      'token-abc',
    );

    expect(profile).toEqual({
      id: 'user-1',
      displayName: null,
      preferences: {
        lifestyle: {profileId: 'general-user', answers: []},
        healthGoals: [],
        dietaryPreferences: [],
        allergies: [],
        age: 30,
      },
    });
  });
});

import {LifestyleSelection} from './lifestyle';

export interface UserPreferences {
  lifestyle: LifestyleSelection;
  healthGoals: string[];
  dietaryPreferences: string[];
  allergies: string[];
  age?: number;
}

export interface UserProfile {
  id: string;
  displayName: string | null;
  preferences: UserPreferences;
}

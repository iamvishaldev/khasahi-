export type OnboardingDietaryPreference = {
  id: string;
  label: string;
  icon: string;
};

export const onboardingDietaryPreferences: OnboardingDietaryPreference[] = [
  {id: 'vegetarian', label: 'Vegetarian', icon: '🥦'},
  {id: 'vegan', label: 'Vegan', icon: '🌱'},
  {id: 'high-protein', label: 'High Protein', icon: '🍗'},
  {id: 'low-carb', label: 'Low Carb', icon: '🥩'},
  {id: 'keto', label: 'Keto', icon: '🥑'},
  {id: 'no-preference', label: 'No Preference', icon: '🍽️'},
];

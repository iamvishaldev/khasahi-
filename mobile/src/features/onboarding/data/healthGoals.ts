export type OnboardingHealthGoal = {
  id: string;
  label: string;
  icon: string;
};

export const onboardingHealthGoals: OnboardingHealthGoal[] = [
  {id: 'improve-liver-health', label: 'Improve Liver Health', icon: '🫀'},
  {id: 'lose-weight', label: 'Lose Weight', icon: '⚖️'},
  {id: 'build-muscle', label: 'Build Muscle', icon: '💪'},
  {id: 'heart-health', label: 'Heart Health', icon: '❤️'},
  {id: 'manage-blood-sugar', label: 'Manage Blood Sugar', icon: '🩸'},
  {id: 'eat-healthier', label: 'Eat Healthier', icon: '🥗'},
  {id: 'more-energy', label: 'More Energy', icon: '⚡'},
];

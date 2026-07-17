export type OnboardingFeatureHighlight = {
  id: string;
  icon: string;
  title: string;
  description: string;
};

export const onboardingFeatureHighlights: OnboardingFeatureHighlight[] = [
  {
    id: 'personalized-scores',
    icon: '⚡',
    title: 'Personalized Scores',
    description: 'Health scores calibrated to your lifestyle and goals.',
  },
  {
    id: 'ingredient-decoder',
    icon: '🔬',
    title: 'Ingredient Decoder',
    description: 'Every additive explained in plain language.',
  },
  {
    id: 'smarter-alternatives',
    icon: '🎯',
    title: 'Smarter Alternatives',
    description: 'AI recommends better options at every scan.',
  },
];

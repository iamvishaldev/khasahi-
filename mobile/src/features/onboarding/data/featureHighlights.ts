export type OnboardingFeatureHighlight = {
  id: string;
  icon: string;
  tint: string;
  title: string;
  description: string;
};

export const onboardingFeatureHighlights: OnboardingFeatureHighlight[] = [
  {
    id: 'personalized-scores',
    icon: '⚡',
    tint: '#FDECD1',
    title: 'Personalized Scores',
    description: 'Health scores calibrated to your lifestyle and goals.',
  },
  {
    id: 'ingredient-decoder',
    icon: '🔬',
    tint: '#DCEEFC',
    title: 'Ingredient Decoder',
    description: 'Every additive explained in plain language.',
  },
  {
    id: 'smarter-alternatives',
    icon: '🎯',
    tint: '#FBDDE6',
    title: 'Smarter Alternatives',
    description: 'AI recommends better options at every scan.',
  },
];

import React from 'react';
import {ScreenScaffold} from '@/common/ui/ScreenScaffold';

export function OnboardingScreen(): React.JSX.Element {
  return (
    <ScreenScaffold
      title="Understand every ingredient"
      description="Onboarding will capture a lifestyle profile, profile-specific follow-up questions, health goals, allergies, and dietary preferences before any personalized recommendation is generated."
    />
  );
}

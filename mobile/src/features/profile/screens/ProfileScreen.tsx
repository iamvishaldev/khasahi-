import React from 'react';
import {ScreenScaffold} from '@/common/ui/ScreenScaffold';

export function ProfileScreen(): React.JSX.Element {
  return (
    <ScreenScaffold
      title="Profile"
      description="Lifestyle selection, profile-specific answers, health goals, dietary preferences, allergies, and optional age will be managed here as the source of AI personalization."
    />
  );
}

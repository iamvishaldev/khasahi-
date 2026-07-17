import React from 'react';
import {StatusBar} from 'react-native';
import {AppProviders} from './providers/AppProviders';
import {RootNavigator} from '@/navigation/RootNavigator';
import {useAppTheme} from '@/theme/useAppTheme';
import {useBootstrap} from '@/hooks/useBootstrap';
import {useOnboardingSync} from '@/features/onboarding/hooks/useOnboardingSync';

function AppContent(): React.JSX.Element {
  const theme = useAppTheme();
  useBootstrap();
  useOnboardingSync();

  return (
    <>
      <StatusBar
        backgroundColor={theme.colors.background.primary}
        barStyle="dark-content"
      />
      <RootNavigator />
    </>
  );
}

export default function App(): React.JSX.Element {
  return (
    <AppProviders>
      <AppContent />
    </AppProviders>
  );
}

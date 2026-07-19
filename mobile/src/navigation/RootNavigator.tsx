import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSessionStore} from '@/store/session.store';
import {useAppStore} from '@/store/app.store';
import {useHasHydrated} from '@/store/persist/useHasHydrated';
import {isDemoModeEnabled} from '@/config/demoMode';
import {AuthStack} from './stacks/AuthStack';
import {AppStack} from './stacks/AppStack';
import {RootStackParamList} from '@/types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator(): React.JSX.Element | null {
  const rawIsAuthenticated = useSessionStore(state => state.isAuthenticated);
  const isSessionLoaded = useSessionStore(state => state.isSessionLoaded);
  const isPasswordRecovery = useSessionStore(state => state.isPasswordRecovery);
  const demoSignedOut = useSessionStore(state => state.demoSignedOut);
  const rawHasCompletedOnboarding = useAppStore(
    state => state.hasCompletedOnboarding,
  );
  const hasHydrated = useHasHydrated(useAppStore.persist);

  const isAuthenticated = (isDemoModeEnabled && !demoSignedOut) || rawIsAuthenticated;
  const hasCompletedOnboarding = isDemoModeEnabled || rawHasCompletedOnboarding;

  if (!isDemoModeEnabled && (!hasHydrated || !isSessionLoaded)) {
    return null;
  }

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {isAuthenticated && hasCompletedOnboarding && !isPasswordRecovery ? (
        <Stack.Screen name="App" component={AppStack} />
      ) : (
        <Stack.Screen name="Auth" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
}

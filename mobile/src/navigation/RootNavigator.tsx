import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSessionStore} from '@/store/session.store';
import {useAppStore} from '@/store/app.store';
import {useHasHydrated} from '@/store/persist/useHasHydrated';
import {AuthStack} from './stacks/AuthStack';
import {AppStack} from './stacks/AppStack';
import {RootStackParamList} from '@/types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator(): React.JSX.Element | null {
  const isAuthenticated = useSessionStore(state => state.isAuthenticated);
  const isSessionLoaded = useSessionStore(state => state.isSessionLoaded);
  const isPasswordRecovery = useSessionStore(state => state.isPasswordRecovery);
  const hasCompletedOnboarding = useAppStore(
    state => state.hasCompletedOnboarding,
  );
  const hasHydrated = useHasHydrated(useAppStore.persist);

  if (!hasHydrated || !isSessionLoaded) {
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

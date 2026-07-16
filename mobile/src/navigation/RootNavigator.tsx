import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSessionStore} from '@/store/session.store';
import {AuthStack} from './stacks/AuthStack';
import {AppStack} from './stacks/AppStack';
import {RootStackParamList} from '@/types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator(): React.JSX.Element {
  const isAuthenticated = useSessionStore(state => state.isAuthenticated);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {isAuthenticated ? (
        <Stack.Screen name="App" component={AppStack} />
      ) : (
        <Stack.Screen name="Auth" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
}

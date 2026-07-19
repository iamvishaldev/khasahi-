import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {WelcomeAuthScreen} from '@/features/auth/screens/WelcomeAuthScreen';
import {SignInScreen} from '@/features/auth/screens/SignInScreen';
import {CreateAccountScreen} from '@/features/auth/screens/CreateAccountScreen';
import {ForgotPasswordScreen} from '@/features/auth/screens/ForgotPasswordScreen';
import {ResetPasswordScreen} from '@/features/auth/screens/ResetPasswordScreen';
import {OnboardingScreen} from '@/features/onboarding/screens/OnboardingScreen';
import {useSessionStore} from '@/store/session.store';
import {AuthStackParamList} from '@/types/navigation';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthStack(): React.JSX.Element {
  const isPasswordRecovery = useSessionStore(state => state.isPasswordRecovery);

  return (
    <Stack.Navigator
      key={isPasswordRecovery ? 'password-recovery' : 'default'}
      screenOptions={{headerShown: false}}
      initialRouteName={isPasswordRecovery ? 'ResetPassword' : 'Onboarding'}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="AuthWelcome" component={WelcomeAuthScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
    </Stack.Navigator>
  );
}

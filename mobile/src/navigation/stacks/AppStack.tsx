import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AppTabs} from '@/navigation/tabs/AppTabs';
import {ScannerScreen} from '@/features/scanner/ScannerScreen';
import {ProcessingScreen} from '@/features/processing/ProcessingScreen';
import {ProductAnalysisScreen} from '@/features/analysis/ProductAnalysisScreen';
import {AIChatScreen} from '@/features/chat/AIChatScreen';
import {AppStackParamList} from '@/types/navigation';

const Stack = createNativeStackNavigator<AppStackParamList>();

export function AppStack(): React.JSX.Element {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Tabs">
      <Stack.Screen name="Tabs" component={AppTabs} />
      <Stack.Screen name="Scanner" component={ScannerScreen} />
      <Stack.Screen
        name="Processing"
        component={ProcessingScreen}
        options={{animation: 'fade'}}
      />
      <Stack.Screen
        name="Analysis"
        component={ProductAnalysisScreen}
        options={{animation: 'fade'}}
      />
      <Stack.Screen
        name="Chat"
        component={AIChatScreen}
        options={{animation: 'slide_from_bottom'}}
      />
    </Stack.Navigator>
  );
}

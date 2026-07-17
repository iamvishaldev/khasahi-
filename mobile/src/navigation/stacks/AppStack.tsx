import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from '@/features/home/screens/HomeScreen';
import {ScannerScreen} from '@/features/scanner/ScannerScreen';
import {ProcessingScreen} from '@/features/processing/ProcessingScreen';
import {ProductAnalysisScreen} from '@/features/analysis/ProductAnalysisScreen';
import {AIChatScreen} from '@/features/chat/AIChatScreen';
import {HistoryScreen} from '@/features/history/screens/HistoryScreen';
import {ProfileScreen} from '@/features/profile/screens/ProfileScreen';
import {AppStackParamList} from '@/types/navigation';

const Stack = createNativeStackNavigator<AppStackParamList>();

export function AppStack(): React.JSX.Element {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Chat">
      <Stack.Screen name="Home" component={HomeScreen} />
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
      <Stack.Screen name="History" component={HistoryScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}

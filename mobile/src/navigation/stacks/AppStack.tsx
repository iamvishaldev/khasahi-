import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from '@/features/home/screens/HomeScreen';
import {ScannerScreen} from '@/features/scanner/screens/ScannerScreen';
import {AnalysisScreen} from '@/features/analysis/screens/AnalysisScreen';
import {ChatScreen} from '@/features/chat/screens/ChatScreen';
import {HistoryScreen} from '@/features/history/screens/HistoryScreen';
import {ProfileScreen} from '@/features/profile/screens/ProfileScreen';
import {AppStackParamList} from '@/types/navigation';

const Stack = createNativeStackNavigator<AppStackParamList>();

export function AppStack(): React.JSX.Element {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Scanner" component={ScannerScreen} />
      <Stack.Screen name="Analysis" component={AnalysisScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="History" component={HistoryScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}

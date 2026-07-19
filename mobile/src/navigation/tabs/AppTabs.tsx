import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon, IconName} from '@/components/icons/Icon';
import {useAppTheme} from '@/theme/useAppTheme';
import {HomeScreen} from '@/features/home/screens/HomeScreen';
import {HistoryScreen} from '@/features/history/screens/HistoryScreen';
import {ProfileScreen} from '@/features/profile/screens/ProfileScreen';
import {AppTabParamList} from '@/types/navigation';

const Tab = createBottomTabNavigator<AppTabParamList>();

const TAB_ICONS: Record<keyof AppTabParamList, IconName> = {
  Home: 'home',
  History: 'clock',
  Profile: 'user',
};

export function AppTabs(): React.JSX.Element {
  const theme = useAppTheme();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.accent.primary,
        tabBarInactiveTintColor: theme.colors.text.secondary,
        tabBarStyle: {
          backgroundColor: theme.colors.surface.primary,
          borderTopColor: theme.colors.border.subtle,
        },
        tabBarIcon: ({color, focused}) => (
          <Icon
            name={TAB_ICONS[route.name as keyof AppTabParamList]}
            size={22}
            color={color}
            strokeWidth={focused ? 2.4 : 2}
          />
        ),
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

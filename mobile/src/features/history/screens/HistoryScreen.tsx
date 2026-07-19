import React from 'react';
import {StyleSheet, View} from 'react-native';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {ScreenContainer} from '@/components/layout/ScreenContainer';
import {AppText} from '@/components/typography/AppText';
import {PrimaryButton} from '@/components/actions/PrimaryButton';
import {Icon} from '@/components/icons/Icon';
import {useAppTheme} from '@/theme/useAppTheme';
import {AppStackParamList, AppTabParamList} from '@/types/navigation';

type HistoryNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<AppTabParamList, 'History'>,
  NativeStackNavigationProp<AppStackParamList>
>;

export function HistoryScreen(): React.JSX.Element {
  const theme = useAppTheme();
  const navigation = useNavigation<HistoryNavigationProp>();

  return (
    <ScreenContainer>
      <AppText variant="display">History</AppText>

      <View style={styles.emptyState}>
        <View
          style={[
            styles.iconBadge,
            {backgroundColor: theme.colors.surface.subtle, borderRadius: theme.radii.pill},
          ]}>
          <Icon name="clock" size={32} color={theme.colors.accent.primary} />
        </View>
        <AppText variant="heading" style={styles.emptyTitle}>
          No scans yet
        </AppText>
        <AppText variant="body" color="secondary" style={styles.emptyBody}>
          Scan your first product to build your personal food history.
        </AppText>
        <View style={{marginTop: theme.spacing.lg, width: '100%'}}>
          <PrimaryButton
            label="Scan Product"
            onPress={() => navigation.navigate('Scanner', undefined)}
          />
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  iconBadge: {
    width: 72,
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    textAlign: 'center',
  },
  emptyBody: {
    marginTop: 8,
    textAlign: 'center',
  },
});

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AppText} from '@/components/typography/AppText';
import {useAppTheme} from '@/theme/useAppTheme';
import {Nutrition} from '../types/analysis.types';

type NutritionCardProps = {
  nutrition: Nutrition;
};

export function NutritionCard({nutrition}: NutritionCardProps): React.JSX.Element {
  const theme = useAppTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.surface.primary,
          borderRadius: theme.radii.md,
          padding: theme.spacing.md,
          gap: theme.spacing.xs,
          ...theme.shadows.card,
        },
      ]}>
      <Text style={styles.icon}>{nutrition.icon}</Text>
      <AppText variant="title">{nutrition.value}</AppText>
      <AppText variant="caption" color="secondary">
        {nutrition.label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '31%',
    alignItems: 'center',
  },
  icon: {
    fontSize: 22,
  },
});

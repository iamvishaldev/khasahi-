import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useAppTheme} from '@/theme/useAppTheme';

type OnboardingPaginationDotsProps = {
  total: number;
  current: number;
};

export function OnboardingPaginationDots({
  total,
  current,
}: OnboardingPaginationDotsProps): React.JSX.Element {
  const theme = useAppTheme();

  return (
    <View style={[styles.row, {gap: theme.spacing.xs}]}>
      {Array.from({length: total}, (_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            index === current ? styles.dotActive : styles.dotInactive,
            {
              backgroundColor:
                index === current
                  ? theme.colors.accent.primary
                  : theme.colors.border.subtle,
              borderRadius: theme.radii.pill,
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    height: 6,
  },
  dotActive: {
    width: 20,
  },
  dotInactive: {
    width: 6,
  },
});

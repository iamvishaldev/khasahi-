import React, {PropsWithChildren} from 'react';
import {StyleSheet, View} from 'react-native';
import {useAppTheme} from '@/theme/useAppTheme';

export function InfoCard({children}: PropsWithChildren): React.JSX.Element {
  const theme = useAppTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.surface.primary,
          borderRadius: theme.radii.md,
          padding: theme.spacing.lg,
          ...theme.shadows.card,
        },
      ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
  },
});


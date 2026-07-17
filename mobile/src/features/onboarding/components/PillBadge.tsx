import React from 'react';
import {StyleSheet, View} from 'react-native';
import {AppText} from '@/components/typography/AppText';
import {useAppTheme} from '@/theme/useAppTheme';

type PillBadgeProps = {
  label: string;
};

export function PillBadge({label}: PillBadgeProps): React.JSX.Element {
  const theme = useAppTheme();

  return (
    <View
      style={[
        styles.pill,
        {
          backgroundColor: theme.colors.brand.ink,
          borderRadius: theme.radii.pill,
          paddingVertical: theme.spacing.xs,
          paddingHorizontal: theme.spacing.md,
        },
      ]}>
      <AppText variant="label" color="inverse">
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    alignSelf: 'flex-start',
  },
});

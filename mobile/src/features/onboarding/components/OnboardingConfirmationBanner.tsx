import React from 'react';
import {StyleSheet, View} from 'react-native';
import {AppText} from '@/components/typography/AppText';
import {useAppTheme} from '@/theme/useAppTheme';

type OnboardingConfirmationBannerProps = {
  count: number;
};

export function OnboardingConfirmationBanner({
  count,
}: OnboardingConfirmationBannerProps): React.JSX.Element {
  const theme = useAppTheme();
  const goalWord = count === 1 ? 'goal' : 'goals';

  return (
    <View
      style={[
        styles.banner,
        {
          backgroundColor: theme.colors.surface.subtle,
          borderRadius: theme.radii.sm,
          padding: theme.spacing.md,
        },
      ]}>
      <AppText variant="caption" color="secondary">
        ✓ {count} {goalWord} selected — AI will optimise your food scores
        accordingly
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    width: '100%',
  },
});

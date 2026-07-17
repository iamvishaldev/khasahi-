import React from 'react';
import {StyleSheet, View} from 'react-native';
import {AppText} from '@/components/typography/AppText';
import {useAppTheme} from '@/theme/useAppTheme';

type OnboardingInfoCardProps = {
  icon: string;
  title: string;
  description: string;
};

export function OnboardingInfoCard({
  icon,
  title,
  description,
}: OnboardingInfoCardProps): React.JSX.Element {
  const theme = useAppTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.brand.ink,
          borderRadius: theme.radii.md,
          padding: theme.spacing.lg,
          gap: theme.spacing.sm,
        },
      ]}>
      <AppText variant="heading" color="inverse">
        {icon} {title}
      </AppText>
      <AppText variant="body" color="inverse" style={styles.description}>
        {description}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
  },
  description: {
    opacity: 0.8,
  },
});

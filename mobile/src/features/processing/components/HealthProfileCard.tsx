import React from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {FadeInUp} from 'react-native-reanimated';
import {AppText} from '@/components/typography/AppText';
import {useAppTheme} from '@/theme/useAppTheme';
import {HealthProfileSummary} from '../types/processing.types';

type HealthProfileCardProps = HealthProfileSummary;

export function HealthProfileCard({
  lifestyleLabel,
  lifestyleIcon,
  goalLabel,
  goalIcon,
}: HealthProfileCardProps): React.JSX.Element {
  const theme = useAppTheme();

  return (
    <Animated.View
      entering={FadeInUp.duration(320)}
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.surface.primary,
          borderRadius: theme.radii.lg,
          padding: theme.spacing.lg,
          gap: theme.spacing.md,
          ...theme.shadows.card,
        },
      ]}>
      <Row label="Lifestyle" icon={lifestyleIcon} value={lifestyleLabel} />
      <View style={[styles.divider, {backgroundColor: theme.colors.border.subtle}]} />
      <Row label="Goal" icon={goalIcon} value={goalLabel} />
    </Animated.View>
  );
}

function Row({label, icon, value}: {label: string; icon: string; value: string}): React.JSX.Element {
  const theme = useAppTheme();

  return (
    <View style={{gap: theme.spacing.xs}}>
      <AppText variant="caption" color="secondary">
        {label}
      </AppText>
      <AppText variant="heading">
        {icon} {value}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
  },
  divider: {
    height: 1,
    width: '100%',
  },
});

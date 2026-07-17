import React, {PropsWithChildren} from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import Animated, {FadeInUp} from 'react-native-reanimated';
import {useAppTheme} from '@/theme/useAppTheme';

type SectionCardProps = PropsWithChildren<{
  style?: StyleProp<ViewStyle>;
  delay?: number;
}>;

/**
 * Shared card shell (surface, radius, shadow, fade-up entrance) behind
 * every analysis section — kept internal rather than part of the named
 * component set, purely to avoid repeating the same style object in each.
 */
export function SectionCard({children, style, delay = 0}: SectionCardProps): React.JSX.Element {
  const theme = useAppTheme();

  return (
    <Animated.View
      entering={FadeInUp.duration(360).delay(delay)}
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.surface.primary,
          borderRadius: theme.radii.lg,
          padding: theme.spacing.lg,
          gap: theme.spacing.md,
          ...theme.shadows.card,
        },
        style,
      ]}>
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
  },
});

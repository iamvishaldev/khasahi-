import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import Animated, {useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming} from 'react-native-reanimated';
import {AppText} from '@/components/typography/AppText';
import {useAppTheme} from '@/theme/useAppTheme';

type IngredientChipProps = {
  name: string;
  index: number;
};

const STAGGER_MS = 130;

export function IngredientChip({name, index}: IngredientChipProps): React.JSX.Element {
  const theme = useAppTheme();
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.7);

  useEffect(() => {
    const delayMs = index * STAGGER_MS;
    opacity.value = withDelay(delayMs, withTiming(1, {duration: 260}));
    scale.value = withDelay(delayMs, withSpring(1, {damping: 12, stiffness: 160}));
  }, [index, opacity, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{scale: scale.value}],
  }));

  return (
    <Animated.View
      style={[
        styles.chip,
        animatedStyle,
        {
          backgroundColor: theme.colors.surface.subtle,
          borderRadius: theme.radii.pill,
          paddingVertical: theme.spacing.xs,
          paddingHorizontal: theme.spacing.md,
        },
      ]}>
      <AppText variant="label" style={{color: theme.colors.accent.primary}}>
        ✓ {name}
      </AppText>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  chip: {
    alignSelf: 'flex-start',
  },
});

import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';
import {AppText} from '@/components/typography/AppText';
import {useAppTheme} from '@/theme/useAppTheme';

type SuggestionChipProps = {
  label: string;
  onPress: (label: string) => void;
};

export function SuggestionChip({label, onPress}: SuggestionChipProps): React.JSX.Element {
  const theme = useAppTheme();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={label}
        onPressIn={() => {
          scale.value = withTiming(0.96, {duration: 100});
        }}
        onPressOut={() => {
          scale.value = withTiming(1, {duration: 150});
        }}
        onPress={() => onPress(label)}
        style={[
          styles.chip,
          {
            backgroundColor: theme.colors.surface.primary,
            borderColor: theme.colors.border.subtle,
            borderRadius: theme.radii.pill,
            paddingVertical: theme.spacing.sm,
            paddingHorizontal: theme.spacing.md,
          },
        ]}>
        <AppText variant="label">{label}</AppText>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  chip: {
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
});

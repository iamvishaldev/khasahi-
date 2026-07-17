import React, {useEffect} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {useAppTheme} from '@/theme/useAppTheme';

type CaptureButtonProps = {
  disabled: boolean;
  isCapturing: boolean;
  onPress: () => void;
};

export function CaptureButton({
  disabled,
  isCapturing,
  onPress,
}: CaptureButtonProps): React.JSX.Element {
  const theme = useAppTheme();
  const pressScale = useSharedValue(1);
  const captureScale = useSharedValue(1);

  useEffect(() => {
    if (isCapturing) {
      captureScale.value = withSequence(
        withTiming(0.85, {duration: 120}),
        withTiming(1, {duration: 180}),
      );
    }
  }, [isCapturing, captureScale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: pressScale.value * captureScale.value}],
  }));

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Capture ingredient label"
      hitSlop={12}
      disabled={disabled}
      onPressIn={() => {
        pressScale.value = withTiming(0.92, {duration: 100});
      }}
      onPressOut={() => {
        pressScale.value = withTiming(1, {duration: 150});
      }}
      onPress={onPress}>
      <Animated.View
        style={[
          styles.ring,
          animatedStyle,
          {
            borderColor: theme.colors.scanner.glassBorder,
            opacity: disabled ? 0.6 : 1,
          },
        ]}>
        <View style={[styles.core, {backgroundColor: theme.colors.accent.primary}]} />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  ring: {
    width: 78,
    height: 78,
    borderRadius: 39,
    borderWidth: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  core: {
    width: 62,
    height: 62,
    borderRadius: 31,
  },
});

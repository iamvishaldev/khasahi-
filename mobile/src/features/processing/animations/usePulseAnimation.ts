import {useEffect} from 'react';
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

/**
 * Gentle continuous scale pulse, used by AnimatedAIIcon to read as "the AI
 * is actively thinking" without a spinner or progress bar.
 */
export function usePulseAnimation(active: boolean = true) {
  const scale = useSharedValue(1);

  useEffect(() => {
    if (active) {
      scale.value = withRepeat(
        withSequence(
          withTiming(1.08, {duration: 900, easing: Easing.inOut(Easing.ease)}),
          withTiming(1, {duration: 900, easing: Easing.inOut(Easing.ease)}),
        ),
        -1,
        false,
      );
    } else {
      scale.value = withTiming(1, {duration: 200});
    }
  }, [active, scale]);

  return useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));
}

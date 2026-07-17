import {useEffect} from 'react';
import {Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming} from 'react-native-reanimated';

/**
 * Drives a translateX sweep for a highlight bar across a card of the given
 * width — a lightweight, dependency-free stand-in for a gradient shimmer.
 */
export function useShimmerAnimation(width: number) {
  const translateX = useSharedValue(-width);

  useEffect(() => {
    translateX.value = -width;
    translateX.value = withRepeat(
      withTiming(width, {duration: 1400, easing: Easing.linear}),
      -1,
      false,
    );
  }, [width, translateX]);

  return useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
  }));
}

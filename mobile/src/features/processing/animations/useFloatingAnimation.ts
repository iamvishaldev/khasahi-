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
 * Slow, subtle vertical float loop — used by LoadingCard so the captured
 * image reads as gently hovering while it "uploads", rather than sitting
 * static.
 */
export function useFloatingAnimation(active: boolean = true) {
  const translateY = useSharedValue(0);

  useEffect(() => {
    if (active) {
      translateY.value = withRepeat(
        withSequence(
          withTiming(-8, {duration: 1400, easing: Easing.inOut(Easing.ease)}),
          withTiming(0, {duration: 1400, easing: Easing.inOut(Easing.ease)}),
        ),
        -1,
        false,
      );
    } else {
      translateY.value = withTiming(0, {duration: 200});
    }
  }, [active, translateY]);

  return useAnimatedStyle(() => ({
    transform: [{translateY: translateY.value}],
  }));
}

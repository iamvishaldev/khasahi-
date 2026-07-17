import {useEffect} from 'react';
import {Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming} from 'react-native-reanimated';

/** Continuous 360° rotation — the "scanning" sweep ring on AnimatedAIIcon. */
export function useRotationAnimation(durationMs: number = 2400) {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {duration: durationMs, easing: Easing.linear}),
      -1,
      false,
    );
  }, [durationMs, rotation]);

  return useAnimatedStyle(() => ({
    transform: [{rotate: `${rotation.value}deg`}],
  }));
}

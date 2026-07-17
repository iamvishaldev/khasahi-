import {useEffect, useState} from 'react';
import {
  Easing,
  runOnJS,
  useAnimatedReaction,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

/**
 * Smoothly counts a displayed number from 0 up to `target` — used by the
 * Health Score card so the score visibly "arrives" rather than just
 * appearing. The underlying progress drives the UI-thread SVG ring
 * directly (see HealthScoreCard); this hook only mirrors it into a plain
 * React number for the text readout.
 */
export function useAnimatedCounter(target: number, durationMs: number = 1200): number {
  const [display, setDisplay] = useState(0);
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = 0;
    progress.value = withTiming(target, {
      duration: durationMs,
      easing: Easing.out(Easing.cubic),
    });
  }, [target, durationMs, progress]);

  useAnimatedReaction(
    () => Math.round(progress.value),
    (current, previous) => {
      if (current !== previous) {
        runOnJS(setDisplay)(current);
      }
    },
  );

  return display;
}

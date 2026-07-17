import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {useAppTheme} from '@/theme/useAppTheme';

const DOT_COUNT = 3;

/**
 * Pure animation — three dots pulsing in a wave. Reused by LoadingBubble,
 * which wraps it in the same chrome a real assistant message would use.
 */
export function TypingIndicator(): React.JSX.Element {
  const theme = useAppTheme();

  return (
    <View style={[styles.row, {gap: theme.spacing.xs}]}>
      {Array.from({length: DOT_COUNT}, (_, index) => (
        <Dot key={index} delayMs={index * 160} color={theme.colors.text.secondary} />
      ))}
    </View>
  );
}

function Dot({delayMs, color}: {delayMs: number; color: string}): React.JSX.Element {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(
      delayMs,
      withRepeat(
        withSequence(
          withTiming(1, {duration: 420, easing: Easing.inOut(Easing.ease)}),
          withTiming(0, {duration: 420, easing: Easing.inOut(Easing.ease)}),
        ),
        -1,
        false,
      ),
    );
  }, [delayMs, progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: 0.35 + progress.value * 0.65,
    transform: [{scale: 0.8 + progress.value * 0.3}],
  }));

  return <Animated.View style={[styles.dot, animatedStyle, {backgroundColor: color}]} />;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
});

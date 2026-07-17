import React from 'react';
import {StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {useAppTheme} from '@/theme/useAppTheme';
import {usePulseAnimation} from '../animations/usePulseAnimation';

type ProgressTimelineProps = {
  currentIndex: number;
  total: number;
};

/**
 * A discrete stage timeline (dots), not a continuous progress bar — each
 * stage the AI has passed through lights up rather than implying a
 * percentage-complete estimate we can't actually promise.
 */
export function ProgressTimeline({
  currentIndex,
  total,
}: ProgressTimelineProps): React.JSX.Element {
  const theme = useAppTheme();

  return (
    <View style={[styles.row, {gap: theme.spacing.sm}]}>
      {Array.from({length: total}, (_, index) => (
        <TimelineDot
          key={index}
          isComplete={index < currentIndex}
          isCurrent={index === currentIndex}
        />
      ))}
    </View>
  );
}

function TimelineDot({
  isComplete,
  isCurrent,
}: {
  isComplete: boolean;
  isCurrent: boolean;
}): React.JSX.Element {
  const theme = useAppTheme();
  const pulseStyle = usePulseAnimation(isCurrent);
  const active = isComplete || isCurrent;

  return (
    <Animated.View
      style={[
        styles.dot,
        isCurrent ? pulseStyle : null,
        {
          backgroundColor: active
            ? theme.colors.accent.primary
            : theme.colors.border.subtle,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
});

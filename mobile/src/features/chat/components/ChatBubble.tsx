import React, {PropsWithChildren} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {FadeInUp} from 'react-native-reanimated';
import {useAppTheme} from '@/theme/useAppTheme';

type ChatBubbleProps = PropsWithChildren<{
  align: 'left' | 'right';
  backgroundColor: string;
}>;

/**
 * Shared bubble shell — rounded with one corner squared toward the
 * speaker's side (the classic chat "tail" cue), fading + sliding up on
 * entrance. AIMessage, UserMessage, and LoadingBubble all render into this
 * instead of repeating the same shape/animation.
 */
export function ChatBubble({align, backgroundColor, children}: ChatBubbleProps): React.JSX.Element {
  const theme = useAppTheme();
  const isRight = align === 'right';

  return (
    <Animated.View
      entering={FadeInUp.duration(280).springify().damping(16)}
      style={[styles.row, isRight ? styles.rowRight : styles.rowLeft]}>
      <View
        style={[
          styles.bubble,
          {
            backgroundColor,
            borderRadius: theme.radii.lg,
            paddingVertical: theme.spacing.sm + 2,
            paddingHorizontal: theme.spacing.md,
            ...(isRight ? {borderBottomRightRadius: 6} : {borderBottomLeftRadius: 6}),
          },
        ]}>
        {children}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  row: {
    width: '100%',
    flexDirection: 'row',
  },
  rowLeft: {
    justifyContent: 'flex-start',
  },
  rowRight: {
    justifyContent: 'flex-end',
  },
  bubble: {
    maxWidth: '82%',
  },
});

import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';
import {useAppTheme} from '@/theme/useAppTheme';

type ProcessingStatusProps = {
  title: string;
  rotatingMessages?: string[];
};

const ROTATION_INTERVAL_MS = 1600;

export function ProcessingStatus({
  title,
  rotatingMessages,
}: ProcessingStatusProps): React.JSX.Element {
  const theme = useAppTheme();
  const titleOpacity = useSharedValue(1);
  const messageOpacity = useSharedValue(1);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    titleOpacity.value = 0;
    titleOpacity.value = withTiming(1, {duration: 280});
  }, [title, titleOpacity]);

  useEffect(() => {
    setMessageIndex(0);
    if (!rotatingMessages || rotatingMessages.length < 2) {
      return undefined;
    }
    const interval = setInterval(() => {
      setMessageIndex(index => (index + 1) % rotatingMessages.length);
    }, ROTATION_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [rotatingMessages]);

  useEffect(() => {
    messageOpacity.value = 0;
    messageOpacity.value = withTiming(1, {duration: 280});
  }, [messageIndex, messageOpacity]);

  const titleStyle = useAnimatedStyle(() => ({opacity: titleOpacity.value}));
  const messageStyle = useAnimatedStyle(() => ({opacity: messageOpacity.value}));

  return (
    <Animated.View
      style={[styles.wrap, {gap: theme.spacing.xs}]}
      accessibilityLiveRegion="polite">
      <Animated.Text
        style={[
          styles.title,
          titleStyle,
          {color: theme.colors.text.primary},
        ]}
        accessibilityRole="text">
        {title}
      </Animated.Text>
      {rotatingMessages ? (
        <Animated.Text
          style={[styles.message, messageStyle, {color: theme.colors.text.secondary}]}>
          {rotatingMessages[messageIndex]}
        </Animated.Text>
      ) : null}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Onest-SemiBold',
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Regular',
    textAlign: 'center',
  },
});

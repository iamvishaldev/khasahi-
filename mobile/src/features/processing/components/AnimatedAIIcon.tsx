import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {useAppTheme} from '@/theme/useAppTheme';
import {usePulseAnimation} from '../animations/usePulseAnimation';
import {useRotationAnimation} from '../animations/useRotationAnimation';

const SIZE = 140;

export function AnimatedAIIcon(): React.JSX.Element {
  const theme = useAppTheme();
  const pulseStyle = usePulseAnimation();
  const rotationStyle = useRotationAnimation();

  return (
    <View style={styles.wrap}>
      <Animated.View
        style={[
          styles.glow,
          pulseStyle,
          {backgroundColor: theme.colors.accent.secondary},
        ]}
      />
      <View style={[styles.ring, {borderColor: theme.colors.accent.primary}]} />
      <Animated.View style={[styles.sweep, rotationStyle]}>
        <View style={[styles.sweepDot, {backgroundColor: theme.colors.accent.primary}]} />
      </Animated.View>
      <View style={[styles.core, {backgroundColor: theme.colors.brand.ink}]}>
        <Text style={styles.glyph}>✨</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: SIZE,
    height: SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glow: {
    position: 'absolute',
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    opacity: 0.18,
  },
  ring: {
    position: 'absolute',
    width: SIZE * 0.78,
    height: SIZE * 0.78,
    borderRadius: (SIZE * 0.78) / 2,
    borderWidth: 1.5,
    opacity: 0.5,
  },
  sweep: {
    position: 'absolute',
    width: SIZE * 0.78,
    height: SIZE * 0.78,
    alignItems: 'center',
  },
  sweepDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  core: {
    width: SIZE * 0.5,
    height: SIZE * 0.5,
    borderRadius: (SIZE * 0.5) / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glyph: {
    fontSize: 28,
  },
});

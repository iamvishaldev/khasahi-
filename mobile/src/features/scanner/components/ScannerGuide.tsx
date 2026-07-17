import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {useAppTheme} from '@/theme/useAppTheme';
import {ScanStatus} from '../types/scanner.types';

type ScannerGuideProps = {
  status: ScanStatus;
  instruction: string;
};

const BRACKET_SIZE = 30;
const BRACKET_THICKNESS = 3;

export function ScannerGuide({status, instruction}: ScannerGuideProps): React.JSX.Element {
  const theme = useAppTheme();
  const pulse = useSharedValue(0);

  const isActive = status === 'detected' || status === 'capturing';
  const glowColor = isActive ? theme.colors.accent.primary : theme.colors.accent.secondary;
  const borderWidth = isActive ? 3 : 1;
  const baseOpacity = status === 'idle' ? 0.35 : 0.9;

  useEffect(() => {
    if (status === 'searching') {
      pulse.value = withRepeat(
        withSequence(
          withTiming(1, {duration: 700}),
          withTiming(0, {duration: 700}),
        ),
        -1,
        false,
      );
    } else {
      pulse.value = withTiming(0, {duration: 200});
    }
  }, [status, pulse]);

  const pulseStyle = useAnimatedStyle(() => ({
    opacity: pulse.value * 0.7,
  }));

  return (
    <View style={styles.fill}>
      <View
        style={[
          styles.frame,
          {
            borderRadius: theme.radii.lg,
            borderColor: glowColor,
            borderWidth,
            opacity: baseOpacity,
          },
        ]}
      />
      <Animated.View
        pointerEvents="none"
        style={[
          styles.frame,
          pulseStyle,
          {
            borderRadius: theme.radii.lg,
            borderColor: theme.colors.accent.secondary,
            borderWidth: 2,
          },
        ]}
      />

      <Corner position="topLeft" color={glowColor} />
      <Corner position="topRight" color={glowColor} />
      <Corner position="bottomLeft" color={glowColor} />
      <Corner position="bottomRight" color={glowColor} />

      <View style={styles.instructionWrap}>
        <View
          style={[
            styles.instructionChip,
            {
              backgroundColor: theme.colors.scanner.glassSurfaceActive,
              borderRadius: theme.radii.md,
              paddingVertical: theme.spacing.sm,
              paddingHorizontal: theme.spacing.md,
            },
          ]}>
          <Text
            style={[styles.instructionText, {color: theme.colors.text.inverse}]}
            accessibilityRole="text">
            {instruction}
          </Text>
        </View>
      </View>
    </View>
  );
}

type CornerPosition = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

function Corner({position, color}: {position: CornerPosition; color: string}): React.JSX.Element {
  const isTop = position === 'topLeft' || position === 'topRight';
  const isLeft = position === 'topLeft' || position === 'bottomLeft';

  return (
    <View
      style={[
        styles.corner,
        isTop ? styles.cornerTop : styles.cornerBottom,
        isLeft ? styles.cornerLeft : styles.cornerRight,
      ]}>
      <View
        style={[
          styles.cornerSegmentHorizontal,
          {backgroundColor: color},
          isTop ? styles.segmentTop : styles.segmentBottom,
          isLeft ? styles.segmentLeft : styles.segmentRight,
        ]}
      />
      <View
        style={[
          styles.cornerSegmentVertical,
          {backgroundColor: color},
          isTop ? styles.segmentTop : styles.segmentBottom,
          isLeft ? styles.segmentLeft : styles.segmentRight,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  frame: {
    ...StyleSheet.absoluteFillObject,
  },
  corner: {
    position: 'absolute',
    width: BRACKET_SIZE,
    height: BRACKET_SIZE,
  },
  cornerTop: {top: -1},
  cornerBottom: {bottom: -1},
  cornerLeft: {left: -1},
  cornerRight: {right: -1},
  cornerSegmentHorizontal: {
    position: 'absolute',
    width: BRACKET_SIZE,
    height: BRACKET_THICKNESS,
    borderRadius: BRACKET_THICKNESS,
  },
  cornerSegmentVertical: {
    position: 'absolute',
    width: BRACKET_THICKNESS,
    height: BRACKET_SIZE,
    borderRadius: BRACKET_THICKNESS,
  },
  segmentTop: {top: 0},
  segmentBottom: {bottom: 0},
  segmentLeft: {left: 0},
  segmentRight: {right: 0},
  instructionWrap: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  instructionChip: {
    maxWidth: '90%',
  },
  instructionText: {
    fontSize: 13,
    fontFamily: 'PlusJakartaSans-Medium',
    textAlign: 'center',
  },
});

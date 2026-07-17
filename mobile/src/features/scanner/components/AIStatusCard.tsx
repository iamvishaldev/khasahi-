import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';
import {useAppTheme} from '@/theme/useAppTheme';
import {ScanStatus} from '../types/scanner.types';

type AIStatusCardProps = {
  status: ScanStatus;
  label: string;
  description: string;
};

export function AIStatusCard({status, label, description}: AIStatusCardProps): React.JSX.Element {
  const theme = useAppTheme();
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = 0;
    opacity.value = withTiming(1, {duration: 250});
  }, [label, opacity]);

  const fadeStyle = useAnimatedStyle(() => ({opacity: opacity.value}));

  const indicatorColor =
    status === 'searching' ? theme.colors.accent.secondary : theme.colors.accent.primary;

  return (
    <View
      accessibilityRole="text"
      accessibilityLabel={`${label}. ${description}`}
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.scanner.glassSurfaceActive,
          borderColor: theme.colors.scanner.glassBorder,
          borderRadius: theme.radii.lg,
          padding: theme.spacing.md,
          gap: theme.spacing.sm,
        },
      ]}>
      {status !== 'idle' ? (
        <View style={[styles.dot, {backgroundColor: indicatorColor}]} />
      ) : null}

      <Animated.View style={[styles.textWrap, fadeStyle]}>
        <Text style={[styles.label, {color: theme.colors.text.inverse}]}>{label}</Text>
        <Text style={[styles.description, {color: theme.colors.scanner.textSecondary}]}>
          {description}
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    alignSelf: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  textWrap: {
    gap: 2,
  },
  label: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  description: {
    fontSize: 12,
    fontFamily: 'PlusJakartaSans-Regular',
  },
});

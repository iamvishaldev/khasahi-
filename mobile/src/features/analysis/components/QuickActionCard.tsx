import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';
import {AppText} from '@/components/typography/AppText';
import {useAppTheme} from '@/theme/useAppTheme';

type QuickActionCardProps = {
  icon: string;
  label: string;
  onPress: () => void;
};

export function QuickActionCard({icon, label, onPress}: QuickActionCardProps): React.JSX.Element {
  const theme = useAppTheme();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={label}
        onPressIn={() => {
          scale.value = withTiming(0.96, {duration: 100});
        }}
        onPressOut={() => {
          scale.value = withTiming(1, {duration: 150});
        }}
        onPress={onPress}
        style={[
          styles.card,
          {
            backgroundColor: theme.colors.surface.primary,
            borderRadius: theme.radii.md,
            padding: theme.spacing.md,
            gap: theme.spacing.sm,
            ...theme.shadows.card,
          },
        ]}>
        <View
          style={[
            styles.iconWrap,
            {backgroundColor: theme.colors.surface.subtle, borderRadius: theme.radii.sm},
          ]}>
          <Text style={styles.icon}>{icon}</Text>
        </View>
        <AppText variant="label" style={styles.label}>
          {label}
        </AppText>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  iconWrap: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 16,
  },
  label: {
    flex: 1,
  },
});

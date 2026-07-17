import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Svg, {Circle} from 'react-native-svg';
import Animated, {Easing, useAnimatedProps, useSharedValue, withTiming} from 'react-native-reanimated';
import {AppText} from '@/components/typography/AppText';
import {useAppTheme} from '@/theme/useAppTheme';
import {SectionCard} from './SectionCard';
import {useAnimatedCounter} from '../hooks/useAnimatedCounter';
import {HealthScore} from '../types/analysis.types';

type HealthScoreCardProps = {
  healthScore: HealthScore;
};

const SIZE = 168;
const STROKE = 14;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export function HealthScoreCard({healthScore}: HealthScoreCardProps): React.JSX.Element {
  const theme = useAppTheme();
  const progress = useSharedValue(0);
  const displayValue = useAnimatedCounter(healthScore.value);
  const scoreColor = theme.colors.scoreBand[healthScore.band];

  useEffect(() => {
    progress.value = 0;
    progress.value = withTiming(healthScore.value / 100, {
      duration: 1200,
      easing: Easing.out(Easing.cubic),
    });
  }, [healthScore.value, progress]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCUMFERENCE * (1 - progress.value),
  }));

  return (
    <SectionCard style={styles.card}>
      <AppText variant="heading">AI Health Score</AppText>

      <View style={styles.ringWrap}>
        <Svg width={SIZE} height={SIZE}>
          <Circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            stroke={theme.colors.border.subtle}
            strokeWidth={STROKE}
            fill="none"
          />
          <AnimatedCircle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            stroke={scoreColor}
            strokeWidth={STROKE}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            animatedProps={animatedProps}
            rotation="-90"
            origin={`${SIZE / 2}, ${SIZE / 2}`}
          />
        </Svg>

        <View style={styles.ringCenter} pointerEvents="none">
          <AppText variant="display" style={{color: scoreColor}}>
            {displayValue}
          </AppText>
          <AppText variant="caption" color="secondary">
            /100
          </AppText>
        </View>
      </View>

      <View
        style={[
          styles.labelPill,
          {backgroundColor: scoreColor, borderRadius: theme.radii.pill, paddingVertical: theme.spacing.xs, paddingHorizontal: theme.spacing.md},
        ]}>
        <AppText variant="label" color="inverse">
          {healthScore.label}
        </AppText>
      </View>
    </SectionCard>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
  },
  ringWrap: {
    width: SIZE,
    height: SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringCenter: {
    position: 'absolute',
    alignItems: 'center',
  },
  labelPill: {
    alignSelf: 'center',
  },
});

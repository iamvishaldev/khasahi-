import React, {useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {AppText} from '@/components/typography/AppText';
import {useAppTheme} from '@/theme/useAppTheme';
import {Ingredient, IngredientRisk} from '../types/analysis.types';

type IngredientCardProps = {
  ingredient: Ingredient;
  onLearnMore: (ingredient: Ingredient) => void;
};

function useRiskColor(risk: IngredientRisk): string {
  const theme = useAppTheme();
  if (risk === 'high') {
    return theme.colors.feedback.danger;
  }
  if (risk === 'moderate') {
    return theme.colors.feedback.warning;
  }
  return theme.colors.feedback.success;
}

export function IngredientCard({ingredient, onLearnMore}: IngredientCardProps): React.JSX.Element {
  const theme = useAppTheme();
  const riskColor = useRiskColor(ingredient.risk);
  const [expanded, setExpanded] = useState(false);

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.surface.primary,
          borderRadius: theme.radii.md,
          padding: theme.spacing.md,
          gap: theme.spacing.sm,
        },
      ]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${ingredient.name}, ${ingredient.risk} risk. Tap to ${expanded ? 'collapse' : 'expand'}.`}
        onPress={() => setExpanded(value => !value)}
        style={styles.headerRow}>
        <AppText variant="heading">{ingredient.name}</AppText>
        <View
          style={[
            styles.riskBadge,
            {
              backgroundColor: riskColor,
              borderRadius: theme.radii.pill,
              paddingVertical: theme.spacing.xs,
              paddingHorizontal: theme.spacing.sm,
            },
          ]}>
          <AppText variant="caption" color="inverse">
            {ingredient.risk === 'high' ? 'High' : ingredient.risk === 'moderate' ? 'Moderate' : 'Low'}
          </AppText>
        </View>
      </Pressable>

      {expanded ? (
        <Animated.View entering={FadeIn.duration(200)} exiting={FadeOut.duration(150)} style={{gap: theme.spacing.sm}}>
          <AppText variant="body" color="secondary">
            {ingredient.explanation}
          </AppText>
          <View style={styles.confidenceRow}>
            <AppText variant="caption" color="secondary">
              Confidence
            </AppText>
            <AppText variant="label">{ingredient.confidence}%</AppText>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Learn more about ${ingredient.name}`}
            hitSlop={8}
            onPress={() => onLearnMore(ingredient)}>
            <AppText variant="label" style={{color: theme.colors.accent.primary}}>
              Learn More →
            </AppText>
          </Pressable>
        </Animated.View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  riskBadge: {
    alignSelf: 'flex-start',
  },
  confidenceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {AppText} from '@/components/typography/AppText';
import {useAppTheme} from '@/theme/useAppTheme';
import {getHealthScoreBand} from '../hooks/getHealthScoreBand';
import {Alternative} from '../types/analysis.types';

type AlternativeCardProps = {
  alternative: Alternative;
  onCompare: (alternative: Alternative) => void;
};

const CARD_WIDTH = 200;

export function AlternativeCard({alternative, onCompare}: AlternativeCardProps): React.JSX.Element {
  const theme = useAppTheme();
  const {band} = getHealthScoreBand(alternative.healthScore);
  const scoreColor = theme.colors.scoreBand[band];

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.surface.primary,
          borderRadius: theme.radii.lg,
          padding: theme.spacing.md,
          gap: theme.spacing.sm,
          ...theme.shadows.card,
        },
      ]}>
      <View
        style={[
          styles.imageWrap,
          {backgroundColor: theme.colors.surface.subtle, borderRadius: theme.radii.md},
        ]}>
        {alternative.imageUri ? (
          <Image source={{uri: alternative.imageUri}} style={styles.image} resizeMode="cover" />
        ) : (
          <Text style={styles.placeholderGlyph}>🍫</Text>
        )}
        <View
          style={[
            styles.scoreBadge,
            {backgroundColor: scoreColor, borderRadius: theme.radii.pill},
          ]}>
          <AppText variant="caption" color="inverse">
            {alternative.healthScore}
          </AppText>
        </View>
      </View>

      <AppText variant="heading">{alternative.name}</AppText>
      <AppText variant="caption" color="secondary">
        {alternative.reason}
      </AppText>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Compare with ${alternative.name}`}
        onPress={() => onCompare(alternative)}
        style={[
          styles.compareButton,
          {borderColor: theme.colors.border.subtle, borderRadius: theme.radii.pill},
        ]}>
        <AppText variant="label">Compare</AppText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
  },
  imageWrap: {
    width: '100%',
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholderGlyph: {
    fontSize: 36,
  },
  scoreBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  compareButton: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
});

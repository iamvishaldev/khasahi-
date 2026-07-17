import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {AppText} from '@/components/typography/AppText';
import {useAppTheme} from '@/theme/useAppTheme';
import {SectionCard} from './SectionCard';
import {Product} from '../types/analysis.types';

type ProductHeroProps = {
  product: Product;
};

function formatScanDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function ProductHero({product}: ProductHeroProps): React.JSX.Element {
  const theme = useAppTheme();

  return (
    <SectionCard style={styles.card}>
      <View
        style={[
          styles.imageWrap,
          {
            backgroundColor: theme.colors.surface.subtle,
            borderRadius: theme.radii.md,
          },
        ]}>
        {product.imageUri ? (
          <Image source={{uri: product.imageUri}} style={styles.image} resizeMode="cover" />
        ) : (
          <Text style={styles.placeholderGlyph}>🍫</Text>
        )}
      </View>

      <View style={{gap: theme.spacing.xs}}>
        <AppText variant="title">{product.name}</AppText>
        <View style={[styles.metaRow, {gap: theme.spacing.sm}]}>
          <AppText variant="body" color="secondary">
            {product.brand}
          </AppText>
          <View style={[styles.dot, {backgroundColor: theme.colors.border.subtle}]} />
          <AppText variant="body" color="secondary">
            {product.category}
          </AppText>
        </View>
        <AppText variant="caption" color="secondary">
          Scanned {formatScanDate(product.scanDate)}
        </AppText>
      </View>
    </SectionCard>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
  },
  imageWrap: {
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholderGlyph: {
    fontSize: 48,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
});

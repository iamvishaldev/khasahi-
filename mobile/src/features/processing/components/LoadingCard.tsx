import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {AppText} from '@/components/typography/AppText';
import {useAppTheme} from '@/theme/useAppTheme';
import {useFloatingAnimation} from '../animations/useFloatingAnimation';
import {useShimmerAnimation} from '../animations/useShimmerAnimation';

type LoadingCardProps = {
  photoUri: string;
};

const CARD_SIZE = 168;

export function LoadingCard({photoUri}: LoadingCardProps): React.JSX.Element {
  const theme = useAppTheme();
  const floatStyle = useFloatingAnimation();
  const shimmerStyle = useShimmerAnimation(CARD_SIZE);

  return (
    <Animated.View style={floatStyle}>
      <View
        style={[
          styles.card,
          {
            borderRadius: theme.radii.lg,
            backgroundColor: theme.colors.surface.primary,
            ...theme.shadows.card,
          },
        ]}>
        <Image source={{uri: photoUri}} style={styles.image} resizeMode="cover" />
        <Animated.View style={[styles.shimmer, shimmerStyle]} />
      </View>
      <AppText variant="caption" color="secondary" style={styles.caption}>
        Uploading securely...
      </AppText>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  shimmer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 60,
    backgroundColor: 'rgba(255,255,255,0.35)',
  },
  caption: {
    textAlign: 'center',
    marginTop: 10,
  },
});

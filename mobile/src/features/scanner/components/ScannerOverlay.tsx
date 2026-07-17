import React, {PropsWithChildren} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {FadeIn} from 'react-native-reanimated';
import {useAppTheme} from '@/theme/useAppTheme';

type ScannerOverlayProps = PropsWithChildren<{
  frameWidthPercent: `${number}%`;
  frameHeight: number;
  frameTopPercent: `${number}%`;
}>;

/**
 * Generic dimming shell for a camera scanner: darkens everything outside a
 * rectangular cutout and fades in once mounted. Layout-only — the guide
 * rendered inside the cutout (brackets, glow, instruction copy) is a
 * separate, independently reusable component passed in as `children`.
 */
export function ScannerOverlay({
  frameWidthPercent,
  frameHeight,
  frameTopPercent,
  children,
}: ScannerOverlayProps): React.JSX.Element {
  const theme = useAppTheme();
  const vignetteStyle = {backgroundColor: theme.colors.scanner.vignette};

  return (
    <Animated.View
      entering={FadeIn.duration(400)}
      style={styles.fill}
      pointerEvents="none">
      <View style={[styles.vignette, {height: frameTopPercent}, vignetteStyle]} />
      <View style={[styles.centerRow, {height: frameHeight}]}>
        <View style={[styles.vignetteSide, vignetteStyle]} />
        <View style={{width: frameWidthPercent, height: frameHeight}}>{children}</View>
        <View style={[styles.vignetteSide, vignetteStyle]} />
      </View>
      <View style={[styles.vignette, styles.vignetteBottom, vignetteStyle]} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  fill: {
    ...StyleSheet.absoluteFillObject,
  },
  vignette: {
    width: '100%',
  },
  vignetteBottom: {
    flex: 1,
  },
  centerRow: {
    flexDirection: 'row',
  },
  vignetteSide: {
    flex: 1,
  },
});

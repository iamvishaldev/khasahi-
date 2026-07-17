import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useAppTheme} from '@/theme/useAppTheme';
import {CaptureButton} from './CaptureButton';

type CameraControlsProps = {
  disabled: boolean;
  isCapturing: boolean;
  flashOn: boolean;
  flashAvailable: boolean;
  onToggleFlash: () => void;
  onGalleryPress: () => void;
  onCapturePress: () => void;
  onFlipPress: () => void;
};

const SIDE_CLUSTER_WIDTH = 116;

export function CameraControls({
  disabled,
  isCapturing,
  flashOn,
  flashAvailable,
  onToggleFlash,
  onGalleryPress,
  onCapturePress,
  onFlipPress,
}: CameraControlsProps): React.JSX.Element {
  const theme = useAppTheme();

  return (
    <View style={styles.row}>
      <View style={[styles.sideCluster, {gap: theme.spacing.md}]}>
        <IconButton
          glyph="⚡"
          accessibilityLabel="Toggle flash"
          onPress={onToggleFlash}
          disabled={disabled || !flashAvailable}
          active={flashOn}
        />
        <IconButton
          glyph="🖼️"
          accessibilityLabel="Choose from gallery"
          onPress={onGalleryPress}
          disabled={disabled}
        />
      </View>

      <CaptureButton disabled={disabled} isCapturing={isCapturing} onPress={onCapturePress} />

      <View style={[styles.sideCluster, styles.sideClusterRight, {gap: theme.spacing.md}]}>
        <IconButton
          glyph="🔄"
          accessibilityLabel="Flip camera"
          onPress={onFlipPress}
          disabled={disabled}
        />
      </View>
    </View>
  );
}

type IconButtonProps = {
  glyph: string;
  accessibilityLabel: string;
  disabled: boolean;
  active?: boolean;
  onPress: () => void;
};

function IconButton({
  glyph,
  accessibilityLabel,
  disabled,
  active,
  onPress,
}: IconButtonProps): React.JSX.Element {
  const theme = useAppTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      hitSlop={12}
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.sideButton,
        {
          borderRadius: theme.radii.md,
          backgroundColor: active
            ? theme.colors.accent.primary
            : theme.colors.scanner.glassSurfaceActive,
          opacity: disabled ? 0.4 : 1,
        },
      ]}>
      <Text style={styles.sideGlyph}>{glyph}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  sideCluster: {
    flexDirection: 'row',
    width: SIDE_CLUSTER_WIDTH,
  },
  sideClusterRight: {
    justifyContent: 'flex-end',
  },
  sideButton: {
    width: 52,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sideGlyph: {
    fontSize: 20,
  },
});

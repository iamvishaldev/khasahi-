import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StatusBar, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Camera, useCameraDevice, useCameraPermission} from 'react-native-vision-camera';
import {launchImageLibrary} from 'react-native-image-picker';
import {useAppTheme} from '@/theme/useAppTheme';
import {AppStackParamList} from '@/types/navigation';
import {PermissionView} from './components/PermissionView';
import {ScannerHeader} from './components/ScannerHeader';
import {ScannerOverlay} from './components/ScannerOverlay';
import {ScannerGuide} from './components/ScannerGuide';
import {AIStatusCard} from './components/AIStatusCard';
import {CameraControls} from './components/CameraControls';
import {useScanSequence} from './hooks/useScanSequence';
import {useCameraReadyState} from './hooks/useCameraReadyState';
import {getScanStatusCopy} from './utils/getScanStatusCopy';
import {CapturedAsset} from './types/scanner.types';

type ScannerNavigationProp = NativeStackNavigationProp<AppStackParamList, 'Scanner'>;

const FRAME_WIDTH_PERCENT = '82%';
const FRAME_HEIGHT = 260;
const FRAME_TOP_PERCENT = '26%';
const INSTRUCTION = 'Position the ingredient label inside the frame';

export function ScannerScreen(): React.JSX.Element {
  const theme = useAppTheme();
  const navigation = useNavigation<ScannerNavigationProp>();
  const isFocused = useIsFocused();
  const insets = useSafeAreaInsets();
  const {hasPermission, requestPermission} = useCameraPermission();
  const {isCameraReady, markCameraReady} = useCameraReadyState();
  const [cameraPosition, setCameraPosition] = useState<'back' | 'front'>('back');
  const [flashOn, setFlashOn] = useState(false);
  const device = useCameraDevice(cameraPosition);
  const cameraRef = React.useRef<Camera>(null);

  function handleAssetCaptured(asset: CapturedAsset) {
    navigation.navigate('Processing', {photoUri: asset.uri});
  }

  const {status, isBusy, runScanSequence, reset} = useScanSequence({
    onAssetCaptured: handleAssetCaptured,
  });

  useEffect(() => {
    if (isFocused) {
      reset();
    }
  }, [isFocused, reset]);

  async function captureFromCamera(): Promise<CapturedAsset | undefined> {
    try {
      const photo = await cameraRef.current?.takePhoto({
        flash: flashOn && device?.hasFlash ? 'on' : 'off',
      });
      return photo ? {uri: `file://${photo.path}`, width: photo.width, height: photo.height} : undefined;
    } catch {
      return undefined;
    }
  }

  async function captureFromGallery(): Promise<CapturedAsset | undefined> {
    const result = await launchImageLibrary({mediaType: 'photo'});
    const asset = result.assets?.[0];
    return asset?.uri ? {uri: asset.uri, width: asset.width, height: asset.height} : undefined;
  }

  function handleCapturePress() {
    if (isBusy) {
      return;
    }
    runScanSequence(captureFromCamera).catch(() => {});
  }

  function handleGalleryPress() {
    if (isBusy) {
      return;
    }
    runScanSequence(captureFromGallery).catch(() => {});
  }

  function handleFlipCamera() {
    if (isBusy) {
      return;
    }
    setCameraPosition(position => (position === 'back' ? 'front' : 'back'));
  }

  if (!hasPermission) {
    return <PermissionView onRequestPermission={requestPermission} />;
  }

  if (!device) {
    return (
      <View style={[styles.centerFill, {backgroundColor: theme.colors.scanner.background}]}>
        <ActivityIndicator color={theme.colors.accent.primary} />
      </View>
    );
  }

  const copy = getScanStatusCopy(status);

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.scanner.background}]}>
      <StatusBar barStyle="light-content" />
      <Camera
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={isFocused}
        photo
        torch={flashOn && device.hasFlash ? 'on' : 'off'}
        onInitialized={markCameraReady}
      />

      {!isCameraReady ? (
        <View style={styles.centerFill} pointerEvents="none">
          <ActivityIndicator color={theme.colors.accent.primary} />
        </View>
      ) : null}

      <ScannerOverlay
        frameWidthPercent={FRAME_WIDTH_PERCENT}
        frameHeight={FRAME_HEIGHT}
        frameTopPercent={FRAME_TOP_PERCENT}>
        <ScannerGuide status={status} instruction={INSTRUCTION} />
      </ScannerOverlay>

      <View style={[styles.overlayContent, {paddingTop: insets.top + 8}]} pointerEvents="box-none">
        <ScannerHeader onBack={() => navigation.goBack()} />

        <View style={styles.spacer} pointerEvents="none" />

        <View style={[styles.bottomBlock, {paddingBottom: insets.bottom + 16, gap: theme.spacing.lg}]}>
          <AIStatusCard status={status} label={copy.label} description={copy.description} />
          <CameraControls
            disabled={isBusy}
            isCapturing={status === 'capturing'}
            flashOn={flashOn}
            flashAvailable={device.hasFlash}
            onToggleFlash={() => setFlashOn(value => !value)}
            onGalleryPress={handleGalleryPress}
            onCapturePress={handleCapturePress}
            onFlipPress={handleFlipCamera}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerFill: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayContent: {
    ...StyleSheet.absoluteFillObject,
  },
  spacer: {
    flex: 1,
  },
  bottomBlock: {
    paddingHorizontal: 20,
  },
});

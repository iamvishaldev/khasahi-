import React, {useEffect, useRef} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useCameraPermission} from 'react-native-vision-camera';
import {useAppTheme} from '@/theme/useAppTheme';
import {AppStackParamList} from '@/types/navigation';
import {PermissionView} from './components/PermissionView';
import {scanProductDocument} from './services/documentScanner';

type ScannerNavigationProp = NativeStackNavigationProp<AppStackParamList, 'Scanner'>;

export function ScannerScreen(): React.JSX.Element {
  const theme = useAppTheme();
  const navigation = useNavigation<ScannerNavigationProp>();
  const {hasPermission, requestPermission} = useCameraPermission();
  const hasLaunchedRef = useRef(false);

  useEffect(() => {
    if (!hasPermission || hasLaunchedRef.current) {
      return undefined;
    }
    hasLaunchedRef.current = true;

    let cancelled = false;

    scanProductDocument()
      .then(asset => {
        if (cancelled) {
          return;
        }
        if (asset) {
          navigation.navigate('Processing', {photoUri: asset.uri});
        } else {
          navigation.goBack();
        }
      })
      .catch(() => {
        if (!cancelled) {
          navigation.goBack();
        }
      });

    return () => {
      cancelled = true;
    };
  }, [hasPermission, navigation]);

  if (!hasPermission) {
    return <PermissionView onRequestPermission={requestPermission} />;
  }

  return (
    <View style={[styles.centerFill, {backgroundColor: theme.colors.scanner.background}]}>
      <ActivityIndicator color={theme.colors.accent.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  centerFill: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

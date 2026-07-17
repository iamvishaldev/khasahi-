import React from 'react';
import {Linking, Pressable, StyleSheet, Text, View} from 'react-native';
import {PrimaryButton} from '@/components/actions/PrimaryButton';
import {useAppTheme} from '@/theme/useAppTheme';

type PermissionViewProps = {
  onRequestPermission: () => void;
};

export function PermissionView({onRequestPermission}: PermissionViewProps): React.JSX.Element {
  const theme = useAppTheme();

  return (
    <View style={[styles.wrap, {backgroundColor: theme.colors.scanner.background}]}>
      <Text style={styles.icon} accessibilityElementsHidden>
        📷
      </Text>
      <Text
        style={[styles.title, {color: theme.colors.text.inverse}]}
        accessibilityRole="header">
        Camera access needed
      </Text>
      <Text style={[styles.body, {color: theme.colors.scanner.textSecondary}]}>
        Khasahi AI needs your camera to scan ingredient labels and analyze
        them in real time.
      </Text>
      <View style={[styles.buttonWrap, {marginTop: theme.spacing.lg}]}>
        <PrimaryButton label="Enable Camera" onPress={onRequestPermission} />
      </View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Open device settings"
        hitSlop={12}
        onPress={() => Linking.openSettings()}
        style={{marginTop: theme.spacing.md}}>
        <Text style={[styles.body, {color: theme.colors.accent.secondary}]}>Open Settings</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  icon: {
    fontSize: 40,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Onest-Bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  body: {
    fontSize: 15,
    fontFamily: 'PlusJakartaSans-Regular',
    textAlign: 'center',
    lineHeight: 21,
  },
  buttonWrap: {
    width: '100%',
  },
});

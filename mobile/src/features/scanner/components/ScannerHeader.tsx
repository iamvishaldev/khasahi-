import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useAppTheme} from '@/theme/useAppTheme';

type ScannerHeaderProps = {
  onBack: () => void;
};

export function ScannerHeader({onBack}: ScannerHeaderProps): React.JSX.Element {
  const theme = useAppTheme();

  return (
    <View style={styles.row}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Go back"
        hitSlop={12}
        onPress={onBack}
        style={[
          styles.backButton,
          {
            borderRadius: theme.radii.md,
            backgroundColor: theme.colors.scanner.glassSurfaceActive,
          },
        ]}>
        <Text style={[styles.backGlyph, {color: theme.colors.text.inverse}]}>←</Text>
      </Pressable>

      <Text style={[styles.title, {color: theme.colors.text.inverse}]}>Scan Product</Text>

      <View style={styles.backButton} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  backButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backGlyph: {
    fontSize: 20,
  },
  title: {
    fontSize: 17,
    fontFamily: 'Onest-SemiBold',
  },
});

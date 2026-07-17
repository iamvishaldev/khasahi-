import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {AppText} from '@/components/typography/AppText';
import {useAppTheme} from '@/theme/useAppTheme';

type ChatHeaderProps = {
  onBack: () => void;
};

export function ChatHeader({onBack}: ChatHeaderProps): React.JSX.Element {
  const theme = useAppTheme();

  return (
    <View style={[styles.wrap, {gap: theme.spacing.xs}]}>
      <View style={styles.row}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          hitSlop={12}
          onPress={onBack}
          style={[
            styles.backButton,
            {borderRadius: theme.radii.md, backgroundColor: theme.colors.surface.subtle},
          ]}>
          <Text style={[styles.backGlyph, {color: theme.colors.text.primary}]}>←</Text>
        </Pressable>

        <AppText variant="heading">AI Food Assistant</AppText>

        <View style={styles.backButton} />
      </View>

      <AppText variant="caption" color="secondary" style={styles.subtitle}>
        Ask anything about this product.
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backGlyph: {
    fontSize: 18,
  },
  subtitle: {
    textAlign: 'center',
  },
});

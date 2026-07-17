import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {AppText} from '@/components/typography/AppText';
import {useAppTheme} from '@/theme/useAppTheme';

type PrimaryButtonProps = {
  label: string;
  onPress?: () => void;
  disabled?: boolean;
};

export function PrimaryButton({
  label,
  onPress,
  disabled = false,
}: PrimaryButtonProps): React.JSX.Element {
  const theme = useAppTheme();

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({pressed}) => [
        styles.button,
        {
          backgroundColor: disabled
            ? theme.colors.accent.secondary
            : theme.colors.accent.primary,
          opacity: pressed ? 0.92 : 1,
          borderRadius: theme.radii.pill,
          paddingVertical: theme.spacing.md,
          paddingHorizontal: theme.spacing.xl,
        },
      ]}>
      <View>
        <AppText color="inverse" variant="button">
          {label}
        </AppText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {AppText} from '@/components/typography/AppText';
import {useAppTheme} from '@/theme/useAppTheme';

type GoogleButtonProps = {
  label?: string;
  variant?: 'primary' | 'outline';
  onPress: () => void;
};

export function GoogleButton({
  label = 'Continue with Google',
  variant = 'outline',
  onPress,
}: GoogleButtonProps): React.JSX.Element {
  const theme = useAppTheme();
  const isPrimary = variant === 'primary';

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({pressed}) => [
        styles.button,
        {
          backgroundColor: isPrimary
            ? theme.colors.brand.ink
            : theme.colors.surface.primary,
          borderColor: theme.colors.border.subtle,
          borderWidth: isPrimary ? 0 : 1,
          borderRadius: theme.radii.pill,
          paddingVertical: theme.spacing.sm + 2,
          paddingHorizontal: theme.spacing.lg,
          gap: theme.spacing.sm,
          opacity: pressed ? 0.9 : 1,
        },
      ]}>
      <View
        style={[
          styles.badge,
          {
            backgroundColor: isPrimary
              ? theme.colors.text.inverse
              : theme.colors.surface.subtle,
            borderRadius: theme.radii.sm,
          },
        ]}>
        <AppText
          variant="label"
          style={{
            color: isPrimary
              ? theme.colors.brand.ink
              : theme.colors.text.primary,
          }}>
          G
        </AppText>
      </View>
      <AppText variant="button" color={isPrimary ? 'inverse' : 'primary'}>
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  badge: {
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import React from 'react';
import {ActivityIndicator, Pressable, StyleSheet, View} from 'react-native';
import {AppText} from '@/components/typography/AppText';
import {useAppTheme} from '@/theme/useAppTheme';

type GoogleButtonProps = {
  label?: string;
  variant?: 'primary' | 'outline';
  onPress: () => void;
  isLoading?: boolean;
};

export function GoogleButton({
  label = 'Continue with Google',
  variant = 'outline',
  onPress,
  isLoading = false,
}: GoogleButtonProps): React.JSX.Element {
  const theme = useAppTheme();
  const isPrimary = variant === 'primary';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{disabled: isLoading}}
      disabled={isLoading}
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
          opacity: isLoading ? 0.65 : pressed ? 0.9 : 1,
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
      {isLoading ? (
        <ActivityIndicator
          color={isPrimary ? theme.colors.text.inverse : theme.colors.accent.primary}
        />
      ) : (
        <AppText variant="button" color={isPrimary ? 'inverse' : 'primary'}>
          {label}
        </AppText>
      )}
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

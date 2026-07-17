import React, {useState} from 'react';
import {StyleSheet, TextInput, TextInputProps, View} from 'react-native';
import {AppText} from '@/components/typography/AppText';
import {useAppTheme} from '@/theme/useAppTheme';

type TextFieldProps = Omit<TextInputProps, 'style'> & {
  label: string;
  icon?: string;
  error?: string;
};

export function TextField({
  label,
  icon,
  error,
  onFocus,
  onBlur,
  ...inputProps
}: TextFieldProps): React.JSX.Element {
  const theme = useAppTheme();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.field, {gap: theme.spacing.xs}]}>
      <AppText variant="label" color="secondary">
        {icon ? `${icon} ${label}` : label}
      </AppText>
      <TextInput
        {...inputProps}
        onFocus={event => {
          setIsFocused(true);
          onFocus?.(event);
        }}
        onBlur={event => {
          setIsFocused(false);
          onBlur?.(event);
        }}
        placeholderTextColor={theme.colors.text.secondary}
        style={[
          theme.typography.body,
          styles.input,
          {
            color: theme.colors.text.primary,
            backgroundColor: theme.colors.surface.primary,
            borderColor: error
              ? theme.colors.feedback.danger
              : isFocused
                ? theme.colors.accent.primary
                : theme.colors.border.subtle,
            borderRadius: theme.radii.md,
            paddingVertical: theme.spacing.md,
            paddingHorizontal: theme.spacing.lg,
          },
        ]}
      />
      {error ? (
        <AppText variant="caption" style={{color: theme.colors.feedback.danger}}>
          {error}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    width: '100%',
  },
  input: {
    borderWidth: 1,
    width: '100%',
  },
});

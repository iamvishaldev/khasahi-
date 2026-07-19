import React from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {useAppTheme} from '@/theme/useAppTheme';

type ChatInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
  disabled: boolean;
};

export function ChatInput({value, onChangeText, onSend, disabled}: ChatInputProps): React.JSX.Element {
  const theme = useAppTheme();
  const canSend = value.trim().length > 0 && !disabled;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surface.primary,
          borderRadius: theme.radii.pill,
          borderColor: theme.colors.border.subtle,
          paddingVertical: theme.spacing.xs,
          paddingHorizontal: theme.spacing.xs,
          gap: theme.spacing.xs,
          ...theme.shadows.card,
        },
      ]}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Ask about ingredients..."
        placeholderTextColor={theme.colors.text.secondary}
        multiline
        style={[
          styles.input,
          {
            color: theme.colors.text.primary,
            fontFamily: theme.typography.body.fontFamily,
            fontSize: theme.typography.body.fontSize,
          },
        ]}
      />

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Send message"
        disabled={!canSend}
        onPress={onSend}
        style={[
          styles.sendButton,
          {
            backgroundColor: canSend ? theme.colors.accent.primary : theme.colors.border.subtle,
            borderRadius: theme.radii.pill,
          },
        ]}>
        <Text style={[styles.sendGlyph, {color: theme.colors.text.inverse}]}>↑</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderWidth: 1,
  },
  input: {
    flex: 1,
    minHeight: 36,
    maxHeight: 120,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  sendButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendGlyph: {
    fontSize: 18,
    fontWeight: '700',
  },
});

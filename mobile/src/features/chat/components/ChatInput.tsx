import React from 'react';
import {Alert, Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
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
      <PlaceholderIconButton
        glyph="📎"
        accessibilityLabel="Attach an image"
        onPress={() => Alert.alert('Image attachment', 'Coming soon in a future update.')}
      />
      <PlaceholderIconButton
        glyph="🎙️"
        accessibilityLabel="Voice input"
        onPress={() => Alert.alert('Voice input', 'Coming soon in a future update.')}
      />

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

function PlaceholderIconButton({
  glyph,
  accessibilityLabel,
  onPress,
}: {
  glyph: string;
  accessibilityLabel: string;
  onPress: () => void;
}): React.JSX.Element {
  const theme = useAppTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      hitSlop={8}
      onPress={onPress}
      style={[
        styles.iconButton,
        {backgroundColor: theme.colors.surface.subtle, borderRadius: theme.radii.pill},
      ]}>
      <Text style={styles.iconGlyph}>{glyph}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderWidth: 1,
  },
  iconButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconGlyph: {
    fontSize: 16,
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

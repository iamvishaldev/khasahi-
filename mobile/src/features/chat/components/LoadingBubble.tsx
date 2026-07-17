import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useAppTheme} from '@/theme/useAppTheme';
import {ChatBubble} from './ChatBubble';
import {TypingIndicator} from './TypingIndicator';

export function LoadingBubble(): React.JSX.Element {
  const theme = useAppTheme();

  return (
    <View style={[styles.row, {gap: theme.spacing.sm}]}>
      <View
        style={[
          styles.avatar,
          {backgroundColor: theme.colors.brand.ink, borderRadius: theme.radii.pill},
        ]}>
        <Text style={styles.avatarGlyph}>✨</Text>
      </View>
      <ChatBubble align="left" backgroundColor={theme.colors.surface.primary}>
        <TypingIndicator />
      </ChatBubble>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: '100%',
  },
  avatar: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarGlyph: {
    fontSize: 13,
  },
});

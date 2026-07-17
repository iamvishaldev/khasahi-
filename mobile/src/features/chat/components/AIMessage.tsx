import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useAppTheme} from '@/theme/useAppTheme';
import {ChatBubble} from './ChatBubble';
import {MarkdownText} from './MarkdownText';
import {ChatMessage} from '../types/chat.types';
import {formatMessageTime} from '../hooks/formatMessageTime';

type AIMessageProps = {
  message: ChatMessage;
};

export function AIMessage({message}: AIMessageProps): React.JSX.Element {
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

      <View style={[styles.messageCol, {gap: theme.spacing.xs}]}>
        <ChatBubble align="left" backgroundColor={theme.colors.surface.primary}>
          <MarkdownText content={message.content} color={theme.colors.text.primary} />
        </ChatBubble>
        <Text style={[styles.timestamp, {color: theme.colors.text.secondary}]}>
          {formatMessageTime(message.createdAt)}
        </Text>
      </View>
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
  messageCol: {
    flexShrink: 1,
  },
  timestamp: {
    fontSize: 11,
    fontFamily: 'PlusJakartaSans-Regular',
    marginLeft: 4,
  },
});

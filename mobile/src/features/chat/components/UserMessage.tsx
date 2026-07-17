import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useAppTheme} from '@/theme/useAppTheme';
import {ChatBubble} from './ChatBubble';
import {ChatMessage} from '../types/chat.types';
import {formatMessageTime} from '../hooks/formatMessageTime';

type UserMessageProps = {
  message: ChatMessage;
};

export function UserMessage({message}: UserMessageProps): React.JSX.Element {
  const theme = useAppTheme();

  return (
    <View style={[styles.col, {gap: theme.spacing.xs}]}>
      <ChatBubble align="right" backgroundColor={theme.colors.accent.primary}>
        <Text style={[styles.text, {color: theme.colors.text.inverse}]}>{message.content}</Text>
      </ChatBubble>
      <Text style={[styles.timestamp, {color: theme.colors.text.secondary}]}>
        {formatMessageTime(message.createdAt)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  col: {
    alignItems: 'flex-end',
    width: '100%',
  },
  text: {
    fontSize: 15,
    lineHeight: 21,
    fontFamily: 'PlusJakartaSans-Regular',
  },
  timestamp: {
    fontSize: 11,
    fontFamily: 'PlusJakartaSans-Regular',
    marginRight: 4,
  },
});

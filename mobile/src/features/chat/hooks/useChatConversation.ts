import {useCallback, useRef, useState} from 'react';
import {generateAssistantReply} from '../services/chatService';
import {ChatContext, ChatMessage} from '../types/chat.types';

type UseChatConversationOptions = {
  context: ChatContext | null;
};

type UseChatConversationResult = {
  messages: ChatMessage[];
  isTyping: boolean;
  sendMessage: (text: string) => void;
};

let messageSequence = 0;
function nextMessageId(role: 'user' | 'assistant'): string {
  messageSequence += 1;
  return `${role}-${messageSequence}`;
}

export function useChatConversation({
  context,
}: UseChatConversationOptions): UseChatConversationResult {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesRef = useRef(messages);
  messagesRef.current = messages;

  const sendMessage = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || !context || isTyping) {
        return;
      }

      const userMessage: ChatMessage = {
        id: nextMessageId('user'),
        role: 'user',
        content: trimmed,
        createdAt: new Date().toISOString(),
      };
      setMessages(prev => [...prev, userMessage]);
      setIsTyping(true);

      generateAssistantReply(trimmed, context, messagesRef.current).then(reply => {
        setIsTyping(false);
        setMessages(prev => [
          ...prev,
          {
            id: nextMessageId('assistant'),
            role: 'assistant',
            content: reply,
            createdAt: new Date().toISOString(),
          },
        ]);
      });
    },
    [context, isTyping],
  );

  return {messages, isTyping, sendMessage};
}

import React, {useEffect, useRef, useState} from 'react';
import {FlatList, KeyboardAvoidingView, Platform, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useAppTheme} from '@/theme/useAppTheme';
import {AppStackParamList} from '@/types/navigation';
import {ChatHeader} from './components/ChatHeader';
import {AIMessage} from './components/AIMessage';
import {UserMessage} from './components/UserMessage';
import {LoadingBubble} from './components/LoadingBubble';
import {EmptyConversation} from './components/EmptyConversation';
import {ChatInput} from './components/ChatInput';
import {useChatContext} from './hooks/useChatContext';
import {useChatConversation} from './hooks/useChatConversation';
import {SUGGESTED_QUESTIONS} from './services/chatService';
import {ChatMessage} from './types/chat.types';

type ChatRouteProp = RouteProp<AppStackParamList, 'Chat'>;
type ChatNavigationProp = NativeStackNavigationProp<AppStackParamList, 'Chat'>;

export function AIChatScreen(): React.JSX.Element {
  const theme = useAppTheme();
  const navigation = useNavigation<ChatNavigationProp>();
  const {params} = useRoute<ChatRouteProp>();
  const {context} = useChatContext(params?.scanId);
  const {messages, isTyping, sendMessage} = useChatConversation({context});
  const [draft, setDraft] = useState('');
  const listRef = useRef<FlatList<ChatMessage>>(null);

  useEffect(() => {
    if (messages.length === 0 && !isTyping) {
      return;
    }
    const timeout = setTimeout(() => listRef.current?.scrollToEnd({animated: true}), 80);
    return () => clearTimeout(timeout);
  }, [messages.length, isTyping]);

  function handleSend(text?: string) {
    const toSend = text ?? draft;
    if (!toSend.trim()) {
      return;
    }
    sendMessage(toSend);
    setDraft('');
  }

  return (
    <SafeAreaView style={[styles.safeArea, {backgroundColor: theme.colors.background.primary}]}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 12 : 0}>
        <View
          style={[
            styles.headerWrap,
            {paddingHorizontal: theme.spacing.xl, paddingTop: theme.spacing.sm},
          ]}>
          <ChatHeader onBack={() => navigation.goBack()} />
        </View>

        {messages.length === 0 ? (
          <View style={[styles.emptyWrap, {padding: theme.spacing.xl}]}>
            <EmptyConversation suggestions={SUGGESTED_QUESTIONS} onSelectSuggestion={handleSend} />
          </View>
        ) : (
          <FlatList
            ref={listRef}
            data={messages}
            keyExtractor={item => item.id}
            renderItem={({item}) =>
              item.role === 'user' ? <UserMessage message={item} /> : <AIMessage message={item} />
            }
            contentContainerStyle={[
              styles.listContent,
              {padding: theme.spacing.xl, gap: theme.spacing.lg},
            ]}
            ListFooterComponent={isTyping ? <LoadingBubble /> : null}
            onContentSizeChange={() => listRef.current?.scrollToEnd({animated: true})}
          />
        )}

        <View
          style={[
            styles.inputWrap,
            {paddingHorizontal: theme.spacing.xl, paddingBottom: theme.spacing.md},
          ]}>
          <ChatInput
            value={draft}
            onChangeText={setDraft}
            onSend={() => handleSend()}
            disabled={isTyping || !context}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  headerWrap: {
    width: '100%',
  },
  emptyWrap: {
    flex: 1,
    justifyContent: 'center',
  },
  listContent: {
    flexGrow: 1,
  },
  inputWrap: {
    width: '100%',
  },
});

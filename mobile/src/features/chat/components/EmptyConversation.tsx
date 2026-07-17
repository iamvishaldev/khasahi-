import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated, {FadeIn} from 'react-native-reanimated';
import {AppText} from '@/components/typography/AppText';
import {useAppTheme} from '@/theme/useAppTheme';
import {SuggestionChip} from './SuggestionChip';
import {SuggestedQuestion} from '../types/chat.types';

type EmptyConversationProps = {
  suggestions: SuggestedQuestion[];
  onSelectSuggestion: (label: string) => void;
};

export function EmptyConversation({
  suggestions,
  onSelectSuggestion,
}: EmptyConversationProps): React.JSX.Element {
  const theme = useAppTheme();

  return (
    <Animated.View entering={FadeIn.duration(400)} style={{gap: theme.spacing.xl}}>
      <View style={[styles.headerCol, {gap: theme.spacing.sm}]}>
        <View
          style={[
            styles.illustration,
            {backgroundColor: theme.colors.surface.subtle, borderRadius: theme.radii.pill},
          ]}>
          <Text style={styles.illustrationGlyph}>💬</Text>
        </View>
        <AppText variant="title" style={styles.centerText}>
          Ask Anything
        </AppText>
        <AppText variant="body" color="secondary" style={styles.centerText}>
          Your AI assistant can explain ingredients, compare products, and answer health-related
          food questions.
        </AppText>
      </View>

      <View style={[styles.chipWrap, {gap: theme.spacing.sm}]}>
        {suggestions.map(suggestion => (
          <SuggestionChip
            key={suggestion.id}
            label={suggestion.label}
            onPress={onSelectSuggestion}
          />
        ))}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  headerCol: {
    alignItems: 'center',
  },
  illustration: {
    width: 88,
    height: 88,
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustrationGlyph: {
    fontSize: 36,
  },
  centerText: {
    textAlign: 'center',
  },
  chipWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

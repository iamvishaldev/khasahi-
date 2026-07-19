import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AppText} from '@/components/typography/AppText';
import {useAppTheme} from '@/theme/useAppTheme';
import {ChatContext} from '../types/chat.types';

type AIContextBannerProps = {
  context: ChatContext;
};

/** Makes the product and profile data behind every AI answer visible. */
export function AIContextBanner({context}: AIContextBannerProps): React.JSX.Element {
  const theme = useAppTheme();

  return (
    <View
      accessibilityLabel={`AI context: ${context.product.name}, health score ${context.healthScore.value} out of 100, goal ${context.userProfile.goalLabel}`}
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.surface.subtle,
          borderColor: theme.colors.accent.primary,
          borderRadius: theme.radii.md,
          padding: theme.spacing.md,
          gap: theme.spacing.xs,
        },
      ]}>
      <View style={styles.titleRow}>
        <Text style={styles.brain}>🧠</Text>
        <AppText variant="label">AI Context</AppText>
      </View>

      <AppText variant="caption" color="secondary">
        Product: <AppText variant="caption" color="primary">{context.product.name}</AppText>
      </AppText>
      <AppText variant="caption" color="secondary">
        Health Score: <AppText variant="caption" color="primary">{context.healthScore.value}/100</AppText>
      </AppText>
      <AppText variant="caption" color="secondary">
        Goal: <AppText variant="caption" color="primary">{context.userProfile.goalLabel}</AppText>
      </AppText>

      <AppText variant="caption" color="secondary" style={styles.explanation}>
        The AI is answering based on this information.
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  brain: {
    fontSize: 16,
  },
  explanation: {
    marginTop: 2,
  },
});

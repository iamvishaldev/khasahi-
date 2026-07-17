import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {AppText} from '@/components/typography/AppText';
import {useAppTheme} from '@/theme/useAppTheme';

type AuthFooterLinkProps = {
  question: string;
  actionLabel: string;
  onPress: () => void;
};

export function AuthFooterLink({
  question,
  actionLabel,
  onPress,
}: AuthFooterLinkProps): React.JSX.Element {
  const theme = useAppTheme();

  return (
    <View style={[styles.row, {gap: theme.spacing.xs}]}>
      <AppText variant="body" color="secondary">
        {question}
      </AppText>
      <Pressable accessibilityRole="button" onPress={onPress}>
        <AppText variant="label" style={{color: theme.colors.accent.primary}}>
          {actionLabel}
        </AppText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

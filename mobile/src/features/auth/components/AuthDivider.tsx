import React from 'react';
import {StyleSheet, View} from 'react-native';
import {AppText} from '@/components/typography/AppText';
import {useAppTheme} from '@/theme/useAppTheme';

export function AuthDivider(): React.JSX.Element {
  const theme = useAppTheme();

  return (
    <View style={[styles.row, {gap: theme.spacing.md}]}>
      <View style={[styles.line, {backgroundColor: theme.colors.border.subtle}]} />
      <AppText variant="caption" color="secondary">
        OR
      </AppText>
      <View style={[styles.line, {backgroundColor: theme.colors.border.subtle}]} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  line: {
    flex: 1,
    height: 1,
  },
});
